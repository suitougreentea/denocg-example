import { config } from "./config.ts";
import { denocg } from "./deps.ts";

const server = await denocg.launchServer(config);

// Replicants
////////////////////////////////////////////////////////////////////////////////

// replicants can be subscribed from the server
const exampleReplicant = server.getReplicant("example");
exampleReplicant.subscribe((value) =>
  console.log("example replicant updated:", value)
);

// replicants can be updated from the server
const exampleRegularUpdateReplicant = server.getReplicant(
  "exampleRegularUpdateFromServer",
);
setInterval(() => exampleRegularUpdateReplicant.setValue(Math.random()), 1000);

// Messages
////////////////////////////////////////////////////////////////////////////////

// messages can be subscribed from the server
server.addMessageListener(
  "exampleVoid",
  () => console.log("exampleVoid message received"),
);

// messages can be sent from the server
setInterval(
  () =>
    server.broadcastMessage("exampleFromServer", { tick: performance.now() }),
  5000,
);

// Requests
////////////////////////////////////////////////////////////////////////////////

// registering handlers
// clients will get an error if they called a request whose handler is not registered
server.registerRequestHandler(
  "withParamsWithReturn",
  (params: string) => params.toUpperCase(),
);

// returns the server's current time
server.registerRequestHandler(
  "withoutParamsWithReturn",
  () => Date.now(),
);

// this request returns nothing
// but use requests instead of messages if the clients need to know if the procedure successfully run
server.registerRequestHandler("withParamsWithoutReturn", (params: string[]) => {
  console.log("withParamsWithoutReturn request received:", params);
});

// handlers can be async
server.registerRequestHandler("withoutParamsWithoutReturn", async () => {
  console.log("withoutParamsWithoutReturn request received");
  const heavyTask = new Promise<void>((resolve, _) =>
    setTimeout(() => resolve(), 3000)
  );
  await heavyTask;
});
