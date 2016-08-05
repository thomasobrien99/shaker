"use strict"

import React, {Component} from 'react';
import {Platform, View, StyleSheet } from 'react-native';

class StatusBarBackground extends Component {
	render(){
		return (
			<View style={styles.statusBarBackground}/>
			)
		}
}

const styles = StyleSheet.create({
	statusBarBackground: {
		height: Platform.OS === 'ios' ? 20 : 0,
		backgroundColor: Platform.OS === 'ios' ? "skyblue" : 'white'
	}
})

module.exports = StatusBarBackground