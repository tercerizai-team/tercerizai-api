import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import request from "supertest"
import app from "../../../app";
import { mockedAddress, mockedClientConfirmedUpdate, mockedProvider, mockedSchedule, mockedUserAdm, mockedUserNotAdm } from "../../mocks";


describe("/users", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /service - deve ser capaz de criar um novo agendamento", async () => {

        const user = await request(app).post("/users").send(mockedUserNotAdm)
        await request(app).post("/users").send(mockedUserAdm)
        const provider = await request(app).post("/providers").send(mockedProvider)
        const userLogin = await request(app).post("/login").send(mockedUserNotAdm)
        const userAdmLogin = await request(app).post("/login").send(mockedUserAdm)
        const addressInfo = await request(app).post("/address").set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedAddress)
        mockedSchedule.providerId = provider.body.id
        mockedSchedule.addressId = addressInfo.body.id
        const scheduleInfo = await request(app).post("/schedule").set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedSchedule)
        await request(app).patch(`/schedule/${scheduleInfo.body.id}`).set("Authorization", `Bearer ${userAdmLogin.body.token}`).send(mockedClientConfirmedUpdate)
        const response = await request(app).post("/service").set("Authorization", `Bearer ${userLogin.body.token}`).send(scheduleInfo.body.id)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")

    })

    test("POST /service - não deve ser capaz de criar um novo serviço com id inválido", async () => {

        const userLogin = await request(app).post("/login").send(mockedUserNotAdm)
        await request(app).post("/login").send(mockedUserAdm)
        const response = await request(app).post("/service").set("Authorization", `Bearer ${userLogin.body.token}`).send({scheduleId: "123"})

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")

    })

    test("GET /service - deve ser capaz de listar todos serviços de um usuário", async () => {

        const userLogin = await request(app).post("/login").send(mockedUserNotAdm)
        await request(app).post("/login").send(mockedUserAdm)
        const response = await request(app).get("/service").set("Authorization", `Bearer ${userLogin.body.token}`)
        console.log(response.body)

        expect(response.status).toBe(200)

    })

    test("GET /service - não deveria ser capaz de listar serviços sem um token", async () => {

        const userLogin = await request(app).post("/login").send(mockedUserNotAdm)
        await request(app).post("/login").send(mockedUserAdm)
        const response = await request(app).get("/service")

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")

    })




})