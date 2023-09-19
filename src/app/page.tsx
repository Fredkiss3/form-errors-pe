"use client";
import { experimental_useFormState as useFormState } from "react-dom";
import { action } from "./_action";

function Alert(props: { children: React.ReactNode }) {
    return (
        <div
            role="alert"
            className="border border-teal-500 p-2 rounded-md text-teal-400 bg-teal-100/50"
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

    console.log({ state });

    return (
        <main className="p-10">
            <h2 className="text-xl font-bold">useFormState demo</h2>

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
                    aria-describedby={`name-error`}
                    className="border rounded-md p-2"
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
                    name="message"
                    placeholder="I love cheese"
                    aria-describedby={`message-error`}
                    className="border rounded-md p-2"
                />

                {state?.type === "error" && state?.errors?.message && (
                    <span id="message-error" className="text-red-400">
                        {state.errors.message.join(",")}
                    </span>
                )}

                <button className="bg-blue-400 rounded-md text-white px-4 py-2">
                    Submit
                </button>
            </form>
        </main>
    );
}
