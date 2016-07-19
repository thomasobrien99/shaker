import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TabBarIOS
} from 'react-native';

import CocktailNavigator from './app/navigation/CocktailNavigator'
import IngredientNavigator from './app/navigation/IngredientNavigator'
import MixNavigator from './app/navigation/MixNavigator'

class shaker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: "mixTab",
      newRoute: 'index'
    }
  }
  render(){
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab==="ingredientsTab"}
          title="Ingredients"
          onPress={()=>this.setState({selectedTab : "ingredientsTab"})}>
          <IngredientNavigator 
            changeSelectedTab={this._changeSelectedTab.bind(this)}
            newRoute={this.state.newRoute}
            />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab==="cocktailsTab"}
          title="Cocktails"
          onPress={()=>this.setState({selectedTab : "cocktailsTab"})}>
          <CocktailNavigator 
            changeSelectedTab={this._changeSelectedTab.bind(this)}
            newRoute={this.state.newRoute}
            />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab==="mixTab"}
          title="My Bar"
          onPress={()=>this.setState({selectedTab : "mixTab"})}>
          <MixNavigator 
            changeSelectedTab={this._changeSelectedTab.bind(this)} 
            newRoute={this.state.newRoute}
            />
        </TabBarIOS.Item>
      </TabBarIOS>
      
      )
  }
  _changeSelectedTab(tab, newRoute){
    this.setState({selectedTab: tab, newRoute:{tab, route:newRoute}})
  }
}

const styles = StyleSheet.create({
  
});

AppRegistry.registerComponent('shaker', () => shaker);
