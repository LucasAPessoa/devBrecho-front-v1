import { DataTable } from "@/components/data-table";
import { DEFAULT_TABLE_CONTAINER_CLASS } from "@/components/table/constants";
import { TableViewport } from "@/components/table/table-viewport";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { useSuppliers } from "@/hooks/useSuppliers";
import { useState } from "react";
import { type Supplier } from "@/types/entities";
import { SupplierSheet } from "./components/SupplierSheet";
import { SupplierHistoryDialog } from "./components/SupplierHistoryDialog";
import { PlusIcon } from "lucide-react";

export function Suppliers() {
    const { suppliers, deleteSupplier } = useSuppliers();
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
        null,
    );
    const [historySupplier, setHistorySupplier] = useState<Supplier | null>(
        null,
    );

    const handleCreate = () => {
        setSelectedSupplier(null);
        setIsSheetOpen(true);
    };

    const handleEdit = (supplier: Supplier) => {
        setSelectedSupplier(supplier);
        setIsSheetOpen(true);
    };

    const handleDelete = (supplier: Supplier) => {
        if (confirm(`Tem certeza que deseja excluir ${supplier.nome}?`)) {
            deleteSupplier(supplier.fornecedoraId);
        }
    };

    const handleViewHistory = (supplier: Supplier) => {
        setHistorySupplier(supplier);
        setIsHistoryOpen(true);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">
                    Fornecedoras
                </h1>
                <Button onClick={handleCreate}>
                    <PlusIcon className="mr-2 h-4 w-4" /> Nova Fornecedora
                </Button>
            </div>

            <TableViewport>
                <DataTable
                    data={suppliers ?? []}
                    containerClassName={DEFAULT_TABLE_CONTAINER_CLASS}
                    columns={columns({
                        handleEdit,
                        handleDelete,
                        handleViewHistory,
                    })}
                />
            </TableViewport>

            <SupplierSheet
                open={isSheetOpen}
                onOpenChange={(open) => {
                    setIsSheetOpen(open);
                    if (!open) setSelectedSupplier(null);
                }}
                supplierToEdit={selectedSupplier}
            />

            <SupplierHistoryDialog
                open={isHistoryOpen}
                onOpenChange={(open) => {
                    setIsHistoryOpen(open);
                    if (!open) setHistorySupplier(null);
                }}
                supplier={historySupplier}
            />
        </div>
    );
}
