import { denocg } from "./deps.ts";

type EmptyObject = Record<keyof unknown, never>;

export type TypeDefinition = {
  replicants: {
    a: number;
    b: string;
    c: { a: number[]; b: { nested: string[] } };
    d: string;
  };
  requests: {
    withParamsWithReturn: { params: string; result: string };
    withoutParamsWithReturn: { result: number };
    withParamsWithoutReturn: { params: string[] };
    withoutParamsWithoutReturn: EmptyObject;
  };
  messages: {
    testMessage: { params: { a: number; b: string } };
    testMessageVoid: EmptyObject;
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
