import { api } from "../lib/api";
import type { Supplier } from "../types/entities";

export type SupplierFormData = {
    codigo: string;
    nome: string;
    telefone?: string | null;
};

export const getAllSuppliers = async (query?: string): Promise<Supplier[]> => {
    const params = query ? { query } : {};
    const { data } = await api.get<Supplier[]>("/fornecedoras", {
        params,
    });
    return data;
};

export const createSupplier = async (
    data: SupplierFormData,
): Promise<Supplier> => {
    const response = await api.post<Supplier>("/fornecedoras", data);
    return response.data;
};

export const updateSupplier = async ({
    id,
    data,
}: {
    id: number;
    data: SupplierFormData;
}): Promise<Supplier> => {
    const response = await api.put<Supplier>(`/fornecedoras/${id}`, {
        ...data,
        fornecedoraId: id,
    });
    return response.data;
};

export const deleteSupplier = async (id: number): Promise<void> => {
    await api.delete(`/fornecedoras/${id}`);
};
