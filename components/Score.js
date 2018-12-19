import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import {
  white,
  saddlebrown,
  cornsilk,
  darkgreen,
  orange,
  darkorange,
  indigo,
  purple,
} from '../utils/colors'
import { LinearGradient } from 'expo'
import PropTypes from 'prop-types'
import { EvilIcons } from '@expo/vector-icons'

class Score extends Component {

  static propTypes = {
    points: PropTypes.number.isRequired,
    resetPosition: PropTypes.func.isRequired,
    setModalPointsVisible: PropTypes.func.isRequired,
    setModalPlayVisible: PropTypes.func.isRequired,
    modalPointsVisible: PropTypes.bool.isRequired,
    modalPlayVisible: PropTypes.bool.isRequired,
  }

  render() {
    const {
      points,
      resetPosition,
      setModalPointsVisible,
      setModalPlayVisible,
      modalPointsVisible,
      modalPlayVisible,
    } = this.props

    return (
      <LinearGradient style={styles.modalContainer} colors={[saddlebrown, cornsilk]}>
        <View>
          <Text style={styles.titleAddQuestion}>SCORE:</Text>
          <View style={styles.containerPoints}>
            <Text style={styles.points}>
              {points}
            </Text>
          </View>
        </View>
        <View style={styles.buttonsModal}>
          <TouchableOpacity style={styles.buttonRefresh} onPress={() => { resetPosition(), setModalPointsVisible(!modalPointsVisible) }}>
            <EvilIcons
              name='refresh'
              style={styles.textButton}
            />
          </TouchableOpacity>
          <Text>
            {'   '}
          </Text>
          <TouchableOpacity style={styles.buttonHome} onPress={() => { resetPosition(), setModalPointsVisible(!modalPointsVisible), setModalPlayVisible(!modalPlayVisible) }}>
            <EvilIcons
              name='arrow-up'
              style={styles.textButton}
            />
          </TouchableOpacity>
          <Text>
            {'   '}
          </Text>
          <TouchableOpacity style={styles.buttonCancel} onPress={() => { setModalPointsVisible(!modalPointsVisible) }}>
            <EvilIcons
              name='close'
              style={styles.textButton}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  buttonsModal: {
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textButton: {
    fontSize: 35,
    color: white,
  },
  buttonCancel: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: orange,
    borderColor: darkorange,
  },
  buttonRefresh: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: indigo,
    borderColor: purple,
  },
  buttonHome: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: purple,
    borderColor: indigo,
  },
  modalContainer: {
    alignItems: 'center',
    paddingTop: 6,
    borderRadius: 5,
    borderColor: saddlebrown,
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 75,
  },
  titleAddQuestion: {
    color: cornsilk,
    fontWeight: 'bold',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
  },
  points: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 50,
    color: darkgreen,
  },
  containerPoints: {
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Score