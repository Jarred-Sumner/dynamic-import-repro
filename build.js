const { build } = require("esbuild");

const plugin = {
  name: "plugin",
  setup(build) {
    build.onResolve({ filter: /^manifest$/ }, (args) => {
      return {
        namespace: "Manifest",
        path: "manifest",
      };
    });

    build.onLoad({ namespace: "Manifest", filter: /.*/ }, (args) => {
      return {
        resolveDir: process.cwd(),
        contents: `export const hi = () => import("${process.cwd()}/hi/[name]");
        export const name = () => import("${process.cwd()}/[name]");
        export const index = () => import("${process.cwd()}/index");

        export default {
          hi,
          name,
          index,
        };
        `,
      };
    });
  },
};

require("fs").rmSync("./out", { force: true, recursive: true });

build({
  bundle: true,
  format: "esm",
  splitting: true,
  entryPoints: ["./index-entry.js"],
  plugins: [plugin],
  outdir: "./out",
  logLevel: "debug",
  chunkNames: "I-AM-A-CHUNK-[name]-[hash]",
});
