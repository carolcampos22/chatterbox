export interface CommentsDB {
    id: string,
    id_post: string,
    creator_id: string,
    message: string, 
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}

export interface CommentsDBWithCreatorNickname {
    id: string,
    id_post: string,
    creator_id: string,
    creator_nickname: string
    message: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string    
}


export interface CommentsModel {
    id: string,
    idPost: string,
    creatorId: string,
    message: string,
    likes: number,
    dislikes: number,
    createdAt: string,
    updatedAt: string,
    creator: {
        id: string,
        creatorNickname: string
    }
}


export interface LikeOrDislikeDB {
    user_id: string,
    post_id: string,
    like: number

}


export class Comments {
    
    constructor(
        private id: string,
        private idPost: string,
        private creatorId: string,
        private creatorNickname: string,
        private message: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string

    ) { }


    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getIdPost(): string {
        return this.idPost
    }

    public setIdPost(value: string): void {
        this.idPost = value
    }

    public getCreatorId(): string {
        return this.creatorId
    }

    public setCreatorId(value: string): void {
        this.creatorId = value
    }

    public getCreatorNickname(): string {
        return this.creatorNickname
    }

    public setCreatorNickname(value: string): void {
        this.creatorNickname = value
    }


    public getMessage(): string {
        return this.message
    }

    public setMessage(value: string): void {
        this.message = value
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = value
    }

    public addLike = (): void => {
        this.likes++
    }

    public removeLike = (): void => {
        this.likes--
    }

    public addDislike = (): void => {
        this.dislikes++
    }

    public removeDislike = (): void => {
        this.dislikes--
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public getUpdatedAt(): string {
        return this.updatedAt
    }

    public setUpdatedAt(value: string): void {
        this.updatedAt = value

    }

    public CommentsToDBModel(): CommentsDB {
        return {
            id: this.id,
            id_post: this.idPost,
            creator_id: this.creatorId,
            message: this.message,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }


    public CommentsToBusinessModel(): CommentsModel {
        return {
            id: this.id,
            idPost: this.idPost,
            creatorId: this.creatorId,
            message: this.message,
            likes: this.likes,
            dislikes: this.dislikes,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.id,
                creatorNickname: this.creatorNickname
            }
        }
    }

}
