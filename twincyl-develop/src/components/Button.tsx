import { cn } from "../lib/utils";

type ButtonProps = {
    children: React.ReactNode;
    className?: string;
} & React.ComponentPropsWithoutRef<"button">

export default function Button({ children, className, ...props }: ButtonProps) {
    return (
        <button {...props} className={cn("border border-[#aaaaaa] rounded-md p-2 m-1 cursor-pointer hover:bg-[#727272]", className)}>
            {children}
        </button>
    );
}