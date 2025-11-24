"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Loader2 } from "lucide-react";
import { submitContactForm, updateContactForm } from "../lib/actions";

type Message = {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
    options?: { label: string; value: string }[];
};

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "¡Hola! Soy el asistente virtual de LIVE Design. ¿En qué puedo ayudarte hoy?",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // State to track conversation flow
    const [conversationState, setConversationState] = useState<"idle" | "awaiting_name" | "awaiting_contact_details" | "awaiting_project_details">("idle");

    // Refs to track state in event listeners without stale closures
    const conversationStateRef = useRef(conversationState);
    const messagesRef = useRef(messages);

    useEffect(() => {
        conversationStateRef.current = conversationState;
    }, [conversationState]);

    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    const [selectedContactMethod, setSelectedContactMethod] = useState<string | null>(null);
    const [formData, setFormData] = useState<{ name: string; method: string; contactInfo: string; projectDetails?: string }>({
        name: "",
        method: "",
        contactInfo: ""
    });
    const [contactDocId, setContactDocId] = useState<string | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isLoading]);

    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);

        const handleStartContactFlow = () => {
            setIsOpen(true);

            // Check if we are already in a flow or if the last message is the contact prompt
            if (conversationStateRef.current !== "idle") {
                return;
            }

            const lastMessage = messagesRef.current[messagesRef.current.length - 1];
            if (lastMessage?.text === "¡Genial! Para ponernos en contacto, ¿qué método prefieres?") {
                return;
            }

            // Add a small delay to make it feel natural if opening immediately
            setTimeout(() => {
                const contactMessage: Message = {
                    id: Date.now().toString(),
                    text: "¡Genial! Para ponernos en contacto, ¿qué método prefieres?",
                    sender: "bot",
                    timestamp: new Date(),
                    options: [
                        { label: "WhatsApp", value: "whatsapp" },
                        { label: "Email", value: "email" },
                        { label: "Llamada", value: "call" }
                    ]
                };
                setMessages(prev => [...prev, contactMessage]);
                setConversationState("idle"); // Reset state just in case, logic handled by option click
            }, 500);
        };

        const handleStartConsultationFlow = () => {
            setIsOpen(true);

            if (conversationStateRef.current !== "idle") return;

            setTimeout(() => {
                const consultMessage: Message = {
                    id: Date.now().toString(),
                    text: "Me encantaría escuchar sobre tu caso particular. ¿Qué desafío estás enfrentando o qué idea tienes en mente?",
                    sender: "bot",
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, consultMessage]);
                setConversationState("idle"); // Keep idle so AI can respond naturally
            }, 500);
        };

        window.addEventListener("open-chatbot", handleOpenChat);
        window.addEventListener("start-contact-flow", handleStartContactFlow);
        window.addEventListener("start-consultation-flow", handleStartConsultationFlow);

        return () => {
            window.removeEventListener("open-chatbot", handleOpenChat);
            window.removeEventListener("start-contact-flow", handleStartContactFlow);
            window.removeEventListener("start-consultation-flow", handleStartConsultationFlow);
        };
    }, []);

    const handleOptionClick = (value: string, label: string) => {
        // Add user selection as message
        const userMsg: Message = {
            id: Date.now().toString(),
            text: label,
            sender: "user",
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);
        setSelectedContactMethod(value);
        setFormData(prev => ({ ...prev, method: value }));
        setIsLoading(true);

        // Simulate bot thinking
        setTimeout(() => {
            setIsLoading(false);
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "Perfecto. Primero, ¿cuál es tu nombre?",
                sender: "bot",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
            setConversationState("awaiting_name");
        }, 800);
    };

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText("");
        setIsLoading(true);

        // Handle specific flow states locally
        if (conversationState === "awaiting_name") {
            const name = inputText;
            setFormData(prev => ({ ...prev, name }));

            setTimeout(() => {
                setIsLoading(false);
                let responseText = "";
                if (selectedContactMethod === "whatsapp" || selectedContactMethod === "call") {
                    responseText = `Gracias ${name}. Por favor, indícame tu número de teléfono (con código de área).`;
                } else {
                    responseText = `Gracias ${name}. Por favor, escribe tu dirección de correo electrónico.`;
                }

                const botMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    text: responseText,
                    sender: "bot",
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botMsg]);
                setConversationState("awaiting_contact_details");
            }, 800);
            return;
        }

        if (conversationState === "awaiting_contact_details") {
            const contactInfo = inputText;
            const finalData = { ...formData, contactInfo };

            // Call server action
            try {
                const result = await submitContactForm({
                    contactInfo: finalData.contactInfo,
                    method: finalData.method || "consultation", // Default if coming from consultation flow
                    message: finalData.projectDetails ? `Consulta Proyecto: ${finalData.projectDetails}` : "Contact request from chatbot",
                    name: finalData.name
                });
                if (result.success && result.id) {
                    setContactDocId(result.id);
                }
            } catch (err) {
                console.error("Failed to save contact request", err);
            }

            setTimeout(() => {
                setIsLoading(false);
                const botMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    text: "¡Gracias! He recibido tus datos. Un miembro de nuestro equipo se pondrá en contacto contigo a la brevedad.",
                    sender: "bot",
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botMsg]);
                setConversationState("idle");
                setSelectedContactMethod(null);
                setFormData({ name: "", method: "", contactInfo: "", projectDetails: "" });
            }, 1000);
            return;
        }

        // Passive detection of contact info updates
        if (contactDocId) {
            const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
            const phoneRegex = /(?:(?:\+?598|0)?9\d{7,8})|(?:(?:\+?54|0)?(?:9)?\d{10})/; // Uruguay or Argentina phone regex

            const emailMatch = inputText.match(emailRegex);
            const phoneMatch = inputText.match(phoneRegex);

            if (emailMatch || phoneMatch) {
                const updates: { email?: string; phone?: string } = {};
                let detectedType = "";

                if (emailMatch) {
                    updates.email = emailMatch[0];
                    detectedType = "email";
                }
                if (phoneMatch) {
                    updates.phone = phoneMatch[0];
                    detectedType = detectedType ? "datos de contacto" : "teléfono";
                }

                try {
                    await updateContactForm(contactDocId, updates);
                    // Optional: Acknowledge update? Maybe too intrusive.
                    // Let's just log it for now or maybe send a subtle confirmation if it fits the flow.
                    // For now, we'll just do it silently or let the AI response handle it naturally.
                } catch (err) {
                    console.error("Failed to update contact info", err);
                }
            }
        }

        try {
            // Prepare messages for API (exclude IDs and timestamps, map to role/content)
            const apiMessages = [...messages, userMessage].map((msg) => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.text,
            }));

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messages: apiMessages }),
            });

            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }

            const data = await response.json();

            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: data.reply || "Lo siento, hubo un error al procesar tu mensaje.",
                sender: "bot",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botResponse]);
        } catch (error) {
            console.error("Error sending message:", error);
            // Fallback for demo/dev if API fails
            const fallbackResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: "Gracias por tu mensaje. En este momento estoy en modo demostración, pero he registrado tu consulta.",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, fallbackResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[350px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/90 shadow-2xl backdrop-blur-md"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
                                    <Sparkles size={16} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-100">Asistente LIVE</h3>
                                    <p className="text-xs text-slate-400">IA Powered</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="h-[400px] overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700">
                            <div className="flex flex-col gap-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.sender === "user"
                                                ? "bg-indigo-600 text-white rounded-br-none"
                                                : "bg-slate-800 text-slate-200 rounded-bl-none"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>

                                        {/* Options Buttons */}
                                        {msg.options && (
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {msg.options.map((option) => (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => handleOptionClick(option.value, option.label)}
                                                        className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300 transition-colors hover:bg-indigo-500/20 hover:text-indigo-200"
                                                    >
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="flex items-center gap-2 rounded-2xl rounded-bl-none bg-slate-800 px-4 py-3 text-slate-400">
                                            <Loader2 size={16} className="animate-spin" />
                                            <span className="text-xs">Escribiendo...</span>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={handleSendMessage}
                            className="border-t border-slate-800 bg-slate-900/30 p-4"
                        >
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder={
                                        conversationState === "awaiting_name"
                                            ? "Escribe tu nombre..."
                                            : conversationState === "awaiting_contact_details"
                                                ? "Ingresa tus datos de contacto..."
                                                : "Escribe un mensaje..."
                                    }
                                    disabled={isLoading}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 pr-12 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputText.trim() || isLoading}
                                    className="absolute right-2 rounded-lg p-2 text-indigo-400 transition-colors hover:bg-indigo-500/10 hover:text-indigo-300 disabled:opacity-50"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="group flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                        >
                            <MessageSquare size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
