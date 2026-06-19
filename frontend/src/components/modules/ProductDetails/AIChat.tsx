"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send } from "lucide-react";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export default function AIChat({ productContext, product, activeSize, qty }: { productContext: string, product: any, activeSize: string | null, qty: number }) {
    const [chatOpen, setChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [chatLoading, setChatLoading] = useState(false);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMessages]);

    const fetchAIReply = async (messages: ChatMessage[]) => {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "",
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-20240620",
                max_tokens: 1000,
                system: `You are an AI assistant. Context: ${productContext}`,
                messages,
            }),
        });
        const data = await res.json();
        return data.content[0].text;
    };

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const newMessages = [...chatMessages, { role: "user" as const, content: text }];
        setChatMessages(newMessages);
        setChatLoading(true);
        setChatInput("");

        try {
            const reply = await fetchAIReply(newMessages);
            setChatMessages([...newMessages, { role: "assistant", content: reply }]);
        } catch {
            setChatMessages([...newMessages, { role: "assistant", content: "Sorry, something went wrong." }]);
        } finally {
            setChatLoading(false);
        }
    };

    return (
        <div className="border border-indigo-100 rounded-2xl overflow-hidden bg-white">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-4 py-3 flex items-center gap-2 border-b border-indigo-100">
                <Sparkles size={15} className="text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-800">AI Style Assistant</span>
            </div>

            <div className="p-4 space-y-4">
                <p className="text-sm text-gray-600 leading-relaxed">{product.aiStylistInfo.styleNote}</p>

                <div className="grid grid-cols-2 gap-2">
                    {[
                        { label: "Outfit ideas", prompt: `What should I wear with this product? Product: ${product.name}` },
                        { label: "Order with AI", prompt: `I want to order ${product.name}. Size: ${activeSize || "not selected"}, Qty: ${qty}. Please help.` },
                        { label: "Is this for me?", prompt: `Is this product right for me? Tell me about ${product.name}.` },
                        { label: "Ask anything", prompt: "" },
                    ].map((btn) => (
                        <button
                            key={btn.label}
                            onClick={() => {
                                if (btn.prompt) handleSend(btn.prompt);
                                setChatOpen(true);
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-xs border rounded-xl hover:bg-indigo-50"
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                {chatOpen && (
                    <div className="border-t pt-4 space-y-3">
                        <div className="h-40 overflow-y-auto space-y-2">
                            {chatMessages.map((m, i) => (
                                <div key={i} className={`text-xs p-2 rounded ${m.role === 'user' ? 'bg-indigo-600 text-white ml-auto' : 'bg-gray-100'}`}>
                                    {m.content}
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="flex gap-2">
                            <input
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                placeholder="Ask about size, delivery, or styling..."
                                className="flex-1 border rounded p-2 text-sm"
                            />
                            <button onClick={() => handleSend(chatInput)} className="bg-indigo-600 text-white px-3 rounded">
                                <Send size={15} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}