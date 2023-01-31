import { denocg } from "./deps.ts";

export const config: denocg.ServerConfig = {
  socketPort: 8515,
  assetsPort: 8514,
  assetsRoot: "./client",
};

export type TypeDefinition = {
  replicants: {
    a: number;
    b: string;
  };
};
