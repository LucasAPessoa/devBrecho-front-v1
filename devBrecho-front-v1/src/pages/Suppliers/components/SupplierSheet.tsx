import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { type Supplier } from "@/types/entities";
import { SupplierForm } from "./SupplierForm";

interface SupplierSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    supplierToEdit: Supplier | null;
}

export function SupplierSheet({
    open,
    onOpenChange,
    supplierToEdit,
}: SupplierSheetProps) {
    const handleSuccess = () => {
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[500px]">
                <SheetHeader>
                    <SheetTitle>
                        {supplierToEdit
                            ? "Editar Fornecedora"
                            : "Nova Fornecedora"}
                    </SheetTitle>
                    <SheetDescription>
                        {supplierToEdit
                            ? "Edite os dados da fornecedora abaixo."
                            : "Preencha os dados para criar uma nova fornecedora."}
                    </SheetDescription>
                </SheetHeader>
                <SupplierForm
                    supplierToEdit={supplierToEdit}
                    onSuccess={handleSuccess}
                />
            </SheetContent>
        </Sheet>
    );
}
