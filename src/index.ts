import * as TE from "fp-ts/TaskEither";
import { pipe } from "fp-ts/function";
import { exec } from "./exec";
import { readlines } from "./readline";

// run all these commands in parallel
const program1 = TE.sequenceArray([
  exec('ls -a'),
  exec('ping -c 1 1.1.1.1'),
  exec('curl -o puppies.json https://dog.ceo/api/breed/hound/images/random/3')
]);

// run all these commands in series
const program2 = TE.sequenceSeqArray([
  exec('ls -a'),
  readlines("puppies.json", 12),
  exec('tail -n 1 puppies.json'),
  exec('tail -n +2 puppies.json > tmp'),
  exec('mv tmp puppies.json'),
]);

// compose programs
const main = pipe(
  TE.Do,
  TE.sequenceArray([
    program1,
    program2,
  ])
);

main.then(console.log);
