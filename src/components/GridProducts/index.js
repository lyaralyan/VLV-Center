import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import ProductCard from '../ProductCard';
import Row from '../../theme/wrappers/row';
import Colors from '../../theme/colors';
import {font, RH, RW} from '@theme/utils';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import {getCategoryWithSlugRequest} from '@screens/Home/components/SearchInputNew/request/getCategoryWithSlugSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function GridProducts({
  products = [],
  title,
  containerStyle = {},
  withLimit = true,
  scrollEnabled = false,
  limit = 4,
  contentContainerStyle = {},
  onDeletePress,
  scrollRef,
  withPagination = false,
  onPressMoreBtn,
  totalPages,
  productCount,
}) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [showedProducts, setShowedProducts] = useState(limit);
  const [currentPage, setCurrentPage] = useState(1);
  const {getCategoryWithSlugData} = useSelector(
    ({getCategoryWithSlugSlice}) => getCategoryWithSlugSlice,
  );
  const {
    selectedFilters,
    brand,
    ct,
    discount,
    maxPrice,
    minPrice,
    sort_by,
    slug,
  } = useSelector(({filterSlice}) => filterSlice);

  const paginationRequest = page => {
    dispatch(
      getCategoryWithSlugRequest({
        slug: slug || getCategoryWithSlugData?.category?.slug,
        manufacture: selectedFilters,
        brand,
        ct,
        discount,
        maxPrice,
        minPrice,
        page,
        sort_by,
      }),
    );
  };

  let yPos;
  const productList = Array.isArray(products)
    ? products
    : products?.products ?? [];
  if (!products?.products?.length) {
    return null;
  }

  const renderPagination = () => {
    const pages = [];

    pages.push(1);

    if (currentPage >= totalPages - 2) {
      if (currentPage > 3) {
        pages.push({type: 'ellipsis', key: 'left-ellipsis'});
      }

      for (let i = Math.max(2, totalPages - 2); i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 3) {
        pages.push({type: 'ellipsis', key: 'left-ellipsis'});

        pages.push(currentPage);

        if (currentPage < totalPages - 2) {
          pages.push({type: 'ellipsis', key: 'right-ellipsis'});
        }
      } else {
        for (let i = 2; i <= Math.min(3, totalPages); i++) {
          pages.push(i);
        }

        if (totalPages > 3) {
          pages.push({type: 'ellipsis', key: 'right-ellipsis'});
        }
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages.map((page, index) => {
      if (typeof page === 'object' && page.type === 'ellipsis') {
        return (
          <View style={styles.paginationCount} key={index}>
            <Text style={styles.paginationCountText}>...</Text>
          </View>
        );
      } else {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setCurrentPage(Number(page));
              paginationRequest(Number(page));
            }}
            style={[
              styles.paginationCount,
              page === currentPage && styles.paginationActiveCount,
            ]}>
            <Text
              style={{
                ...styles.paginationCountText,
                ...(page === currentPage && styles.paginationActiveText),
              }}>
              {page}
            </Text>
          </TouchableOpacity>
        );
      }
    });
  };

  return (
    <View
      onLayout={e => {
        yPos = e?.nativeEvent?.layout.y;
      }}
      style={[
        {
          backgroundColor: Colors.bgGray,
          marginBottom: RH(20),
          paddingTop: RH(15),
        },
        containerStyle,
      ]}>
      {title && (
        <Row style={styles.header}>
          <Text allowFontScaling={false} style={styles.title}>
            {title}
          </Text>
        </Row>
      )}
      <FlatList
        data={withLimit ? productList?.slice(0, showedProducts) : productList}
        numColumns={2}
        keyExtractor={(item, index) => `key-${index}`}
        pagingEnabled
        contentContainerStyle={{
          backgroundColor: Colors.bgGray,
          paddingHorizontal: RW(15),
          ...contentContainerStyle,
        }}
        scrollEnabled={scrollEnabled}
        renderItem={({item}) => (
          <ProductCard product={item} onDeletePress={onDeletePress} />
        )}
        // ListEmptyComponent={
        //   <View
        //     style={{
        //       flex: 1,
        //       justifyContent: 'center',
        //       alignItems: 'center',
        //       backgroundColor: 'red',
        //     }}>
        //     <Text style={{color: 'white', fontSize: 16}}>
        //       Products not found
        //     </Text>
        //   </View>
        // }
      />

      {/* {withLimit && showedProducts < products?.products?.length ? (
        <Pressable
          style={({pressed}) => [
            styles.showMoreBtn,
            {backgroundColor: pressed ? Colors.darkRed : Colors.red},
          ]}
          onPress={() => {
            setShowedProducts(showedProducts + limit);
          }}>
          <Text allowFontScaling={false} style={styles.showMoreBtnText}>
            {t('see_all')}
          </Text>
        </Pressable>
      ) : limit < products?.products?.length ? (
        <Pressable
          style={({pressed}) => [
            styles.showMoreBtn,
            {backgroundColor: pressed ? Colors.darkRed : Colors.red},
          ]}
          onPress={() => {
            scrollRef?.current?.scrollTo({
              y: yPos,
              animated: true,
            });
            setShowedProducts(limit);
          }}>
          <Text allowFontScaling={false} style={styles.showMoreBtnText}>
            {t('to_close')}
          </Text>
        </Pressable>
      ) : null} */}

      {withPagination && productList.length < productCount ? (
        <Pressable
          style={({pressed}) => [
            styles.showMoreBtn,
            {backgroundColor: pressed ? Colors.darkRed : Colors.red},
          ]}
          onPress={onPressMoreBtn}>
          <Text allowFontScaling={false} style={styles.showMoreBtnText}>
            {t('see_more')}
          </Text>
        </Pressable>
      ) : !withPagination &&
        withLimit &&
        showedProducts < products?.products?.length ? (
        <Pressable
          style={({pressed}) => [
            styles.showMoreBtn,
            {backgroundColor: pressed ? Colors.darkRed : Colors.red},
          ]}
          onPress={() => {
            setShowedProducts(showedProducts + limit);
          }}>
          <Text allowFontScaling={false} style={styles.showMoreBtnText}>
            {t('see_all')}
          </Text>
        </Pressable>
      ) : !withPagination && limit < products?.products?.length ? (
        <Pressable
          style={({pressed}) => [
            styles.showMoreBtn,
            {backgroundColor: pressed ? Colors.darkRed : Colors.red},
          ]}
          onPress={() => {
            scrollRef?.current?.scrollTo({
              y: yPos,
              animated: true,
            });
            setShowedProducts(limit);
          }}>
          <Text allowFontScaling={false} style={styles.showMoreBtnText}>
            {t('to_close')}
          </Text>
        </Pressable>
      ) : null}

      {totalPages > 1 ? (
        <View style={styles.pagination}>
          <View style={styles.paginationButtonsWrapper}>
            <TouchableOpacity
              style={{
                ...styles.paginationButtons,
                ...{
                  backgroundColor:
                    currentPage === 1 ? Colors.BORDER_COLOR50 : Colors.DARK,
                  borderWidth: currentPage === 1 ? 0 : 1,
                },
              }}
              disabled={currentPage === 1}
              onPress={() => {
                setCurrentPage(1);
                paginationRequest(1);
              }}>
              {/* <DoublePrevIcon /> */}
              <Image source={require('./Icon/Pagination/First.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.paginationButtons,
                ...{
                  backgroundColor:
                    currentPage === 1 ? Colors.BORDER_COLOR50 : Colors.DARK,
                  borderWidth: currentPage === 1 ? 0 : 1,
                },
              }}
              disabled={currentPage === 1}
              onPress={() => {
                setCurrentPage(prev => {
                  const prevPage = Math.max(prev - 1, 1);
                  paginationRequest(prevPage);
                  return prevPage;
                });
              }}>
              {/* <PrevIcon /> */}
              <Image source={require('./Icon/Pagination/Prev.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.paginationCountContainer}>
            {renderPagination()}
          </View>
          <View style={styles.paginationButtonsWrapper}>
            <TouchableOpacity
              style={{
                ...styles.paginationButtons,
                ...{
                  backgroundColor:
                    currentPage === totalPages
                      ? Colors.BORDER_COLOR50
                      : Colors.DARK,
                  borderWidth: currentPage === totalPages ? 0 : 1,
                },
              }}
              disabled={currentPage === totalPages}
              onPress={() => {
                setCurrentPage(prev => {
                  const nextPage = Math.min(prev + 1, totalPages);
                  paginationRequest(nextPage);
                  return nextPage;
                });
              }}>
              {/* <NextIcon /> */}
              <Image source={require('./Icon/Pagination/Next.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.paginationButtons,
                ...{
                  backgroundColor:
                    currentPage === totalPages
                      ? Colors.BORDER_COLOR50
                      : Colors.DARK,
                  borderWidth: currentPage === totalPages ? 0 : 1,
                },
              }}
              disabled={currentPage === totalPages}
              onPress={() => {
                setCurrentPage(totalPages);
                paginationRequest(totalPages);
              }}>
              {/* <DoubleNextIcon /> */}
              <Image source={require('./Icon/Pagination/Last.png')} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    paddingTop: RH(5),
    paddingBottom: RH(20),
    paddingHorizontal: RW(15),
  },
  title: {
    textTransform: 'uppercase',
    ...font('medium', 14),
  },
  showMoreBtn: {
    paddingHorizontal: RW(18),
    paddingVertical: RH(11),
    borderRadius: RW(4),
    alignSelf: 'center',
    marginBottom: RH(50),
  },
  showMoreBtnText: {
    ...font('regular', 12, '#fff'),
  },
  pagination: {
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR50,
    borderRadius: 57,
    paddingHorizontal: 11,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: Colors.BACKGROUND_COLOR,
    marginTop: 20,
    marginHorizontal: 25,
  },
  paginationButtonsWrapper: {
    flexDirection: 'row',
    gap: 9,
  },
  paginationButtons: {
    width: 39,
    height: 39,
    borderWidth: 1,
    borderColor: Colors.BORDER_COLOR50,
    borderRadius: 29,
    backgroundColor: Colors.DARK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationCountContainer: {
    borderRadius: 62,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    padding: 3,
    flexDirection: 'row',
    gap: 3.14,
  },
  paginationCountText: {
    fontSize: 10.43,
    color: Colors.DARK,
  },
  paginationActiveCount: {
    backgroundColor: Colors.red,
  },
  paginationActiveText: {
    color: Colors.white,
  },
  paginationCount: {
    borderWidth: 0.65,
    borderColor: Colors.BORDER_COLOR50,
    width: 25.43,
    height: 25.43,
    borderRadius: 18.91,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
