import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFaqPageData} from '@store/MainSlice';
import {RH, RW, font} from '@theme/utils';
import HeaderCategories from '@components/HeaderCategories';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import Header from '@components/Header';
import Colors from '@theme/colors';
import SearchSvg from '@components/FooterMenu/assets/SearchSvg';
import RenderHTML from 'react-native-render-html';
import QuestionItem from './components/QuestionItem';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('screen').width;

const FAQ = () => {
  const [activeAnswer, setActiveAnswer] = useState();
  const [search, setSearch] = useState('');
  const {faqPageData, currentLanguage} = useSelector(({main}) => main);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!faqPageData) {
      dispatch(getFaqPageData());
    } else {
      setActiveAnswer(faqPageData[0]);
    }
  }, [faqPageData]);
  const {t} = useTranslation();
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
        <View style={styles.searchContainer}>
          <TextInput
            allowFontScaling={false}
            value={search}
            onChangeText={e => setSearch(e)}
            placeholder={t('search_your_item')}
            style={styles.search}
          />
          <View style={styles.searchIcon}>
            <SearchSvg color="#28282833" />
          </View>
        </View>
        {faqPageData?.map((item, index) => (
          <QuestionItem
            item={item}
            key={index}
            active={activeAnswer?.id == item?.id}
            setActiveAnswer={setActiveAnswer}
          />
        ))}
      </View>
      <View style={styles.wrapper}>
        <Text allowFontScaling={false} style={styles.answerTitle}>
          {t('knows_questions')}
        </Text>

        <Text allowFontScaling={false} style={styles.questionText}>
          {activeAnswer?.['name_' + currentLanguage]}
        </Text>
        <RenderHTML
          contentWidth={screenWidth}
          source={{
            html: activeAnswer?.faqs[0]?.['answer_' + currentLanguage],
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
      </View>
    </ScrollView>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: RW(16),
    backgroundColor: Colors.bgGray,
    paddingVertical: RH(20),
    marginBottom: RH(20),
  },
  title: {
    ...font('bold', 20),
  },
  searchContainer: {
    width: '100%',
    height: RH(40),
    borderWidth: RW(1),
    borderColor: '#28282833',
    paddingHorizontal: RW(10),
    justifyContent: 'center',
    marginBottom: RH(10),
    ...font('regular', 12),
  },
  search: {
    width: '100%',
    height: '100%',
  },
  searchIcon: {
    position: 'absolute',
    right: RW(10),
  },

  questionText: font('medium', 14),

  answerTitle: {
    ...font('bold', 30),
    textTransform: 'uppercase',
    marginBottom: RH(10),
  },
});
