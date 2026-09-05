"use client";

import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";

interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
}

interface Article {
    id: number;
    title: string;
    slug: string;
    author: string;
    journal: string;
    category: string | null;
    tags: string | null;
    abstract: string | null;
    content: string;
    image: string | null;
    status: string;
    created_at: string;
}

interface Submission {
    id: number;
    author_name: string;
    email: string;
    journal: string;
    title: string;
    message: string | null;
    file_url: string;
    created_at: string;
}

interface ViewModalData {
    heading: string;
    meta?: string;
    body: string;
}

const emptyForm = {
    title: "",
    author: "",
    journal: "",
    category: "",
    tags: "",
    abstract: "",
    content: "",
    image: "",
};

// Anything longer than this gets clipped in the table with a "Read more" hint.
const MESSAGE_PREVIEW_LIMIT = 120;

function truncate(text: string, limit: number) {
    if (!text) return "";
    if (text.length <= limit) return text;
    return text.slice(0, limit).trimEnd() + "…";
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"messages" | "submissions" | "articles" | "publish">("messages");

    const [messages, setMessages] = useState<Message[]>([]);
    const [loadingMessages, setLoadingMessages] = useState(true);

    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loadingSubmissions, setLoadingSubmissions] = useState(true);
    const [actingId, setActingId] = useState<number | null>(null);

    const [articles, setArticles] = useState<Article[]>([]);
    const [loadingArticles, setLoadingArticles] = useState(true);

    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formMsg, setFormMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

    // Full-message viewer modal (used by both Messages and Submissions tabs)
    const [viewModal, setViewModal] = useState<ViewModalData | null>(null);

    useEffect(() => {
        fetchMessages();
        fetchSubmissions();
        fetchArticles();
    }, []);

    // Close modal on Escape
    useEffect(() => {
        if (!viewModal) return;
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setViewModal(null);
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [viewModal]);

    function fetchMessages() {
        setLoadingMessages(true);
        fetch("/api/admin/messages")
            .then((res) => res.json())
            .then((data) => {
                setMessages(data.messages || []);
                setLoadingMessages(false);
            });
    }

    function fetchSubmissions() {
        setLoadingSubmissions(true);
        fetch("/api/admin/submissions")
            .then((res) => res.json())
            .then((data) => {
                setSubmissions(data.submissions || []);
                setLoadingSubmissions(false);
            });
    }

    function fetchArticles() {
        setLoadingArticles(true);
        fetch("/api/admin/articles")
            .then((res) => res.json())
            .then((data) => {
                setArticles(data.articles || []);
                setLoadingArticles(false);
            });
    }

    async function handleLogout() {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
    }

    async function handleDeleteMessage(id: number) {
        if (!confirm("Are you sure you want to delete this message?")) return;

        const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
        if (res.ok) {
            setMessages((prev) => prev.filter((m) => m.id !== id));
        } else {
            alert("Something went wrong while deleting the message.");
        }
    }

    async function handlePublishSubmission(id: number) {
        setActingId(id);
        const res = await fetch(`/api/admin/submissions/${id}`, { method: "POST" });
        setActingId(null);

        if (res.ok) {
            setSubmissions((prev) => prev.filter((s) => s.id !== id));
            fetchArticles();
        } else {
            alert("Something went wrong while publishing the submission.");
        }
    }

    async function handleRejectSubmission(id: number) {
        if (!confirm("Are you sure you want to reject and delete this submission?")) return;

        setActingId(id);
        const res = await fetch(`/api/admin/submissions/${id}`, { method: "DELETE" });
        setActingId(null);

        if (res.ok) {
            setSubmissions((prev) => prev.filter((s) => s.id !== id));
        }
    }

    async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        setUploading(false);

        if (res.ok) {
            setForm((f) => ({ ...f, image: data.url }));
        } else {
            setFormMsg({ text: data.error || "Image upload failed.", type: "error" });
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }

    function handleEditClick(article: Article) {
        setEditingId(article.id);
        setForm({
            title: article.title,
            author: article.author,
            journal: article.journal,
            category: article.category || "",
            tags: article.tags || "",
            abstract: article.abstract || "",
            content: article.content,
            image: article.image || "",
        });
        setFormMsg(null);
        setActiveTab("publish");
    }

    function handleCancelEdit() {
        setEditingId(null);
        setForm(emptyForm);
        setFormMsg(null);
    }

    async function handleDeleteArticle(id: number) {
        if (!confirm("Are you sure you want to delete this article?")) return;

        const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
        if (res.ok) {
            setArticles((prev) => prev.filter((a) => a.id !== id));
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        setFormMsg(null);

        const url = editingId ? `/api/admin/articles/${editingId}` : "/api/admin/articles";
        const method = editingId ? "PUT" : "POST";

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setSubmitting(false);

        if (res.ok) {
            setFormMsg({
                text: editingId ? "Article updated successfully!" : "Article published successfully!",
                type: "success",
            });
            setForm(emptyForm);
            setEditingId(null);
            fetchArticles();
        } else {
            setFormMsg({ text: data.error || "Something went wrong.", type: "error" });
        }
    }

    // Renders a message cell that clips long text and opens the full-view modal on click.
    function renderMessageCell(fullText: string, heading: string, meta?: string) {
        const text = fullText || "";
        const isLong = text.length > MESSAGE_PREVIEW_LIMIT;

        if (!text) {
            return <span className={styles.messageEmpty}>-</span>;
        }

        return (
            <button
                type="button"
                className={styles.messageCell}
                onClick={() => setViewModal({ heading, meta, body: text })}
                title="Click to read full message"
            >
                <span className={styles.messageText}>{truncate(text, MESSAGE_PREVIEW_LIMIT)}</span>
                {isLong && <span className={styles.readMore}>Read more</span>}
            </button>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>Admin Dashboard</h1>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tabButton} ${activeTab === "messages" ? styles.tabButtonActive : ""}`}
                    onClick={() => setActiveTab("messages")}
                >
                    Messages ({messages.length})
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === "submissions" ? styles.tabButtonActive : ""}`}
                    onClick={() => setActiveTab("submissions")}
                >
                    Submissions ({submissions.length})
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === "articles" ? styles.tabButtonActive : ""}`}
                    onClick={() => setActiveTab("articles")}
                >
                    Published Articles ({articles.length})
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === "publish" ? styles.tabButtonActive : ""}`}
                    onClick={() => setActiveTab("publish")}
                >
                    {editingId ? "Edit Article" : "Publish New Article"}
                </button>
            </div>

            {activeTab === "messages" && (
                <div className={styles.card}>
                    {loadingMessages ? (
                        <p className={styles.loadingText}>Loading...</p>
                    ) : messages.length === 0 ? (
                        <div className={styles.emptyState}>No messages received yet.</div>
                    ) : (
                        <div className={styles.tableWrap}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th className={styles.colMessage}>Message</th>
                                        <th>Date</th>
                                        <th className={styles.colActions}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.map((m) => (
                                        <tr key={m.id}>
                                            <td>{m.name}</td>
                                            <td>{m.email}</td>
                                            <td>{m.subject}</td>
                                            <td className={styles.colMessage}>
                                                {renderMessageCell(m.message, m.subject || "Message", `${m.name} · ${m.email}`)}
                                            </td>
                                            <td>{new Date(m.created_at).toLocaleString()}</td>
                                            <td>
                                                <div className={styles.actionsCell}>
                                                    <button
                                                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                                        onClick={() => handleDeleteMessage(m.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {activeTab === "submissions" && (
                <div className={styles.card}>
                    {loadingSubmissions ? (
                        <p className={styles.loadingText}>Loading...</p>
                    ) : submissions.length === 0 ? (
                        <div className={styles.emptyState}>No manuscript submissions received yet.</div>
                    ) : (
                        <div className={styles.tableWrap}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Author</th>
                                        <th>Email</th>
                                        <th>Journal</th>
                                        <th>Title</th>
                                        <th className={styles.colMessage}>Message</th>
                                        <th>File</th>
                                        <th>Date</th>
                                        <th className={styles.colActions}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submissions.map((s) => (
                                        <tr key={s.id}>
                                            <td>{s.author_name}</td>
                                            <td><a href={`mailto:${s.email}`}>{s.email}</a></td>
                                            <td>{s.journal}</td>
                                            <td>{s.title}</td>
                                            <td className={styles.colMessage}>
                                                {s.message
                                                    ? renderMessageCell(s.message, s.title || "Submission message", `${s.author_name} · ${s.email}`)
                                                    : <span className={styles.messageEmpty}>-</span>}
                                            </td>
                                            <td>
                                                <a href={s.file_url} target="_blank" rel="noopener noreferrer">
                                                    View File
                                                </a>
                                            </td>
                                            <td>{new Date(s.created_at).toLocaleDateString()}</td>
                                            <td>
                                                <div className={styles.actionsCell}>
                                                    <button
                                                        className={`${styles.actionBtn} ${styles.editBtn}`}
                                                        disabled={actingId === s.id}
                                                        onClick={() => handlePublishSubmission(s.id)}
                                                    >
                                                        Publish
                                                    </button>
                                                    <button
                                                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                                        disabled={actingId === s.id}
                                                        onClick={() => handleRejectSubmission(s.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {activeTab === "articles" && (
                <div className={styles.card}>
                    {loadingArticles ? (
                        <p className={styles.loadingText}>Loading...</p>
                    ) : articles.length === 0 ? (
                        <div className={styles.emptyState}>No articles published yet.</div>
                    ) : (
                        <div className={styles.tableWrap}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Journal</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th className={styles.colActions}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {articles.map((a) => (
                                        <tr key={a.id}>
                                            <td>{a.title}</td>
                                            <td>{a.author}</td>
                                            <td>{a.journal}</td>
                                            <td>{a.category || "-"}</td>
                                            <td>
                                                <span className={styles.badge}>{a.status}</span>
                                            </td>
                                            <td>{new Date(a.created_at).toLocaleDateString()}</td>
                                            <td>
                                                <div className={styles.actionsCell}>
                                                    <button className={`${styles.actionBtn} ${styles.editBtn}`} onClick={() => handleEditClick(a)}>
                                                        Edit
                                                    </button>
                                                    <button
                                                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                                        onClick={() => handleDeleteArticle(a.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}

            {activeTab === "publish" && (
                <div className={styles.card}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGrid}>
                            <div>
                                <label className={styles.label}>Title *</label>
                                <input className={styles.input} name="title" value={form.title} onChange={handleChange} required />
                            </div>
                            <div>
                                <label className={styles.label}>Author *</label>
                                <input className={styles.input} name="author" value={form.author} onChange={handleChange} required />
                            </div>
                            <div>
                                <label className={styles.label}>Journal *</label>
                                <input className={styles.input} name="journal" value={form.journal} onChange={handleChange} required />
                            </div>
                            <div>
                                <label className={styles.label}>Category</label>
                                <input className={styles.input} name="category" value={form.category} onChange={handleChange} />
                            </div>
                            <div className={styles.formGroupFull}>
                                <label className={styles.label}>Tags (comma-separated)</label>
                                <input className={styles.input} name="tags" value={form.tags} onChange={handleChange} placeholder="AI, Research, Data Science" />
                            </div>
                            <div className={styles.formGroupFull}>
                                <label className={styles.label}>Abstract</label>
                                <textarea className={styles.textarea} name="abstract" rows={3} value={form.abstract} onChange={handleChange} />
                            </div>
                            <div className={styles.formGroupFull}>
                                <label className={styles.label}>Content *</label>
                                <textarea className={styles.textarea} name="content" rows={10} value={form.content} onChange={handleChange} required />
                            </div>
                            <div className={styles.formGroupFull}>
                                <label className={styles.label}>Cover Image</label>
                                <input className={styles.fileInput} type="file" accept="image/*" onChange={handleImageChange} />
                                {uploading && <p className={styles.loadingText}>Uploading...</p>}
                                {form.image && <img src={form.image} alt="preview" className={styles.imagePreview} />}
                            </div>
                        </div>

                        <div className={styles.formActions}>
                            <button type="submit" className={styles.submitBtn} disabled={submitting || uploading}>
                                {submitting ? "Saving..." : editingId ? "Update Article" : "Publish Article"}
                            </button>
                            {editingId && (
                                <button type="button" className={styles.cancelEditBtn} onClick={handleCancelEdit}>
                                    Cancel Edit
                                </button>
                            )}
                        </div>

                        {formMsg && (
                            <p className={`${styles.formMsg} ${formMsg.type === "success" ? styles.formMsgSuccess : styles.formMsgError}`}>
                                {formMsg.text}
                            </p>
                        )}
                    </form>
                </div>
            )}

            {viewModal && (
                <div className={styles.modalOverlay} onClick={() => setViewModal(null)}>
                    <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <div>
                                <h2 className={styles.modalTitle}>{viewModal.heading}</h2>
                                {viewModal.meta && <p className={styles.modalMeta}>{viewModal.meta}</p>}
                            </div>
                            <button className={styles.modalClose} onClick={() => setViewModal(null)} aria-label="Close">
                                ✕
                            </button>
                        </div>
                        <div className={styles.modalBody}>{viewModal.body}</div>
                    </div>
                </div>
            )}
        </div>
    );
}