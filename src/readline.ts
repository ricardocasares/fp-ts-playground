import { number } from "fp-ts";
import * as TE from "fp-ts/TaskEither";
import { createReadStream } from "fs";
import { createInterface } from "node:readline/promises";

export const readlines = TE.tryCatchK(
  async (s: string, count: number = 0) => {
    const input = createReadStream(s);
    const reader = createInterface({ input });

    let collector = "";
    for await (const line of reader) {
      collector += line + "\n";

      count--;
      if (count === 0) break;
    }

    input.close();
    reader.close();

    return collector;
  },

  (reason) => new Error(String(reason))
);
