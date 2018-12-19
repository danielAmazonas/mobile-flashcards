import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import {
  white,
  saddlebrown,
  cornsilk,
  marron,
  forestgreen,
  darkgreen,
  red,
  crimson,
  orange,
  darkorange,
  gainsboro,
  dimgray,
  hotpink,
  deeppink,
  indigo,
  purple,
} from '../utils/colors'
import { LinearGradient } from 'expo'
import PropTypes from 'prop-types'
import { EvilIcons } from '@expo/vector-icons'

const { height, width } = Dimensions.get('window')

class Play extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    detailDeck: PropTypes.func.isRequired,
    questionPlay: PropTypes.string.isRequired,
    answerPlay: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    correct: PropTypes.func.isRequired,
    incorrect: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
    prevCard: PropTypes.func.isRequired,
    nextCard: PropTypes.func.isRequired,
    resetPosition: PropTypes.func.isRequired,
    setModalPlayVisible: PropTypes.func.isRequired,
    modalPlayVisible: PropTypes.bool.isRequired,
    increment: PropTypes.number.isRequired,
  }

  render() {
    const {
      title,
      length,
      detailDeck,
      questionPlay,
      answerPlay,
      opacity,
      correct,
      incorrect,
      show,
      prevCard,
      nextCard,
      resetPosition,
      setModalPlayVisible,
      modalPlayVisible,
      increment,
    } = this.props

    return (
      <LinearGradient style={styles.modalContainer} colors={[saddlebrown, cornsilk]}>
        <View>
          <Text style={styles.titleAddQuestion}>Play - {title}: {increment + 1}/{length}</Text>
          <View style={styles.deck}>
            <ScrollView contentContainerStyle={styles.listContainer}>
              {!Object.values(detailDeck(title)) ?
                <View key={`${title} - undefined`}>
                  <View style={styles.rowContainerPlay}>
                    <Text style={styles.text}>
                      {'No Cards'}
                    </Text>
                  </View>
                </View> :
                <View key={`${title} - ${Object.values(detailDeck(title))}`}>
                  <View style={styles.deckPlay}>
                    <Text style={styles.text}>
                      {'Question: '}{questionPlay}
                    </Text>
                    <Text style={[styles.text, { opacity: opacity }]}>
                      {'Answer: '}{answerPlay}
                    </Text>
                    <View style={styles.buttonsPlay}>
                      <TouchableOpacity style={styles.buttonCorrect} onPress={() => correct()}>
                        <EvilIcons
                          name='like'
                          style={styles.textButton}
                        />
                      </TouchableOpacity>
                      <Text>
                        {'  '}
                      </Text>
                      <TouchableOpacity style={styles.buttonIncorrect} onPress={() => incorrect()}>
                        <EvilIcons
                          name='close'
                          style={styles.textButton}
                        />
                      </TouchableOpacity>
                      <Text>
                        {'  '}
                      </Text>
                      <TouchableOpacity style={styles.buttonView} onPress={() => show()}>
                        <EvilIcons
                          name='eye'
                          style={styles.textButton}
                        />
                      </TouchableOpacity>
                      <Text>
                        {'  '}
                      </Text>
                      <TouchableOpacity style={styles.buttonPrev} onPress={() => prevCard()}>
                        <EvilIcons
                          name='arrow-left'
                          style={styles.textButton}
                        />
                      </TouchableOpacity>
                      <Text>
                        {'  '}
                      </Text>
                      <TouchableOpacity style={styles.buttonNext} onPress={() => nextCard()}>
                        <EvilIcons
                          name='arrow-right'
                          style={styles.textButton}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              }
            </ScrollView>
          </View>
          <View style={styles.buttonsModal}>
            <TouchableOpacity style={styles.buttonRefresh} onPress={() => { resetPosition() }}>
              <EvilIcons
                name='refresh'
                style={styles.textButton}
              />
            </TouchableOpacity>
            <Text>
              {'   '}
            </Text>
            <TouchableOpacity style={styles.buttonCancel} onPress={() => { setModalPlayVisible(!modalPlayVisible) }}>
              <EvilIcons
                name='close'
                style={styles.textButton}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    marginVertical: 10,
    color: marron,
  },
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
  buttonCorrect: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: darkgreen,
    borderColor: forestgreen,
    alignItems: 'center',
    width: 40,
  },
  buttonIncorrect: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: crimson,
    borderColor: red,
    alignItems: 'center',
    width: 40,
  },
  buttonView: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: darkgreen,
    borderColor: forestgreen,
    alignItems: 'center',
    width: 40,
  },
  buttonNext: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: dimgray,
    borderColor: gainsboro,
    alignItems: 'center',
    width: 40,
  },
  buttonPrev: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: hotpink,
    borderColor: deeppink,
    alignItems: 'center',
    width: 40,
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
  deck: {
    marginTop: 10,
    backgroundColor: white,
    flex: 1,
    width: width - 75,
    borderRadius: 5,
    borderColor: saddlebrown,
    borderWidth: 2,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 5
      }
    })
  },
  listContainer: {
    alignItems: 'center',
  },
  rowContainerPlay: {

  },
  deckPlay: {
    marginTop: 10,
    backgroundColor: white,
    flex: 1,
    width: width - 100,
  },
  buttonsPlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Play