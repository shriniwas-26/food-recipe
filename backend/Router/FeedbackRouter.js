import express from 'express';
import { addFeedback } from '../Controller/FeedbackController.js';
const feedbackRouter = express.Router();

feedbackRouter.post("/", addFeedback);

export default feedbackRouter;