import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import type { Bag } from "../../../types/entities";
import { BagForm } from "./BagForm";

interface BagSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    bagToEdit: Bag | null;
}

export function BagSheet({ open, onOpenChange, bagToEdit }: BagSheetProps) {
    const handleSuccess = () => {
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[500px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>
                        {bagToEdit ? "Editar Bolsa" : "Nova Bolsa"}
                    </SheetTitle>
                    <SheetDescription>
                        {bagToEdit
                            ? "Edite os dados da bolsa abaixo."
                            : "Preencha os dados para criar uma nova bolsa."}
                    </SheetDescription>
                </SheetHeader>
                <BagForm bagToEdit={bagToEdit} onSuccess={handleSuccess} />
            </SheetContent>
        </Sheet>
    );
}
