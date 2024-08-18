import { z } from "zod";

export interface EditCommentInputDTO {
    message: string,
    token: string,
    idToEdit: string
}

export type  EditCommentOutputDTO = undefined

export const EditCommentSchema = z.object({
    message: z.string().min(1).optional(),
    token: z.string().min(1),
    idToEdit: z.string().min(1)
}).transform(data => data as EditCommentInputDTO)