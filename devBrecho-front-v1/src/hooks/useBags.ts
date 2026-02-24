import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import * as bolsasApi from "@/services/bagsService";

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

    const { mutate: createBag, isPending: isCreating } = useMutation({
        mutationFn: bolsasApi.createBag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bags"] });
        },
    });

    const { mutate: deleteBag, isPending: isDeleting } = useMutation({
        mutationFn: bolsasApi.deleteBag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bags"] });
        },
    });

    const { mutate: updateBag, isPending: isUpdating } = useMutation({
        mutationFn: bolsasApi.updateBag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bags"] });
        },
    });

    const { mutate: setStatusBag, isPending: isChangingStatus } = useMutation({
        mutationFn: bolsasApi.setStatusBag,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bags"] });
        },
    });

    const {
        mutateAsync: getDoadaEDevolvidaBags,
        isPending: isGettingDoadasEDevolvidas,
    } = useMutation({
        mutationFn: bolsasApi.getDoadaEDevolvidaBags,
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
        isCreatingBag: isCreating,
        deleteBag,
        isDeletingBag: isDeleting,
        updateBag,
        isUpdatingBag: isUpdating,
        setStatusBag,
        isChangingStatusBag: isChangingStatus,
        getDoadaEDevolvidaBags,
        isGettingDoadasEDevolvidas,
        getBagGroupedByDataMensagem,
        isGettingBagGroupedByDataMensagem,
    };
};
