import { createPluginFactory,getPluginType,ELEMENT_DEFAULT,getPluginOptions } from "@udecode/plate";


export const KEY_ALIGN = 'align';
 
export const createAlignPlugin = createPluginFactory({
  key: KEY_ALIGN,
 
  // Note that we're using `then` to access to the editor
  then: (editor) => ({
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