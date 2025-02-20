import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ArrowTopSvg from '@screens/Search/assets/ArrowTopSvg';
import Row from '@theme/wrappers/row';
import {RH, font} from '@theme/utils';
import {useSelector} from 'react-redux';
import Colors from '@theme/colors';

const QuestionItem = ({item, active, setActiveAnswer}) => {
  const {currentLanguage} = useSelector(({main}) => main);
  const interpolatedArrowAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate:
            withTiming((active ? 180 : 0) + 'deg', {
              duration: 600,
            }) || '0deg',
        },
      ],
    };
  });
  return (
    <Pressable onPress={() => setActiveAnswer(item)}>
      <Row style={styles.questionRow}>
        <Text
          style={[styles.questionText, active && styles.activeQuestionText]}>
          {item?.['name_' + currentLanguage]}
        </Text>
        <Animated.View style={interpolatedArrowAnimation}>
          <ArrowTopSvg
            color={active ? Colors.red : '#28282888'}
            strokeWidth={1}
          />
        </Animated.View>
      </Row>
      <View style={styles.line} />
    </Pressable>
  );
};

export default QuestionItem;

const styles = StyleSheet.create({
  questionRow: {
    alignItems: 'center',
    paddingVertical: RH(10),
  },
  questionText: font('medium', 14),
  activeQuestionText: {
    color: Colors.red,
  },
  line: {
    width: '100%',
    height: RH(1),
    backgroundColor: '#28282833',
  },
  answerTitle: {
    ...font('bold', 30),
    textTransform: 'uppercase',
    marginBottom: RH(10),
  },
});
