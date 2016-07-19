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
import appStyles from '../styles/styles'
import colors from '../styles/colors'

class MixIngredientsPage extends Component {
  constructor(props) {
    super(props)
    ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2})
    this.state =  { myIngredientsDatasource : ds.cloneWithRows({}), refreshing: false}
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
          myIngredientsDatasource : ds.cloneWithRows(data)
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
      <View style={appStyles.viewCenter}>
      <Text style={appStyles.header}>My Ingredients:</Text>
      </View>
      <TouchableOpacity onPress={()=>this.props.navigator.props.changeSelectedTab('ingredientsTab', {ident:'index'})}>
        <View style={[appStyles.wideRow, {backgroundColor: colors.darkBlue}]}>
          <Text style={[appStyles.wideRowText, {color: 'white'}]}>Add Ingredients</Text>
        </View>
      </TouchableOpacity>
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
  _onRefresh(){
    this.setState({refreshing:true})
    AsyncStorage.getItem('userIngredients').then((userIngredients)=>{
      var queryString = JSON.parse(userIngredients).join('^')
      fetch(`http://localhost:3000/api/ingredients/?filter=ids&type=ids&params=${queryString}`)
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