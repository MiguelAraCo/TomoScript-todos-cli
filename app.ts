#!./node_modules/.bin ts-node

import yargs from "yargs/yargs";
import { askQuestion } from "./src/utils/askQuestion";
import { ListHandler } from "./src/handlers/list";
import { CommandModule } from "yargs";
import { AddHandler } from "./src/handlers/add";

/**
 * If the user provided arguments when executing the application this function
 * returns them, otherwise, it asks the user to provide them (and then returns
 * them)
 */
async function getArgs(): Promise<Array<string> | string> {
  const args = process.argv.splice(2);

  if (args.length === 0) {
    // No commands were provided, ask for a command
    return askQuestion("What's your command?");
  } else {
    return args;
  }
}

/**
 * Entry point of the application
 */
async function main(): Promise<void> {
  const args = await getArgs();

  // yargs configuration to easily parse commands and arguments
  // Read more: https://yargs.js.org/docs/
  yargs()
    .command({
      command: "list",
      describe: "List available tasks",
      builder: (yargs) =>
        // Configuration for the options the 'list' command accepts
        yargs.options({
          all: {
            boolean: true,
            describe: "If provided, list all tasks (even the ones marked as completed)",
            default: false,
          },
        }),
      // If the user specified the 'list' command, this function will be executed
      handler: ListHandler.handle,
    } as CommandModule<{}, ListHandler.Args>)
    .command({
      command: "add",
      describe: "Adds a task",
      builder: (yargs) =>
        // Configuration for the options the 'add' command accepts
        yargs.options({
          description: {
            type: "string",
            describe: "Description of the task",
            demandOption: true,
          },
        }),
      // If the user specified the 'add' command, this function will be executed
      handler: AddHandler.handle,
    } as CommandModule<{}, AddHandler.Args>)
    .parse(args);
}

main().catch(console.error);
