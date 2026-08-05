import { useState } from "react";
import { useOutletContext } from "react-router";
import { useNavigate } from "react-router";
import FormInput from "./FormInput";
import authFetch from "../lib/authFetch";
import "../styles/LoginPage.css";
import "../styles/globalStyle.css";

export default function SignupPage() {
    const { currentUser } = useOutletContext();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

    async function handleSubmit(event) {
        event.preventDefault();
        setErrors([]);

        const formData = new FormData(event.currentTarget);
        const payload = Object.fromEntries(formData.entries());

        const response = await authFetch("/api/v1/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            setErrors(data.errors);
            return;
        }

        navigate("/login");
    }

    if (currentUser) {
        return (
            <main>
                <h1 className="information">You are currently logged in. Log out before signing up a new user</h1>
            </main>
        );
    } else {
        return (
            <main>
                <div className="form-card">
                    <h1>Welcome</h1>
                    <form onSubmit={handleSubmit}>
                        <FormInput type={"text"} id={"username"} labelName={"Username"} errorMsg={errors.find(e => e.path === "username")?.msg} ></FormInput>
                        <FormInput type={"password"} id={"password"} labelName={"Password"} errorMsg={errors.find(e => e.path === "password")?.msg} ></FormInput>
                        <FormInput type={"password"} id={"confirmPassword"} labelName={"Confirm password"} errorMsg={errors.find(e => e.path === "confirmPassword")?.msg} ></FormInput>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </main>
        );
    }
}