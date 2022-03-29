import tap from "tap";
import { Collect } from "stream-collect";

import stringify from "./";
import { Readable } from "stream";

const basicArr = [
  "string",
  0,
  ["nested", "array", { with: "object" }],
  { key: "value" },
];

tap.test("basic stringification", async (t) => {
  const stringified = await Readable.from(basicArr)
    .pipe(stringify())
    .pipe(new Collect({ encoding: "utf-8" }))
    .collect();

  t.equal(stringified, JSON.stringify(basicArr));
});

tap.test("empty array", async (t) => {
  const stringified = await Readable.from([])
    .pipe(stringify())
    .pipe(new Collect({ encoding: "utf-8" }))
    .collect();

  t.equal(stringified, JSON.stringify([]));
});

tap.test("ndjson", async (t) => {
  const stringified = await Readable.from(basicArr)
    .pipe(stringify("", "", "\n"))
    .pipe(new Collect({ encoding: "utf-8" }))
    .collect();

  t.equal(stringified, basicArr.map((obj) => JSON.stringify(obj)).join("\n"));
});
