import { type TypeDefinition } from "../config.ts";
import { denocg } from "./deps.ts";

const client = await denocg.getClient<TypeDefinition>();

// Replicants
////////////////////////////////////////////////////////////////////////////////

const exampleReplicant = await client.getReplicant("example");
exampleReplicant.subscribe((newValue, _) => {
  if (newValue === undefined) return; // no values set yet
  const span = document.querySelector<HTMLSpanElement>("#replicant-example");
  if (span) span.innerText = newValue;
});

const exampleRegularUpdateFromServerReplicant = await client.getReplicant(
  "exampleRegularUpdateFromServer",
);
exampleRegularUpdateFromServerReplicant.subscribe((newValue, _) => {
  if (newValue === undefined) return; // no values set yet
  const span = document.querySelector<HTMLSpanElement>(
    "#replicant-example-regular-update-from-server",
  );
  if (span) span.innerText = String(newValue);
});

const exampleWithComplexTypeReplicant = await client.getReplicant(
  "exampleWithComplexType",
);
exampleWithComplexTypeReplicant.subscribe((newValue, _) => {
  if (newValue === undefined) return; // no values set yet
  const span = document.querySelector<HTMLSpanElement>(
    "#replicant-example-with-complex-type",
  );
  if (span) span.innerText = JSON.stringify(newValue);
});

// Messages
////////////////////////////////////////////////////////////////////////////////

const addEntryToMessageLog = (message: string) => {
  const ul = document.querySelector<HTMLUListElement>("#messages-log");
  const li = document.createElement("li");
  li.innerText = message;
  ul?.appendChild(li);
};
client.addMessageListener(
  "example",
  (params) =>
    addEntryToMessageLog(
      `example message received: a = ${params.a}, b = ${params.b}`,
    ),
);
client.addMessageListener(
  "exampleVoid",
  () => addEntryToMessageLog(`exampleVoid message received`),
);
client.addMessageListener(
  "exampleFromServer",
  (params) =>
    addEntryToMessageLog(
      `exampleFromServer message received: tick = ${params.tick}`,
    ),
);

// Requests
////////////////////////////////////////////////////////////////////////////////

// no example here
// take a look at main.ts and graphic.ts
