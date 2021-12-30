import type { NextPage } from "next";
import React from "react";

export type CustomNextPage = NextPage & {
  layout?: React.ElementType;
  auth?: boolean;
};
