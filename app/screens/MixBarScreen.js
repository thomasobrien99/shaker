import React, { Component } from 'react';
import {
  Text,
  View,
  AsyncStorage,
  ListView,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Dimensions
} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import CocktailRow from '../components/CocktailRow'
import BackButton from '../components/BackButton'
import appStyles from '../styles/styles'
import colors from '../styles/colors'

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

      <View style={[appStyles.viewCenter, {backgroundColor:colors.yellow}]}>
        <BackButton nav={this.props.navigator}/>
        <Text style={appStyles.header}>What I Can Make</Text>
        <View/>
      </View>
      
      <Text style={appStyles.header}>{this.state.noResultsMessage}</Text>
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

const styles = StyleSheet.create({
  addIngredientsText:{
    color: colors.darkBlue,
    fontFamily: 'Aleo-Bold'
  }
})

module.exports = MixIndexPage;