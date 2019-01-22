import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MapView } from 'expo';
import get from 'lodash/get';
import { Marker } from 'react-native-maps'

const deltas = {
	latitudeDelta: 0.0422,
	longitudeDelta: 0.0421
};

const initialRegion = {
	latitude: 40.705170,
	longitude: -74.009145
};

// const Marker = MapView.Marker;

export default class Map extends Component {
	renderMarkers() {
		return this.props.places.map((place, i) => (
			<Marker key={i} title={place.name} coordinate={place.coords} description={ place.address}>
            </Marker>
		));
	}

	render() {
		const { location } = this.props;
		const region = {
			latitude: get(location, 'coords.latitude', null),
			longitude: get(location, 'coords.longitude', null),
			...deltas
		};

		if (!region.latitude || !region.longitude) {
			return (
				<View>
					<Text>Loading map...</Text>
				</View>
			);
		}

		return (
			<MapView
				style={styles.container}
				region={region}
				initialRegion={{ ...initialRegion, ...deltas }}
				showsUserLocation
				showsMyLocationButton
			>
				{this.renderMarkers()}
			</MapView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '70%'
	}
});