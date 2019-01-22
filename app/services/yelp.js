import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api.yelp.com/v3',
	headers: {
		Authorization: `Bearer ${''}`
	}
});

export const getRestaurants = (userLocation, filter = {}) => {
	return api
		.get('/businesses/search', {
			params: {
				limit: 20,
				categories: 'food, restaurants, lunch, burger, pizza',
				...userLocation,
				...filter
			}
		})
		.then(res =>
			res.data.businesses.map(business => {
				return {
					name: business.name,
                    coords: business.coordinates,
                    address: business.location.address1
				};
			})
		)
		.catch(error => console.error(error));
};

export default {
	getRestaurants
};