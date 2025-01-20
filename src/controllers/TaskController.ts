import { Request,Response } from "express";

import TaskService from "../services/TaskService";
import TaskRepository from "../repositories/TaskRepository";
const taskService = new TaskService();

class TaskController{
   constructor(){

   }

   getAll(Req: Request, Res: Response){
      const {status, data } = Req.query;
      
      if(!data && !status){
         const allTask = taskService.getAll();
         return Res.json(allTask);
         
      }

      if (status && (status === 'in_progress' || status === 'completed') ){
         const getBy = taskService.getByStatus(status);
         return Res.json(getBy);
      }else{
         Res.statusCode = 400;
         return Res.json({
            error: 'not valid status'
         });
         
      }

      if (data && typeof(data) === 'string'){
         const dataTest = /^\d\d\d\d-\d\d-\d\d$/.test(data);
         if(dataTest){
            const date = new Date(data);
            const resultDates = taskService.getByDate(date);
            
            Res.json({resultDates});
         }
      }else{
         Res.statusCode = 400;
         Res.json({
            error: 'bad data type'
         })
         return
      }

   };

   add(Req: Request, Res: Response){
      const {id, descricao, data, status} = Req.body;
      
      if (id && descricao && data && status) {
         if(status === 'completed'|| status === 'in_progress') {
            const result = taskService.add(Req.body);
            Res.json(result)
         }else{
            Res.json({statusError: status})
         }

      }else{
         Res.json({
            error: "invalid parameters"
         });
         Res.status(401)

      }

      

   }
   
}

export default TaskController;