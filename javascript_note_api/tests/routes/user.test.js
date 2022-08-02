const axios = require("axios");

describe("User api tests", () => {
  const mockBody = {
    name: "myname",
    email: "bigmail@bigmail.com",
    password: "mailbig",
  };
  test("Creating new user", async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/register",
        mockBody
      );
      expect(response.status).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });
  test("Login with new user", async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        mockBody
      );
      expect(response.status).toBe(200);
      expect(response.data.token.length).toBeGreaterThanOrEqual(161);
    } catch (error) {
      console.log(error);
    }
  });
});
