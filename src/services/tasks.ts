import { Task } from "../models/Task";
import { readFile, writeFile } from "node:fs/promises";

const tasksFile = "data/db.json";

export async function getTasks(): Promise<Array<Task>> {
  try {
    const data = await readFile(tasksFile);
    const stringContent = data.toString();
    return JSON.parse(stringContent);
  } catch (e: unknown) {
    console.error("Error! We couldn't read the file...");
    process.exit(1);
  }
}

export async function saveTasks(tasks: Array<Task>): Promise<void> {
  try {
    await writeFile(tasksFile, JSON.stringify(tasks));
  } catch (e: unknown) {
    console.error("Oops! We couldn't save..");
    process.exit(1);
  }
}
