import { createPluginFactory,getPluginType,ELEMENT_DEFAULT,getPluginOptions } from "@udecode/plate";
import { ELEMENT_TASK } from "./taskconsts";
interface DemoPlugin {
  username?: string;
}

export const createTaskPlugin = createPluginFactory<DemoPlugin>({
  key: ELEMENT_TASK,
  isElement: true,
  handlers: {
    onKeyDown: (editor) => (event) => {
      const { username } = getPluginOptions<DemoPlugin>(editor, ELEMENT_TASK);
      console.info(`${username} pressed ${event.key}`);
    },
  },
});
