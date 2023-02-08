import { createContext } from "react";

export interface SeqObj {
  sequence: number[];
}


export const Context = createContext<Partial<SeqObj>>({});