import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  Image
} from 'react-native';

import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground'
import CocktailRow from '../components/CocktailRow'
import appStyles from '../styles/styles'
import colors from '../styles/colors'


class CocktailsIndexScreen extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
    <ViewContainer>
      <StatusBarBackground/>

      <View style={styles.mainSections}>
        
        <TouchableOpacity 
          onPress={()=>this.props.navigator.push({ident: 'cocktailsByName'})}>
          <Image 
            source={require('../styles/img/abc.png')} 
            style={appStyles.midImage}
            resizeMode={"contain"}/>
          <Text 
            style={appStyles.header}>
            Find Cocktails By Name
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={()=>this.props.navigator.push({ident: 'cocktailsByCategory'})}>
          <Image 
            source={require('../styles/img/categories.png')}
            style={appStyles.midImage}/>
          <Text 
            style={appStyles.header}>
            Find Cocktails By Category
          </Text>
        </TouchableOpacity>
      
      </View>
    
    </ViewContainer>
    )
  }
}

const styles = StyleSheet.create({
  mainSections: {
    flex: 1,
    justifyContent:'space-between',
    alignItems: 'center',
    marginVertical: 120
  }
})

module.exports = CocktailsIndexScreen;