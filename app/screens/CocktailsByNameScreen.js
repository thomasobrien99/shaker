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
import CocktailRow from '../components/CocktailRow'
import colors from '../styles/colors'
import BackButton from '../components/BackButton'


class CocktailsByNameScreen extends Component {
  constructor(props) {
    super(props)
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = { 
      cocktailDataSource : ds.cloneWithRows({}),
      cocktailData: [],
      searchText: 'Search Cocktails',
      refreshing: true
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
        cocktailData: data,
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

      <View style={[styles.viewCenter, {backgroundColor:colors.yellow}]}>
        <BackButton nav={this.props.navigator}/>
        <Text style={styles.header}>COCKTAILS</Text>
        <View/>
      </View>
      
      <TextInput 
        style={[styles.textInput, {color: colors.darkBlue, borderColor: colors.darkBlue}]}
        onChangeText={(text)=>this._updateSearch(text)} 
        value={this.state.searchText}
        onFocus={()=>this.setState({searchText:''})}
        />
      <ListView
        dataSource = {this.state.cocktailDataSource}
        renderRow = {(cocktail)=> { return this._renderCocktailRow(cocktail)}}
        enableEmptySections={true}
        automaticallyAdjustContentInsets={false}
        refreshControl = {
          <RefreshControl
          refreshing = {this.state.refreshing}
          />} 
        />
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

const styles = EStyleSheet.create({
  header:{
    fontFamily: "$appFont",
    fontSize: "30rem",
    color: "$headerColor",
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
    fontFamily: '$appFont'
  },
  viewCenter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  }
})

module.exports = CocktailsByNameScreen;