import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  AsyncStorage
} from 'react-native';

import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import CocktailRow from '../components/CocktailRow'
import appStyles from '../styles/styles'
import colors from '../styles/colors'


class CocktailsIndexScreen extends Component {
  constructor(props) {
    super(props)
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = { 
      cocktailDataSource : ds.cloneWithRows({}),
      cocktailData: [],
      searchText: 'Search Cocktails',
      userCocktails: []
    }
  }
  componentDidMount() {
    fetch("https://cocktailapi.herokuapp.com/api/cocktails/?type=ids").then(function(res){
      return res.json()
    }).then(function(data){
      data = data.sort((a,b)=>{
        if(a.name>b.name) return 1;
        if(b.name>a.name) return -1;
        return 0;
      })
      this.setState({
        cocktailDataSource : ds.cloneWithRows(data),
        cocktailData: data
      })
    }.bind(this))
    .catch(function(err){
      console.log(err)
    });

    AsyncStorage.getItem('userCocktails').then((userCocktails)=>{
      userCocktails = JSON.parse(userCocktails)
      this.setState({userCocktails})
    }).catch((err)=>{
      console.log(err)
    })
  }
  render() {
    return (
    <ViewContainer>
      <StatusBarBackground/>
      <View style={appStyles.viewCenter}>
        <Text style={appStyles.header}>COCKTAILS</Text>
      </View>
      <TextInput 
        style={appStyles.textInput} 
        onChangeText={(text)=>this._updateSearch(text)} 
        value={this.state.searchText}
        onFocus={()=>this.setState({searchText:''})}
        />
      <ListView
        dataSource = {this.state.cocktailDataSource}
        renderRow = {(cocktail)=> { return this._renderCocktailRow(cocktail)}}
        enableEmptySections={true} />
    </ViewContainer>
    )
  }
  _updateSearch(searchText) {
    let searchTextRE = searchText.replace(/\W/g, '.');
    let re = new RegExp('\\b'+searchTextRE, 'gi');

    let searchedData = this.state.cocktailData.filter((cocktail)=>{
      return re.test(cocktail.name)
    })

    let sortedSearched = searchedData.sort((a,b)=>a.name.search(re)-b.name.search(re));

    this.setState({cocktailDataSource : ds.cloneWithRows(sortedSearched), searchText})
  }
  _renderCocktailRow(cocktail) {
    return (
      <CocktailRow 
        onPress={()=>this._navigateToCocktailShow(cocktail)}
        cocktail={cocktail}
      />
      )
  }
  _navigateToCocktailShow(cocktail){
    this.props.navigator.push({
      ident: "show",
      cocktail
    })
  }
}


module.exports = CocktailsIndexScreen;