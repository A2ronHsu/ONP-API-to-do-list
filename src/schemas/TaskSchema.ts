import {object, string} from 'yup';

export const GetSchema = object().shape({
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

