"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useCallback, useRef } from "react";
import { cn } from "./utils";
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
/**
 * Musakonttori Modal - animated modal overlay.
 *
 * Features: backdrop blur, escape to close, focus trap,
 * smooth enter/exit animation, body-scroll lock.
 *
 * @example
 * <Modal isOpen={open} onClose={() => setOpen(false)} title="Vahvista">
 *   <p>Oletko varma?</p>
 * </Modal>
 */
export function Modal({ isOpen, onClose, title, children, footer, className, }) {
    const overlayRef = useRef(null);
    const modalRef = useRef(null);
    const previousActiveElement = useRef(null);
    const handleKeyDown = useCallback((e) => {
        if (e.key === "Escape") {
            onClose();
            return;
        }
        if (e.key === "Tab" && modalRef.current) {
            const focusable = modalRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
            if (focusable.length === 0) {
                e.preventDefault();
                return;
            }
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first && last) {
                    e.preventDefault();
                    last.focus();
                }
            }
            else {
                if (document.activeElement === last && first) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    }, [onClose]);
    useEffect(() => {
        if (isOpen) {
            previousActiveElement.current = document.activeElement;
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
            requestAnimationFrame(() => {
                const closeButton = modalRef.current?.querySelector('[data-modal-close]');
                closeButton?.focus();
            });
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
            if (previousActiveElement.current instanceof HTMLElement) {
                previousActiveElement.current.focus();
            }
        };
    }, [isOpen, handleKeyDown]);
    if (!isOpen) {
        return null;
    }
    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };
    return (_jsx("div", { ref: overlayRef, className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4", onClick: handleOverlayClick, role: "dialog", "aria-modal": "true", "aria-labelledby": title ? "modal-title" : undefined, "aria-label": title ? undefined : "Dialog", children: _jsxs("div", { ref: modalRef, className: cn("mx-auto w-full max-w-lg rounded-2xl border border-[var(--mk-palette-border-default,rgba(255,255,255,0.12))] bg-[var(--mk-palette-bg-surface,#1E2130)] shadow-xl", "animate-in fade-in-0 zoom-in-95 slide-in-from-top-4 duration-200", className), children: [title && (_jsxs("div", { className: "flex items-center justify-between border-b border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))] px-6 py-4", children: [_jsx("h3", { id: "modal-title", className: "text-lg font-semibold text-[var(--mk-palette-text-primary,#F0F0F3)]", children: title }), _jsx("button", { "data-modal-close": true, onClick: onClose, className: "rounded-lg p-1 text-[var(--mk-palette-text-secondary,#B0B3C1)] transition-colors hover:bg-[var(--mk-palette-bg-surface,#1E2130)] hover:text-[var(--mk-palette-text-primary,#F0F0F3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--mk-palette-bg-brand,#DC2626)]", "aria-label": "Sulje", children: _jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] })), _jsx("div", { className: "px-6 py-4", children: children }), footer && (_jsx("div", { className: "rounded-b-2xl border-t border-[var(--mk-palette-border-subtle,rgba(255,255,255,0.06))] bg-[var(--mk-palette-bg,#0D0F17)]/50 px-6 py-4", children: footer }))] }) }));
}
