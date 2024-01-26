import { createPluginFactory } from "@udecode/plate";
import { ELEMENT_TASK } from "./taskconsts";


export const createTaskPlugin = createPluginFactory({
  key: ELEMENT_TASK,
  isElement: true,
});
