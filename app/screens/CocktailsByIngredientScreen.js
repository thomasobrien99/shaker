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
import colors from '../styles/colors'
import toTitleCase from '../services/helpers'

import EStyleSheet from 'react-native-extended-stylesheet'
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
      <View style={styles.viewCenter}>
        <Text style={styles.header}>COCKTAIL CATEGORIES</Text>
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
      <TouchableOpacity style={[styles.wideRow, {backgroundColor:colors.darkBlue}]} onPress={()=>this._navigateToCategoryShow(category.name)}>
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

const styles = EStyleSheet.create({
  header:{
    fontFamily: '$appFont',
    fontSize: "30rem",
    color: '$headerColor',
    textAlign: 'center',
    alignSelf: 'center'
  },
  viewCenter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  wideRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: "12rem",
    paddingHorizontal: "24rem",
    borderWidth:"2rem",
    borderRadius:"8rem",
    margin:"1rem",
  },
  wideRowText:{
    fontSize: "18rem",
    fontFamily: "$appFont"
  },
})

module.exports = CocktailsByCategoryScreen;