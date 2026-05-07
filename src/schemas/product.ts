import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(2),
  brand: z.string(),
  price: z.string().optional(),
  image: z.string().url(),
  type: z.string().optional(),
  description: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductListSchema = z.array(ProductSchema);
