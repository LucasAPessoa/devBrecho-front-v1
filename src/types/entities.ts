export type Role = "USER" | "ADMIN" | "MANAGER";

export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
    email: string;
    role: Role;
    createdAt: string; // ISO Date string
    updatedAt?: string | null;
    managerId?: string | null;
}

export interface Sector {
    setorId: number;
    nome: string;
}

export interface Supplier {
    fornecedoraId: number;
    codigo: string;
    nome: string;
    telefone?: string | null;
}

export interface RegisteredItem {
    pecaCadastradaId: number;
    codigoDaPeca: string;
    bolsaId: number;
}

export interface Bag {
    bolsaId: number;
    dataDeEntrada: string; // ISO Date string
    dataMensagem?: string | null; // ISO Date string
    quantidadeDePecasSemCadastro: number;
    observacoes?: string | null;
    statusDevolvida?: boolean | null;
    statusDoada?: boolean | null;
    isArchived?: boolean | null;
    updatedAt?: string | null;

    fornecedoraId: number;
    setorId: number;
    userId?: string | null;

    // Relations
    fornecedora?: Supplier;
    setor?: Sector;
    pecasCadastradas?: RegisteredItem[];
    user?: User | null;
}
