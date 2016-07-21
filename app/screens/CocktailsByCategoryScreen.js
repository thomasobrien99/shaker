import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity
} from 'react-native';

import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import CocktailRow from '../components/CocktailRow'
import appStyles from '../styles/styles'
import colors from '../styles/colors'
import toTitleCase from '../services/helpers'
import BackButton from '../components/BackButton'

const categories = [
{name: 'Ordinary Drink'},
{name: 'Cocktail'},
{name: 'Shot'},
{name: 'Other/Unknown'},
{name: 'Punch / Party Drink'},
{name: "Coffee / Tea"},
{name: "Soft Drink / Soda"},
{name: "Cocoa"},
{name: "Homemade Liqueur"},
{name: "Beer"},
]

class CocktailsByCategoryScreen extends Component {
  constructor(props) {
    super(props)
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = { 
      cocktailDataSource : ds.cloneWithRows(categories),
    }
  }
  render() {
    return (
    <ViewContainer>
      <StatusBarBackground/>
      <BackButton nav={this.props.navigator}/>
      <View style={[appStyles.viewCenter, {backgroundColor: colors.yellow}]}>
        <Text style={appStyles.header}>COCKTAIL CATEGORIES</Text>
      </View>
      <ListView
        dataSource = {this.state.cocktailDataSource}
        renderRow = {(category)=> { return this._renderCategoryRow(category)}}
        enableEmptySections={true}
        automaticallyAdjustContentInsets={false}
        />
    </ViewContainer>
    )
  }
  _renderCategoryRow(category) {
    return (
      <TouchableOpacity style={[appStyles.wideRow, {backgroundColor:colors.darkBlue}]} onPress={()=>this._navigateToCategoryShow(category.name)}>
        <Text style={[appStyles.wideRowText, {color:'white'}]}>{toTitleCase(category.name)}</Text>
      </TouchableOpacity>
      )
  }
  _navigateToCategoryShow(categoryName){
  	categoryName = categoryName.replace(/[ ]/g, '_')
  	categoryName = categoryName.replace(/[\/]/g, '!')
    this.props.navigator.push({
      ident: "showCategory",
      categoryName: categoryName
    })
  }
}


module.exports = CocktailsByCategoryScreen;