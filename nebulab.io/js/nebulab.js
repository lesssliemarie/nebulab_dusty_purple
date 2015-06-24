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


// move sign up modal if 2nd cta is clicked
$('.btn-cta-2').click(function() {
	if(window.innerWidth > 940) {
		$('#requestBetaModal').css('top', '1600px');
	} else {
		$('#requestBetaModal').css('top', '2360px');
	}
});

// responsive equal height rows by @micahgodbolt - codepen.io/micahgodbolt/pen/FgqLc
equalheight = function(container) {

	var currentTallest  = 0,
	    currentRowStart = 0,
	    rowDivs         = new Array(),
	    $el,
	    topPosition     = 0;
	
	$(container).each(function() {
	
		$el = $(this);
		$($el).height('auto')
		topPostion = $el.position().top;
		
		if (currentRowStart != topPostion) {
			
			for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
		
			rowDivs.length  = 0; // empty the array
			currentRowStart = topPostion;
			currentTallest  = $el.height();
			rowDivs.push($el);
			
		} else {
		
			rowDivs.push($el);
			currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
			
		}
		
		for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
			rowDivs[currentDiv].height(currentTallest);
		}
		
	});

}

$(window).load(function() {
	equalheight('.value-prop');
});


$(window).resize(function() {
	equalheight('.value-prop');
});

