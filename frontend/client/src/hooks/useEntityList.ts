import { useEffect, useState } from "react";
import { message } from "antd";
import type { AxiosResponse } from "axios";

interface ApiListResponse<T> {
    results?: T[];
    data?: T[];
}

interface UseEntityListProps<T> {
    fetchAll: (params?: any) => Promise<AxiosResponse<ApiListResponse<T>>>;
    deleteById?: (id: number) => Promise<AxiosResponse<any>>;
    initialParams?: any;
}

export function useEntityList<T>({
    fetchAll,
    deleteById,
    initialParams,
}: UseEntityListProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState(initialParams);

    const loadData = async (customParams?: any) => {
        try {
            setLoading(true);

            const response = await fetchAll(customParams ?? params);

            // DRF pagination OU lista simples
            const list =
                response.data?.results ??
                response.data?.data ??
                [];

            setData(list);
        } catch (error) {
            console.error(error);
            message.error("Erro ao carregar dados");
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!deleteById) return;

        try {
            await deleteById(id);
            message.success("Registro excluído com sucesso");
            setData((prev: any[]) => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error(error);
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
        setParams,
    };
}
