import { ProductRepository } from '../repositories/ProductRepository';
import { Product } from '../models/Product';

export class ProductService {
    private productRepository: ProductRepository;
  
    constructor(productRepository: ProductRepository) {
      this.productRepository = productRepository;
    }
  
    addProduct(product: Product): void {
      this.productRepository.save(product);
    }
  
    getProducts(): Product[] {
      return this.productRepository.getAllProducts();
    }
  
    getProductById(id: string): Product | undefined {
      return this.productRepository.getProductById(id);
    }
  
    deleteProduct(id: string): void {
      this.productRepository.deleteProduct(id);
    }
  }