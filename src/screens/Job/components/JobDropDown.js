import {
  Animated,
  Dimensions,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Row from '@theme/wrappers/row';
import {RH, RW, font} from '@theme/utils';
import Colors from '@theme/colors';
import RenderHTML from 'react-native-render-html';
import MinusSvg from '../assets/MinusSvg';
import PlusSvg from '../assets/PlusSvg';
import DocumentPicker from 'react-native-document-picker';
import Button from '@components/Button/Button';
import {useDispatch} from 'react-redux';
import {postJobPageCV} from '@store/MainSlice';
import {useTranslation} from 'react-i18next';

const screenWidth = Dimensions.get('screen').width;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const JobDropDown = ({title, body, id, open, setOpen}) => {
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const dropdownHeight = open ? 'auto' : 0;
  // const dropdownOpacity = open ? 1 : 0;

  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          if (open) {
            setOpen(null);
          } else {
            setOpen(id);
          }
        }}>
        <Row style={styles.header}>
          {title ? (
            <Text allowFontScaling={false} style={styles.title}>
              {title}
            </Text>
          ) : icon ? (
            icon
          ) : (
            <View />
          )}
          <View>{open ? <MinusSvg /> : <PlusSvg />}</View>
        </Row>
      </Pressable>
      <Animated.View
        style={{
          overflow: 'hidden',
          height: dropdownHeight,
        }}>
        <RenderHTML
          contentWidth={screenWidth}
          source={{
            html: body,
          }}
          tagsStyles={{
            body: {
              color: Colors.black,
            },
          }}
        />
        <Button
          style={styles.btn}
          red={false}
          text={file?.name || t('attach_cv')}
          onPress={() => {
            DocumentPicker.pick({
              type: [
                DocumentPicker.types.pdf,
                DocumentPicker.types.doc,
                DocumentPicker.types.docx,
                DocumentPicker.types.xls,
                DocumentPicker.types.xlsx,
              ],
            }).then(e => {
              setFile({
                uri: e[0].uri,
                name: e[0].name,
                type: e[0].type,
              });
            });
          }}
        />
        {!!Object.keys(file || {}).length && (
          <Button
            style={styles.btn}
            text={t('send')}
            onPress={() => {
              dispatch(
                postJobPageCV({
                  ...file,
                  id,
                }),
              );
            }}
          />
        )}
      </Animated.View>
    </View>
  );
};

export default JobDropDown;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: RW(15),
    overflow: 'hidden',
    borderColor: '#eee',
    borderWidth: RW(1),
    backgroundColor: Colors.bgGray,
    paddingHorizontal: RW(20),
    paddingVertical: RW(25),
    marginVertical: RH(10),
  },
  title: {
    ...font('bold', 14),
  },
  btn: {
    marginTop: RH(10),
  },
});
