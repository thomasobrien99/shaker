'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Image,
  Dimensions,
  Platform,
  BackAndroid
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'
import EStylesheet from 'react-native-extended-stylesheet'

import CocktailNavigator from './app/navigation/CocktailNavigator'
import IngredientNavigator from './app/navigation/IngredientNavigator'
import MixNavigator from './app/navigation/MixNavigator'

let {height, width} = Dimensions.get('window');

EStylesheet.build({
  rem: (width < 480 ? .875 : (width < 568 ? 1 : (width < 1.125 ? 1 : 1.25))),
  headerColor: "#00648c", //darkblue
  appFont: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold'
});

class shaker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newRoute: {tab: 'mixTab', route:'index'},
      selectedTab : 'mixTab'
    }
  }
  componentDidMount(){
    AsyncStorage.getItem('userIngredients').then((data)=>{
      let userIngredients = JSON.parse(data) || []
      userIngredients.push(31)//ADD ICE TO USER INGREDIENTS ON START
      userIngredients.push(129)//ADD WATER TO USER INGREDIENTS ON START
      userIngredients = Array.from(new Set(userIngredients))
      AsyncStorage.setItem('userIngredients', JSON.stringify(userIngredients)).then(()=>{
        console.log('Success!')
      }).catch((err)=>{console.log(err)
      })
    }).catch((err)=>{console.log(err)
    })
  }
  render(){
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'ingredientsTab'}
          title="Ingredients"
          onPress={() => this.setState({ selectedTab: 'ingredientsTab' })}
          renderIcon = {()=><Image source={require('./app/styles/img/ingredients_icon.png')}/>}>
          <IngredientNavigator
            changeSelectedTab={this._changeSelectedTab.bind(this)} 
            newRoute={this.state.newRoute}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'cocktailsTab'}
          title="Cocktails"
          onPress={() => this.setState({ selectedTab: 'cocktailsTab' })}
          renderIcon = {()=><Image source={require('./app/styles/img/cocktails_icon.png')}/>}>
          <CocktailNavigator
            changeSelectedTab={this._changeSelectedTab.bind(this)} 
            newRoute={this.state.newRoute}/>
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'mixTab'}
          title="Mix"
          onPress={() => this.setState({ selectedTab: 'mixTab' })}
          renderIcon = {()=><Image source={require('./app/styles/img/bar_icon.png')}/>}>
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


AppRegistry.registerComponent('shaker', () => shaker);
