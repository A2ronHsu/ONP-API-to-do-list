import {object, string} from 'yup';

export const GetAllSchema = object().shape({
   
   descricao: string().optional(),
   
   status: string().optional().test('isValid',(status)=>{
      if(status === 'in_progress' || status === 'completed' || status == undefined){
         return true;
      }
   }),

   data: string().optional().test('isValid', (data)=>{
      if (data){
         const dataTest = /^\d\d\d\d-\d\d-\d\d$/.test(data);
         if(dataTest){
            return true;
         }
      }
      if (data == undefined) return true;
      return false
   })

}).default(undefined)

export const AddSchema = object().shape({
   status: string().required().test('isValid', status =>{
      if(status === 'in_progress' || status === 'completed' || status == undefined){
         return true;
      }
   }),

   data: string().required().test('isValid', (data)=>{
      if (data){
         const dataTest = /^\d\d\d\d-\d\d-\d\d$/.test(data);
         if(dataTest){
            return true;
         }
      }
      return false
   }),

   descricao: string().optional()
})

export const GetByIDSchema = object().shape({
   id: string().required()
})

export const UpdateSchema = object().shape({
   descricao: string().required(),
   status: string().optional().test('isValid',(status)=>{
      if(status === 'in_progress' || status === 'completed' || status == undefined){
         return true;
      }
   }),

   data: string().optional().test('isValid', (data)=>{
      if (data){
         const dataTest = /^\d\d\d\d-\d\d-\d\d$/.test(data);
         if(dataTest){
            return true;
         }
      }
      if (data == undefined) return true;
      return false
   })

})

export const UpdateSchemaParams = string().required();