import { ZodError } from "zod";
import { CommentsBusiness } from "../business/CommentsBusiness";
import { BaseError } from "../errors/BaseError";
import { Request, Response } from "express";
import { CreateCommentSchema } from "../dtos/comments/createComment.dto";
import { GetCommentsSchema } from "../dtos/comments/getComments.dto";
import { DeleteCommentSchema } from "../dtos/comments/deleteComment.dto";
import { EditCommentSchema } from "../dtos/comments/editComments.dto";
import { LikeOrDislikeCommentSchema } from "../dtos/comments/likeOrDislikeComment.dto";

export class CommentsController {
    constructor(
        private commentsBusiness: CommentsBusiness
    ){}

    public getComments = async (req: Request, res: Response) => {
        try {
            const input = GetCommentsSchema.parse({
                postId: req.params.id,
                token: req.headers.authorization,
            })

            const output = await this.commentsBusiness.getComments(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createComment = async (req: Request, res: Response) => {
        try {
            const input = CreateCommentSchema.parse({
                idPost: req.params.id as string,
                message: req.body.message,
                token: req.headers.authorization
            })

            const output = await this.commentsBusiness.createComment(input)

            res.status(201).send(output)
            
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public editComment = async (req: Request, res: Response) => {
        try {
            const input = EditCommentSchema.parse({
                message: req.body.message,
                token: req.headers.authorization,
                idToEdit: req.params.id
            })

            const output = await this.commentsBusiness.editComment(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public deleteComment = async (req: Request, res: Response) => {
        try {
            const input = DeleteCommentSchema.parse({
                idToDelete: req.params.id,
                token: req.headers.authorization as string,
            })

            const output = await this.commentsBusiness.deleteComment(input)

            res.status(200).send(output)
            
        } catch (error) {
            console.log(error)

            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    
}