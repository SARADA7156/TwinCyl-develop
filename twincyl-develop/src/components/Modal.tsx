"use client";

import { createPortal } from "react-dom";
import { cn } from "../lib/utils";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

interface ModalProps {
    label: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ label, isOpen, onClose, children }: ModalProps) {
    // ブラウザにマウントされたかどうかのフラグ
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div id="modal-overlay" className={cn("fixed top-0 left-0 flex justify-center items-center h-screen w-screen z-50 bg-[#0000005e]", !isOpen && "hidden")} onClick={onClose}>
            <div id="modal-container" className="p-3 bg-[#111111] w-auto h-auto border border-[#aaaaaa]" onClick={(e) => e.stopPropagation()}>
                <div id="modal-header" className="flex items-center border-b">
                    <h1 className="text-2xl">{label}</h1>
                    <button className="hover:bg-[#ffffff57] rounded-2xl p-1 ms-auto text-2xl" onClick={onClose} title="閉じる">
                        <MdClose />
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}