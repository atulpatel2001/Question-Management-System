//User Model
export interface User {
    userId: number;
    username: string;
    password: string;
    name?: string; 
    role: string;
    createdAt: string; 
    updatedAt: string;
}