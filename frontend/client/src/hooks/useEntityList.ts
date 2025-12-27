import { useEffect, useState } from "react";
import { message } from "antd";
import type { AutorInterface } from "../interfaces/AutorInterface";

interface UseEntityListProps<T> {
    fetchAll: () => Promise<{ data: T[] }>;
    deleteById?: (id: number) => Promise<{data: T[]}>;
}

export function useEntityList<T>({
    fetchAll,
    deleteById,
}: UseEntityListProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true);
            const response = await fetchAll();
            setData(response.data);
        } catch {
            message.error("Erro ao carregar dados");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!deleteById) return;

        try {
            await deleteById(id);
            message.success("Registro excluído com sucesso");
            setData((prev) => prev.filter((item: any) => item.id !== id));
        } catch {
            message.error("Erro ao excluir registro");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return {
        data,
        loading,
        reload: loadData,
        handleDelete,
    };
}
