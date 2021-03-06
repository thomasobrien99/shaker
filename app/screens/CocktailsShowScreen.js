import React, { Component } from 'react';
import {
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

import colors from '../styles/colors'
import BackButton from '../components/BackButton'

import EStyleSheet from 'react-native-extended-stylesheet'

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

      <View style={[styles.viewCenter, {backgroundColor: colors.yellow}]}>
        <BackButton nav={this.props.navigator}/>
        <Text style={styles.header}>
          {toTitleCase(this.state.cocktail.name)}
        </Text>
        {/* View here helps with centering the Cocktail Name */} 
        <View/>
      </View>

      <View style={[styles.viewCenter, {alignSelf:'center'}, styles.borderBottom]}>
        <Image source={this.state.cocktailGlassImg} style = {styles.largeImage}/>
      </View>

      <View style={styles.cocktailBodyContainer}>
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing = {this.state.refreshing}
            />
          }>
        
        <View style={styles.cocktailBody}>
          <View style={[styles.glassBox, {backgroundColor:colors.yellow}]}>
            <Text style={[{color: colors.darkBlue}, styles.glassText]}>{toTitleCase(this.state.cocktail.glass)}</Text>
          </View>

          {this.state.cocktail.ingredients.map((ingredient, i)=>{
            if (ingredient.amount === '\n') ingredient.amount = ''
            return <IngredientRow 
                    ingredient={ingredient.ingredient} 
                    amount={ingredient.amount} 
                    key={i}
                    style={{backgroundColor: colors.yellow, color: colors.darkBlue}}
                    onPress={()=>this.props.navigator.props.changeSelectedTab('ingredientsTab', {ident:'show', ingredient: ingredient.ingredient})}/>
          })}

          <View style={styles.recipeBox}>
            <Text style={styles.recipeText}>
              {this.state.cocktail.recipe}
            </Text>
          </View>

        </View>
      </ScrollView>
    </View>

    </ViewContainer>
    )
  }
}

const styles = EStyleSheet.create({
  borderBottom:{
    paddingBottom: 10,
    borderBottomWidth: 10,
    borderBottomColor: colors.darkBlue
  },
  cocktailBodyContainer:{
    padding: 15,
    alignItems: 'center',
    flex: 1
  },
  cocktailBody:{
    alignSelf: 'center',
    backgroundColor: colors.beige,
    padding: 15,
    flex: 1
  },
  header:{
    fontFamily: '$appFont',
    fontSize: "30rem",
    color: '#00648c',
    textAlign: 'center',
    alignSelf: 'center'
  },
  recipeBox:{
    borderWidth: 1,
    borderColor: colors.beige,
    backgroundColor: colors.yellow,
    padding: 5,
    flex: 1
  },
  viewCenter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  largeImage:{
    height: "250rem",
    width: "250rem"
  },
  glassText:{
    fontSize: "16rem",
    fontFamily: "$appFont",
  },
  glassBox:{
    padding: "3rem",
  },
  recipeText:{
    fontSize: "18rem",
    textAlign: 'center',
    fontFamily: '$appFont'
  }
});

module.exports = CocktailShowScreen;