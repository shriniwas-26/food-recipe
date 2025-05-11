import {StatusCodes} from 'http-status-codes';
import feedbackModel from '../Models/FeedbackModel.js';

export async function addFeedback (request,response){
    try {
        const data = request.body;
        if(!data.name || !data.email || !data.subject || !data.message){
            response.status(StatusCodes.BAD_REQUEST).send({message: "Required fields cant be empty"});
        }else{
            const newFeedback = await feedbackModel.create({
                name: data.name, email: data.email, subject: data.subject, message: data.message
            });
            if(newFeedback){
                response.status(StatusCodes.CREATED).send({message: "Feedback sent successfully..."});
            }else{
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "Something went wrong"});
            }
        }
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "Something went wrong"});
    }
}