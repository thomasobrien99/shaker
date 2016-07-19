import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import CocktailNavigator from '../navigation/CocktailNavigator'
import IngredientNavigator from '../navigation/IngredientNavigator'
import MixNavigator from '../navigation/MixNavigator'

class NavigationPane extends Component{
	constructor(props){
		super(props)
		///PUSH A NAVIGATOR ONTO THE PREVIOUS NAVIGATOR
		this.state = {
        selectedTab: 'mixTab'
    }
	}
	render(){
		return(
			<ScrollView>
				<TouchableOpacity onPress={()=>{this.props.navigator.push({ident: 'mixNavigator'})}}>
					<Text>MixNavigator</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={()=>{this.props.navigator.push({ident: 'cocktailNavigator'})}}>
					<Text>CocktailNavigator</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>NotNotMixNavigator</Text>
				</TouchableOpacity>
			</ScrollView>
			)
	}
  _changeSelectedTab(tab, newRoute){
    this.setState({selectedTab: tab, newRoute:{tab, route:newRoute}})
  }
}

module.exports = NavigationPane;