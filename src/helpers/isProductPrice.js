const isProductPrice = ({
  mobileDisscounts: mobileDisscounts,
  product_id,
  category_id,
  brand_id,
  price,
}) => {
  let discount = false;
  let discount_type = mobileDisscounts.discount_type;
  let discountPrice = mobileDisscounts.discount;

  if (mobileDisscounts?.status) {
    Object.keys(mobileDisscounts?.brands_without_exceptions_discount)?.forEach(
      each_category_id => {
        if (each_category_id == category_id) {
          if (
            Object.keys(
              mobileDisscounts?.brands_without_exceptions_discount?.[
                each_category_id
              ],
            )?.find(each_brand_id => each_brand_id == brand_id)
          ) {
            let item =
              mobileDisscounts?.brands_without_exceptions_discount?.[
                each_category_id
              ][brand_id];
            discount_type = item?.discount_type;
            discountPrice = item?.discount;

            discount = true;
            return;
          }
          discount = false;
        }
      },
    );

    ///
    Object.keys(
      mobileDisscounts?.categories_without_exceptions_discount,
    )?.forEach(each_brand_id => {
      if (each_brand_id == brand_id) {
        if (
          Object.keys(
            mobileDisscounts?.categories_without_exceptions_discount?.[
              each_brand_id
            ],
          )?.find(each_category_id => each_category_id == category_id)
        ) {
          let item =
            mobileDisscounts?.categories_without_exceptions_discount?.[
              each_brand_id
            ][category_id];
          discount_type = item?.discount_type;
          discountPrice = item?.discount;

          discount = true;
          return;
        }
        discount = false;
      }
    });

    Object.keys(
      mobileDisscounts?.categories_with_exceptions_discount || {},
    )?.forEach(each_category_id => {
      if (each_category_id == category_id) {
        Object.keys(mobileDisscounts?.except_categories || {})?.forEach(
          each_category_id2 => {
            if (
              !mobileDisscounts?.except_categories[each_category_id2].find(
                each_brand_id => each_brand_id == brand_id,
              )
            ) {
              discount = true;
              let item =
                mobileDisscounts?.categories_with_exceptions_discount[
                  each_category_id
                ];
              discount_type = item?.discount_type;
              discountPrice = item?.discount;
            } else {
              discount = false;
            }
          },
        );
      }
    });
    Object.keys(
      mobileDisscounts?.brands_with_exceptions_discount || {},
    )?.forEach(each_brand_id => {
      if (each_brand_id == brand_id) {
        Object.keys(mobileDisscounts?.except_brands || {})?.forEach(
          each_brand_id2 => {
            if (
              !mobileDisscounts?.except_brands[each_brand_id2].find(
                each_category_id => each_category_id == category_id,
              )
            ) {
              discount = true;
              let item =
                mobileDisscounts?.brands_with_exceptions_discount[
                  each_brand_id
                ];
              discount_type = item?.discount_type;
              discountPrice = item?.discount;
            } else {
              discount = false;
            }
          },
        );
      }
    });

    if (
      mobileDisscounts.except_product_ids &&
      JSON.parse('[' + mobileDisscounts.except_product_ids + ']')?.find(
        each_product_id => each_product_id == product_id,
      )
    ) {
      discount = false;
    } else if (
      mobileDisscounts.products_discount &&
      Object.keys(mobileDisscounts.products_discount || {})?.find(
        each_product_id => each_product_id == product_id,
      )
    ) {
      discount = true;
      let product =
        mobileDisscounts.products_discount[
          Object.keys(mobileDisscounts.products_discount || {})?.find(
            each_product_id => each_product_id == product_id,
          )
        ];
      discount_type = product.discount_type;
      discountPrice = product.discount;
    }
  }

  if (discount) {
    return discount_type == 1
      ? price - +discountPrice
      : price - (price / 100) * +discountPrice;
  }
};

export default isProductPrice;
