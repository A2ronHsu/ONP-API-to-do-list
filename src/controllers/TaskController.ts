import { Request,Response } from "express";

import TaskService from "../services/TaskService";
import { Task } from "../models/Task";
import { AddSchema, GetAllSchema, GetByIDSchema, UpdateSchema, UpdateSchemaParams } from "../schemas/TaskSchema";

const taskService = new TaskService();

class TaskController{
   constructor(){

   }

   async getAll(Req: Request, Res: Response){
      try {
         
         await GetAllSchema.validate(Req.query);
         const {status, data } = Req.query;
         let result : Task[] = [];
         if (status) {
            result =  taskService.getByStatus(status as string);
            console.log(result);
         }
         if (data) {
            const tasks : Task[] = taskService.getByDate(data as string);
            if(result.length){
               result = result.concat(tasks.filter((elem)=>result.some(task => task.id === elem.id)));
            }else{
               result = tasks;
            }
            console.log(result);

         };
         if(!data && !status){
            result = taskService.getAll();
         }
         Res.json(result);
         Res.status(200);

      } catch (error) {
         Res.json(error);
         Res.status(401)
      }
      
   };

   async add(Req: Request, Res: Response){
      try{
         await AddSchema.validate(Req.body);
         const result = taskService.add(Req.body);
         Res.json(result);
         Res.status(200);
         
      }catch(error){
         Res.json(error);
         Res.status(401)   
      }
      


      

   }

   async getById (Req: Request, Res: Response){
      const allData =taskService.getAll();
      const {id} = Req.params;
      await GetByIDSchema.validate(Req.params);
      const data = allData.filter(task => task.id === id);
      if(data.length){
         Res.json(data);

      }else{
         Res.json('id não existe')
      }
      
   }
   
   async update (Req: Request, Res: Response){
      const data : Task = Req.body;
      const {id} = Req.params;

      try {
         await UpdateSchema.validate(data);
         await UpdateSchemaParams.validate(id);

         
         if(taskService.update( id, data)) {
            Res.status(200);
            Res.json({
               updatedId: id,
               updatedData: data,
            })
         }else{
            Res.status(400);
            Res.json({error:'id não existe'});

         }
      } catch (error) {
         Res.status(400);
         Res.json(error);
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