import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Location, Permissions } from 'expo';
import { Button } from 'react-native-elements';
import get from 'lodash/get';
import pick from 'lodash/pick';

import YelpService from '../services/yelp';
import Map from '../components/Map';

class MapScreen extends Component {
	filterButtons = [
		{ label: 'Open now', color: '#9C27B0', filter: { openNow: true } },
		{ label: 'Salad', color: '#E91E63', filter: { term: 'salad' } },
		{
			label: 'Pizza',
			color: '#8BC34A',
			filter: { term: 'pizza' }
		},
		{
			label: 'Coffee',
			color: 'brown',
			filter: { term: 'coffee' }
		},
		{
			label: 'Close By',
			color: '#00BCD4',
			filter: { radius: 500}
		},
		{
			label: 'Burgers',
			color: '#F44336',
			filter: { attributes: 'burgers' }
		}
	];

	state = {
		location: null,
		errorMessage: null,
		restaurants: []
	};

	componentWillMount() {
		this.getLocationAsync();
	}

	getRestaurants = async filter => {
		const coords = get(this.state.location, 'coords');
		const userLocation = pick(coords, ['latitude', 'longitude']);
		let restaurants = await YelpService.getRestaurants(
			userLocation,
			filter
		);
		this.setState({ restaurants });
	};

	getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission for location is denied :('
			});
		}

		let location = await Location.getCurrentPositionAsync({});
		await this.setState({ location });
		this.getRestaurants();
	};

	handleFilterPress = filter => {
		this.getRestaurants(filter);
	};

	renderFilterButtons() {
		return this.filterButtons.map((button, i) => (
			<Button
				key={i}
				title={button.label}
				buttonStyle={{
					backgroundColor: button.color,
					...styles.button
				}}
				onPress={() => this.handleFilterPress(button.filter)}
			/>
		));
	}

	render() {
		const { location, restaurants } = this.state;

		return (
			<View style={{ flex: 7 }}>
				<Map location={location} places={restaurants} />
				<View style={styles.filters}>{this.renderFilterButtons()}</View>
			</View>
		);
	}
}

const styles = {
	filters: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexWrap: 'wrap'
	},
	button: {
		marginVertical: 4
	}
};

export { MapScreen };