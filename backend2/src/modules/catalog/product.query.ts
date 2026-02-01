import { ProductFilterQuery } from "./product.types";

export const buildProductQuery = (query: ProductFilterQuery) => {
  const filter: any = {
    isDeleted: false,
    isPublished: true,
  };

  if (query.search) {
    filter.$or = [
      { productName: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } },
    ];
  }

  if (query.category) filter.category = query.category;
  if (query.tags?.length) filter.tags = { $in: query.tags };
  if (query.sizes?.length) filter.sizes = { $in: query.sizes };
  if (query.fits?.length) filter.fits = { $in: query.fits };
  if (query.sleeveType) filter.sleeveType = query.sleeveType;

  if (query.inStock) filter.stock = { $gt: 0 };

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = query.minPrice;
    if (query.maxPrice) filter.price.$lte = query.maxPrice;
  }

  return filter;
};
