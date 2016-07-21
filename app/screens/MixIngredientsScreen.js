import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ListView,
  AsyncStorage,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import IngredientRow from '../components/IngredientRow'
import BackButton from '../components/BackButton'
import appStyles from '../styles/styles'
import colors from '../styles/colors'

class MixIngredientsPage extends Component {
  constructor(props) {
    super(props)
    ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2})
    this.state =  { 
      myIngredientsDatasource : ds.cloneWithRows({}), 
      refreshing: false,
      barEmpty: false
    }
  }
  componentDidMount(){
    AsyncStorage.getItem('userIngredients').then((userIngredients)=>{
      var queryString = userIngredients ? JSON.parse(userIngredients).join('^') : ''
      fetch(`https://cocktailapi.herokuapp.com/api/ingredients/?filter=ids&type=ids&params=${queryString}`)
      .then((res)=>{
        return res.json()
      })
      .then(function(data){
        console.log(data)
        this.setState({
          myIngredientsDatasource : ds.cloneWithRows(data),
          barEmpty : !!data.length
        })
      }.bind(this))
      .catch((err)=>{
        console.log(err)
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  render() {
    return (
    <ViewContainer>
      <StatusBarBackground/>
      <BackButton nav={this.props.navigator}/>
      <View style={appStyles.viewCenter}>
      <Text style={appStyles.header}>My Ingredients:</Text>
      </View>
      <TouchableOpacity onPress={()=>this.props.navigator.props.changeSelectedTab('ingredientsTab', {ident:'index'})}>
        <View style={[appStyles.wideRow, {backgroundColor: colors.darkBlue}]}>
          <Text style={[appStyles.wideRowText, {color: 'white'}]}>Add Ingredients</Text>
        </View>
      </TouchableOpacity>
      {this.state.barEmpty ?
        <TouchableOpacity 
        onPress={()=>{
          this._emptyBarIngredients()
          this.props.navigator.pop()
        }}>
        <View style={[appStyles.wideRow, {backgroundColor: 'white'}]}>
          <Text style={[appStyles.wideRowText, {color: colors.darkBlue}]}>Remove All Ingredients From Bar</Text>
        </View>
      </TouchableOpacity>:<Text/>}
      <ListView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            />
        }
        dataSource = {this.state.myIngredientsDatasource}
        renderRow = {(ingredient)=>{return this._renderIngredientRow(ingredient)}}
        enableEmptySections = {true} />
    </ViewContainer>
    )
  }
  _renderIngredientRow(ingredient){
    return (
      <IngredientRow onPress={()=>
          { 
            this.props.navigator.props.changeSelectedTab('ingredientsTab', {'ident':'show', ingredient})
            this.props.navigator.pop()
          }} 
          ingredient = {ingredient} />
    )
  }
   _emptyBarIngredients(){
    AsyncStorage.setItem('userIngredients', JSON.stringify([])).then(()=>{
      console.log('success!')
    }).catch((err)=>{
      console.log(err)
    })
  }
  _onRefresh(){
    this.setState({refreshing:true})
    AsyncStorage.getItem('userIngredients').then((userIngredients)=>{
      var queryString = JSON.parse(userIngredients).join('^')
      fetch(`https://cocktailapi.herokuapp.com/api/ingredients/?filter=ids&type=ids&params=${queryString}`)
      .then((res)=>{
        return res.json()
      })
      .then(function(data){
        this.setState({
          myIngredientsDatasource : ds.cloneWithRows(data),
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
  }
}

module.exports = MixIngredientsPage;