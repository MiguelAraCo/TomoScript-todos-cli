import { Task } from "../models/Task";
import { getTasks, saveTasks } from "../services/tasks";
import { nanoid } from "nanoid";

export namespace AddHandler {
  export type Args = {
    description: string;
    by?: string;
  };

  export const handle = async (args: Args): Promise<void> => {
    // TODO: Add validation

    const id = nanoid();
    const allTasks: Array<Task> = await getTasks();
    const by = args.by ? new Date(args.by).toISOString() : undefined;

    allTasks.push({ id: id, done: false, description: args.description, by: by });

    await saveTasks(allTasks);
    console.log("Finished adding a new task!");
  };
}
