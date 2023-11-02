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

    getVolume(): number {
        return (this.height/100) * (this.length/100) * (this.width/100);
    }

    getDensity(): number {
        return this.weight/this.getVolume();
    }
}