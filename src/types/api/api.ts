// src/types/api/api.ts
interface ApiResponse<T = any> {
    code?: number;
    message?: string;
    data?: T;
}

interface User {
    id?: number;
    name?: string;
    email?: string;
}