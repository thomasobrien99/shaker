import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  ListView
} from 'react-native';

import MixIndexScreen from '../screens/MixIndexScreen'
import MixCocktailsScreen from '../screens/MixCocktailsScreen'
import MixBarScreen from '../screens/MixBarScreen'
import MixIngredientsScreen from '../screens/MixIngredientsScreen'

class MixNavigator extends Component {
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
      style={styles.navigatorStyles}
      renderScene={this._renderScene}
      changeSelectedTab={this.props.changeSelectedTab} />
      )
  }
}

const styles = StyleSheet.create({
  
});

module.exports = MixNavigator;
