export class PaginationService<T> {
    private data: T[];

    constructor(data: T[]) {
        this.data = data;
    }

    paginate(options: {
        page?: number;
        perPage?: number;
        controllerName?: string;
    }) {
        const { page = 1, perPage = 10, controllerName = 'customers' } = options;

        const startIndex = (page - 1) * perPage;
        const endIndex = page * perPage;
        const results = this.data.slice(startIndex, endIndex);

        const info = {
            count: this.data.length,
            pages: Math.ceil(this.data.length / perPage),
            next: page < Math.ceil(this.data.length / perPage) ? `/${controllerName}?page=${page + 1}` : null,
            prev: page > 1 ? `/${controllerName}?page=${page - 1}` : null,
        };

        return { info, results };
    }
}