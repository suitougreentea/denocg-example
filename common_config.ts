import { denocg } from "./deps.ts";

export const commonConfig: denocg.CommonConfig = {
  socketPort: 8515,
};

export type TypeDefinition = {
  replicants: {
    a: number;
    b: string;
  };
};
