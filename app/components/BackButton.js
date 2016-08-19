"use strict"

import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import colors from '../styles/colors'
import {View, AsyncStorage, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet'

class BackButton extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return (
			<TouchableOpacity onPress={()=>this.props.nav.pop()}>
				<Icon style={[styles.backButton, {color:colors.darkBlue}]} name = {'arrow-left'} />
			</TouchableOpacity>
			)
		}
}

const styles = EStyleSheet.create({
	backButton:{
    fontSize: "29rem",
    marginLeft: "0rem"
  }
})
module.exports = BackButton