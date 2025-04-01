"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

const Portal = ({
  children,
  domNode,
}: {
  children: ReactNode;
  domNode: Element | DocumentFragment;
}) => {
  return createPortal(children, domNode);
};

export default Portal;
