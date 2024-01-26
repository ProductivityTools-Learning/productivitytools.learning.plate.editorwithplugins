import React, { useMemo, useState } from "react";

import { PlateRenderElementProps } from "@udecode/plate";

export const TaskElement = ({ attributes, children }: PlateRenderElementProps) => (
  <div {...attributes}>{children}</div>
);
