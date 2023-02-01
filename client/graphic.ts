import { type TypeDefinition } from "../config.ts";
import { confetti, denocg } from "./deps.ts";

const ctx = await denocg.getContext<TypeDefinition>();

const divA = document.querySelector<HTMLDivElement>("#replicant-a")!;
const replicantA = await ctx.getReplicant("a");
replicantA.subscribe((newValue, _) => divA.innerText = String(newValue));

const divB = document.querySelector<HTMLDivElement>("#replicant-b")!;
const replicantB = await ctx.getReplicant("b");
replicantB.subscribe((newValue, _) => divB.innerText = String(newValue));

confetti();
