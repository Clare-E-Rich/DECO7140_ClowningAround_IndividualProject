/**
 * Gets all URL variables into an object.
 *
 * Doesn't really work for arrays or objects
 * (eg. ?foo[0]=a&foo[1]=b will be visible, but as getvars["foo[0]"])
 *
 * @author Ashley Richmond ashrichmond@gmail.com
 * @returns object<string, string>
 */
var getVars = function() {
	var get_vars = {};
	var vars = location.search.replace('?', '').split('&');

	for (var i in vars) {
		var this_var = vars[i].split('=');
		get_vars[this_var[0]] = this_var[1];
	}

	return get_vars;
};