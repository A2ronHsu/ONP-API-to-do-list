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
      data.id = this.tasks.length.toString();
      this.tasks.push(data);
      return this.tasks[parseInt(data.id)];
   }

   idExist(id:string){
      const index = this.tasks.findIndex(task => task.id == id);
      return index>-1? index:false ;
   }

   update(id:string, data : Task){
      const index = this.idExist(id);
      if(index){
         data.id = id;
         this.tasks[index] = data;
         return true;
      }
      return false
   }

   delete(index: number){
      const part1 = this.tasks.slice(0,index);
      const part2 = this.tasks.slice(index+1,this.tasks.length);
      this.tasks = part1.concat(part2);
      return true;

   }
}

export default TaskRepository;