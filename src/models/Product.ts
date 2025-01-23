import { PriceStrategy } from "./PriceStrategy";

export class Product {
    private id: string;
    private name: string = "";
    private price: number= 0;
    private priceStrategy: PriceStrategy;
    
  constructor(id: string, name: string, price: number, priceStrategy: PriceStrategy) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.priceStrategy = priceStrategy;
  }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getFinalPrice(): number {
        return this.priceStrategy.calculatePrice(this.price);
      }
      
      getPrice(): number {
        return this.price;
    }

    setName(name: string): void {
        if(name && name.trim()) {
           this.name = name;
        } else {
            throw new Error("'Name cannot be empty.");
        }
    }

    

    setPrice(price: number): void {
        if(price > 0) {
            this.price = price;
        } else {
            throw new Error("Price must be positive.");
        }
    }
}