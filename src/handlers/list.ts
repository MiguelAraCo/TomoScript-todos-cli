import { Task } from "../models/Task";
import { getTasks } from "../services/tasks";

export namespace ListHandler {
  export type Args = {
    all: boolean;
  };

  function formatTasks(tasks: Array<Task>) {
    const taskStrings: Array<string> = tasks.map((task) => {
      if (task.done && task.by) {
        return `[x] ${task.description}` + ` (by: ${new Date(task.by).toLocaleDateString()})`;
      } else if (!task.done && task.by) {
        return `[ ] ${task.description}` + ` (by: ${new Date(task.by).toLocaleDateString()})`;
      } else if (task.done) {
        return `[x] ${task.description}`;
      } else {
        return `[ ] ${task.description}`;
      }
    });
    return taskStrings;
  }

  export const handle = async (args: Args): Promise<void> => {
    let allTasks: Array<Task> = await getTasks();

    const pendingTasks = allTasks.filter((task) => {
      return !task.done;
    });

    const tasksToPrint: Array<Task> = args.all ? allTasks : pendingTasks;

    const taskStrings = formatTasks(tasksToPrint);

    // TODO: Make a separate function
    for (const taskString of taskStrings) {
      console.log(taskString);
    }
  };
}
