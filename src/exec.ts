import child from "child_process";
import * as TE from "fp-ts/TaskEither";

export const exec = TE.taskify(child.exec);
