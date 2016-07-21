// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   ListView,
//   TextInput,
//   AsyncStorage,
//   RefreshControl
// } from 'react-native';

// import ViewContainer from '../components/ViewContainer'
// import StatusBarBackground from '../components/StatusBarBackground'
// import CocktailRow from '../components/CocktailRow'
// import appStyles from '../styles/styles'
// import colors from '../styles/colors'


// class CocktailsIndexScreen extends Component {
//   constructor(props) {
//     super(props)
//     ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
//     this.state = { 
//       cocktailDataSource : ds.cloneWithRows({}),
//       cocktailData: [],
//       searchText: 'Search Cocktails',
//       refreshing: true
//     }
//   }
//   componentDidMount() {
//     fetch("https://cocktailapi.herokuapp.com/api/cocktails/?type=ids").then(function(res){
//       return res.json()
//     }).then(function(data){
//       data = data.sort((a,b)=>{
//         if(a.name>b.name) return 1;
//         if(b.name>a.name) return -1;
//         return 0;
//       })
//       this.setState({
//         cocktailDataSource : ds.cloneWithRows(data),
//         cocktailData: data,
//         refreshing: false

//       })
//     }.bind(this))
//     .catch(function(err){
//       console.log(err)
//     });
//   }
//   render() {
//     return (
//     <ViewContainer>
//       <StatusBarBackground/>
//       <View style={appStyles.viewCenter}>
//         <Text style={appStyles.header}>COCKTAILS</Text>
//       </View>
//       <TextInput 
//         style={[appStyles.textInput, {color: colors.darkBlue, borderColor: colors.darkBlue}]}
//         onChangeText={(text)=>this._updateSearch(text)} 
//         value={this.state.searchText}
//         onFocus={()=>this.setState({searchText:''})}
//         />
//       <ListView
//         dataSource = {this.state.cocktailDataSource}
//         renderRow = {(cocktail)=> { return this._renderCocktailRow(cocktail)}}
//         enableEmptySections={true}
//         automaticallyAdjustContentInsets={false}
//         refreshControl = {
//           <RefreshControl
//           refreshing = {this.state.refreshing}
//           />} 
//         />
//     </ViewContainer>
//     )
//   }
//   _updateSearch(searchText) {
//     let searchTextRE = searchText.replace(/\W/g, '.');
//     let re = new RegExp('\\b'+searchTextRE, 'gi');

//     let searchedData = this.state.cocktailData.filter((cocktail)=>{
//       return re.test(cocktail.name)
//     })

//     let sortedSearched = searchedData.sort((a,b)=>a.name.search(re)-b.name.search(re));

//     this.setState({cocktailDataSource : ds.cloneWithRows(sortedSearched), searchText})
//   }
//   _renderCocktailRow(cocktail) {
//     return (
//       <CocktailRow 
//         onPress={()=>this._navigateToCocktailShow(cocktail)}
//         cocktail={cocktail}
//       />
//       )
//   }
//   _navigateToCocktailShow(cocktail){
//     this.props.navigator.push({
//       ident: "show",
//       cocktail
//     })
//   }
// }


// module.exports = CocktailsIndexScreen;
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
        <TouchableOpacity style={styles.mainSections} onPress={()=>this.props.navigator.push({ident: 'cocktailsByName'})}>
          <Image source={require('../styles/img/abc.png')} style={appStyles.midImage}/>
          <Text style={appStyles.header}>Find Cocktails By Name</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainSections} onPress={()=>this.props.navigator.push({ident: 'cocktailsByCategory'})}>
          <Image source={require('../styles/img/categories.png')} style={appStyles.midImage}/>
          <Text style={appStyles.header}>Find Cocktails By Category</Text>
        </TouchableOpacity>
    </ViewContainer>
    )
  }
}

const styles = StyleSheet.create({
  mainSections: {
    alignItems: 'center',
    margin: 15
  }
})

module.exports = CocktailsIndexScreen;