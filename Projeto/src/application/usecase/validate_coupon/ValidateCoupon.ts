import CouponRepository from "../../../domain/repository/CouponRepository";

export default class ValidateCoupon {
  constructor(private readonly couponRepository: CouponRepository) {
  }

  async execute(code: string) {
    const coupon = await this.couponRepository.findByCode(code);
    if (!coupon) throw new Error("Coupon not found");
    return coupon.isValid();
  }
}