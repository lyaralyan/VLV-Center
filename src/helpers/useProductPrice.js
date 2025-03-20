import {useSelector} from 'react-redux';

const useProductPrice = () => {
  const mobileDisscounts = useSelector(({main}) => main.mobileDisscounts);

  const calculatePrice = ({
    product_id,
    category_id,
    brand_id,
    price,
    promoPrice,
  }) => {
    let discount = false;
    let discount_type = mobileDisscounts?.discount_type || 0; // Լռելյայն արժեք
    let discountPrice = mobileDisscounts?.discount || 0; // Լռելյայն արժեք

    if (mobileDisscounts?.status) {
      // Ստուգեք brand-ի զեղչերը
      for (const each_category_id of Object.keys(
        mobileDisscounts?.brands_without_exceptions_discount || {},
      )) {
        if (each_category_id == category_id) {
          const brandDiscounts =
            mobileDisscounts?.brands_without_exceptions_discount?.[
              each_category_id
            ] || {};
          if (brandDiscounts[brand_id]) {
            const item = brandDiscounts[brand_id];
            discount_type = item?.discount_type || 0;
            discountPrice = item?.discount || 0;
            discount = true;
            break;
          }
        }
      }

      // Ստուգեք category-ի զեղչերը
      if (!discount) {
        for (const each_brand_id of Object.keys(
          mobileDisscounts?.categories_without_exceptions_discount || {},
        )) {
          if (each_brand_id == brand_id) {
            const categoryDiscounts =
              mobileDisscounts?.categories_without_exceptions_discount?.[
                each_brand_id
              ] || {};
            if (categoryDiscounts[category_id]) {
              const item = categoryDiscounts[category_id];
              discount_type = item?.discount_type || 0;
              discountPrice = item?.discount || 0;
              discount = true;
              break;
            }
          }
        }
      }

      // Ստուգեք exception-ներով զեղչերը (categories)
      if (!discount) {
        for (const each_category_id of Object.keys(
          mobileDisscounts?.categories_with_exceptions_discount || {},
        )) {
          if (each_category_id == category_id) {
            const exceptCategories = mobileDisscounts?.except_categories || {};
            if (!exceptCategories[category_id]?.includes(brand_id)) {
              const item =
                mobileDisscounts?.categories_with_exceptions_discount[
                  each_category_id
                ];
              discount_type = item?.discount_type || 0;
              discountPrice = item?.discount || 0;
              discount = true;
              break;
            }
          }
        }
      }

      // Ստուգեք exception-ներով զեղչերը (brands)
      if (!discount) {
        for (const each_brand_id of Object.keys(
          mobileDisscounts?.brands_with_exceptions_discount || {},
        )) {
          if (each_brand_id == brand_id) {
            const exceptBrands = mobileDisscounts?.except_brands || {};
            if (!exceptBrands[brand_id]?.includes(category_id)) {
              const item =
                mobileDisscounts?.brands_with_exceptions_discount[
                  each_brand_id
                ];
              discount_type = item?.discount_type || 0;
              discountPrice = item?.discount || 0;
              discount = true;
              break;
            }
          }
        }
      }

      // Ստուգեք product-ի զեղչերը
      if (!discount) {
        const exceptProductIds = JSON.parse(
          `[${mobileDisscounts?.except_product_ids || ''}]`,
        );
        if (!exceptProductIds.includes(product_id)) {
          const productDiscounts = mobileDisscounts?.products_discount || {};
          if (productDiscounts[product_id]) {
            const product = productDiscounts[product_id];
            discount_type = product?.discount_type || 0;
            discountPrice = product?.discount || 0;
            discount = true;
          }
        }
      }
    }

    // Վերջնական գնի հաշվարկ
    let finalPrice =
      isNaN(price) || price === null || price === undefined ? 0 : price;

    // If promoPrice exists and is valid, use it as the base price
    if (promoPrice && !isNaN(promoPrice)) {
      finalPrice = promoPrice;
    }

    // Ստեղծենք փոփոխություն միայն զեղչի համար
    let appliedDiscount = 0;
    if (discount) {
      discountPrice = Number(discountPrice) || 0;
      discount_type = Number(discount_type) || 0;

      // Կիրառել զեղչը միայն վերնագումրից
      if (discount_type === 1) {
        appliedDiscount = discountPrice;
      } else {
        appliedDiscount = (finalPrice / 100) * discountPrice;
      }
    }

    // Վերջնական գին մնում է անփոփոխ, միայն ցուցադրում ենք զեղչի արժեքը
    return {
      finalPrice: isNaN(finalPrice) ? 0 : Math.max(0, finalPrice),
      appliedDiscount,
      isDiscountApplied: appliedDiscount > 0,
    };
  };

  return calculatePrice;
};

export default useProductPrice;
