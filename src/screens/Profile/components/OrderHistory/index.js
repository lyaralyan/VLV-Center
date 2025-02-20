import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from 'react-native-table-component';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {RH, RW, font} from '@theme/utils';
import Colors from '@theme/colors';

const data = [
  {
    id: 1,
    method: 'ՎՃԱՐԵԼ ՏԵՂՈՒՄ ԿԱՆԽԻԿ ԿԱՄ Բանկային քարտով ',
    name_en: 'PAY ON THE SPOT IN CASH OR By bank card',
    name_hy: 'ՎՃԱՐԵԼ ՏԵՂՈՒՄ ԿԱՆԽԻԿ ԿԱՄ Բանկային քարտով',
    name_ru: 'Оплата наличными или банковской картой на месте',
    type: 'System',
    active_status: 1,
    module_status: 1,
    logo: 'payment_gateway/cache.png',
    created_by: 1,
    updated_by: 1,
    created_at: '2022-09-02 22:04:37',
    updated_at: '2022-11-21 18:01:52',
  },
  {
    id: 15,
    method: 'IDram',
    name_en: 'IDram',
    name_hy: 'IDram',
    name_ru: 'IDram',
    type: 'System',
    active_status: 1,
    module_status: 1,
    logo: 'payment_gateway/idram.png',
    created_by: 1,
    updated_by: 1,
    created_at: '2022-09-08 12:52:25',
    updated_at: '2023-07-05 16:42:34',
  },
  {
    id: 16,
    method: 'Telcell Wallet',
    name_en: 'Telcell Wallet',
    name_hy: 'Telcell դրամապանակ',
    name_ru: 'Telcell кошелек',
    type: 'System',
    active_status: 1,
    module_status: 1,
    logo: 'payment_gateway/telcell.png',
    created_by: 1,
    updated_by: 1,
    created_at: null,
    updated_at: null,
  },
  {
    id: 17,
    method: 'AMERICAN EXPRESS & MIR',
    name_en: 'AMERICAN EXPRESS & MIR',
    name_hy: 'AMERICAN EXPRESS & MIR',
    name_ru: 'AMERICAN EXPRESS & MIR',
    type: 'System',
    active_status: 1,
    module_status: 1,
    logo: 'payment_gateway/express_mir.svg',
    created_by: 1,
    updated_by: 1,
    created_at: null,
    updated_at: null,
  },
  {
    id: 18,
    method: 'Օնլայն ապառիկ',
    name_en: 'Online credit',
    name_hy: 'Օնլայն ապառիկ',
    name_ru: 'Онлайн кредит',
    type: 'System',
    active_status: 1,
    module_status: 1,
    logo: 'payment_gateway/online_aparic.png',
    created_by: 1,
    updated_by: 1,
    created_at: null,
    updated_at: null,
  },
  {
    id: 19,
    method: 'Բանկային քարտով',
    name_en: 'By bank card',
    name_hy: 'Բանկային քարտով',
    name_ru: 'Банковской картой',
    type: 'System',
    active_status: 1,
    module_status: 1,
    logo: 'payment_gateway/bank_cart.png',
    created_by: 1,
    updated_by: 1,
    created_at: null,
    updated_at: null,
  },
  {
    id: 20,
    method: 'ՎՃԱՐԵԼ ՀԱՇՎԻ ԱՊՐԱՆՔԱԳՐՈՎ',
    name_en: 'PAY BY INVOICE',
    name_hy: 'ՎՃԱՐԵԼ ՀԱՇՎԻ ԱՊՐԱՆՔԱԳՐՈՎ',
    name_ru: 'ОПЛАТИТЬ ПО СЧЕТУ',
    type: 'System',
    active_status: 1,
    module_status: 1,
    logo: 'payment_gateway/invoice.png',
    created_by: 1,
    updated_by: 1,
    created_at: null,
    updated_at: null,
  },
  {
    id: 21,
    method: 'Վճարում բոնուսներով',
    name_en: 'Payment with bonuses',
    name_hy: 'Վճարում բոնուսներով',
    name_ru: 'Оплата бонусами',
    type: 'System',
    active_status: 1,
    module_status: 1,
    logo: 'payment_gateway/bonus.png',
    created_by: 1,
    updated_by: 1,
    created_at: null,
    updated_at: null,
  },
  {
    id: 22,
    method: 'Easy pay',
    name_en: 'Easy pay\r\n',
    name_hy: 'Easy pay\r\n',
    name_ru: 'Easy pay\r\n',
    type: 'System',
    active_status: 1,
    module_status: 1,
    logo: 'payment_gateway/easypay.png',
    created_by: 1,
    updated_by: 1,
    created_at: null,
    updated_at: null,
  },
];

const OrderHistory = () => {
  const history = useSelector(
    ({user}) => user?.userInfo?.recent_order_products,
  );
  const {t} = useTranslation();
  const currentLanguage = useSelector(({main}) => main.currentLanguage);

  const tableHead = [
    t('refund_order.number'),
    t('date'),
    t('total'),
    t('payment_method'),
    t('status'),
    t('payment_status'),
  ];

  const columnWidths = [RW(135), RW(100), RW(100), RW(300), RW(110), RW(170)];

  const tableData = history?.map(item => {
    const paymentMethod = data.find(
      method => method.id === item?.order?.payment_type,
    );

    const {
      is_cancelled,
      is_completed,
      is_confirmed,
      is_paid,
      created_at,
      order_number,
      grand_total,
    } = item?.order || {};

    return [
      order_number || '',
      created_at ? new Date(created_at).toLocaleDateString() : '',
      grand_total || 0,
      paymentMethod?.['name_' + currentLanguage] || '',
      is_confirmed === 0 && is_completed === 0
        ? t('pending')
        : is_confirmed === 1 && is_paid === 1
          ? t('is_confirmed')
          : is_cancelled === 1 && is_confirmed === 2
            ? t('is_cancelled')
            : t('is_cancelled'),
      is_paid === 1 ? t('is_paid') : t('not_paid'),
    ];
  });

  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.title}>
        {t('order_history')}
      </Text>
      <ScrollView horizontal>
        <View>
          <Table style={{gap: 5}}>
            <Row
              data={tableHead}
              style={styles.header}
              textStyle={styles.itemText}
              widthArr={columnWidths}
            />

            {tableData?.map((rowData, index) => (
              <TableWrapper key={index} style={styles.rowWrapper}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={cellData}
                    style={[
                      styles.cell,
                      {
                        width: columnWidths[cellIndex],
                        backgroundColor: Colors.bgGray,
                        borderRadius: 10,
                      },
                    ]}
                    textStyle={styles.rowText}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: RH(30),
    alignItems: 'center',
  },
  title: {
    ...font('medium', 22),
    marginBottom: RH(20),
    textAlign: 'left',
  },
  header: {
    height: RH(40),
    backgroundColor: Colors.bgGray,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: RW(2),
    columnGap: 5,
  },
  itemText: {
    ...font('medium', 12),
    textAlign: 'left',
    paddingVertical: RH(5),
  },
  rowWrapper: {
    flexDirection: 'row',
    height: RH(40),
    columnGap: 5,
  },
  cell: {
    justifyContent: 'center',
  },
  rowText: {
    ...font('regular', 12),
    textAlign: 'left',
    borderRadius: 15,
    paddingHorizontal: RW(2),
  },
});
