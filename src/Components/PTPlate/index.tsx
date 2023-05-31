import React, { useEffect, useRef, useState } from "react";
import { Plate, PlateProvider, TEditableProps, useResetPlateEditor } from "@udecode/plate";
import { MyParagraphElement, MyValue } from "./typescript/plateTypes";

const ResetEditorOnValueChange = ({ value }: { value?: MyParagraphElement[] }) => {
  console.log("ResetEditorOnValueChange");
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

type PTPlateContentChanged = (content: MyParagraphElement[]) => void;

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
  const [value, setValue] = useState<MyParagraphElement[] | undefined>(content);
  const [resetValue, setResetValue] = useState<MyParagraphElement[] | undefined>(content);

  //if we use directly prop value, there was a delay in updating field when propValue changed
  //if we used value, the restet field was invoked every time when we started writing, which make writing not possible
  useEffect(() => {
    setValue(forceResetContent);
    setResetValue(forceResetContent);
  }, [forceResetContent]);

  const change = (e: MyParagraphElement[]) => {
    setValue(e);
    contentChanged(e);
  };

  const editableProps: TEditableProps = {
    placeholder: "Type2...",
  };

  return (
    <div>
      {/* {readOnly ? (
          <Plate<MyParagraphElement[]> editableProps={{ placeholder: "Type…" }} value={value} readOnly={true}></Plate>
      ) : ( */}
      <PlateProvider<MyParagraphElement[]> initialValue={value}  value={value} onChange={change}>
        <Plate<MyParagraphElement[]>
          editableProps={{ placeholder: "Type…" }}
          value={value}
          readOnly={false}
        >
          <ResetEditorOnValueChange value={resetValue} />
        </Plate>
      </PlateProvider>
      {/* )} */}
      <span>Plate content in the ptplate/index:</span><br></br>
      <span>{JSON.stringify(value)}</span><br></br>
      <span>Reset value in the ptplate/index:</span><br></br>
      <span>{JSON.stringify(resetValue)}</span>
    </div>
  );
};
