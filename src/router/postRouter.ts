import express from "express"
import { PostController } from "../controller/PostController"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { PostBusiness } from "../business/PostBusiness"
import { PostDatabase } from "../database/PostDatabase"

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new IdGenerator(),
        new TokenManager()
    )
)

postRouter.post("/", postController.createPost)
postRouter.get("/", postController.getPost)
postRouter.put("/:id", postController.editPost)
postRouter.delete("/:id", postController.deletePost)
postRouter.put("/:id/like", postController.likeOrDislikePost)