import React, { FC, useCallback } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ListRenderItem, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text, TextThemed } from "../components"
import { AccountDTO, api, TransactionDTO } from "../services/api"
import { useState } from "react"
import { useEffect } from "react"
import { TransactionListItem } from "../components/TransactionListItem"
import { useLayoutEffect } from "react"
import { format } from "date-fns"
import { typography } from "../theme"
import { useColorSchemeStyle } from "../theme/useColorSchemeStyle"

type TransactionListItem =
  | { type: "month"; payload: string }
  | { type: "transaction"; payload: TransactionDTO }

export const TransactionListScreen: FC<AppStackScreenProps<"TransactionList">> = observer(
  function TransactionListScreen(props) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    const { route } = props

    const [transactions, setTransactions] = useState<TransactionDTO[]>([])

    const fetchTransactions = async (accountId: AccountDTO["id"]) => {
      const { data = [] } = await api.getTransactions(accountId, {
        offset: transactions.length,
        size: 50,
      })

      setTransactions([...transactions, ...data])
    }

    useEffect(() => {
      fetchTransactions(route.params.accountId)
    }, [route.params.accountId])

    let currentMonth: string
    const data = transactions?.reduce<TransactionListItem[]>((result, item) => {
      const transactionMonth = format(new Date(item.dateTime), "MMMM, yyyy")
      if (result.length === 0 || transactionMonth !== currentMonth) {
        currentMonth = transactionMonth
        result.push({ type: "month", payload: transactionMonth })
      }
      result.push({ type: "transaction", payload: item })
      return result
    }, [])

    const renderItem = useCallback(({ item }) => {
      if (item.type === "month") {
        return (
          <View style={$transactionsListSection}>
            <TextThemed style={$transactionsListSectionHeader}>{item.payload}</TextThemed>
          </View>
        )
      }
      return <TransactionListItem style={$transactionsListItem} transaction={item.payload} />
    }, [])

    const keyExtractor = useCallback((_, index) => index.toString(), [])

    const $containerThemed = useColorSchemeStyle({
      light: $containerLight,
      dark: $containerDark,
    })

    return (
      <Screen contentContainerStyle={[$container, $containerThemed]}>
        <FlatList
          style={$transactionsList}
          data={data || []}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          removeClippedSubviews
          onEndReached={() => {
            console.log("onEndReached")
            fetchTransactions(route.params.accountId)
          }}
        />
      </Screen>
    )
  },
)

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: 12,
}
const $containerLight: ViewStyle = {
  backgroundColor: "white",
}
const $containerDark: ViewStyle = {
  backgroundColor: "#16110D",
}

const $transactionsList: ViewStyle = {
  flex: 1,
}
const $transactionsListItem: ViewStyle = {
  marginTop: 22,
}
const $transactionsListSection: ViewStyle = {
  marginTop: 26,
}
const $transactionsListSectionHeader: TextStyle = {
  fontFamily: typography.fonts.montserrat.normal,
  fontSize: 15,
  lineHeight: 18,
}
