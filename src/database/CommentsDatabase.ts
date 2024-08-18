import { CommentsDB, CommentsDBWithCreatorNickname } from "../models/Comment"
import { BaseDatabase } from "./BaseDatabase"
import { PostDatabase } from "./PostDatabase"
import { UserDatabase } from "./UserDatabase"

export class CommentsDatabase extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"

    public insertComment = async (commentDB: CommentsDB): Promise<void> => {
        await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .insert(commentDB)
    }

    public getComments = async (idPost: string): Promise<CommentsDBWithCreatorNickname[]> => {

        const result = await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .select(
                `${CommentsDatabase.TABLE_COMMENTS}.id`,
                `${CommentsDatabase.TABLE_COMMENTS}.id_post`,
                `${CommentsDatabase.TABLE_COMMENTS}.creator_id`,
                `${CommentsDatabase.TABLE_COMMENTS}.message`,
                `${CommentsDatabase.TABLE_COMMENTS}.likes`,
                `${CommentsDatabase.TABLE_COMMENTS}.dislikes`,
                `${CommentsDatabase.TABLE_COMMENTS}.created_at`,
                `${CommentsDatabase.TABLE_COMMENTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.nickname as creator_nickname`

            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${CommentsDatabase.TABLE_COMMENTS}.creator_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where(`${CommentsDatabase.TABLE_COMMENTS}.id_post`, '=', idPost)

        return result as CommentsDBWithCreatorNickname[]
    }

    public incrementComments = async (idPost: string): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .where({ id: idPost })
            .increment("comments")
    }

    public decrementComments = async (idPost: string): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .where({ id: idPost })
            .decrement("comments")
    }

    public deleteCommentById = async (id: string): Promise<void> => {
        await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .delete()
            .where({ id })
    }

    public findCommentById = async (id: string): Promise<CommentsDB | undefined> => {
        const [result] = await BaseDatabase.connection(CommentsDatabase.TABLE_COMMENTS).select().where({ id })

        return result as CommentsDB | undefined

    }

    public updateComment = async (commentDB: CommentsDB): Promise<void> => {
      
        await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .update(commentDB)
            .where({id: commentDB.id})
    }
}