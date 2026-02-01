"use client"; // Client Component
import React from "react";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
