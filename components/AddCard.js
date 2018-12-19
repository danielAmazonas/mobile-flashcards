import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import {
  white,
  saddlebrown,
  cornsilk,
  marron,
  tan,
  forestgreen,
  darkgreen,
  dodgerblue,
  steelblue,
  red,
  crimson,
  orange,
  darkorange,
  mediumturquoise,
  darkturquoise,
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

class AddCard extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    questionController: PropTypes.func.isRequired,
    answerController: PropTypes.func.isRequired,
    addQuestion: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    setModalAddVisible: PropTypes.func.isRequired,
    modalAddVisible: PropTypes.bool.isRequired,
  }

  render() {
    const {
      title,
      question,
      answer,
      questionController,
      answerController,
      addQuestion,
      clear,
      setModalAddVisible,
      modalAddVisible,
    } = this.props

    return (
      <LinearGradient style={styles.modalContainer} colors={[saddlebrown, cornsilk]}>
        <View>
          <Text style={styles.titleAddQuestion}>Add Question for {title}:</Text>
          <TextInput
            style={styles.inputQuestion}
            placeholder='Add an question here!'
            value={question}
            onChangeText={questionController}
            placeholderTextColor={tan}
            autoCorrect={false}
          />
          <TextInput
            style={styles.inputAwnser}
            placeholder='Add an answer here!'
            value={answer}
            onChangeText={answerController}
            placeholderTextColor={tan}
            autoCorrect={false}
          />
          <View style={styles.buttonsModal}>
            <TouchableOpacity style={styles.buttonAdd} onPressOut={() => { addQuestion(title, question, answer), clear(), setModalAddVisible(!modalAddVisible) }}>
              <EvilIcons
                name='plus'
                style={styles.textButton}
              />
            </TouchableOpacity>
            <Text>
              {'  '}
            </Text>
            <TouchableOpacity style={styles.buttonCancel} onPress={() => { setModalAddVisible(!modalAddVisible) }}>
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
  modalContainer: {
    alignItems: 'center',
    paddingTop: 6,
    borderRadius: 5,
    borderColor: saddlebrown,
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 75,
  },
  buttonAdd: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: dodgerblue,
    borderColor: steelblue,
  },
  buttonCancel: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: orange,
    borderColor: darkorange,
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
  inputQuestion: {
    borderBottomColor: tan,
    borderBottomWidth: 1,
    fontSize: 15,
    textAlign: 'center',
    color: marron,
    borderColor: saddlebrown,
    backgroundColor: white,
    marginVertical: 8,
    borderRadius: 5,
    borderWidth: 2,
    width: width - 75,
  },
  inputAwnser: {
    borderBottomColor: tan,
    borderBottomWidth: 1,
    fontSize: 15,
    textAlign: 'center',
    color: marron,
    borderColor: saddlebrown,
    backgroundColor: white,
    marginVertical: 8,
    borderRadius: 5,
    borderWidth: 2,
    width: width - 75,
  },
})

export default AddCard