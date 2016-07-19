import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput
} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import IngredientRow from '../components/IngredientRow'
import appStyles from '../styles/styles'

class IngredientsIndexScreen extends Component {
  constructor(props) {
    super(props)
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = { 
      ingredientDataSource : ds.cloneWithRows({}),
      ingredientData : [],
      searchText : "Search Ingredients"
    }
  }
  componentDidMount() {
    fetch("https://cocktailapi.herokuapp.com/api/ingredients/?type=ids").then(function(res){
      return res.json()
    }).then(function(data){
      this.setState({
        ingredientDataSource : ds.cloneWithRows(data),
        ingredientData : data
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
      <View style={appStyles.viewCenter}>
          <Text style={appStyles.header}>INGREDIENTS</Text>
      </View>
      <TextInput 
        onFocus={()=>this.setState({searchText:''})} 
        onChangeText={(text)=>this._updateSearchText(text)}
        style={appStyles.textInput}
        value={this.state.searchText}
        />
      <ListView
        dataSource = {this.state.ingredientDataSource}
        renderRow = {(ingredient)=> { return this._renderIngredientRow(ingredient)}}
        enableEmptySections={true} />
    </ViewContainer>
    )
  }
  _updateSearchText(searchText){
    let searchTextRE = searchText.replace(/\W/g, '.');
    let re = new RegExp('\\b'+searchTextRE, 'gi');

    let searchedData = this.state.ingredientData.filter((ingredient)=>{
      return re.test(ingredient.name)
    })

    let sortedSearched = searchedData.sort((a,b)=>a.name.search(re)-b.name.search(re));

    this.setState({ingredientDataSource : ds.cloneWithRows(sortedSearched), searchText})
  }
  _renderIngredientRow(ingredient) {
    return (
      <IngredientRow onPress={()=>this._navigateToIngredientShow(ingredient)} ingredient={ingredient} />
    )
  }
  _navigateToIngredientShow(ingredient){
    this.props.navigator.push({
      ident: "show",
      ingredient
    })
  }
}

module.exports = IngredientsIndexScreen;