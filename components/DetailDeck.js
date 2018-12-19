import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import {
  white,
  saddlebrown,
  cornsilk,
  marron,
  tan,
  orange,
  darkorange,
} from '../utils/colors'
import { LinearGradient } from 'expo'
import PropTypes from 'prop-types'
import { EvilIcons } from '@expo/vector-icons'

const { height, width } = Dimensions.get('window')

class DetailDeck extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    detailDeck: PropTypes.func.isRequired,
    setModalDetailVisible: PropTypes.func.isRequired,
    modalDetailVisible: PropTypes.bool.isRequired,
  }

  render() {
    const {
      title,
      detailDeck,
      setModalDetailVisible,
      modalDetailVisible,
    } = this.props

    return (
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
            <TouchableOpacity style={styles.buttonCancel} onPress={() => { setModalDetailVisible(!modalDetailVisible) }}>
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
  modalContainer: {
    alignItems: 'center',
    paddingTop: 6,
    borderRadius: 5,
    borderColor: saddlebrown,
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 75,
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
})

export default DetailDeck