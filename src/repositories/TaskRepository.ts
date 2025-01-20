import { Task } from "../models/Task";

class TaskRepository {

   private tasks: Task[];

   constructor(){
      this.tasks = [];

   }

   getAll(){
      return this.tasks;
   }

   add(data:Task): Task{
      this.tasks.push(data);
      return data;
   }
}

export default TaskRepository;