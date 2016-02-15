$(document).ready(function() {

	/* On key release run function formValid */
	$("#name, #email, #phone, #suburb").keyup(function (){
		formValid();
	});
	
	/* On mouse click run function formValid */
	$("#preferred_method_phone, #preferred_method_email, #littlies, #middlies, #teens, #adults, #camps, #workshops").click(function() {
		formValid();
	});

	/* Test if all fields have content, if yes activiate the submit button,
	if no deactivate button. */
	function formValid() {
		//console.log("formValid has activated and is about to run the if/then test.");
		if ( 
				$("#name").val() != "" 
			&& $("#email").val() != "" 
			&& $("#phone").val() != "" 
			&& $("#suburb").val() != ""
			&& ($("#perferred_method_phone").is(':checked') 
				|| $("#preferred_method_email").is(':checked')) 
			&& ($("#littlies").is(':checked')
				||	$("#middlies").is(':checked')
				||	$("#teens").is(':checked')
				||	$("#adults").is(':checked')
				||	$("#workshops").is(':checked')
				||	$("#camps").is(':checked')							
				)
			) {
			$("#submitForm").addClass("active");
			//console.log("formValid ran it's if/then test.  The test returned True.");
			console.log("Submit button is now active.");
		} else {
			$("#submitForm").removeClass("active");
			//console.log("formValid ran it's test.  The test returned False.");
		}
	};
	
	/* On click of Submit button, check that button is active.  If so, run function submitComment. */
	$("#submitForm").click(function () {
		//console.log("Submit Button has been pressed. Will now attempt to run validateEntries.");
		if ($(this).hasClass("active")) {
			validateEntries();
			if (validateEntries()) {
				//  If validateEntries is True (returned no errors then submit the form.)
				document.getElementById("enquiriesForm").submit();
				window.location.href = 'form_success.html';
			}
		}
		return false;
	});
	
	
	/* Check that what's entered into the form are valid entries. */	
	
	function validateEntries() {
		//console.log("validateEntries is running.");

		var name_ = $("#name").val();		
		var email_ = $("#email").val();
		var phone_ = $("#phone").val();
		var suburb_ = $("#suburb").val();
		console.log("Name: " + name_ + ", Email: " + email_ + ", Phone: " + phone_ + ", Suburb: " + suburb_);
		var SpCharacters = /^\s*[a-zA-Z\s]+\s*$/g;  //  Regular expression of all letters, both upper and lower case. 
		var atsym = /@/g; 
		var fullstop = /\./g;  // . is an anything placeholder, hence the need for the slash.
		
		
		if (name_.trim() == "") {
			/* Check that Name is not just whitespace */
			var nameError = "Please type in a name.";
			$("#NameError").append("Please type in a name. ")
			//console.log("validateEntries has determined that the name input is only whitespace.  Create error.")
		} else if (!SpCharacters.test(name_)) {
			/* Check that Name does not contain numbers or symbols, by checking that it's only letters. */
			var nameError = "Names should not contain any number or symbols.  Letters only please.";
			$("#NameError").append("Names should not contain any number or symbols.  Letters only please. ")
      		//console.log("validateEntries has determined there are number or symbols in the name.  Create error");
      	} else {
      		//console.log("Name passes.");
      		$("#NameError").append("")	
      	}
      
	      /* Take the email_ variable and split it on the @ symbol.  Save the result to a new variable. */
	      var splitEmail = email_.split('@');
	      
	      if (email_.trim() == "" ) {
	      	/* Check that email is not just whitespace */
	      	var emailError = "Please type in an email.";
	      	$("#EmailError").append("Please type in an email. ")
	      } else if (splitEmail.length < 2) {
	      	/* Test if email_ does NOT contain an '@' symbol.  If true, create error.  */
	      	var emailError = "Please type in a valid email address.  A valid email needs to contain an '@' symbol.";
	      	$("#EmailError").append("Please type in a valid email address.  A valid email needs to contain an '@' symbol. ")
	      	//console.log("validateEntries doesn't think the email address contains an @ symbol. Create error.");
	      } else if (splitEmail.length > 2) {
	      	/* Test email address only contains 1 @ symbol.  */
	      	var emailError = "Your email address can only contain one '@' symbol.";
	      	$("#EmailError").append("Your email address can only contain one '@' symbol. ")
	      	//console.log("validateEntries thinks the email address contains too many @ symbols.  Create error.");	
	      } else if (splitEmail[0] == "") {
	      	/* Test there is something before the @ symbol. */
	      	var emailError = "Your email address needs to contain something before the '@' symbol to be valid.";
	      	$("#EmailError").append("Your email address needs to contain something before the '@' symbol to be valid. ")
	      	//console.log("validateEntries thinks the email address contains nothing before the @ symbols.  Create error.");	
	      } else if (splitEmail[1] == "") {
	      	/* Test there is something after the @ symbol. */
	      	var emailError = "Your email address needs to contain something after the '@' symbol to be valid.";
	      	$("#EmailError").append("Your email address needs to contain something after the '@' symbol to be valid. ")
	      	//console.log("validateEntries thinks the email address contains nothing after the @ symbols.  Create error.");	
	      } else if (!fullstop.test(splitEmail[1])) {
				/* Test text after the @ contains a full stop. */
				var emailError = "Your email address needs to contain a full stop after the '@' symbol to be valid.";
				$("#EmailError").append("Your email address needs to contain a full stop after the '@' symbol to be valid. ")
	      	//console.log("validateEntries thinks the email address contains no full stops after the @.  Create error.");
	      } else {
	      	//console.log("Email passes");
	      	$("#EmailError").append("")	
	      }
	      
	      var phoneRegEx = /^((\(?((0|\+?61) ?[23478])?\)?((\d{2}( ?\d{3}){2})|(( ?\d{4}){2})))|(1300(( ?\d{3}){2}))|(13(( ?\d{2}){2}|\d ?\d{3})))$/i
	 				//phoneRegEx supplied by my brother (Ashley Richmond: ashrichmond@gmail.com)
	 				// Valid for all Austrlian phone numbers. 
	      
	      if (phone_.trim() == "") {
	      	/* Does the phone number contain only whitespace?  
	      		Find out this week in "Clare is attempt to write JavaScript".*/
	      	var phoneError = "Please type in a phone number.";
	      	$("#PhoneError").append("Please type in a phone number. ")
	      	//console.log("validateEntries thinks there is nothing but whitespace in the phone number.");
	      } else if (!phoneRegEx.test(phone_)) {
				/* Test if phone only has permitted characters. */
				var phoneError = "Please input a valid Australian phone number.";
				$("#PhoneError").append("Please input a valid Australian phone number. ")
				//console.log("The phone number contains iffy symbols.");      
	      } else {
				//console.log("Phone passes.");
				$("#PhoneError").append("")      
	      }

			var SpCharacters = /^\s*[a-zA-Z\s]+\s*$/g;
					// SpCharacters needs to be redefined before reuse because it is a fussy fussy variable. 
	      
	      	if (suburb_.trim() == "") {
				/* Check that Suburb is not just whitespace */
				var suburbError = "Please type in a suburb.";
				$("#SuburbError").append("Please type in a suburb. ")
				//console.log("validateEntries has determined that the suburb input is only whitespace.  Create error.")
			} else if (!SpCharacters.test(suburb_)) {
				/* Check that Suburb does not contain numbers or symbols, by checking that it's only letters. */
				var suburbError = "Suburbs should not contain any numbers or symbols.  Letters only please.";
				$("#SuburbError").append("Suburbs should not contain any numbers or symbols.  Letters only please. ")
	      	//console.log("validateEntries has determined there are numbers or symbols in the suburb.  Create error");
	      } else {
	      	//console.log("Suburb passes.");
	      	$("#SuburbError").append("")	
	      };   	
	   	
	   	if (typeof(nameError) === "undefined" 
	   			&& typeof(emailError) === "undefined" 
	   			&& typeof(phoneError) === "undefined" 
	   			&& typeof(suburbError) === "undefined" 
	   			&& typeof(classesError) === "undefined") {
	   		return true;	
	   	} else {
	   		return false;	
	   	};
	};


});