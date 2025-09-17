/* eslint-env jest */
/* global jest, describe, it, expect */

const { setUser, getUser } = require("../services/auth");
const jwt = require("jsonwebtoken");

// Mock the jsonwebtoken library
jest.mock("jsonwebtoken");

describe("Auth Service", () => {
  const user = { id: 1, email: "test@example.com" };
  const token = "test_token";

  describe("setUser", () => {
    it("should generate a token for a user", () => {
      jwt.sign.mockReturnValue(token);
      const result = setUser(user);
      expect(result).toBe(token);
      expect(jwt.sign).toHaveBeenCalledWith(
        JSON.stringify(user),
        expect.any(String)
      );
    });
  });

  describe("getUser", () => {
    it("should return a user for a valid token", () => {
      jwt.verify.mockReturnValue(user);
      const result = getUser(token);
      expect(result).toEqual(user);
      expect(jwt.verify).toHaveBeenCalledWith(token, expect.any(String));
    });

    it("should return null for an invalid token", () => {
      jwt.verify.mockImplementation(() => {
        throw new Error("Invalid token");
      });
      const result = getUser("invalid_token");
      expect(result).toBeNull();
    });
  });
});
