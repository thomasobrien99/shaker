import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  TextInput,
  RefreshControl
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import IngredientRow from '../components/IngredientRow'

import colors from '../styles/colors'

class IngredientsIndexScreen extends Component {
  constructor(props) {
    super(props)
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = { 
      ingredientDataSource : ds.cloneWithRows({}),
      ingredientData : [],
      searchText : "Search Ingredients",
      refreshing: true
    }
  }
  componentDidMount() {
    fetch("https://cocktailapi.herokuapp.com/api/ingredients/?type=ids").then(function(res){
      return res.json()
    }).then(function(data){
      this.setState({
        ingredientDataSource : ds.cloneWithRows(data),
        ingredientData : data,
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

      <View style={{backgroundColor:colors.yellow}}>
          <Text style={styles.header}>INGREDIENTS</Text>
      </View>

      <TextInput 
        onFocus={()=>this.setState({searchText:''})} 
        onChangeText={(text)=>this._updateSearchText(text)}
        style={[styles.textInput, {color: colors.darkBlue, borderColor: colors.darkBlue}]}
        value={this.state.searchText}
        />

      <ListView
        dataSource = {this.state.ingredientDataSource}
        renderRow = {(ingredient)=> { return this._renderIngredientRow(ingredient)}}
        enableEmptySections={true}
        automaticallyAdjustContentInsets={false}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            />
        } />

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
      ident: 'show',
      ingredient
    })
  }
}

const styles = EStyleSheet.create({
  header:{
    fontFamily: "$appFont",
    fontSize: "30rem",
    color: '$headerColor',
    textAlign: 'center',
    alignSelf: 'center'
  },
  textInput:{
    fontSize: "20rem",
    height: "40rem",
    borderWidth:" 2rem",
    margin: "1rem",
    borderRadius: "8rem",
    paddingHorizontal: "24rem",
    fontFamily: "$appFont"
  }
})
module.exports = IngredientsIndexScreen;