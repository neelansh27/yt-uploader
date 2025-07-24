interface aiSuccessResponse {
    description: string,
    title: string,
    tags: string[],
}

interface aiFailResponse {
    error: string
}
export type ModelResponse = aiSuccessResponse | aiFailResponse;
