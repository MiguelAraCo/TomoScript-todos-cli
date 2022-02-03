export interface Task {
  id: string;
  description?: string;
  // TODO: Check to be able to add done / pending, where need to be changed (list,add,Task etc.)
  done: boolean;
  by?: string;
}
