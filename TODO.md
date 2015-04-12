# TODO

### Global:
- Move language strings to i18n file
- Handle API response errors correctly
- Add mobile support
- Deploy to heroku
- Code cleanup
- CSS cleanup
- Split SCSS / markup into smaller components
- Add loading images
- Merge search functionalities

### Stores:
- Add store details page

### Products:
- Add find locally
- Add advanced search options

### Favourites:
- Add favourites section

### About
- Add about section
- Copyright info

### Home
- Deprecate, point to products or stores instead

### Bugs
- Fix build process
- Fix geolocation events:
  - stop search from causing `isQuerying`
  - ran into issue with being unable to set second prop.. debug
- Fix issue with map defaulting to Toronto... find a better way to handle
- User icon on map disappears on route change
- Product query needs seperate event from store query
  - initially appears as thought products are loading
