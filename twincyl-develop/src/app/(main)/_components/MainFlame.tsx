'use client';

import Header from "@/src/components/Header";
import Nav from "@/src/components/Nav";
import { useState } from "react";

export default function MainFlame({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => {
        setIsOpen((prev) => !prev);
    }

    return (
        <>
            <Header isOpen={isOpen} />
            <Nav isOpen={isOpen} toggle={toggle} />
            <div>
                {children}
            </div>
        </>
    )
}