import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ListView,
  ScrollView,
  AsyncStorage,
  RefreshControl,
  StyleSheet
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
      ingredientData:[],
      refreshing: true,
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
          ingredientData: data,
          barEmpty : !!data.length,
          refreshing: false,
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
      
      <View style={[appStyles.viewCenter, {backgroundColor:colors.yellow}]}>
        <BackButton nav={this.props.navigator}/>
        <Text style={appStyles.header}>My Ingredients:</Text>
        <View/>
      </View>

      <TouchableOpacity 
        onPress={()=>{
          this.props.navigator.props.changeSelectedTab('ingredientsTab', {ident:'index'})
        }}>
        <View style={[appStyles.wideRow, {backgroundColor: colors.beige}]}>
          <Text style={[appStyles.wideRowText, {color: colors.darkBlue}]}>
            Add Ingredients
          </Text>
        </View>
      </TouchableOpacity>
      
      
        
        <View style={styles.spaceBetween}>
          <ScrollView
            style={{padding: 5}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
                />
            }>
            {this.state.ingredientData.map((ingredient, i)=>this._renderIngredientRow(ingredient, i))}
          </ScrollView>
        </View>

        {this.state.barEmpty ?
        <TouchableOpacity 
          onPress={()=>{
            this._emptyBarIngredients()
            this.props.navigator.pop()
          }}>
          <View style={[appStyles.wideRow, {backgroundColor: colors.beige}]}>
            <Text style={[appStyles.wideRowText, {color: colors.darkBlue}]}>Remove All Ingredients From Bar</Text>
          </View>
        </TouchableOpacity>:<Text/>}
      

    
    </ViewContainer>
    )
  }
  _renderIngredientRow(ingredient, i){
    return (
      <IngredientRow 
        onPress={()=>{ 
          this.props.navigator.props.changeSelectedTab('ingredientsTab', {'ident':'show', ingredient})
          this.props.navigator.pop()
        }} 
        ingredient = {ingredient}
        key={i}
      />
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

const styles = StyleSheet.create({
  spaceBetween:{
    flex:1
  }
});

module.exports = MixIngredientsPage;