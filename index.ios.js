import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TabBarIOS,
  Dimensions,
  AsyncStorage,
  Platform
} from 'react-native';

import CocktailNavigator from './app/navigation/CocktailNavigator'
import IngredientNavigator from './app/navigation/IngredientNavigator'
import MixNavigator from './app/navigation/MixNavigator'


import EStylesheet from 'react-native-extended-stylesheet'

let {height, width} = Dimensions.get('window');

EStylesheet.build({
  rem: (width < 480 ? .875 : (width < 568 ? 1 : (width < 1.125 ? 1 : 1.25))),
  headerColor: '#00648c', //darkblue
  appFont: Platform.OS === 'ios' ? 'Aleo-Bold' : 'aleo_bold'
});


class shaker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: "mixTab",
      newRoute: 'index'
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
      <TabBarIOS
        selectedTab={this.state.selectedTab}>
        <TabBarIOS.Item
          selected={this.state.selectedTab==="ingredientsTab"}
          title="Ingredients"
          onPress={()=>this.setState({selectedTab : "ingredientsTab"})}
          icon={require('./app/styles/img/ingredients_icon.png')}>
          <IngredientNavigator 
            changeSelectedTab={this._changeSelectedTab.bind(this)}
            newRoute={this.state.newRoute}
            />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab==="cocktailsTab"}
          title="Cocktails"
          onPress={()=>this.setState({selectedTab : "cocktailsTab"})}
          icon={require('./app/styles/img/cocktails_icon.png')}>
          <CocktailNavigator 
            changeSelectedTab={this._changeSelectedTab.bind(this)}
            newRoute={this.state.newRoute}
            />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          selected={this.state.selectedTab==="mixTab"}
          title="My Bar"
          onPress={()=>this.setState({selectedTab : "mixTab"})}
          icon={require('./app/styles/img/bar_icon.png')}>
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

AppRegistry.registerComponent('shaker', () => shaker);
