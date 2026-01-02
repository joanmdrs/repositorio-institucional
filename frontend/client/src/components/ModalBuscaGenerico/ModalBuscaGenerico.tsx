import { Modal, Table, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

interface ModalBuscaProps<T> {
    open: boolean;
    title: string;
    columns: ColumnsType<T>;
    fetchData: (params: {
        search?: string;
        page?: number;
    }) => Promise<{
        results: T[];
        count: number;
    }>;
    onSelect: (record: T) => void;
    onCancel: () => void;
    rowKey: keyof T;
}

function ModalBuscaGenerico<T extends object>({
    open,
    title,
    columns,
    fetchData,
    onSelect,
    onCancel,
    rowKey,
}: ModalBuscaProps<T>) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetchData({ search, page });
            setData(res.results);
            setTotal(res.count);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) loadData();
    }, [open, search, page]);

    return (
        <Modal
        open={open}
        title={title}
        onCancel={onCancel}
        footer={null}
        width={800}
        destroyOnHidden
        >
        <Input.Search
            placeholder="Buscar..."
            allowClear
            onSearch={(value) => {
            setSearch(value);
            setPage(1);
            }}
            style={{ marginBottom: 16 }}
        />

        <Table
            rowKey={(record) => String(record[rowKey])}
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={{
                current: page,
                total,
                onChange: (p) => setPage(p),
            }}
            onRow={(record) => ({
                onClick: () => onSelect(record),
            })}
        />
        </Modal>
    );
}

export default ModalBuscaGenerico;
