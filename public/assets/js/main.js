$(function() {
	$('.map').each(function() {
		var obj = new Map({
			$el: $(this),
			address: $(this).data('address'),
			blurb: $(this).data('blurb')
		});
	});

	$('.hybrid-form').each(function() {
		var obj = new HybridForm({
			$el: $(this)
		});
	});
    
	$('.floating-banner').each(function() {
		var obj = new FloatingBanner({
			$el: $(this)
		});
	});

    	// decode and replace email address
	$( '.mailme' ).each(function() {

		var $this = $(this),
				address = $this.data( 'address' ),
				decoded;

		if( address ) {
			var decoded = address.replace(' at ', '@' ).replace(' dot ', '.' );
			$this.after( "<a href='mailto:" + decoded + "'>" + decoded + "</a>" );
			$this.remove();
		}
	});

	$('section.main').fitVids();
});

FloatingBanner = function(options) {

	var view = this;

	this.isShowing = false;
	this.$el = options.$el;
	this.threshold = options.threshold || 1000;

	var checkPos = function() {
		if ($(window).scrollTop() > view.threshold && !view.isShowing) {
			view.$el.fadeIn();
			view.isShowing = true;
		} else if ($(window).scrollTop() <= view.threshold && view.isShowing) {
			view.$el.fadeOut();
			view.isShowing = false;
		}
	}

	checkPos();
	$(window).on("scroll resize", function() {
		checkPos();
	});
}

Map = function(options) {
	var map = this, geocoder = new google.maps.Geocoder();

	this.$el = options.$el;
	this.address = options.address;
	this.blurb = options.blurb;
	this.infoWindowOpen = false;

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

		this.size();
   		$(window).on('resize', function() {
   			map.size();
   		});
	},
	size: function() {
		this.gmap.setCenter(this.mapOptions.center);
		if ($(window).width() < 800 && this.infoWindowOpen) {
			this.infoWindow.close();
			this.infoWindowOpen = false;
		} else if ($(window).width() >= 800 && !this.infoWindowOpen) {
			this.infoWindow.open(this.gmap, this.marker);
			this.infoWindowOpen = true;
		}
	}
}

HybridForm = function(options) {
	this.$el = options.$el;
}