import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'

import EStyleSheet from 'react-native-extended-stylesheet'

class MixIndexPage extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <ViewContainer>
      
      <StatusBarBackground/>
        
        <View style={styles.mainSections}>
          
          <TouchableOpacity onPress={()=>this._navigateToMyMixPage()}>
            <Image source={require('../styles/img/shaker.png')} style={styles.midImage}/>
            <Text style={styles.header}>What Can I Make?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>this._navigateToMyIngredientsPage()}>
            <Image source={require('../styles/img/ingredients.png')} style={styles.midImage}/>
            <Text style={styles.header}>My Ingredients</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>this._navigateToMyCocktailsPage()}>
            <Image source={require('../styles/img/mycocktails.png')} style={styles.midImage}/>
            <Text style={styles.header}>My Cocktails</Text>
          </TouchableOpacity>
        
        </View>
    
    </ViewContainer>
    )
  }
  _navigateToMyMixPage(){
    this.props.navigator.push({
      ident: "bar"
    })
  }
  _navigateToMyIngredientsPage(){
    this.props.navigator.push({
      ident: "ingredients"
    })
  }
  _navigateToMyCocktailsPage(){
    this.props.navigator.push({
      ident: "cocktails"
    })
  }
}
const styles = EStyleSheet.create({
  header:{
    fontFamily: "$appFont",
    fontSize: "30rem",
    color: "$headerColor",
    textAlign: 'center',
    alignSelf: 'center'
  },
  mainSections: {
    flex:1,
    alignItems: "center",
    justifyContent: "space-around",
    margin: "15rem"
  },
  midImage:{
    height: "100rem",
    width: "100rem",
    alignSelf: 'center'
  }
})
module.exports = MixIndexPage;