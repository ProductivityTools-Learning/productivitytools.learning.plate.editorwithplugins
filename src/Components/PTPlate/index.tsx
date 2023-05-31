import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Plate,
  PlateProvider,
  TEditableProps,
  useResetPlateEditor,
  createBasicElementsPlugin, //h1, quote, code
} from "@udecode/plate";
import { MyParagraphElement, MyValue, createMyPlugins } from "./typescript/plateTypes";
import { Toolbar } from "./toolbar/Toolbar";
import { ToolbarButtons } from "./ToolbarButtons";

const ResetEditorOnValueChange = ({ value }: { value?: MyValue }) => {
  // console.log("ResetEditorOnValueChange");
  // console.log(value);
  const resetPlateEditor = useResetPlateEditor();
  const isFirst = useRef(true);
  // console.log("isFirst");
  // console.log(isFirst.current);
  useEffect(() => {
    // console.log("useEffect");
    // console.log(isFirst);

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
  content: MyParagraphElement[];
  forceResetContent?: MyParagraphElement[];
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
  const [value, setValue] = useState<MyValue| undefined>(content);
  const [resetValue, setResetValue] = useState<MyValue| undefined>(content);

  //if we use directly prop value, there was a delay in updating field when propValue changed
  //if we used value, the restet field was invoked every time when we started writing, which make writing not possible
  useEffect(() => {
    setValue(forceResetContent);
    setResetValue(forceResetContent);
  }, [forceResetContent]);

  const change = (e: MyValue) => {
    setValue(e);
    contentChanged(e);
    console.log("content changed")
  };

  const editableProps: TEditableProps = {
    placeholder: "Type2...",
  };

  const plugins = useMemo(
    () =>
      createMyPlugins([
        createBasicElementsPlugin(), //h1-h6, quote, codes
      ]),
    []
  );

  return (
    <div>
      {/* {readOnly ? (
        <Plate<MyParagraphElement[]> editableProps={{ placeholder: "Type…" }} value={value} readOnly={true}></Plate>
      ) : ( */}
      <PlateProvider<MyValue> plugins={plugins} onChange={change}>
        <Toolbar>
          <ToolbarButtons />
        </Toolbar>
        <Plate editableProps={{ placeholder: "Type…" }} value={value} readOnly={false}>
       
        </Plate>
        <ResetEditorOnValueChange value={resetValue} />
      </PlateProvider>
      {/* )} */}
      {/* <span>Plate content:</span>
      <span>{JSON.stringify(content)}</span> */}
    </div>
  );
};
