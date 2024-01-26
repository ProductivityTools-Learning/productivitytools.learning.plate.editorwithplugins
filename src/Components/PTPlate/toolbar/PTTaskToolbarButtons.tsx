import React from 'react';
import { LooksTwo } from '@styled-icons/material/LooksTwo';
import {
    BlockToolbarButton,
  ELEMENT_OL,
  ELEMENT_UL,
  getPluginType,
  ListToolbarButton,
  ToolbarButton,
  toggleIndentList
} from '@udecode/plate';
import {
    ELEMENT_TASK
} from '../pttask/taskconsts'
import { useMyPlateEditorRef } from '../typescript/plateTypes';


const tooltip = (content: string) => ({
  content,
});

export const PTTaskToolbarButtons = () => {
  const editor = useMyPlateEditorRef();

  return (
    <BlockToolbarButton
    tooltip={tooltip('Task')}
    type={getPluginType(editor, ELEMENT_TASK)}
    icon={<LooksTwo />}
  />
  );
}