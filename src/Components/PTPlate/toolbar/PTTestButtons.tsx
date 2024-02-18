import React from 'react';
import { LooksOne } from '@styled-icons/material/LooksOne';
import {
    BlockToolbarButton,
  ELEMENT_OL,
  ELEMENT_UL,
  getPluginType,
  ListToolbarButton,
  ToolbarButton,
  toggleIndentList
} from '@udecode/plate';
import { useMyPlateEditorRef } from '../typescript/plateTypes';


const tooltip = (content: string) => ({
  content,
});

export const PTTestButtons = () => {
  const editor = useMyPlateEditorRef();

  return (
    <BlockToolbarButton
    tooltip={tooltip('TestButtons')}
    type={getPluginType(editor, KEY_ALIGN)}
    icon={<LooksOne />}
  />
  );
}