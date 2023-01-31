import { TypeDefinition } from "../common_config.ts";
import { clientConfig } from "./client_config.ts";
import { confetti, denocg } from "./deps.ts";

const ctx = await denocg.getContext<TypeDefinition>(clientConfig);

const inputA = document.querySelector<HTMLInputElement>("#replicant-a")!;
const buttonA = document.querySelector<HTMLButtonElement>(
  "#update-replicant-a",
)!;
const replicantA = await ctx.getReplicant("a", { defaultValue: 123 });
replicantA.subscribe((newValue, _) => inputA.value = String(newValue));
buttonA.onclick = (_) => replicantA.setValue(Number(inputA.value));

const inputB = document.querySelector<HTMLInputElement>("#replicant-b")!;
const buttonB = document.querySelector<HTMLButtonElement>(
  "#update-replicant-b",
)!;
const replicantB = await ctx.getReplicant("b", { defaultValue: "hello" });
replicantB.subscribe((newValue, _) => inputB.value = newValue);
buttonB.onclick = (_) => replicantB.setValue(inputB.value);

confetti();
