import { readFile, writeFile } from "node:fs/promises";
import { Task } from "../models/Task";
import { ListHandler } from "./list";

export namespace AddHandler {
  export type Args = {
    description: string;
  };

  const tasksFile = "data/db.json";

  export const handle = async (args: Args): Promise<void> => {
    let allTasks: Array<Task>;
    try {
      const data = await readFile(tasksFile);
      const stringContent = data.toString();
      allTasks = JSON.parse(stringContent);
    } catch (e: unknown) {
      console.error("Error! We couldn't read the file...");
      return;
    }

    allTasks.push({ done: false, description: args.description });

    await writeFile(tasksFile, JSON.stringify(allTasks));
    console.log("Finished adding a new task!");
  };
}
