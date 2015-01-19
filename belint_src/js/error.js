// JavaScript Document
var error = 0;
// regular error string array (add an optional integer)
var ERROR_STR = new Array();
ERROR_STR[1]="Error Parsing JSON!";

function errorAlert(error)
{
		alert(ERROR_STR[error]);
		return;
}
