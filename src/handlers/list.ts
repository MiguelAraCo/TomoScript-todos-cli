import { readFile } from "node:fs/promises";
import { Task } from "../models/Task";

export namespace ListHandler {
  export type Args = {
    all: boolean;
  };

  const taskData = "data/db.json";

  export const handle = async (args: Args): Promise<void> => {
    let taskObjects: Array<Task>;
    try {
      const data = await readFile(taskData);
      const stringContent = data.toString();
      taskObjects = JSON.parse(stringContent);
    } catch (e: unknown) {
      console.error("Error! We couldn't read the file...");
      return;
    }
    const taskStrings: Array<string> = taskObjects.map((task) => {
      if (task.done) {
        return `[x] ${task.description}`;
      } else {
        return `[ ] ${task.description}`;
      }
    });
    for (const eachTask of taskStrings) {
      console.log(eachTask);
    }
  };
}
