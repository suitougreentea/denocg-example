import { type TypeDefinition } from "../config.ts";
import { denocg } from "./deps.ts";

const client = await denocg.getClient<TypeDefinition>();

// Replicants
////////////////////////////////////////////////////////////////////////////////

// simple input
const exampleReplicant = await client.getReplicant("example");
const replicantExampleInput = document.querySelector<HTMLInputElement>(
  "#replicant-example",
);
const replicantExampleButton = document.querySelector<HTMLButtonElement>(
  "#update-replicant-example",
);
if (replicantExampleInput && replicantExampleButton) {
  exampleReplicant.subscribe((newValue, _) => {
    if (newValue === undefined) return; // no values set yet
    replicantExampleInput.value = newValue;
  });
  replicantExampleButton.addEventListener("click", (_) => {
    exampleReplicant.setValue(replicantExampleInput.value);
  });
}

// values of non-persistent replicants will be reset when server is restarted
const exampleNonPersistentReplicant = await client.getReplicant(
  "exampleNonPersistent",
);
const replicantExampleNonPersistentInput = document.querySelector<
  HTMLInputElement
>("#replicant-example-non-persistent");
const replicantExampleNonPersistentButton = document.querySelector<
  HTMLButtonElement
>("#update-replicant-example-non-persistent");
if (replicantExampleNonPersistentInput && replicantExampleNonPersistentButton) {
  exampleNonPersistentReplicant.subscribe((newValue, _) => {
    if (newValue === undefined) return; // no values set yet
    replicantExampleNonPersistentInput.value = newValue;
  });
  replicantExampleNonPersistentButton.addEventListener("click", (_) => {
    exampleNonPersistentReplicant.setValue(
      replicantExampleNonPersistentInput.value,
    );
  });
}

// randomly generate the content of a complex object
const exampleWithComplexTypeReplicant = await client.getReplicant(
  "exampleWithComplexType",
);
const replicantExampleWithComplexType = document.querySelector<
  HTMLButtonElement
>("#update-replicant-example-with-complex-type");
replicantExampleWithComplexType?.addEventListener("click", (_) => {
  const array: number[] = [];
  const nestedArray: string[] = [];
  for (let i = 0; i < 10; i++) {
    if (Math.random() < 0.5) array.push(Math.floor(Math.random() * 10));
    if (Math.random() < 0.5) {
      nestedArray.push(
        String.fromCharCode(0x41 + Math.floor(Math.random() * 10)),
      );
    }
  }
  exampleWithComplexTypeReplicant.setValue({ array, object: { nestedArray } });
});

// Messages
////////////////////////////////////////////////////////////////////////////////

// messages are broadcast to server and all clients (including self)
const messageExampleParamsAInput = document.querySelector<HTMLInputElement>(
  "#message-example-params-a",
);
const messageExampleParamsBInput = document.querySelector<HTMLInputElement>(
  "#message-example-params-b",
);
const sendMessageExampleButton = document.querySelector<HTMLButtonElement>(
  "#send-message-example",
);
if (
  messageExampleParamsAInput && messageExampleParamsBInput &&
  sendMessageExampleButton
) {
  sendMessageExampleButton.addEventListener("click", (_) => {
    const a = Number(messageExampleParamsAInput.value);
    const b = messageExampleParamsBInput.value;
    client.broadcastMessage("example", { a, b });
  });
}

// just an example of untyped message
const sendMessageExampleVoidButton = document.querySelector<HTMLButtonElement>(
  "#send-message-example-void",
);
sendMessageExampleVoidButton?.addEventListener("click", (_) => {
  client.broadcastMessage("exampleVoid");
});

// Requests
////////////////////////////////////////////////////////////////////////////////

// requests are sent to the server and the caller can receive the result
const requestWithParamsWithReturnParamInput = document.querySelector<
  HTMLInputElement
>("#request-with-params-with-return-param");
const sendRequestWithParamsWithReturn = document.querySelector<
  HTMLButtonElement
>("#send-request-with-params-with-return");
if (requestWithParamsWithReturnParamInput && sendRequestWithParamsWithReturn) {
  sendRequestWithParamsWithReturn.addEventListener("click", async (_) => {
    const param = requestWithParamsWithReturnParamInput.value;
    const result = await client.requestToServer("withParamsWithReturn", param);
    window.alert(result);
  });
}

// no input params
const sendRequestWithoutParamsWithReturn = document.querySelector<
  HTMLButtonElement
>("#send-request-without-params-with-return");
sendRequestWithoutParamsWithReturn?.addEventListener("click", async (_) => {
  const result = await client.requestToServer("withoutParamsWithReturn");
  window.alert(`Server time (as number): ${result}`);
});

// this request returns nothing
// but use requests instead of messages if the clients need to know if the procedure successfully run
const requestWithParamsWithoutReturnParamInput = document.querySelector<
  HTMLInputElement
>("#request-with-params-without-return-param");
const sendRequestWithParamsWithoutReturn = document.querySelector<
  HTMLButtonElement
>("#send-request-with-params-without-return");
if (
  requestWithParamsWithoutReturnParamInput && sendRequestWithParamsWithoutReturn
) {
  sendRequestWithParamsWithoutReturn.addEventListener("click", async (_) => {
    const param = requestWithParamsWithoutReturnParamInput.value.split(",");
    await client.requestToServer("withParamsWithoutReturn", param);
    window.alert("Successfully handled. See the server log!");
  });
}

// wait for a heavy task
const sendRequestWithoutParamsWithoutReturn = document.querySelector<
  HTMLButtonElement
>("#send-request-without-params-without-return");
sendRequestWithoutParamsWithoutReturn?.addEventListener("click", async (_) => {
  await client.requestToServer("withoutParamsWithoutReturn");
  window.alert("Heavy task done!");
});
