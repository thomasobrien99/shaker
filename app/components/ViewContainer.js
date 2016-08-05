"use strict"

import React, { Component} from "react"
import { View, StyleSheet, Platform } from "react-native";
import NativeModules from 'react-native'

class ViewContainer extends Component{
	render() {
		return (
			<View style={styles.viewContainer}>
				{this.props.children}
			</View>
		)
	}
}


const styles = StyleSheet.create({
  viewContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
		backgroundColor: 'white',
		marginBottom: Platform.OS === 'ios' ? 50 : 0
	}
});

module.exports = ViewContainer;