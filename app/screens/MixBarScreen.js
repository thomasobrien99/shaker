import React, { Component } from 'react';
import {
  Text,
  View,
  AsyncStorage,
  ListView,
  ScrollView,
  StyleSheet
} from 'react-native';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import CocktailRow from '../components/CocktailRow'
import appStyles from '../styles/styles'
import colors from '../styles/colors'

class MixIndexPage extends Component {
  constructor(props) {
    super(props)
    ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1!=r2})
    this.state = {
      possibleCocktailsDataSource : ds.cloneWithRows({}),
      possibleCocktails : []
    }
  }
  componentDidMount() {
    AsyncStorage.getItem('userIngredients').then((userIngredients)=>{
      userIngredients = JSON.parse(userIngredients)
      let queryString = userIngredients.join('^')
      fetch(`https://cocktailapi.herokuapp.com/api/cocktails/?filter=ingredients&type=ids&params=${queryString}`).then((res)=>{
        return res.json()
      }).then((possibleCocktails)=>{
        this.setState({possibleCocktails})
      }).catch((err)=>{
        console.log(err)
      })
    }).catch((err)=>{
      console.log(err)
    })
  }
  render() {
    return (
    <ViewContainer>
      <StatusBarBackground/>
      <View style={appStyles.viewCenter}>
        <Text style={appStyles.header}>What I Can Make</Text>
      </View>
      <ScrollView>
      {this._renderPossibleCocktails()}
      </ScrollView>
    </ViewContainer>
    )
  }
  _renderPossibleCocktails(){
    if (!this.state.possibleCocktails.length){
      return (
        <View style={[appStyles.viewCenter, appStyles.wideRow]}>
          <Text style={styles.addIngredientsText}>Add Some Ingredients To See Possible Cocktails!</Text>
        </View>
        )
      }
    return this.state.possibleCocktails.map((cocktail, i)=>{
        return <CocktailRow 
          key = {i} 
          cocktail = {cocktail}
          onPress={()=>
          { 
            this.props.navigator.props.changeSelectedTab('cocktailsTab', {'ident':'show', cocktail})
            this.props.navigator.pop()
          }}
          />
      })
  }
}

const styles = StyleSheet.create({
  addIngredientsText:{
    color: colors.darkBlue,
    fontFamily: 'Aleo-Bold'
  }
})

module.exports = MixIndexPage;