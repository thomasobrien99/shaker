// import {
//   Platform,
// 	StyleSheet
// } from 'react-native'
// import Size from './dimensions'

// appStyles = StyleSheet.create({
// 	header:{
//     fontFamily: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold',
//     fontSize: Size.FONT_SIZE_TITLE*1.3,
//     color: '#00648c',
//     textAlign: 'center'
// 	},
// 	viewCenter:{
// 		alignItems: 'center'
// 	},
// 	wideRow: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     paddingTop: Size.UNIT*.75,
//     paddingBottom: Size.UNIT*.75,
//     paddingLeft: Size.UNIT*1.5,
//     paddingRight: Size.UNIT*1.5,
//     borderWidth: Size.UNIT*.1,
//     borderRadius: Size.UNIT*.5,
//     margin: Size.UNIT*.1,
//   },
//   wideRowText:{
//     fontSize: Size.FONT_SIZE,
//     fontFamily: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold',
//   },
//   narrowRow:{
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderWidth: Size.UNIT*.1,
//     borderRadius: Size.UNIT*.5,
//     paddingTop: Size.UNIT*.4,
//     paddingBottom: Size.UNIT*.4,
//     margin: Size.UNIT*.1,
//     paddingLeft: Size.UNIT*1.5,
//     paddingRight: Size.UNIT*1.5
//   },
//   narrowRowText:{
//     fontSize: Size.FONT_SIZE,
//     fontFamily: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold',
//     flex:1
//   },
//   textInput:{
//     fontSize: Size.FONT_SIZE,
//     height: Size.UNIT*2.5,
//     borderWidth: Size.UNIT*.1,
//     margin: Size.UNIT*.1,
//     borderRadius: Size.UNIT*.5,
//     paddingLeft: Size.UNIT*1.5,
//     paddingRight: Size.UNIT*1.5,
//     fontFamily: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold',
//   },
//   tabBarSpacer:{
//     height: 60
//   },
//   recipeText:{
//     fontSize: Size.FONT_SIZE,
//     textAlign: 'center',
//     fontFamily: Platform.OS === "ios" ? 'Aleo-Bold': 'aleo_bold'
//   },
//   glassText:{
//     fontSize: Size.FONT_SIZE,
//     fontFamily: Platform.OS === "ios" ? 'Aleo-Bold': 'aleo_bold',
//   },
//   glassBox:{
//     padding: Size.UNIT * .2,
//   },
//   midImage:{
//     height: Size.UNIT * 7,
//     width: Size.UNIT * 7
//   },
//   largeImage:{
//     height: Size.UNIT * 13,
//     width: Size.UNIT * 13
//   },
//   backButton:{
//     fontSize: Size.UNIT
//   },
//   mixScrollBox:{
//     height : Size.UNIT * 24,
//     padding: Size.UNIT
//   }
// })

// module.exports = appStyles;
import {
  Platform,
  StyleSheet,
  PixelRatio,
  Dimensions
} from 'react-native'
import Size from './dimensions'
import colors from './colors'

Size.UNIT = 1
//Size.UNIT = PixelRatio.get()*.5

var deviceHeight = Dimensions.get('window').height;

var ratioY;
//const ratioY = deviceHeight < 568 ? (deviceHeight < 480 ? 0.75 : 0.875) : 1 ;
if (deviceHeight < 480){
  ratioY = .75
}
else if (deviceHeight < 568){
  ratioY = .875
}
else if (deviceHeight > 650){
  ratioY = 1.2
}
// We're simulating EM by changing font size according to Ratio
Size.UNIT = Size.UNIT * ratioY;



appStyles = StyleSheet.create({
  header:{
    fontFamily: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold',
    fontSize: 30*Size.UNIT,
    color: '#00648c',
    textAlign: 'center',
    alignSelf: 'center'
  },
  viewCenter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  wideRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12*Size.UNIT,
    paddingHorizontal: 24*Size.UNIT,
    borderWidth: 2*Size.UNIT,
    borderRadius: 8*Size.UNIT,
    margin: 10*Size.UNIT,
  },
  wideRowText:{
    fontSize: 18*Size.UNIT,
    fontFamily: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold',
  },
  narrowRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1*Size.UNIT,
    borderRadius: 6*Size.UNIT,
    paddingVertical: 9*Size.UNIT,
    margin: 10*Size.UNIT,
    paddingHorizontal: 24*Size.UNIT
  },
  narrowRowText:{
    fontSize: 18*Size.UNIT,
    fontFamily: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold',
  },
  textInput:{
    fontSize: 20*Size.UNIT,
    height: 40*Size.UNIT,
    borderWidth: 2*Size.UNIT,
    margin: 1*Size.UNIT,
    borderRadius: 8*Size.UNIT,
    paddingHorizontal: 24*Size.UNIT,
    fontFamily: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold',
  },
  tabBarSpacer:{
    height: 60*Size.UNIT
  },
  recipeText:{
    fontSize: 18*Size.UNIT,
    textAlign: 'center',
    fontFamily: Platform.OS === "ios" ? 'Aleo-Bold': 'aleo_bold'
  },
  glassText:{
    fontSize: 16*Size.UNIT,
    fontFamily: Platform.OS === "ios" ? 'Aleo-Bold': 'aleo_bold',
  },
  glassBox:{
    padding: 3*Size.UNIT,
  },
  midImage:{
    //height: 100*Size.UNIT,
    //width: 100*Size.UNIT,
    alignSelf: 'center'
  },
  largeImage:{
    //height: 200*Size.UNIT,
    //width: 200*Size.UNIT
  },
  backButton:{
    fontSize: 29*Size.UNIT,
    marginLeft: 0*Size.UNIT
  },
  mixScrollBox:{
    margin: 16*Size.UNIT,
    height: 310*Size.UNIT,
    //borderWidth: 3*Size.UNIT,
    //borderColor: colors.beige
  }
})

module.exports = appStyles;