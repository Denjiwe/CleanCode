import Coupon from "../src/Coupon";

test("Should create a valid coupon", () => {
  const coupon = new Coupon("VALE20", 20, new Date('2024-01-01'));
  const today = new Date('2023-01-01');
  const isValid = coupon.isValid(today);
  expect(isValid).toBeTruthy();
});

test("Should try create an expired coupon", () => {
  const coupon = new Coupon("VALE20", 20, new Date('2021-01-01'));
  const today = new Date('2022-01-01');
  const isExpired = coupon.isExpired(today);
  expect(isExpired).toBeTruthy();
});
