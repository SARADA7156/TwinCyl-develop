import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type TextProps<T extends React.ElementType = 'p'> = {
    as?: T;
    children: React.ReactNode;
    className?: string;
} & React.ComponentPropsWithoutRef<T>

export default function Text<T extends React.ElementType = 'p'>({
    as,
    children,
    className,
    ...props
}: TextProps<T>) {
    const Component = as || 'p';

    return (
        <Component
            className={cn('[word-break:auto-phrase]', className)}
            {...props}
        >
            {children}
        </Component>
    )
}