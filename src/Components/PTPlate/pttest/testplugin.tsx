import { createPluginFactory,getPluginType,ELEMENT_DEFAULT,getPluginOptions } from "@udecode/plate";


export const KEY_ALIGN = 'XXXX';
 
export const createAlignPlugin = createPluginFactory({
  key: KEY_ALIGN,
  handlers: {
    onChange: (editor) => (value) => {
      console.info(editor, value);
    },
    onKeyDown: (editor) => (event) => {
      console.info(`You pressed ${event.key}`);
    },
  },
  // Note that we're using `then` to access to the editor
  then: (editor) => ({
    renderAboveEditable:({children})=>(<div><span>{children}</span><span>ddd</span></div>),
    inject: {
      props: {
        nodeKey: KEY_ALIGN,
        defaultNodeValue: 'left',
        styleKey: 'textAlign',
        validNodeValues: ['left', 'center', 'right', 'justify'],
        validTypes: [getPluginType(editor, ELEMENT_DEFAULT)],
      },
    },
  }),
});