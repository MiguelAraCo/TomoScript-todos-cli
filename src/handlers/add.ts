import { Task } from "../models/Task";
import { getTasks, saveTasks } from "../services/tasks";
import { nanoid } from "nanoid";

export namespace AddHandler {
  export type Args = {
    description: string;
    by?: string;
  };

  export const handle = async (args: Args): Promise<void> => {
    const id = nanoid();
    const allTasks: Array<Task> = await getTasks();

    if (typeof args.by === "string") {
      try {
        const by = args.by ? new Date(args.by).toISOString() : undefined;
        allTasks.push({ id: id, done: false, description: args.description, by: by });
      } catch (e: unknown) {
        console.error("Please type valid date");
        process.exit(1);
      }
    }

    await saveTasks(allTasks);
    console.log("Finished adding a new task!");
  };
}
