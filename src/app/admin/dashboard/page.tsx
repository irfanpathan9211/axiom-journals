"use client";

import { useEffect, useState } from "react";

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
}

export default function AdminDashboard() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/messages")
            .then((res) => res.json())
            .then((data) => {
                setMessages(data.messages || []);
                setLoading(false);
            });
    }, []);

    async function handleLogout() {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
    }

    if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;

    return (
        <div style={{ padding: "40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h1>Contact Messages</h1>
                <button onClick={handleLogout} style={{ padding: "8px 16px", cursor: "pointer" }}>
                    Logout
                </button>
            </div>

            {messages.length === 0 ? (
                <p>Abhi tak koi message nahi aaya.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#f5f5f5", textAlign: "left" }}>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Subject</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Message</th>
                            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((m) => (
                            <tr key={m.id}>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{m.name}</td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{m.email}</td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{m.subject}</td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{m.message}</td>
                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                    {new Date(m.created_at).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}