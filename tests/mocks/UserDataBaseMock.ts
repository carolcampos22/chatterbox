import { USER_ROLES, UserDB } from "../../src/models/User";
import { BaseDatabase } from "../../src/database/BaseDatabase";

const usersMock: UserDB[] = [
    {
        id: "id-mock-fulano",
        nickname: "Fulano",
        email: "fulano@email.com",
        password: "hash-mock-fulano", //senha fulano123
        role: USER_ROLES.NORMAL,
        created_at: new Date().toISOString()
    },
    {
        id: "id-mock-beltrano",
        nickname: "Beltrano",
        email: "beltrano@email.com",
        password: "hash-mock-beltrano", //senha beltrano123
        role: USER_ROLES.ADMIN,
        created_at: new Date().toISOString()
    }
]


export class UserDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "users";

    public insertUser = async (userDB: UserDB): Promise<void> => {
        
        //usersMock.push(userDB);
    }

    public findUserByEmail = async (email: string): Promise<UserDB | undefined> => {
        
        const userDB = usersMock.find((user) => user.email === email);
        return userDB;
    }
}

