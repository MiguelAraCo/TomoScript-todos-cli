import { Task } from "../models/Task";
import { getTasks, saveTasks } from "../services/tasks";

export namespace EditHandler {
  export type Args = {
    // What users can type
    id: string;
    done: boolean;
    pending: boolean;
    description?: string;
    by?: string;
  };

  export const handle = async (args: Args): Promise<void> => {
    let allTasks: Array<Task> = await getTasks();
    // Find a specific id inside of Array Tasks
    let task: Task | undefined = allTasks.find((task) => task.id === args.id);
    // If the id is undefined, error message will appear
    if (task === undefined) {
      console.error("This ID does not exist. Please type valid ID!");
      process.exit(1);
    }
    //FIXME: add error MSG when user inputs `edit --" id " ` instead of `edit --id " id " '
    //FIXME: add error MSG when user inputs only `edit --id "  id  "` without any other information they want to modify

    //When user types a description, it becomes a new description
    // if (args.description !== undefined){
    if (typeof args.description === "string") {
      task.description = args.description;
    }

    //When user types a due date, it becomes a new due date
    if (typeof args.by === "string") {
      task.by = args.by;
    }

    // When user type done and pending, it shows an error message. If the user type 'done', [x], and 'pending' would be [ ]
    if (args.done && args.pending) {
      console.error("Error! Please choose either `done` or `pending`.");
      process.exit(1);
    } else if (args.done) {
      task.done = true;
    } else if (args.pending) {
      task.done = false;
    }
    // saving allTasks
    await saveTasks(allTasks);
  };
}
