
# Panic Picker
Tool for suggesting to users what to pick for dinner.

## Demo
The live site can be found [here](https://seanlewisire.github.io/panic_picker/)

## UX
Users can click a button to receive a suggestion from the application on what style of food to have for dinner.
Based on what food type is randomly selected by the applicaiton, an associated icon will appear below the button. Concurrently, a search will be performed on the inbuilt Google map. This map uses geo-location to determine the users location (permission required) and using this data with the Google Maps API, the map will populate markers which signify nearby locations that type of food is available. On hover, these markers show the restaraunt name.

My goal in the design of this website was to make it obvious as to the purpose of the application and keep it simple to use. To achieve this, the background is a simple solid color and the button contrasts with it appropriatly. 
All content is centered to draw used attention and make appropriate use of the space available. This ensures that the application design is uniform across all screen sizes and devices. 
The space where icons are populated on button click is maintained on page load to avoid having the location of the map on the page jump suddenly. 

## Features:

**Existing Features** 

  * Mobile-first layout
  * Responsive design
  * Interactive map
  * Interaction with Google Maps API
  * Geo-Location (permission required)
  * Application provides random selection to user

**Features Left to Implement**

  * Return map to user location each time a search is perfomred
  * Remove possiblity of same result returning if that result is currently being displayed

## Technologies
* HTML
* CSS
* JavaScript

## Testing

**Introduction**
* The application was tested to ensure it was fit for purpose.
**In Scope**
* The scope of this testing was the project design and functionality. 
**Performance Testing**
* Design/Layout
To ensure this project maintained it's desired layout the site was tested across multiple browsers (Chrome, Firefox, Microsoft Edge and Safari). 
Using browser developer tools, multiple device sizes were also tested to ensure responsiveness.

* Functionality
Functionality of this site was tested across a variety of browsers and mobile devices to ensure essential features worked as intended.  

**Infastructure**
* The application, in it's simplest form, generates a random number on button click which is then used to select from a array of objects. These objects contain all the required infromation for the fast food selection. The object directs what display should be activated and also what keyword should be searched for on the map. 
To ensure the browser memory is not overloaded causing potential crashes, map markers are cleared on each button click.

## Deployment

This site is hosted using [GitHub Pages](https://pages.github.com/), deployed directly from the master branch. The deployed site will update automatically upon new commits to the master branch.

To run locally, you can clone this repository directly into the editor of your choice by pasting git clone https://github.com/SeanLewisIRE/panic_picker.git  into your terminal. 
To cut ties with this GitHub repository, type git remote rm origin into the terminal.

## Credits

**Content**
* README layout and content inpired by Code Institute sample, available [here](https://github.com/Code-Institute-Solutions/StudentExampleProjectGradeFive)

**Media**
* Base code for the inbuilt Google Map was taken from the [Google Maps Platform](https://developers.google.com/maps). 