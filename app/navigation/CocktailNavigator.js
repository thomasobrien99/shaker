import React, { Component } from 'react';
import {
  StyleSheet,
  Navigator
} from 'react-native';

import CocktailsIndexScreen from '../screens/CocktailsIndexScreen'
import CocktailsShowScreen from '../screens/CocktailsShowScreen'

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
      case "show" : return <CocktailsShowScreen {...globalNavigatorProps} cocktail = {route.cocktail}/>
      default: return <CocktailsIndexScreen {...globalNavigatorProps}/>
    }
  }
  render(){
    return (
      <Navigator
      initialRoute={{ident: "index"}}
      ref="cocktailNavigator"
      style={styles.navigatorStyles}
      renderScene={this._renderScene}
      changeSelectedTab={this.props.changeSelectedTab} />
      )
  }
}

const styles = StyleSheet.create({
  
});

module.exports = CocktailNavigator;
