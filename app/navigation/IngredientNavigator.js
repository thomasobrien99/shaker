'use strict'
import React, { Component } from 'react';
import {Navigator, StyleSheet} from 'react-native';

import IngredientsIndexScreen from '../screens/IngredientsIndexScreen'
import IngredientsShowScreen from '../screens/IngredientsShowScreen'

class IngredientNavigator extends Component {
  componentWillReceiveProps(props){
    console.log(this.props)
    if (props.newRoute.tab === 'ingredientsTab'){
      //Make a copy of the routes, and pop off the most recent one
      let currentRoute = this.refs.ingredientNavigator.getCurrentRoutes().slice().pop()
      //compare the new routes ident with the current ident
      if(props.newRoute.route.ident === currentRoute.ident){
        //if its the same, replace that scene
        this.refs.ingredientNavigator.replace(props.newRoute.route)
      } else{
        //if not, just push a new scene
        this.refs.ingredientNavigator.push(props.newRoute.route);
      }
    }
  }
  _renderScene(route, navigator){
    var globalNavigatorProps = {navigator}
    console.log(this.props)
    switch(route.ident){
      case "index": return <IngredientsIndexScreen {...globalNavigatorProps}/>
      case "show" : return <IngredientsShowScreen {...globalNavigatorProps} ingredient = {route.ingredient}/>
      default: return <IngredientsIndexScreen {...globalNavigatorProps}/>
    }

  }
  render(){
    return (
      <Navigator
      initialRoute={{ident: "index"}}
      ref="ingredientNavigator"
      style={styles.navigatorStyles}
      renderScene={this._renderScene}
      changeSelectedTab={this.props.changeSelectedTab} />
      )
  }
}
const styles = StyleSheet.create({
  
})

module.exports = IngredientNavigator;
