import {
  Platform,
  StyleSheet,
  PixelRatio,
  Dimensions
} from 'react-native'
import Size from './dimensions'
import colors from './colors'

import EStyleSheet from 'react-native-extended-stylesheet';

appStyles = EStyleSheet.create({
  header:{
    fontFamily: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold',
    fontSize: "30rem",
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
    paddingVertical: "12rem",
    paddingHorizontal: "24rem",
    borderWidth:"2rem",
    borderRadius:"8rem",
    margin:"1rem",
  },
  wideRowText:{
    fontSize: "18rem",
    fontFamily: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold',
  },
  narrowRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth:"1rem",
    borderRadius:"6rem",
    paddingVertical:"9rem",
    margin: "1rem",
    paddingHorizontal: "24rem"
  },
  narrowRowText:{
    fontSize: "18rem",
    fontFamily: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold',
  },
  textInput:{
    fontSize: "20rem",
    height: "40rem",
    borderWidth:" 2rem",
    margin: "1rem",
    borderRadius: "8rem",
    paddingHorizontal: "24rem",
    fontFamily: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold',
  },
  tabBarSpacer:{
    height: "60rem"
  },
  recipeText:{
    fontSize: "18rem",
    textAlign: 'center',
    fontFamily: Platform.OS === "ios" ? 'Aleo-Bold': 'aleo_bold'
  },
  glassText:{
    fontSize: "16rem",
    fontFamily: Platform.OS === "ios" ? 'Aleo-Bold': 'aleo_bold',
  },
  glassBox:{
    padding: "3rem",
  },
  midImage:{
    height: "100rem",
    width: "100rem",
    alignSelf: 'center'
  },
  largeImage:{
    height: "200rem",
    width: "200rem"
  },
  backButton:{
    fontSize: "29rem",
    marginLeft: "0rem"
  },
  mixScrollBox:{
    margin: "16rem",
    height: "600rem",
  }
})

module.exports = appStyles;