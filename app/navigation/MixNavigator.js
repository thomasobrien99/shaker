import React, { Component } from 'react';
import {
  BackAndroid,
  Navigator
} from 'react-native';

import MixIndexScreen from '../screens/MixIndexScreen'
import MixCocktailsScreen from '../screens/MixCocktailsScreen'
import MixBarScreen from '../screens/MixBarScreen'
import MixIngredientsScreen from '../screens/MixIngredientsScreen'

class MixNavigator extends Component {
  componentDidMount(){
    BackAndroid.addEventListener('hardwareBackPress', ()=>{
      if (this.refs.mixNavigator.getCurrentRoutes().length > 1){
        this.refs.mixNavigator.pop();
        return true;
      }
      return false;
    })
  }
  _renderScene(route, navigator){
    var globalNavigatorProps = {navigator}
    switch(route.ident){
      case "index": return <MixIndexScreen {...globalNavigatorProps}/>
      case "bar": return <MixBarScreen {...globalNavigatorProps}/>
      case "ingredients": return <MixIngredientsScreen {...globalNavigatorProps}/>
      case "cocktails": return <MixCocktailsScreen {...globalNavigatorProps} />
      default: return <MixIndexScreen {...globalNavigatorProps}/>
    }

  }
  render(){
    return (
      <Navigator
      initialRoute={{ident: "index"}}
      ref="mixNavigator"
      name="mixNavigator"
      renderScene={this._renderScene}
      changeSelectedTab={this.props.changeSelectedTab} />
      )
  }
}

module.exports = MixNavigator;
