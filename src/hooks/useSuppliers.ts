import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as suppliersApi from "@/services/suppliersService";
import { toast } from "sonner";

export const useSuppliers = (query?: string) => {
    const queryClient = useQueryClient();

    const {
        data: suppliers,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["suppliers", query],
        queryFn: () => suppliersApi.getAllSuppliers(query),
    });

    const { mutate: createSupplier, isPending: isCreating } = useMutation({
        mutationFn: suppliersApi.createSupplier,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] });
            toast.success("Fornecedora criada com sucesso!");
        },
        onError: () => {
            toast.error("Erro ao criar fornecedora.");
        },
    });

    const { mutate: updateSupplier, isPending: isUpdating } = useMutation({
        mutationFn: suppliersApi.updateSupplier,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] });
            toast.success("Fornecedora atualizada com sucesso!");
        },
        onError: () => {
            toast.error("Erro ao atualizar fornecedora.");
        },
    });

    const { mutate: deleteSupplier, isPending: isDeleting } = useMutation({
        mutationFn: suppliersApi.deleteSupplier,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["suppliers"] });
            toast.success("Fornecedora removida com sucesso!");
        },
        onError: () => {
            toast.error("Erro ao remover fornecedora.");
        },
    });

    return {
        suppliers,
        isLoadingSuppliers: isLoading,
        isErrorSuppliers: isError,
        errorSuppliers: error,
        createSupplier,
        isCreatingSupplier: isCreating,
        updateSupplier,
        isUpdatingSupplier: isUpdating,
        deleteSupplier,
        isDeletingSupplier: isDeleting,
    };
};
