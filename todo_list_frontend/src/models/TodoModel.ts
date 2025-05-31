import { z } from "zod";

export const add_todo_schema = z.object({
     title: z.string().trim().min(1, { message: "Title is Required" }),
     priority: z.string().trim().min(1, { message: "Priority is Required" }),
     description: z.string().trim().max(500, { message: "Description is too long" })
})
export const edit_todo_schema = z.object({
     title: z.string().trim().min(1, { message: "Title is Required" }),
     priority: z.string().trim().min(1, { message: "Priority is Required" }),
     description: z.string().trim().max(500, { message: "Description is too long" }).optional(),
     status: z.string().trim()
})

export type add_todo_schema_type = z.infer<typeof add_todo_schema>
export type edit_todo_schema_type = z.infer<typeof edit_todo_schema>