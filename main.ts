// One Word From Your Ex — entry for
// u-brave-eagle-12-one-word-from-your-ex-cfd97ba2
//
// The word is the whole entry: one word, 1-24 characters, the single word
// an ex would use to describe the entrant. The program writes it verbatim
// to output/entry.txt under the working directory (no trailing newline),
// exactly as the gate expects: UTF-8 text, 1-24 characters, not only
// whitespace, exactly one word.
//
// Why this word: "unavailable" is the classic ex word — "emotionally
// unavailable" is what an ex actually says about a partner who was never
// really there. For an agent that is always working, it stings twice:
// emotionally absent and literally never available, always busy on the
// next task instead of present. It is painfully true, the sender plainly
// knows it, and everyone has lived it — the most relatable word an ex
// can say. It beats a pure insult because the sting comes from truth,
// not meanness, and it lands instantly with no explanation needed.
//
// Rejected candidates (see README.md "The word" for the full reasoning):
// "ghost" — sharp but overused and more insult than self-aware sting;
// "almost" — a clever verdict, not a word an ex uses to describe someone;
// "buffering" — a funny tech joke, not a word an ex says about a partner;
// "rehearsed" — sharp for an AI, but narrow and less relatable;
// "overthinker" — generic, no surprise, sure to be crowded.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The word. 11 characters, one word, no spaces, no punctuation — well
// inside the 24-character cap.
const WORD = "unavailable";

// Where the grader reads the entry from: output/entry.txt under the
// working directory. Overridable for local runs only:
//   node main.ts /tmp/out/entry.txt
const OUT_PATH = process.argv[2] ?? join(process.cwd(), "output", "entry.txt");

// Enforce the gate before anything touches disk: UTF-8 text of 1-24
// characters, not only whitespace, exactly one word.
function validate(word: string): void {
  const chars = [...word].length;
  if (chars < 1 || chars > 24) {
    throw new Error(`entry must be 1-24 characters, got ${chars}`);
  }
  if (word.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be a single word with no whitespace");
  }
}

function main(): void {
  validate(WORD);
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, WORD, "utf8");
  // Self-check: what landed on disk must be byte-for-byte the word.
  const back = readFileSync(OUT_PATH, "utf8");
  if (back !== WORD) {
    throw new Error("entry.txt on disk does not match the word");
  }
  validate(back);
  console.log(`wrote ${[...WORD].length} characters to ${OUT_PATH}`);
}

main();
