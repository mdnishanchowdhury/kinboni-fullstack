const statusValues = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
type OrderStatus = typeof statusValues[number];

export interface IOrderQueryParams {
    [key: string]: any;
    status?: OrderStatus;
    searchTerm?: string;
    page?: string | number;
    limit?: string | number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface OrderListPanelProps {
    orders: any[];
    meta: any;
    page: number;
    setPage: (updater: number | ((p: number) => number)) => void;
    searchInput: string;
    setSearchInput: (value: string) => void;
    onSearch: () => void;
    status: string;
    setStatus: (value: string) => void;
    selectedOrderId?: string;
    isLoading: boolean;
    onSelectOrder: (orderId: string) => void;
}

export interface OrderDetailPanelProps {
    order: any;
    onBack: () => void;
    onAccept: () => void;
    onReject: () => void;
    isAccepting: boolean;
    isRejecting: boolean;
    updateError: string | null;
}

export interface OrderHeaderProps {
    order: any;
    onBack: () => void;
    onAccept: () => void;
    onReject: () => void;
    isAccepting: boolean;
    isRejecting: boolean;
    canAccept: boolean;
    acceptLabel: string;
    updateError: string | null;
}
