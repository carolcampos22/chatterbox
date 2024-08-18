import express, { Router } from 'express'
import { CommentsController } from '../controller/CommentsController'
import { CommentsBusiness } from '../business/CommentsBusiness'
import { CommentsDatabase } from '../database/CommentsDatabase'
import { IdGenerator } from '../services/IdGenerator'
import { TokenManager } from '../services/TokenManager'
import { PostDatabase } from '../database/PostDatabase'

export const commentsRouter = express.Router()

const commentsController = new CommentsController(
    new CommentsBusiness(
        new CommentsDatabase(),
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

commentsRouter.post("/:id", commentsController.createComment)
commentsRouter.get("/:id", commentsController.getComments)
commentsRouter.put("/:id", commentsController.editComment)
commentsRouter.delete("/:id", commentsController.deleteComment)

