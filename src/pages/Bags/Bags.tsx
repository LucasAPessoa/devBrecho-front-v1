import { DataTable } from "@/components/data-table";
import { DEFAULT_TABLE_CONTAINER_CLASS } from "@/components/table/constants";
import { TableViewport } from "@/components/table/table-viewport";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/ui/search-box";
import columns from "./columns";
import { useBags } from "@/hooks/useBags";
import { useState } from "react";
import { type Bag } from "@/types/entities";
import { BagSheet } from "./components/BagSheet";
import { useBagStatusActions } from "./hooks/useBagStatusActions";
import { PlusIcon } from "lucide-react";
import { addDays } from "date-fns";

export function Bags() {
    const { bags, setStatusBag, archiveBag } = useBags();
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedBag, setSelectedBag] = useState<Bag | null>(null);
    const [searchValue, setSearchValue] = useState("");
    const { handleStatusChange } = useBagStatusActions({ setStatusBag });
    const getRowClassName = (bag: Bag) => {
        if (bag.statusDoada) {
            return "bg-pink-200";
        }

        if (bag.statusDevolvida) {
            return "bg-blue-200";
        }

        const messageValue = bag.dataMensagem?.trim();
        if (!messageValue) {
            return undefined;
        }

        const messageDate = new Date(messageValue);
        const isValidDate = !Number.isNaN(messageDate.getTime());

        if (isValidDate) {
            const deadline = addDays(messageDate, 15);
            if (deadline.getTime() < Date.now()) {
                return "bg-red-200";
            }
        }

        return "bg-yellow-200";
    };

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

            <SearchBox value={searchValue} onValueChange={setSearchValue} />

            <TableViewport>
                <DataTable
                    data={bags ?? []}
                    containerClassName={DEFAULT_TABLE_CONTAINER_CLASS}
                    globalFilter={searchValue}
                    onGlobalFilterChange={setSearchValue}
                    getRowClassName={getRowClassName}
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
