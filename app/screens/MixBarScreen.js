import React, { Component } from 'react';
import {
  Text,
  View,
  AsyncStorage,
  ListView,
  RefreshControl
} from 'react-native';

import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import CocktailRow from '../components/CocktailRow'
import BackButton from '../components/BackButton'
import colors from '../styles/colors'

import EStyleSheet from 'react-native-extended-stylesheet'

class MixIndexPage extends Component {
  constructor(props) {
    super(props)
    ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1!=r2})
    this.state = {
      possibleCocktailsDataSource : ds.cloneWithRows({}),
      refreshing: true,
      visible: true
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('userIngredients').then((userIngredients)=>{
      userIngredients = JSON.parse(userIngredients)
      let queryString = userIngredients.join('^')
      fetch(`https://cocktailapi.herokuapp.com/api/cocktails/?filter=ingredients&type=ids&params=${queryString}`).then((res)=>{
        return res.json()
      }).then((possibleCocktails)=>{
        this.setState({
          possibleCocktailsDataSource: ds.cloneWithRows(possibleCocktails),
          refreshing: false
        })
        if(!possibleCocktails.length)
        {
          this.setState({
            noResultsMessage: "Looks like you need to add some ingredients!"
          })
        }
      }).catch((err)=>{
        console.log(err)
      })
    }).catch((err)=>{
      console.log(err)
    })
  }
  render() {
    return (
    <ViewContainer>
      <StatusBarBackground/>

      <View style={[styles.viewCenter, {backgroundColor:colors.yellow}]}>
        <BackButton nav={this.props.navigator}/>
        <Text style={styles.header}>What I Can Make</Text>
        <View/>
      </View>
      
      <Text style={styles.header}>{this.state.noResultsMessage}</Text>
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            />
        }
        dataSource = {this.state.possibleCocktailsDataSource}
        renderRow = {(cocktail)=>{return this._renderCocktailRow(cocktail)}}
        enableEmptySections = {true} />
    </ViewContainer>
    )
  }
  _renderCocktailRow(cocktail) {
    return (
      <CocktailRow 
        onPress={()=>this._navigateToCocktailShow(cocktail)}
        cocktail={cocktail}
      />
      )
  }
  _onRefresh(){
    this.setState({refreshing:true})
    AsyncStorage.getItem('userIngredients').then((userIngredients)=>{
      var queryString = JSON.parse(userIngredients).join('^')
      fetch(`https://cocktailapi.herokuapp.com/api/cocktails/?filter=ingredients&type=ids&params=${queryString}`).then((res)=>{
        return res.json()
      }).then((possibleCocktails)=>{
        this.setState({
          possibleCocktailsDataSource: ds.cloneWithRows(possibleCocktails),
          refreshing: false
        })
      }).catch((err)=>{
        console.log(err)
      })
    }).catch((err)=>{
      console.log(err)
    })
  }
  _navigateToCocktailShow(cocktail){
    this.props.navigator.props.changeSelectedTab('cocktailsTab', {'ident':'show', cocktail})
  }
}

const styles = EStyleSheet.create({
  addIngredientsText:{
    color: '$headerColor',
    fontFamily: '$appFont'
  },
  header:{
    fontFamily: "$appFont",
    fontSize: "30rem",
    color: "$headerColor",
    textAlign: 'center',
    alignSelf: 'center'
  },
  viewCenter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  }
})

module.exports = MixIndexPage;