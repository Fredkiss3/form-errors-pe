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
          formData: Partial<z.TypeOf<typeof formSchema>>;
      }
    | { type: undefined; message: null };

function wait(ms: number): Promise<void> {
    // Wait for the specified amount of time
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function action(_: ActionResult, payload: FormData) {
    await wait(500);
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
        formData: {
            name: payload.get("name")?.toString(),
            message: payload.get("message")?.toString(),
        },
    };
}
