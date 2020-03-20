const apiKey = 'lu8_mHKAB1sEMNA9eWMfMO-YDJLp1_CpPXm8PAAxueLwwS0c8xlRMQcjbrYB1oXhC0-LpbQ_QhZxHM3qH4Xjz4QpdiUPukoymDLZx5JGk6hX3zItGZ2e7_pI96ZxXnYx';
export const Yelp = {
    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,{
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, networkError => {
            console.log(networkError.message);
        }).then(jsonResponse => {
            if (jsonResponse.businesses) {
                // return the business object array: [ {b1}, {b2}, {b3}..]
                return jsonResponse.businesses.map(business => {
                    return { id: business.id,
                             imageSrc: business.image_url,
                             name: business.name,
                             address: business.location.address1,
                             city: business.location.city,
                             state:business.location.state,
                             zipCode:business.location.zip_code,
                             category:business.categories.title,
                             rating:business.rating,
                             reviewCount:business.review_count
                            };
                });
            }
        });
    }
}
