import jwt from 'jsonwebtoken';
import StatusCodes from 'http-status-codes';

const verifyToken = async(request,response,next)=>{
    try {
        let token = request.headers["authorization"];
        if(token){
            token = token.split(" ")[1];
            jwt.verify(token, process.env.SECRET_KEY, (err,payload)=>{
                if(err){
                    response.status(StatusCodes.BAD_REQUEST).send({message: "Invalid token"});
                }else{
                    // console.log("Payload : "+payload);
                    // console.log("Req.user : "+request.user);
                   
                }
                
            });
            next();
        }else{
            response.status(StatusCodes.BAD_REQUEST).send({message: "Missing token"});
        }
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "Something went wrong..."});
    }
}

export default verifyToken;