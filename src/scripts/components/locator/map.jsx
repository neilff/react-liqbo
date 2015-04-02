var React = require('react/addons');
var {GoogleMapsMixin, Map} = require('react-google-maps');
var ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;
var SimpleMap;

/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 */
SimpleMap = React.createClass({
  /*
   * 1. Create a component class that wraps all your map components in it.
   */
  displayName: 'SimpleMap',
  /*
   * 2. Include GoogleMapsMixin into in its mixins.
   */
  mixins: [GoogleMapsMixin],

  render () {
    return <div style={{height: '100%'}} {...this.props}>
      <Map style={{height: '100%'}} zoom={8} center={new google.maps.LatLng(-34.397, 150.644)} />
    </div>;
  }
});

module.exports = React.createClass({
  mixins: [ReactScriptLoaderMixin],

  getInitialState: function() {
    return {
      scriptLoading: true,
      scriptLoadError: false
    };
  },

  // this function tells ReactScriptLoaderMixin where to load the script from
  getScriptURL: function() {
    return 'https://maps.googleapis.com/maps/api/js?v=3.exp';
  },

  // ReactScriptLoaderMixin calls this function when the script has loaded
  // successfully.
  onScriptLoaded: function() {
    this.setState({scriptLoading: false});
  },

  // ReactScriptLoaderMixin calls this function when the script has failed to load.
  onScriptError: function() {
    this.setState({scriptLoading: false, scriptLoadError: true});
  },

  render () {
    var message;
    if (this.state.scriptLoading) {
        message = 'loading script...';
    } else if (this.state.scriptLoadError) {
        message = 'loading failed';
    } else {
        message = <SimpleMap googleMapsApi={google.maps} {...this.props} />;
    }
    return <div>{ message }</div>;
  }
});
