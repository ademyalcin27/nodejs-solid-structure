// Apply DIP
import { Product } from '../models/Product';

export interface ProductRepository {
    save(product: Product): void;
    getAllProducts(): Product[];
    getProductById(id: string): Product | undefined;
    deleteProduct(id: string): void;
  }
  
  export class InMemoryProductRepository implements ProductRepository {
    private products: Product[] = [];
  
    save(product: Product): void {
      this.products.push(product);
    }
  
    getAllProducts(): Product[] {
      return this.products;
    }
  
    getProductById(id: string): Product | undefined {
      return this.products.find(p => p.getId() === id);
    }
  
    deleteProduct(id: string): void {
      const index = this.products.findIndex(p => p.getId() === id);
      if (index !== -1) {
        this.products.splice(index, 1);
      }
    }
  }