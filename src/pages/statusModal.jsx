// components/StatusModal.jsx
import React, { useEffect } from "react";

export default function StatusModal({
                                        show,
                                        type = "success", // "success" | "error"
                                        onClose,
                                        title,
                                        message,
                                    }) {
    useEffect(() => {
        if (!show) return;

        const onKey = (e) => {
            if (e.key === "Escape") onClose?.();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [show, onClose]);

    if (!show) return null;

    const isSuccess = type === "success";
    const defaultTitle = isSuccess ? "Message sent" : "Something went wrong";
    const defaultMessage = isSuccess
        ? "We received your message. We'll get back to you soon."
        : "Please try again in a moment or contact us by email.";

    return (
        <div className="fixed inset-0 z-[9999]">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
                <div
                    data-cursor="true"
                    role="dialog"
                    aria-modal="true"
                    className="w-full max-w-md rounded-3xl border border-white/12 bg-white/5 backdrop-blur-2xl
                     shadow-[0_0_80px_rgba(255,255,255,0.10)]
                     overflow-hidden"
                >
                    {/* Top bar */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                        <div className="flex items-center gap-3">
              <span
                  className={[
                      "inline-flex h-10 w-10 items-center justify-center rounded-2xl border",
                      isSuccess
                          ? "border-white/15 bg-white/10"
                          : "border-white/15 bg-white/10",
                  ].join(" ")}
              >
                <span
                    className={[
                        "text-lg font-extrabold",
                        isSuccess ? "text-[#AD1C42]" : "text-[#AD1C42]",
                    ].join(" ")}
                >
                  {isSuccess ? "✓" : "!"}
                </span>
              </span>

                            <div className="leading-tight">
                                <div className="text-white font-extrabold text-lg">
                                    {title ?? defaultTitle}
                                    <span className="text-[#AD1C42]">.</span>
                                </div>
                                <div className="text-white/60 text-xs uppercase tracking-[0.25em]">
                                    {isSuccess ? "Success" : "Error"}
                                </div>
                            </div>
                        </div>

                        <button
                            data-cursor="true"
                            onClick={onClose}
                            className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-white/85
                         transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-6 pt-5 pb-6">
                        <p className="text-white/75 leading-relaxed">
                            {message ?? defaultMessage}
                        </p>

                        <div className="mt-6 flex gap-3">
                            <button
                                data-cursor="true"
                                onClick={onClose}
                                className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white
                           transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
                            >
                                Close
                            </button>

                            {isSuccess ? (
                                <button
                                    data-cursor="true"
                                    onClick={onClose}
                                    className="flex-1 rounded-2xl bg-[#AD1C42] px-5 py-3 font-semibold text-white
                             transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(173,28,66,0.35)]"
                                >
                                    Great
                                </button>
                            ) : (
                                <button
                                    data-cursor="true"
                                    onClick={onClose}
                                    className="flex-1 rounded-2xl bg-[#AD1C42] px-5 py-3 font-semibold text-white
                             transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(173,28,66,0.35)]"
                                >
                                    Try again
                                </button>
                            )}
                        </div>

                        <div className="mt-4 text-xs text-white/45">
                            Press <span className="text-white/70">Esc</span> to close.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
