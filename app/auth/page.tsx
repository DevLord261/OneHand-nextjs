"use client";
import { clsx } from "clsx";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useActionState, useState } from "react";
import Link from "next/link";
import { login } from "@/lib/actions/login";

import "@/styles/Login.css";

export default function Auth() {
  const [isActive, setIsActive] = useState(false);
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <main className="background">
      <div className={clsx("container", { active: isActive })}>
        {/* Login Form */}
        <section className={clsx("form-box", "login")}>
          <form action={action}>
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                required
                name="userName"
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
              />
              <i className="bx bxs-lock-alt"></i>
              {state?.errors?.password && (
                <div>
                  <p>Password must:</p>
                  <ul>
                    {state.errors.password.map((error) => (
                      <li key={error}>- {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="forgot-link">
              <Link href={""}>Forgot Password?</Link>
            </div>
            {state?.errors?.userName && (
              <Alert variant={"destructive"} style={{ padding: 12 }}>
                <AlertCircleIcon />
                <AlertTitle> Failed to login</AlertTitle>
                <AlertDescription>Wrong username or password</AlertDescription>
              </Alert>
            )}
            <button type="submit" className="btn" disabled={pending}>
              Login
            </button>
          </form>
        </section>

        {/* Registration Form */}
        <section className={clsx("form-box", "register")}>
          <form method="POST">
            <h1>Registration</h1>
            <input type="hidden" name="intent" value="register" />
            <div className="input-box">
              <input
                type="text"
                placeholder="FirstName"
                required
                name="firstName"
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="LastName"
                required
                name="lastName"
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                required
                name="username"
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input type="email" placeholder="Email" required name="email" />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn">
              Register
            </button>
          </form>
        </section>

        {/* Toggle Panels */}
        <section className="toggle-box">
          <div className={clsx("toggle-panel", "toggle-left")}>
            <h1>Hello, Welcome!</h1>
            <p>Don&apos;t have an account?</p>
            <button
              className={clsx("btn", "register-btn")}
              onClick={() => setIsActive(true)}
            >
              Register
            </button>
          </div>

          <div className={clsx("toggle-panel", "toggle-right")}>
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button
              className={clsx("btn", "login-btn")}
              onClick={() => setIsActive(false)}
            >
              Login
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
