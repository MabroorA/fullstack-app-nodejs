import request from "supertest";
import app from "../src/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// temporary as a mock db is not being used(i understand this should not be used in production ofcourse)
beforeAll(async () => {
    await prisma.user.deleteMany({});
  });
afterAll(async () => {
await prisma.$disconnect();
});

describe("RegisterUser", () => {
  it("successfully registers when all fields are valid", async () => {
    // DATABASE TESTS
    // save the username and password in database
    // should respond with a json object of the user saved
    // (This is not how the the test should be done
    // as this actually creates a user in the data base
    // instead a mock database should be created however due to time limitations
    // i was not able to do this )

    // 201 status code
    const response = await request(app).post("/user/register").send({
      name: "cocacola",
      email: "cocacola@example.com",
      password: "password",
    });
    expect(response.statusCode).toBe(201);

    // OTHER TESTS  that can be added
    // check if json is content type header
  });
  it("returns a JWT token after successfully registering", async () => {
    const response = await request(app).post("/user/register").send({
      name: "pepsi",
      email: "pepsi@example.com",
      password: "password",
    });
    expect(response.body).toHaveProperty("token");
  });
  it("fails to register when there is no username", async () => {
    const response = await request(app).post("/user/register").send({
      email: "cocacola@example.com",
      password: "password",
    });
    expect(response.statusCode).toBe(400);
  });

  it("fails to register when there is no email", async () => {
    const response = await request(app).post("/user/register").send({
      name: "cocacola",
      password: "password",
    });
    expect(response.statusCode).toBe(400);
  });
  it("fails to register when there is no password", async () => {
    const response = await request(app).post("/user/register").send({
      name: "cocacola",
      email: "cocacola@example.com",
    });
    expect(response.statusCode).toBe(400);
  });
  // check if json is content type header
  it("should have a Content-Type of application/json in headers when missing fields", async () => {
    const response = await request(app).post("/user/register").send({
      name: "cocacola",
      email: "cocacola@example.com",
    });
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

describe("LoginUser", () => {
  it("successfully logs in a user when all fields are valid", async () => {
    await request(app).post("/user/register").send({
        name: "green",
        email: "green@example.com",
        password: "password",
      });
    const response = await request(app).post("/user/login").send({
      email: "green@example.com",
      password: "password",
    });
    expect(response.statusCode).toBe(200);
  });

  it("should return a JWT token after logging in", async () => {
    const response = await request(app).post("/user/login").send({
      name: "green",
      email: "green@example.com",
      password: "password",
    });
    expect(response.body).toHaveProperty("token");
  });

  it("fails to login when there is no email", async () => {
    const response = await request(app).post("/user/login").send({
      name: "green",
      password: "password",
    });
    expect(response.statusCode).toBe(400);
  });
  it("fails to login when there is no password", async () => {
    const response = await request(app).post("/user/login").send({
      name: "green",
      email: "cocacola@example.com",
    });
    expect(response.statusCode).toBe(400);
  });
});

describe("GetUserDetails", () => {
    let token: string;
  
    beforeAll(async () => {
      await request(app).post("/user/register").send({
        name: "meow",
        email: "meow@example.com",
        password: "password",
      });
  
      const loginResponse = await request(app).post("/user/login").send({
        email: "meow@example.com",
        password: "password",
      });
  
      token = loginResponse.body.token;
    });
  
    it("successfully returns user details when authenticated", async () => {
      const response = await request(app)
        .get("/user")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("user");
      expect(response.body.user).toHaveProperty("email", "meow@example.com");
    });
  
    it("fails to return user details when not authenticated", async () => {
      const response = await request(app).get("/user");
      expect(response.statusCode).toBe(401);
    });
  
    it("fails to return user details with invalid token", async () => {
      const response = await request(app)
        .get("/user")
        .set("Authorization", `Bearer invalidToken`);
      expect(response.statusCode).toBe(401);
    });
  });