import React, {Component} from 'react'
import { StyleSheet, SafeAreaView, Text, Image } from 'react-native'
import { MapScreen } from './app/screens'

export default class App extends Component {
	render() {
		return (
			<SafeAreaView style={styles.container}>
      <Text style={styles.header}>Lettuce Meet!
      <Image source={require('./LunchBoxLogo.png')}
      style={{width:35,height:35}}
      />
      </Text>
				<MapScreen />
			</SafeAreaView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'flex-start'
  },
  header: {
    fontFamily:'Cochin',
    flex:0.5,
    fontSize: 16,
    backgroundColor: 'red',
    justifyContent: 'flex-start',
    textAlign: 'center'
  }
})