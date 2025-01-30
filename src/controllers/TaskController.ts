import { Request,Response } from "express";

import TaskService from "../services/TaskService";
import { Task } from "../models/Task";
import { GetSchema } from "../schemas/TaskSchema";
import { object } from "yup";

const taskService = new TaskService();

class TaskController{
   constructor(){

   }

   async getAll(Req: Request, Res: Response){
      try {
         console.log(Req.query);
         await GetSchema.validate(Req.query);
         const {status, date } = Req.query;
         let result : Task[] = [];
         if (status) {
            const data : Task[] = taskService.getByStatus(status as string);
            result.concat(data.filter((elem)=>result.some(task => task.id === elem.id)));
         }
         if (date) {
            const data : Task[] = taskService.getByDate(status as string);
            result.concat(data.filter((elem)=>result.some(task => task.id === elem.id)));
         };
         if(!date && !status){
            result = taskService.getAll();
         }
         Res.json(result);
         Res.status(200);

      } catch (error) {
         Res.json(error);
         Res.status(401)
      }
      
      // if(!data && !status){
      //    const allTask = taskService.getAll();
      //    return Res.json(allTask);
         
      // }

      // if (status ){
      //    if(status === 'in_progress' || status === 'completed'){
      //       const getBy = taskService.getByStatus(status);
      //       return Res.json(getBy);

      //    }else{
      //       Res.statusCode = 400;
      //       return Res.json({
      //          error: 'not valid status'
      //       });
      //    }
      // }




      // if(!data){
      //    Res.statusCode = 400;
      //    Res.json({
      //       error: 'bad data type'
      //    })
      //    return
      // }

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