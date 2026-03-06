import { api } from "../lib/api";
import type { Sector } from "../types/entities";

export type SectorFormData = {
    nome: string;
};

export const getAllSectors = async (): Promise<Sector[]> => {
    const { data } = await api.get<Sector[]>("/setores");
    return data;
};

export const createSector = async (data: SectorFormData): Promise<Sector> => {
    const response = await api.post<Sector>("/setores", data);
    return response.data;
};

// The backend expects setorId in the body for update, matching SetorUpdateType
export const updateSector = async ({
    id,
    data,
}: {
    id: number;
    data: SectorFormData;
}): Promise<Sector> => {
    const response = await api.put<Sector>(`/setores/${id}`, {
        setorId: id,
        ...data,
    });
    return response.data;
};

export const deleteSector = async (id: number): Promise<void> => {
    await api.delete(`/setores/${id}`);
};
