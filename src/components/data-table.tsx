import { flexRender, type ColumnDef } from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useDataTable } from "@/hooks/useDataTable";

type TableColumnMeta = {
    headerClassName?: string;
    cellClassName?: string;
};

interface DataTableProps<TData, TValue> {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    containerClassName?: string;
}

export function DataTable<TData, TValue>({
    data,
    columns,
    containerClassName,
}: DataTableProps<TData, TValue>) {
    const { table } = useDataTable({
        data,
        columns,
    });

    return (
        <div className={cn("rounded-md border", containerClassName)}>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const meta = header.column.columnDef
                                    .meta as TableColumnMeta;
                                return (
                                    <TableHead
                                        key={header.id}
                                        className={meta?.headerClassName}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    const meta = cell.column.columnDef
                                        .meta as TableColumnMeta;

                                    return (
                                        <TableCell
                                            key={cell.id}
                                            className={meta?.cellClassName}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                Sem resultados, tchê.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
