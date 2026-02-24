import type { Bag } from "../../types/entities";
import type { ColumnDef } from "@tanstack/react-table";
import { addDays, format } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { PencilIcon, CheckCircleIcon, GiftIcon } from "lucide-react";
import { SortableHeader } from "@/components/table/sortable-header";
import { STICKY_ACTION_COLUMN_META } from "@/components/table/constants";
import { TableActionCell } from "@/components/table/table-action-cell";

function columns({
    handleEdit,
    handleStatusChange,
}: {
    handleEdit: (bag: Bag) => void;
    handleStatusChange: (bag: Bag, status: "devolvida" | "doada") => void;
}): ColumnDef<Bag>[] {
    return [
        {
            accessorKey: "fornecedora.codigo",
            header: ({ column }) => (
                <SortableHeader column={column} label="Código da Fornecedora" />
            ),
            cell: (info) => <span>{info.getValue() as string}</span>,
        },
        {
            accessorKey: "fornecedora.nome",
            meta: {
                headerClassName: "hidden lg:table-cell",
                cellClassName: "hidden lg:table-cell",
            },
            header: ({ column }) => (
                <SortableHeader column={column} label="Nome" />
            ),
            cell: (info) => <span>{info.getValue() as string}</span>,
        },

        {
            accessorKey: "setor.nome",
            header: ({ column }) => (
                <SortableHeader column={column} label="Setor" />
            ),
            cell: (info) => <span>{info.getValue() as string}</span>,
        },

        {
            accessorKey: "quantidadeDePecasSemCadastro",
            header: ({ column }) => (
                <SortableHeader
                    column={column}
                    label="Qtd. Peças S/ Cadastro"
                />
            ),
            cell: (info) => <span>{info.getValue() as string}</span>,
        },

        {
            id: "totalDePecas",
            accessorFn: (row) => {
                const quantidadeSemCadastro =
                    row.quantidadeDePecasSemCadastro ?? 0;
                const quantidadeCadastradas = row.pecasCadastradas?.length ?? 0;

                return quantidadeSemCadastro + quantidadeCadastradas;
            },
            header: ({ column }) => (
                <SortableHeader column={column} label="Total de Peças" />
            ),
            cell: (info) => <span>{info.getValue() as number}</span>,
        },

        {
            header: "Códigos",
            id: "codigos",
            cell: ({ row }) => {
                const pecas = row.original.pecasCadastradas || [];

                if (!pecas.length) return "";

                const firstPeca = pecas[0].codigoDaPeca;
                const countRestante = pecas.length - 1;

                if (countRestante <= 0) return <span>{firstPeca}</span>;

                return (
                    <div className="flex items-center gap-2">
                        <span className="truncate max-w-[80px]">
                            {firstPeca}
                        </span>

                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="bg-gray-200 hover:bg-gray-300 text-xs px-2 py-1 rounded-full transition-colors">
                                    +{countRestante}
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-2">
                                <div className="flex flex-col gap-2">
                                    <h4 className="font-medium text-xs text-muted-foreground mb-1">
                                        Lista completa:
                                    </h4>
                                    <div className="flex flex-wrap">
                                        {pecas.map((p) => (
                                            <span
                                                className=" gap-3 ml-2 mb-2 "
                                                key={
                                                    p.pecaCadastradaId ||
                                                    p.codigoDaPeca
                                                }
                                            >
                                                <p className="bg-gray-500 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                                                    {p.codigoDaPeca}
                                                </p>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                );
            },
        },
        {
            accessorKey: "observacoes",
            meta: {
                headerClassName: "hidden lg:table-cell",
                cellClassName: "hidden lg:table-cell",
            },
            header: "Observações",
            cell: (info) => (
                <span>
                    {info.getValue() ? (info.getValue() as string) : "-"}
                </span>
            ),
        },
        {
            id: "prazo",
            accessorFn: (row) => {
                if (!row.dataMensagem) return null;
                return new Date(row.dataMensagem).getTime();
            },
            header: ({ column }) => (
                <SortableHeader column={column} label="Prazo (+15 dias)" />
            ),
            cell: ({ row }) => {
                const dataMensagem = row.original.dataMensagem;
                if (!dataMensagem) return <span>-</span>;

                try {
                    const date = new Date(dataMensagem);
                    const deadline = addDays(date, 15);
                    return <span>{format(deadline, "dd/MM/yyyy")}</span>;
                } catch {
                    return <span>Erro Data</span>;
                }
            },
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
                        variant={
                            props.row.original.statusDevolvida
                                ? "default"
                                : "outline"
                        }
                        size="icon"
                        title={
                            props.row.original.statusDevolvida
                                ? "Desmarcar Devolvida"
                                : "Marcar como Devolvida"
                        }
                        onClick={() =>
                            handleStatusChange(props.row.original, "devolvida")
                        }
                    >
                        <CheckCircleIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant={
                            props.row.original.statusDoada
                                ? "default"
                                : "outline"
                        }
                        size="icon"
                        title={
                            props.row.original.statusDoada
                                ? "Desmarcar Doada"
                                : "Marcar como Doada"
                        }
                        onClick={() =>
                            handleStatusChange(props.row.original, "doada")
                        }
                    >
                        <GiftIcon className="h-4 w-4" />
                    </Button>
                </TableActionCell>
            ),
        },
    ];
}

export default columns;
