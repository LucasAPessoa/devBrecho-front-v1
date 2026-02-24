import type { ReactNode } from "react";

interface TableActionCellProps {
    children: ReactNode;
}

export function TableActionCell({ children }: TableActionCellProps) {
    return <div className="flex items-center gap-2">{children}</div>;
}
