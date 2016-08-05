import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import StatusBarBackground from '../components/StatusBarBackground'
import ViewContainer from '../components/ViewContainer'
import CocktailRow from '../components/CocktailRow'
import BackButton from '../components/BackButton'
import toTitleCase from '../services/helpers'
import appStyles from '../styles/styles'
import colors from '../styles/colors'

class IngredientsShowScreen extends Component {
  constructor(props) {
    super(props)
    ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2})
    this.state = {
      ingredient : {},
      cocktailDataSource: ds.cloneWithRows({}),
      refreshing: true
    }
  }
  componentDidMount(){
    fetch(`https://cocktailapi.herokuapp.com/api/ingredients/${this.props.ingredient.id}`).then(function(res){
      return res.json()
    }).then(function(data){
      this.setState({
        ingredient : data,
        cocktailDataSource : ds.cloneWithRows(data.cocktails),
        refreshing: false
      })   
    }.bind(this))
    .catch(function(err){
      console.log(err)
    });
  }
  render() {
    return (
    <ViewContainer>
      
      <StatusBarBackground/>
      
      <View style={[appStyles.viewCenter,{backgroundColor:colors.yellow}]}>
        <BackButton nav={this.props.navigator}/>
        <Text style={[appStyles.header]}>{toTitleCase(this.state.ingredient.name)}</Text>
        <View/>
      </View>

      <View style={{backgroundColor: colors.yellow}}>
        <Text style={appStyles.header}>Make These Drinks:</Text>
      </View>
      
      <ListView
        dataSource = {this.state.cocktailDataSource}
        renderRow = {(cocktail)=>{return this._renderCocktailRow(cocktail)}}
        enableEmptySections={true} 
        refreshControl = {
          <RefreshControl
            refreshing = {this.state.refreshing}
          />}
          />
    </ViewContainer>
    )
  }
  _renderCocktailRow (cocktail){
    return (
      <CocktailRow 
        cocktail={cocktail.cocktail} 
        //Pass in the onPress callback with the proper route. Cocktail.cocktail not ideal, but that is how the data is formatted.
        onPress={()=>this.props.navigator.props.changeSelectedTab('cocktailsTab', {ident:'show', cocktail: cocktail.cocktail})}
        />
      )
  }
}


module.exports = IngredientsShowScreen;