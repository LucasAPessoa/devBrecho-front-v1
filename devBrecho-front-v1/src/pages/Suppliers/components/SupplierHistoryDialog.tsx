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
    const { getDoadaEDevolvidaBags, isGettingDoadasEDevolvidas } = useBags();
    const [historyBags, setHistoryBags] = useState<Bag[]>([]);

    useEffect(() => {
        if (open && supplier) {
            getDoadaEDevolvidaBags(supplier.fornecedoraId)
                .then((data) => {
                    setHistoryBags(data);
                })
                .catch(console.error);
        }
    }, [open, supplier, getDoadaEDevolvidaBags]);

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
                    {isGettingDoadasEDevolvidas ? (
                        <p className="text-center py-4">
                            Carregando histórico...
                        </p>
                    ) : historyBags.length === 0 ? (
                        <p className="text-center py-4 text-muted-foreground">
                            Nenhuma bolsa encontrada no histórico.
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
                                        </div>
                                    </div>

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
