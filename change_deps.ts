import { parse } from "https://deno.land/std@0.182.0/flags/mod.ts";

const flags = parse(Deno.args, {
  boolean: ["local", "latest", "help"],
  string: ["custom"],
});

const isFlagsValid = (flags.local && !flags.latest && !flags.custom) ||
  (!flags.local && flags.latest && !flags.custom) ||
  (!flags.local && !flags.latest && flags.custom);

if (flags.help || !isFlagsValid) {
  console.info(
    "Usage: deno run change_deps.ts (--local | --latest | --custom=<path>)",
  );
  Deno.exit(flags.help ? 0 : -1);
}

let moduleRoot: string;
let relativePath: boolean;

if (flags.local) {
  moduleRoot = "../denocg";
  relativePath = true;
} else if (flags.latest) {
  const response = await fetch("https://deno.land/x/denocg");
  moduleRoot = response.url;
  relativePath = false;
} else {
  moduleRoot = flags.custom!;
  relativePath = false;
}

function process(path: string, modulePath: string) {
  console.log(path);
  let text = Deno.readTextFileSync(path);
  text = text.replace(
    /export \* as denocg from \"(.*)\";/,
    `export * as denocg from "${modulePath}";`,
  );
  Deno.writeTextFileSync(path, text);
}

process("./deps.ts", `${moduleRoot}/server/mod.ts`);
process(
  "./client/deps.ts",
  `${relativePath ? "../" : ""}${moduleRoot}/client/mod.ts`,
);
