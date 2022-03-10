const { expect, it } = require("@jest/globals");
const axios = require("axios");
const app = require("./app");
const supertest = require("supertest");
const request = supertest(app);

jest.mock("axios");

describe("/api endpoint tests", () => {
    it("should fetch something with status 200", () => {
      const activity = [{ activity: "Do Something" }];
      const resp = { data: activity, status: 200 };
      axios.get.mockResolvedValue(resp);
      return axios.get("https://localhost:api").then((data) => {
        expect(data).toEqual(resp);
        expect(data.status).toEqual(200);
      });
    });

  it("should not fetch anything with status 500 ", (done) => {
    const activity = [{ activity: "null" }];
    const res = {
      data: activity,
      status: 500,
      message: "something went wrong",
    };
    axios.get.mockResolvedValue(res);
    request.get("/api2").then((result) => {
      console.log("Entered then on test");
      expect(result.data).toBeNull;
      expect(result.status).toEqual(700);
      expect(result.message).toEqual("something went wrong");
    });
    done();
  });
});
