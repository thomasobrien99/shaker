import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ListView,
  AsyncStorage,
  StyleSheet,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import CocktailRow from '../components/CocktailRow'
import colors from '../styles/colors'

class MixCocktailsScreen extends Component {
  constructor(props) {
    super(props)
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      myCocktailsDataSource : ds.cloneWithRows({}),
      refreshing: false
    }
  }
  componentDidMount(){
    AsyncStorage.getItem('userCocktails').then((userCocktails)=>{
      var queryString = JSON.parse(userCocktails).join('^')
      fetch(`https://cocktailapi.herokuapp.com/api/cocktails/?filter=ids&type=ids&params=${queryString}`)
      .then((res)=>{
        return res.json()
      })
      .then(function(data){
        this.setState({
          myCocktailsDataSource : ds.cloneWithRows(data)
        })
      }.bind(this))
      .catch((err)=>{
        console.log(err)
      })
    })
    .catch((err)=>{
      console.log(err)
    })
    console.log(this.refs)
  }
  render() {
    return (
    <ViewContainer>
      <StatusBarBackground/>
      <View style={appStyles.viewCenter}>
        <Text style={appStyles.header}>My Cocktails:</Text>
      </View>
      <TouchableOpacity 
        onPress={()=>{
          this.props.navigator.props.changeSelectedTab('cocktailsTab', {ident: 'index'})
          this.props.navigator.pop()
        }}>
        <View style={[appStyles.wideRow, {backgroundColor: colors.yellow}]}>
          <Text style={[appStyles.wideRowText, {color: colors.darkBlue}]}>Add Cocktails</Text>
        </View>
      </TouchableOpacity>
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            />
        }
        dataSource = {this.state.myCocktailsDataSource}
        renderRow = {(cocktail)=>{return this._renderCocktailRow(cocktail)}}
        enableEmptySections = {true} />
    </ViewContainer>
    )
  }
  _onRefresh(){
    this.setState({refreshing:true})
    AsyncStorage.getItem('userCocktails').then((userCocktails)=>{
      var queryString = JSON.parse(userCocktails).join('^')
      fetch(`http://localhost:3000/api/cocktails/?filter=ids&type=ids&params=${queryString}`)
      .then((res)=>{
        return res.json()
      })
      .then(function(data){
        this.setState({
          myCocktailsDataSource : ds.cloneWithRows(data),
          refreshing: false
        })
      }.bind(this))
      .catch((err)=>{
        console.log(err)
      })
    })
    .catch((err)=>{
      console.log(err)
    })
    console.log(this.refs)
  }
  _renderCocktailRow(cocktail){
    return (
      <CocktailRow 
        cocktail = {cocktail} 
        onPress={()=>
          {
            this.props.navigator.props.changeSelectedTab('cocktailsTab', {'ident':'show', cocktail})
            this.props.navigator.pop()
          }}
      />
    )
  }
}

const styles = StyleSheet.create({
  cocktailRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 32,
    paddingRight: 32,
    borderColor: '#0099ff',
    borderWidth: 2,
    borderRadius: 10,
    margin: 2,
    backgroundColor: '#002699',
  },
  cocktailText:{
    color: '#ffffff',
    fontSize: 17
  }
});


module.exports = MixCocktailsScreen;