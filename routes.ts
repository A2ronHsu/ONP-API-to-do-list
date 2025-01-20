import { Router, Request, Response } from "express";

import TaskController from "./src/controllers/TaskController";

const taskController = new TaskController();
const router = Router();

{
router.get('/', (req:Request, res:Response) : any =>{
   return res.json({get:'Home'})
})




//recuperar tarefa tal id
router.get('/task/:id',(req: Request, res: Response) : any =>{
   const id: string = req.params.id;
   return res.json({recuperar:id})
})
}

//recuperar todas as tarefas
router.get('/task',(req: Request, res: Response) : any =>{
   taskController.getAll(req, res);
})

//adicionar tarefa
router.post('/task', (req: Request, res: Response) : any =>{
   const json =taskController.add(req,res);
   
});

{
//editar tarefa por id
router.put('/task/:id',(req: Request, res: Response) : any =>{
   const id : string = req.params.id;
   return res.json({editar:id});
})

//deletar
router.delete('/task/:id',(req: Request, res: Response) : any =>{
   const id: string = req.params.id;
   return res.json({deletar:id})
})
}


export default router;