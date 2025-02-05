import { Task } from "../models/Task";
import TaskRepository from "../repositories/TaskRepository";

const taskRepository = new TaskRepository();

class TaskService{
   constructor(){

   }

   getAll(){
      return taskRepository.getAll();
   }

   add(data: Task):Task { 
      return taskRepository.add(data);

   }

   getByID(id:string){
      return taskRepository.getByID(id);
   }

   getByStatus(status : string){
      const allData = taskRepository.getAll();
      return allData.filter(task => task.status === status )
   }

   getByDate(date : string){
      const allData = taskRepository.getAll();
      return allData.filter(task => new Date(task.data) >= new Date(date));
   }

   update(id:string, data : Task){
      return taskRepository.update(id, data);
      
   }

   delete(id:string){
      return taskRepository.delete(id);
   }
}

export default TaskService;