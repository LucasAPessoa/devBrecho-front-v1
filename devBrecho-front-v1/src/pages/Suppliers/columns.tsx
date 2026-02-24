import type { Supplier } from "@/types/entities";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon, HistoryIcon } from "lucide-react";
import { STICKY_ACTION_COLUMN_META } from "@/components/table/constants";
import { TableActionCell } from "@/components/table/table-action-cell";

export function columns({
    handleEdit,
    handleDelete,
    handleViewHistory,
}: {
    handleEdit: (supplier: Supplier) => void;
    handleDelete: (supplier: Supplier) => void;
    handleViewHistory: (supplier: Supplier) => void;
}): ColumnDef<Supplier>[] {
    return [
        {
            accessorKey: "codigo",
            header: "Código",
        },
        {
            accessorKey: "nome",
            header: "Nome",
            cell: (props) => (
                <div
                    className="cursor-pointer hover:underline font-medium text-primary"
                    onClick={() => handleViewHistory(props.row.original)}
                    title="Ver histórico"
                >
                    {props.getValue() as string}
                </div>
            ),
        },
        {
            accessorKey: "telefone",
            header: "Telefone",
            cell: (info) => info.getValue() || "-",
        },
        {
            id: "actions",
            meta: STICKY_ACTION_COLUMN_META,
            header: "Ações",
            cell: (props) => (
                <TableActionCell>
                    <Button
                        variant="ghost"
                        size="icon"
                        title="Histórico"
                        onClick={() => handleViewHistory(props.row.original)}
                    >
                        <HistoryIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        title="Editar"
                        onClick={() => handleEdit(props.row.original)}
                    >
                        <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="icon"
                        title="Excluir"
                        onClick={() => handleDelete(props.row.original)}
                    >
                        <TrashIcon className="h-4 w-4" />
                    </Button>
                </TableActionCell>
            ),
        },
    ];
}
