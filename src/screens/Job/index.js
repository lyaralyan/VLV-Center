import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '@components/Header';
import HeaderCategories from '@components/HeaderCategories';
import SearchInput from '@screens/Home/components/SearchInputNew/SearchInput';
import {RH, RW, font} from '@theme/utils';
import {useDispatch, useSelector} from 'react-redux';
import {getJobPageData} from '@store/MainSlice';
import Image from '@components/Image';
import JobDropDown from './components/JobDropDown';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Job = () => {
  const [openId, setOpenId] = useState();
  const {currentLanguage, jobPageData} = useSelector(({main}) => main);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!jobPageData) {
      dispatch(getJobPageData());
    }
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
        <Image
          style={styles.banner}
          url={jobPageData?.baner?.['image_' + currentLanguage]}
        />
      </View>
      <View style={styles.main}>
        {jobPageData?.jobs?.map((item, index) => (
          <JobDropDown
            key={index}
            open={openId == item.id}
            setOpen={setOpenId}
            id={item.id}
            title={item['name_' + currentLanguage]}
            body={item['job_' + currentLanguage]}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Job;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: RW(16),
  },
  banner: {
    width: '100%',
    height: 'auto',
    aspectRatio: '3.2/1',
    marginBottom: RH(20),
  },
  main: {},
});
