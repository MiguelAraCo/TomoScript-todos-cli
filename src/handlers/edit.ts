import { Task } from "../models/Task";
import { getTasks, saveTasks } from "../services/tasks";
import { nanoid } from "nanoid";

export namespace EditHandler {
  export type Args = {
    // What users can type
    id: string;
    done: boolean;
    pending: boolean;
    description: string;
    by?: string;
  };

  export const handle = async (args: Args): Promise<void> => {
    let allTasks: Array<Task> = await getTasks();

    let task: Task | undefined = allTasks.find(({ id }) => id === args.id);
    if (task === undefined) {
      console.error("This ID does not exist. Please type valid ID!");
      process.exit(1);
    }

    task.description = args.description;
    await saveTasks(allTasks);
  };
}
