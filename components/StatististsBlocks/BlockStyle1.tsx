import { View, Text } from 'react-native'
import { StatisticsBlockProps } from "./styles"
import { SIZES } from '../../constants/Theme'
import { formatMoney } from '../../utils'

export default function StatisticsBlock({ title, salaryValue, salaryCurrency, salaryPeriod, Icon }: StatisticsBlockProps) {

  return (
    <View style={{
      width: SIZES.width * 0.3,
      elevation: 3,
      borderRadius: SIZES.base,
      paddingHorizontal: SIZES.base,
    }}>
      <Text style={{ paddingVertical: SIZES.base }}>{title}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Icon />
        <Text style={{ fontWeight: 'bold', fontSize: SIZES.h3, marginLeft: SIZES.base, width: '70%'  }}>{formatMoney(salaryValue, 0)}</Text>
      </View>
      <Text style={{ fontStyle: 'italic', paddingVertical: SIZES.base }}>{salaryCurrency} / {salaryPeriod}</Text>
    </View>
  )
}