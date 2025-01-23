import { Request,Response } from "express";

import TaskService from "../services/TaskService";
import TaskRepository from "../repositories/TaskRepository";
import { Task } from "../models/Task";
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

      if (status ){
         if(status === 'in_progress' || status === 'completed'){
            const getBy = taskService.getByStatus(status);
            return Res.json(getBy);

         }else{
            Res.statusCode = 400;
            return Res.json({
               error: 'not valid status'
            });
         }
      }


      if (data && typeof(data) === 'string'){
         const dataTest = /^\d\d\d\d-\d\d-\d\d$/.test(data);
         if(dataTest){
            const resultDates = taskService.getByDate(data);
            Res.json(resultDates);
         }else{
            Res.statusCode = 400;
            Res.json({
               error: 'bad data format, only yyyy-mm-dd'
            })
            return
         }
      }

      if(!data){
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

   getById (Req: Request, Res: Response){
      const allData =taskService.getAll();
      const {id} = Req.params;
      if (!id) {
         return Res.json('id inválido')
      }
      const data = allData.filter(task => task.id === id);
      if(data.length){
         Res.json(data);

      }else{
         Res.json('id não existe')
      }
      
   }
   
   update (Req: Request, Res: Response){
      const data : Task = Req.body;
      const {id} = Req.params;
      if(data.id && data.descricao && data.data && data.status){
         if(taskService.update( id, data)) {
            return Res.json({
               updated_id: id,
               data: data
            })
         }else{
            Res.status(400);
            Res.json({error:'id não existe'});

         }
      }else{
         Res.status(400);
         Res.json({error: 'invalid data'})
         
      }
   }

   delete(Req: Request, Res: Response){
      const {id} = Req.params;
      if(taskService.delete(id)){
         Res.json({success:`${id} deletado`})
      }else{
         Res.json({error:`${id} não existe`});
      }
   }  


}

export default TaskController;