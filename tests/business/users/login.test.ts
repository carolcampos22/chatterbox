import {UserBusiness} from "../../../src/business/UserBusiness"
import { LoginSchema } from "../../../src/dtos/user/login.dto"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDataBaseMock"

describe("Teste de login", () => {
    const usersBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("deve gerar um token ao logar um usuário", async () => {
        const input = LoginSchema.parse({
            email: "fulano@email.com",
            password: "fulano123"
        })

        const output = await usersBusiness.login(input)

        expect(output).toEqual({
            token: "token-mock-fulano"
        })
    })
})