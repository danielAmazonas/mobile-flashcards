import React from 'react'
import {
  View,
  StatusBar,
} from 'react-native'
import { Constants } from 'expo'

export function MobileFlashcardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
  )
}