"use strict"

import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, AsyncStorage, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AddCocktailButton from './AddCocktailButton'
import toTitleCase from '../services/helpers'
import appStyles from '../styles/styles'

import EStyleSheet from 'react-native-extended-stylesheet'

import colors from '../styles/colors'

class CocktailRow extends Component {
  render(){
		return (
			<TouchableOpacity style={[styles.wideRow, {backgroundColor:colors.darkBlue}]} onPress={this.props.onPress}>
        <Text style={[styles.wideRowText, {color:'white'}]}>{toTitleCase(this.props.cocktail.name)}</Text>
        <Text style={{flex:1}} />
        <AddCocktailButton toggleCocktail = {this.props.toggleCocktail} cocktailId={this.props.cocktail.id} owned={this.props.cocktail.owned}/>
      </TouchableOpacity>
			)
		}
}

const styles = EStyleSheet.create({
	cocktailText:{
		color: 'white'
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
    fontFamily: '$appFont'
  }
})
module.exports = CocktailRow