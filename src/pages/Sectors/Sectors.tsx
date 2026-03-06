import { DataTable } from "@/components/data-table";
import { DEFAULT_TABLE_CONTAINER_CLASS } from "@/components/table/constants";
import { TableViewport } from "@/components/table/table-viewport";
import { Button } from "@/components/ui/button";
import { SearchBox } from "@/components/ui/search-box";
import { columns } from "./columns";
import { useSectors } from "@/hooks/useSectors";
import { useState } from "react";
import { type Sector } from "@/types/entities";
import { SectorSheet } from "./components/SectorSheet";
import { PlusIcon } from "lucide-react";

export function Sectors() {
    const { sectors, deleteSector } = useSectors();
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
    const [searchValue, setSearchValue] = useState("");

    const handleCreate = () => {
        setSelectedSector(null);
        setIsSheetOpen(true);
    };

    const handleEdit = (sector: Sector) => {
        setSelectedSector(sector);
        setIsSheetOpen(true);
    };

    const handleDelete = (sector: Sector) => {
        if (confirm(`Tem certeza que deseja excluir ${sector.nome}?`)) {
            deleteSector(sector.setorId);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Setores</h1>
                <Button onClick={handleCreate}>
                    <PlusIcon className="mr-2 h-4 w-4" /> Novo Setor
                </Button>
            </div>

            <SearchBox value={searchValue} onValueChange={setSearchValue} />

            <TableViewport>
                <DataTable
                    data={sectors ?? []}
                    containerClassName={DEFAULT_TABLE_CONTAINER_CLASS}
                    globalFilter={searchValue}
                    onGlobalFilterChange={setSearchValue}
                    columns={columns({
                        handleEdit,
                        handleDelete,
                    })}
                />
            </TableViewport>

            <SectorSheet
                open={isSheetOpen}
                onOpenChange={(open) => {
                    setIsSheetOpen(open);
                    if (!open) setSelectedSector(null);
                }}
                sectorToEdit={selectedSector}
            />
        </div>
    );
}
