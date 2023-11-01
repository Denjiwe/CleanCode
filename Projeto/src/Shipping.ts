export default class Shipping {
    constructor(readonly distance: number, readonly volume: number, readonly density: number) {
    }

    getShipping(): number {
      return this.distance * this.volume * (this.density/100);
    }
}
