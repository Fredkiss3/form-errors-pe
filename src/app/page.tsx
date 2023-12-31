"use client";
import {
    // see ./globals.d.ts at the root for the types
    // this will come in a new versoin of @types/react-dom https://github.com/DefinitelyTyped/DefinitelyTyped/pull/66726
    experimental_useFormState as useFormState,
    experimental_useFormStatus as useFormStatus,
} from "react-dom";

import { action } from "./_action";

function Alert(props: { children: React.ReactNode }) {
    return (
        <div
            role="alert"
            className="border border-teal-700 p-2 rounded-md text-teal-700 bg-teal-100"
        >
            {props.children}
        </div>
    );
}

export default function Home() {
    const [state, dispatch] = useFormState(action, {
        message: null,
        type: undefined,
    });

    return (
        <main className="p-10">
            <h2 className="text-xl font-bold">useFormState demo</h2>
            <h1>Disable JavaScript to test with Progressive Enhancement</h1>

            {state?.type === "success" && <Alert>{state.message}</Alert>}

            <form
                action={dispatch}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    alignItems: "start",
                }}
            >
                <label htmlFor="name">Your Name</label>
                <input
                    id="name"
                    name="name"
                    style={{
                        width: "100%",
                    }}
                    placeholder="John Doe"
                    defaultValue={
                        state?.type === "error" ? state.formData.name : ""
                    }
                    aria-describedby={`name-error`}
                    className={`border rounded-md p-2 ${
                        state?.type === "error" && state?.errors?.name
                            ? "accent-red-400"
                            : ""
                    }`}
                />

                {state?.type === "error" && state?.errors?.name && (
                    <span id="name-error" className="text-red-400">
                        {state.errors.name.join(",")}
                    </span>
                )}

                <label htmlFor="message">Your Message</label>
                <textarea
                    id="message"
                    style={{
                        width: "100%",
                    }}
                    defaultValue={
                        state?.type === "error" ? state.formData.message : ""
                    }
                    name="message"
                    placeholder="I love cheese"
                    aria-describedby={`message-error`}
                    className={`border rounded-md p-2 ${
                        state?.type === "error" && state?.errors?.message
                            ? "accent-red-400"
                            : ""
                    }`}
                />

                {state?.type === "error" && state?.errors?.message && (
                    <span id="message-error" className="text-red-400">
                        {state.errors.message.join(",")}
                    </span>
                )}

                <SubmitButton />
            </form>
        </main>
    );
}

function SubmitButton() {
    const status = useFormStatus();
    return (
        <button
            aria-disabled={status.pending}
            onClick={(e) => {
                // prevent multiple submits
                if (status.pending) e.preventDefault();
            }}
            className={`rounded-md text-white px-4 py-2 ${
                status.pending ? "bg-blue-300" : "bg-blue-400"
            }`}
        >
            {status.pending ? "Submiting..." : "Submit"}
        </button>
    );
}
