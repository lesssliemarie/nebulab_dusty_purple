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
	// fadeOut timer for requestBetaSubmitted dialog
	setTimeout(function() {
		$('#requestBetaSubmitted').fadeOut(400);
	}, 3000);

	// modal trigger
	$(".request-beta-btn").leanModal({ 
		overlay : 0.4, 
		closeButton: ".modal_close" 
	});
 
})();



function validateEmail(e) {
	var t=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return t.test(e)
}
function validate() {
	$("#error-message").text("");
	var e = $("#email").val();
	var f = $("#first_name").val();
	var l = $("#last_name").val();
	if (validateEmail(e)) {
		userRegister(e,function(e) {
			if (e) {
				$("#requestBetaSubmitted").css("display","block");
				setTimeout(function() {
					$("#requestBetaSubmitted").fadeOut(400)
				},3e3)
				$("#contact-form").children("input").val("");
				$("#requestBetaModal, #lean_overlay").hide();
			} else {
				$("#error-message").text("Sorry we could not saved your email address, try again later!");
			}
		});
	} else {
		$("#error-message").text("Type in a valid email address, ya goof!");
	} return false;
}
function userRegister(e, f, l, t) {
	var n=Appbase.ns("user").v(e);
	$.get("http://ipinfo.io",function(r) {
		var i = navigator.userAgent;
		var s = r;
		n.setData(
		{
			email: e,
			first_name: f,
			last_name: l,
			followUp: false,
			createDate: new Date,
			BrowserData: i,
			ip: s
		},
		function(e,n) {
			if(!e) {
				return t(true);
			} else {
				return t(false);
			}
		})
	},"jsonp")
}

Appbase.credentials("private_beta","7c517d866eaa7cd2d0b71532d724653b");


$(window).on("load resize",function(e){
    if (window.innerWidth > 1146) {
		h2 = $('.value-prop-bullets').height() - 168;
		$('.value-prop-headline').height(h2);
	} else {
		$('.value-prop-headline').height('inherit');
	}
});
