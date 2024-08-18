import { CommentsDatabase } from "../database/CommentsDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { CreateCommentInputDTO, CreateCommentOutputDTO } from "../dtos/comments/createComment.dto";
import { DeleteCommentInputDTO, DeleteCommentOutputDTO } from "../dtos/comments/deleteComment.dto";
import { EditCommentInputDTO, EditCommentOutputDTO } from "../dtos/comments/editComments.dto";
import { GetCommentsInputDTO, GetCommentsOutoutDTO } from "../dtos/comments/getComments.dto";
import { LikeOrDislikeCommentInputDTO, LikeOrDislikeCommentOutputDTO } from "../dtos/comments/likeOrDislikeComment.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Comments, CommentsDB } from "../models/Comment";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class CommentsBusiness {
    constructor(
        private commentsDatabase: CommentsDatabase,
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) {}

    public getComments = async (input: GetCommentsInputDTO): Promise<GetCommentsOutoutDTO> => {
        const {postId, token} = input

        const payload = this.tokenManager.getPayload(token)
        if(!payload){
            throw new UnauthorizedError()
        }

        const commentsDBWithCreatorNickname = await this.commentsDatabase.getComments(postId)

        const comments = commentsDBWithCreatorNickname.map((commentDB) => {
            const comment = new Comments(
                commentDB.id,
                commentDB.id_post,
                commentDB.creator_id,
                commentDB.creator_nickname,
                commentDB.message,
                commentDB.likes,
                commentDB.dislikes,
                commentDB.created_at,
                commentDB.updated_at
            )

        
            return comment.CommentsToBusinessModel()
        })

        const output: GetCommentsOutoutDTO = comments
               

        return output

    }


    public createComment = async (input: CreateCommentInputDTO): Promise <CreateCommentOutputDTO> => {
        const {idPost, message, token} = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload){
            throw new UnauthorizedError()
        }

        const {id: creatorId, nickname: creatorNickname} = payload;

        const id = this.idGenerator.generate()

        const commentDB = await this.postDatabase.findPostById(idPost)

        if(!commentDB){
            throw new NotFoundError("Post com a ID informada não existe")
        }

        const comment = new Comments(
            id,
            idPost,
            creatorId,
            creatorNickname,
            message,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString()
        )

        await this.commentsDatabase.insertComment(comment.CommentsToDBModel())
        await this.commentsDatabase.incrementComments(commentDB.id)

        const output: CreateCommentOutputDTO = undefined

        return output
        
    }

    public editComment = async (input: EditCommentInputDTO): Promise<EditCommentOutputDTO> => {
        const {message, token, idToEdit} = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload){
            throw new UnauthorizedError()
        }

       // const id = this.idGenerator.generate()

        const commentDB = await this.commentsDatabase.findCommentById(idToEdit)

        if(!commentDB){
            throw new NotFoundError("Comentário com a ID informada não existe")
        }

        if(payload.id !== commentDB.creator_id){
            throw new ForbiddenError("Somente quem criou o comentário pode editá-lo")
        }

        const comment = new Comments(
            commentDB.id,
            commentDB.id_post,
            commentDB.creator_id,
            payload.nickname,
            commentDB.message,
            commentDB.likes,
            commentDB.dislikes,
            commentDB.created_at,
            commentDB.updated_at

        )

        comment.setMessage(message)
        
        const updatedCommentDB = comment.CommentsToDBModel()
        await this.commentsDatabase.updateComment(updatedCommentDB)

        
        const output: EditCommentOutputDTO = undefined

        return output
    }

    public deleteComment = async (input: DeleteCommentInputDTO): Promise<DeleteCommentOutputDTO> => {
        const {idToDelete, token} = input;

        const payload = this.tokenManager.getPayload(token)
        if(!payload){
            throw new UnauthorizedError()
        }

        const commentDB = await this.commentsDatabase.findCommentById(idToDelete)

        if(!commentDB){
            throw new NotFoundError("Comentário com a ID informada não existe")
        }

        const {id, role} = payload

        if(role !== USER_ROLES.ADMIN) {
            if (id !== commentDB.creator_id) {
                throw new ForbiddenError("Somente quem criou o comentário pode deletá-lo.")
            }
        }

        await this.commentsDatabase.deleteCommentById(idToDelete)
        await this.commentsDatabase.decrementComments(commentDB.id)
        
        const output: DeleteCommentOutputDTO = undefined

        return output

    }

      
}