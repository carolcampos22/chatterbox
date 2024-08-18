export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface TokenPayload {
    id: string,
    nickname: string,
    role: USER_ROLES
}

export interface UserDB {
    id: string,
    nickname: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface UserModel {
    id: string,
    nickname: string,
    email: string,
    role: USER_ROLES,
    createdAt: string
}

export class User {
    constructor(
        private id: string,
        private nickname: string,
        private email: string,
        private password: string,
        private role: USER_ROLES,
        private createdAt: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getNickname(): string {
        return this.nickname
    }

    public setNickname(value: string): void {
        this.nickname = value
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(value: string): void {
        this.email = value
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(value: string): void {
        this.password = value
    }

    public getRole(): USER_ROLES {
        return this.role
    }

    public setRole(value: USER_ROLES): void {
        this.role = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public toDBModel(): UserDB {
        return {
            id:this.id,
            nickname: this.nickname,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this.createdAt
        }
    }

    public toBusinessModel(): UserModel {
        return {
            id:this.id,
            nickname: this.nickname,
            email: this.email,
            role: this.role,
            createdAt: this.createdAt
        }
    }
}