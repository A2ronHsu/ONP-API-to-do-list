import { Task } from "../models/Task";

class TaskRepository {

   private tasks: Task[];

   constructor(){
      this.tasks = [
         {
            "descricao": "mock",
            "data": "2025-01-24",
            "status": "completed",
            "id": "4b308a1b-c71e-41da-84a2-6458012ebfe0"
        }
      ];

   }

   getAll(){
      return this.tasks;
   }

   getByID(id:string) : any{
      const index = this.findID(id);
      if(index>-1){
         return this.tasks[index];
      }else{
         return false;
      }
   }

   add(data:Task): Task{
      this.tasks.push(data);
      return data;
   }

   findID(id:string){
      const index = this.tasks.findIndex(task => task.id == id);
      return index ;
   }



   update(id:string, data : Task){
      const index = this.findID(id);
      
      if(index>-1){
         data.id = id;
         this.tasks[index] = data;
         return true;
      }
      return false
   }

   delete(id: string){
      const index = this.findID(id);
      if(index>-1){
         const part1 = this.tasks.slice(0,index);
         const part2 = this.tasks.slice(index+1,this.tasks.length);
         this.tasks = part1.concat(part2);
         return true;
      }else{
         return false;
      }

   }
}

export default TaskRepository;