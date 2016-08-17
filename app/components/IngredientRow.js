"use strict"

import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AddIngredientButton from './AddIngredientButton'
import toTitleCase from '../services/helpers'
import appStyles from '../styles/styles'
import colors from '../styles/colors'
import EStyleSheet from 'react-native-extended-stylesheet'


class IngredientRow extends Component {
	render(){
		return (
			<TouchableOpacity 
        style={[
          styles.narrowRow, 
          {backgroundColor: colors.darkBlue}
          ]} 
          onPress={this.props.onPress}>
              <Text style={[styles.narrowRowText, {color:"white"}]}>{toTitleCase(this.props.ingredient.name)}</Text>
              <Text style={[styles.narrowRowText, {color:"white"}]}>{this.props.amount}</Text>
              <AddIngredientButton style={[styles.narrowRowText]} ingredientId = {this.props.ingredient.id}/>
            </TouchableOpacity>
			)
		}
}

const styles = EStyleSheet.create({
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
    fontFamily: '$appFont'
  }
})

module.exports = IngredientRow
  