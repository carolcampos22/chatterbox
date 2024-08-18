import { z } from "zod"

export interface CreateCommentInputDTO {
    idPost: string,
    message: string,
    token: string
}

export type CreateCommentOutputDTO = undefined

export const CreateCommentSchema = z.object({
    idPost: z.string().min(1),
    message: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as CreateCommentInputDTO)