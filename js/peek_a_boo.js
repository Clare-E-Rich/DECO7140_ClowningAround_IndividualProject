$(function() {
	/**
	 * First we set an object containing a number of arrays, which is our list
	 * of age_groups. Each age_group contains a number of element IDs.
	 * 
	 * @author Ashley Richmond ashrichmond@gmail.com
	 *
	 * @type object<string, array<string>>
	 */
	var age_group = {
		littlies: ["clowning", "floor_acrobatics", "me_and_that"],
		middlies: ["clowning", "floor_acrobatics", "me_and_that", "tightwire", "silks"],
		teens: ["clowning", "floor_acrobatics", "me_and_that", "tightwire", "silks"],
		adults: ["clowning", "floor_acrobatics", "me_and_that", "tightwire", "silks"]
	};

	/**
	 * Set up our onClick event for the age group buttons.
	 * The selector "[age group]" matches any link with attribute "age group."
	 * eg. <a age group="littlies">
	 */
	$('a[age_group]').click(function() {
		var age_group_name = $(this).attr('age_group');

		/* hide all elements in all age groups */
		$('.age_group_element').hide();

		/* for each element in our age_group, show it */
		for (var id in age_group[age_group_name]) {
			$("#" + age_group[age_group_name][id]).show();
		}

		/* stop browser from following the link we clicked */
		return false;
	});

	$('#button_all').click(function() {
		/* show all elements in all age_groups */
		$('.age_group_element').show();

		/* stop browser from following the link we clicked */
		return false;
	});

	/**
	 * lastly, we set up to show a age_group based on url variable.
	 * if the url variable "age group" exists, click the corresponding element.
	 */
	var get_vars = getVars();
	if (typeof(get_vars.age_group) !== 'undefined') {
		$("#button_" + get_vars.age_group).click();
	}
});