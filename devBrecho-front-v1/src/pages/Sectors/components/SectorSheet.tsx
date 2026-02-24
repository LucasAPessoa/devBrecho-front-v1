import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { type Sector } from "@/types/entities";
import { SectorForm } from "./SectorForm";

interface SectorSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    sectorToEdit: Sector | null;
}

export function SectorSheet({
    open,
    onOpenChange,
    sectorToEdit,
}: SectorSheetProps) {
    const handleSuccess = () => {
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[500px]">
                <SheetHeader>
                    <SheetTitle>
                        {sectorToEdit ? "Editar Setor" : "Novo Setor"}
                    </SheetTitle>
                    <SheetDescription>
                        {sectorToEdit
                            ? "Edite os dados do setor abaixo."
                            : "Preencha os dados para criar um novo setor."}
                    </SheetDescription>
                </SheetHeader>
                <SectorForm
                    sectorToEdit={sectorToEdit}
                    onSuccess={handleSuccess}
                />
            </SheetContent>
        </Sheet>
    );
}
