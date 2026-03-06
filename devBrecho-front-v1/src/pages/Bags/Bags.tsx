import { DataTable } from "@/components/data-table";
import { DEFAULT_TABLE_CONTAINER_CLASS } from "@/components/table/constants";
import { TableViewport } from "@/components/table/table-viewport";
import { Button } from "@/components/ui/button";
import columns from "./columns";
import { useBags } from "@/hooks/useBags";
import { useState } from "react";
import { type Bag } from "@/types/entities";
import { BagSheet } from "./components/BagSheet";
import { useBagStatusActions } from "./hooks/useBagStatusActions";
import { PlusIcon } from "lucide-react";

export function Bags() {
    const { bags, setStatusBag, archiveBag } = useBags();
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedBag, setSelectedBag] = useState<Bag | null>(null);
    const { handleStatusChange } = useBagStatusActions({ setStatusBag });

    const handleCreate = () => {
        setSelectedBag(null);
        setIsSheetOpen(true);
    };

    const handleEdit = (bag: Bag) => {
        setSelectedBag(bag);
        setIsSheetOpen(true);
    };

    const handleArchive = (bag: Bag) => {
        archiveBag(bag.bolsaId);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Bolsas</h1>
                <Button onClick={handleCreate}>
                    <PlusIcon className="mr-2 h-4 w-4" /> Nova Bolsa
                </Button>
            </div>

            <TableViewport>
                <DataTable
                    data={bags ?? []}
                    containerClassName={DEFAULT_TABLE_CONTAINER_CLASS}
                    columns={columns({
                        handleEdit,
                        handleStatusChange,
                        handleArchive,
                    })}
                />
            </TableViewport>

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
