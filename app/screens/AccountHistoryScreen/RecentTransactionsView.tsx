import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { typography } from "../../theme"
import { TransactionListItem } from "../../components/TransactionListItem"
import { Icon, TextThemed, ViewThemed } from "../../components"
import { useAppStackNavigation } from "../../navigators"
import { useColorSchemeStyle } from "../../theme/useColorSchemeStyle"
import { TransactionDTO } from "../../services/api"
import Animated, { FadeIn, FadeInUp, FadeOut } from "react-native-reanimated"

export interface RecentTransactionsViewProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  transactions: TransactionDTO[]
}

export const RecentTransactionsView = observer(function RecentTransactionsView(
  props: RecentTransactionsViewProps,
) {
  const { style, transactions } = props
  const $styles = [$container, style]

  const AnimatedViewTheme = Animated.createAnimatedComponent(ViewThemed)

  const navigation = useAppStackNavigation()
  const openTransactionList = () => navigation.navigate("TransactionList")

  const $transactionsListItemDividerStyle = useColorSchemeStyle({
    light: $transactionsListItemDivider,
    dark: [$transactionsListItemDivider, $transactionsListItemDividerDark],
  })

  return (
    <AnimatedViewTheme style={$styles} entering={FadeIn} exiting={FadeOut}>
      <View style={$transactionsHeader}>
        <TextThemed style={$transactionsHeaderText}>Recent transactions</TextThemed>
        <TouchableOpacity style={$transactionsFilterButton} onPress={openTransactionList}>
          <Icon size={18} color="white" icon="filter" />
        </TouchableOpacity>
      </View>
      <View style={$transactionsList}>
        {transactions.map((transaction, index) => {
          const isLastItem = index === transactions.length - 1
          const isFirstItem = index === 0

          return (
            <React.Fragment key={transaction.id}>
              {isFirstItem ? (
                <>
                  <TransactionListItem transaction={transaction} />
                  {!isLastItem && <View style={$transactionsListItemDividerStyle} />}
                </>
              ) : (
                <Animated.View entering={FadeInUp}>
                  <TransactionListItem transaction={transaction} />
                  {!isLastItem && <View style={$transactionsListItemDividerStyle} />}
                </Animated.View>
              )}
            </React.Fragment>
          )
        })}
      </View>
    </AnimatedViewTheme>
  )
})

const $container: ViewStyle = {
  borderRadius: 25,
  paddingHorizontal: 22,
  paddingTop: 20,
  paddingBottom: 30,
}

const $transactionsHeader: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
const $transactionsHeaderText: TextStyle = {
  fontFamily: typography.primary.semiBold,
  fontSize: 17,
  lineHeight: 21,
  flex: 1,
}
const $transactionsFilterButton: ViewStyle = {
  backgroundColor: "#523CF8",
  width: 30,
  height: 30,
  borderRadius: 15,
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
}
const $transactionsList: ViewStyle = {
  marginTop: 22,
}

const TRANSACTION_LIST_ITEM_TYPE_WIDTH = 30
const TRANSACTION_LIST_ITEM_TYPE_MARGIN = 15
const $transactionsListItemDivider: ViewStyle = {
  marginLeft: TRANSACTION_LIST_ITEM_TYPE_WIDTH + TRANSACTION_LIST_ITEM_TYPE_MARGIN,
  marginTop: 13,
  marginBottom: 15,
  height: 1,
  backgroundColor: "#DCDCDC",
}
const $transactionsListItemDividerDark: ViewStyle = {
  backgroundColor: "#646464",
}
