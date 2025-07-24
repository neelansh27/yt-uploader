interface aiSuccessResponse {
    description: string,
    tags: string[],
    keywords: string[],
}

interface aiFailResponse {
    error: string
}
export type ModelResponse = aiSuccessResponse | aiFailResponse;
