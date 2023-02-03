import { config } from "./config.ts";
import { denocg, esbuild, httpImports } from "./deps.ts";

const esbuildContext = await esbuild.context({
  entryPoints: ["./client/graphic.ts", "./client/dashboard.ts"],
  platform: "browser",
  bundle: true,
  format: "esm",
  outbase: "./client",
  outdir: "./client",
  outExtension: { ".js": ".bundle.js" },
  metafile: true,
  plugins: [
    httpImports(),
    {
      name: "append-comments",
      setup: (build) => {
        build.onEnd((result) => {
          Object.keys(result.metafile?.outputs ?? {}).forEach((path) => {
            const input = Deno.readTextFileSync(path);
            const output =
              "// deno-lint-ignore-file\n// deno-fmt-ignore-file\n" + input;
            Deno.writeTextFileSync(path, output);
          });
        });
      },
    },
  ],
});
await esbuildContext.watch();

const server = await denocg.launchServer(config);

const replicantA = server.getReplicant("a");
setInterval(() => replicantA.setValue(Math.random()), 100);

const replicantC = server.getReplicant("c");
console.log(replicantC.getValue());
