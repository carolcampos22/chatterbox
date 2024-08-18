import {UserBusiness} from "../../../src/business/UserBusiness"
import { SignupSchema } from "../../../src/dtos/user/signup.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDataBaseMock"

describe("Teste de signup", () => {
    const usersBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("deve gerar um token ao cadastrar novo usuário", async () => {
        const input = SignupSchema.parse({
            nickname: "@ciclano",
            email: "ciclano@email.com",
            password: "ciclano123"
        })

        const output = await usersBusiness.signup(input)

        expect(output).toEqual({
            token: "token-mock"
        })
    })

    test("deve disparar erro caso o email já esteja cadastrado", async () => {
        expect.assertions(2)
        try {
            const input = SignupSchema.parse({
                nickname: "Fulano",
                email: "fulano@email.com",
                password: "fulano123"
            })

            const output = await usersBusiness.signup(input)
        } catch (error) {
            if (error instanceof BadRequestError){
                expect(error.message).toBe("E-mail já cadastrado")
                expect(error.statusCode).toBe(400)
            }
        }
    })
})