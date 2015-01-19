var parser_page = "parser";
var MYURL = document.URL;

function menuSelect(id)
{
	for(i=1;i<5;i++)
	{
		var sid = "M"+i;
		document.getElementById(sid).style.fontWeight = "normal";
		if(sid == id)
			document.getElementById(sid).style.fontWeight = "bold";
	}
}

function login_auth()
{
	var user = document.getElementById('usr').value;
	var passwd = document.getElementById('pass').value;
	if(user == "")
	{
		//document.getElementById("login_err").innerHTML = "Please provide a valid username!";
		document.getElementById('usr').focus();
		return;
	}
	if(passwd == "")
	{
		//document.getElementById("login_err").innerHTML = "Password can not be left blank!";
		document.getElementById('pass').focus();
		return;
	}
	//document.getElementById("login_err").innerHTML = "";
	var JSONObject = new Object;
	JSONObject.jcase = "loginAuth";
	JSONObject.container = "login";
	JSONObject.username = user;
	JSONObject.password = passwd;
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	JSONObject.query = "SELECT * FROM "+JSONObject.tablename+" WHERE (username='"+user+"' OR email='"+user+"') AND password=md5('"+passwd+"')";
	JSONstring = JSON.stringify(JSONObject);
	runAjax(parser_page,JSONstring);
}

function decrease_timeOut(username)
{
	var JSONObject = new Object;
	JSONObject.jcase = "time_out";
	JSONObject.container = "";
	JSONObject.username = username;
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	JSONObject.query = "SELECT time_out FROM "+JSONObject.tablename+" WHERE email='"+username+"' OR username='"+username+"'";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

function log_me_out()
{
	document.getElementById("body_main_pane").innerHTML = "<center>Please Wait... <img src='img/ajax_loader.gif'></center>";
	var timeVal = 0;
	
	document.location = "../index.php";
}

function timeOut_pool(data)
{
	if(parseInt(data.TimeVal[0].time_out) == 0)
	{
		//TODO: FIX Timeout reset Error
		//document.location = "index.php";
		return;
	}
	var timeVal = parseInt(data.TimeVal[0].time_out) - 1;
	var JSONObject = new Object;
	JSONObject.jcase = "time_out_pool";
	JSONObject.container = "";
	JSONObject.username = data.UserName;
	JSONObject.timeVal = timeVal;
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	JSONObject.query = "UPDATE "+JSONObject.tablename+" SET time_out="+timeVal+" WHERE email='"+JSONObject.username+"' OR username='"+JSONObject.username+"'";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

function home_page(user)
{
	document.getElementById("username").innerHTML = user;
	grpMaintenance();
}

function home_pagew(user)
{
	document.getElementById("username").innerHTML = user;
}

function convertDateFormat(inDate,delim,sdelim)
{
	if(!inDate) return "";
	var stmp = "";
	if(sdelim == " ")
	{
		var stmp = inDate.split(sdelim);
		var tmp = stmp[0].split(delim);
	}
	else
		var tmp = inDate.split(delim);

	if(stmp[1] && tmp[1] != "undefined")
		return(tmp[2]+"-"+tmp[1]+"-"+tmp[0]+" "+stmp[1]);
	return(tmp[2]+"-"+tmp[1]+"-"+tmp[0]+stmp);
}

function configuration()
{
	//document.getElementById("body_main_pane").innerHTML = "<center>Configuration Event content</center>";
	var JSONObject = new Object;
	JSONObject.jcase = "confData";
	JSONObject.container = "body_main_pane";
	JSONObject.database = db_name;
	JSONObject.tablename1 = "tbl_config";
	JSONObject.tablename2 = "tbl_company";
	JSONObject.query1 = "SELECT * FROM "+JSONObject.tablename1+" WHERE CompanyID="+cmp_id;
	JSONObject.query2 = "SELECT * FROM "+JSONObject.tablename2+" WHERE company_id="+cmp_id;
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

function configData(content)
{
	var pikHr1 = null;
	var pikHr2 = null;
	var pikHr3 = null;
	
	var pikHr = (content.data.DATA1[0].ConfigValue).split(",");
	pikHr1 = pikHr[0];
	pikHr2 = pikHr[1];
	pikHr3 = pikHr[2];
	
	if(pikHr1 && pikHr2 != "undefined")
	{
		var pikHr1FrmTo = (pikHr1).split("-");
		var pikHr1Frm = pikHr1FrmTo[0];
		var pikHr1To = pikHr1FrmTo[1];
		/*
		if(pikHr1Frm < 10)
			pikHr1Frm = '0'+pikHr1Frm;
		if(pikHr1To < 10)
			pikHr1To = '0'+pikHr1To;
		var pikHr1To = pikHr1FrmTo[1];
		*/
	}
	else
	{
		var pikHr1Frm = 0;
		var pikHr1To = 0;
	}
	
	if(pikHr2 && pikHr2 != "undefined")
	{
		var pikHr2FrmTo = (pikHr2).split("-");
		var pikHr2Frm = pikHr2FrmTo[0];
		var pikHr2To = pikHr2FrmTo[1];
		/*
		var pikHr2To = (pikHr2FrmTo[1]);
		if(pikHr2Frm < 10)
			pikHr2Frm = '0'+pikHr2Frm;
		if(pikHr2To < 10)
			pikHr2To = '0'+pikHr2To;
		*/
	}
	else
	{
		var pikHr2Frm = 0;
		var pikHr2To = 0;
	}
	
	if(pikHr3 && pikHr3 != "undefined")
	{
		var pikHr3FrmTo = (pikHr3).split("-");
		var pikHr3Frm = (pikHr3FrmTo[0]);
		var pikHr3To = (pikHr3FrmTo[1]);
		/*
		if(pikHr3Frm < 10)
			pikHr3Frm = '0'+pikHr3Frm;
		if(pikHr3To < 10)
			pikHr3To = '0'+pikHr3To;
		*/
	}
	else
	{
		var pikHr3Frm = 0;
		var pikHr3To = 0;
	}

	var duration = 100 - parseInt(content.data.DATA2[0].weightage);
	//alert(pikHr1Frm+"_"+pikHr1To+"_"+pikHr2Frm+"_"+pikHr2To);
	document.getElementById(content.container).innerHTML = "";
	var createConfTable = '';
	createConfTable += '<h3 class="heading">Configuration</h3>';
	createConfTable += '<div class="row-fluid">';
	createConfTable += '<fieldset title="Peak Hours">';
		createConfTable += '<legend>Peak Hours</legend>';
	createConfTable += '<table>';
		createConfTable += '<tr>';
			//createConfTable += '<td></td>';
			
			//if(pikHr1)
			//{
				/*
				if(pikHr1Frm <= 12)
					createConfTable += '<input class="textBox" type="text" name="fstPikFrm" id="fstPikFrm" value="'+pikHr1Frm+':00&nbsp;AM">&nbsp;&nbsp;to&nbsp;&nbsp;';
				else
				{
					pikHr1Frm = pikHr1Frm - 12;
					createConfTable += '<input class="textBox" type="text" name="fstPikFrm" id="fstPikFrm" value="'+pikHr1Frm+':00&nbsp;PM">&nbsp;&nbsp;to&nbsp;&nbsp;';
				}
				*/
				createConfTable += '<td>';
				createConfTable += '<select name="atp_1" id="atp_1">';
					for(var i=0; i<25; i++)
					{
						if(parseInt(pikHr1Frm) == i)
							createConfTable += '<option value="'+i+'" selected>'+i+'</option>';
						else
							createConfTable += '<option value="'+i+'">'+i+'</option>';
					}
				createConfTable += '</select>';
				createConfTable += '</td>';
				createConfTable += '<td style="text-align:center;">To</td>';
				createConfTable += '<td>';
				createConfTable += '<select name="atp_2" id="atp_2">';
					//createConfTable += '<option value="Feeder Catagory" selected></option>';
					for(var i=1; i<25; i++)
					{
						if(parseInt(pikHr1To) == i)
							createConfTable += '<option value="'+i+'" selected>'+i+'</option>';
						else
							createConfTable += '<option value="'+i+'">'+i+'</option>';
					}
				createConfTable += '</select>';
				createConfTable += '</td>';
				/*
				createConfTable += '<td><input type="text" class="span8" id="atp_1" value="'+pikHr1Frm+'"/></td>';
				createConfTable += '<td style="text-align:center;">To</td>';
				createConfTable += '<td><input type="text" class="span8" id="atp_2" value="'+pikHr1To+'"/></td>';
				*/
				/*
				if(pikHr1To <= 12)
					createConfTable += '<input class="textBox" type="text" name="fstPikTo" id="fstPikTo" value="'+pikHr1To+':00&nbsp;AM">';
				else
				{
					pikHr1To = pikHr1To - 12;
					createConfTable += '<input class="textBox" type="text" name="fstPikTo" id="fstPikTo" value="'+pikHr1To+':00&nbsp;PM">';
				}
				*/
			//}
			//else
			//{
			//		createConfTable += '<input class="textBox" type="text" name="fstPikFrm" id="fstPikFrm" value="">&nbsp;&nbsp;to&nbsp;&nbsp;';
			//		createConfTable += '<input class="textBox" type="text" name="fstPikTo" id="fstPikTo" value="">';
			//}
			//createConfTable += '</td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			//createConfTable += '<td>&nbsp;</td>';
			/*
			createConfTable += '<td class="confFont">';
			if(pikHr2Frm <= 12)
				createConfTable += '<input class="textBox" type="text" name="secPikFrm" id="secPikFrm" value="'+pikHr2Frm+':00&nbsp;AM">&nbsp;&nbsp;to&nbsp;&nbsp;';
			else
			{
				pikHr2Frm = pikHr2Frm - 12;
				createConfTable += '<input class="textBox" type="text" name="secPikFrm" id="secPikFrm" value="'+pikHr2Frm+':00&nbsp;PM">&nbsp;&nbsp;to&nbsp;&nbsp;';
			}
			if(pikHr2To <= 12)
				createConfTable += '<input class="textBox" type="text" name="secPikTo" id="secPikTo" value="'+pikHr2To+':00&nbsp;AM">';
			else
			{
				pikHr2To = pikHr2To - 12;
				createConfTable += '<input class="textBox" type="text" name="secPikTo" id="secPikTo" value="'+pikHr2To+':00&nbsp;PM">';
			}
				//createConfTable += '<td class="confFont"><input style="margin-left:30%;" type="submit" name="pikHrSave" value="Add" onClick="pikHrSetVal()"></td>';
			createConfTable += '</td>';
		*/
			createConfTable += '<td>';
			createConfTable += '<select name="btp_1" id="btp_1">';
			createConfTable += '<option value="" selected></option>';
				for(var i=1; i<25; i++)
				{
					if(parseInt(pikHr2Frm) == i)
						createConfTable += '<option value="'+i+'" selected>'+i+'</option>';
					else
						createConfTable += '<option value="'+i+'">'+i+'</option>';
				}
			createConfTable += '</select>';
			createConfTable += '</td>';
			createConfTable += '<td style="text-align:center;">To</td>';
			createConfTable += '<td>';
			createConfTable += '<select name="btp_2" id="btp_2">';
			createConfTable += '<option value="" selected></option>';
				//createConfTable += '<option value="Feeder Catagory" selected></option>';
				for(var i=1; i<25; i++)
				{
					if(parseInt(pikHr2To) == i)
						createConfTable += '<option value="'+i+'" selected>'+i+'</option>';
					else
						createConfTable += '<option value="'+i+'">'+i+'</option>';
				}
			createConfTable += '</select>';
			createConfTable += '</td>';
			/*
			createConfTable += '<td><input type="text" class="span8" id="btp_1" value="'+pikHr2Frm+'"/></td>';
			createConfTable += '<td style="text-align:center;">To</td>';
			createConfTable += '<td><input type="text" class="span8" id="btp_2" value="'+pikHr2To+'"/></td>';
		*/
		createConfTable += '</tr>';
		createConfTable += '<tr>';

		createConfTable += '<td>';
		createConfTable += '<select name="ctp_1" id="ctp_1">';
			createConfTable += '<option value="" selected></option>';
			for(var i=1; i<25; i++)
			{
				if(parseInt(pikHr3Frm) == i)
					createConfTable += '<option value="'+i+'" selected>'+i+'</option>';
				else
					createConfTable += '<option value="'+i+'">'+i+'</option>';
			}
		createConfTable += '</select>';
		createConfTable += '</td>';
		createConfTable += '<td style="text-align:center;">To</td>';
		createConfTable += '<td>';
		createConfTable += '<select name="ctp_2" id="ctp_2">';
			//createConfTable += '<option value="Feeder Catagory" selected></option>';
			createConfTable += '<option value="" selected></option>';
			for(var i=1; i<25; i++)
			{
				if(parseInt(pikHr3To) == i)
					createConfTable += '<option value="'+i+'" selected>'+i+'</option>';
				else
					createConfTable += '<option value="'+i+'">'+i+'</option>';
			}
		createConfTable += '</select>';
		createConfTable += '</td>';
		/*
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td><input type="text" class="span8" id="ctp_1" value="'+pikHr3Frm+'"/></td>';
			createConfTable += '<td style="text-align:center;">To</td>';
			createConfTable += '<td><input type="text" class="span8" id="ctp_2" value="'+pikHr3To+'"/></td>';
		*/
			/*
			createConfTable += '<td class="confFont">';
			if(pikHr3Frm <= 12)
				createConfTable += '<input class="textBox" type="text" name="secPikFrm" id="thirPikFrm" value="'+pikHr3Frm+':00&nbsp;AM">&nbsp;&nbsp;to&nbsp;&nbsp;';
			else
			{
				pikHr3Frm = pikHr3Frm - 12;
				createConfTable += '<input class="textBox" type="text" name="secPikFrm" id="thirPikFrm" value="'+pikHr3Frm+':00&nbsp;PM">&nbsp;&nbsp;to&nbsp;&nbsp;';
			}
			if(pikHr3To <= 12)
				createConfTable += '<input class="textBox" type="text" name="secPikTo" id="thirPikTo" value="'+pikHr3To+':00&nbsp;AM">';
			else
			{
				pikHr3To = pikHr3To - 12;
				createConfTable += '<input class="textBox" type="text" name="secPikTo" id="thirPikTo" value="'+pikHr3To+':00&nbsp;PM">';
			}
				createConfTable += '<td class="confFont" style="visibility:hidden;"><input style="margin-left:30%;" type="submit" name="pikHrSave" value="Add" onClick="pikHrSetVal()"></td>';
			createConfTable += '</td>';
			*/
		createConfTable += '</tr>';
	createConfTable += '</table>';
	createConfTable += '</fieldset>';
	createConfTable += '<fieldset title="Weightage">';
		createConfTable += '<legend>Weightage</legend>';
	createConfTable += '<table width="50%">';
		//createConfTable += '<tr>';
		//	createConfTable += '<td></td>';
		//createConfTable += '</tr>';
		createConfTable += '<tr>';
			//createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td><input style="width:100%;" type="range" name="points" id="points" min="0" max="100" value="'+parseInt(content.data.DATA2[0].weightage)+'" oninput="updVal(this.value)" onchange="CupdVal(this.value)"></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			//createConfTable += '<td></td>';
			createConfTable += '<td><div style="float:left;">Frequency <span id="ldurf">'+parseInt(content.data.DATA2[0].weightage)+'%</span></div><div style="float:right;"> Duration <span id="ldurd">'+duration+'%</span></div></td>';
		createConfTable += '</tr>';
	createConfTable += '</table>';
	createConfTable += '</fieldset>';
	createConfTable += '<fieldset title="">';
		createConfTable += '<legend>&nbsp;</legend>';
	createConfTable += '<table>';
		createConfTable += '<tr>';
			createConfTable += '<td>HT Consumers to be informed</td>';
			if(content.data.DATA2[0].informHTconsumers == 1)
				createConfTable += '<td>&nbsp;&nbsp;&nbsp;<input type="checkbox" checked name="htConsumner" id="htConsumner" /></td>';
			else
				createConfTable += '<td>&nbsp;&nbsp;&nbsp;<input type="checkbox" name="htConsumner" id="htConsumner" /></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td>Send SMS to HT Consumers atmost</td>';
			createConfTable += '<td>';
			createConfTable += '&nbsp;&nbsp;&nbsp;<input type="text" name="htSms" id="htSms" value="'+parseInt(content.data.DATA2[0].sendSMSConsumersAtmostMins)+'">&nbsp;&nbsp;&nbsp;Min before shutdown';
			createConfTable += '</td>';
		createConfTable += '</tr>';
	createConfTable += '</table>';
	createConfTable += '<legend>&nbsp;</legend>';
	createConfTable += '<br>';
	createConfTable += '</fieldset>';
	createConfTable += '<table class="confBody">';
		createConfTable += '<tr>';
			createConfTable += '<td class="confFont" style="text-align:left;"><input class="btn btn-inverse pull-right" type="button" value="Save" onClick="companySetVal()"></td>';
		createConfTable += '</tr>';
	createConfTable += '</table>';
	createConfTable += '</div>';
	document.getElementById(content.container).innerHTML = createConfTable;
	/*
	gebo_timepicker.init();
	document.getElementById("atp_1").value = pikHr1Frm;
	document.getElementById("atp_2").value = pikHr1To;
	document.getElementById("btp_1").value = pikHr2Frm;
	document.getElementById("btp_2").value = pikHr2To;
	document.getElementById("ctp_1").value = pikHr3Frm;
	document.getElementById("ctp_2").value = pikHr3To;
	*/
}

function updVal(me)
{
	document.getElementById("ldurf").innerHTML = "<font color='red'>"+me+"%</font>";
	document.getElementById("ldurd").innerHTML = "<font color='red'>"+(100 - parseInt(me))+"%</font>";
}

function CupdVal(me)
{
	document.getElementById("ldurf").innerHTML = "<font color='red'>"+me+"%</font>";
	document.getElementById("ldurd").innerHTML = "<font color='red'>"+(100 - parseInt(me))+"%</font>";
}

function pikHrSetVal()
{

	var JSONObject = new Object;
	JSONObject.jcase = "pikTimSet";
	JSONObject.container = "body_main_pane";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_config";
	JSONObject.query = "UPDATE "+JSONObject.tablename+" SET ConfigValue='"+fstPikFrm+"-"+fstPikTo+","+secPikFrm+"-"+secPikTo+"' WHERE ConfigName='Peak Time'";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

function timeValidator(st,et)
{
	/*
	var smp = st.split(":");
	var emp = et.split(":");
	
	var stmp = parseInt(smp[0]+smp[1]);
	var etmp = parseInt(emp[0]+emp[1]);
	*/

	if(parseInt(et) <= parseInt(st))
		return 0;

	return 1;
}

function companySetVal()
{
	var points = document.getElementById("points").value;
	var htCons = document.getElementById("htConsumner").checked;
	var atp_1 = document.getElementById("atp_1").value;
	var atp_2 = document.getElementById("atp_2").value;
	var btp_1 = document.getElementById("btp_1").value;
	var btp_2 = document.getElementById("btp_2").value;
	var ctp_1 = document.getElementById("ctp_1").value;
	var ctp_2 = document.getElementById("ctp_2").value;
	
	if(!timeValidator(atp_1,atp_2))
	{
		alert("First Peak Start Time cannot be greater than or equal to the end time.");
		return 0;
	}
	
	var abcd1 = parseInt(btp_1)+parseInt(btp_2);

	if(abcd1)
	{
		if(!timeValidator(btp_1,btp_2))
		{
			alert("Second Peak Start Time cannot be greater than or equal to the end time.");
			return 0;
		}
		if(!timeValidator(atp_2,btp_1))
		{
			alert("Second Peak Start Time cannot be less than or equal to the First peak End time.");
			return 0;
		}
	}
	else
	{
		ctp_1 = 0;
		ctp_2 = 0;
	}
	
	var abcd2 = parseInt(ctp_1)+parseInt(ctp_2);
	
	if(abcd1 && abcd2)
	{
		if(!timeValidator(ctp_1,ctp_2))
		{
			alert("Third Peak Start Time cannot be greater than or equal tothe end time.");
			return 0;
		}
		if(!timeValidator(btp_2,ctp_1))
		{
			alert("Third Peak Start Time cannot be less than the Second peak End time.");
			return 0;
		}
	}
	
	var toSetVal = atp_1+"-"+atp_2;
	
	if(parseInt(btp_1) && parseInt(btp_2) && abcd1)
		toSetVal += ","+btp_1+"-"+btp_2;
	
	if(parseInt(ctp_1) && parseInt(ctp_2) && abcd2)
		toSetVal += ","+ctp_1+"-"+ctp_2;
	
	var offpeakVal="";
	if(atp_1==0)
	{
		offpeakval=atp_2+"-"+btp_1;

		
	}else
	{
		offpeakval="0-"+atp_1;
		
		if(parseInt(btp_1) && abcd1)
			offpeakval +=","+atp_2+"-"+btp_1;
		else
			offpeakval +=","+atp_2+"-24";
	}

	if(parseInt(btp_2) != 24)
	{	

		if(parseInt(ctp_1) && abcd2)
			offpeakval +=","+btp_2+"-"+ctp_1; 
		else
			offpeakval +=","+btp_2+"-24";
			

		if((parseInt(ctp_2) != 24) && abcd2)
			offpeakval +=","+ctp_2+"-24"; 
	}
			
			
			
	/*
	if(val1.search(":") != -1)
	{
		var val1_split = val1.split(":");
		var fstPikFrm = val1_split[0];
	}
	else
		var fstPikFrm = val1;
	if(val2.search(":") != -1)
	{
		var val2_split = val2.split(":");
		var fstPikTo = val2_split[0];
	}
	else
		var fstPikTo = val2;
	if(val3.search(":") != -1)
	{
		var val3_split = val3.split(":");
		var secPikFrm = val3_split[0];
	}
	else
		var secPikFrm = val3;
	if(val4.search(":") != -1)
	{
		var val4_split = val4.split(":");
		var secPikTo = val4_split[0];
	}
	else
		var secPikTo = val4;
	if(val5.search(":") != -1)
	{
		var val5_split = val5.split(":");
		var thirPikFrm = val5_split[0];
	}
	else
		var thirPikFrm = val5;
	if(val6.search(":") != -1)
	{
		var val6_split = val6.split(":");
		var thirPikTo = val6_split[0];
	}
	else
		var secPikTo = val6;
	*/	
		
	if(htCons == true)
		var htConsumer = 1;
	else
		var htConsumer = 0;
	var htSms = document.getElementById("htSms").value;
	
	var JSONObject = new Object;
	JSONObject.jcase = "compDataSet";
	JSONObject.container = "body_main_pane";
	JSONObject.database = db_name;
	JSONObject.tablename1 = "tbl_company";
	JSONObject.tablename2 = "tbl_config";
	JSONObject.query1 = "UPDATE "+JSONObject.tablename2+" SET ConfigValue='"+toSetVal+"' WHERE ConfigName='Peak Time' AND CompanyID='"+cmp_id+"'";
	JSONObject.query2 = "UPDATE "+JSONObject.tablename1+" SET weightage='"+points+"', informHTConsumers="+htConsumer+", sendSMSConsumersAtmostMins='"+htSms+"' WHERE company_id='"+cmp_id+"'";
	JSONObject.query3 = "UPDATE "+JSONObject.tablename2+" SET ConfigValue='"+offpeakval+"' WHERE ConfigName='Non Peak Time' AND CompanyID='"+cmp_id+"'";
	JSONObject.query4 = "CALL `sp_11kv_setpeakhours`('"+toSetVal+"', "+cmp_id+")";
	
	JSONstring = JSON.stringify(JSONObject);
	runAjax(parser_page,JSONstring);
}

function userProfile()
{
	var JSONObject = new Object;
	JSONObject.jcase = "userProf";
	JSONObject.container = "body_main_pane";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	JSONObject.query = "SELECT * FROM "+JSONObject.tablename+" WHERE email='"+userna+"' OR username='"+userna+"'";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

var userInfo = null;
function userProfileData(user)
{
	userInfo = user;
	document.getElementById("body_main_pane").innerHTML = "";
	var createConfTable = '';
	createConfTable += '<h3 class="heading">User Profile</h3>';
	createConfTable += '<div class="row-fluid">';
	createConfTable += '<table>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>First Name</td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="fstName" id="fstName" value="'+user.data[0].first_name+'"></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Middle Name</td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="midName" id="midName" value=""></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>Last Name</td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="lstName" id="lstName" value="'+user.data[0].last_name+'"></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Designation</td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="desig" id="desig" value="'+user.data[0].designation+'"></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Office Phone</td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="offPhn" id="offPhn" value=""></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Mobile Number</td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="mbile" id="mobile" value="'+user.data[0].mobile+'"></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>Email</td>';
			createConfTable += '<td class="usrFont"><input class="UsrtextBox" type="text" name="email" id="email" value="'+user.data[0].email+'"></td>';
		createConfTable += '</tr>';
		
		createConfTable += '<tr>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';
		
		createConfTable += '<tr>';
			createConfTable += '<td><input class="btn btn-inverse" type="button" id="change_pass" onClick="chngPass()" value="Change Password"></td>';
			createConfTable += '<div id="hddConf" class="row-fluid"></div>';
		//createConfTable += '</tr>';
		//createConfTable += '<tr>';
			createConfTable += '<td class="confFont"><input class="btn btn-inverse pull-right" type="button" name="usrProfile" value="Save" onClick="userSet()"></td>';
		createConfTable += '</tr>';
	createConfTable += '</table>';
	createConfTable += '</div>';
	document.getElementById("body_main_pane").innerHTML = createConfTable;
}

function chngPass()
{
    //document.getElementById("hddConf").style.border = "2px groove #999";
    //document.getElementById("hddConf").style.width = "50%";
    var createExit = '';
    //createExit += '<div class="exitContainer">';
	//createExit += '<div class="row-fluid">';
    createExit += '<table>';
    createExit += '<tr>';
    createExit += '<td>Change Password</td>';
    createExit += '<td><input class="btn btn-inverse pull-right" type="button" name="usrProfile" value="Close" onClick="closeExit()">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="btn btn-inverse pull-right" type="button" name="usrPass" value="Save" onClick="setUsrPass()"></td>';
    createExit += '</tr>';
    //createExit += '</table>';
    //createExit += '<table class="exitBody">';
    createExit += '<tr><td></td><td></td></td>';
    createExit += '<tr>';
    createExit += '<td class="cPassIn">New Password</td><td><input type="password" class="UsrtextBox" maxlength="8" id="newpass"></td>';
    createExit += '</tr>';
    createExit += '<tr>';
    createExit += '<td>Confirm Password</td><td><input type="password" class="UsrtextBox" maxlength="8" id="confpass"></td>';
    createExit += '</tr>';
    createExit += '<tr><td>&nbsp;</td></td>';
    createExit += '<tr>';
    createExit += '<td id="errInfo" class="cPassIn">&nbsp;</td><td class="confFont"><td></td></td>';
    createExit += '</tr>';
    createExit += '<tr><td>&nbsp;</td><td></td></td>';
    createExit += '<tr><td>&nbsp;</td><td></td></td>';
    createExit += '</table>';
    //createExit += '</div>';
    //createExit += '</div>';
    document.getElementById("hddConf").innerHTML = createExit;
}

function setUsrPass()
{
	var pnew = document.getElementById("newpass").value;
	var confNew = document.getElementById("confpass").value;
	if(!pnew)
	{
		document.getElementById("errInfo").innerHTML = "Password can not be blank!";
		document.getElementById("errInfo").style.color = "#ff0000";
		return;
	}
	if(pnew != confNew)
	{
		document.getElementById("errInfo").innerHTML = "Password confirmation failed!";
		document.getElementById("errInfo").style.color = "#ff0000";
		return;
	}
	var user = userInfo.data[0].username;
	var JSONObject = new Object;
	JSONObject.jcase = "userPass";
	JSONObject.container = "body_main_pane";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	JSONObject.query = "UPDATE "+JSONObject.tablename+" SET password=md5('"+pnew+"') WHERE username='"+user+"'";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

function closeExit()
{
    document.getElementById("hddConf").innerHTML = "";
    document.getElementById("hddConf").className = "hddConf";
}

function userSet()
{
	var firstName = document.getElementById("fstName").value;
	var midName = document.getElementById("midName").value;
	var lastName = document.getElementById("lstName").value;
	var desig = document.getElementById("desig").value;
	var officPhn = document.getElementById("offPhn").value;
	var mobile = document.getElementById("mobile").value;
	var email = document.getElementById("email").value;
	
	if(!firstName)
	{
		alert("Firstname cant not be left blank!");
		return;
	}
	if(!lastName)
	{
		alert("Lastname cant not be left blank!");
		return;
	}
	if(!email)
	{
		alert("Please provide a valid email id!");
		return;
	}
	var JSONObject = new Object;
	JSONObject.jcase = "userProfData";
	JSONObject.container = "body_main_pane";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	JSONObject.query = "UPDATE "+JSONObject.tablename+" SET first_name='"+firstName+"',last_name='"+lastName+"',designation='"+desig+"',mobile='"+mobile+"',email='"+email+"' WHERE username='"+userInfo.data[0].username+"'";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);

}

function grpMaintenance()
{
	var JSONObject = new Object;
	JSONObject.jcase = "grpuser";
	JSONObject.container = "body_main_pane";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	JSONObject.query = "SELECT * FROM "+JSONObject.tablename+" WHERE email='"+userna+"' OR username='"+userna+"'";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

var userData = null;
function grpMaintenances()
{
	var JSONObject = new Object;
	JSONObject.jcase = "grpDrop";
	JSONObject.container = "body_main_pane";
	JSONObject.comp = cmp_id;
	JSONObject.database = db_name;
	JSONObject.tablename1 = "tbl_11kv_groupfeedercategories";
	JSONObject.query1 = "call sp_mis_feedercategory()";
	JSONObject.query2 = "call sp_mis_get_geoObjectsOfClass(2,null,"+cmp_id+")";
	JSONstring = JSON.stringify(JSONObject);
	runAjax(parser_page,JSONstring);
}

var cont = null;
function grpDropData(content)
{
	cont = content;
	var feederCount = (content.data.Feeder).length;
	var zoneCount = (content.data.Zone).length;
	//alert(feederCount+"__"+zoneCount);
	document.getElementById(content.container).innerHTML = "";
	var createConfTable = '';
	/*
	createConfTable += '<table class="approvHead" style="height:8%;">';
		createConfTable += '<tr>';
			createConfTable += '<td align="left" style="float:left;">Group Details</td>';
			createConfTable += '<td align="right" id="userProfErr"></td>';
		createConfTable += '</tr>';
	createConfTable += '</table>';
	*/
	createConfTable += '<h3 class="heading">Group Details</h3>';
	createConfTable += '<div class="row-fluid">';
	createConfTable += '<table>';
		createConfTable += '<tr>';
                        createConfTable += '<td><input type="text" name="grpName" id="grpName" value="" placeholder="Group Name"></td>';
                        //createConfTable += '<td align="left" class="confFont" id="zoneOut">&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
                        //createConfTable += '<td><input class="btn btn-inverse pull-right" type="button" name="search" value="Search" onClick="searchGrp()"></td>';
                        //createConfTable += '<td><input class="btn btn-inverse pull-left" type="button" name="search" value="Search" onClick="searchGrp()"></td>';
                        //createConfTable += '<td>&nbsp;</td>';
        	        createConfTable += '<td><input class="btn btn-inverse pull-right" type="button" name="addGrp" value="Add New Group" onClick="addGrp()"></td>';
        	        //createConfTable += '<td><input class="btn btn-inverse pull-left" type="button" name="addGrp" value="Add New Group" onClick="addGrp()"></td>';
	        createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td>';
				createConfTable += '<select name="feederDrop" id="feederDrop">';
					createConfTable += '<option value="Feeder Category" selected>Feeder Category</option>';
					for(var i=0; i<feederCount; i++)
						createConfTable += '<option value="'+content.data.Feeder[i].CategoryID+'">'+content.data.Feeder[i].CategoryName+'</option>';
				createConfTable += '</select>';
			createConfTable += '</td>';
			createConfTable += '<td>';
				//createConfTable += '<select name="zoneDrop" id="zoneDrop" class="selectGrp" onChange="getZone()">';
				createConfTable += '<select name="zoneDrop" id="zoneDrop">';
					createConfTable += '<option value="Select Zone" selected>Select Zone</option>';
					for(var j=0; j<zoneCount; j++)
						createConfTable += '<option value="'+content.data.Zone[j].GeoID+'">'+content.data.Zone[j].GeoName+'</option>';
				createConfTable += '</select>';
			createConfTable += '</td>';
			createConfTable += '<td>';
				createConfTable += '<select name="peakP" id="peakP">';
					createConfTable += '<option value=0 selected>Peak Priority</option>';
					for(var a=1;a<=10;a++)
						createConfTable += '<option value='+a+'>'+a+'</option>';
				createConfTable += '</select>';
			createConfTable += '</td>';
			createConfTable += '<td>';
				createConfTable += '<select name="offPeak" id="offPeak">';
					createConfTable += '<option value=0 selected>Off Peak Priority</option>';
					for(var b=1;b<=10;b++)
						createConfTable += '<option value='+b+'>'+b+'</option>';
				createConfTable += '</select>';
			createConfTable += '</td>';
			createConfTable += '</tr>';
			createConfTable += '<tr>';
	//		createConfTable += '<td><input type="text" name="grpName" id="grpName" value="" placeholder="Group Name"></td>';
			//createConfTable += '<td align="left" class="confFont" id="zoneOut">&nbsp;</td>';
			createConfTable += '<td><input class="btn btn-inverse pull-left" type="button" name="search" value="Search" onClick="searchGrp()"></td>';
	//		createConfTable += '<td>&nbsp;</td>';
	//		createConfTable += '<td><input class="btn btn-inverse pull-right" type="button" name="addGrp" value="Add New Group" onClick="addGrp()"></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr><td>&nbsp;</td></tr>';
	createConfTable += '<tr><td>&nbsp;</td></tr>';
	createConfTable += '<tr>';
		createConfTable += '<td class="confFont" colspan="4" id="grpBody"></td>';
	createConfTable += '</tr>';
	createConfTable += '</table>';
	createConfTable += '<div id="hddConf"></div>';
	createConfTable += '</div>';
	document.getElementById(content.container).innerHTML = createConfTable;
}

function getZone()
{
	var zone = document.getElementById("zoneDrop").value;
	if(zone == "Select Zone")
	{
		alert("Please select proper zone!");
		return;
	}
	var user = cmp_id;
	var JSONObject = new Object;
	JSONObject.jcase = "zoneDrop";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_groupfeedercategories";
	JSONObject.query = "call sp_mis_get_geoObjectsOfClassByParents("+zone+",2,7,null,"+user+")";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

var objData = null;
function getZoneData(obj)
{
	var len = obj.data.length;
	objData = len;
	var createConfTable = '';
	createConfTable += '<select name="zoneDrop" id="zoneParent" class="selectGrp" multiple style="height:80px;">';
	createConfTable += '<option value="Select Zone" selected>Graph Object</option>';
	for(var i=0; i<len; i++)
	{
		createConfTable += '<option value="'+obj.data[i].GeoID+'">'+obj.data[i].GeoName+'</option>';
	}
	createConfTable += '</select>';
	document.getElementById("zoneOut").innerHTML = createConfTable;
}

function searchGrp()
{
	//var zoneObj = '';
	var zone = document.getElementById("zoneDrop").value;
	if(zone == "Select Zone")
	{
		zone = 0;
	}
	var feeder = document.getElementById("feederDrop").value;
	if(feeder == 'Feeder Category')
		feeder = 0;
	/*for(var i=0; i<objData; i++)
	{
		if(document.getElementById("zoneParent").options[i].selected)
			zoneObj += document.getElementById("zoneParent").options[i].value+',';
	}
	if(zoneObj)
		zoneObj = zoneObj.substring(0,(zoneObj.length - 1));*/
	//var parentId = cont.data.UserInfo[0].parent_id;
	var peakP = document.getElementById("peakP").value;
	var offPeakP = document.getElementById("offPeak").value;
	var grpName = document.getElementById("grpName").value;
	if(!grpName)
		grpName = null;
	else
		grpName = "'"+grpName+"'";
	var company_id = cmp_id;
	var JSONObject = new Object;
	JSONObject.jcase = "grpDetail";
	JSONObject.container = "grpBody";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_groupfeedercategories";
	JSONObject.query = "call sp_11kv_searchgroup("+company_id+","+feeder+","+zone+","+peakP+","+offPeakP+","+grpName+")";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

function grpDataDetail(content)
{
	document.getElementById(content.container).innerHTML = "";
	var createConfTable = '';
	createConfTable += '<div class="row-fluid">';
	createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
		createConfTable += '<thead>';
		createConfTable += '<tr>';
			createConfTable += '<td>Group Name</td>';
			createConfTable += '<td>Feeder Category</td>';
			createConfTable += '<td>Action</td>';
		createConfTable += '</tr>';
		createConfTable += '</thead>';
		for(var i=0; i<(content.data.length); i++)
		{
			//alert(content.data[i].GroupID);
		createConfTable += '<tbody>';
			createConfTable += '<tr class="odd">';
				createConfTable += '<td>'+content.data[i].GroupName+'</td>';
				createConfTable += '<td>'+content.data[i].FEEDER_CATEGORY+'</td>';
				createConfTable += '<td><input title="View" id='+content.data[i].GroupID+' type="button" name="submit" value="View" onClick="viewGrpInfo(\''+content.data[i].GroupID+'\')" class="btn btn-inverse">&nbsp;</td><td><input title="Delete" id='+content.data[i].GroupID+' type="button" name="submit" value="Delete" onClick="deleteGrp(\''+content.data[i].GroupID+'\')" class="btn btn-inverse"></td>';
		createConfTable += '</tr>';
		createConfTable += '</tbody>';
		}
	createConfTable += '</table>';
	createConfTable += '</div>';
	document.getElementById(content.container).innerHTML = createConfTable;
}

function deleteGrp(obj)
{
	var JSONObject = new Object;
	JSONObject.jcase = "grpDelete";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_groupfeedercategories";
	JSONObject.query = "call sp_11kv_deleteGroup("+parseInt(obj)+")";
	JSONstring = JSON.stringify(JSONObject);
	var x = confirm("Are you sure you want to delete this group?");
	if(x)
		runAjax(parser_page,JSONstring);
}

function viewGrpInfo(obj)
{
	var JSONObject = new Object;
	JSONObject.jcase = "grpView";
	JSONObject.container = "body_main_pane";
	JSONObject.database = db_name;
	JSONObject.id = parseInt(obj);
	JSONObject.tablename = "tbl_11kv_groupfeedercategories";
	JSONObject.query1 = "call sp_mis_feedercategory()";
	JSONObject.query2 = "call sp_mis_get_geoObjectsOfClass(2,null,"+cmp_id+")";
	JSONObject.query = "call sp_11kv_getgroupbyid("+parseInt(obj)+")";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

var viewGrp = '';
var chkGRPCountID = "";
function viewGrpDetail(content)
{
	viewGrp = content;
	var data2Count = content.data.DATA2.length;
	var FCount = content.data.Feeder.length;
	var ZCount = content.data.Zone.length;
	document.getElementById("body_main_pane").innerHTML = "";
	var createConfTable = '';
	/*
	createConfTable += '<table class="approvHead" style="height:8%;">';
		createConfTable += '<tr>';
			createConfTable += '<td style="float:left;">Group '+content.data.DATA1[0].GroupName+'</td>';
			createConfTable += '<td id="userProfErr"></td>';
		createConfTable += '</tr>';
	*/
	createConfTable += '<h3 class="heading">Group '+content.data.DATA1[0].GroupName+'</h3>';
	createConfTable += '<div class="row-fluid">';
	createConfTable += '</table>';
	createConfTable += '<table class="approvtable1"style="width:70%;">';
		createConfTable += '<tr>';
			createConfTable += '<td align="left" class="confFont" style="width:20%;">Category:</td>';
			createConfTable += '<td colspan="4" align="left" class="confFont">';
				//createConfTable += '<select name="zoneDrop" id="zoneDrop" class="selectGrp" onChange="getZone()">';
				createConfTable += '<select name="cat" id="cat" class="selectGrp" style="width:30%;">';
					createConfTable += '<option value="selectCat" >Select Category</option>';
					for(var i=0; i<FCount; i++)
					{
						if(content.data.DATA1[0].FEEDER_CATEGORY == content.data.Feeder[i].CategoryName)
							createConfTable += '<option value="'+content.data.Feeder[i].CategoryID+'" selected>'+content.data.Feeder[i].CategoryName+'</option>';
						else
							createConfTable += '<option value="'+content.data.Feeder[i].CategoryID+'">'+content.data.Feeder[i].CategoryName+'</option>';
					}
						//createConfTable += '<option value='+i+'>'+i+'</option>';
				createConfTable += '</select>';
			createConfTable += '</td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td align="left" class="confFont" style="width:20%;">Zone:</td>';
			createConfTable += '<td colspan="4" align="left" class="confFont">';
				//createConfTable += '<select name="zoneDrop" id="zoneDrop" class="selectGrp" onChange="getZone()">';
				createConfTable += '<select name="zoneG" id="zoneG" class="selectGrp" style="width:30%;" onChange="chooseStationGRP()">';
					createConfTable += '<option value="zoneS" selected>Select Zone</option>';
					for(var j=0; j<ZCount; j++)
						createConfTable += '<option value="'+content.data.Zone[j].GeoID+'">'+content.data.Zone[j].GeoName+'</option>';
						//createConfTable += '<option value='+j+'>'+j+'</option>';
				createConfTable += '</select>';
			createConfTable += '</td>';
		createConfTable += '</tr>';
		createConfTable += '<tr id="restStation">';
		createConfTable += '</tr>';
		createConfTable += '<tr><td>&nbsp;</td></tr>';
		createConfTable += '<tr id="stationGrd">';
			createConfTable += '<td align="left" class="confFont">Stations</td>';
			createConfTable += '<td colspan="4" align="left" class="confFont" id="Restation">';
			createConfTable += '<select name="stationG" id="stationG" class="selectGrp" style="width:30%;height:60px;" multiple>';
				//createConfTable += '<option value="select" selected>Select Station</option>';
				/*for(var j=0; j<count10; j++)
					createConfTable += '<option value="'+content.data[j].GeoID+'">'+content.data[j].GeoName+'</option>';
					createConfTable += '<option value='+j+'>'+j+'</option>';*/
			createConfTable += '</select>';
			//createConfTable += '<span style="padding-left:15%;font-size:115%;" id="go" title="Go" onClick="getGrp('+count+')"><span class="printGo">Go</span></span>';
			//createConfTable += '<span style="padding-left:15%;font-size:115%;" id="go" title="Go" onClick="getGrp()"><span class="printGo">Go</span></span>';
			createConfTable += '</td>';
		createConfTable += '</tr>';

		createConfTable += '<tr>';
			/*if(getConfTableG && getConfTableG1)
				createConfTable += getConfTableG+getConfTableG1;
			createConfTable += '</td>';
			document.getElementById("stationGrd").innerHTML = createConfTable;
			var createConfTable1 = '';*/
				createConfTable += '<td align="left" class="confFont">Priority</td>';
				createConfTable += '<td align="left" class="confFont" style="width:5%;">';
					createConfTable += '<select name="prio" id="prio" class="selectGrp" style="width:35%;">';
						createConfTable += '<option value=0 >Priority</option>';
						createConfTable += '<option value='+parseInt(content.data.DATA1[0].PeakPriority)+' selected>'+parseInt(content.data.DATA1[0].PeakPriority)+'</option>';
						for(var i=1;i<=10;i++)
							createConfTable += '<option value='+i+'>'+i+'</option>';
					createConfTable += '</select>';
				createConfTable += '</td>';
				createConfTable += '<td align="left" class="confFont">Off Priority</td>';
				createConfTable += '<td align="left" class="confFont">';
					createConfTable += '<select name="offPrio" id="offPrio" class="selectGrp" style="width:100%;">';
						createConfTable += '<option value=0 >Off Peak Priority</option>';
						createConfTable += '<option value='+parseInt(content.data.DATA1[0].OffPeakPriority)+' selected>'+parseInt(content.data.DATA1[0].OffPeakPriority)+'</option>';
						for(var j=1;j<=10;j++)
							createConfTable += '<option value='+j+'>'+j+'</option>';
					createConfTable += '</select>';
				createConfTable += '</td>';
		createConfTable += '</tr>';
		createConfTable += '<tr><td>&nbsp;</td></tr>';
		createConfTable += '<tr id="stationGrp">';
			createConfTable += '<td align="left" class="confFont">Group Name</td>';
			createConfTable += '<td align="left" class="confFont"><input class="UsrtextBox" type="text" name="grp" id="grpGrd" value="'+content.data.DATA1[0].GroupName+'" placeholder="Group Name"></td>';
			createConfTable += '<td align="center"><input class="btn btn-inverse" type="submit" name="submit" value="Save" onClick="updateGrp('+data2Count+')"></td>';
			createConfTable += '<td align="center"><input class="btn btn-inverse" type="submit" name="cancel" value="Cancel" onClick="viewGrpInfo('+content.data.DATA1[0].GroupID+')"></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr><td>&nbsp;</td></tr>';
		createConfTable += '<tr id="stationPrior">';
			createConfTable += '<td>Feeders</td>';
			//createConfTable += '<td>';
				//createConfTable += '<table class="CSS_Table_Example" style="width:80%;mergin-top:4%;overflow:auto;">';
					//createConfTable += '<tr style="overflow:scroll;">';
						//createConfTable += '<td><input type="checkbox" name="feedChk" id="feedChk" onClick="setAndSendAll()"/></td>';
						//createConfTable += '<td>Feeder Name</td>';
						/*createConfTable += '<td>Station Name</td>';
						createConfTable += '<td>Group Name</td>';
						createConfTable += '<td>Estimated Peak Load (MW)</td>';*/
					//createConfTable += '</tr>';
					//createConfTable += '</tr>';
				//createConfTable += '</table>';
			createConfTable += '</td>&nbsp;&nbsp;</td>';
			createConfTable += '<td id="createFeeder"></td>';
			createConfTable += '<td id="createFeeder1">';
			var createConfTable11 = "";
				createConfTable11 += '<table class="table table-striped table-bordered dTableR dataTable">';
					createConfTable11 += '<tr>';
						createConfTable11 += '<td><input type="checkbox" name="feedChk" id="feedChk" onClick="setAndSendAll()"/></td>';
						createConfTable11 += '<td colspan="4">Feeder Name</td>';
						//createConfTable += '<td>Station Name</td>';
						//createConfTable += '<td>Group Name</td>';
						//createConfTable += '<td>Estimated Peak Load (MW)</td>';
					createConfTable11 += '</tr>';
					for(var i=0; i<data2Count; i++)
					{
						createConfTable11 += '<tr class="odd">';
							createConfTable11 += '<td><input type="checkbox" checked name='+content.data.DATA2[i].Class8GeoID+' id="feedChk_'+(i+1)+'"/></td>';
							createConfTable11 += '<td id='+content.data.DATA2[i].Class8GeoID+'>'+content.data.DATA2[i].FEEDER_NAME+'</td>';
							//createConfTable11 += '<td id='+content.data.DATA2[i].STATION+'>'+content.data.DATA2[i].STATION+'</td>';
							//createConfTable11 += '<td id='+content.data.DATA2[i].FEEDER_SHUTDOWN_GROUP+'>'+content.data.DATA2[i].FEEDER_SHUTDOWN_GROUP+'</td>';
							//createConfTable11 += '<td id='+content.data.DATA2[i].PEAKLOAD+'>'+content.data.DATA2[i].PEAKLOAD+'</td>';
						createConfTable11 += '</tr>';
					}
					globalCountA = i;
				//createConfTable11 += '</table>';
				getConfTableG = createConfTable11;
				getConfTableG1 = '</table>';
				createConfTable += getConfTableG+getConfTableG1;
			createConfTable += '</td>';
		createConfTable += '</tr>';
		createConfTable += '<tr><td>&nbsp;</td></tr>';
		createConfTable += '<tr id="stationSet">';
		createConfTable += '</tr>';
	createConfTable += '</table>';
	createConfTable += '<div id="hddConf" class="hddConf"></div>';
	createConfTable += '</div>';
	document.getElementById("body_main_pane").innerHTML = createConfTable;
}

function updateGrp(count)
{
	var grpId = viewGrp.data.DATA1[0].GroupID;
	var cat = document.getElementById("cat").value;
	var feeder = '';
	for(var i=1; i<=globalCountA; i++)
	{
		if(document.getElementById("feedChk_"+i).checked)
			feeder += document.getElementById("feedChk_"+i).name+",";
	}
	if(feeder)
		feeder = feeder.substring(0,(feeder.length - 1));
	var priority = document.getElementById("prio").value;
	var offPriority = document.getElementById("offPrio").value;
	var grp = document.getElementById("grpGrd").value;
	var company_id = cmp_id;
	//alert(cat+"_"+feeder+"_"+priority+"_"+offPriority+"_"+grp+"_"+company_id+"_"+grpId);
	var JSONObject = new Object;
	JSONObject.jcase = "grpUpdate";
	JSONObject.container = "body_main_pane";
	JSONObject.grpId = grpId;
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_groupfeedercategories";
	JSONObject.query = "call sp_11kv_updateGroup('"+grp+"',"+priority+","+offPriority+","+company_id+","+user_id+",'"+feeder+"',"+grpId+")";
	JSONstring = JSON.stringify(JSONObject);
	alert(JSONstring);
	runAjax(parser_page,JSONstring);

}

function addGrp()
{
	grdData = null;
	getConfTableG = null;
	getConfTableG1 = null;
	//globalCount = 0;
	createConfTable = '';
	createConfTable2 = '';
	var JSONObject = new Object;
	JSONObject.jcase = "addGrp";
	JSONObject.container = "body_main_pane";
	JSONObject.comp = user_id;
	JSONObject.database = db_name;
	JSONObject.tablename1 = "tbl_11kv_groupfeedercategories";
	JSONObject.query1 = "call sp_mis_feedercategory()";
	JSONObject.query2 = "call sp_mis_get_geoObjectsOfClass(2,null,"+JSONObject.comp+")";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

var cont = null;
function addGrpData(content)
{
	grdData = null;
	getConfTableG = null;
	getConfTableG1 = null;
	//globalCount = 0;
	createConfTable = '';
	createConfTable2 = '';
	cont = content;
	var agrCount = content.data.SP1.length;
	var zoneCount = content.data.SP2.length;
	//alert(agrCount+"__"+zoneCount);
	document.getElementById("body_main_pane").innerHTML = "";
	var createConfTable = '';
	createConfTable += '<h3 class="heading">New Group';
	createConfTable += '<input type="button" name="submit" value="Save" onClick="submitGrp()" class="btn btn-inverse pull-right">';
	createConfTable += '&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" name="cancel" value="Cancel" onClick="grpMaintenances()" class="btn btn-inverse pull-right">';
	createConfTable += '</h3>';
	createConfTable += '<div class="row-fluid">';

		createConfTable += '<table width="70%">';
		createConfTable += '<tr id="stationPrior">';

			var createConfTable1 = '';
				createConfTable1 += '<td>';
				createConfTable1 += '<table width="100%">';
				createConfTable1 += '<tr>';
				createConfTable1 += '<td>Group Name</td>';
				createConfTable1 += '<td><input type="text" name="grp" id="grpGrd" value="" placeholder="Group Name"></td>';
				createConfTable1 += '<td></td>';
				createConfTable1 += '<td></td>';
				createConfTable1 += '</tr>';
				createConfTable1 += '<tr>';
				createConfTable1 += '<td>Priority</td>';
				createConfTable1 += '<td>';
					createConfTable1 += '<select name="prio" id="prio">';
						createConfTable1 += '<option value=0 selected>Priority</option>';
						for(var i=1;i<=10;i++)
							createConfTable1 += '<option value='+i+'>'+i+'</option>';
					createConfTable1 += '</select>';
				createConfTable1 += '</td>';
				//createConfTable1 += '<td></td>';
				createConfTable1 += '<td>Off Priority</td>';
				createConfTable1 += '<td>';
					createConfTable1 += '<select name="offPrio" id="offPrio">';
						createConfTable1 += '<option value=0 selected>Off Priority</option>';
						for(var j=1;j<=10;j++)
							createConfTable1 += '<option value='+j+'>'+j+'</option>';
					createConfTable1 += '</select>';
				createConfTable1 += '</td>';
				createConfTable1 += '</tr>';
				//createConfTable1 += '</table>';
			//document.getElementById("stationPrior").innerHTML = createConfTable1;
			//createConfTable1 += '<table width="100%">';
			createConfTable1 += '</table>';
			createConfTable1 += '</td>';
			//document.getElementById("stationPrior").innerHTML = createConfTable1+createConfTable2;
		createConfTable += createConfTable1;

		createConfTable += '</tr>';
		createConfTable += '</table>';
		
		//createConfTable += '<hr>';
		//createConfTable += '<table>';
		//createConfTable += '<tr><td><hr></td></tr>';
		//createConfTable += '</table>';
		
		createConfTable += '<table width="70%">';
		createConfTable += '<tr id="stationGrp">';
		createConfTable += '</tr>';
		createConfTable += '</table>';
		
		createConfTable += '<hr>';
		createConfTable += '<table width="70%">';
			createConfTable += '<tr><td>';
		createConfTable += '<table width="100%">';
			createConfTable += '<tr>';
				createConfTable += '<td>Category:</td>';
				createConfTable += '<td>';
					//createConfTable += '<select name="zoneDrop" id="zoneDrop" class="selectGrp" onChange="getZone()">';
					createConfTable += '<select name="cat" id="cat">';
						createConfTable += '<option value="selectCat" selected>Select Category</option>';
						for(var i=0; i<agrCount; i++)
							createConfTable += '<option value="'+content.data.SP1[i].CategoryID+'">'+content.data.SP1[i].CategoryName+'</option>';
					createConfTable += '</select>';
				createConfTable += '</td>';
			//createConfTable += '</tr>';
			//createConfTable += '<tr>';
				createConfTable += '<td>Zone:</td>';
				createConfTable += '<td>';
					//createConfTable += '<select name="zoneDrop" id="zoneDrop" class="selectGrp" onChange="getZone()">';
					createConfTable += '<select name="zoneG" id="zoneG" onChange="chooseStation()">';
						createConfTable += '<option value="zoneS" selected>Select Zone</option>';
						for(var j=0; j<zoneCount; j++)
							createConfTable += '<option value="'+content.data.SP2[j].GeoID+'">'+content.data.SP2[j].GeoName+'</option>';
					createConfTable += '</select>';
				createConfTable += '</td>';
			createConfTable += '</tr>';
			createConfTable += '</table>';
			createConfTable += '</td></tr>';
			createConfTable += '</table>';
		
		//createConfTable += '<table>';
		//createConfTable += '<tr><td><hr></td></tr>';
		//createConfTable += '</table>';
		
		createConfTable += '<table width="45%">';
		createConfTable += '<tr id="restStation">';
		createConfTable += '</tr>';
		createConfTable += '</table>';
		
		createConfTable += '<hr>';
		//createConfTable += '<table>';
		//createConfTable += '<tr><td><hr></td></tr>';
		//createConfTable += '</table>';
		
		createConfTable += '<table width="100%">';
		createConfTable += '<tr id="stationGrd">';
		createConfTable += '</tr>';
		createConfTable += '</table>';
		
		createConfTable += '<hr>';
		//createConfTable += '<table>';
		//createConfTable += '<tr><td><hr></td></tr>';
		//createConfTable += '</table>';
		
		createConfTable += '<table width="100%">';
		createConfTable += '<tr id="stationSet">';
		createConfTable += '</tr>';
		createConfTable += '</table>';
	createConfTable += '<div id="hddConf"></div>';
	createConfTable += '</div>';
	document.getElementById("body_main_pane").innerHTML = createConfTable;
}

function chooseStation()
{
	document.getElementById("restStation").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	var zone = document.getElementById("zoneG").value;
	//alert(zone);
	if(zone == "zone")
	{
		alert("Please select proper zone!");
		return;
	}
	var user = user_id;
	var JSONObject = new Object;
	JSONObject.jcase = "addStation";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_groupfeedercategories";
	JSONObject.query = "call sp_mis_get_geoObjectsOfClassByParents("+zone+",2,7,null,"+user+")";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

function chooseStationGRP()
{
	document.getElementById("Restation").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	var zone = document.getElementById("zoneG").value;
	//alert(zone);
	if(zone == "zone")
	{
		alert("Please select proper zone!");
		return;
	}
	var company_id = user_id;
	var JSONObject = new Object;
	JSONObject.jcase = "Restation";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_groupfeedercategories";
	JSONObject.query = "call sp_mis_get_geoObjectsOfClassByParents("+zone+",2,7,null,"+company_id+")";
	JSONstring = JSON.stringify(JSONObject);
	runAjax(parser_page,JSONstring);
}

var stationCount = null;
function showStation(content)
{
	var count = content.data.length;
	stationCount = count;
	//alert(count);
	var createConfTable = '';
	createConfTable += '<td>Stations</td>';
	createConfTable += '<td>';
	createConfTable += '<select name="stationG" id="stationG" multiple>';
		//createConfTable += '<option value="select" selected>Select Station</option>';
		for(var j=0; j<count; j++)
			createConfTable += '<option value="'+content.data[j].GeoID+'">'+content.data[j].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTable += '</td>';
	createConfTable += '<td style="vertical-align:bottom;"><input type="button" id="go" title="Go" value="Go" name="confSave" class="btn btn-inverse pull-left" onClick="getGrp('+count+')" style="width:50px"></td>';
	//createConfTable += '<span style="padding-left:15%;font-size:115%;" id="go" title="Go" onClick="getGrp('+count+')"><span class="printGo">Go</span></span>';
	document.getElementById("restStation").innerHTML = createConfTable;
}

function ReshowStation(content)
{
	var count = content.data.length;
	stationCount = count;
	//alert(count);
	var createConfTable = '';
	createConfTable += '<td>';
	createConfTable += '<select name="stationG" id="stationG" multiple>';
		createConfTable += '<option value="select" selected>Select Station</option>';
		for(var j=0; j<count; j++)
			createConfTable += '<option value="'+content.data[j].GeoID+'">'+content.data[j].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTable += '</td>';
	createConfTable += '<td style="vertical-align:bottom;"><input type="button" id="go" title="Go" value="Go" name="confSave" class="btn btn-inverse pull-left" onClick="RegetGrp('+count+')" style="width:50px"></td>';
	document.getElementById("Restation").innerHTML = createConfTable;
}

function getGrp(obj)
{
	if(document.getElementById("createFeeder"))
		document.getElementById("createFeeder").innerHTML ="<center><img src='img/ajax_loader.gif'></center>";
	else
		document.getElementById("stationGrd").innerHTML ="<center><img src='img/ajax_loader.gif'></center>";
	var station = '';
	var cat = document.getElementById("cat").value;
	if(cat == "selectCat")
		cat = 0;
	var zone = document.getElementById("zoneG").value;
	if(zone == "zoneS")
		zone = 0;
	for(var i=0; i<obj; i++)
	{
		if(document.getElementById("stationG").options[i].selected)
			station += document.getElementById("stationG").options[i].value+',';
	}
	if(station)
		station = station.substring(0,(station.length - 1));
	var company_id = user_id;
	//alert(cat+"__"+zone+"__"+station+"__"+company_id);
	var JSONObject = new Object;
	JSONObject.jcase = "getGrd";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_groupfeedercategories";
	JSONObject.query = "call sp_getfeedersbycategoryandhierarchy(4,'"+station+"',7,"+company_id+","+cat+")";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

function RegetGrp(obj)
{
	if(document.getElementById("createFeeder"))
		document.getElementById("createFeeder").innerHTML ="<center><img src='img/ajax_loader.gif'></center>";
	else
		document.getElementById("stationGrd").innerHTML ="<center><img src='img/ajax_loader.gif'></center>";
	var station = '';
	var cat = document.getElementById("cat").value;
	if(cat == "selectCat")
		cat = 0;
	var zone = document.getElementById("zoneG").value;
	if(zone == "zoneS")
		zone = 0;
	for(var i=0; i<obj; i++)
	{
		if(document.getElementById("stationG").options[i].selected)
			station += document.getElementById("stationG").options[i].value+',';
	}
	if(station)
		station = station.substring(0,(station.length - 1));
	var company_id = user_id;
	//alert(cat+"__"+zone+"__"+station+"__"+company_id);
	var JSONObject = new Object;
	JSONObject.jcase = "RegetGrd";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_groupfeedercategories";
	JSONObject.query = "call sp_getfeedersbycategoryandhierarchy(4,'"+station+"',7,"+company_id+","+cat+")";
	JSONstring = JSON.stringify(JSONObject);
	runAjax(parser_page,JSONstring);
}

var grdData = null;
var getConfTableG = "";
var getConfTableG1 = "";
var globalCount = 0;
function showGrd(content)
{
	grdData = content;
	var count = content.data.length;
	var createConfTable = '';
		createConfTable += '<td style="vertical-align:top;"></td>';
		createConfTable += '<td id="createFeeder" style="vertical-align:top;">';
			createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
				createConfTable += '<thead>';
				createConfTable += '<tr>';
					createConfTable += '<td><input type="checkbox" name="feedChk" id="feedChk" onClick="setAndSendAll()"/></td>';
					createConfTable += '<td>Station Name</td>';
					createConfTable += '<td>Feeder Name</td>';
					createConfTable += '<td>Group Name</td>';
					createConfTable += '<td>Estimated Peak Load (MW)</td>';
				createConfTable += '</tr>';
				createConfTable += '</thead>';
				createConfTable += '<tbody>';
				for(var i=0; i<count; i++)
				{
					createConfTable += '<tr class="odd">';
						createConfTable += '<td><input type="checkbox" name="feedChk" id="feedChk_'+(i+1)+'" onClick="checkFeedandAdd(this)"/></td>';
						createConfTable += '<td>'+content.data[i].STATION+'</td>';
						createConfTable += '<td>'+content.data[i].FEEDER_NAME+'</td>';
						createConfTable += '<td>'+content.data[i].FEEDER_SHUTDOWN_GROUP+'</td>';
						createConfTable += '<td>'+content.data[i].PEAKLOAD+'</td>';
					createConfTable += '</tr>';
				}
			createConfTable += '</tbody>';
			createConfTable += '</table>';
		createConfTable += '</td>';

		createConfTable += '<td id="createFeeder1" style="vertical-align:top;">';
		if(getConfTableG && getConfTableG1)
			createConfTable += getConfTableG+getConfTableG1;
	createConfTable += '</td>';
	document.getElementById("stationGrd").innerHTML = createConfTable;
	/*
	var createConfTable1 = '';
		createConfTable1 += '<td>';
		createConfTable1 += '<table width="100%">';
		createConfTable1 += '<tr>';
		createConfTable1 += '<td>Priority</td>';
		createConfTable1 += '<td>';
			createConfTable1 += '<select name="prio" id="prio">';
				createConfTable1 += '<option value=0 selected>Priority</option>';
				for(var i=1;i<=10;i++)
					createConfTable1 += '<option value='+i+'>'+i+'</option>';
			createConfTable1 += '</select>';
		createConfTable1 += '</td>';
		//createConfTable1 += '<td></td>';
		createConfTable1 += '<td>Off Priority</td>';
		createConfTable1 += '<td>';
			createConfTable1 += '<select name="offPrio" id="offPrio">';
				createConfTable1 += '<option value=0 selected>Off Priority</option>';
				for(var j=1;j<=10;j++)
					createConfTable1 += '<option value='+j+'>'+j+'</option>';
			createConfTable1 += '</select>';
		createConfTable1 += '</td>';
		createConfTable1 += '</tr>';
		//createConfTable1 += '</table>';
	//document.getElementById("stationPrior").innerHTML = createConfTable1;
	var createConfTable2 = '';
	//createConfTable1 += '<table width="100%">';
	createConfTable2 += '<tr>';
	createConfTable2 += '<td>Group Name</td>';
	createConfTable2 += '<td><input type="text" name="grp" id="grpGrd" value="" placeholder="Group Name"></td>';
	createConfTable2 += '<td><input type="button" name="submit" value="Save" onClick="submitGrp()" class="btn btn-inverse"></td>';
	createConfTable2 += '<td><input type="button" name="cancel" value="Cancel" onClick="addGrp()" class="btn btn-inverse"></td>';
	createConfTable2 += '</tr>';
	createConfTable2 += '</table>';
	createConfTable2 += '</td>';
	document.getElementById("stationPrior").innerHTML = createConfTable1+createConfTable2;
	*/
	//document.getElementById("stationGrp").innerHTML = createConfTable2;
}

function ReshowGrd(content)
{
	grdData = content;
	var count = content.data.length;
	var createConfTable = '';
	createConfTable += '<td style="vertical-align:top;"></td>';
	//createConfTable += '<td>';
	createConfTable += '<td id="createFeeder" style="vertical-align:top;">';
		createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
			createConfTable += '<thead>';
			createConfTable += '<tr>';
				createConfTable += '<td><input type="checkbox" name="feedChk" id="feedChk" onClick="setAndSendAllV()"/></td>';
				createConfTable += '<td>Feeder Name</td>';
				//createConfTable += '<td>Station Name</td>';
				//createConfTable += '<td>Group Name</td>';
				//createConfTable += '<td>Estimated Peak Load (MW)</td>';
			createConfTable += '</tr>';
			createConfTable += '</thead>';
			createConfTable += '<tbody>';
			for(var i=0; i<count; i++)
			{
				createConfTable += '<tr class="odd">';
					createConfTable += '<td><input type="checkbox" name="'+content.data[i].FeederID+'" id="feedChk_'+(i+1)+'" onClick="checkFeedandAddV(this)"/></td>';
					createConfTable += '<td id='+content.data[i].FeederID+'>'+content.data[i].FEEDER_NAME+'</td>';
					//createConfTable += '<td id='+content.data[i].STATION+'>'+content.data[i].STATION+'</td>';
					//createConfTable += '<td id='+content.data[i].FEEDER_SHUTDOWN_GROUP+'>'+content.data[i].FEEDER_SHUTDOWN_GROUP+'</td>';
					//createConfTable += '<td id='+content.data[i].PEAKLOAD+'>'+content.data[i].PEAKLOAD+'</td>';
				createConfTable += '</tr>';
			}
		createConfTable += '</tbody>';
		createConfTable += '</table>';
	createConfTable += '</td>';
	//createConfTable += '</td>';
	createConfTable += '</td>';
	createConfTable += '<td id="createFeeder1" style="vertical-align:top;">';
	if(getConfTableG && getConfTableG1)
		createConfTable += getConfTableG+getConfTableG1;
	createConfTable += '</td>';
	document.getElementById("stationPrior").innerHTML = createConfTable;
}

function checkFeedandAddV(obj)
{
	if(obj.checked)
	{
		var createRow = '';
		var count = (obj.id).split("_");
		var itr = parseInt(count[1]);
		if(!getConfTableG)
		{
			++globalCountA;
			var createConfTable = '';
			createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
				createConfTable += '<thead>';
				createConfTable += '<tr>';
					createConfTable += '<td><input type="checkbox" name="feedChk" id="feedChk"/></td>';
					createConfTable += '<td>Feeder Name</td>';
					createConfTable += '<td>Station Name</td>';
					createConfTable += '<td>Group Name</td>';
					createConfTable += '<td>Estimated Peak Load (MW)</td>';
				createConfTable += '</tr>';
				createConfTable += '</thead>';
				createConfTable += '<tbody>';
					createConfTable += '<tr class="odd">';
						createConfTable += '<td><input type="checkbox" checked name='+grdData.data[itr-1].FeederID+' id="feedChk_'+globalCountA+'"/></td>';
						createConfTable += '<td id='+grdData.data[itr-1].FeederID+'>'+grdData.data[itr-1].FEEDER_NAME+'</td>';
					createConfTable += '</tr>';
				createConfTable += '</tbody>';
			getConfTableG = createConfTable;
			getConfTableG1 = '</table>&nbsp;';
			createConfTable += getConfTableG1;
			document.getElementById("createFeeder1").innerHTML = createConfTable;
		}
		else
		{
			++globalCountA;
			createRow += '<tr>';
				createRow += '<td><input type="checkbox" checked name='+grdData.data[itr-1].FeederID+' id="feedChk_'+globalCountA+'"/></td>';
				createRow += '<td align="center" id='+grdData.data[itr-1].FeederID+'>'+grdData.data[itr-1].FEEDER_NAME+'</td>';
			createRow += '</tr>';
			getConfTableG += createRow;
			document.getElementById("createFeeder1").innerHTML = getConfTableG+getConfTableG1;
		}
	}
}

function setAndSendAllV()
{
	var count = grdData.data.length;
	//alert(document.getElementById("feedChk").checked);
	if(document.getElementById("feedChk").checked)
	{
		for(var i=0;i<count;i++)
			document.getElementById('feedChk_'+(i+1)).checked = true;
		if(!getConfTableG)
		{
			var createConfTable = '';
			createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
				createConfTable += '<thead>';
				createConfTable += '<tr>';
					createConfTable += '<td><input type="checkbox" name="feedChk" id="feedChk"/></td>';
					createConfTable += '<td>Feeder Name</td>';
				createConfTable += '</tr>';
				createConfTable += '</thead>';
				createConfTable += '<tbody>';
				for(var i=globalCountA; i<count; i++)
				{
					++globalCountA;
					createConfTable += '<tr>';
						createConfTable += '<td><input type="checkbox" checked name='+grdData.data[i].FeederID+' id="feedChk_'+globalCountA+'" /></td>';
						createConfTable += '<td align="center" id='+grdData.data[i].FeederID+'>'+grdData.data[i].FEEDER_NAME+'</td>';
					createConfTable += '</tr>';
				}
			createConfTable += '</tbody>';
			getConfTableG = createConfTable;
			getConfTableG1 = '</table>';
			createConfTable += getConfTableG1;
			document.getElementById("createFeeder1").innerHTML = createConfTable;
		}
		else
		{
			for(var i=globalCountA; i<count; i++)
			{
				++globalCountA;
				createRow += '<tr>';
					createRow += '<td><input type="checkbox" checked name='+grdData.data[i].FeederID+' id="feedChk_'+globalCountA+'"/></td>';
					createRow += '<td align="center" id='+grdData.data[i].FeederID+'>'+grdData.data[i].FEEDER_NAME+'</td>';
				createRow += '</tr>';
				getConfTableG += createRow;
			}
			document.getElementById("createFeeder1").innerHTML = getConfTableG+getConfTableG1;
		}
		//document.getElementById("createFeeder").style.display = "none";
	}
	else
	{
		for(var i=0;i<globalCountA;i++)
			document.getElementById('feedChk_'+(i+1)).checked = false;
	}
}

function noneMe(oid)
{
	document.getElementById(oid).style.display = "none";
	document.getElementById(oid).id = "";
	getConfTableG = document.getElementById("createFeeder1").innerHTML;
}

function checkFeedandAdd(obj)
{
	if(obj.checked)
	{
		var createRow = '';
		var count = (obj.id).split("_");
		var itr = parseInt(count[1]);
		if(!getConfTableG)
		{
			++globalCount;
			var createConfTable = '';
			createConfTable += '<table class="table table-striped table-bordered dTableR dataTable" style="padding-bottom:0px; margin-bottom:0px;" id="tableME">';
				createConfTable += '<thead>';
				createConfTable += '<tr>';
					//createConfTable += '<td><input type="checkbox" name="feedChk" id="feedChk"/></td>';
					createConfTable += '<td></td>';
					createConfTable += '<td>Station Name</td>';
					createConfTable += '<td>Feeder Name</td>';
					createConfTable += '<td>Group Name</td>';
					createConfTable += '<td>Estimated Peak Load (MW)</td>';
				createConfTable += '</tr>';
				createConfTable += '</thead>';
				createConfTable += '<tbody id='+grdData.data[itr-1].FeederID+'>';
					createConfTable += '<tr class="odd">';
						createConfTable += '<td><input onclick="noneMe(\''+grdData.data[itr-1].FeederID+'\');" type="checkbox" checked name='+grdData.data[itr-1].FeederID+' id="feedFinal_'+globalCount+'"/></td>';
						createConfTable += '<td>'+grdData.data[itr-1].STATION+'</td>';
						createConfTable += '<td>'+grdData.data[itr-1].FEEDER_NAME+'</td>';
						createConfTable += '<td>'+grdData.data[itr-1].FEEDER_SHUTDOWN_GROUP+'</td>';
						createConfTable += '<td>'+grdData.data[itr-1].PEAKLOAD+'</td>';
					createConfTable += '</tr>';
				createConfTable += '</tbody>';
			getConfTableG = createConfTable;
			getConfTableG1 = '</table>';
			createConfTable += getConfTableG1;
			document.getElementById("createFeeder1").innerHTML = createConfTable;
			//document.getElementById("createFeeder").style.display = "none";
		}
		else
		{
			if(document.getElementById(grdData.data[itr-1].FeederID) && document.getElementById(grdData.data[itr-1].FeederID).style.display != "none")
				alert("Already added!");
			else
			{
				++globalCount;
				getConfTableG = document.getElementById("createFeeder1").innerHTML;
				createRow += '<table style="padding-bottom:0px; margin-bottom:0px;" id='+grdData.data[itr-1].FeederID+' class="table table-striped table-bordered dTableR dataTable">';
				createRow += '<tbody>';
				createRow += '<tr>';
					createRow += '<td><input onclick="noneMe(\''+grdData.data[itr-1].FeederID+'\');" type="checkbox" checked name='+grdData.data[itr-1].FeederID+' id="feedFinal_'+globalCount+'"/></td>';
					createRow += '<td>'+grdData.data[itr-1].STATION+'</td>';
					createRow += '<td>'+grdData.data[itr-1].FEEDER_NAME+'</td>';
					createRow += '<td>'+grdData.data[itr-1].FEEDER_SHUTDOWN_GROUP+'</td>';
					createRow += '<td>'+grdData.data[itr-1].PEAKLOAD+'</td>';
				createRow += '</tr>';
				createRow += '</tbody>';
				getConfTableG += createRow;
				document.getElementById("createFeeder1").innerHTML = getConfTableG+getConfTableG1;
				//document.getElementById("createFeeder").style.display = "none";
			}
		}
	}
}

function setAndSendAll()
{
	var count = grdData.data.length;
	//alert(document.getElementById("feedChk").checked);
	if(document.getElementById("feedChk").checked)
	{
		for(var i=0;i<count;i++)
			document.getElementById('feedChk_'+(i+1)).checked = true;
		var createConfTable = '';
		if(!document.getElementById("tableME"))
		{
			createConfTable += '<table class="table table-striped table-bordered dTableR dataTable" style="padding-bottom:0px; margin-bottom:0px;" id="tableME">';
				createConfTable += '<thead>';
				createConfTable += '<tr>';
					createConfTable += '<td><input type="checkbox" name="feedChk" id="feedChk"/></td>';
					createConfTable += '<td>Station Name</td>';
					createConfTable += '<td>Feeder Name</td>';
					createConfTable += '<td>Group Name</td>';
					createConfTable += '<td>Estimated Peak Load (MW)</td>';
				createConfTable += '</tr>';
				createConfTable += '</thead>';
				createConfTable += '<tbody>';
				for(var i=0; i<count; i++)
				{
					++globalCount;
					createConfTable += '<tr id='+grdData.data[i].FeederID+'>';
						createConfTable += '<td><input onclick="noneMe(\''+grdData.data[i].FeederID+'\');" type="checkbox" checked name='+grdData.data[i].FeederID+' id="feedFinal_'+globalCount+'" /></td>';
						createConfTable += '<td>'+grdData.data[i].STATION+'</td>';
						createConfTable += '<td>'+grdData.data[i].FEEDER_NAME+'</td>';
						createConfTable += '<td>'+grdData.data[i].FEEDER_SHUTDOWN_GROUP+'</td>';
						createConfTable += '<td>'+grdData.data[i].PEAKLOAD+'</td>';
					createConfTable += '</tr>';
				}
			createConfTable += '</tbody>';
			getConfTableG = createConfTable;
			getConfTableG1 = '</table>';
			createConfTable += getConfTableG1;
			document.getElementById("createFeeder1").innerHTML = createConfTable;
		}
		else
		{
			var flagERR = 0;
			for(var i=0; i<count; i++)
			{
				if(document.getElementById(grdData.data[i].FeederID) && document.getElementById(grdData.data[i].FeederID).style.display != "none")
					flagERR++;
				else
				{
					++globalCount;
					getConfTableG = document.getElementById("createFeeder1").innerHTML;
					createConfTable += '<table style="padding-bottom:0px; margin-bottom:0px;" id='+grdData.data[i].FeederID+' class="table table-striped table-bordered dTableR dataTable">';
					createConfTable += '<tbody>';
					createConfTable += '<tr>';
						createConfTable += '<td><input onclick="noneMe(\''+grdData.data[i].FeederID+'\');" type="checkbox" checked name='+grdData.data[i].FeederID+' id="feedFinal_'+globalCount+'" /></td>';
						createConfTable += '<td>'+grdData.data[i].STATION+'</td>';
						createConfTable += '<td>'+grdData.data[i].FEEDER_NAME+'</td>';
						createConfTable += '<td>'+grdData.data[i].FEEDER_SHUTDOWN_GROUP+'</td>';
						createConfTable += '<td>'+grdData.data[i].PEAKLOAD+'</td>';
					createConfTable += '</tr>';
					createConfTable += '</tbody>';
					getConfTableG1 = '</table>';
					createConfTable += getConfTableG1;
					getConfTableG += createConfTable;
					document.getElementById("createFeeder1").innerHTML = getConfTableG;
				}
			}
			
		}
		//document.getElementById("createFeeder").style.display = "none";
	}
	else
	{
		for(var i=0;i<count;i++)
			document.getElementById('feedChk_'+(i+1)).checked = false;
	}
}

function submitGrp()
{
	var catagory = document.getElementById("cat").value;
	var zones = document.getElementById("zoneG").value;
	var statn = '';
	var station = '';
	for(var i=0; i<stationCount; i++)
	{
		if(document.getElementById("stationG").options[i].selected)
			station += document.getElementById("stationG").options[i].value+',';
	}
	if(station)
		station = station.substring(0,(station.length - 1));
	var priority = document.getElementById("prio").value;
	var offPriority = document.getElementById("offPrio").value;
	for(var j=1; j<=globalCount; j++)
	{
		if(document.getElementById("feedFinal_"+j).chekced)
		{
			alert(document.getElementById("feedFinal_"+i).name);
			statn += document.getElementById("feedFinal_"+i).name+',';
		}
	}
	if(statn)
		statn = statn.substring(0,(statn.length - 1));
	var company_id = user_id;
	var user_id = userna;
	var groupName = document.getElementById("grpGrd").value;
	var JSONObject = new Object;
	JSONObject.jcase = "createGrp";
	JSONObject.container = "body_main_pane";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_groupfeedercategories";
	JSONObject.query = "call sp_11kv_createGroup('"+groupName+"',"+priority+","+offPriority+","+company_id+","+user_id+",'"+statn+"')";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

function approvals()
{
	var JSONObject = new Object;
	JSONObject.jcase = "userForApprov";
	JSONObject.container = "body_main_pane";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	JSONObject.query = "SELECT * FROM tbl_11kv_user WHERE username='"+userna+"'";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

var userApp = '';
function approvalUsr()
{
	document.getElementById("body_main_pane").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	var JSONObject = new Object;
	JSONObject.jcase = "userAppr";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.compID = cmp_id;
	JSONObject.tablename = "tbl_11kv_user";
	JSONObject.query = "call sp_11kv_getOutagesWaitingApproval("+parseInt(cmp_id)+")";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

var approvData = '';
function approvalsData(obj)
{
	approvData = obj;
	count = obj.data.DATA.length;
	//document.getElementById("body_main_pane").innerHTML = "";
	var createConfTable = '';
	//createConfTable += '<table class="approvHead">';
	//	createConfTable += '<tr>';
	//		createConfTable += '<td align="left" style="float:left;">Approvals</td>';
	//		createConfTable += '<td align="right" id="userProfErr"></td>';
	//	createConfTable += '</tr>';
	//createConfTable += '</table>';
		createConfTable += '<h3 class="heading">Approvals</h3>';
		createConfTable += '<div class="row-fluid">';
		createConfTable += '<table>';
		createConfTable += '<tr>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td><input class="btn btn-inverse" type="button" id="print" title="Print" onClick="printApprov()" value="Print"></td>';
			createConfTable += '<td><input class="btn btn-inverse" type="button" id="print" title="History" onClick="historytApprov()" value="Go To History"></td>';
		createConfTable += '</tr>';
	createConfTable += '</table>';
	createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
		createConfTable += '<tr>';
			createConfTable += '<td>Shutdown Event ID</td>';
			createConfTable += '<td>Shutdown Start Time</td>';
			createConfTable += '<td>Requested Shutdown (MW)</td>';
			createConfTable += '<td>Duration (Minutes)</td>';
			createConfTable += '<td>Requested At</td>';
			createConfTable += '<td>Plan</td>';
			createConfTable += '<td align="center">&nbsp;</td>';
		createConfTable += '</tr>';
		for(var i=0; i<count; i++)
		{
			createConfTable += '<tr>';
				createConfTable += '<td style="text-align:right">'+obj.data.DATA[i].outageID+'</td>';
				createConfTable += '<td>'+convertDateFormat(obj.data.DATA[i].outageDateTime,"-"," ")+'</td>';
				createConfTable += '<td style="text-align:right">'+obj.data.DATA[i].shutdownRequested+'</td>';
				createConfTable += '<td style="text-align:right">'+obj.data.DATA[i].outageTentativeDurationMins+'</td>';
				createConfTable += '<td>'+convertDateFormat(obj.data.DATA[i].requestTime,"-"," ")+'</td>';
				createConfTable += '<td><input class="btn btn-inverse" type="button" id="potent_"'+i+' title="Potential Plan" onClick="CallpotPlan(\''+i+'\',\''+obj.data.CDT[0].weightage+'\')" value="Potential Plan"></td>';
				createConfTable += '<td><input class="btn btn-inverse" type="button" id="approv" name="approve" value="Approve" onClick="commApprov(\''+i+'\',\''+obj.data.CDT[0].weightage+'\')">&nbsp;&nbsp;<input class="btn btn-inverse" type="button" id="UnApprov" name="unApprove" value="Reject" onClick="commUnApprov(\''+i+'\',\''+obj.data.CDT[0].weightage+'\')"></td>';
			createConfTable += '</tr>';
		}
	createConfTable += '</table>';
	createConfTable += '<div id="hddConf" class="hddConf"></div>';
	
	/*
	createConfTable += '<div class="modal hide fade" id="myModal2">';
	createConfTable += '<div class="modal-header">';
		createConfTable += '<button class="close" data-dismiss="modal">×</button>';
		createConfTable += '<h3>Comment</h3>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-body" id="loadMod">';
		createConfTable += '<textarea id="rcommentA" cols="1" rows="4" style="width:97%"></textarea>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-footer">';
		createConfTable += '<a href="javascript:sendRequestApproval();" class="btn"="modal">Submit</a>';
		createConfTable += '<a href="#" class="btn" data-dismiss="modal">Close</a>';
	createConfTable += '</div>';
	createConfTable += '</div>';
	
	createConfTable += '<div class="modal hide fade" id="myModal3">';
	createConfTable += '<div class="modal-header">';
		createConfTable += '<button class="close" data-dismiss="modal">×</button>';
		createConfTable += '<h3>Comment</h3>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-body" id="loadModC">';
		createConfTable += '<textarea id="rcommentR" cols="1" rows="4" style="width:97%"></textarea>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-footer">';
		createConfTable += '<a href="javascript:requestC();" class="btn"="modal">Submit</a>';
		createConfTable += '<a href="#" class="btn" data-dismiss="modal">Close</a>';
	createConfTable += '</div>';
	createConfTable += '</div>';
	*/
	createConfTable += '</div>';
	createConfTable += '<div id="body_main_pane_pot">';
	createConfTable += '</div>';
	document.getElementById("body_main_pane").innerHTML = createConfTable;
}

function CallpotPlan(itx,wgt)
{
	potPlan(approvData, itx, wgt);
}

function commApprov(itx,wgt)
{
	submitAppUnApp(itx, 1);
}

function commUnApprov(itx,wgt)
{
	submitAppUnApp(itx, 2);
}

function printApprov()
{
	window.print();
}

function potPlan(adata, itx, wgt)
{
	document.getElementById("body_main_pane_pot").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	var JSONObject = new Object;
	JSONObject.jcase = "GetPOTPlan";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	var tmp = (adata.data.DATA[itx].cyclePlannedStartTime).split(" ");
	var tmp1 = tmp[1].split(":");
	JSONObject.query = "call sp_11kv_getgroupsforshutdown("+(adata.data.DATA[itx].outageCycleID)+","+parseInt(cmp_id)+",'"+(adata.data.DATA[itx].shutdownNeeded)+"','"+tmp1[0]+"','"+wgt+"')";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

function showPOTPlan(adata)
{
	var createConfTable = "";
	createConfTable += "<h3 class=\"heading\">Potential Plan for Shutdown Event ID:"+adata.data[0].outageID+"</h3>";
	createConfTable += '<div class="row-fluid">';
		createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
		createConfTable += '<tr>';
			createConfTable += '<td>Station</td>';
			createConfTable += '<td>Feeder</td>';
			createConfTable += '<td>Category</td>';
		createConfTable += '</tr>';
		for(i=0;i<(adata.data).length;i++)
		{
			createConfTable += '<tr>';
				createConfTable += '<td>'+adata.data[i].STATION+'</td>';
				createConfTable += '<td>'+adata.data[i].FEEDER_NAME+'</td>';
				createConfTable += '<td>'+adata.data[i].FEEDER_CATEGORY+'</td>';
			createConfTable += '</tr>';
		}
	createConfTable += '</table>';
	createConfTable += '</div>';
	document.getElementById("body_main_pane_pot").innerHTML = createConfTable;
}

function submitAppUnApp(itr, appUnapp)
{
	//alert(appUnapp+"__"+itr);
	var usr_id = user_id;
	var txt = ""/*document.getElementById("comment").value*/;
	var JSONObject = new Object;
	JSONObject.jcase = "setAppUnApp";
	JSONObject.container = "body_main_pane";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	if(appUnapp == 1)
		JSONObject.query = "call sp_11kv_approverejectrequest("+approvData.data.DATA[itr].outageCompanyShareID+",4,4,'"+txt+"',"+usr_id+","+approvData.data.DATA[itr].outageCompanyRequestID +")";
	if(appUnapp == 2)
		JSONObject.query = "call sp_11kv_approverejectrequest("+approvData.data.DATA[itr].outageCompanyShareID+",5,4,'"+txt+"',"+usr_id+","+approvData.data.DATA[itr].outageCompanyRequestID +")";
	JSONObject.appVal = appUnapp;
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);    
	runAjax(parser_page,JSONstring);
}

function resetVewdata()
{
	document.getElementById("viewdates").value = "";
	document.getElementById("viewdatee").value = "";
}

function searchApp()
{
	var hst = convertDateFormat(document.getElementById("viewdates").value,"-",null)+" 00:00";
	var het = convertDateFormat(document.getElementById("viewdatee").value,"-",null)+" 00:00";
	var JSONObject = new Object;
	JSONObject.jcase = "historyGet";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "";
	JSONObject.query = "CALL sp_11kv_getOutagesHistoryForESCOM('"+cmp_id+"','"+hst+"','"+het+"')";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("body_main_pane_view").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function historytApprov()
{
	document.getElementById("body_main_pane").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	var createConfTable = '';
	/*
	createConfTable += '<table class="approvHead" style="height:12%;">';
		createConfTable += '<tr>';
			createConfTable += '<td align="left" style="float:left;">Approval History</td>';
			createConfTable += '<td align="right" id="userProfErr"></td>';
		createConfTable += '</tr>';
	createConfTable += '</table>';
	*/
	
	var atoday = new Date();
	var add = atoday.getDate();
	var amm = atoday.getMonth()+1;
	var ayyyy = atoday.getFullYear();
	
	var fDate = add+"-"+amm+"-"+ayyyy;
	
	var d = new Date(); // today!
	var x = 7; // go back 7 days!
	d.setDate(d.getDate() - x);
	var ddd = d.getDate();
	var dmm = d.getMonth()+1;
	var dyyyy = d.getFullYear();
	var oDate = ddd+"-"+dmm+"-"+dyyyy;

	createConfTable += '<h3 class="heading">Approval History</h3>';
	createConfTable += '<div class="row-fluid">';


	createConfTable += '<table>';
		createConfTable += '<tr>';
		createConfTable += '<td>';
		
		createConfTable += '<table>';
			createConfTable += '<tr>';
			createConfTable += '<td>From:&nbsp;&nbsp;</td>';
			createConfTable += '<td>';
				createConfTable += '<div class="input-append date" id="dp3" data-date-format="dd-mm-yyyy">';
				createConfTable += '<input class="span6" type="text" value="'+oDate+'" readonly id="viewdates"/>';
				createConfTable += '<span class="add-on"><i class="splashy-calendar_day"></i></span>';
				createConfTable += '</div>';
			createConfTable += '</td>';
			createConfTable += '<td>To:&nbsp;&nbsp;</td>';
			createConfTable += '<td>';
				createConfTable += '<div class="input-append date" id="dp4" data-date-format="dd-mm-yyyy">';
				createConfTable += '<input class="span6" type="text" value="'+fDate+'" readonly  id="viewdatee"/>';
				createConfTable += '<span class="add-on" ><i class="splashy-calendar_day"></i></span>';
				createConfTable += '</div>';
			createConfTable += '</td>';
			createConfTable += '<td><input type="button" onclick="searchApp()" value="Search" name="confSave" class="btn btn-inverse pull-left"></td>';
			createConfTable += '<td><input type="button" onclick="resetVewdata()" value="Reset" name="confSave" class="btn btn-inverse pull-left"></td>';
			createConfTable += '</tr>';
		createConfTable += '</table>';

		createConfTable += '</td>';
		createConfTable += '</tr>';

		createConfTable += '<tr>';
		createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';

		createConfTable += '<tr>';
		createConfTable += '<td id="body_main_pane_view">';
		createConfTable += '</td>';
		createConfTable += '</tr>';

	createConfTable += '</table>';
	createConfTable += '<div id="hddConf" class="hddConf"></div>';
	createConfTable += '</div>';
	document.getElementById("body_main_pane").innerHTML = createConfTable;
	gebo_datepicker.init();
	searchApp();
}

function showhistoryGet(adata)
{
	var createConfTable = '';
	createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
	createConfTable += '<tr>';
			createConfTable += '<td>Shutdown Event ID</td>';
			createConfTable += '<td>Shutdown Start Time</td>';
			createConfTable += '<td>Shutdown Needed (MW)</td>';
			createConfTable += '<td>Duration (Minutes)</td>';
			createConfTable += '<td>Requested At</td>';
			createConfTable += '<td>Response</td>';
			createConfTable += '<td>Responded On</td>';
			//createConfTable += '<td>Plan</td>';
	createConfTable += '</tr>';
	for(i=0;i<(adata.data).length;i++)
	{
		var resp = "";
		if(parseInt(adata.data[i].responseTypeApprovalStatusID) == "4")
			resp = "Approved";
		else if(parseInt(adata.data[i].responseTypeApprovalStatusID) == "5")
			resp = "Rejected";
			
		var medi = "IVR";
		if(parseInt(adata.data[i].requestMediumID) == 4)
			medi = "WEB";
			
		createConfTable += '<tr>';
			createConfTable += '<td style="text-align:right">'+adata.data[i].outageID+'</td>';
			createConfTable += '<td>'+convertDateFormat(adata.data[i].outageDateTime,"-"," ")+'</td>';
			createConfTable += '<td style="text-align:right">'+adata.data[i].shutdownNeeded+'</td>';
			createConfTable += '<td style="text-align:right">'+adata.data[i].outageTentativeDurationMins+'</td>';
			createConfTable += '<td>'+convertDateFormat(adata.data[i].requestTime,"-"," ")+'</td>';
			createConfTable += '<td>'+resp+'</td>';
			createConfTable += '<td>'+convertDateFormat(adata.data[i].responseTime,"-"," ")+'</td>';
			//createConfTable += '<td>'+adata.data[i].FEEDER_NAME+'</td>';
		createConfTable += '</tr>';
	}
	createConfTable += '</table>';
	document.getElementById("body_main_pane_view").innerHTML = createConfTable;
}