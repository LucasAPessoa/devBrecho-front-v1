import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    type SortingState,
    type ColumnDef,
    type FilterFn,
} from "@tanstack/react-table";
import { useState } from "react";

interface UseDataTableParams<TData, TValue> {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    globalFilter?: string;
    onGlobalFilterChange?: (value: string) => void;
}

const normalizeSearchValue = (value: string) => {
    return value
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase()
        .trim();
};

const collectSearchTokens = (
    value: unknown,
    tokens: string[],
    seen: WeakSet<object>,
) => {
    if (value === null || value === undefined) {
        return;
    }

    if (typeof value === "string") {
        tokens.push(value);
        return;
    }

    if (
        typeof value === "number" ||
        typeof value === "boolean" ||
        typeof value === "bigint"
    ) {
        tokens.push(String(value));
        return;
    }

    if (value instanceof Date) {
        tokens.push(value.toISOString());
        return;
    }

    if (Array.isArray(value)) {
        value.forEach((item) => collectSearchTokens(item, tokens, seen));
        return;
    }

    if (typeof value === "object") {
        if (seen.has(value)) {
            return;
        }

        seen.add(value);
        Object.values(value as Record<string, unknown>).forEach((item) =>
            collectSearchTokens(item, tokens, seen),
        );
    }
};

const buildSearchText = (value: unknown) => {
    const tokens: string[] = [];
    collectSearchTokens(value, tokens, new WeakSet<object>());
    return tokens.join(" ");
};

export function useDataTable<TData, TValue>({
    data,
    columns,
    globalFilter,
    onGlobalFilterChange,
}: UseDataTableParams<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [internalGlobalFilter, setInternalGlobalFilter] =
        useState<string>("");
    const resolvedGlobalFilter = globalFilter ?? internalGlobalFilter;
    const handleGlobalFilterChange =
        onGlobalFilterChange ?? setInternalGlobalFilter;
    const globalSearchFilter: FilterFn<TData> = (
        row,
        _columnId,
        filterValue,
    ) => {
        const searchTerm = normalizeSearchValue(String(filterValue ?? ""));

        if (!searchTerm) {
            return true;
        }

        const rowContent = normalizeSearchValue(buildSearchText(row.original));
        return rowContent.includes(searchTerm);
    };

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: handleGlobalFilterChange,
        globalFilterFn: globalSearchFilter,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            globalFilter: resolvedGlobalFilter,
        },
    });

    return {
        table,
    };
}
