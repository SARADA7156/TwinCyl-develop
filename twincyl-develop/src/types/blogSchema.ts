import z from "zod";

export const formSchema = z.object({
    title: z.string().min(1),
    blogType: z.enum(["blog", "technical"]),
    tags: z.string().optional(),
    mainText: z.string().min(1),
});

export type BlogEditorInput = z.infer<typeof formSchema>;
