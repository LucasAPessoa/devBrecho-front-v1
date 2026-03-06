import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Sector } from "@/types/entities";
import { useSectors } from "@/hooks/useSectors";
import { useEffect } from "react";

const sectorFormSchema = z.object({
    nome: z
        .string()
        .min(1, "O nome é obrigatório")
        .max(10, "Máximo de 10 caracteres"),
});

type SectorFormValues = z.infer<typeof sectorFormSchema>;

interface SectorFormProps {
    sectorToEdit?: Sector | null;
    onSuccess: () => void;
}

export function SectorForm({ sectorToEdit, onSuccess }: SectorFormProps) {
    const { createSector, updateSector, isCreatingSector, isUpdatingSector } =
        useSectors();

    const form = useForm<SectorFormValues>({
        resolver: zodResolver(sectorFormSchema),
        defaultValues: {
            nome: "",
        },
    });

    useEffect(() => {
        if (sectorToEdit) {
            form.reset({
                nome: sectorToEdit.nome,
            });
        } else {
            form.reset({
                nome: "",
            });
        }
    }, [sectorToEdit, form]);

    const onSubmit = (data: SectorFormValues) => {
        if (sectorToEdit) {
            updateSector({ id: sectorToEdit.setorId, data }, { onSuccess });
        } else {
            createSector(data, { onSuccess });
        }
    };

    const isPending = isCreatingSector || isUpdatingSector;

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" {...form.register("nome")} />
                {form.formState.errors.nome && (
                    <p className="text-sm text-red-500">
                        {form.formState.errors.nome.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="submit" disabled={isPending}>
                    {isPending
                        ? "Salvando..."
                        : sectorToEdit
                          ? "Atualizar Setor"
                          : "Criar Setor"}
                </Button>
            </div>
        </form>
    );
}
