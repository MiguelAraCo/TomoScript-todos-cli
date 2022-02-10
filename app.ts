#!/usr/bin/env ts-node

import yargs from "yargs/yargs";
import { askQuestion } from "./src/utils/askQuestion";
import { ListHandler } from "./src/handlers/list";
import { boolean, CommandModule, demandOption } from "yargs";
import { AddHandler } from "./src/handlers/add";
import { EditHandler } from "./src/handlers/edit";
import { DeleteHandler } from "./src/handlers/delete";

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
        yargs.options({
          all: {
            boolean: true,
            describe: "If provided, list all tasks (even the ones marked as completed)",
            default: false,
          },
        }),
      handler: ListHandler.handle,
    } as CommandModule<{}, ListHandler.Args>)
    .command({
      command: "add",
      describe: "Adds a task",
      builder: (yargs) =>
        yargs.options({
          id: {
            type: "string",
            describe: "Id of each task",
          },
          description: {
            type: "string",
            describe: "Description of the task",
            demandOption: true,
          },
          by: {
            type: "string",
            describe: "Due date of the task",
          },
        }),
      handler: AddHandler.handle,
    } as CommandModule<{}, AddHandler.Args>)
    .command({
      command: "edit",
      describe: "Edit an existing task",
      builder: (yargs) =>
        yargs.options({
          id: {
            type: "string",
            describe: "Id of each task",
            demandOption: true,
          },
          done: {
            boolean: true,
            describe: "Task is complete",
          },
          pending: {
            boolean: true,
            describe: "Task is not complete",
          },
          description: {
            type: "string",
            describe: "Description of the task",
          },
          by:{
            type: "string",
            describe: "Due date of the task"
          }
        }),
      handler: EditHandler.handle,
    } as CommandModule<{}, EditHandler.Args>)
    .command({
      command: "delete",
      describe: "Delete a task",
      builder: (yargs) =>
        yargs.options({
          id: {
            type: "string",
            describe: "Id of each task",
            demandOption: true,
          },
          description: {
            type: "string",
            describe: "Description of the task",
          },
          done: {
            boolean: true,
            describe: "Task is complete",
          },
          pending: {
            boolean: true,
            describe: "Task is not complete",
          },
          by: {
            type: "string",
            describe: "Due date of the task",
          },
        }),
      handler: DeleteHandler.handle,
    } as CommandModule<{}, DeleteHandler.Args>)
    .help()
    .parse(args);
}

main().catch(console.error);
