import { Request,Response } from "express";

import TaskService from "../services/TaskService";
import { Task } from "../models/Task";
import { AddSchema, DeleteSchema, GetAllSchema, GetByIDSchema, UpdateSchema, UpdateSchemaParams } from "../schemas/TaskSchema";
import { v4 as uuidv4 } from 'uuid';

const taskService = new TaskService();

class TaskController{
   constructor(){

   }

   async getAll(Req: Request, Res: Response){
      try {
         await GetAllSchema.validate(Req.query);
         const {status, data } = Req.query;
         let results : Task[] = [];

         if (status) {
            results =  taskService.getByStatus(status as string);
      
         }

         if (data) {
            const tasks : Task[] = taskService.getByDate(data as string);
            if(results.length){
               for( const task of tasks){
                  const isAlreadyInResult = results.some(result=> result.id === task.id);
                  if (!isAlreadyInResult) results.push(task)
               }
            }else{
               results = tasks;
            }

         };

         if(!data && !status){
            results = taskService.getAll();
         }
         Res.json(results);
         Res.status(200);

      } catch (error) {
         Res.json(error);
         Res.status(401)
      }
      
   };

   async add(Req: Request, Res: Response){
      try{
         await AddSchema.validate(Req.body);
         Req.body.id = uuidv4();
         const result = taskService.add(Req.body);
         
         Res.json(result);
         Res.status(200);
         
      }catch(error){
         Res.json(error);
         Res.status(401)   
      }
      
   }

   async getById (Req: Request, Res: Response){
      try {
         await GetByIDSchema.validate(Req.params);
         const {id} = Req.params;
         const data : Task = taskService.getByID(id);
         if(data) {
            Res.json(data);
   
         }else{
            Res.json('id não existe');
         }
      } catch (error) {
         Res.json(error)
      }
      
   }
   
   async update (Req: Request, Res: Response){
      const data : Task = Req.body;
      const {id} = Req.params;

      try {
         await UpdateSchema.validate(data);
         await UpdateSchemaParams.validate(id);
         const isUptated = taskService.update( id, data);
         if(isUptated) {
            Res.status(200);
            Res.json({
               updatedId: id,
               updatedData: data,
            })
         }else{
            Res.status(401);
            Res.json({error:'id não existe'});
         }
      } catch (error) {
         Res.status(400);
         Res.json(error);
      }

   }

   delete(Req: Request, Res: Response){
      const {id} = Req.params;
      try{
         DeleteSchema.validate(id);
         if(taskService.delete(id)){
            Res.json({success:`${id} deletado`})
         }else{
            Res.json({error:`${id} não existe`});
         }
      }catch(error){
         Res.status(400);
         Res.json(error);
      }

   }  


}

export default TaskController;