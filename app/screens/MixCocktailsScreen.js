import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ListView,
  AsyncStorage,
  RefreshControl,
  ScrollView
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/FontAwesome'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import CocktailRow from '../components/CocktailRow'
import BackButton from '../components/BackButton'
import colors from '../styles/colors'

class MixCocktailsScreen extends Component {
  constructor(props) {
    super(props)
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    this.state = {
      myCocktailsDataSource : ds.cloneWithRows({}),
      refreshing: true,
      cocktailData:[],
      barFull: false
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
          myCocktailsDataSource : ds.cloneWithRows(data),
          cocktailData:data,
          barFull: !!data.length,
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
  render() {
    return (
    <ViewContainer>
      
      <StatusBarBackground/>

      <View style={[styles.viewCenter, {backgroundColor:colors.yellow}]}>
        <BackButton nav={this.props.navigator}/>
        <Text style={styles.header}>My Cocktails:</Text>
        <View/>
      </View>

      <TouchableOpacity 
        onPress={()=>{
          this.props.navigator.props.changeSelectedTab('cocktailsTab', {ident: 'index'})
          this.props.navigator.pop()
        }}>
        <View style={[styles.wideRow, {backgroundColor: colors.beige}]}>
          <Text style={[styles.wideRowText, {color: colors.darkBlue}]}>
            Add Cocktails
          </Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.spaceBetween}>
        
        <View style={[styles.mixScrollBox, {borderColor:colors.beige}]}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}/>
              }>
            {this.state.cocktailData.map((cocktail, i)=>this._renderCocktailRow(cocktail, i))}
          </ScrollView>
        </View>

        {this.state.barFull ?
          <TouchableOpacity 
            style={styles.test}
            onPress={()=>{
              this._emptyBarCocktails()
              this.props.navigator.pop()
            }}>
              <View style={[styles.wideRow, {backgroundColor: colors.beige}]}>
                <Text style={[styles.wideRowText, {color: colors.darkBlue}, styles.textTest]}>Remove All Cocktails From Bar</Text>
              </View>
          </TouchableOpacity>:<Text/>}
      
      </View>
    
    </ViewContainer>
    )
  }
  _emptyBarCocktails(){
    AsyncStorage.setItem('userCocktails', JSON.stringify([])).then(()=>{
      console.log('success!')
    }).catch((err)=>{
      console.log(err)
    })
  }
  _onRefresh(){
    this.setState({refreshing:true})
    AsyncStorage.getItem('userCocktails').then((userCocktails)=>{
      var queryString = JSON.parse(userCocktails).join('^')
      fetch(`https://cocktailapi.herokuapp.com/api/cocktails/?filter=ids&type=ids&params=${queryString}`)
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
  _renderCocktailRow(cocktail,i){
    return (
      <CocktailRow 
        cocktail = {cocktail}
        key={i} 
        onPress={()=>
          {
            this.props.navigator.props.changeSelectedTab('cocktailsTab', {'ident':'show', cocktail})
            this.props.navigator.pop()
          }}
      />
    )
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
  },
  mixScrollBox:{
    margin: "16rem",
    height: "600rem",
  }
});


module.exports = MixCocktailsScreen;