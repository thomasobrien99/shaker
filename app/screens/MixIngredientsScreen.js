import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  RefreshControl,
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/FontAwesome'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import IngredientRow from '../components/IngredientRow'
import BackButton from '../components/BackButton'
import colors from '../styles/colors'

class MixIngredientsPage extends Component {
  constructor(props) {
    super(props)
    this.state =  { 
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
      
      <View style={[styles.viewCenter, {backgroundColor:colors.yellow}]}>
        <BackButton nav={this.props.navigator}/>
        <Text style={styles.header}>My Ingredients:</Text>
        <View/>
      </View>

      <TouchableOpacity 
        onPress={()=>{
          this.props.navigator.props.changeSelectedTab('ingredientsTab', {ident:'index'})
        }}>
        <View style={[styles.wideRow, {backgroundColor: colors.beige}]}>
          <Text style={[styles.wideRowText, {color: colors.darkBlue}]}>
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
          <View style={[styles.wideRow, {backgroundColor: colors.beige}]}>
            <Text style={[styles.wideRowText, {color: colors.darkBlue}]}>Remove All Ingredients From Bar</Text>
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

const styles = EStyleSheet.create({
  header:{
    fontFamily: "$appFont",
    fontSize: "30rem",
    color: "$headerColor",
    textAlign: 'center',
    alignSelf: 'center'
  },
  spaceBetween:{
    flex:1
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
  }
});

module.exports = MixIngredientsPage;