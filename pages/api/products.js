import { mongooseConnect } from '@/lib/mongoose';
import Product from '@/model/Product';

export default async function handle(req, res) {
  const { method } = req;

  try {
    await mongooseConnect();

    switch (method) {
      case 'POST':
        const { title, description, price, details, images } = req.body;
        const productDoc = await Product.create({
          title,
          description,
          price,
          images,
          details
        });
        res.status(201).json(productDoc);
        break;

      case 'GET':
        if (req.query?.id) {
          const product = await Product.findById(req.query.id);
          res.json(product);
        } else {
          const products = await Product.find();
          res.json(products);
        }
        break;

      case 'PUT':
        const { _id, ...updatedFields } = req.body;
        await Product.findByIdAndUpdate(_id, updatedFields);
        res.json({ success: true });
        break;

      case 'DELETE':
        if (req.query?.id) {
          await Product.findByIdAndDelete(req.query.id);
          res.json({ success: true });
        } else {
          res.status(400).json({ error: 'Missing product ID' });
        }
        break;

      default:
        res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
