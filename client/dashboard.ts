import { type TypeDefinition } from "../config.ts";
import { confetti, denocg } from "./deps.ts";

const client = await denocg.getClient<TypeDefinition>();

const inputA = document.querySelector<HTMLInputElement>("#replicant-a")!;
const buttonA = document.querySelector<HTMLButtonElement>(
  "#update-replicant-a",
)!;
const replicantA = await client.getReplicant("a");
replicantA.subscribe((newValue, _) => inputA.value = String(newValue));
buttonA.onclick = (_) => replicantA.setValue(Number(inputA.value));

const inputB = document.querySelector<HTMLInputElement>("#replicant-b")!;
const buttonB = document.querySelector<HTMLButtonElement>(
  "#update-replicant-b",
)!;
const replicantB = await client.getReplicant("b");
replicantB.subscribe((newValue, _) => inputB.value = String(newValue));
buttonB.onclick = (_) => replicantB.setValue(inputB.value);

const replicantC = await client.getReplicant("c");
replicantC.setValue({
  a: [0, 1, 2, 10],
  b: { nested: ["hey", "this", "is", "a", "pen"] },
});

const inputD = document.querySelector<HTMLInputElement>("#replicant-d")!;
const buttonD = document.querySelector<HTMLButtonElement>(
  "#update-replicant-d",
)!;
const replicantD = await client.getReplicant("d");
replicantD.subscribe((newValue, _) => inputD.value = String(newValue));
buttonD.onclick = (_) => replicantD.setValue(inputD.value);

console.log(
  await client.requestToServer("withParamsWithReturn", "let's make uppercase"),
);
console.log(
  await client.requestToServer("withParamsWithoutReturn", [
    "let's",
    "make",
    "all",
    "uppercase",
  ]),
);
console.log(await client.requestToServer("withoutParamsWithReturn"));
console.log(await client.requestToServer("withoutParamsWithoutReturn"));

client.addMessageListener(
  "testMessage",
  (params) => console.log("testMessage received:", params),
);
client.addMessageListener(
  "testMessageVoid",
  () => console.log("testMessageVoid received #1"),
);
client.addMessageListener(
  "testMessageVoid",
  () => console.log("testMessageVoid received #2"),
);

client.broadcastMessage("testMessage", { a: 1234, b: "Hello!!!" });
client.broadcastMessage("testMessageVoid");

confetti();
