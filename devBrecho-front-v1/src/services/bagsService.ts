import { api } from "../lib/api";
import type { Bag } from "../types/entities";

export type BagFormData = {
    quantidadeDePecasSemCadastro: number;
    observacoes?: string | null;
    fornecedoraId: number;
    setorId: number;
    codigosDasPecas?: string[];
    dataMensagem: string | null;
    statusDevolvida?: boolean;
    statusDoada?: boolean;
};

export const createBag = async (newBag: BagFormData): Promise<Bag> => {
    const { data } = await api.post<Bag>("/bolsas", newBag);
    return data;
};

export const getAllBags = async (query?: string): Promise<Bag[]> => {
    const { data } = await api.get<Bag[]>("/bolsas", {
        params: { query },
    });
    return data;
};

export const syncPecas = async ({
    bolsaId,
    codigosDasPecas,
}: {
    bolsaId: number;
    codigosDasPecas: string[];
}): Promise<void> => {
    await api.put(`/bolsas/${bolsaId}/pecas`, { codigosDasPecas });
};

export const setStatusBag = async ({
    bolsaId,
    payload,
}: {
    bolsaId: number;
    payload: { statusDevolvida: boolean; statusDoada: boolean };
}): Promise<void> => {
    await api.patch(`/bolsas/${bolsaId}/status`, payload);
};

export const updateBag = async ({
    id,
    dadosAtualizados,
}: {
    id: number;
    dadosAtualizados: BagFormData;
}): Promise<Bag> => {
    const { data } = await api.put(`/bolsas/${id}`, dadosAtualizados);
    return data;
};

export const deleteBag = async (id: number): Promise<void> => {
    await api.delete(`/bolsas/${id}`);
};

export const getDoadaEDevolvidaBags = async (
    fornecedoraId: number,
): Promise<Bag[]> => {
    const { data } = await api.get<Bag[]>(
        `/bolsas/doadasEDevolvidas/${fornecedoraId}`,
    );
    return data;
};

export const searchBags = async (query: string): Promise<Bag[]> => {
    const { data } = await api.get<Bag[]>("/bolsas/search/", {
        params: { query },
    });
    return data;
};

export const getBagGroupedByDataMensagem = async (): Promise<
    {
        date: string;
        bags: Bag[];
    }[]
> => {
    const { data } = await api.get<
        {
            date: string;
            bags: Bag[];
        }[]
    >("/bolsas/groupedByDataMensagem");
    return data;
};
