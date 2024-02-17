// import { createPluginFactory,getPluginType,ELEMENT_DEFAULT,getPluginOptions } from "@udecode/plate";


// export const KEY_ALIGN = 'XXXX';
 
// export const createAlignPlugin = createPluginFactory({
//   key: KEY_ALIGN,
//   handlers: {
//     onChange: (editor) => (value) => {
//       console.info(editor, value);
//     },
//     onKeyDown: (editor) => (event) => {
//       console.info(`You pressed ${event.key}`);
//     },
//   },
//   // Note that we're using `then` to access to the editor
//   then: (editor) => ({
//     renderAboveEditable:({children})=>(<div><span>{children}</span><span>ddd</span></div>),
//     inject: {
//       props: {
//         nodeKey: KEY_ALIGN,
//         defaultNodeValue: 'left',
//         styleKey: 'textAlign',
//         validNodeValues: ['left', 'center', 'right', 'justify'],
//         validTypes: [getPluginType(editor, ELEMENT_DEFAULT)],
//       },
//     },
//   }),
// });

import React from 'react';
import { cn, withRef } from '@udecode/cn';
import { PlateElement } from '@udecode/plate-common';
import {
  useTodoListElement,
  useTodoListElementState,
} from '@udecode/plate-list';

import { Checkbox } from './checkbox';

export const TodoListElement = withRef<typeof PlateElement>(
  ({ className, children, ...props }, ref) => {
    const { element } = props;
    const state = useTodoListElementState({ element });
    const { checkboxProps } = useTodoListElement(state);

    return (
      <PlateElement
        ref={ref}
        className={cn('flex flex-row py-1', className)}
        {...props}
      >
        <div
          className="mr-1.5 flex select-none items-center justify-center"
          contentEditable={false}
        >
          <Checkbox {...checkboxProps} />
        </div>
        <span
          className={cn(
            'flex-1 focus:outline-none',
            state.checked && 'text-muted-foreground line-through'
          )}
          contentEditable={!state.readOnly}
          suppressContentEditableWarning
        >
          {children}
        </span>
      </PlateElement>
    );
  }
);
