import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as bolsasApi from "@/services/bagsService";
import { toast } from "sonner";

export const useBags = (query?: string) => {
    const queryClient = useQueryClient();

    const {
        data: bags,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["bags", query],
        queryFn: () => bolsasApi.getAllBags(query || ""),
    });

    const { mutate: createBag, isPending: isCreatingBag } = useMutation({
        mutationFn: bolsasApi.createBag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bags"] });
            toast.success("Bolsa criada com sucesso!");
        },
        onError: () => {
            toast.error("Erro ao criar bolsa.");
        },
    });

    const { mutate: deleteBag, isPending: isDeletingBag } = useMutation({
        mutationFn: bolsasApi.deleteBag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bags"] });
            toast.success("Bolsa removida com sucesso!");
        },
        onError: () => {
            toast.error("Erro ao remover bolsa.");
        },
    });

    const { mutate: updateBag, isPending: isUpdatingBag } = useMutation({
        mutationFn: bolsasApi.updateBag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bags"] });
            toast.success("Bolsa atualizada com sucesso!");
        },
        onError: () => {
            toast.error("Erro ao atualizar bolsa.");
        },
    });

    const { mutate: setStatusBag, isPending: isChangingStatus } = useMutation({
        mutationFn: bolsasApi.setStatusBag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bags"] });
        },
        onError: () => {
            toast.error("Erro ao atualizar status da bolsa.");
        },
    });

    const { mutate: archiveBag, isPending: isArchivingBag } = useMutation({
        mutationFn: bolsasApi.archiveBag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bags"] });
            toast.success("Bolsa arquivada com sucesso!");
        },
        onError: () => {
            toast.error("Erro ao arquivar bolsa.");
        },
    });

    const { mutate: unarchiveBag, isPending: isUnarchivingBag } = useMutation({
        mutationFn: bolsasApi.unarchiveBag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bags"] });
            toast.success("Bolsa desarquivada com sucesso!");
        },
        onError: () => {
            toast.error("Erro ao desarquivar bolsa.");
        },
    });

    const {
        mutateAsync: getArchivedBagsBySupplier,
        isPending: isGettingArchivedBags,
    } = useMutation({
        mutationFn: bolsasApi.getArchivedBagsBySupplier,
    });

    const {
        mutateAsync: getBagGroupedByDataMensagem,
        isPending: isGettingBagGroupedByDataMensagem,
    } = useMutation({
        mutationFn: bolsasApi.getBagGroupedByDataMensagem,
    });

    return {
        bags,
        isLoadingBags: isLoading,
        isErrorBags: isError,
        errorBags: error,

        createBag,
        isCreatingBag,
        deleteBag,
        isDeletingBag,
        updateBag,
        isUpdatingBag,
        setStatusBag,
        isChangingStatusBag: isChangingStatus,
        getDoadaEDevolvidaBags,
        isGettingDoadasEDevolvidas,
        getBagGroupedByDataMensagem,
        isGettingBagGroupedByDataMensagem,
    };
};
