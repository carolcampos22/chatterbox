import { z } from "zod";
import { CommentsModel } from "../../models/Comment";

export interface GetCommentsInputDTO {
    postId: string,
    token: string
}

export type GetCommentsOutoutDTO = CommentsModel[]

export const GetCommentsSchema = z.object({
    postId: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as GetCommentsInputDTO)