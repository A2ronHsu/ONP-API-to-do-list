import express, { urlencoded } from "express";
import router from "./routes";
import {v4 as uuidv4} from 'uuid';
import * as jwt from 'jsonwebtoken';

const payload : jwt.JwtPayload = {
   userID : 'fdac2698-533f-4e75-b427-49185000b6f6',
   name : 'Aaron',
}

const secret = 'teste-para-jwt';

const option = {
   expiresIn: 3600 
}

const token = jwt.sign(payload,secret,option);

console.log(token)

const server = express() ;

server.use(express.urlencoded({extended:true}));
server.use(router);

server.listen(3000);