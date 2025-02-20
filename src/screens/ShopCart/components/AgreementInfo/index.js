import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '@components/InnerHeader';
import {RH, RW, font} from '@theme/utils';
import Colors from '@theme/colors';
import Image from '@components/Image';
import Input from '@components/Input/Input';
import CheckSvg from '@assets/SVG/CheckSvg';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch} from 'react-redux';
import {setPending} from '@store/MainSlice';
import {PASSWORD, TOKEN, LOGIN} from '@env';
import {postCreditModal2} from '@store/CartSlice';
import ThanksModal from '../CartOrder/components/ThanksModal';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '@components/Modal';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AgreementInfo = props => {
  const {icon, activePaymentType, text, order_id, order_number, name} =
    props?.route?.params;
  const [passportNumber, setPassportNumber] = useState('');
  const [file, setFile] = useState(null);
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
  const [showCheckBoxInfo, setShowCheckBoxInfo] = useState(false);
  const [thanksModal, setThanksModal] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const hundleSubmit = () => {
    if (checkBox1 && checkBox2 && file && passportNumber) {
      dispatch(setPending(true));
      const sendData = new FormData();
      sendData.append('token', TOKEN);
      sendData.append('login', LOGIN);
      sendData.append('password', PASSWORD);
      sendData.append('credit_info_passport', passportNumber);
      sendData.append('image_uploads', file);
      sendData.append('image_uploads_0', file);
      sendData.append('order_id', order_id);
      sendData.append('img_count', 1);
      dispatch(
        postCreditModal2(sendData, e => {
          dispatch(setPending(false));
          setThanksModal(true);
        }),
      );
    }
  };

  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <>
      <ScrollView
        style={{paddingTop: insets.top}}
        contentContainerStyle={{paddingBottom: RH(140)}}>
        <Header title={t('cart')} />
        <View style={styles.wrapper}>
          {icon && <Image url={icon} style={styles.bankImg} />}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.textBlock}>
            <Text allowFontScaling={false} style={styles.text}>
              {activePaymentType == 'acba'
                ? 'ՀԱՄԱՁԱՅՆԱԳԻՐ Սույնով տալիս եմ իմ համաձայնությունը, որ. • «ԱԿԲԱ ԲԱՆԿ» ԲԲԸ-ն հարցումներ կատարի «ԱՔՌԱ Քրեդիտ Ռեփորթինգ» ՓԲԸ-ին և վերջինիս խնդրում եմ «ԱԿԲԱ ԲԱՆԿ» ԲԲԸ-ին տրամադրել իմ ներկա և անցյալ ֆինանսական պարտավորությունների վերաբերյալ տեղեկություններ, ինչպես նաև այլ տվյալներ, որոնք «ԱԿԲԱ ԲԱՆԿ» ԲԲԸ կողմից կարող են հաշվի առնվել ինձ հետ վարկային (փոխառության և այլն) պայմանագիր կնքելու վերաբերյալ որոշում կայացնելիս: • «ԱԿԲԱ ԲԱՆԿ» ԲԲԸ կողմից վարկային (փոխառության և այլն) պայմանագիր կնքելու դեպքում տվյալ վարկային (փոխառության և այլն) պայմանագրի գործողության ողջ ընթացքում, իսկ գլխավոր վարկային պայմանագրի առկայության դեպքում նաև վերջինիս գործողության ողջ ընթացքում ցանկացած պահի առանց ինձ նախապես տեղյակ պահելու «ԱՔՌԱ Քրեդիտ Ռեփորթինգ» ՓԲԸ-ն «ԱԿԲԱ ԲԱՆԿ» ԲԲԸ-ին տրամադրի իմ ապագա ֆինանսական պարտավորությունների վերաբերյալ տեղեկություններ, ինչպես նաև այլ տվյալներ: • «ԱԿԲԱ ԲԱՆԿ» ԲԲԸ-ն հարցում կատարի «Նորք» սոցիալական ծառայությունների տեխնոլոգիական և իրազեկման կենտրոն հիմնադրամին, և խնդրում եմ վերջինիս տրամադրել իմ վերաբերյալ ցանկացած տեղեկատվություն, որը կարող է կիրառվել Բանկի կողմից: • «ԱԿԲԱ ԲԱՆԿ» ԲԲԸ-ն սեփականության կամ ընդհանուր սեփականության իրավունքով ինձ պատկանող գույքերի վերաբերյալ հարցում կատարի ՀՀ կադաստրի կոմիտե և ստանա սպառիչ տեղեկատվություն իմ գույքային իրավունքների, այդ թվում` դրանց ծագման հիմքերի վերաբերյալ, ինչպես նաև կադաստրային գործից ստանա սեփականության իրավունքի վկայականի, հատակագծի և այլ անհրաժեշտ փաստաթղթերի պատճենները, իմ անունից դիմում ներկայացնի ՀՀ կադաստրի կոմիտե, կատարի անշարժ գույքի նկատմամբ ցանկացած իրավունքի պետական գրանցում, ստանա փաստաթղթեր,կատարի վճարումներ` մինչև իմ վարկային (փոխառության և այլն) պարտավորության լրիվ կատարումը: • «ԱԿԲԱ ԲԱՆԿ» ԲԲԸ-ն սեփականության կամ ընդհանուր սեփականության իրավունքով ինձ պատկանող տրանսպորտային միջոցների վերաբերյալ հարցում կատարի ՀՀ Ճանապարհային ոստիկանություն և ստանա սպառիչ տեղեկատվություն տրանսպորտային միջոցների նկատմամբ իմ գույքային իրավունքների, այդ թվում` դրանց ծագման հիմքերի վերաբերյալ, ինչպես նաև ստանա սեփականության իրավունքի վկայականի և այլ անհրաժեշտ փաստաթղթերի պատճենները` մինչև իմ վարկային (փոխառության և այլն) պարտավորության լրիվ կատարումը: • «ԱԿԲԱ ԲԱՆԿ» ԲԲԸ-ն հարցում կատարի «Հայաստանի ավտոապահովագրողների բյուրո» ԻԱՄ-ին և ապահովագրական ընկերություններին և ստանա ցանկացած տեղեկատվություն սեփականության իրավունքով ինձ պատկանող տրանսպորտային միջոցների ապահովագրության վերաբերյալ (այդ թվում՝ ապահովադրի և շահառուների վերաբերյալ տեղեկություններ)` մինչև իմ վարկային (փոխառության և այլն) պարտավորության լրիվ կատարումը: • «ԱԿԲԱ ԲԱՆԿ» ԲԲԸ կողմից ինձ ուղարկվեն ծանուցումներ` «ԱԿԲԱ ԲԱՆԿ» ԲԲԸ-ի կողմից մատուցվող ծառայությունների հետ կապված ցանկացած տեղեկատվության վերաբերյալ: • Սույնով ծանուցվում եմ, ինչպես նաև տալիս եմ իմ համաձայնությունը, որ «Անձնական տվյալների պաշտպանության մասին» ՀՀ օրենքի համաձայն՝ «ԱԿԲԱ ԲԱՆԿ» ԲԲԸ-ն (ՀՀ, ք. Երևան, Արամի 82-84) 50 տարվա ընթացքում հարցումներ կատարի «Էլեկտրոնային կառավարման ենթակառուցվածքների ներդրման գրասենյակ» ՓԲԸ (ԷԿԵՆԳ)` ՀՀ Ոստիկանության բնակչության պետական ռեգիստրի, ՀՀ Արդարադատության նախարարության քաղաքացիական կացության ակտերի գրանցման գործակալության, ՀՀ Ոստիկանության ճանապարհային ոստիկանության, ՀՀ ԱՆ Իրավաբանական անձանց պետական ռեգիստրի, ՀՀ Արդարադատության նախարարության հարկադիր կատարման ծառայության, ՀՀ ԿԱ Պետական եկամուտների կոմիտեի և ՀՀ կադաստրի կոմիտեի տվյալներից իմ վերաբերյալ ցանկացած տեղեկատվություն ստանալու նպատակով, որն օգտագործվելու և ուսումնասիրվելու է ծառայությունների մատուցման հետ կապված ցանկացած գործընթացում, ինչպես նաև իմ անձնական տվյալները «ԱԿԲԱ ԲԱՆԿ» ԲԲԸ-ի կողմից փոխանցվի «ԱՔՌԱ Քրեդիտ Ռեփորթինգ» ՓԲԸ, ՀՀ կենտրոնական բանկ, պետական իրավասու մարմիններ և այն իրավաբանական անձանց, որոնց կանոնադրական կապիտալում «ԱԿԲԱ ԲԱՆԿ» ԲԲԸ-ն ունի ուղղակի կամ անուղղակի մասնակցություն: Համաձայնությունը/անձնական տվյալները կարող են հետ կանչվել, ուղղվել, ոչնչացվել, իսկ տվյալների մշակումը՝ դադարեցվել իմ գրավոր դիմումի հիման վրա: Գիտակցում եմ, որ տրամադրված տեղեկությունները և տվյալները, կախված դրանց բովանդակությունից, կարող են ազդել «ԱԿԲԱ ԲԱՆԿ» ԲԲԸ կողմից կայացված համապատասխան որոշման վրա: Սույն համաձայնությունը կարդացել եմ և հավաստում եմ, որ այն ինձ համար ամբողջությամբ հասկանալի և ընդունելի է:'
                : activePaymentType == 'Uni'
                  ? 'ՀԱՄԱՁԱՅՆԱԳԻՐ Սույնով տալիս եմ իմ համաձայնությունը, որպեսզի «Յունիբանկ» ԲԲԸ-ի կողմից հարցում կատարվի «ԱՔՌԱ Քրեդիտ Ռեփորթինգ» ՓԲԸ-ին և վերջինիս խնդրում եմ «Յունիբանկ» ԲԲԸ-ին տրամադրել իմ ներկա և անցյալ ֆինանսական պարտավորությունների վերաբերյալ տեղեկություններ, ինչպես նաև այլ տվյալներ, որոնք «Յունիբանկ» ԲԲԸ-ի կողմից կարող են հաշվի առնվել ինձ հետ վարկային (փոխառության և այլն) պայմանագիր կնքելու վերաբերյալ որոշում կայացնելիս: Ինչպես նաև տալիս եմ իմ համաձայնությունը, որպեսզի «Յունիբանկ» ԲԲԸ-ի կողմից վարկային (փոխառության և այլն) պայմանագիր կնքելու դեպքում տվյալ վարկային (փոխառության և այլն) պայմանագրի գործողության ողջ ընթացքում ցանկացած պահին առանց ինձ նախապես տեղյակ պահելու «ԱՔՌԱ Քրեդիտ Ռեփորթինգ» ՓԲԸ-ն «Յունիբանկ» ԲԲԸ-ին տրամադրի իմ ապագա ֆինանսական պարտավորությունների վերաբերյալ տեղեկություններ, ինչպես նաև այլ տվյալներ: Գիտակցում եմ, որ տրամադրված տեղեկությունները և տվյալները, կախված դրանց բովանդակությունից կարող են ազդել «Յունիբանկ» ԲԲԸ-ի կողմից կայացված համապատասխան որոշման վրա: Սույն համաձայնությունը կարդացել եմ և հավաստում են, որ այն ինձ համար ամբողջությամբ հասկանալի և ընդունելի է:'
                  : activePaymentType == 'ineco'
                    ? 'ԱՊՐԱՆՔՆԵՐԻ ԵՎ/ԿԱՄ ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐԻ ԱՊԱՌԻԿ ԿԱՐԳՈՎ ՁԵՌՔԲԵՐՄԱՆ ՖԻՆԱՆՍԱՎՈՐՄԱՆ ՀԱՅՏ ԵՎ ՀԱՄԱՁԱՅՆՈՒԹՅՈՒՆ 1. Սույնով դիմում եմ ապառիկ կարգով ապրանք(ներ)ի և/կամ ծառայություն(ներ)ի ձեռքբերման նպատակով "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ-ի կողմից 30.000 – 5.000.000 ՀՀ դրամ գումարի սահմաններում ֆինանսավորում ստանալու համար՝ վերջինիս կողմից սահմանված պայմաններին համապատասխան: 2. Տեղեկացված եմ, որ "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ-ի կողմից սույն հայտի վերաբերյալ դրական կամ բացասական որոշում կայացնելու համար տեղեկատվության բավարար չլինելու դեպքում անհրաժեշտ է սույն հայտի ներկայացման պահից 3 (երեք) աշխատանքային օրվա ընթացքում ներկայանալ "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ՝ ներկայացնելով սույն հայտի՝ ինձ տրված մեկ օրինակը, ինչպես նաև իմ վարկարժանության ստուգման հետագա ընթացքի համար անհրաժեշտ փաստաթղթեր և տեղեկատվություն՝ ըստ պահանջի: Հասկանում և ընդունում եմ, որ սույն կետով սահմանված ժամկետում "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ չներկայանալու դեպքում սույն հայտը կմերժվի "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ-ի կողմից: 3. Տեղեկացված եմ, որ սույն հայտը մերժելու մասին որոշում կայացնելու դեպքում "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ-ն որոշման կայացման օրվանից առավելագույնը 2 (երկու) աշխատանքային օրվա ընթացքում այդ մասին գրավոր ձևով կհայտնի ինձ՝ "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ-ի տարածքում թղթային օրինակն առձեռն տրամադրելով: 4. Սույնով տալիս եմ իմ համաձայնությունը, որպեսզի "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ-ի կողմից հարցում կատարվի "ԱՔՌԱ Քրեդիտ Ռեփորթինգ" ՓԲԸ և վերջինիս խնդրում եմ "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ-ին տրամադրել իմ ներկա և անցյալ ֆինանսական պարտավորությունների վերաբերյալ տեղեկություններ, ինչպես նաև այլ տվյալներ, որոնք "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ-ի կողմից կարող են հաշվի առնվել ինձ հետ վարկային (փոխառության և այլն) պայմանագիր կնքելու վերաբերյալ որոշում կայացնելիս։ Ինչպես նաև տալիս եմ իմ համաձայնությունը, որպեսզի "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ-ի կողմից վարկային (փոխառության և այլն) պայմանագիր կնքելու դեպքում տվյալ վարկային (փոխառության և այլն) պայմանագրի գործողության ողջ ընթացքում ցանկացած պահին` առանց ինձ նախապես տեղյակ պահելու, "ԱՔՌԱ Քրեդիտ Ռեփորթինգ" ՓԲԸ-ն "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ-ին տրամադրի իմ ապագա ֆինանսական պարտավորությունների վերաբերյալ տեղեկություններ, ինչպես նաև այլ տվյալներ։ Գիտակցում եմ, որ տրամադրված տեղեկությունները և տվյալները, կախված դրանց բովանդակությունից կարող են ազդել "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ-ի կողմից կայացված համապատասխան որոշման վրա։ Սույն համաձայնությունը կարդացել եմ և հավաստում եմ, որ այն ինձ համար ամբողջությամբ հասկանալի և ընդունելի է։ 5. Սույնով հաստատում եմ, որ սույն փաստաթղթի նախորդ կետով իմ կողմից տրված համաձայնությունն ամբողջ ծավալով տարածվում է նաև ՀՀ կենտրոնական բանկի վարկային ռեգիստրի, "ՆՈՐՔ" սոցիալական ծառայությունների տեխնոլոգիական և իրազեկման կենտրոն հիմնադրամի, հանրային տվյալների բազաների, "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ-ի հետ համագործակցող վարկային բյուրոների և բանկային սպասարկման ոլորտում հաճախորդների վերաբերյալ տվյալներ մշակող անձանց կողմից "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ-ին իմ ներկա և անցյալ ֆինանսական պարտավորությունների (իսկ "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ-ի հետ վարկային (փոխառության և այլն) պայմանագիր կնքվելու դեպքում նաև՝ ապագա ֆինանսական պարտավորությունների) վերաբերյալ տեղեկությունների, ինչպես նաև այլ տվյալների տրամադրման վրա՝ ինչպես սույն համաձայնության տրամադրման պահին, այնպես էլ "ԻՆԵԿՈԲԱՆԿ" ՓԲԸ-ի հետ վարկային (փոխառության և այլն) պայմանագիր կնքելու դեպքում տվյալ վարկային (փոխառության և այլն) պայմանագրի գործողության ողջ ընթացքում:'
                    : // :
                      // activePaymentType == 'evoca'
                      //   ? 'Օնլայն ապառիկ Ապառիկ վարկավորման հիմնական պայմաններ Ծանոթացեք պայմաններին և սեղմեք "Սկսել գործընթացը" կոճակը: Վարկի համար կարող են դիմել 21 տարին լրացած ՀՀ ռեզիդենտները, որոնց տարիքը վարկի սպասարկման ընթացքում չի գերազանցի 63 տարեկանը: Վարկի տրամադրման ժամկետ 24 ամիս Վարկավորման գումար 100000.0 ՀՀ դրամից մինչև 3000000.0 ՀՀ դրամ Վարկի տրամադրման եղանակ անկանխիկ Գնորդի միջնորդավճար (հաշվարկվում է վարկի սկզբնական մայր գումարի վրա) 0% ամսական Վարկի անվանական տոկոսադրույք 21.5% Կանխավճար 0 ՀՀ դրամ Համաձայն եմ պայմաններին Համաձայն եմ, որ «Էվոկաբանկ» ՓԲԸ-ն հարցումներ կատարի և ստանա տեղեկություններ «Նորք» սոցիալական ծառայությունների տեխնոլոգիական և իրազեկման կենտրոն հիմնադրամից, «Էլեկտրոնային կառավարման ենթակառուցվածքների ներդրման գրասենյակ» (ԷԿԵՆԳ) ՓԲԸ-ից և «ԱՔՌԱ Քրեդիտ Ռեփորթինգ» ՓԲԸ-ի կողմից'
                      null}
            </Text>
          </ScrollView>
          <Text allowFontScaling={false} style={styles.orderNumber}>
            {t('order_num') + ' ' + order_number}
          </Text>
          <Text allowFontScaling={false} style={styles.orderNumber}>
            {name}
          </Text>
          <Input
            value={passportNumber}
            onChange={e => setPassportNumber(e)}
            placeholder={t('passport')}
            inputStyle={{backgroundColor: '#fff'}}
          />
          <Pressable
            onPress={() => setCheckBox1(!checkBox1)}
            style={styles.checkBoxContainer}>
            <View style={styles.checkbox}>{checkBox1 && <CheckSvg />}</View>
            <Text allowFontScaling={false} style={styles.checkBoxText}>
              {t('i_have_read')}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setCheckBox2(!checkBox2)}
            style={styles.checkBoxContainer}>
            <View style={styles.checkbox}>{checkBox2 && <CheckSvg />}</View>
            <Text allowFontScaling={false} style={styles.checkBoxText}>
              Ծանոթացել եմ հարցման ազդեցությանը
            </Text>
            <Pressable onPress={() => setShowCheckBoxInfo(!showCheckBoxInfo)}>
              <Text
                allowFontScaling={false}
                style={styles.checkBoxTextUnderline}>
                վարկային ամփոփ գնահատականի վրա
              </Text>
            </Pressable>
          </Pressable>
          {showCheckBoxInfo && (
            <View style={styles.checkBoxInfo}>
              <Text allowFontScaling={false} style={styles.checkBoxInfoTitle}>
                Վարկային ամփոփ գնահատական
              </Text>
              <Text
                allowFontScaling={false}
                style={styles.checkBoxInfoDescription}>
                Տեղեկացնում ենք, որ Ձեր կողմից ներկայացված վարկային դիմումների
                քանակը բացասական ազդեցություն է ունենում Ձեր վարկային ամփոփ
                գնահատականի, մասնավորապես, ՖԱՅԿՈ սքոր գնահատականի վրա։
              </Text>
            </View>
          )}
          <Text allowFontScaling={false} style={styles.addPhotoText}>
            {t('upload_photo')}
          </Text>
          <Pressable
            onPress={() => {
              DocumentPicker.pick({}).then(e => {
                setFile({
                  uri: e[0].uri,
                  name: e[0].name,
                  type: e[0].type,
                });
              });
            }}
            style={styles.addPhotoBtn}>
            <Text allowFontScaling={false} style={styles.addPhotoBtnText}>
              {t('download_file')}
            </Text>
          </Pressable>
          {file?.name && (
            <Text allowFontScaling={false} style={styles.mainText}>
              {file?.name}
            </Text>
          )}
          <View>
            <Text allowFontScaling={false} style={styles.mainText}>
              Քայլ 1
            </Text>
            <Text allowFontScaling={false} style={styles.mainText}>
              Նկարում եք Ձեր անձնագիրը և սոց. քարտը ՝ որտեղ հստակ ընթեռնելի
              կերևա անձնագրի գլխավոր էջը(նկարով), վավերականության ժամկետը,
              գրանցման հասցենները, կամ նույնականացման քարտը(ID) 2 կողմից
            </Text>
            <Text allowFontScaling={false} style={styles.mainText}>
              Քայլ 2
            </Text>
            <Text allowFontScaling={false} style={styles.mainText}>
              Լուսանկարում եք Ձեզ անձնագրի հետ միասին
            </Text>
            <Text allowFontScaling={false} style={styles.mainText}>
              Քայլ 3
            </Text>
            <Text allowFontScaling={false} style={styles.mainText}>
              Այնուհետև բոլոր նկարները ուղարկում եք aparik@vlv.am էլ. հասցեին
              կամ ուղարկեք Viber, WhatsApp +37496018166 կամ +374 91 767117
              համարին։
            </Text>
          </View>
          <Pressable
            style={[
              styles.sendBtn,
              !(checkBox1 && checkBox2 && file && passportNumber) &&
                styles.disableBtn,
            ]}
            onPress={hundleSubmit}>
            <Text allowFontScaling={false} style={styles.sendBtnText}>
              {t('send')}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      <CustomModal
        visible={thanksModal}
        dismiss={() => {
          setThanksModal(false);
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Home',
              },
            ],
          });
        }}>
        <ThanksModal
          dismiss={() => {
            setThanksModal(false);
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Home',
                },
              ],
            });
          }}
        />
      </CustomModal>
    </>
  );
};

export default AgreementInfo;

const styles = StyleSheet.create({
  wrapper: {
    margin: RW(16),
    backgroundColor: Colors.bgGray,
    padding: RW(15),
    rowGap: RH(20),
  },
  bankImg: {
    width: RW(300),
    height: RH(100),
  },
  textBlock: {
    height: RH(300),
  },
  text: font('regular', 14, 'rgba(40,40,40,.7)', 18),
  orderNumber: {
    ...font('bold', 16),
    textTransform: 'uppercase',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    columnGap: RW(5),
    width: '100%',
    flexWrap: 'wrap',
  },
  checkbox: {
    width: RW(16),
    height: RW(16),
    borderColor: 'rgba(40,40,40,.6)',
    borderWidth: RW(1),
    borderRadius: RW(4),
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: RW(2),
  },
  checkBoxText: {
    ...font('regular', 14, '#7e7e7e'),
  },
  checkBoxTextUnderline: {
    ...font('regular', 14, Colors.red),
    textDecorationLine: 'underline',
  },
  checkBoxInfoTitle: {
    ...font('bold', 24),
    alignSelf: 'center',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginVertical: RH(20),
  },
  checkBoxInfoDescription: {
    ...font('medium', 14, 'rgba(40,40,40,.6)'),
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: RW(30),
    marginBottom: RH(20),
  },
  addPhotoText: font('regular', 18, 'rgba(40,40,40,.7)'),
  addPhotoBtn: {
    backgroundColor: '#282828',
    paddingHorizontal: 50,
    paddingVertical: RW(20),
    alignSelf: 'flex-start',
    borderRadius: RW(10),
  },
  addPhotoBtnText: {
    ...font('regular', 16, '#fff'),
  },
  mainText: {
    ...font('regular', 14),
    marginVertical: RH(2),
  },
  sendBtn: {
    backgroundColor: Colors.red,
    alignItems: 'center',
    paddingVertical: RH(20),
    borderRadius: RW(10),
  },
  sendBtnText: font('regular', 16, '#fff'),
  disableBtn: {
    opacity: 0.6,
  },
});
