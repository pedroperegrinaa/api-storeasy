const CartsController = require("../../src/controllers/CartsController.js");

describe("Hello World", () => {
  it("should ", async () => {
    const result = await CartsController.index();
    console.log(result);

    expect(result).toEqual({ message: "Hello World" });
  });
});
