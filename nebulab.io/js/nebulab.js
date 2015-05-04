// iPhone scaling bug fix by @mathias, @cheeaun and @jdalton
(function(doc) {

	var addEvent = 'addEventListener',
		type = 'gesturestart',
		qsa = 'querySelectorAll',
		scales = [1, 1],
		meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

	function fix() {
		meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
		doc.removeEventListener(type, fix, true);
	}

	if ((meta = meta[meta.length - 1]) && addEvent in doc) {
		fix();
		scales = [.25, 1.6];
		doc[addEvent](type, fix, true);
	}

}(document));


(function() {
	// modal trigger
	$(".request-beta-btn").leanModal({ 
		overlay : 0.4, 
		closeButton: ".modal_close" 
	});
 
})();

// resize teal block
$(window).on('load',function(e){
    if (window.innerWidth > 1146) {
		h2 = $('.value-prop-bullets').height() - 168;
		$('.value-prop-headline').height(h2);
	} else {
		$('.value-prop-headline').height('inherit');
	}
});
$(window).on('resize',function(e){
    if (window.innerWidth > 1146) {
		h2 = $('.value-prop-bullets').height() - 168;
		$('.value-prop-headline').height(h2);
	} else {
		$('.value-prop-headline').height('inherit');
	}
});


// move sign up modal if 2nd cta is clicked
$('.btn-cta-2').click(function() {
	if(window.innerWidth > 940) {
		$('#requestBetaModal').css('top', '1600px');
	} else {
		$('#requestBetaModal').css('top', '2360px');
	}
});
