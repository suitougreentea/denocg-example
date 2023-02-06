import { type TypeDefinition } from "../config.ts";
import { confetti, denocg } from "./deps.ts";

const client = await denocg.getClient<TypeDefinition>();

const divA = document.querySelector<HTMLDivElement>("#replicant-a")!;
const replicantA = await client.getReplicant("a");
replicantA.subscribe((newValue, _) => divA.innerText = String(newValue));

const divB = document.querySelector<HTMLDivElement>("#replicant-b")!;
const replicantB = await client.getReplicant("b");
replicantB.subscribe((newValue, _) => divB.innerText = String(newValue));

client.addMessageListener(
  "testMessageVoid",
  () => console.log("testMessageVoid received #1"),
);
client.addMessageListener(
  "testMessageVoid",
  () => console.log("testMessageVoid received #2"),
);

confetti();
