import type { Sector } from "@/types/entities";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { STICKY_ACTION_COLUMN_META } from "@/components/table/constants";
import { TableActionCell } from "@/components/table/table-action-cell";

export function columns({
    handleEdit,
    handleDelete,
}: {
    handleEdit: (sector: Sector) => void;
    handleDelete: (sector: Sector) => void;
}): ColumnDef<Sector>[] {
    return [
        {
            accessorKey: "nome",
            header: "Nome",
        },
        {
            id: "actions",
            meta: STICKY_ACTION_COLUMN_META,
            header: "Ações",
            cell: (props) => (
                <TableActionCell>
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
