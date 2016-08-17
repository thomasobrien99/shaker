"use strict"

import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, AsyncStorage, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AddCocktailButton from './AddCocktailButton'
import toTitleCase from '../services/helpers'
import appStyles from '../styles/styles'
import colors from '../styles/colors'


class CocktailRow extends Component {
  render(){
		return (
			<TouchableOpacity style={[appStyles.wideRow, {backgroundColor:colors.darkBlue}]} onPress={this.props.onPress}>
        <Text style={[appStyles.wideRowText, styles.cocktailText]}>{toTitleCase(this.props.cocktail.name)}</Text>
        <Text style={{flex:1}} />
        <AddCocktailButton toggleCocktail = {this.props.toggleCocktail} cocktailId={this.props.cocktail.id} owned={this.props.cocktail.owned}/>
      </TouchableOpacity>
			)
		}
}

const styles = StyleSheet.create({
	cocktailText:{
		color: 'white'
	}
})
module.exports = CocktailRow