import { readFile } from "node:fs/promises";
import { Task } from "../models/Task";

// it handles list commands
export namespace ListHandler {
  export type Args = {
    all: boolean;
  };

  const tasksFile = "data/db.json";

  export const handle = async (args: Args): Promise<void> => {

    //TODO: Line12-20 make a separate function. You may reuse it
    let allTasks: Array<Task>;
    try {
      const data = await readFile(tasksFile);
      const stringContent = data.toString();
      allTasks = JSON.parse(stringContent);
    } catch (e: unknown) {
      console.error("Error! We couldn't read the file...");
      return;
    }

    const pendingTasks = allTasks.filter((task) => {
      return !task.done;
    });

    // Using the ternary operator
    const tasksToPrint: Array<Task> = args.all ? allTasks : pendingTasks;

    //TODO:line 30-36 make a separate function

    // map function : changing Array<string> to Array <string> + [] or [x]
    const taskStrings: Array<string> = tasksToPrint.map((task) => {
      if (task.done) {
        return `[x] ${task.description}`;
      } else {
        return `[ ] ${task.description}`;
      }
    });

     //TODO:line 41-43 make a separate function
    for (const taskString of taskStrings) {
      console.log(taskString);
    }
  };
}
