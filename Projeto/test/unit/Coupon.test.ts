import Coupon from "../../src/domain/entity/Coupon";

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

test("Should create a valid coupon and calculate discount", () => {
  const coupon = new Coupon("VALE20", 20);
  const discount = coupon.calculateDiscount(1000);
  expect(discount).toBe(200);
});