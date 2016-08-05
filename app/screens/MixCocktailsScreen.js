import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ListView,
  AsyncStorage,
  StyleSheet,
  RefreshControl,
  ScrollView
} from 'react-native';
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
      refreshing: false,
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
          barFull: !!data.length
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
        <Text style={appStyles.header}>My Cocktails:</Text>
        <View/>
      </View>

      <TouchableOpacity 
        onPress={()=>{
          this.props.navigator.props.changeSelectedTab('cocktailsTab', {ident: 'index'})
          this.props.navigator.pop()
        }}>
        <View style={[appStyles.wideRow, {backgroundColor: colors.beige}]}>
          <Text style={[appStyles.wideRowText, {color: colors.darkBlue}]}>
            Add Cocktails
          </Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.spaceBetween}>
        
        <View style={[appStyles.mixScrollBox]}>
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
              <View style={[appStyles.wideRow, {backgroundColor: colors.beige}]}>
                <Text style={[appStyles.wideRowText, {color: colors.darkBlue}, styles.textTest]}>Remove All Cocktails From Bar</Text>
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

const styles = StyleSheet.create({
  spaceBetween:{
    flex:1,
    justifyContent: 'space-between'
  }
});


module.exports = MixCocktailsScreen;