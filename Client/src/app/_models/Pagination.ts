export interface Pagination {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
}

export class PaginatedResult<T> {
    result?: T;
    pagination?: Pagination;
}