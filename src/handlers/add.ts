import { Task } from "../models/Task";
import { getTasks, saveTasks } from "../services/tasks";

export namespace AddHandler {
  export type Args = {
    description: string;
  };

  export const handle = async (args: Args): Promise<void> => {
    let allTasks: Array<Task> = await getTasks();

    allTasks.push({ done: false, description: args.description });

    await saveTasks(allTasks);

    console.log("Finished adding a new task!");
  };
}
