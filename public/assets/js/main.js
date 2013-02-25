$(function() {
	$('.map').each(function() {
		var obj = new Map({
			$el: $(this),
			address: $(this).data('address'),
			blurb: $(this).data('blurb')
		});
	});
});

Map = function(options) {
	var map = this, geocoder = new google.maps.Geocoder();

	this.$el = options.$el;
	this.address = options.address;
	this.blurb = options.blurb;
	this.title = "foo";
	this.mapOptions = _.extend({
		zoom: 12,
	    mapTypeControl: false,
	    navigationControl: true,
	    streetViewControl: false,
	    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    scrollwheel: false
	}, options.mapOptions);

	geocoder.geocode({ 'address': this.address }, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			_.extend(map.mapOptions, {
				center: results[0].geometry.location
			});
			map.setup();
		}
	});

}

Map.prototype = {
	setup: function() {
		var map = this;

		this.gmap = new google.maps.Map(this.$el.get(0), this.mapOptions);

		this.marker = new google.maps.Marker({
			position: this.mapOptions.center,
			map: this.gmap,
			title: this.title
		});

		this.infoWindow = new google.maps.InfoWindow({
			content: this.blurb
		});

   		map.infoWindow.open(map.gmap, map.marker);
	}
}