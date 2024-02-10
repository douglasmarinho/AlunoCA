import ProductRepositoryInterface from "../../../domain/product/repository/product-repository-interace";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase{

    private productRepositoryInterface: ProductRepositoryInterface;

    constructor(productRepositoryInterface: ProductRepositoryInterface) {
        this.productRepositoryInterface = productRepositoryInterface;     
    }

    async execute (input: InputUpdateProductDto):Promise<OutputUpdateProductDto>{

        const product = await this.productRepositoryInterface.find(input.id);

        product.changeName(input.name);
        product.changePrice(input.price);

        await this.productRepositoryInterface.update(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        }
    }

}