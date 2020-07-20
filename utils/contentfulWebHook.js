//possible way to respond to hooks from contenful below
//decided not to use it in production to fit in the Vercel 12 function limit
//  |
//  V

// import Product from "../models/Product";
// import jwt from "jsonwebtoken";
// import connectDb from "./connectDb";

// connectDb();

// export default async (req, res) => {
//   const { fields = {}, sys = {} } = req.body;
//   const { price, reducedPrice, reducedPriceExpiration, inStock } = fields;
//   if (
//     !("authorization" in req.headers) ||
//     process.env.CONTENTFUL_HOOK_TOKEN !== req.headers.authorization
//   ) {
//     return res.status(401).send("Not authorized access");
//   }
//   if (!sys.id || !sys.type) return res.status(401).send("Not valid payload");
//   if (sys.type === "DeletedEntry") {
//     try {
//       const product = await Product.findOneAndDelete({ productId: sys.id });
//       return res.status(200).send("Deleted");
//     } catch (error) {
//       return res.status(500).send(error);
//     }
//   } else {
//     try {
//       const product = await Product.findOne({ productId: sys.id });
//       if (product) {
//         Object.assign(product, {
//           price: price["en-US"],
//           reducedPrice: reducedPrice?.["en-US"] || 0,
//           reducedPriceExpiration: reducedPriceExpiration
//             ? new Date(reducedPriceExpiration["en-US"]).getTime()
//             : 0,
//         });
//         await product.save();
//         return res.status(200).send("Saved");
//       } else {
//         await new Product({
//           price: price["en-US"],
//           reducedPrice: reducedPrice?.["en-US"] || 0,
//           reducedPriceExpiration: reducedPriceExpiration
//             ? new Date(reducedPriceExpiration["en-US"]).getTime()
//             : 0,
//           inStock: inStock["en-US"],
//           productId: sys.id,
//           contentId: fields.for["en-US"],
//         }).save();
//         return res.status(201).send("Product created");
//       }
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   }
// };
