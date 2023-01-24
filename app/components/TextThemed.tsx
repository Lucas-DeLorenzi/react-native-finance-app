import * as React from "react"
import { TextProps, TextStyle, useColorScheme } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "./Text"

export interface TextThemedProps extends TextProps {
  variant?: "primary" | "secondary"
}

export const TextThemed = React.memo(observer(function TextThemed(props: TextThemedProps) {
  const { style, variant = "primary", ...otherProps } = props
  const colorScheme = useColorScheme()

  const styles = {
    primary: {
      light: $textPrimaryLight,
      dark: $textPrimaryDark,
    },
    secondary: {
      light: $textSecondaryLight,
      dark: $textSecondaryDark,
    },
  } as const

  const $styles = [colorScheme ? styles[variant][colorScheme] : null, style]

  return <Text style={$styles} {...otherProps} />
}))

export const $textPrimaryLight: TextStyle = {
  color: "#16110D",
}

export const $textPrimaryDark: TextStyle = {
  color: "#FEFEFE",
}

export const $textSecondaryLight: TextStyle = {
  color: "#C4C4C4",
}

export const $textSecondaryDark: TextStyle = {
  color: "#646464",
}
