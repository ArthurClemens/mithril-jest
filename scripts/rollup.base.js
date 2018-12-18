import fs from "fs";
import babel from "rollup-plugin-babel";
import { eslint } from "rollup-plugin-eslint";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export const pkg = JSON.parse(fs.readFileSync("./package.json"));
if (!pkg) {
  throw("Could not read package.json");
}
const env = process.env; // eslint-disable-line no-undef
const input = env.INPUT || "index.js";
const name = env.NAME || pkg.name;
const external = Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.peerDependencies || {}));

const globals = {};
external.forEach(ext => {
  switch (ext) {
  default:
    globals[ext] = ext;
  }
});

export const createConfig = ({ includeDepencies }) => ({
  input,
  external: includeDepencies ? [] : external,
  output: {
    name,
    globals,
  },
  plugins: [

    // Resolve libs in node_modules
    resolve({
      jsnext: true,
      main: true,
    }),

    // Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
    commonjs({
      include: "node_modules/**"
    }),

    eslint({
      cache: true
    }),

    babel({
      exclude: "node_modules/**"
    })
  ]
});

