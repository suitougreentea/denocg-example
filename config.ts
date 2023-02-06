import { denocg } from "./deps.ts";

type EmptyObject = Record<keyof unknown, never>;

export type TypeDefinition = {
  replicants: {
    example: string;
    exampleNonPersistent: string;
    exampleWithComplexType: {
      array: number[];
      object: { nestedArray: string[] };
    };
    exampleRegularUpdateFromServer: number;
  };

  messages: {
    example: { params: { a: number; b: string } };
    exampleVoid: EmptyObject;
    exampleFromServer: { params: { tick: number } };
  };

  requests: {
    withParamsWithReturn: { params: string; result: string };
    withoutParamsWithReturn: { result: number };
    withParamsWithoutReturn: { params: string[] };
    withoutParamsWithoutReturn: EmptyObject;
  };
};

export const config: denocg.ServerConfig<TypeDefinition> = {
  socketPort: 8515,
  assetsPort: 8514,
  assetsRoot: "./client",
  replicants: {
    example: {
      defaultValue: "string replicant",
    },
    exampleNonPersistent: {
      persistent: false,
      defaultValue: "string non-persistent replicant",
    },
  },
};
