"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Calendar, Clock, ArrowLeft, Share2, User, Edit2, Save, X, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    gradient: string;
    author?: string;
    role?: string;
    content?: string;
    createdAt?: any;
}

export default function BlogPost() {
    const params = useParams();
    const slug = params?.slug as string;
    const { isAdmin } = useAuth();

    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState<Partial<BlogPost>>({});
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (slug) {
            fetchPost();
        }
    }, [slug]);

    const fetchPost = async () => {
        try {
            const q = query(collection(db, "blog_posts"), where("slug", "==", slug));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setPost(null);
                setLoading(false);
                return;
            }

            const postData = querySnapshot.docs[0];
            const fetchedPost = { id: postData.id, ...postData.data() } as BlogPost;
            setPost(fetchedPost);
            setEditForm(fetchedPost);
        } catch (error) {
            console.error("Error fetching post:", error);
        } finally {
            setLoading(false);
        }
    };

    const saveEdit = async () => {
        if (!post?.id || !editForm) return;
        try {
            // Update the date to current date in Spanish format
            const currentDate = new Date().toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });

            const updatedData = {
                ...editForm,
                date: currentDate
            };

            await updateDoc(doc(db, "blog_posts", post.id), updatedData);
            setPost({ ...post, ...updatedData } as BlogPost);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating post:", error);
            alert("Error al guardar cambios");
        }
    };

    const getShareUrl = () => {
        if (typeof window !== 'undefined') {
            return window.location.href;
        }
        return '';
    };

    const handleShare = (platform: string) => {
        const url = getShareUrl();
        const text = post?.title || '';

        const shareUrls: Record<string, string> = {
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
        setShowShareMenu(false);
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(getShareUrl());
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                setShowShareMenu(false);
            }, 2000);
        } catch (error) {
            console.error("Error copying to clipboard:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 pt-24 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (!post) {
        notFound();
        return null;
    }

    return (
        <article className="min-h-screen bg-slate-950 pt-24 pb-20">
            {/* Hero Header */}
            <div className="relative h-[400px] w-full overflow-hidden mb-12">
                {post.image && post.image !== "/blog/placeholder.jpg" ? (
                    <img
                        src={post.image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-20`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/50 to-slate-950" />

                <div className="relative h-full max-w-4xl mx-auto px-6 flex flex-col justify-end pb-12">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 w-fit">
                        <ArrowLeft className="w-4 h-4" />
                        Volver al Blog
                    </Link>

                    <div className="flex items-center gap-4 mb-4">
                        {isEditing ? (
                            <input
                                type="text"
                                value={editForm.category || ""}
                                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-xs font-medium text-indigo-300"
                                placeholder="Categoría"
                            />
                        ) : (
                            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300 border border-indigo-500/30">
                                {post.category}
                            </span>
                        )}
                    </div>

                    {isEditing ? (
                        <input
                            type="text"
                            value={editForm.title || ""}
                            onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                            className="text-4xl md:text-5xl font-bold bg-slate-800 border border-slate-700 rounded p-2 text-white mb-6"
                            placeholder="Título"
                        />
                    ) : (
                        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-6 leading-tight">
                            {post.title}
                        </h1>
                    )}

                    <div className="flex items-center gap-6 text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                                <User className="w-4 h-4" />
                            </div>
                            <div>
                                {isEditing ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editForm.author || ""}
                                            onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                                            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                                            placeholder="Autor"
                                        />
                                        <input
                                            type="text"
                                            value={editForm.role || ""}
                                            onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                            className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-400 mt-1"
                                            placeholder="Rol"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p className="font-semibold text-white">{post.author || "Autor"}</p>
                                        <p className="text-xs text-slate-500">{post.role || "Equipo"}</p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="h-8 w-px bg-slate-800" />
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editForm.readTime || ""}
                                    onChange={(e) => setEditForm({ ...editForm, readTime: e.target.value })}
                                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs w-16"
                                    placeholder="5 min"
                                />
                            ) : (
                                `${post.readTime} lectura`
                            )}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6">
                {isAdmin && !isEditing && (
                    <div className="mb-6 flex justify-end">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            <Edit2 className="w-4 h-4" />
                            Editar
                        </button>
                    </div>
                )}

                {isEditing ? (
                    <div className="space-y-4">
                        <textarea
                            value={editForm.content || ""}
                            onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-slate-300 font-mono text-sm min-h-[400px] resize-y"
                            placeholder="Contenido HTML del post..."
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={saveEdit}
                                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                Guardar Cambios
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditForm(post);
                                }}
                                className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4" />
                                Cancelar
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        className="prose prose-invert prose-lg prose-indigo max-w-none
                        prose-headings:font-bold prose-headings:text-white
                        prose-p:text-slate-300 prose-p:leading-relaxed
                        prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300
                        prose-blockquote:border-l-indigo-500 prose-blockquote:bg-slate-900/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                        prose-strong:text-white"
                        dangerouslySetInnerHTML={{ __html: post.content || "<p>No hay contenido disponible.</p>" }}
                    />
                )}

                {/* Share / Footer */}
                {!isEditing && (
                    <div className="mt-16 pt-8 border-t border-slate-800 flex justify-between items-center">
                        <p className="text-slate-500 text-sm">
                            ¿Te gustó este artículo? Compártelo.
                        </p>
                        <div className="relative">
                            <button
                                onClick={() => setShowShareMenu(!showShareMenu)}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-slate-300 hover:bg-slate-800 transition-colors"
                            >
                                <Share2 className="w-4 h-4" />
                                Compartir
                            </button>

                            {showShareMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowShareMenu(false)}
                                    />

                                    <div className="absolute right-0 bottom-full mb-2 w-56 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden">
                                        <button
                                            onClick={() => handleShare('twitter')}
                                            className="w-full px-4 py-3 text-left text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-3"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                            Twitter / X
                                        </button>
                                        <button
                                            onClick={() => handleShare('facebook')}
                                            className="w-full px-4 py-3 text-left text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-3"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                            </svg>
                                            Facebook
                                        </button>
                                        <button
                                            onClick={() => handleShare('linkedin')}
                                            className="w-full px-4 py-3 text-left text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-3"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                            </svg>
                                            LinkedIn
                                        </button>
                                        <button
                                            onClick={() => handleShare('whatsapp')}
                                            className="w-full px-4 py-3 text-left text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-3"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                            WhatsApp
                                        </button>
                                        <div className="border-t border-slate-700" />
                                        <button
                                            onClick={handleCopyLink}
                                            className="w-full px-4 py-3 text-left text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-3"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="w-5 h-5 text-green-400" />
                                                    <span className="text-green-400">¡Copiado!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-5 h-5" />
                                                    Copiar enlace
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}
