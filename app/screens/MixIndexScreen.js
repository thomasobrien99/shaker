import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import appStyles from '../styles/styles'

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
            <Image source={require('../styles/img/shaker.png')} style={appStyles.midImage}/>
            <Text style={appStyles.header}>What Can I Make?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>this._navigateToMyIngredientsPage()}>
            <Image source={require('../styles/img/ingredients.png')} style={appStyles.midImage}/>
            <Text style={appStyles.header}>My Ingredients</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>this._navigateToMyCocktailsPage()}>
            <Image source={require('../styles/img/mycocktails.png')} style={appStyles.midImage}/>
            <Text style={appStyles.header}>My Cocktails</Text>
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
const styles = StyleSheet.create({
  mainSections: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 15
  }
})
module.exports = MixIndexPage;