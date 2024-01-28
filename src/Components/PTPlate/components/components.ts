import {
  useResetPlateEditor, //not used in this project, but I am copying it to different one
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
  createIndentPlugin,//list
  createListPlugin,//list
  createIndentListPlugin,//list

} from "@udecode/plate";
import { ELEMENT_TITLE } from "../pttitle/titleconsts";
import { ELEMENT_TASK } from "../pttask/taskconsts"
import { withProps } from "@udecode/plate";
import {TaskElement} from "../pttask/taskelement"



export const components = createPlateUI({
  [ELEMENT_CODE_BLOCK]: CodeBlockElement,
  [ELEMENT_TITLE]: withProps(StyledElement, {
    styles: {
      root: {
        margin: "0 0 0 0",
        fontSize: "25px",
        fontWeight: "1000",
        color: "gray",
      },
    },
  }),
  [ELEMENT_H1]: withProps(StyledElement, {
    styles: {
      root: {
        margin: "0 0 0 0",
        fontSize: "20px",
        fontWeight: "1000",
      },
    },
  }),
  [ELEMENT_TASK]: TaskElement
});