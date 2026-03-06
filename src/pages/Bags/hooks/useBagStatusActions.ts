import { toast } from "sonner";
import type { Bag } from "@/types/entities";

interface SetBagStatusPayload {
    bolsaId: number;
    payload: {
        statusDevolvida: boolean;
        statusDoada: boolean;
    };
}

interface UseBagStatusActionsParams {
    setStatusBag: (payload: SetBagStatusPayload) => void;
}

export function useBagStatusActions({
    setStatusBag,
}: UseBagStatusActionsParams) {
    const handleStatusChange = (bag: Bag, status: "devolvida" | "doada") => {
        const payload = {
            statusDevolvida: bag.statusDevolvida ?? false,
            statusDoada: bag.statusDoada ?? false,
        };

        if (status === "devolvida") {
            payload.statusDevolvida = !bag.statusDevolvida;
            if (payload.statusDevolvida) payload.statusDoada = false;
        } else {
            payload.statusDoada = !bag.statusDoada;
            if (payload.statusDoada) payload.statusDevolvida = false;
        }

        setStatusBag({
            bolsaId: bag.bolsaId,
            payload,
        });

        toast.success(`Status atualizado para Bolsa ${bag.bolsaId}`);
    };

    return {
        handleStatusChange,
    };
}
