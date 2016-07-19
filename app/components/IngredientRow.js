"use strict"

import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import AddIngredientButton from './AddIngredientButton'
import toTitleCase from '../services/helpers'
import appStyles from '../styles/styles'
import colors from '../styles/colors'


class IngredientRow extends Component {
	render(){
		return (
			<TouchableOpacity 
        style={[
          appStyles.narrowRow, 
          styles.ingredientRow
          ]} 
          onPress={this.props.onPress}>
              <Text style={[appStyles.narrowRowText, {color:colors.darkBlue}]}>{toTitleCase(this.props.ingredient.name)}</Text>
              <Text style={[appStyles.narrowRowText]}>{this.props.amount}</Text>
              <AddIngredientButton style={[appStyles.narrowRowText]} ingredientId = {this.props.ingredient.id}/>
            </TouchableOpacity>
			)
		}
}

const styles = StyleSheet.create({
  ingredientRow:{
    backgroundColor: colors.yellow, 
    borderColor: colors.yellowBorder
  }
})
module.exports = IngredientRow
  