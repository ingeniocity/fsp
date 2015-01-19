var GLOBAL_FLAG = 0;
var httpObject = null;
var thttpObject = null;
var timehttpObject = null;

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

// Implement business logic
function runAjax(page, val)
{
	
	var JSONobject = JSON.parse(val);
	//alert(JSONobject.jcase);
	if(GLOBAL_FLAG)
 		alert("Please wait, already processing a request!");
	else if(!error)
	{
		if(JSONobject.jcase)
		{
			switch(JSONobject.jcase)
			{
				case "loginAuth":
					document.getElementById("signingin").innerHTML = "<img src='img/ajax_loader.gif'>";
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
				case "userPass":
				case "grpuser":
				case "zoneDrop":
				case "addStation":
				case "getGrd":
				case "RegetGrd":
				case "grpDelete":
				case "userProfData":
				case "userInsData": //PS
				case "passEdtData": //PS
				case "userAppr":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				//case "passEdtData": //PS
				case "userInsData": //PS
				case "userEdtData":
				case "uDelete":
				case "userProfData":
				case "pikTimSet":
				case "compDataSet":
				case "userProf":
				case "grpDrop":
				case "grpDetail":
				case "addGrp":
				case "createGrp":
				case "grpView":
				case "grpUpdate":
				case "userForApprov":
				case "setAppUnApp":
				case "Restation":
				case "GetPOTPlan":
				case "historyGet":
					if(JSONobject.container)
						document.getElementById(JSONobject.container).innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				//PS
				case "getHtConsumerSel":
									
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
				//	alert(val);
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
				//	alert(setOutput);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				
				case "getHtConsumerZSel":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				case "agetHtConsumerZSel":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
					
				break;
				case "getFeederAddData":
				case "getStaionCircleFm": //ps
				case "egetStaionCircleFm": //ps
				case "edit_getStaionCircleFm": //ps
				case "getSectionFm":
				case "agetSectionFm":
				case "getDivisionFm":
				case "egetDivisionFm":
				case "edit_getDivisionFm":
				case "agetDivisionFm":
				case "getSubDivisionFm": 
				case "egetSubDivisionFm": 
				case "edit_getSubDivisionFm": 
				case "agetSubDivisionFm":
				case "agetStationFM":
				case "egetSectionFm":
				case "edit_getSectionFm":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
					
				break;
				case "getHtConsumerSSel":
				case "agetHtConsumerSSel":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				case "getHtConsumerFeed":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				case "searchHtConsumer":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				case "del_htConsumer":
				case "del_FeederM":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				case "edit_htConsumer":
				case "edit_FeederM":
				case "add_htConsumer":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				case "body_main_pane_uview":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				//HT Consumer
				case "egetHtConsumerSSel":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;
				case "egetHtConsumerFeed":
				case "editgetHtConsumerFeed":
				case "getFeederSearchData":
				case "searchFeederM":
				case "edit_FeederM_data":
				case "add_feeder":
				case "agetRevenue":
				case "egetRevenueFm":
				case "agetDistrict":
				case "agetTalque":
				case "agetGP":
				case "agetMP":
				case "agetMLA":
				case "egetDistrict":
				case "egetTalque":
				case "egetGP":
				case "egetMP":
				case "egetMLA":
				case "egetFeederMSel":
					httpObject = getHTTPObject(httpObject);
					var nocache = Math.random();
					httpObject.open("POST", "belint_src/php/"+page+".php?JSON="+val+'&nocache = '+nocache, true);
					httpObject.send(null);
					httpObject.onreadystatechange = setOutput;
				break;

				default:
					alert("Invalid case detected! Please try again...");
					return;
				break;
			}
			//}
		}
		else
			alert("Error from developer's side!");
	}
}

function parseJSON(JSONresponse)
{
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
		case "userInsData":
			document.getElementById("loadMod").innerHTML = "";
			if(JSONobject.data.MSG == "User alredy exists!")
				document.getElementById("loadMod").innerHTML = "<center><font color='red' size='11'>"+JSONobject.data.MSG+"</font></center>";
			else
			{
				$('#myModal2').modal('hide');
				body_main_pane_uview();
			}
		break;
		
		case "userEdtData":
			//alert("User Updated Succesfully!");
			document.getElementById("loadModE").innerHTML = "";
			$('#myModal3').modal('hide');
			body_main_pane_uview();
		break;
		
		case "uDelete":
			//alert("User Deleted Succesfully!");
			body_main_pane_uview();
		break;
		
		case "body_main_pane_uview":
			view_body_main_pane_uview(JSONobject);
		break;
		//PS
		case "passEdtData":
			if(JSONobject.data.MSG == "valid")
			{
				$('#myModalcp').modal('hide');
				alert("Password Updated Succesfully!");
				return;
			}
			else{
				alert("Please try again!");	
			}
			document.getElementById("loadModEcp").innerHTML = "";
			//alert(JSONobject.data.MSG);
			
			//body_main_pane_uview();
		break;
		
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
			//timeOut_pool(JSONobject.data);
		break;
		
		case "time_out_pool":
		/*
			if(JSONobject.error == "0")
				document.location = "index.php";
			else
				setTimeout(function(){decrease_timeOut(JSONobject.data)},1000);
		*/
		break;
		
		case "confData":
			configData(JSONobject);
		break;
		
		case "confDataSet":
			alert(JSONobject.data.MSG);
			confFunc();
		break;
		
		case "userProf":
			userProfileData(JSONobject);
		break;
		
		case "userPass":
			//alert(JSONobject.data.MSG);
			document.getElementById("hddConf").innerHTML = "";
			document.getElementById("hddConf").className = "hddConf";
		break;
		
		case "userProfData":
			alert(JSONobject.data.MSG);
			userProfile();
		break;
		
		case "pikTimSet":
		case "compDataSet":
			alert(JSONobject.data.MSG);
			configuration();
		break;
		
		case "grpuser":
			grpMaintenances();
		break;
		
		case "grpDrop":
			grpDropData(JSONobject);
		break;
		
		case "grpDetail":
			grpDataDetail(JSONobject);
		break;
		
		case "zoneDrop":
			getZoneData(JSONobject);
		break;
		
		case "addGrp":
			addGrpData(JSONobject);
		break;
		
		case "addStation":
			showStation(JSONobject);
		break;
		
		case "Restation":
			ReshowStation(JSONobject);
		break;
		
		case "getGrd":
			showGrd(JSONobject);
		break;
		
		case "RegetGrd":
			ReshowGrd(JSONobject);
		break;
		
		case "createGrp":
			addGrp();
		break;
		
		case "grpDelete":
			alert("Group Deleted Successfully");
			grpMaintenances();
		break;
		
		case "grpView":
			viewGrpDetail(JSONobject);
		break;
		
		case "grpUpdate":
			alert("Group updated successfully!");
			grpMaintenances();
			//viewGrpInfo(JSONobject.data);
		break;
		
		case "userForApprov":
			approvalUsr();
		break;
		
		case "userAppr":
			approvalsData(JSONobject);
		break;
		
		case "setAppUnApp":
			if(parseInt(JSONobject.data) == 1)
				alert("Approved!");
			else
				alert("Rejected!");
			approvalUsr();			
		break;

		case "GetPOTPlan":
			showPOTPlan(JSONobject);
		break;
		
		case "historyGet":
			showhistoryGet(JSONobject);
		break;
		
		//PS
		case "getHtConsumerSel":
			viewgetHtConsumerSel(JSONobject);
		break;
		
		case "getHtConsumerZSel":
			viewgetHtConsumerZSel(JSONobject);
		break;
		
		case "agetHtConsumerZSel":
			viewagetHtConsumerZSel(JSONobject);
		break;
		case "getFeederAddData": //ps feeder maintenence
			viewgetFeederAddData(JSONobject);
		case "getStaionCircleFm": //ps feeder maintenence
			viewgetStaionCircleFm(JSONobject);
		break;
		case "egetStaionCircleFm": //ps feeder maintenence
			viewegetStaionCircleFm(JSONobject);
		break;
		case "edit_getStaionCircleFm": //ps feeder maintenence
			viewedit_getStaionCircleFm(JSONobject);
		break;
		case "agetStationFM":
		
			viewagetStationFM(JSONobject);
		break;
		case "getSectionFm": //ps feeder maintenence
			viewgetSectionFm(JSONobject);
		break;
		case "agetSectionFm": //ps feeder maintenence
			viewagetSectionFm(JSONobject);
		break;
		case "agetRevenue":
			viewagetRevenue(JSONobject);
		break;
		case "egetRevenueFm":
			viewegetRevenueFm(JSONobject);
		break;
		case "agetDistrict":
			viewagetDistrict(JSONobject);
		break;
		case "egetDistrict":
			viewegetDistrict(JSONobject);
		break;
		case "agetTalque":
			viewagetTalque(JSONobject);
		break;
		case "egetTalque":
			viewegetTalque(JSONobject);
		break;
		case "egetGP":
			viewegetGP(JSONobject);
		break;
		case "egetMP":
			viewegetMP(JSONobject);
		break;
		case "egetMLA":
			viewegetMLA(JSONobject);
		break;
		case "getDivisionFm": //ps feeder maintenence
			viewgetDivisionFm(JSONobject);
		break;
		case "egetDivisionFm": //ps feeder maintenence
			viewegetDivisionFm(JSONobject);
		break;
		case "edit_getDivisionFm": //ps feeder maintenence
			viewedit_getDivisionFm(JSONobject);
		break;
		case "agetDivisionFm": //ps feeder maintenence
			viewagetDivisionFm(JSONobject);
		break;
		case "getSubDivisionFm": //ps feeder maintenence
			viewgetSubDivisionFm(JSONobject);
		break;
		case "egetSubDivisionFm": //ps feeder maintenence
			viewegetSubDivisionFm(JSONobject);
		break;
		case "edit_getSubDivisionFm": //ps feeder maintenence
			viewedit_getSubDivisionFm(JSONobject);
		break;
		case "egetSectionFm":
			viewegetSectionFm(JSONobject);
		break;
		case "edit_getSectionFm":
			viewedit_getSectionFm(JSONobject);
		break;
		case "agetSubDivisionFm": //ps feeder maintenence
			viewagetSubDivisionFm(JSONobject);
		break;
		case "getHtConsumerSSel":
			viewgetHtConsumerSSel(JSONobject);
		break;
		
		case "getHtConsumerFeed":
			viewgetHtConsumerFeed(JSONobject);
		break;
		
		case "searchHtConsumer":
			viewsearchHtConsumer(JSONobject);
		break;
		case "searchFeederM":
			viewsearchFeederM(JSONobject);
		break;
        case "del_htConsumer":
		case "del_FeederM":
			alert("Successfuly Deleted.");
		break;
		
		case "edit_htConsumer":
		case "edit_FeederM":
			alert("Edit Successfuly.");
			$('#myModalhte_edit').modal('hide');
			searchFeederM();
			//editHtConsumer(JSONobject);
		break;
		
		case "add_htConsumer":
			alert("Add Successfuly.");
			$('#myModalht').modal('hide');
			//editHtConsumer(JSONobject);
		break;
		case "add_feeder":
			alert(JSONobject.data.MSG);
			//alert("Add Successfuly.");
			$('#myModalht').modal('hide');
			getFeederAddData();
		break;
		//Edit Ht consumer
		case "egetHtConsumerSSel":
			viewegetHtConsumerSSel(JSONobject);
		break;
		//Add HT Consumer
		case "agetHtConsumerSSel":
			viewagetHtConsumerSSel(JSONobject);
		break;
		
		case "egetHtConsumerFeed":
			viewegetHtConsumerFeed(JSONobject);
		break;
		case "editgetHtConsumerFeed":
			vieweditgetHtConsumerFeed(JSONobject);
		break;
		case "getFeederSearchData":
			viewgetFeederSearchData(JSONobject);
		break;
		case "edit_FeederM_data":
			viewedit_FeederM_data(JSONobject);
		break;
		case "agetGP":
			viewagetGP(JSONobject);
		break;
		case "agetMP":
			viewagetMP(JSONobject);
		break;
		case "agetMLA":
			viewagetMLA(JSONobject);
		break;
		case "egetFeederMSel":
			viewegetFeederMSel(JSONobject);
		break;
		default:
			if(JSONobject.container)
				document.getElementById(JSONobject.container).innerHTML = JSONobject.data;
	}
	GLOBAL_FLAG = 0;
}
