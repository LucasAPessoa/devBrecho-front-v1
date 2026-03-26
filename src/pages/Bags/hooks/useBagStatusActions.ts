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
    const handleStatusChange = (
        bag: Bag,
        statusDoada: boolean,
        statusDevolvida: boolean,
    ) => {
        const payload = {
            statusDoada,
            statusDevolvida,
        };

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
