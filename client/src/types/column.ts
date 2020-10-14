export interface Column {
    path: string;
    label: string;
    content?: (data: any, index: number) => JSX.Element | string | null;
    sortable?: boolean;
    defaultOrder?: 'asc' | 'desc';
    key?: string;
}

export interface SortColumn {
    path: string;
    order: 'asc' | 'desc';
}
