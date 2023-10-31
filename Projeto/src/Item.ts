export default class Item {
    constructor(
        readonly idItem: number, 
        readonly category: string, 
        readonly description: string, 
        readonly price: number, 
        readonly height: number,
        readonly width: number,
        readonly length: number,
        readonly weight: number
        ) {
    }

    getVolume(height: number, length: number, width: number): number {
        return (height/100) * (length/100) * (width/100);
    }

    getDensity(weight: number, volume: number): number {
        return weight/volume;
    }
}