import { Router, Request, Response, NextFunction } from "express";
import TaskController from "./src/controllers/TaskController";
import multer from "multer";
import  storage  from "./src/utils/storage";


const taskController = new TaskController();
const router = Router();

const authMiddleware = (Req:Request, Res:Response, next: NextFunction) => {
   if(Req.headers.authorization){
      //Fazer verificações
      next();
   }else{
      Res.json({error:'usuário não autenticado'});
      Res.status(400);
   }
}

const upload = multer({storage})



const controllers = taskController;

//home
router.get('/', (req:Request, res:Response) : any =>{return res.json({get:'Home'})})
//recuperar tarefa tal id
router.get('/task/:id', (req: Request, res: Response) : any =>{taskController.getById(req, res);})
//recuperar todas as tarefas
router.get('/task',(req: Request, res: Response) : any =>{taskController.getAll(req, res);})
//adicionar tarefa
router.post('/task', upload.single('file'), (req: Request, res: Response) : any =>{const json =taskController.add(req,res);})
//editar tarefa por id
router.put('/task/:id',(req: Request, res: Response) : any =>{taskController.update(req, res);})
//deletar
router.delete('/task/:id',(req: Request, res: Response) : any =>{taskController.delete(req,res);})


export default router;