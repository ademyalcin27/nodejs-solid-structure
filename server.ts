import express, { Request, Response } from 'express';
import cors from 'cors';
import { Product } from './src/models/Product';
import { InMemoryProductRepository } from './src/repositories/ProductRepository';
import { ProductService } from './src/services/ProductService';
import { DiscountedPrice, RegularPrice } from './src/models/PriceStrategy';

const app = express();
const PORT = 3001;

// middleware
app.use(cors());
app.use(express.json());

const productRepository = new InMemoryProductRepository();
const productService = new ProductService(productRepository);


// Routes

// List All Products
app.get("/products", (req: Request, res: Response) => {
    res.json(productService.getProducts().map(product => ({
        id: product.getId(),
        name: product.getName(),
        price: product.getFinalPrice()
    })));
})

// Add a new product
app.post("/products", (req: Request, res: Response) => {
    const { id, name, price, discount } = req.body;
    let priceStrategy = new RegularPrice();

    if(discount) {
        priceStrategy = new DiscountedPrice(discount);
    }

    try{
        const product = new Product(id, name, price, priceStrategy);
        productService.addProduct(product);
        res.status(201).send({message: "Product added successfully."});
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ message: error.message });
          } else {
            res.status(400).send({ message: 'An unexpected error occurred.' });
          }
    }
})

// Get Product Details
app.get("/products/:id", (req: Request, res: Response) => {
    const product = productService.getProductById(req.params.id);
    if(product) {
        res.json({
            id: product.getId(),
            name: product.getName(),
            price: product.getFinalPrice()
        });
    } else {
        res.status(404).send({message: "Product not found."});
    }
})

// Delete a product
app.delete("/products/:id", (req: Request, res: Response) => {
    const product = productService.getProductById(req.params.id);
    if(product) {
        productService.deleteProduct(req.params.id);
        res.send({message: "Product deleted successfully."});
    } else {
        res.status(404).send({message: "Product not found."});
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})