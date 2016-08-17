import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import CocktailRow from '../components/CocktailRow'
import colors from '../styles/colors'
import EStyleSheet from 'react-native-extended-stylesheet'


class CocktailsIndexScreen extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <ViewContainer>
      
      <StatusBarBackground/>

      <View style={styles.mainSections}>
        
        <TouchableOpacity 
          onPress={()=>this.props.navigator.push({ident: 'cocktailsByName'})}>
          <Image 
            source={require('../styles/img/abc.png')} 
            style={styles.midImage}
            resizeMode={"contain"}/>
          <Text 
            style={styles.header}>
            Find Cocktails By Name
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={()=>this.props.navigator.push({ident: 'cocktailsByCategory'})}>
          <Image 
            source={require('../styles/img/categories.png')}
            style={styles.midImage}/>
          <Text 
            style={styles.header}>
            Find Cocktails By Category
          </Text>
        </TouchableOpacity>
      
      </View>
    
    </ViewContainer>
    )
  }
}

const styles = EStyleSheet.create({
  header:{
    fontFamily: "$appFont",
    fontSize: "30rem",
    color: '$headerColor',
    textAlign: 'center',
    alignSelf: 'center'
  },
  mainSections: {
    flex: 1,
    justifyContent:'space-between',
    alignItems: 'center',
    marginVertical: "120rem"
  },
  midImage:{
    height: "100rem",
    width: "100rem",
    alignSelf: 'center'
  }
})

module.exports = CocktailsIndexScreen;