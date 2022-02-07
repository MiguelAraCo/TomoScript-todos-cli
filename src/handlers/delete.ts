import { Task } from "../models/Task";
import { getTasks, saveTasks } from "../services/tasks";

export namespace DeleteHandler {
  export type Args = {
    id: string;
    done: boolean;
    pending: boolean;
    description?: string;
    by?: string;
  };

  export const handle = async (args: Args): Promise<void> => {
    const allTasks: Array<Task> = await getTasks();

    const index: number = allTasks.findIndex((task) => task.id === args.id);

    if (index === -1) {
      console.error("This ID does not exist. Please type valid ID!");
      process.exit(1);
    }

    allTasks.splice(index, 1);

    await saveTasks(allTasks);
  };
}
