import { readFile } from "node:fs/promises";
import { Task } from "../models/Task";

export namespace ListHandler {
  export type Args = {
    all: boolean;
  };

  const taskData = "data/db.json";

  export const handle = async (args: Args): Promise<void> => {
    const data = await readFile(taskData);
    const stringContent = data.toString();
    const taskObjects: Array<Task> = JSON.parse(stringContent);

    const taskStrings: Array<string> = taskObjects.map((task) => {
      if (task.done) {
        return `[x] ${task.description}`;
      } else {
        return `[ ] ${task.description}`;
      }
    });
    for (const eachTask of taskStrings) {
      eachTask.length;
      console.log(eachTask);
    }
  };
}
