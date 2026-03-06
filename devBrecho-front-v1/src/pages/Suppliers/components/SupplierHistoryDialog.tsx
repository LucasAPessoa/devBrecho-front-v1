import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useBags } from "@/hooks/useBags";
import type { Supplier, Bag } from "@/types/entities";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

// Helper for date formatting using native API
const formatDate = (dateString?: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

interface SupplierHistoryDialogProps {
    supplier: Supplier | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SupplierHistoryDialog({
    supplier,
    open,
    onOpenChange,
}: SupplierHistoryDialogProps) {
    const { getArchivedBagsBySupplier, isGettingArchivedBags, unarchiveBag } =
        useBags();
    const [historyBags, setHistoryBags] = useState<Bag[]>([]);
    const [unarchivingId, setUnarchivingId] = useState<number | null>(null);

    useEffect(() => {
        if (open && supplier) {
            getArchivedBagsBySupplier(supplier.fornecedoraId)
                .then((data) => {
                    setHistoryBags(data);
                })
                .catch(console.error);
        }
    }, [open, supplier, getArchivedBagsBySupplier]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        Histórico de Bolsas (Doadas/Devolvidas)
                    </DialogTitle>
                    <DialogDescription>
                        Visualizando histórico para:
                    </DialogDescription>
                    {supplier && (
                        <div className="mt-2 p-4 bg-muted rounded-md flex flex-col gap-1">
                            <h3 className="font-bold text-lg">
                                {supplier.nome}{" "}
                                <span className="text-muted-foreground text-sm font-normal">
                                    ({supplier.codigo})
                                </span>
                            </h3>
                            <p className="text-sm">
                                Telefone: {supplier.telefone || "N/A"}
                            </p>
                        </div>
                    )}
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    {isGettingArchivedBags ? (
                        <p className="text-center py-4">
                            Carregando bolsas arquivadas...
                        </p>
                    ) : historyBags.length === 0 ? (
                        <p className="text-center py-4 text-muted-foreground">
                            Nenhuma bolsa arquivada encontrada.
                        </p>
                    ) : (
                        <div className="grid gap-4">
                            {historyBags.map((bag) => (
                                <div
                                    key={bag.bolsaId}
                                    className="border rounded-lg p-4 bg-card text-card-foreground shadow-sm"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="text-sm text-muted-foreground">
                                            Atualizado em:{" "}
                                            {formatDate(bag.updatedAt)}
                                        </div>
                                        <div className="flex gap-2">
                                            {bag.statusDoada && (
                                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                    Doada
                                                </span>
                                            )}
                                            {bag.statusDevolvida && (
                                                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                                                    Devolvida
                                                </span>
                                            )}
                                            {bag.isArchived && (
                                                <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                                                    Arquivada
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {bag.isArchived && (
                                        <div className="mb-4 flex justify-end">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                disabled={
                                                    unarchivingId ===
                                                    bag.bolsaId
                                                }
                                                onClick={() => {
                                                    setUnarchivingId(
                                                        bag.bolsaId,
                                                    );
                                                    unarchiveBag(bag.bolsaId, {
                                                        onSuccess: () => {
                                                            setHistoryBags(
                                                                (prev) =>
                                                                    prev.filter(
                                                                        (
                                                                            item,
                                                                        ) =>
                                                                            item.bolsaId !==
                                                                            bag.bolsaId,
                                                                    ),
                                                            );
                                                            toast.success(
                                                                "Bolsa desarquivada com sucesso!",
                                                            );
                                                        },
                                                        onError: (error) => {
                                                            const message =
                                                                (
                                                                    error as {
                                                                        response?: {
                                                                            data?: {
                                                                                message?: string;
                                                                            };
                                                                        };
                                                                        message?: string;
                                                                    }
                                                                )?.response
                                                                    ?.data
                                                                    ?.message ||
                                                                (error as Error)
                                                                    ?.message ||
                                                                "Erro ao desarquivar bolsa.";
                                                            toast.error(
                                                                message,
                                                            );
                                                        },
                                                        onSettled: () => {
                                                            setUnarchivingId(
                                                                null,
                                                            );
                                                        },
                                                    });
                                                }}
                                            >
                                                {unarchivingId ===
                                                bag.bolsaId ? (
                                                    <span className="flex items-center gap-2">
                                                        <Spinner className="size-4" />
                                                        Desarquivando...
                                                    </span>
                                                ) : (
                                                    "Desarquivar bolsa"
                                                )}
                                            </Button>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-semibold text-sm mb-1">
                                                Peças Sem Cadastro
                                            </h4>
                                            <p className="text-2xl font-bold">
                                                {
                                                    bag.quantidadeDePecasSemCadastro
                                                }
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm mb-1">
                                                Peças Cadastradas (
                                                {bag.pecasCadastradas?.length ||
                                                    0}
                                                )
                                            </h4>
                                            {bag.pecasCadastradas &&
                                            bag.pecasCadastradas.length > 0 ? (
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {bag.pecasCadastradas.map(
                                                        (peca) => (
                                                            <span
                                                                key={
                                                                    peca.pecaCadastradaId
                                                                }
                                                                className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-xs"
                                                            >
                                                                {
                                                                    peca.codigoDaPeca
                                                                }
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-muted-foreground">
                                                    -
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
