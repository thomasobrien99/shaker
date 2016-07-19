import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet
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
        <TouchableOpacity style={styles.mainSections} onPress={()=>this._navigateToMyMixPage()}>
          <Image source={require('../styles/img/shaker.png')}/>
          <Text style={appStyles.header}>What Can I Make?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainSections} onPress={()=>this._navigateToMyIngredientsPage()}>
          <Image source={require('../styles/img/ingredients.png')}/>
          <Text style={appStyles.header}>My Ingredients</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainSections} onPress={()=>this._navigateToMyCocktailsPage()}>
          <Image source={require('../styles/img/mycocktails.png')}/>
          <Text style={appStyles.header}>My Cocktails</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    margin: 15
  }
})
module.exports = MixIndexPage;