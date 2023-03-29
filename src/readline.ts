import * as E from "fp-ts/Either";
import * as TE from "fp-ts/TaskEither";
import { createReadStream } from "fs";
import { createInterface } from "node:readline/promises";

export const readlines: (path: string, lineCount?: number) =>
  TE.TaskEither<Error, string> = (path: string, lineCount: number = 0) =>
    TE.tryCatch(async () => {
      const input = createReadStream(path);
      const reader = createInterface({ input });

      let collector = "";
      for await (const line of reader) {
        collector += line + "\n";

        lineCount--;
        if (lineCount === 0) break;
      }

      input.close();
      reader.close();

      return collector;
    }, E.toError);
