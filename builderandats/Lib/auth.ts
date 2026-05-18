import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import {connectDb} from './conntectDb'
import {UserData} from './Models/userData'    

export async function getCurrentUser() {
  const token = (await cookies()).get('token')?.value

  if (!token) {
    return null
  }

  try {
    connectDb();
   const decoded =  jwt.verify(token, process.env.JWT_SECRET!)
   if(!decoded){
    (await cookies()).delete('token')
   }
   const {id } = decoded as {id: string}
   const user = await UserData.findOne({ userId: id }).lean();
  //  console.log(user);
     
   return  {
    ...user , _id : user?._id.toString() , userId : user?.userId.toString()
   } 
    
  } catch (err) {
    console.log(err)
    return null
  }
}

