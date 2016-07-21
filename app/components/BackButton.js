"use strict"

import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import appStyles from '../styles/styles'
import colors from '../styles/colors'
import {View, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';

class BackButton extends Component {
	constructor(props){
		super(props)
	}
	render(){
		return (
			<TouchableOpacity onPress={()=>this.props.nav.pop()}>
				<Icon style={[appStyles.backButton, {color:colors.darkBlue}]} name = {'arrow-left'} />
			</TouchableOpacity>
			)
		}
}

module.exports = BackButton