import { Task } from "../models/Task";
import { getTasks } from "../services/tasks";

// It handles list commands that when an user type a command "list",  it prints pending tasks,
// and "list --all" prints all tasks in Array <Task>
export namespace ListHandler {
  export type Args = {
    all: boolean;
  };

  export const handle = async (args: Args): Promise<void> => {
    let allTasks: Array<Task> = await getTasks();

    const pendingTasks = allTasks.filter((task) => {
      return !task.done;
    });

    // Using the ternary operator
    const tasksToPrint: Array<Task> = args.all ? allTasks : pendingTasks;

    // TODO: Make a separate function
    // map function : changing Array<string> to Array <string> + [] or [x]
    const taskStrings: Array<string> = tasksToPrint.map((task) => {
      if (task.done) {
        return `[x] ${task.description}`;
      } else {
        return `[ ] ${task.description}`;
      }
    });

    // TODO: Make a separate function
    for (const taskString of taskStrings) {
      console.log(taskString);
    }
  };
}
