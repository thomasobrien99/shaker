import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ListView,
  RefreshControl
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet'

import StatusBarBackground from '../components/StatusBarBackground'
import ViewContainer from '../components/ViewContainer'
import CocktailRow from '../components/CocktailRow'
import toTitleCase from '../services/helpers'
import colors from '../styles/colors'
import BackButton from '../components/BackButton'

class CocktailCategoryShowScreen extends Component {
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
    fetch(`https://cocktailapi.herokuapp.com/api/cocktails?filter=category&params=${this.props.categoryName}`).then(function(res){
      return res.json()
    }).then(function(data){
      this.setState({
        ingredient : data,
        cocktailDataSource : ds.cloneWithRows(data),
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
     
      <View style={[styles.viewCenter, {backgroundColor: colors.yellow}]}>
        <BackButton nav={this.props.navigator}/>
        <Text style={styles.header}>
          Category:
        </Text>
      {/* VIEW HERE HELPS WITH CENTERING*/}
        <View/>
      </View>

      <View style={{backgroundColor: colors.yellow}}>
        <Text style={styles.header}>
          {`${toTitleCase(this.props.categoryName.replace(/[_]/g, ' ').replace(/[!]/g, '/'))}`}
        </Text>
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
        cocktail={cocktail} 
        //Pass in the onPress callback with the proper route. Cocktail.cocktail not ideal, but that is how the data is formatted.
        onPress={()=>this.props.navigator.props.changeSelectedTab('cocktailsTab', {ident:'show', cocktail: cocktail})}
        />
      )
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
  spaceBetween:{
    justifyContent: 'space-between'
  },
  viewCenter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  }
});

module.exports = CocktailCategoryShowScreen;