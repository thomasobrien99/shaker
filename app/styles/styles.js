import {
  Platform,
	StyleSheet
} from 'react-native'
import Size from './dimensions'

appStyles = StyleSheet.create({
	header:{
    fontFamily: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold',
    fontSize: Size.FONT_SIZE_TITLE,
    color: '#00648c',
    textAlign: 'center'
	},
	viewCenter:{
		alignItems: 'center'
	},
	wideRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: Size.UNIT*.75,
    paddingBottom: Size.UNIT*.75,
    paddingLeft: Size.UNIT*1.5,
    paddingRight: Size.UNIT*1.5,
    borderWidth: Size.UNIT*.1,
    borderRadius: Size.UNIT*.5,
    margin: Size.UNIT*.1,
  },
  wideRowText:{
    fontSize: Size.FONT_SIZE,
    fontFamily: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold',
  },
  narrowRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: Size.UNIT*.1,
    borderRadius: Size.UNIT*.5,
    paddingTop: Size.UNIT*.4,
    paddingBottom: Size.UNIT*.4,
    margin: Size.UNIT*.1,
    paddingLeft: Size.UNIT*1.5,
    paddingRight: Size.UNIT*1.5
  },
  narrowRowText:{
    fontSize: Size.FONT_SIZE,
    fontFamily: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold',
    flex:1
  },
  textInput:{
    fontSize: Size.FONT_SIZE,
    height: Size.UNIT*2.5,
    borderWidth: Size.UNIT*.1,
    margin: Size.UNIT*.1,
    borderRadius: Size.UNIT*.5,
    paddingLeft: Size.UNIT*1.5,
    paddingRight: Size.UNIT*1.5,
    fontFamily: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold',
  },
  tabBarSpacer:{
    height: 60
  },
  recipeText:{
    fontSize: Size.FONT_SIZE,
    textAlign: 'center',
    fontFamily: Platform.OS === "ios" ? 'Aleo-Bold': 'aleo_bold'
  },
  glassText:{
    fontSize: Size.FONT_SIZE,
    fontFamily: Platform.OS === "ios" ? 'Aleo-Bold': 'aleo_bold',
  },
  glassBox:{
    padding: Size.UNIT * .2,
  },
  midImage:{
    height: Size.UNIT * 7,
    width: Size.UNIT * 7
  },
  largeImage:{
    height: Size.UNIT * 13,
    width: Size.UNIT * 13
  },
  backButton:{
    fontSize: Size.UNIT
  }
})

module.exports = appStyles;