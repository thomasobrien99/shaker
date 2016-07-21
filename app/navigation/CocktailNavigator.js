import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator
} from 'react-native';

import CocktailsIndexScreen from '../screens/CocktailsIndexScreen'
import CocktailsShowScreen from '../screens/CocktailsShowScreen'
import CocktailsByNameScreen from '../screens/CocktailsByNameScreen'
import CocktailsByIngredientScreen from '../screens/CocktailsByIngredientScreen'
import CocktailsByCategoryScreen from '../screens/CocktailsByCategoryScreen'
import CocktailCategoryShowScreen from '../screens/CocktailCategoryShowScreen'


class CocktailNavigator extends Component {
  componentWillReceiveProps(props){
    if (props.newRoute.tab === 'cocktailsTab'){
      let currentRoute = this.refs.cocktailNavigator.getCurrentRoutes().slice().pop()
      if(props.newRoute.route.ident === currentRoute.ident){
        this.refs.cocktailNavigator.replace(props.newRoute.route)
      } else{
        this.refs.cocktailNavigator.push(props.newRoute.route);
      }
    }
  }
  _renderScene(route, navigator){
    var globalNavigatorProps = {navigator}
    switch(route.ident){
      case "index": return <CocktailsIndexScreen {...globalNavigatorProps}/>
      case "cocktailsByName": return <CocktailsByNameScreen {...globalNavigatorProps}/>
      case "cocktailsByCategory": return <CocktailsByCategoryScreen {...globalNavigatorProps}/>
      case "cocktailsByIngredient": return <CocktailsByIngredientScreen {...globalNavigatorProps}/>
      case "show" : return <CocktailsShowScreen {...globalNavigatorProps} cocktail = {route.cocktail}/>
      case "showCategory" : return <CocktailCategoryShowScreen {...globalNavigatorProps} categoryName = {route.categoryName}/>
      default: return <CocktailsIndexScreen {...globalNavigatorProps}/>
    }
  }
  render(){
    return (
      <Navigator
      initialRoute={{ident: "index"}}
      ref="cocktailNavigator"
      renderScene={this._renderScene}
      changeSelectedTab={this.props.changeSelectedTab} />
      )
  }
}

module.exports = CocktailNavigator;
