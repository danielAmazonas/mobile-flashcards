import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
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
let i = 0

class Decks extends Component {
  state = {
    todoValue: this.props.textValue,
    modalAddVisible: false,
    modalDetailVisible: false,
    modalPlayVisible: false,
    modalPointsVisible: false,
    question: '',
    answer: '',
    opacity: 0,
    questionPlay: '',
    answerPlay: '',
    points: 0,
  }

  questionController = textValue => {
    this.setState({
      question: textValue
    })
  }

  answerController = textValue => {
    this.setState({
      answer: textValue
    })
  }

  clear = () => {
    this.setState({
      question: '',
      answer: ''
    })
  }

  setModalAddVisible(visible) {
    this.setState({
      modalAddVisible: visible
    })
  }

  setModalDetailVisible(visible) {
    this.setState({
      modalDetailVisible: visible
    })
  }

  setModalPlayVisible(visible) {
    this.setState({
      modalPlayVisible: visible
    })
  }

  setModalPointsVisible(visible) {
    this.setState({
      modalPointsVisible: visible
    })
  }

  componentDidMount() {
    this.setState({
      modalAddVisible: false,
      modalDetailVisible: false,
      modalPlayVisible: false,
      modalPointsVisible: false,
    })
  }

  static propTypes = {
    textValue: PropTypes.string.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    addQuestion: PropTypes.func.isRequired,
    detailDeck: PropTypes.func.isRequired,
  }

  nextCard = () => {
    if (i === this.props.length - 1) {
      this.setModalPointsVisible(true)
      console.log('>>>', this.state.points)
    } else {
      i = i + 1
      console.log('>>>', i)
      let deck = this.props.detailDeck(this.props.title)
      if (!Object.values(deck)[i]) {

      } else {
        this.setState({
          questionPlay: Object.values(deck)[i].question,
          answerPlay: Object.values(deck)[i].answer,
        })
      }
    }
    this.hide()
  }

  prevCard = () => {
    if (i === 0) {

    } else {
      i = i - 1
      console.log('>>>', i)
      let deck = this.props.detailDeck(this.props.title)
      if (!Object.values(deck)[i]) {

      } else {
        this.setState({
          questionPlay: Object.values(deck)[i].question,
          answerPlay: Object.values(deck)[i].answer,
        })
      }
    }
    this.hide()
  }

  show = () => {
    this.setState({
      opacity: 100
    })
  }

  hide = () => {
    this.setState({
      opacity: 0
    })
  }

  resetPosition = () => {
    i = 0
    let deck = this.props.detailDeck(this.props.title)
    this.setState({
      questionPlay: Object.values(deck)[0].question,
      answerPlay: Object.values(deck)[0].answer,
      points: 0,
    })
    this.hide()
  }

  correct = () => {
    this.setState({
      points: this.state.points + 1,
    })
  }

  incorrect = () => {
    this.setState({
      points: this.state.points - 1,
    })
  }

  render() {
    const { todoValue, modalAddVisible, modalDetailVisible, modalPlayVisible, modalPointsVisible, question, answer, questionPlay, answerPlay, points } = this.state
    const { textValue, title, length, deleteTodo, addQuestion, detailDeck } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          {length === 0 ?
            <TouchableOpacity style={styles.buttonPlay} onPressOut={() => { this.setModalPlayVisible(true), this.hide(), this.resetPosition() }} disabled={true}>
              <EvilIcons
                name='play'
                style={styles.textButton}
              />
            </TouchableOpacity> :
            <TouchableOpacity style={styles.buttonPlay} onPressOut={() => { this.setModalPlayVisible(true), this.hide(), this.resetPosition() }}>
              <EvilIcons
                name='play'
                style={styles.textButton}
              />
            </TouchableOpacity>}
          <Text style={styles.text}>
            {'  '}{textValue}<Text style={styles.qtdCard}>{` (${length} cards)`}</Text>
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.buttonAdd} onPressOut={() => { this.setModalAddVisible(true) }}>
            <EvilIcons
              name='plus'
              style={styles.textButton}
            />
          </TouchableOpacity>
          <Text>
            {'  '}
          </Text>
          {length === 0 ?
            <TouchableOpacity style={styles.buttonDetail} onPressOut={() => { this.setModalDetailVisible(true) }} disabled={true}>
              <EvilIcons
                name='archive'
                style={styles.textButton}
              />
            </TouchableOpacity> :
            <TouchableOpacity style={styles.buttonDetail} onPressOut={() => { this.setModalDetailVisible(true) }}>
              <EvilIcons
                name='archive'
                style={styles.textButton}
              />
            </TouchableOpacity>}

          <Text>
            {'  '}
          </Text>
          <TouchableOpacity style={styles.buttonTrash} onPressOut={() => deleteTodo(title)}>
            <EvilIcons
              name='trash'
              style={styles.textButton}
            />
          </TouchableOpacity>
        </View>

        {/* Add Card */}
        <Modal
          animationType='slide'
          transparent={false}
          backdropColor='transparent'
          visible={modalAddVisible}
          onRequestClose={() => { Alert.alert('Modal has been closed.') }}>
          <LinearGradient style={styles.modalContainer} colors={[saddlebrown, cornsilk]}>
            <View>
              <Text style={styles.titleAddQuestion}>Add Question for {title}:</Text>
              <TextInput
                style={styles.inputQuestion}
                placeholder='Add an question here!'
                value={question}
                onChangeText={this.questionController}
                placeholderTextColor={tan}
                autoCorrect={false}
              />
              <TextInput
                style={styles.inputAwnser}
                placeholder='Add an answer here!'
                value={answer}
                onChangeText={this.answerController}
                placeholderTextColor={tan}
                autoCorrect={false}
              />
              <View style={styles.buttonsModal}>
                <TouchableOpacity style={styles.buttonAdd} onPressOut={() => { addQuestion(title, question, answer), this.clear(), this.setModalAddVisible(!this.state.modalAddVisible) }}>
                  <EvilIcons
                    name='plus'
                    style={styles.textButton}
                  />
                </TouchableOpacity>
                <Text>
                  {'  '}
                </Text>
                <TouchableOpacity style={styles.buttonCancel} onPress={() => { this.setModalAddVisible(!this.state.modalAddVisible) }}>
                  <EvilIcons
                    name='close'
                    style={styles.textButton}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </Modal>

        {/* Detail Deck */}
        <Modal
          animationType='slide'
          transparent={false}
          backdropColor='transparent'
          visible={modalDetailVisible}
          onRequestClose={() => { Alert.alert('Modal has been closed.') }}>
          <LinearGradient style={styles.modalContainer} colors={[saddlebrown, cornsilk]}>
            <View>
              <Text style={styles.titleDetailDeck}>Cards for {title}:</Text>
              <View style={styles.deck}>
                <ScrollView contentContainerStyle={styles.listContainer}>
                  {!Object.values(detailDeck(title)) ?
                    <View key={`${title} - undefined`} style={styles.containerCards}>
                      <View style={styles.rowContainerCards}>
                        <Text style={styles.text}>
                          {'No Cards'}
                        </Text>
                      </View>
                    </View> :
                    Object.values(detailDeck(title)).map(deck =>
                      <View key={`${title} - ${deck.question}`} style={styles.containerCards}>
                        <View style={styles.rowContainerCards}>
                          <Text style={styles.text}>
                            {deck.question}
                          </Text>
                        </View>
                      </View>
                    )}
                </ScrollView>
              </View>
              <View style={styles.buttonsModal}>
                <TouchableOpacity style={styles.buttonCancel} onPress={() => { this.setModalDetailVisible(!this.state.modalDetailVisible) }}>
                  <EvilIcons
                    name='close'
                    style={styles.textButton}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </Modal>

        {/* Play */}
        <Modal
          animationType='slide'
          transparent={false}
          backdropColor='transparent'
          visible={modalPlayVisible}
          onRequestClose={() => { Alert.alert('Modal has been closed.') }}>
          <LinearGradient style={styles.modalContainer} colors={[saddlebrown, cornsilk]}>
            <View>
              <Text style={styles.titleAddQuestion}>Play - {title}: {i + 1}/{length}</Text>
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
                        <Text style={[styles.text, { opacity: this.state.opacity }]}>
                          {'Answer: '}{answerPlay}
                        </Text>
                        <View style={styles.buttonsPlay}>
                          <TouchableOpacity style={styles.buttonCorrect} onPress={() => this.correct()}>
                            <EvilIcons
                              name='like'
                              style={styles.textButton}
                            />
                          </TouchableOpacity>
                          <Text>
                            {'  '}
                          </Text>
                          <TouchableOpacity style={styles.buttonIncorrect} onPress={() => this.incorrect()}>
                            <EvilIcons
                              name='close'
                              style={styles.textButton}
                            />
                          </TouchableOpacity>
                          <Text>
                            {'  '}
                          </Text>
                          <TouchableOpacity style={styles.buttonView} onPress={() => this.show()}>
                            <EvilIcons
                              name='eye'
                              style={styles.textButton}
                            />
                          </TouchableOpacity>
                          <Text>
                            {'  '}
                          </Text>
                          <TouchableOpacity style={styles.buttonPrev} onPress={() => this.prevCard()}>
                            <EvilIcons
                              name='arrow-left'
                              style={styles.textButton}
                            />
                          </TouchableOpacity>
                          <Text>
                            {'  '}
                          </Text>
                          <TouchableOpacity style={styles.buttonNext} onPress={() => this.nextCard()}>
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
                <TouchableOpacity style={styles.buttonRefresh} onPress={() => { this.resetPosition() }}>
                  <EvilIcons
                    name='refresh'
                    style={styles.textButton}
                  />
                </TouchableOpacity>
                <Text>
                  {'   '}
                </Text>
                <TouchableOpacity style={styles.buttonCancel} onPress={() => { this.setModalPlayVisible(!this.state.modalPlayVisible) }}>
                  <EvilIcons
                    name='close'
                    style={styles.textButton}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </Modal>

        {/* Points */}
        <Modal
          animationType='slide'
          transparent={false}
          backdropColor='transparent'
          visible={modalPointsVisible}
          onRequestClose={() => { Alert.alert('Modal has been closed.') }}>
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
              <TouchableOpacity style={styles.buttonCancel} onPress={() => { this.setModalPointsVisible(!this.state.modalPointsVisible) }}>
                <EvilIcons
                  name='close'
                  style={styles.textButton}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Modal>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: tan,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    marginVertical: 10,
    color: marron,
  },
  qtdCard: {
    fontSize: 12,
    marginVertical: 10,
    color: steelblue,
  },
  rowContainer: {
    flexDirection: 'row',
    width: width / 2,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  buttons: {
    flexDirection: 'row',
  },
  buttonsModal: {
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    marginHorizontal: 6,
  },
  textButton: {
    fontSize: 35,
    color: white,
  },
  buttonPlay: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: forestgreen,
    borderColor: darkgreen,
  },
  buttonAdd: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: dodgerblue,
    borderColor: steelblue,
  },
  buttonDetail: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: mediumturquoise,
    borderColor: darkturquoise,
  },
  buttonTrash: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: red,
    borderColor: crimson,
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
  titleDetailDeck: {
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
  containerCards: {
    width: width - 95,
    borderBottomColor: tan,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  rowContainerCards: {
    width: width / 2,
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

export default Decks