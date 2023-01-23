import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { typography } from "../theme"
import { Text } from "./Text"
import { Icon, IconTypes } from "./Icon"
import { TextThemed } from "./TextThemed"
import { TransactionDTO } from "../services/api"
import { formatMoney } from "../utils/formatMoney"

export interface TransactionListItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  transaction: TransactionDTO
}

const getTransactionIconType = (transaction: TransactionDTO): IconTypes => {
  switch (transaction.type) {
    case "auto":
      return "transactionAuto"
    case "food":
      return "transactionFood"
    case "house":
      return "transactionHouse"
    case "transfer":
      return "transactionTransfer"
    case "travel":
      return "transactionTravel"
  }
}

export const TransactionListItem = observer(function TransactionListItem(
  props: TransactionListItemProps,
) {
  const { style, transaction } = props
  const $styles = [$transaction, style]

  const iconType = getTransactionIconType(transaction)

  return (
    <View style={$styles}>
      <View style={$transactionType}>
        <Icon icon={iconType} size={18} color="white" />
      </View>
      <View style={$transactionSummary}>
        <TextThemed style={$transactionTitle} numberOfLines={1}>
          {transaction.targetName}
        </TextThemed>
        <TextThemed style={$transactionDateTime} variant="secondary">
          {transaction.dateTime}
        </TextThemed>
      </View>
      <View style={$transactionValue}>
        <Text
          style={[
            $transactionAmount,
            transaction.amount > 0 ? $transactionAmountPlus : $transactionAmountMinus,
          ]}
        >
          {`${transaction.amount > 0 ? "+" : ""}`}
          {formatMoney(transaction.amount)}
        </Text>
        <TextThemed style={$transactionCurrency} variant="secondary">
          {transaction.currency.name}
        </TextThemed>
      </View>
    </View>
  )
})

const $transaction: ViewStyle = {
  flexDirection: "row",
}

const $transactionType: ViewStyle = {
  backgroundColor: "#F76654",
  width: 30,
  height: 30,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  marginRight: 15,
  flexShrink: 0,
}

const $transactionSummary: ViewStyle = {
  flex: 1,
}
const $transactionValue: ViewStyle = {
  flexShrink: 0,
}

const $transactionTitle: TextStyle = {
  fontFamily: typography.primary.semiBold,
  fontSize: 12,
  lineHeight: 15,
}
const $transactionDateTime: TextStyle = {
  marginTop: 2,
  fontFamily: typography.primary.semiBold,
  fontSize: 11,
  lineHeight: 13,
}
const $transactionAmount: TextStyle = {
  fontFamily: typography.primary.semiBold,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "right",
}
const $transactionAmountPlus: TextStyle = {
  color: "#523CF8",
}
const $transactionAmountMinus: TextStyle = {
  color: "#F76654",
}
const $transactionCurrency: TextStyle = {
  marginTop: 2,
  fontFamily: typography.primary.semiBold,
  fontSize: 11,
  lineHeight: 13,
  textAlign: "right",
}
