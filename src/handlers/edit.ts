import { Task } from "../models/Task";
import { getTasks, saveTasks } from "../services/tasks";

export namespace EditHandler {
  export type Args = {
    id: string;
    done: boolean;
    pending: boolean;
    description?: string;
    by?: string;
  };

  export const handle = async (args: Args): Promise<void> => {
    const allTasks: Array<Task> = await getTasks();

    const task: Task | undefined = allTasks.find((task) => task.id === args.id);

    if (task === undefined) {
      console.error("This ID does not exist. Please type valid ID!");
      process.exit(1);
    }

    if (typeof args.description === "string") {
      task.description = args.description;
    }

    if (typeof args.by === "string")
    try {
      task.by = new Date(args.by).toISOString();
    } catch (e:unknown) {
      console.error("Oops! Please type valid date");
      process.exit(1);
    }

    if (args.done && args.pending) {
      console.error("Error! Please choose either `done` or `pending`.");
      process.exit(1);
    } else if (args.done) {
      task.done = true;
    } else if (args.pending) {
      task.done = false;
    }

    await saveTasks(allTasks);
  };
}
