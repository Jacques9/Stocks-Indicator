export class ApiResponse<T> {
    constructor(public success: boolean, public data: T | null, public errors: string[] | null) {}
}

export class ApiError extends Error {
    public readonly apiResponse: ApiResponse<any>;

    constructor(apiResponse: ApiResponse<any>) {
        super(apiResponse.errors?.join(', ') || 'ApiError');
        this.apiResponse = apiResponse;
    }
}