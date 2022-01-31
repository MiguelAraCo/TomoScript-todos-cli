import { Task } from "../models/Task";
import { getTasks, saveTasks } from "../services/tasks";
import { nanoid } from "nanoid";

export namespace EditHandler {
  export type Args = {
    // What users can type
    id: string;
    // done: true;
    // pending: false;
    description: string;
    by?: string;
  };

  export const handle = async (args: Args): Promise<void> => {
    let allTasks: Array<Task> = await getTasks();

    // DONE: 2. Find specific task inside of array by id
    // TODO: 3. Modify an existing task of description
    // TODO: 4. Save the modified task
    let task: Task | undefined = allTasks.find(({ id }) => id === args.id);
    if (task === undefined) {
      console.error("This ID does not exist. Please type valid ID!");
      process.exit(1);
    }

    task.description = args.description;

    await saveTasks(allTasks);
  };
}
