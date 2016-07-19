'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'
import ScrollableTabView from 'react-native-scrollable-tab-view'

import CocktailNavigator from './app/navigation/CocktailNavigator'
import IngredientNavigator from './app/navigation/IngredientNavigator'
import MixNavigator from './app/navigation/MixNavigator'
import ViewContainer from './app/components/ViewContainer'
import NavigationPane from './app/components/NavigationPane'

class shaker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newRoute: {tab: 'mixTab', route:'index'},
      selectedTab : 'mixTab'
    }
  }
  render(){
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'ingredientsTab'}
          title="Ingredients"
          onPress={() => this.setState({ selectedTab: 'ingredientsTab' })}>
          <IngredientNavigator
            changeSelectedTab={this._changeSelectedTab.bind(this)} 
            newRoute={this.state.newRoute}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'cocktailsTab'}
          title="Cocktails"
          onPress={() => this.setState({ selectedTab: 'cocktailsTab' })}>
          <CocktailNavigator
            changeSelectedTab={this._changeSelectedTab.bind(this)} 
            newRoute={this.state.newRoute}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'mixTab'}
          title="Mix"
          onPress={() => this.setState({ selectedTab: 'mixTab' })}>
          <MixNavigator
            changeSelectedTab={this._changeSelectedTab.bind(this)} 
            newRoute={this.state.newRoute}/>  
        </TabNavigator.Item>
      </TabNavigator>
    );
  }

 
  _changeSelectedTab(tab, newRoute){
    this.setState({selectedTab: tab, newRoute:{tab, route:newRoute}})
  }
}

const styles = StyleSheet.create({
  
});

AppRegistry.registerComponent('shaker', () => shaker);
