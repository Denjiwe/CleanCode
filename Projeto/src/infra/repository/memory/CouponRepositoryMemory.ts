import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";

export default class CouponRepositoryMemory implements CouponRepository {
  coupons: Coupon[];
  constructor() {
    this.coupons = [
      new Coupon("VALE20", 20, new Date()),
      new Coupon("VALE50", 50, new Date()),
      new Coupon("VALE100", 100, new Date())
    ];
  }
  findByCode(code: string): Promise<Coupon | undefined> {
    return Promise.resolve(this.coupons.find(coupon => coupon.code === code));
  }
}