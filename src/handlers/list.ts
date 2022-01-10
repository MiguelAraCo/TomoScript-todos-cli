import { readFile } from "node:fs/promises";
import { Task } from "../models/Task";

export namespace ListHandler {
  export type Args = {
    all: boolean;
  };

  const taskData = "data/db.json";

  export const handle = async (args: Args): Promise<void> => {
    let allTasks: Array<Task>;
    try {
      const data = await readFile(taskData);
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

    // map function : changing Array<string> to Array <string> + [] or [x]
    const taskStrings: Array<string> = tasksToPrint.map((task) => {
      if (task.done) {
        return `[x] ${task.description}`;
      } else {
        return `[ ] ${task.description}`;
      }
    });

    for (const taskString of taskStrings) {
      console.log(taskString);
    }
  };
}
