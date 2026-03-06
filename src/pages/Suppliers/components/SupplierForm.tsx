import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Supplier } from "@/types/entities";
import { useSuppliers } from "@/hooks/useSuppliers";
import { useEffect } from "react";

const supplierFormSchema = z.object({
    codigo: z.string().min(1, "O código é obrigatório").max(50),
    nome: z.string().min(1, "O nome é obrigatório").max(100),
    telefone: z.string().max(20).optional().nullable(),
});

type SupplierFormValues = z.infer<typeof supplierFormSchema>;

interface SupplierFormProps {
    supplierToEdit?: Supplier | null;
    onSuccess: () => void;
}

export function SupplierForm({ supplierToEdit, onSuccess }: SupplierFormProps) {
    const {
        createSupplier,
        updateSupplier,
        isCreatingSupplier,
        isUpdatingSupplier,
    } = useSuppliers();

    const form = useForm<SupplierFormValues>({
        resolver: zodResolver(supplierFormSchema),
        defaultValues: {
            codigo: "",
            nome: "",
            telefone: "",
        },
    });

    useEffect(() => {
        if (supplierToEdit) {
            form.reset({
                codigo: supplierToEdit.codigo,
                nome: supplierToEdit.nome,
                telefone: supplierToEdit.telefone || "",
            });
        } else {
            form.reset({
                codigo: "",
                nome: "",
                telefone: "",
            });
        }
    }, [supplierToEdit, form]);

    const onSubmit = (data: SupplierFormValues) => {
        if (supplierToEdit) {
            updateSupplier(
                { id: supplierToEdit.fornecedoraId, data },
                { onSuccess },
            );
        } else {
            createSupplier(data, { onSuccess });
        }
    };

    const isPending = isCreatingSupplier || isUpdatingSupplier;

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="codigo">Código</Label>
                <Input id="codigo" {...form.register("codigo")} />
                {form.formState.errors.codigo && (
                    <p className="text-sm text-red-500">
                        {form.formState.errors.codigo.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" {...form.register("nome")} />
                {form.formState.errors.nome && (
                    <p className="text-sm text-red-500">
                        {form.formState.errors.nome.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input id="telefone" {...form.register("telefone")} />
                {form.formState.errors.telefone && (
                    <p className="text-sm text-red-500">
                        {form.formState.errors.telefone.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="submit" disabled={isPending}>
                    {isPending
                        ? "Salvando..."
                        : supplierToEdit
                          ? "Atualizar Fornecedora"
                          : "Criar Fornecedora"}
                </Button>
            </div>
        </form>
    );
}
