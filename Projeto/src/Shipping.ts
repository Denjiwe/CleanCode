export default class Shipping {
    constructor(readonly distance: number, readonly volume: number, readonly density: number) {
    }

    getShipping(): number {
    }


    private calculateDensity(weight: number, volume: number): number {
        return weight/volume;
    }
}