
	
// email validation check with regular expression
	function validateEmail(email) { 
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   		return re.test(email);
	};

	// run validation() on submit
	function validate() {
  		$("#error-message").text("");
		var email = $("#email").val();
		if (validateEmail(email)) {
	    		// send email to hello@nebulab.io
	    		userRegister(email,function(saved){
	    			if(saved) {
			    		// show requestBetaSubmitted dialog
			    		$('#requestBetaSubmitted').css('display', 'block');
			    		$('#requestBetaModal').css('display', 'none');
		    			// fadeOut timer for requestBetaSubmitted dialog
						setTimeout(function() {
							$('#requestBetaSubmitted').fadeOut(400);
						}, 3000);
			    		// reset requestBeta input
			    		$('#contact-form').children('input').val('')
	    			} else {
	    				$("#error-message").text("Sorry we could not saved your email address, try again later!");
	    			}
	    		});
	    		
		  	} else {
				$("#error-message").text("Type in a valid email address, ya goof!");
		  	}
		
		return false;
	}

	Appbase.credentials("private_beta", "7c517d866eaa7cd2d0b71532d724653b");	
	function userRegister (email,cb){
		var user = Appbase.ns("user").v(email);
		$.get("http://ipinfo.io", function (response) {
			var b = navigator.userAgent;
			var i = response;
			console.log(b);
			console.log(i);
			user.setData({email: email, followUp: false,createDate: new Date(), BrowserData: b , ip:i},function(err, vref){
				if(!err){ 
					return cb(true);
				}else{
					return cb(false);
				}
			});
		}, "jsonp");
	}

