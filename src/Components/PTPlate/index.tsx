import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useResetPlateEditor, //if in editor with plugins, not used, if in plate it is used
  createBasicElementsPlugin, //h1, quote, code
  createResetNodePlugin, //h1, quote, code
  createSoftBreakPlugin, //h1, quote, code
  Plate,
  PlateProvider,
  TEditableProps,
  createNormalizeTypesPlugin, //forced layout
  createTrailingBlockPlugin, //forced layout
  ELEMENT_H1, //forced layout
  createPlateUI,
  ELEMENT_CODE_BLOCK,
  CodeBlockElement,
  createExitBreakPlugin,
  createHeadingPlugin,
  StyledElement,
  createPluginFactory,
  createLinkPlugin,
  createIndentPlugin, //list
  createListPlugin, //list
  createIndentListPlugin, //list
  createTablePlugin, //table
} from "@udecode/plate";
import { forcedLayoutPlugin } from "./forced-layout/forcedLayoutPlugin"; //forced layout
import { trailingBlockPlugin } from "./trailing-block/trailingBlockPlugin"; //forced layout
import { withProps } from "@udecode/plate";
import { createMyPlugins, MyParagraphElement, MyEditor, MyPlatePlugin, MyValue } from "./typescript/plateTypes";
import { Toolbar } from "./toolbar/Toolbar";
import { ToolbarButtons } from "./ToolbarButtons";
import { resetBlockTypePlugin } from "./reset-node/resetBlockTypePlugin";
import { softBreakPlugin } from "./soft-break/softBreakPlugin";
import { exitBreakPlugin } from "./exit-break/exitBreakPlugin";
import { ELEMENT_TITLE } from "./pttitle/titleconsts";
import { createTitlePlugin } from "./pttitle/titleplugin";
import { linkPlugin } from "./link/linkPlugin";
import { indentPlugin } from "./indent/indentPlugin";
import { indentListPlugin } from "./indent-list/indentListPlugin";
import { components } from "./components/components";

import { withStyledPlaceHolders } from "./placeholder/withStyledPlaceHolders";

const ResetEditorOnValueChange = ({ value }: { value?: MyValue }) => {
  console.log("ResetEditorOnValueChange");
  console.log(value);
  const resetPlateEditor = useResetPlateEditor();

  const isFirst = useRef(true);
  console.log("isFirst");
  console.log(isFirst.current);
  useEffect(() => {
    console.log("useEffect");
    console.log(isFirst);

    if (isFirst.current) {
      // console.log("isFirst.current");
      // console.log(isFirst.current);
      isFirst.current = false;
      return;
    }
    resetPlateEditor();
  }, [value, resetPlateEditor, isFirst]);
  // console.log("return null");

  return null;
};

const initialValue = (content: string) => [
  {
    type: "p",
    children: [
      {
        text: content,
      },
    ],
  } as MyParagraphElement,
];

type PTPlateContentChanged = (content: MyValue) => void;

export interface PTPlateProps {
  content: MyValue;
  forceResetContent?: MyValue;
  contentChanged: PTPlateContentChanged;
  readOnly: boolean;
}

//content sets initial content
//foceResetContent, resets editor and sets new content
//we cannot use content to reset, as later we are binding content to use state and in the contentChange we are updating state, if we bind content to reset it results in constant refresh
export const PTPlate: React.FunctionComponent<PTPlateProps> = ({
  content,
  forceResetContent,
  contentChanged,
  readOnly,
}: PTPlateProps) => {
  const [value, setValue] = useState<MyValue | undefined>(content);
  const [resetValue, setResetValue] = useState<MyValue | undefined>(content);
  const [showDebug, setShowDebug] = useState<boolean>(false);

  //if we use directly prop value, there was a delay in updating field when propValue changed
  //if we used value, the restet field was invoked every time when we started writing, which make writing not possible
  useEffect(() => {
    setValue(forceResetContent);
    setResetValue(forceResetContent);
  }, [forceResetContent]);

  const change = (e: MyValue) => {
    setValue(e);
    contentChanged(e);
    console.log("content changed");
  };

  const editableProps: TEditableProps<MyValue> = {
    placeholder: "Type..2.",
  };
  const plugins = useMemo(
    () =>
      createMyPlugins(
        [
          createBasicElementsPlugin(), //h1-h6, quote, code
          createTitlePlugin(),
          createResetNodePlugin(resetBlockTypePlugin), //reseting formatinog on enter
          createSoftBreakPlugin(softBreakPlugin), //enter new line without stsarting new block, shift_enter

          createNormalizeTypesPlugin(forcedLayoutPlugin), //forced layout
          createTrailingBlockPlugin(trailingBlockPlugin), //forced layout
          createExitBreakPlugin(exitBreakPlugin), //forced layout
          //createHeadingPlugin() //forced layout
          createLinkPlugin(linkPlugin), //urls
          createListPlugin(), //list
          createIndentListPlugin(indentListPlugin), //list
          createIndentPlugin(indentPlugin), //list
          createTablePlugin({
            options: {
              initialTableWidth: 600,
              // disableMarginLeft: true,
            },
          }),
        ],
        {
          components: components,
        }
      ),
    []
  );

  return (
    <div>
      {/* {readOnly ? (
          <Plate<MyValue> editableProps={{ placeholder: "Type…" }} value={value} readOnly={true}></Plate>
      ) : ( */}
      <PlateProvider<MyValue> value={value} onChange={change} plugins={plugins}>
        <Toolbar>
          <ToolbarButtons />
        </Toolbar>
        <Plate<MyValue> editableProps={editableProps} readOnly={false}>
          <ResetEditorOnValueChange value={resetValue} />
        </Plate>
      </PlateProvider>
      <input type="checkbox" onClick={() => setShowDebug(!showDebug)}></input>
      <span style={{color:'lightgray'}}>show debug</span>
      <br />
      {showDebug && (
        <div>
          {/* )} */}
          <span>Plate content in the ptplate/index:</span>
          <br></br>
          <span>{JSON.stringify(value)}</span>
          <br></br>
          <span>Reset value in the ptplate/index:</span>
          <br></br>
          <span>{JSON.stringify(resetValue)}</span>
        </div>
      )}
    </div>
  );
};
