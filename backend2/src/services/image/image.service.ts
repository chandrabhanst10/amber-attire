import axios from "axios";
import { IProduct } from "../../models/product.model";
import dotenv from "dotenv";
dotenv.config();
export class ImageService {
    /**
     * Fetches images from the external S3 service for a list of products.
     * Optimizes performance by batching image codes into a single API call.
     * Maps the returned download URLs back to the corresponding products.
     * 
     * @param products - Array of product objects (mongoose docs or lean objects)
     * @returns The modified products array with images attached
     */
    static async attachImages(products: any[]): Promise<any[]> {
        if (!products || products.length === 0) return products;

        const serviceUrl = process.env.IMAGE_SERVICE_URL;
        if (!serviceUrl) {
            console.warn("IMAGE_SERVICE_URL is not defined in environment variables.");
            return products;
        }

        try {
            // Fetch images for each product in parallel
            await Promise.all(products.map(async (product) => {
                if (product.imageCode) {
                    try {
                        const { data } = await axios.get(serviceUrl, {
                            params: { codes: product.imageCode }
                        });

                        if (data && Array.isArray(data.files)) {
                            // Assuming the API returns a list of files for the requested code
                            // We map just the download_url
                            const images = data.files.map((file: any) => file.download_url);
                            product.images = images;
                        } else {
                            product.images = [];
                        }
                    } catch (innerError: any) {
                        console.error(`Failed to fetch images for code ${product.imageCode}:`, innerError.message);
                        product.images = [];
                    }
                } else {
                    product.images = [];
                }
            }));

        } catch (error: any) {
            console.error("ImageService: Error in attachImages:", error.message);
        }

        return products;
    }
}
