import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/model/Product"; // Correct import path to the Product model

export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();

    if (method === "POST") {
        const { title, description, price, images} = req.body;

        try {
            const productDoc = await Product.create({
                title,
                description,
                price,
                images
            });
            res.status(201).json(productDoc);
        } catch (error) {
            console.error("Error creating product:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } else if (method === 'DELETE') { // Moved the DELETE block inside the main conditional block
        if (req.query.id) {
            try {
                await Product.deleteOne({ _id: req.query.id });
                res.json(true);
            } catch (error) {
                console.error("Error deleting product:", error);
                res.status(500).json({ error: "Internal server error" });
            }
        } else {
            res.status(400).json({ error: "Missing ID parameter" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
