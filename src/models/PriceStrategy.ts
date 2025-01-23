// Apply OCP 
export interface PriceStrategy {
    calculatePrice(price: number): number;
}
  
export class RegularPrice implements PriceStrategy {
    calculatePrice(price: number): number {
      return price;
    }
}
  
export class DiscountedPrice implements PriceStrategy {
    constructor(private discountPercentage: number) {}
  
    calculatePrice(price: number): number {
      return price - (price * this.discountPercentage) / 100;
    }
}