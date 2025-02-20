import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPrivacyPageData} from '@store/MainSlice';
import {RH, RW, font} from '@theme/utils';
import HeaderCategories from '@components/HeaderCategories';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import Header from '@components/Header';
import RenderHTML from 'react-native-render-html';
import {useTranslation} from 'react-i18next';
import Colors from '@theme/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('screen').width;

const Privacy = () => {
  const {privacyPageData, currentLanguage} = useSelector(({main}) => main);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  useEffect(() => {
    dispatch(getPrivacyPageData());
  }, []);
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.container, {paddingTop: insets.top}]}
      contentContainerStyle={{
        paddingBottom: RH(140),
      }}
      showsVerticalScrollIndicator={false}>
      <Header />
      <HeaderCategories />
      <SearchInput />
      <View style={styles.wrapper}>
        <Text allowFontScaling={false} style={styles.title}>
          {t('pravicy_policy')}
        </Text>
        {privacyPageData?.['description_' + currentLanguage] && (
          <RenderHTML
            enableExperimentalBRCollapsing
            contentWidth={screenWidth}
            source={{
              html: privacyPageData?.['description_' + currentLanguage],
            }}
            tagsStyles={{
              body: {
                color: Colors.black,
              },
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Privacy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: RW(16),
    paddingVertical: RH(20),
  },
  title: {
    ...font('bold', 25),
    marginBottom: RH(20),
  },
});
