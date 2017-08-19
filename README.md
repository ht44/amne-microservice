# Amne challenge app microservice

### Prompt: Build a simple React app that accepts two addresses as input and outputs a list of real estate agencies within 10 miles of either address. The list of agencies should be sorted, in ascending order, by the total (sum) distance between each agency and the two addresses. You may find it helpful to use the Google Maps & Google Places APIs. You may limit the scope of your solution to Austin, TX.

Microservice for Amne web application challenge ([https://github.com/ht44/amne-client](https://github.com/ht44/amne-client)) accepting cross-origin POST requests at http://amne-micro.us-west-2.elasticbeanstalk.com/places.

Post an array of up to 50 Google "Place Ids" set to key "places" and the service will return details for each place.
