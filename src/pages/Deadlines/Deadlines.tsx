import { DataTable } from "@/components/data-table";
import { DEFAULT_TABLE_CONTAINER_CLASS } from "@/components/table/constants";
import { TableViewport } from "@/components/table/table-viewport";
import columns from "./columns";
import { useBags } from "@/hooks/useBags";
import { useEffect, useState } from "react";
import { type Bag } from "@/types/entities";
import { BagSheet } from "@/pages/Bags/components/BagSheet";
import { useBagStatusActions } from "@/pages/Bags/hooks/useBagStatusActions";
import { addDays, format, isBefore, startOfDay } from "date-fns";
import { CalendarClock } from "lucide-react";

type GroupedBags = {
    date: string;
    bags: Bag[];
};

export function Deadlines() {
    const { getBagGroupedByDataMensagem, setStatusBag, archiveBag } =
        useBags();
    const [groups, setGroups] = useState<GroupedBags[]>([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedBag, setSelectedBag] = useState<Bag | null>(null);

    const { handleStatusChange } = useBagStatusActions({ setStatusBag });

    useEffect(() => {
        getBagGroupedByDataMensagem().then(setGroups).catch(console.error);
    }, []);

    const handleEdit = (bag: Bag) => {
        setSelectedBag(bag);
        setIsSheetOpen(true);
    };

    const handleArchive = (bag: Bag) => {
        archiveBag(bag.bolsaId);
    };

    const today = startOfDay(new Date());

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-2">
                <CalendarClock className="h-6 w-6" />
                <h1 className="text-2xl font-bold tracking-tight">Prazos</h1>
            </div>

            {groups.length === 0 && (
                <p className="text-muted-foreground">
                    Nenhum grupo de prazos encontrado.
                </p>
            )}

            {groups.map(({ date, bags }) => {
                const deadline = addDays(new Date(date), 15);
                const isOverdue = isBefore(startOfDay(deadline), today);
                const formattedDeadline = format(deadline, "dd/MM/yyyy");

                return (
                    <div key={date} className="space-y-2">
                        <h2
                            className={`text-lg font-semibold ${
                                isOverdue ? "text-red-600" : ""
                            }`}
                        >
                            Prazo: {formattedDeadline}
                            {isOverdue && (
                                <span className="ml-2 text-sm font-normal">
                                    (vencido)
                                </span>
                            )}
                        </h2>

                        <TableViewport>
                            <DataTable
                                data={bags}
                                containerClassName={
                                    DEFAULT_TABLE_CONTAINER_CLASS
                                }
                                columns={columns({
                                    handleEdit,
                                    handleStatusChange,
                                    handleArchive,
                                })}
                            />
                        </TableViewport>
                    </div>
                );
            })}

            <BagSheet
                open={isSheetOpen}
                onOpenChange={(open) => {
                    setIsSheetOpen(open);
                    if (!open) setSelectedBag(null);
                }}
                bagToEdit={selectedBag}
            />
        </div>
    );
}
