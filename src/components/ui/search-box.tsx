import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
    value: string;
    onValueChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    inputClassName?: string;
}

export function SearchBox({
    value,
    onValueChange,
    placeholder = "Buscar...",
    className,
    inputClassName,
}: SearchBoxProps) {
    return (
        <div className={cn("relative w-full max-w-sm", className)}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                value={value}
                onChange={(event) => onValueChange(event.target.value)}
                placeholder={placeholder}
                className={cn("pl-9 pr-9", inputClassName)}
            />
            {value ? (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                    onClick={() => onValueChange("")}
                    aria-label="Limpar busca"
                >
                    <X className="h-4 w-4" />
                </Button>
            ) : null}
        </div>
    );
}
