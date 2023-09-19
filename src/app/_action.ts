"use server";
import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(1),
    message: z.string().min(3),
});

type ActionResult =
    | {
          type: "success";
          message: string;
      }
    | {
          type: "error";
          errors: Record<string, string[] | undefined>;
      }
    | { type: undefined; message: null };

export async function action(_: ActionResult, payload: FormData) {
    const result = formSchema.safeParse(Object.fromEntries(payload.entries()));

    console.dir(
        { data: Object.fromEntries(payload.entries()), result },
        { depth: null }
    );

    if (result.success) {
        return {
            type: "success" as const,
            message: `Name=${result.data.name}; Value=${result.data.message}`,
        };
    }
    return {
        type: "error" as const,
        errors: result.error.flatten().fieldErrors,
    };
}
