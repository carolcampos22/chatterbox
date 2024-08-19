import { z } from "zod";

export interface EditPostInputDTO {
    title: string,
    content: string,
    token: string,
    idToEdit: string
}

export type  EditPostOutputDTO = undefined

export const EditPostSchema = z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    token: z.string().min(1),
    idToEdit: z.string().min(1)
}).transform(data => data as EditPostInputDTO)