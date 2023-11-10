import jwt from 'jsonwebtoken';

interface PayLoad{
    appId: string,
    userId: string
}

const secretKey= process.env.DEV_AUTH_KEY

export const generateToken = (userId: string) => {
    
    if(!secretKey) return {success: false, id: ""}

    try{
        const token = jwt.sign({id: userId}, secretKey);
        return {success: true, id: token}
    }
    catch(error){
        console.log(error)
        return {success: false, id: "Something went wrong"}
    }
    
  };
  

export const verifyToken = (token: string) => {


    if(!secretKey) throw "Invalid Keys"
    try {
      const decoded = jwt.verify(token, secretKey);
      
      return {success: true, message: "Token is valid"};

    } catch (error) {
      console.log(error)
      return {success: false, message: error as string}
    }
  };