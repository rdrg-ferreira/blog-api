import { useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router";
import FormInput from "./FormInput";
import authFetch from "../lib/authFetch";
import "../styles/LoginPage.css";
import "../styles/globalStyle.css";

export default function LoginPage() {
    const { currentUser, setCurrentUser } = useOutletContext();
    const navigate = useNavigate();
    const location = useLocation();
    const [errors, setErrors] = useState([]);
    const notAdmin = location.state?.notAdmin;

    async function handleSubmit(event) {
        event.preventDefault();
        setErrors([]);

        const formData = new FormData(event.currentTarget);
        const payload = Object.fromEntries(formData.entries());

        const response = await authFetch("/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            setErrors(data.errors ?? []);
            return;
        }

        if (data.user.role !== "ADMIN") {
            localStorage.removeItem("token");
            localStorage.removeItem("currentUser");
            setCurrentUser(null);
            setErrors([
                {
                    path: "username",
                    msg: "Only ADMIN users can log in to this panel",
                },
            ]);
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        setCurrentUser(data.user);
        const redirectTo = location.state?.from?.pathname || "/";
        navigate(redirectTo, { replace: true });
    }

    if (currentUser) {
        return (
            <h1 className="information">You are already logged in. You can log out from the menu if you want to switch accounts</h1>
        );
    } else {
        return (
            <main>
                <div className="form-card">
                    <h1>Welcome back</h1>
                    {notAdmin ? <p className="field-error">Admin access is required.</p> : null}
                    <form onSubmit={handleSubmit}>
                        <FormInput type={"text"} id={"username"} labelName={"Username"} errorMsg={errors?.find(e => e.path === "username")?.msg} ></FormInput>
                        <FormInput type={"password"} id={"password"} labelName={"Password"} errorMsg={errors?.find(e => e.path === "password")?.msg} ></FormInput>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </main>
        );
    }
}