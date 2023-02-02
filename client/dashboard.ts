import { type TypeDefinition } from "../config.ts";
import { confetti, denocg } from "./deps.ts";

const ctx = await denocg.getContext<TypeDefinition>();

const inputA = document.querySelector<HTMLInputElement>("#replicant-a")!;
const buttonA = document.querySelector<HTMLButtonElement>(
  "#update-replicant-a",
)!;
const replicantA = await ctx.getReplicant("a");
replicantA.subscribe((newValue, _) => inputA.value = String(newValue));
buttonA.onclick = (_) => replicantA.setValue(Number(inputA.value));

const inputB = document.querySelector<HTMLInputElement>("#replicant-b")!;
const buttonB = document.querySelector<HTMLButtonElement>(
  "#update-replicant-b",
)!;
const replicantB = await ctx.getReplicant("b");
replicantB.subscribe((newValue, _) => inputB.value = String(newValue));
buttonB.onclick = (_) => replicantB.setValue(inputB.value);

const replicantC = await ctx.getReplicant("c");
replicantC.setValue({
  a: [0, 1, 2, 10],
  b: { nested: ["hey", "this", "is", "a", "pen"] },
});

confetti();
