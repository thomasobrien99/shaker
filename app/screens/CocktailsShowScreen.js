import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
  ScrollView,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import IngredientRow from '../components/IngredientRow'
import toTitleCase from '../services/helpers'
import appStyles from '../styles/styles'
import colors from '../styles/colors'
import BackButton from '../components/BackButton'

const martini_glass = require('../styles/img/martini_glass.png');
const hurricane_glass = require('../styles/img/hurricane_glass.png');
const shot_glass = require('../styles/img/shot_glass.png');
const highball_glass = require('../styles/img/highball_glass.png');
const default_glass = require('../styles/img/default_glass.png');
const coffee_glass = require('../styles/img/coffee_glass.png');
const pitcher_glass = require('../styles/img/pitcher_glass.png');
const wine_glass = require('../styles/img/wine_glass.png');
const champagne_glass = require('../styles/img/champagne_glass.png');
const old_fashioned_glass = require('../styles/img/old_fashioned_glass.png');


class CocktailShowScreen extends Component {
  constructor(props) {
    super(props)
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      cocktail : {ingredients:[]},
      cocktailGlassImg : martini_glass,
      ingredientDataSource: ds.cloneWithRows({}),
      refreshing: true
    }
  }
  componentDidMount (){
    fetch(`https://cocktailapi.herokuapp.com/api/cocktails/${this.props.cocktail.id}`).then(function(res){
      return res.json()
    }).then(function(data){
      let cocktailGlassImg = data.glass.toLowerCase().replace(/[ ]/g,'_');
      switch(cocktailGlassImg){
        case 'martini_glass': cocktailGlassImg = martini_glass; break;
        case 'hurricane_glass': cocktailGlassImg = hurricane_glass; break;
        case 'highball_glass': cocktailGlassImg = highball_glass; break;
        case 'collins_glass': cocktailGlassImg = highball_glass; break;
        case 'cocktail_glass': cocktailGlassImg = martini_glass; break;
        case 'shot_glass': cocktailGlassImg = shot_glass; break;
        case 'irish_coffee_cup': cocktailGlassImg = coffee_glass; break;
        case 'pitcher': cocktailGlassImg = pitcher_glass; break;
        case 'white_wine_glass': cocktailGlassImg = wine_glass; break;
        case 'champagne_flute': cocktailGlassImg = champagne_glass; break;
        case 'old-fashioned_glass': cocktailGlassImg = old_fashioned_glass; break;
        default : cocktailGlassImg = default_glass; break;
      }
      this.setState({
        cocktail : data,
        cocktailGlassImg,
        ingredientDataSource: ds.cloneWithRows(data.ingredients),
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
      <BackButton nav={this.props.navigator}/>
      <View style={[appStyles.viewCenter, styles.borderBottom]}>
        <Image source={this.state.cocktailGlassImg} style = {appStyles.largeImage}/>
        <Text style={appStyles.header}>{toTitleCase(this.state.cocktail.name)}</Text>
      </View>
      <ScrollView 
        style={styles.cocktailBody}
        refreshControl={
          <RefreshControl
            refreshing = {this.state.refreshing}
            />
          }>
        <View style={[appStyles.glassBox, {backgroundColor:colors.beige}]}>
          <Text style={[{color: colors.darkBlue}, appStyles.glassText]}>{toTitleCase(this.state.cocktail.glass)}</Text>
        </View>
          {this.state.cocktail.ingredients.map((ingredient, i)=>{
            if (ingredient.amount === '\n') ingredient.amount = ''
            return <IngredientRow 
                    ingredient={ingredient.ingredient} 
                    amount={ingredient.amount} 
                    key={i} 
                    onPress={()=>this.props.navigator.props.changeSelectedTab('ingredientsTab', {ident:'show', ingredient: ingredient.ingredient})}/>
          })}
          <View style={styles.recipeBox}>
            <Text style={appStyles.recipeText}>
              {this.state.cocktail.recipe}
            </Text>
          </View>
        <View style={appStyles.tabBarSpacer}/>
      </ScrollView>
    </ViewContainer>
    )
  }
}

const styles = StyleSheet.create({
  borderBottom:{
    paddingBottom: 10,
    borderBottomWidth: 10,
    borderBottomColor: colors.darkBlue
  },
  cocktailBody:{
    padding: 20
  },
  recipeBox:{
    borderWidth: 1,
    borderColor: colors.beige,
    backgroundColor: colors.gray,
    padding: 5
  }
});

module.exports = CocktailShowScreen;