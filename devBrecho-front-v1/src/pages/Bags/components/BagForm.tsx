import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSectors } from "@/hooks/useSectors";
import { useSuppliers } from "@/hooks/useSuppliers";
import { useBags } from "@/hooks/useBags";
import type { Bag } from "@/types/entities";
import { useEffect, useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const bagFormSchema = z.object({
    fornecedoraId: z.coerce.number().min(1, "Fornecedora é obrigatória"),
    setorId: z.coerce.number().min(1, "Setor é obrigatório"),
    quantidadeDePecasSemCadastro: z.coerce
        .number()
        .min(0, "Quantidade deve ser 0 ou maior"),
    observacoes: z.string().optional(),
    dataMensagem: z.string().optional(),
    codigosDasPecasRaw: z.string().optional(),
});

type BagFormValues = z.infer<typeof bagFormSchema>;

interface BagFormProps {
    bagToEdit?: Bag | null;
    onSuccess: () => void;
}

export function BagForm({ bagToEdit, onSuccess }: BagFormProps) {
    const { sectors } = useSectors();
    const { suppliers } = useSuppliers();
    const { createBag, updateBag, isCreatingBag, isUpdatingBag } = useBags();
    const [openSupplier, setOpenSupplier] = useState(false);
    const [openSector, setOpenSector] = useState(false);

    const form = useForm<BagFormValues>({
        resolver: zodResolver(bagFormSchema),
        defaultValues: {
            fornecedoraId: 0,
            setorId: 0,
            quantidadeDePecasSemCadastro: 0,
            observacoes: "",
            dataMensagem: "",
            codigosDasPecasRaw: "",
        },
    });

    const selectedFornecedoraId = useWatch({
        control: form.control,
        name: "fornecedoraId",
    });

    const selectedSetorId = useWatch({
        control: form.control,
        name: "setorId",
    });

    useEffect(() => {
        if (bagToEdit) {
            form.reset({
                fornecedoraId: bagToEdit.fornecedoraId,
                setorId: bagToEdit.setorId,
                quantidadeDePecasSemCadastro:
                    bagToEdit.quantidadeDePecasSemCadastro,
                observacoes: bagToEdit.observacoes || "",
                dataMensagem: bagToEdit.dataMensagem
                    ? new Date(bagToEdit.dataMensagem)
                          .toISOString()
                          .split("T")[0]
                    : "",
                codigosDasPecasRaw:
                    bagToEdit.pecasCadastradas
                        ?.map((p) => p.codigoDaPeca)
                        .join("\n") || "",
            });
        }
    }, [bagToEdit, form]);

    const onSubmit = (data: BagFormValues) => {
        const codigosDasPecas = data.codigosDasPecasRaw
            ? data.codigosDasPecasRaw
                  .split(/[\n,]+/) // Split by newline or comma
                  .map((c) => c.trim())
                  .filter((c) => c.length > 0)
            : [];

        const payload = {
            fornecedoraId: Number(data.fornecedoraId),
            setorId: Number(data.setorId),
            quantidadeDePecasSemCadastro: Number(
                data.quantidadeDePecasSemCadastro,
            ),
            observacoes: data.observacoes || null,
            dataMensagem: data.dataMensagem
                ? new Date(data.dataMensagem).toISOString()
                : null,
            codigosDasPecas,
        };

        if (bagToEdit) {
            updateBag(
                { id: bagToEdit.bolsaId, dadosAtualizados: payload },
                { onSuccess },
            );
        } else {
            createBag(payload, { onSuccess });
        }
    };

    const isPending = isCreatingBag || isUpdatingBag;

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="space-y-2 flex flex-col">
                <Label>Fornecedora</Label>
                <Popover open={openSupplier} onOpenChange={setOpenSupplier}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openSupplier}
                            className="w-full justify-between"
                        >
                            {selectedFornecedoraId
                                ? suppliers?.find(
                                      (s) =>
                                          s.fornecedoraId ===
                                          selectedFornecedoraId,
                                  )?.nome +
                                  " (" +
                                  suppliers?.find(
                                      (s) =>
                                          s.fornecedoraId ===
                                          selectedFornecedoraId,
                                  )?.codigo +
                                  ")"
                                : "Selecione uma fornecedora..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                        <Command>
                            <CommandInput placeholder="Buscar fornecedora..." />
                            <CommandList>
                                <CommandEmpty>
                                    Nenhuma fornecedora encontrada.
                                </CommandEmpty>
                                <CommandGroup>
                                    {suppliers?.map((supplier) => (
                                        <CommandItem
                                            key={supplier.fornecedoraId}
                                            value={`${supplier.nome} ${supplier.codigo}`}
                                            onSelect={() => {
                                                form.setValue(
                                                    "fornecedoraId",
                                                    supplier.fornecedoraId,
                                                );
                                                setOpenSupplier(false);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedFornecedoraId ===
                                                        supplier.fornecedoraId
                                                        ? "opacity-100"
                                                        : "opacity-0",
                                                )}
                                            />
                                            {supplier.nome} ({supplier.codigo})
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                {form.formState.errors.fornecedoraId && (
                    <p className="text-sm text-red-500">
                        {form.formState.errors.fornecedoraId.message}
                    </p>
                )}
            </div>

            <div className="space-y-2 flex flex-col">
                <Label>Setor</Label>
                <Popover open={openSector} onOpenChange={setOpenSector}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openSector}
                            className="w-full justify-between"
                        >
                            {selectedSetorId
                                ? sectors?.find(
                                      (s) =>
                                          s.setorId === selectedSetorId,
                                  )?.nome
                                : "Selecione um setor..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                        <Command>
                            <CommandInput placeholder="Buscar setor..." />
                            <CommandList>
                                <CommandEmpty>
                                    Nenhum setor encontrado.
                                </CommandEmpty>
                                <CommandGroup>
                                    {sectors?.map((sector) => (
                                        <CommandItem
                                            key={sector.setorId}
                                            value={sector.nome}
                                            onSelect={() => {
                                                form.setValue(
                                                    "setorId",
                                                    sector.setorId,
                                                );
                                                setOpenSector(false);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    selectedSetorId ===
                                                        sector.setorId
                                                        ? "opacity-100"
                                                        : "opacity-0",
                                                )}
                                            />
                                            {sector.nome}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                {form.formState.errors.setorId && (
                    <p className="text-sm text-red-500">
                        {form.formState.errors.setorId.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="quantidadeDePecasSemCadastro">
                    Quantidade de Peças Sem Cadastro
                </Label>
                <Input
                    id="quantidadeDePecasSemCadastro"
                    type="number"
                    min="0"
                    {...form.register("quantidadeDePecasSemCadastro")}
                />
                {form.formState.errors.quantidadeDePecasSemCadastro && (
                    <p className="text-sm text-red-500">
                        {
                            form.formState.errors.quantidadeDePecasSemCadastro
                                .message
                        }
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="dataMensagem">Data da Mensagem</Label>
                <Input
                    id="dataMensagem"
                    type="date"
                    {...form.register("dataMensagem")}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Input id="observacoes" {...form.register("observacoes")} />
                {form.formState.errors.observacoes && (
                    <p className="text-sm text-red-500">
                        {form.formState.errors.observacoes.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="codigosDasPecasRaw">
                    Códigos das Peças (separados por linha ou vírgula)
                </Label>
                <textarea
                    id="codigosDasPecasRaw"
                    className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...form.register("codigosDasPecasRaw")}
                />
                <p className="text-xs text-muted-foreground">
                    Ex: AAA123
                    <br />
                    BBB456
                </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="submit" disabled={isPending}>
                    {isPending
                        ? "Salvando..."
                        : bagToEdit
                          ? "Atualizar Bolsa"
                          : "Criar Bolsa"}
                </Button>
            </div>
        </form>
    );
}
