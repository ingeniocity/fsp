var GLOBAL_FLAG = 0;
var httpObject = null;
var thttpObject = null;
var timehttpObject = null;
var ReqhttpObject = null;

// Get the HTTP Object
function getHTTPObject(object)
{
	//if(object)
	//	object.abort(); 
	//object = null;
	if(window.ActiveXObject)
		return new ActiveXObject("Microsoft.XMLHTTP");
	else if(window.XMLHttpRequest)
		return new XMLHttpRequest();
	else
	{
		alert("Your browser does not support AJAX.");
		return null;
	}
}
 
// Change the value of the outputText field
function setOutput()
{
	if(httpObject.readyState == 4)
		parseJSON(httpObject.responseText);
}

function tsetOutput()
{
	if(thttpObject.readyState == 4)
		parseJSON(thttpObject.responseText);
}

function timesetOutput()
{
	if(timehttpObject.readyState == 4)
		parseJSON(timehttpObject.responseText);
}

function ReqsetOutput()
{
	if(ReqhttpObject.readyState == 4)
		parseJSON(ReqhttpObject.responseText);
}

// Implement business logic
function runAjax(page, val)
{
	var JSONobject = JSON.parse(val);
	if(GLOBAL_FLAG)
 		alert("Please wait, already processing a request!");
	else if(!error)
	{
		if(JSONobject.jcase)
		{
			switch(JSONobject.jcase)
			{
				case "loginAuth":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				case "time_out":
					thttpObject = getHTTPObject(thttpObject);
					var nocache = Math.random();
					thttpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					thttpObject.send(null);
					thttpObject.onreadystatechange = tsetOutput;
				break;
				
				case "time_out_pool":
					timehttpObject = getHTTPObject(timehttpObject);
					var nocache = Math.random();
					timehttpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					timehttpObject.send(null);
					timehttpObject.onreadystatechange = timesetOutput;
				break;
				
				case "confData":
					if(JSONobject.container)
						document.getElementById(JSONobject.container).innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				case "confDataSet":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;

				case "getStepDetails":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				case "wizard_opr_next1":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				case "wizard_opr_next2":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				case "wizard_opr_next3":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				case "reqAp":
					ReqhttpObject = getHTTPObject(ReqhttpObject);
					var nocache = Math.random();
					ReqhttpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					ReqhttpObject.send(null);
					ReqhttpObject.onreadystatechange = ReqsetOutput;
				break;
				
				case "reqApAL":
					ReqhttpObject = getHTTPObject(ReqhttpObject);
					var nocache = Math.random();
					ReqhttpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					ReqhttpObject.send(null);
					ReqhttpObject.onreadystatechange = ReqsetOutput;
				break;
				
				case "reqApCL":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				case "reqApCLCS":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				case "viewFeed":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				case "historyGet":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				case "fillWizAgain":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				case "getStationHeadSel":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				case "getStationHeadZSel":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				case "getStationHeadSSel":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				case "searchStationHead":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				case "requestCancel":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				default:
					alert(JSONobject.jcase+" Invalid case detected! Please try again...");
					return;
				break;
			}
		}
		else
			alert("Error from developer's side!");
	}
}

function parseJSON(JSONresponse)
{
	//alert(JSONresponse);
    var JSONobject = JSON.parse(JSONresponse);
	if(parseInt(JSONobject.error))
	{
		if(JSONobject.container)
			document.getElementById(JSONobject.container).innerHTML = ERROR_STR[parseInt(JSONobject.error)];
		GLOBAL_FLAG = 0;
		return;
	}
       
	switch(JSONobject.jcase)
	{
		case "loginAuth":
			if(JSONobject.data.UserName == "Invalid")
			{
				document.getElementById("signingin").innerHTML = "Username or password is invalid! Please try again!";
				return;
			}
			else
			{
				document.getElementById("signingin").innerHTML = "";
				document.location = "wizard.php?user="+userna+"&user_id="+user_id+"&cmp_id="+cmp_id;
				//decrease_timeOut(JSONobject.data.UserName);
				//home_page(JSONobject.data);
			}
		break;
		
		case "time_out":
			timeOut_pool(JSONobject.data);
		break;
		
		case "time_out_pool":
			//setTimeout(function(){decrease_timeOut(JSONobject.data)},1000);
		break;
		
		case "confData":
			confFuncData(JSONobject);
		break;
		
		case "confDataSet":
			alert(JSONobject.data.MSG);
			confFunc();
		break;
		
		case "getStepDetails":
			document.getElementById("M1").style.fontWeight = "bold";
			document.getElementById("v_tgcmwdiv").innerHTML = '<input type="text" name="v_tgcmw" id="v_tgcmw" value="'+JSONobject.data.DT1[0].ConfigValue+'" />';
			document.getElementById("sp_basiccdiv").innerHTML = '<input value="'+JSONobject.data.DT2[0].ConfigValue+'" type="text" name="sp_basicc" id="sp_basicc" onkeypress="return isNumber(event,1000000,this)" onKeyUp="shouldRetain(1000000,this)"/>&nbsp; Minutes';
			contFlag = 0;
		break;
        
		case "wizard_opr_next1":
			wizard_step2(JSONobject,0);
		break;
		
		case "wizard_opr_next2":
			wizard_step3(JSONobject,0);
		break;
		
		case "wizard_opr_next3":
			wizard_step4(JSONobject,0);
		break;
		
		case "reqAp":
			document.getElementById("myModal2").style.display = "none";
			$('#myModal2').modal('hide');
			keepReqAlive(parseInt(outCY));
		break;

		case "reqApCL":
			//document.getElementById("myModal3").style.display = "none";
			$('#myModal3').modal('hide');
			viewhistoryGet();
		break;

		case "reqApCLCS":
			//document.getElementById("myModal3").style.display = "none";
			$('#myModal4').modal('hide');
			viewhistoryGet();
		break;

		case "reqApAL":
			wizard_step2_1(JSONobject);
		break;
		
		case "viewFeed":
			viewFeedDetails(JSONobject, 1);
		break;
		
		case "historyGet":
			viewhistoryGetSUB(JSONobject);
		break;
		
		case "fillWizAgain":
			viewfillWizAgain(JSONobject);
		break;
		
		case "getStationHeadSel":
			viewgetStationHeadSel(JSONobject);
		break;
		
		case "getStationHeadZSel":
			viewgetStationHeadZSel(JSONobject);
		break;
		
		case "getStationHeadSSel":
			viewgetStationHeadSSel(JSONobject);
		break;
		
		case "searchStationHead":
			viewsearchStationHead(JSONobject);
		break;
		
		case "requestCancel":
			document.getElementById("loaderEv").innerHTML = "";
			viewhistoryGet();
		break;

		default:
			if(JSONobject.container)
				document.getElementById(JSONobject.container).innerHTML = JSONobject.data;
	}
	GLOBAL_FLAG = 0;
}
