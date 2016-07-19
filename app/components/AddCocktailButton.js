"use strict"

import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {View, StyleSheet, AsyncStorage, TouchableHighlight } from 'react-native';

class AddCocktailButton extends Component {
	constructor(props){
		super(props)
		this.state = {
			owned : false
		}
	}
	componentDidMount(){
		AsyncStorage.getItem('userCocktails').then((userCocktails)=>{
			userCocktails = JSON.parse(userCocktails)
			this.setState({owned: userCocktails.includes(this.props.cocktailId)})
		}).catch((err)=>{
			console.log(err)
		})
	}
	render(){
		return (
			<TouchableHighlight onPress={()=>this.toggleCocktail(this.props.cocktailId)}>
				<Icon style={{fontSize: 30, color:'white'}} name = {this.state.owned ? 'minus-square': 'plus-square'} />
			</TouchableHighlight>
			)
		}
	toggleCocktail(cocktailId){
		let vm = this;
    AsyncStorage.getItem('userCocktails').then((userCocktails)=>{
      userCocktails = JSON.parse(userCocktails) || [];
  
      if(userCocktails.includes(cocktailId)){
        userCocktails = userCocktails.filter((el)=>el!=cocktailId)
				this.setState({owned: false});
      }
      else{
        userCocktails.push(cocktailId);
        this.setState({owned: true});
      }
      
      AsyncStorage.setItem('userCocktails', JSON.stringify(userCocktails)).then((data)=>{
        console.log('success')
    }).catch((err)=>{console.log(err)})}
    ).catch((err)=>{console.log(err)})
  }
}

module.exports = AddCocktailButton