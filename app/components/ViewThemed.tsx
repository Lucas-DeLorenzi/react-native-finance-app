import * as React from "react"
import { useColorScheme, ViewProps } from "react-native"
import { observer } from "mobx-react-lite"
import Animated, {AnimateProps} from "react-native-reanimated"

export interface ViewThemedProps extends AnimateProps<ViewProps> {}

export const ViewThemed = observer(function ViewThemed(props: ViewThemedProps) {
  const { style, ...otherProps } = props
  const colorScheme = useColorScheme()
  const $styles = [{ backgroundColor: colorScheme === "light" ? "white" : "#2F2E33" }, style]

  return <Animated.View style={$styles} {...otherProps} />
})
