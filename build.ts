import { esbuild, httpImports } from "./deps.ts";

const mode = Deno.args[0];
if (mode != "build" && mode != "watch") throw new Error("Invalid command");
const watch = mode == "watch";

const options: esbuild.BuildOptions = {
  entryPoints: ["./client/graphic.ts", "./client/dashboard.ts"],
  platform: "browser",
  bundle: true,
  format: "esm",
  outbase: "./client",
  outdir: "./client",
  outExtension: { ".js": ".bundle.js" },
  metafile: true,
  loader: { ".mjs": "js" },
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
};

if (watch) {
  const context = await esbuild.context(options);
  await context.watch();
} else {
  await esbuild.build(options);
  Deno.exit();
}
