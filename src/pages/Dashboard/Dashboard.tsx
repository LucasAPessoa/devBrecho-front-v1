import { useBags } from "@/hooks/useBags";
import { useMemo } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function Dashboard() {
    const { bags, isLoadingBags } = useBags();

    const chartData = useMemo(() => {
        if (!bags) return [];

        const sectorMap = new Map<string, number>();

        bags.forEach((bag) => {
            const sectorName = bag.setor?.nome || "Sem Setor";
            const pecasCadastradasCount = bag.pecasCadastradas?.length || 0;
            const totalItems =
                pecasCadastradasCount + bag.quantidadeDePecasSemCadastro;

            const currentTotal = sectorMap.get(sectorName) || 0;
            sectorMap.set(sectorName, currentTotal + totalItems);
        });

        return Array.from(sectorMap.entries())
            .map(([name, value]) => ({
                name,
                value,
            }))
            .sort((a, b) => b.value - a.value); // Sort descending
    }, [bags]);

    const maxValue = useMemo(() => {
        return Math.max(...chartData.map((d) => d.value), 0);
    }, [chartData]);

    if (isLoadingBags) {
        return <div>Carregando dashboard...</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Volume por Setor</CardTitle>
                        <CardDescription>
                            Total de peças (Cadastradas + Sem Cadastro)
                            agrupadas por Setor
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="flex h-[350px] items-end gap-2 px-4 pb-6">
                            {chartData.length > 0 ? (
                                chartData.map((item) => {
                                    const heightPercentage =
                                        maxValue > 0
                                            ? (item.value / maxValue) * 100
                                            : 0;
                                    return (
                                        <div
                                            key={item.name}
                                            className="group relative flex h-full flex-1 flex-col justify-end"
                                        >
                                            <div
                                                className="relative w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                                                style={{
                                                    height: `${heightPercentage}%`,
                                                }}
                                            >
                                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-primary px-2 py-1 text-xs text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                                                    {item.value}
                                                </div>
                                            </div>
                                            <span
                                                className="mt-2 w-full truncate text-center text-xs text-muted-foreground"
                                                title={item.name}
                                            >
                                                {item.name}
                                            </span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex w-full items-center justify-center text-muted-foreground">
                                    Sem dados para exibir
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
