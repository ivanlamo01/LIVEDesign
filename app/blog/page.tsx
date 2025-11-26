"use client";

import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag, Plus, Edit2, Trash2, Save, X, Upload, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion, AnimatePresence } from "framer-motion";

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

export default function BlogPage() {
    const { isAdmin } = useAuth();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<BlogPost>>({});
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const q = query(collection(db, "blog_posts"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const fetchedPosts: BlogPost[] = [];
            querySnapshot.forEach((doc) => {
                fetchedPosts.push({ id: doc.id, ...doc.data() } as BlogPost);
            });

            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        const newPost: Omit<BlogPost, "id"> = {
            slug: `new-post-${Date.now()}`,
            title: "Nuevo Post",
            excerpt: "Descripción del nuevo post...",
            date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
            readTime: "5 min",
            category: "General",
            image: "/blog/placeholder.jpg",
            gradient: "from-gray-500 to-slate-500",
            author: "Equipo LIVE",
            role: "Equipo de contenido",
            content: "<p>Escribe aquí el contenido del post...</p>",
            createdAt: Timestamp.now()
        };

        try {
            const docRef = await addDoc(collection(db, "blog_posts"), newPost);
            setPosts([{ id: docRef.id, ...newPost }, ...posts]);
            startEdit({ id: docRef.id, ...newPost });
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar este post?")) return;
        try {
            await deleteDoc(doc(db, "blog_posts", id));
            setPosts(posts.filter(p => p.id !== id));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const startEdit = (post: BlogPost) => {
        setEditingId(post.id);
        setEditForm(post);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const saveEdit = async () => {
        if (!editingId || !editForm) return;
        try {
            await updateDoc(doc(db, "blog_posts", editingId), editForm);
            setPosts(posts.map(p => p.id === editingId ? { ...p, ...editForm } : p));
            setEditingId(null);
            setEditForm({});
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;

        const file = e.target.files[0];
        setUploading(true);

        try {
            const storageRef = ref(storage, `blog_images/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            setEditForm({ ...editForm, image: downloadURL });
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error al subir la imagen");
        } finally {
            setUploading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-20">
            {/* Header */}
            <section className="px-6 lg:px-8 mb-16 relative">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                        Nuestro <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Blog</span>
                    </h1>
                    <p className="text-lg leading-8 text-slate-300">
                        Insights, tutoriales y noticias sobre tecnología, diseño y automatización.
                    </p>
                </div>

                {isAdmin && (
                    <div className="absolute top-0 right-6 md:right-20">
                        <button
                            onClick={handleCreate}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-full transition-colors shadow-lg shadow-indigo-500/20"
                        >
                            <Plus className="w-4 h-4" />
                            Nuevo Post
                        </button>
                    </div>
                )}
            </section>

            {/* Posts Grid */}
            <section className="px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                        </div>
                    ) : posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {posts.map((post) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        key={post.id}
                                        className="group relative flex flex-col overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10"
                                    >
                                        {/* Image Header */}
                                        <div className="relative h-48 w-full overflow-hidden">
                                            {editingId === post.id ? (
                                                <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center">
                                                    <label className="cursor-pointer flex flex-col items-center gap-2 text-white hover:text-indigo-400 transition-colors">
                                                        {uploading ? (
                                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                                                        ) : (
                                                            <>
                                                                <Upload className="w-8 h-8" />
                                                                <span className="text-xs font-medium">Cambiar Imagen</span>
                                                            </>
                                                        )}
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={handleImageUpload}
                                                            disabled={uploading}
                                                        />
                                                    </label>
                                                </div>
                                            ) : null}

                                            {post.image && post.image !== "/blog/placeholder.jpg" && !post.image.startsWith("/blog/") ? (
                                                <img
                                                    src={editForm.image && editingId === post.id ? editForm.image : post.image}
                                                    alt={post.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className={`h-full w-full bg-gradient-to-br ${post.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
                                            )}
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow relative">
                                            {editingId === post.id ? (
                                                <div className="flex flex-col gap-3 h-full">
                                                    <input
                                                        type="text"
                                                        value={editForm.title || ""}
                                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                                        className="bg-slate-800 border border-slate-700 rounded p-2 text-white font-bold"
                                                        placeholder="Título"
                                                    />
                                                    <textarea
                                                        value={editForm.excerpt || ""}
                                                        onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
                                                        className="bg-slate-800 border border-slate-700 rounded p-2 text-slate-300 text-sm h-24 resize-none"
                                                        placeholder="Extracto"
                                                    />
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={editForm.category || ""}
                                                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                                            className="bg-slate-800 border border-slate-700 rounded p-2 text-xs text-indigo-400 w-1/2"
                                                            placeholder="Categoría"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={editForm.readTime || ""}
                                                            onChange={(e) => setEditForm({ ...editForm, readTime: e.target.value })}
                                                            className="bg-slate-800 border border-slate-700 rounded p-2 text-xs text-slate-400 w-1/2"
                                                            placeholder="Tiempo lectura"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 mt-auto pt-4">
                                                        <button onClick={saveEdit} disabled={uploading} className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50">
                                                            <Save className="w-4 h-4" /> Guardar
                                                        </button>
                                                        <button onClick={cancelEdit} disabled={uploading} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded flex items-center justify-center gap-2 disabled:opacity-50">
                                                            <X className="w-4 h-4" /> Cancelar
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    {isAdmin && (
                                                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                                            <button
                                                                onClick={(e) => { e.preventDefault(); startEdit(post); }}
                                                                className="p-2 bg-slate-800 hover:bg-blue-600 text-white rounded-full transition-colors"
                                                            >
                                                                <Edit2 className="w-3 h-3" />
                                                            </button>
                                                            <button
                                                                onClick={(e) => { e.preventDefault(); handleDelete(post.id); }}
                                                                className="p-2 bg-slate-800 hover:bg-red-600 text-white rounded-full transition-colors"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    )}

                                                    <Link href={`/blog/${post.slug}`} className="flex flex-col flex-grow">
                                                        <div className="flex items-center gap-2 mb-4">
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                                                                <Tag className="w-3 h-3" />
                                                                {post.category}
                                                            </span>
                                                        </div>

                                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                                                            {post.title}
                                                        </h3>

                                                        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                                            {post.excerpt}
                                                        </p>

                                                        <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-800 pt-4 mt-auto">
                                                            <div className="flex items-center gap-4">
                                                                <span className="flex items-center gap-1">
                                                                    <Calendar className="w-3 h-3" />
                                                                    {post.date}
                                                                </span>
                                                                <span className="flex items-center gap-1">
                                                                    <Clock className="w-3 h-3" />
                                                                    {post.readTime}
                                                                </span>
                                                            </div>
                                                            <ArrowRight className="w-4 h-4 text-indigo-400 transform group-hover:translate-x-1 transition-transform" />
                                                        </div>
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-slate-400 text-lg">Próximamente más contenido...</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
