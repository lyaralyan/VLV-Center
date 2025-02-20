export const sortFunction = (sortType, searchPageProducts) => {
  let productsArray = Array.from(searchPageProducts);
  switch (sortType?.value) {
    case 'high_to_low':
      productsArray?.sort(function (a, b) {
        const aPrice =
          (a.product.online_price && a.product.online_selling_price) ||
          a.promo_price ||
          a.recommended_retail_price ||
          a.skus[0].selling_price;
        const bPrice =
          (b.product.online_price && b.product.online_selling_price) ||
          b.promo_price ||
          b.recommended_retail_price ||
          b.skus[0].selling_price;

        return bPrice - aPrice;
      });
      break;
    case 'low_to_high':
      productsArray?.sort(function (a, b) {
        const aPrice =
          (a.product.online_price && a.product.online_selling_price) ||
          a.promo_price ||
          a.recommended_retail_price ||
          a.skus[0].selling_price;
        const bPrice =
          (b.product.online_price && b.product.online_selling_price) ||
          b.promo_price ||
          b.recommended_retail_price ||
          b.skus[0].selling_price;

        return aPrice - bPrice;
      });
      break;
    case 'alpha_asc':
      productsArray?.sort(function (a, b) {
        return a?.product?.product_name?.localeCompare(
          b?.product?.product_name,
        );
      });
      break;
    case 'alpha_desc':
      productsArray?.sort(function (a, b) {
        return b?.product?.product_name?.localeCompare(
          a?.product?.product_name,
        );
      });
      break;
    case 'old':
      productsArray?.sort(function (a, b) {
        return new Date(a.product.created_at) - new Date(b.product.created_at);
      });
      break;
    default:
      productsArray?.sort(function (a, b) {
        return new Date(b.product.created_at) - new Date(a.product.created_at);
      });
      break;
  }
  return productsArray;
};
