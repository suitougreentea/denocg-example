import { denocg } from "./deps.ts";

export type TypeDefinition = {
  replicants: {
    a: number;
    b: string;
  };
};

export const config: denocg.ServerConfig<TypeDefinition> = {
  socketPort: 8515,
  assetsPort: 8514,
  assetsRoot: "./client",
  replicants: {
    b: { defaultValue: "Hellllll" },
  },
};
