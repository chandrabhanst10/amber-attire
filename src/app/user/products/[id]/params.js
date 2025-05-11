// src/app/user/products/[id]/params.js (server-side)
export async function generateStaticParams() {
    // Fetch dynamic product IDs here if necessary
    const productIds = ['1', '2', '3', '4'];
  
    return productIds.map(id => ({
      id: id.toString(),
    }));
  }
  