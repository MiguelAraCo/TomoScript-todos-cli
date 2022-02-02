import { Task } from "../models/Task";
import { getTasks, saveTasks } from "../services/tasks";

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

    let task: Task | undefined = allTasks.find((task) => task.id === args.id);
    // Same as:
    // let task: Task | undefined = allTasks.find((task) => task.id === args.id);
    // let task: Task | undefined = allTasks.find(({ id }) => {
    //   return id === args.id;
    // });
    if (task === undefined) {
      console.error("This ID does not exist. Please type valid ID!");
      process.exit(1);
    }

    task.description = args.description;
    task.by = args.by;

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
