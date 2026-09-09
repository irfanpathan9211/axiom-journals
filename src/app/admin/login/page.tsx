"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push("/admin/dashboard");
            } else {
                setError("Wrong password, try again");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit} className={styles.card}>
                <div className={styles.brandMark}>A</div>
                <p className={styles.brand}>Axiom Journals</p>
                <h2 className={styles.title}>Admin Login</h2>
                <div className={styles.divider} />

                <div className={styles.field}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                        autoFocus
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? "Signing in..." : "Login"}
                </button>

                <p className={styles.footer}>© {new Date().getFullYear()} Axiom Journals</p>
            </form>
        </div>
    );
}