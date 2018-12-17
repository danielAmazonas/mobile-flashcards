import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TextInput,
  ScrollView,
  AsyncStorage,
} from 'react-native'
import {
  white,
  saddlebrown,
  cornsilk,
  marron,
  tan,
} from './utils/colors'
import {
  LinearGradient,
  AppLoading,
} from 'expo'
import { MobileFlashcardsStatusBar } from './components/MobileFlashcardsStatusBar'
import Decks from './components/Decks'
import { setLocalNotification } from './utils/helpers'

const { height, width } = Dimensions.get('window')

export default class App extends React.Component {
  state = {
    newTodoDeck: '',
    dataIsReady: false,
    todos: {},
  }

  newTodoDeckController = textValue => {
    this.setState({
      newTodoDeck: textValue
    })
  }

  componentDidMount = () => {
    this.loadTodos()
    setLocalNotification()
  }

  loadTodos = async () => {
    try {
      const getTodos = await AsyncStorage.getItem('todos')
      const parsedTodos = JSON.parse(getTodos)
      this.setState({
        dataIsReady: true,
        todos: parsedTodos || {}
      })
    } catch (err) {
      console.log(err)
    }
  }

  addTodo = () => {
    const { newTodoDeck } = this.state
    if (newTodoDeck !== '') {
      this.setState(prevState => {
        const id = newTodoDeck.trim().toUpperCase()
        const newTodoObject = {
          [id]: {
            title: id,
            questions: [],
          }
        }
        const newState = {
          ...prevState,
          newTodoDeck: '',
          todos: {
            ...prevState.todos,
            ...newTodoObject
          }
        }
        this.saveTodos(newState.todos)
        return { ...newState }
      })
    }
  }

  deleteTodo = title => {
    this.setState(prevState => {
      const todos = prevState.todos
      delete todos[title]
      const newState = {
        ...prevState,
        ...todos
      }
      this.saveTodos(newState.todos)
      return { ...newState }
    })
  }

  addQuestion = (title, question, answer) => {
    this.setState(prevState => {
      const todos = prevState.todos
      const newQuestionObject = {
        question: question,
        answer: answer
      }
      const newState = {
        ...prevState,
        todos: {
          ...todos,
          [title]: {
            ...todos[title],
            questions: [
              ...todos[title].questions,
              {
                ...newQuestionObject
              }
            ]
          }
        }
      }
      this.saveTodos(newState.todos)
      return { ...newState }
    })
  }

  detailDeck = title => {
    const todos = this.state.todos
    const cards = {
      ...todos[title].questions
    }
    return cards
  }

  saveTodos = newTodos => {
    const saveTodos = AsyncStorage.setItem('todos', JSON.stringify(newTodos))
  }

  render() {
    const { newTodoDeck, dataIsReady, todos } = this.state
    // AsyncStorage.clear()

    if (!dataIsReady) {
      return <AppLoading />
    }

    return (
      <LinearGradient style={styles.container} colors={[saddlebrown, cornsilk]}>
        <MobileFlashcardsStatusBar backgroundColor={marron} barStyle='light-content' translucent={true} />
        <Text style={styles.appTitle}>Mobile Flashcards</Text>
        <View style={styles.deck}>
          <TextInput
            style={styles.input}
            placeholder='Add an deck title here!'
            value={newTodoDeck}
            onChangeText={this.newTodoDeckController}
            placeholderTextColor={tan}
            returnKeyType={'done'}
            autoCorrect={false}
            onSubmitEditing={this.addTodo}
          />
          <ScrollView contentContainerStyle={styles.listContainer}>
            <View style={styles.containerLength}>
              <Text style={styles.textLength}>
                COLLECTIONS({Object.values(todos).length})
              </Text>
            </View>
            {Object.values(todos).map(todo =>
              <Decks
                key={todo.title} {...todo}
                textValue={todo.title}
                deleteTodo={this.deleteTodo}
                title={todo.title}
                length={todo.questions.length}
                addQuestion={this.addQuestion}
                detailDeck={this.detailDeck}
              />
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  appTitle: {
    color: cornsilk,
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  containerLength: {
    backgroundColor: cornsilk,
    flexDirection: 'row',
    width: width,
    justifyContent: 'center',
    borderBottomColor: tan,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textLength: {
    fontSize: 10,
    color: marron,
    fontWeight: 'bold',
  },
  deck: {
    backgroundColor: white,
    flex: 1,
    width: width - 25,
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
  input: {
    padding: 20,
    borderBottomColor: tan,
    borderBottomWidth: 1,
    fontSize: 24,
    textAlign: 'center',
    color: marron,
  },
  listContainer: {
    alignItems: 'center',
  },
})
