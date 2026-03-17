import { useState, useRef, useEffect } from "react";

// ─── System context ────────────────────────────────────────────────────────────
const SYSTEM_CONTEXT = `
You are "Vansh AI" — a smart, friendly personal assistant embedded in Surve Vansh's portfolio website.
Answer ONLY questions related to Vansh. Be concise, warm, and professional.

About Vansh:
- Full name: Surve Vansh
- Currently pursuing BCA (Bachelor of Computer Applications)
- Passionate frontend developer and aspiring full-stack engineer

Skills:
- Frontend: React.js, JavaScript (ES6+), TailwindCSS, HTML5, CSS3
- Backend/Languages: Java, Python
- Tools: Git, GitHub, Vite, VS Code

Projects:
1. Portfolio Website — Personal portfolio built with React + Vite + TailwindCSS.
2. Shopeverse E-commerce — Full-featured e-commerce app with cart and checkout. Built with React and TailwindCSS.
3. Netflix Clone — Netflix UI clone with movie browsing and search. Built with React and a movie API.

Education:
- Pursuing BCA (Bachelor of Computer Applications)
- Strong focus on web development and software engineering fundamentals

Contact:
- Visitors can reach Vansh through the contact section of this portfolio website.
- Available for internships, freelance projects, and collaborations.

If asked anything unrelated to Vansh, politely say:
"I'm here to answer questions about Vansh! Feel free to ask about his skills, projects, education, or how to get in touch."
`;

// ─── Constants ─────────────────────────────────────────────────────────────────
const GREETING = "Hey there! 👋 I'm Vansh AI. Ask me anything about Surve Vansh — his skills, projects, education, or how to get in touch!";

const INITIAL_MESSAGE = { from: "ai" as const, text: GREETING };

const INITIAL_SUGGESTIONS = [
  "What are Vansh's skills?",
  "Show Vansh's projects",
  "How can I contact Vansh?",
];

const POST_REPLY_SUGGESTIONS = [
  ["What are Vansh's skills?", "Show Vansh's projects"],
  ["How can I contact Vansh?", "Tell me about his education"],
  ["What technologies does Vansh use?", "Is Vansh available for work?"],
];

// ─── Types ─────────────────────────────────────────────────────────────────────
type Message = {
  from: "user" | "ai";
  text: string;
};

// ─── Groq API call ─────────────────────────────────────────────────────────────
async function askGroq(userMessage: string, history: Message[]): Promise<string> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  const messages = [
    { role: "system", content: SYSTEM_CONTEXT },
    ...history.map((msg) => ({
      role: msg.from === "user" ? "user" : "assistant",
      content: msg.text,
    })),
    { role: "user", content: userMessage },
  ];

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error("Groq error:", err);
    throw new Error(`Groq API error: ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
}

// ─── Typing Animation ──────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div
        className="flex items-center justify-center flex-shrink-0 mt-1 mr-2 text-xs font-bold text-black rounded-full w-7 h-7"
        style={{ background: "#10b981" }}
      >
        V
      </div>
      <div
        className="flex items-center gap-2 px-4 py-3 border rounded-bl-sm rounded-2xl"
        style={{ background: "#1e1e1e", borderColor: "#2a2a2a" }}
      >
        {/* Animated dots */}
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="inline-block w-2 h-2 rounded-full"
              style={{
                background: "#10b981",
                animation: "vanshBounce 1.2s infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        {/* Typing text */}
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.7rem",
            color: "#10b981",
            letterSpacing: "0.05em",
            animation: "vanshFadeInOut 1.5s infinite",
          }}
        >
          AI is typing...
        </span>
      </div>
    </div>
  );
}

// ─── Message Bubble ────────────────────────────────────────────────────────────
function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.from === "user";
  return (
    <div className={`flex w-full mb-2 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div
          className="flex items-center justify-center flex-shrink-0 mt-1 mr-2 text-xs font-bold text-black rounded-full w-7 h-7"
          style={{ background: "#10b981" }}
        >
          V
        </div>
      )}
      <div
        className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isUser
            ? "rounded-br-sm font-medium text-black"
            : "rounded-bl-sm border"
          }`}
        style={
          isUser
            ? { background: "#10b981" }
            : { background: "#1e1e1e", borderColor: "#2a2a2a", color: "#e5e5e5" }
        }
      >
        {msg.text}
      </div>
    </div>
  );
}

// ─── Suggestion Chips ──────────────────────────────────────────────────────────
function SuggestionChips({
  suggestions,
  onSelect,
  disabled,
}: {
  suggestions: string[];
  onSelect: (s: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-3 pl-9">
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => !disabled && onSelect(s)}
          disabled={disabled}
          className="text-xs px-3 py-1.5 rounded-full border transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            borderColor: "#10b98133",
            color: "#10b981",
            background: "transparent",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.03em",
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              (e.target as HTMLButtonElement).style.background = "#10b98115";
              (e.target as HTMLButtonElement).style.borderColor = "#10b98166";
            }
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.background = "transparent";
            (e.target as HTMLButtonElement).style.borderColor = "#10b98133";
          }}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AskVanshAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiReplyCount, setAiReplyCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Reset chat to initial state ──
  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setLoading(false);
    setAiReplyCount(0);
  };

  // ── Close and reset ──
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => resetChat(), 300); // reset after close animation
  };

  // ── Open chat ──
  const handleOpen = () => {
    setIsOpen(true);
  };

  // ── Auto scroll ──
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ── Focus input on open ──
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  // ── Send message ──
  const sendMessage = async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;

    setInput("");
    const updatedMessages: Message[] = [...messages, { from: "user", text: userText }];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const aiReply = await askGroq(userText, updatedMessages);
      setMessages((prev) => [...prev, { from: "ai", text: aiReply }]);
      setAiReplyCount((c) => c + 1);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "Oops! Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Pick suggestion set based on reply count (cycles through sets)
  const currentSuggestions =
    POST_REPLY_SUGGESTIONS[aiReplyCount % POST_REPLY_SUGGESTIONS.length];

  return (
    <>
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes vanshBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1;   }
        }
        @keyframes vanshFadeInOut {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1;   }
        }
        @keyframes vanshSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes vanshPulse {
          0%, 100% { box-shadow: 0 0 0 0   rgba(16,185,129,0.5); }
          50%       { box-shadow: 0 0 0 10px rgba(16,185,129,0);   }
        }
        @keyframes vanshChipIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .vansh-chat-enter { animation: vanshSlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .vansh-fab-pulse  { animation: vanshPulse 2.4s infinite; }
        .vansh-chip-in    { animation: vanshChipIn 0.3s ease forwards; }
      `}</style>

      {/* ── FAB Button ── */}
      <button
        onClick={isOpen ? handleClose : handleOpen}
        aria-label="Toggle Vansh AI chat"
        className="fixed z-50 flex items-center justify-center transition-colors duration-200 rounded-full shadow-2xl vansh-fab-pulse bottom-6 right-6 w-14 h-14"
        style={{ background: "#10b981" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#34d399")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#10b981")}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          className="fixed z-50 flex flex-col overflow-hidden vansh-chat-enter bottom-24 right-6 rounded-2xl"
          style={{
            width: "360px",
            maxWidth: "calc(100vw - 24px)",
            height: "min(520px, calc(100vh - 120px))",  // never taller than viewport
            bottom: "88px",                              // consistent on all screens
            background: "#0d0d0d",
            border: "1px solid #222",
            boxShadow: "0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(16,185,129,0.08)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center flex-shrink-0 gap-3 px-4 py-3"
            style={{ background: "#111", borderBottom: "1px solid #1e1e1e" }}
          >
            <div className="relative">
              <div
                className="flex items-center justify-center text-sm font-bold text-black rounded-full w-9 h-9"
                style={{ background: "#10b981" }}
              >
                V
              </div>
              <span
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                style={{ background: "#10b981", borderColor: "#111" }}
              />
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-none mb-0.5">
                Ask Vansh AI
              </p>
              <p className="text-xs" style={{ color: "#10b981" }}>
                Always online · Powered by Groq
              </p>
            </div>
            {/* Reset button */}
            <button
              onClick={resetChat}
              title="Reset conversation"
              className="ml-auto mr-2 transition-colors"
              style={{ color: "#444" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#10b981")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#444")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
            {/* Close button */}
            <button
              onClick={handleClose}
              className="transition-colors"
              style={{ color: "#444" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#e5e5e5")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#444")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 px-4 py-4 overflow-y-auto"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#2a2a2a transparent" }}
          >
            {messages.map((msg, i) => {
              const isLastAI = msg.from === "ai" && i === messages.length - 1 && !loading;
              const isInitialGreeting = i === 0 && msg.from === "ai";
              return (
                <div key={i}>
                  <MessageBubble msg={msg} />
                  {/* Suggestions after first greeting */}
                  {isInitialGreeting && messages.length === 1 && (
                    <div className="vansh-chip-in">
                      <SuggestionChips
                        suggestions={INITIAL_SUGGESTIONS}
                        onSelect={sendMessage}
                        disabled={loading}
                      />
                    </div>
                  )}
                  {/* Suggestions after each AI reply (except greeting) */}
                  {isLastAI && i > 0 && (
                    <div className="vansh-chip-in">
                      <SuggestionChips
                        suggestions={currentSuggestions}
                        onSelect={sendMessage}
                        disabled={loading}
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="flex items-center flex-shrink-0 gap-2 px-3 py-3"
            style={{ background: "#111", borderTop: "1px solid #1e1e1e" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Vansh…"
              disabled={loading}
              className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors disabled:opacity-50"
              style={{
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                color: "#e5e5e5",
              }}
              onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = "#10b98150")}
              onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = "#2a2a2a")}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="flex items-center justify-center flex-shrink-0 w-10 h-10 transition-colors rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "#10b981" }}
              onMouseEnter={(e) => { if (!loading && input.trim()) (e.currentTarget as HTMLButtonElement).style.background = "#34d399"; }}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "#10b981")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}