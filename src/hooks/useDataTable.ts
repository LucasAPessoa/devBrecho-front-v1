import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    type SortingState,
    type ColumnDef,
} from "@tanstack/react-table";
import { useState } from "react";

interface UseDataTableParams<TData, TValue> {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
}

export function useDataTable<TData, TValue>({
    data,
    columns,
}: UseDataTableParams<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return {
        table,
    };
}
