import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import FormInput from "./FormInput";
import authFetch from "../lib/authFetch";
import "../styles/CreatePostPage.css";
import "../styles/globalStyle.css";

export default function CreatePostPage() {
    const { setPosts } = useOutletContext();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [formError, setFormError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setErrors([]);
        setFormError("");

        const formData = new FormData(event.currentTarget);
        const payload = Object.fromEntries(formData.entries());

        const response = await authFetch("/api/v1/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            if (data.errors) {
                setErrors(data.errors);
            } else {
                setFormError(data.error ?? "Could not create post");
            }
            return;
        }

        setPosts((currentPosts) => [data, ...currentPosts]);
        navigate("/", { replace: true });
    }

    return (
        <main>
            <div className="form-card">
                <h1>Create post</h1>
                {formError ? <p className="field-error">{formError}</p> : null}
                <form onSubmit={handleSubmit}>
                    <FormInput type="text" id="title" labelName="Title" errorMsg={errors?.find((error) => error.path === "title")?.msg} />
                    <FormInput type="textarea" id="text" labelName="Text" errorMsg={errors?.find((error) => error.path === "text")?.msg} />
                    <div className="input flex flex-column post-status">
                        <label htmlFor="status">Status</label>
                        <select id="status" name="status" defaultValue="PUBLIC">
                            <option value="PUBLIC">Public</option>
                            <option value="PRIVATE">Private</option>
                        </select>
                        <p className="field-error">{errors?.find((error) => error.path === "status")?.msg ?? ""}</p>
                    </div>
                    <button type="submit">Create post</button>
                </form>
            </div>
        </main>
    );
}