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

   getByStatus(status : string){
      const allData = taskRepository.getAll();
      return allData.filter(task => task.status === status )
   }

   getByDate(date : Date){
      const allData = taskRepository.getAll();
      return allData.filter(task => new Date(task.data) > date );
   }
}

export default TaskService;