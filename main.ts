import { config } from "./config.ts";
import { denocg, esbuild, httpFetch } from "./deps.ts";

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
    httpFetch,
  ],
});
await esbuildContext.watch();

const server = denocg.launchServer({
  ...config,
});

const replicantA = server.getReplicant("a");
setInterval(() => replicantA.setValue(Math.random()), 1000);

export function add(a: number, b: number): number {
  return a + b;
}
