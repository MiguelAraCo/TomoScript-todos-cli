import * as readline from "node:readline";
import { stdin as input, stdout as output } from "process";

export async function askQuestion(question: string): Promise<string> {
  const stream = readline.createInterface({ input, output });

  question = question.endsWith(" ") ? question : `${question} `;

  return new Promise<string>((resolve, reject) => {
    stream.question(question, resolve);
  }).finally(() => stream.close());
}
