import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as sectorsApi from "@/services/sectorsService";
import { toast } from "sonner";

export const useSectors = () => {
    const queryClient = useQueryClient();

    const {
        data: sectors,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["sectors"],
        queryFn: sectorsApi.getAllSectors,
    });

    const { mutate: createSector, isPending: isCreating } = useMutation({
        mutationFn: sectorsApi.createSector,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sectors"] });
            toast.success("Setor criado com sucesso!");
        },
        onError: () => {
            toast.error("Erro ao criar setor.");
        },
    });

    const { mutate: updateSector, isPending: isUpdating } = useMutation({
        mutationFn: sectorsApi.updateSector,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sectors"] });
            toast.success("Setor atualizado com sucesso!");
        },
        onError: () => {
            toast.error("Erro ao atualizar setor.");
        },
    });

    const { mutate: deleteSector, isPending: isDeleting } = useMutation({
        mutationFn: sectorsApi.deleteSector,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sectors"] });
            toast.success("Setor removido com sucesso!");
        },
        onError: () => {
            toast.error("Erro ao remover setor.");
        },
    });

    return {
        sectors,
        isLoadingSectors: isLoading,
        isErrorSectors: isError,
        errorSectors: error,
        createSector,
        isCreatingSector: isCreating,
        updateSector,
        isUpdatingSector: isUpdating,
        deleteSector,
        isDeletingSector: isDeleting,
    };
};
