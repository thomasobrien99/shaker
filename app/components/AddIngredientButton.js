"use strict"

import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {View, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import colors from '../styles/colors'

class AddIngredientButton extends Component {
	constructor(props){
		super(props)
		this.state = {
			owned: false
		}
	}
	componentDidMount(){
		AsyncStorage.getItem('userIngredients').then((userIngredients)=>{
			userIngredients = JSON.parse(userIngredients);
			this.setState({owned: userIngredients.includes(this.props.ingredientId)})
		}).catch((err)=>{
			console.log(err)
		});
	}
	render(){
		return (
			<TouchableOpacity onPress={()=>this._addIngredient(this.props.ingredientId)}>
				<Icon style={{fontSize: 25, color:'white'}} name = {this.state.owned ? 'minus-square':'plus-square'} />
			</TouchableOpacity>
			)
		}
	_addIngredient(newIngredientId){
		AsyncStorage.getItem('userIngredients').then((userIngredients)=>{
			userIngredients = JSON.parse(userIngredients) || [];
			if (userIngredients.includes(newIngredientId)){
				userIngredients = userIngredients.filter(el=>el!=newIngredientId)
				this.setState({owned:false})
			}
			else{
				userIngredients.push(newIngredientId);
				this.setState({owned:true})
			}
			
			AsyncStorage.setItem('userIngredients', JSON.stringify(userIngredients)).then(()=>{
				console.log('success')
			}).catch((err)=>{console.log(err)}
		)}
	  ).catch((err)=>{console.log(err)}
	)}
}

module.exports = AddIngredientButton