export function formatUserData(data) {
  return {
    address: data?.address,
    createdAt: data.createdAt,
    email: data.email,
    id: data._id,
    name: data.name,
    phone: data.phone,
    profileImageUrl: data.profileImageUrl,
    roles: data.roles,
  };
}

export function formatProductData(data, geminiPrompt) {
  return {
    brand: data.brand,
    category: data.category,
    createdAt: data.createdAt,
    description: geminiPrompt || data.description,
    id: data._id,
    imageUrls: data.imageUrls,
    name: data.name,
    price: data.price,
  };
}
