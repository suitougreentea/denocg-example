import { denocg } from "./deps.ts";

export type TypeDefinition = {
  replicants: {
    a: number;
    b: string;
    c: { a: number[]; b: { nested: string[] } };
    d: string;
  };
};

export const config: denocg.ServerConfig<TypeDefinition> = {
  socketPort: 8515,
  assetsPort: 8514,
  assetsRoot: "./client",
  replicants: {
    b: { defaultValue: "Hellllll" },
    d: { defaultValue: "not persistent", persistent: false },
  },
};
