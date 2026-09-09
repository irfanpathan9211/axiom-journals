"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push("/admin/dashboard");
        } else {
            setError("Wrong Password, Try Again");
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <form onSubmit={handleSubmit} style={{ width: "320px", padding: "32px", border: "1px solid #ddd", borderRadius: "8px" }}>
                <h2 style={{ marginBottom: "20px" }}>Admin Login</h2>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: "100%", padding: "10px", marginBottom: "12px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
                {error && <p style={{ color: "red", marginBottom: "12px" }}>{error}</p>}
                <button type="submit" style={{ width: "100%", padding: "10px", background: "#b8860b", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                    Login
                </button>
            </form>
        </div>
    );
}