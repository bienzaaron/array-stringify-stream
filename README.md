# array-stringify-stream
[![npm version](https://badge.fury.io/js/array-stringify-stream.svg)](https://badge.fury.io/js/array-stringify-stream)

array-stringify-stream is a utility which stringifies JavaScript arrays into JSON using node streams. This is helpful for writing very large JSON arrays, where the entire array may not fit in application memory.

Usage:
```javascript
const someArray = [
  "string",
  0,
  ["nested", "array", { with: "object" }],
  { key: "value" },
];

const stringified = await pipeline(
  Readable.from(basicArr),
  stringify(),
  fs.createWriteStream('./file.json')
);
// file.json contains '["string",0,["nested","array",{"with":"object"}],{"key":"value"}]'
```

Writing as `ndjson`:
```javascript
const stringified = await pipeline(
  Readable.from(basicArr),
  stringify("", "", "\n"),
  fs.createWriteStream('./file.json')
);
// file.json contains '"string"\n0\n["nested","array",{"with":"object"}]\n{"key":"value"}'
```

Using a custom stringifier function:
```javascript
const stringified = await pipeline(
  Readable.from(basicArr),
  stringify("[", "]", ",", (obj) => 'foo'),
  fs.createWriteStream('./file.json')
);
// file.json contains ["foo", "foo", "foo", "foo"]
```


 