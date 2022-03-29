import { Transform } from "node:stream";

export default (
  startChar = "[",
  endChar = "]",
  separator = ",",
  stringifier: (x: unknown) => string = JSON.stringify
) => {
  let first = true;
  return new Transform({
    transform(obj: unknown, encoding: never, callback: () => void) {
      if (first) {
        this.push(startChar);
        first = false;
      } else {
        this.push(separator);
      }
      this.push(stringifier(obj));
      callback();
    },
    flush(callback: () => void) {
      if (first) {
        this.push(startChar);
      }
      this.push(endChar);
      callback();
    },
    writableObjectMode: true,
  });
};
