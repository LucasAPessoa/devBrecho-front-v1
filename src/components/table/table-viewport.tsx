import type { ReactNode } from "react";

interface TableViewportProps {
    children: ReactNode;
}

export function TableViewport({ children }: TableViewportProps) {
    return <div className="overflow-x-auto">{children}</div>;
}
