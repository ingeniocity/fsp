var parser_page = "parser";
var MYURL = document.URL;

function isNumber(evt,mlen,obj)
{
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
	if(parseInt(obj.value) >=0 && parseInt(obj.value) <= mlen)
		obj.title = obj.value;
    return true;
}

function validateEmail(email) { 
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function menuSelect(id)
{
	for(i=1;i<7;i++)
	{
		var sid = "M"+i;
		document.getElementById(sid).style.fontWeight = "normal";
		if(sid == id)
			document.getElementById(sid).style.fontWeight = "bold";
	}
}

function setNulltoEmpty(val)
{
	if(val == null)
		return "";
	return val;
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
/*function log_me_out()
{
	document.getElementById("body_main_pane").innerHTML = "<center>Please Wait... <img src='img/ajax_loader.gif'></center>";
	var timeVal = 0;
	
	document.location = "../index.php";
}
*/
function log_me_out()
{
	var timeVal = 0;
	var JSONObject = new Object;
	JSONObject.jcase = "time_out_pool";
	JSONObject.container = "";
	JSONObject.username = userna;
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	JSONObject.query = "UPDATE "+JSONObject.tablename+" SET time_out="+timeVal+" WHERE email='"+JSONObject.username+"' OR username='"+JSONObject.username+"'";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
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
		if(abcd1)
			offpeakval=atp_2+"-"+btp_1;
		else
			offpeakval=atp_2-"24";

		
	}else
	{
		offpeakval="0-"+atp_1;
		
		if(parseInt(btp_1) && abcd1)
			offpeakval +=","+atp_2+"-"+btp_1;
		else{
			if(atp_2 !=24)
				offpeakval +=","+atp_2+"-24";
		}
	}

	if((parseInt(btp_2) != 24) && abcd1 )
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

/*$objJSON = new JsonClass();
		$query = "SELECT * FROM tbl_11kv_user WHERE (username='".$user."' OR email='".$user."')  AND password=md5('".$pass."')"; //AND company_id='6'
		$mysqlData = $objJSON->executeSQL(SQL_DB, "tbl_11kv_user", $query, "SELECT");
		
		if($mysqlData)
		{
		
			$lstat = "S";
			$qryTimeOut = "UPDATE tbl_11kv_user SET time_out='1800' WHERE email='".$user."' OR username='".$user."'";
			$mysqlTimeData = $objJSON->executeSQL(SQL_DB, "tbl_11kv_user", $qryTimeOut, "UPDATE");
			
		}*/
		
function getCompName(cid)
{
	switch(parseInt(cid))
	{
		case 1:
		return "BESCOM";
		break;

		case 2:
		return "GESCOM";
		break;

		case 3:
		return "HESCOM";
		break;

		case 4:
		return "MESCOM";
		break;

		case 5:
		return "CESC";
		break;
		
		case 6:
		return "SLDC";
		break;
		
		default:
	}
}


function userProfile()
{
	document.getElementById("PageStat").value = 5;
	var JSONObject = new Object;
	JSONObject.jcase = "userProf";
	JSONObject.container = "body_main_pane";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	JSONObject.query = "SELECT * FROM "+JSONObject.tablename+" WHERE email='"+userna+"' OR username='"+userna+"'";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("body_main_pane").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

function body_main_pane_uview()
{
	document.getElementById("body_main_pane_uview").innerHTML = "<center>Loading Users, Please Wait...&nbsp;&nbsp;&nbsp;<img src='img/ajax_loader.gif'></center>";
	var JSONObject = new Object;
	JSONObject.jcase = "body_main_pane_uview";
	JSONObject.container = "body_main_pane_uview";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	JSONObject.query = "SELECT * FROM "+JSONObject.tablename+" WHERE company_id="+cmp_id;
	JSONstring = JSON.stringify(JSONObject);
	runAjax(parser_page,JSONstring);
}

function DelUserDataEdit(uid)
{
	var x =confirm("Are you sure you want to delete!");
	if(x)
	{
		document.getElementById("body_main_pane_uview").innerHTML = "<center>Loading Users, Please Wait...&nbsp;&nbsp;&nbsp;<img src='img/ajax_loader.gif'></center>";
		var JSONObject = new Object;
		JSONObject.jcase = "uDelete";
		JSONObject.container = "body_main_pane_uview";
		JSONObject.database = db_name;
		JSONObject.tablename = "tbl_11kv_user";
		JSONObject.query = "DELETE FROM "+JSONObject.tablename+" WHERE user_id="+uid;
		JSONstring = JSON.stringify(JSONObject);
		runAjax(parser_page,JSONstring);
	}
}

var usrObjectEdit = null;

function view_body_main_pane_uview(obj)
{
	var createConfTable = "";
	createConfTable += '<h3 class="heading">Existing Users</h3>';
	createConfTable += '<div class="row-fluid">';
	createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
	createConfTable += '<tr>';
		createConfTable += '<td>Username</td>';
		createConfTable += '<td>First Name</td>';
		createConfTable += '<td>Last Name</td>';
		//createConfTable += '<td>Company</td>';
		createConfTable += '<td>Type</td>';
		createConfTable += '<td>Designation</td>';
		createConfTable += '<td>Department</td>';
		createConfTable += '<td>Mobile Number</td>';
		createConfTable += '<td>Email ID</td>';
		createConfTable += '<td>Action</td>';
	createConfTable += '</tr>';
	var count = (obj.data).length;
	usrObjectEdit = obj;
	for(var i=0; i<count; i++)
	{
		createConfTable += '<tr>';
			createConfTable += '<td>'+obj.data[i].username+'</td>';
			createConfTable += '<td>'+obj.data[i].first_name+'</td>';
			createConfTable += '<td>'+obj.data[i].last_name+'</td>';
			//createConfTable += '<td>'+getCompName(obj.data[i].company_id)+'</td>';
			createConfTable += '<td>'+getURole(obj.data[i].utype)+'</td>';
			createConfTable += '<td>'+obj.data[i].designation+'</td>';
			createConfTable += '<td>'+obj.data[i].department+'</td>';
			createConfTable += '<td>'+obj.data[i].mobile+'</td>';
			createConfTable += '<td>'+obj.data[i].email+'</td>';
			
			if(userInfo.data[0].username == obj.data[i].first_name ) //AND (userInfo.data[0].mobile ==obj.data[i].mobile) //obj.data[i].utype == "1")
				createConfTable += '<td><a data-toggle="modal" data-backdrop="static" href="#myModal3" class="btn" onclick="fillUserDataEdit('+i+')">Edit</a>';
			else
				createConfTable += '<td><a data-toggle="modal" data-backdrop="static" href="#myModal3" class="btn" onclick="fillUserDataEdit('+i+')">Edit</a> <a data-toggle="modal" data-backdrop="static" class="btn" onclick="DelUserDataEdit('+obj.data[i].user_id+')">Delete</a>';
				createConfTable += '<a data-toggle="modal" data-backdrop="static" href="#myModalcp" class="btn" onclick="changePassword('+i+')">Change Password</a></td>';
		createConfTable += '</tr>';
	}
	createConfTable += '</table>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal hide fade" id="myModalcp">';
	createConfTable += '<div class="modal-header">';
		createConfTable += '<button class="close" data-dismiss="modal">×</button>';
		createConfTable += '<h3>Change Password</h3>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-body">';
	
	createConfTable += '<table width="100%">';
		
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>Old Password</td>';
			createConfTable += '<td><input class="UsrtextBox" type="password" name="o_password" id="o_password" value=""></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>New Password</td>';
			createConfTable += '<td class="usrFont"><input class="UsrtextBox" type="password" name="n_password" id="n_password" value=""></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>Confirm Password</td>';
			createConfTable += '<td class="usrFont"><input class="UsrtextBox" type="password" name="cpassword" id="c_password" value=""></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><input type="hidden" name="c_uid" value="" id="c_uid"></td><input type="hidden" name="c_upass" value="" id="c_upass"></td>';
			createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';
	createConfTable += '</table>';
		
	createConfTable += '</div>';
	createConfTable += '<div class="modal-footer">';
		createConfTable += '<a href="javascript:updatePassword();" class="btn"="modal">Submit</a>';
		createConfTable += '<a href="#" class="btn" data-dismiss="modal">Close</a>';
	createConfTable += '<div id="loadModEcp">';
	createConfTable += '</div>';
	createConfTable += '</div>';
	createConfTable += '</div>';
	
	document.getElementById("body_main_pane_uview").innerHTML = createConfTable;
}

function changePassword(idx)
{
	
	//document.getElementById("n_password").value = usrObjectEdit.data[idx].user_id;
	document.getElementById("c_uid").value = usrObjectEdit.data[idx].user_id;
	document.getElementById("c_upass").value = usrObjectEdit.data[idx].password;
}

function getURole(typ)
{
	switch(parseInt(typ))
	{
		case 1:
		return "Administrator";
		break;
		
		case 2:
		return "Normal";
		break;
	}
}

function fillUserDataEdit(idx)
{
	var comp_val = '<select id="e_company"><option value="'+usrObjectEdit.data[idx].company_id+'">'+getCompName(usrObjectEdit.data[idx].company_id)+'</option><option value="1">BESCOM</option><option value="2">GESCOM</option><option  value="3">HESCOM</option><option value="4">MESCOM</option><option value="5">CESC</option><option value="6">SLDC</option></select>';
	var tmutypval = getURole(usrObjectEdit.data[idx].utype);
	//alert (tmutypval);
	
	var utype_val = '<select id="e_uType"><option value="'+usrObjectEdit.data[idx].utype+'">'+getURole(usrObjectEdit.data[idx].utype)+'</option><option value="1">Administrator</option><option value="2">Normal</option></select>';
	if(tmutypval=='Administrator')
	{
	utype_val = '<select id="e_uType"><option value="'+usrObjectEdit.data[idx].utype+'">'+getURole(usrObjectEdit.data[idx].utype)+'</option><option value="2">Normal</option></select>';
	}
	else
	{
	utype_val = '<select id="e_uType"><option value="'+usrObjectEdit.data[idx].utype+'">'+getURole(usrObjectEdit.data[idx].utype)+'</option><option value="1">Administrator</option></select>';
	}

	document.getElementById("e_uid").value = usrObjectEdit.data[idx].user_id;
	document.getElementById("e_fstName").value = usrObjectEdit.data[idx].first_name;
	document.getElementById("e_lstName").value = usrObjectEdit.data[idx].last_name;
	document.getElementById("company_edit").innerHTML = comp_val;
	document.getElementById("e_designation").value = usrObjectEdit.data[idx].designation;
	document.getElementById("e_department").value = usrObjectEdit.data[idx].department;
	document.getElementById("e_mobile").value = usrObjectEdit.data[idx].mobile;
	document.getElementById("e_email").value = usrObjectEdit.data[idx].email;
	document.getElementById("utype_edit").innerHTML = utype_val;
	//document.getElementById("e_password").value = usrObjectEdit.data[idx].password;
}

function iWantToresetMyself()
{
	document.getElementById("resetAdd").innerHTML = createConfTable1;
}

var userInfo = null;
var createConfTable1 = "";

function userProfileData(user)
{
	userInfo = user;
	//document.getElementById("body_main_pane").innerHTML = "Loading....";
	createConfTable1 += '<table width="100%">';
		createConfTable1 += '<tr>';
			createConfTable1 += '<td><font style="color:#ff0000;">*</font>First Name</td>';
			createConfTable1 += '<td><input class="UsrtextBox" type="text" name="cr_fstName" id="cr_fstName" value=""></td>';
		createConfTable1 += '</tr>';
		
		createConfTable1 += '<tr>';
			createConfTable1 += '<td><font style="color:#ff0000;">*</font>Last Name</td>';
			createConfTable1 += '<td><input class="UsrtextBox" type="text" name="vr_lstName" id="cr_lstName" value=""></td>';
		createConfTable1 += '</tr>';
		createConfTable1 += '<tr>';
			createConfTable1 += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Designation</td>';
			createConfTable1 += '<td><input class="UsrtextBox" type="text" name="designation" id="designation" value=""></td>';
		createConfTable1 += '</tr>';
		createConfTable1 += '<tr>';
			createConfTable1 += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Department</td>';
			createConfTable1 += '<td><input class="UsrtextBox" type="text" name="department" id="department" value=""></td>';
		createConfTable1 += '</tr>';
		createConfTable1 += '<tr style="display:none;">';
			createConfTable1 += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Company</td>';
			createConfTable1 += '<td><select id="company"><option value="">Select Company</option><option value="1">BESCOM</option><option value="2">GESCOM</option><option  value="3">HESCOM</option><option value="4">MESCOM</option><option value="5">CESC</option><option value="6">SLDC</option></select></td>';
		createConfTable1 += '</tr>';
		
		createConfTable1 += '<tr>';
			createConfTable1 += '<td><font style="color:#ff0000;">*</font>Mobile Number</td>';
			createConfTable1 += '<td><input class="UsrtextBox" type="text" name="mobile" id="cr_mobile" value="" onkeypress="return isNumber(event,0,this)"></td>';
		createConfTable1 += '</tr>';
		createConfTable1 += '<tr>';
			createConfTable1 += '<td><font style="color:#ff0000;">*</font>Email</td>';
			createConfTable1 += '<td class="usrFont"><input class="UsrtextBox" type="text" name="cr_email" id="cr_email" value=""></td>';
		createConfTable1 += '</tr>';
		createConfTable1 += '<tr>';
			createConfTable1 += '<td><font style="color:#ff0000;">*</font>User Type</td>';
			createConfTable1 += '<td><select id="uType"><option value="0">Select User Role</option><option value="1">Administrator</option><option value="2">Normal</option></select></td>';
		createConfTable1 += '</tr>';
		createConfTable1 += '<tr>';
			createConfTable1 += '<td><font style="color:#ff0000;">*</font>Username</td>';
			createConfTable1 += '<td class="usrFont"><input class="UsrtextBox" type="text" name="username" id="user_name" value=""></td>';
		createConfTable1 += '</tr>';
		createConfTable1 += '<tr>';
			createConfTable1 += '<td><font style="color:#ff0000;">*</font>Password</td>';
			createConfTable1 += '<td class="usrFont"><input class="UsrtextBox" type="password" name="password" id="password" value=""></td>';
		createConfTable1 += '</tr>';
		createConfTable1 += '<tr>';
			createConfTable1 += '<td><font style="color:#ff0000;">*</font>Confirm Password</td>';
			createConfTable1 += '<td class="usrFont"><input class="UsrtextBox" type="password" name="cpassword" id="cpassword" value=""></td>';
		createConfTable1 += '</tr>';
		createConfTable1 += '<tr>';
			createConfTable1 += '<td>&nbsp;</td>';
			createConfTable1 += '<td>&nbsp;</td>';
		createConfTable1 += '</tr>';
	createConfTable1 += '</table>';

	var createConfTable = '';
	createConfTable += '<h3 class="heading">User Profile</h3>';
	if(user.data[0].utype=='1') 
	{
	createConfTable += '<div class="heading fleft" ><a data-toggle="modal" data-backdrop="static" href="#myModal2" onclick="iWantToresetMyself() "class="btn">Add User</a></div>';
		
	}
	if(user.data[0].utype!='1')
	{
createConfTable += '<div class="row-fluid">';
	createConfTable += '<table width="80%">';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>First Name</td>';
			createConfTable += '&nbsp;&nbsp;<td><input class="UsrtextBox" type="text" name="fstName" id="fstName" value="'+user.data[0].first_name+'"></td>';
		//createConfTable += '</tr>';
		//createConfTable += '<tr>';
/*			createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Middle Name</td>';
			createConfTable += '&nbsp;&nbsp;<td><input class="UsrtextBox" type="text" name="midName" id="midName" value=""></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
*/
			createConfTable += '<td><font style="color:#ff0000;">*</font>Last Name</td>';
			createConfTable += '&nbsp;&nbsp;<td><input class="UsrtextBox" type="text" name="lstName" id="lstName" value="'+user.data[0].last_name+'"></td>';
		//createConfTable += '</tr>';
		//createConfTable += '<tr>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Designation</td>';
			createConfTable += '&nbsp;&nbsp;<td><input class="UsrtextBox" type="text" name="desig" id="desig" value="'+user.data[0].designation+'"></td>';
			createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Department</td>';
			createConfTable += '&nbsp;&nbsp;<td><input class="UsrtextBox" type="text" name="dept" id="dept" value="'+user.data[0].department+'"></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>Mobile Number</td>';
			createConfTable += '&nbsp;&nbsp;<td><input class="UsrtextBox" type="text" name="mbile" id="mobile" value="'+user.data[0].mobile+'"></td>';
		//createConfTable += '</tr>';
		//createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>Email ID</td>';
			createConfTable += '&nbsp;&nbsp;<td class="usrFont"><input class="UsrtextBox" type="text" name="email" id="email" value="'+user.data[0].email+'"></td>';
		createConfTable += '</tr>';
		
		createConfTable += '<tr>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
		//createConfTable += '</tr>';
		createConfTable += '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
		//createConfTable += '<tr>';
			createConfTable += '<td><input class="btn btn-inverse" type="button" id="change_pass" onClick="chngPass()" value="Change Password">';
			createConfTable += '&nbsp;&nbsp;<input class="btn btn-inverse" type="button" name="usrProfile" value="Save" onClick="userSet()"></td>';
			createConfTable += '<div id="hddConf" class="row-fluid"></div>';
		//createConfTable += '</tr>';
		//createConfTable += '<tr>';
		
			
		createConfTable += '</tr>';
		}
		if(user.data[0].utype=='1') 
	createConfTable += '</table>';

	createConfTable += '</div>';
	if(user.data[0].utype=='1')
	{
		createConfTable += '<div class="modal hide fade" id="myModal2">';
		createConfTable += '<div class="modal-header">';
			createConfTable += '<button class="close" data-dismiss="modal">×</button>';
			createConfTable += '<h3>Add a new User</h3>';
		createConfTable += '</div>';
		createConfTable += '<div class="modal-body" id="resetAdd">';
		
		createConfTable += createConfTable1;
	
		createConfTable += '</div>';
		createConfTable += '<div class="modal-footer">';
			createConfTable += '<a href="javascript:userCreate();" class="btn"="modal">Submit</a>';
			createConfTable += '<a href="#" class="btn" data-dismiss="modal">Close</a>';
		createConfTable += '<div id="loadMod">';
		createConfTable += '</div>';
		createConfTable += '</div>';
		createConfTable += '</div>';

		createConfTable += '<br>';
	}

	createConfTable += '<div id="body_main_pane_uview">';
	createConfTable += '</div>';

	if(user.data[0].utype=='1')
	{
		createConfTable += '<div class="modal hide fade" id="myModal3">';
		createConfTable += '<div class="modal-header">';
			createConfTable += '<button class="close" data-dismiss="modal">×</button>';
			createConfTable += '<h3>Edit User</h3>';
		createConfTable += '</div>';
		createConfTable += '<div class="modal-body">';
		
		createConfTable += '<table width="100%">';
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;">*</font>First Name</td>';
				createConfTable += '<td><input class="UsrtextBox" type="text" name="cr_fstName" id="e_fstName" value=""></td>';
			createConfTable += '</tr>';
			
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;">*</font>Last Name</td>';
				createConfTable += '<td><input class="UsrtextBox" type="text" name="vr_lstName" id="e_lstName" value=""></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr style="display:none;">';
				createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Company</td>';
				createConfTable += '<td id="company_edit"></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Designation</td>';
				createConfTable += '<td><input class="UsrtextBox" type="text" name="designation" id="e_designation" value=""></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Department</td>';
				createConfTable += '<td><input class="UsrtextBox" type="text" name="department" id="e_department" value=""></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;">*</font>Mobile Number</td>';
				createConfTable += '<td><input class="UsrtextBox" type="text" name="mobile" id="e_mobile" value="" onkeypress="return isNumber(event,0,this)"></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;">*</font>User Type</td>';
				createConfTable += '<td id="utype_edit"></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;">*</font>Email</td>';
				createConfTable += '<td class="usrFont"><input class="UsrtextBox" type="text" name="e_email" id="e_email" value=""></td>';
			createConfTable += '</tr>';
			/*createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;">*</font>Password</td>';
				createConfTable += '<td class="usrFont"><input class="UsrtextBox" type="password" name="password" id="e_password" value=""></td>';
			createConfTable += '</tr>';*/
			createConfTable += '<tr>';
				createConfTable += '<td><input type="hidden" name="uid" id="e_uid"></td>';
				createConfTable += '<td>&nbsp;</td>';
			createConfTable += '</tr>';
		createConfTable += '</table>';
			
		createConfTable += '</div>';
		createConfTable += '<div class="modal-footer">';
			createConfTable += '<a href="javascript:updateUser();" class="btn"="modal">Submit</a>';
			createConfTable += '<a href="#" class="btn" data-dismiss="modal">Close</a>';
		createConfTable += '<div id="loadModE">';
		createConfTable += '</div>';
		createConfTable += '</div>';
		createConfTable += '</div>';
	}
	
	document.getElementById("body_main_pane").innerHTML = createConfTable;
	if(user.data[0].utype=='1')
		body_main_pane_uview();
}

//PS
function updatePassword(){
	
	var opassword = document.getElementById("o_password").value;
	var npassword = document.getElementById("n_password").value;
	var cpassword = document.getElementById("c_password").value;
	opassword1 = CryptoJS.MD5(opassword);
	var c_upass = document.getElementById("c_upass").value;
	//alert(opassword);
	var uid = document.getElementById("c_uid").value;
	
	if(!opassword)
	{
		alert("Old Password can not be left blank!");
		return;
	}
	if(c_upass!=opassword1)
	{
		alert("Old Password is not correct!");
		return;
	}
	if(!npassword)
	{
		alert("New Password can not be left blank!");
		return;
	}
	
	if(!cpassword)
	{
		alert("Confirm Password can not be left blank!");
		return;
	}
	if(npassword!=cpassword)
	{
		alert("New password and confirm password should be same!");
		return;
	}
	
	document.getElementById("loadModEcp").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";

	var JSONObject = new Object;
	JSONObject.jcase = "passEdtData";
	JSONObject.container = "";
	JSONObject.oldPass = opassword;
	JSONObject.userId = uid;
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	
		JSONObject.query = "UPDATE "+JSONObject.tablename+" SET  password=md5('"+npassword+"') where user_id="+uid +" and password=md5('"+opassword+"') ";
		
		//document.getElementById("loadModEcp").innerHTML = "UPDATE "+JSONObject.tablename+" SET  password=md5('"+npassword+"') where user_id="+uid +" and password=md5('"+opassword+"') ";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
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
    createExit += '<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input class="btn btn-inverse pull-right" type="button" name="usrProfile" value="Close" onClick="closeExit()">&nbsp;<input class="btn btn-inverse" type="button" name="usrPass" value="Save" onClick="setUsrPass()"></td>';
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
	var lastName = document.getElementById("lstName").value;
	var desig = document.getElementById("desig").value;
	var dept = document.getElementById("dept").value;
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
	JSONObject.query = "UPDATE "+JSONObject.tablename+" SET first_name='"+firstName+"',last_name='"+lastName+"',designation='"+desig+"',department='"+dept+"',mobile='"+mobile+"',email='"+email+"' WHERE username='"+userInfo.data[0].username+"'";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);

}

//PS create user
function userCreate()
{
	var firstName = document.getElementById("cr_fstName").value;
	//var midName = document.getElementById("midName").value;
	var lastName = document.getElementById("cr_lstName").value;
	var desig = document.getElementById("designation").value;
	var uType = document.getElementById("uType").value;
	var mobile = document.getElementById("cr_mobile").value;
	var email = document.getElementById("cr_email").value;
	var username = document.getElementById("user_name").value;
	var password = document.getElementById("password").value;
	var cpassword = document.getElementById("cpassword").value;
	var company = document.getElementById("company").value;
	var department = document.getElementById("department").value;
	
	if(!firstName)
	{
		alert("Firstname can not be left blank!");
		return;
	}
	if(!lastName)
	{
		alert("Lastname can not be left blank!");
		return;
	}
	/*
	if(!company)
	{
		alert("Please select company!");
		return;
	}
	*/
	if(!mobile)
	{
		alert("Please provide mobile no!");
		return;
	}
	if(!email)
	{
		alert("Please provide a valid email id!");
		return;
	}
	
	if(!username)
	{
		alert("Username can not be left blank!!");
		return;
	}
	if(!password)
	{
		alert("Password cant not be left blank!!");
		return;
	}
	if(password!=cpassword)
	{
		alert("Password and confirm password should be same!!");
		return;
	}
	if(!uType)
	{
		alert("Invalid User Type!");
		return;
	}
	
	document.getElementById("loadMod").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";

	var JSONObject = new Object;
	JSONObject.jcase = "userInsData";
	JSONObject.container = "body_main_pane";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	JSONObject.query = "INSERT INTO "+JSONObject.tablename+" SET first_name='"+firstName+"',last_name='"+lastName+"',designation='"+desig+"',mobile='"+mobile+"',email='"+email+"', username='"+username+"', utype='"+uType+"', password=md5('"+ password+"'), department='"+ department+"', status='1', parent_id='1', time_out='0', company_id='"+cmp_id+"'";
	JSONObject.query1 = "SELECT * from "+JSONObject.tablename+" where username='"+username+"' and company_id='"+cmp_id+"'";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
	//alert("hi");
}

function updateUser()
{
	var firstName = document.getElementById("e_fstName").value;
	//var midName = document.getElementById("midName").value;
	var lastName = document.getElementById("e_lstName").value;
	var desig = document.getElementById("e_designation").value;
	//var officPhn = document.getElementById("offPhn").value;
	var mobile = document.getElementById("e_mobile").value;
	var email = document.getElementById("e_email").value;
	var password = null; //  document.getElementById("e_password").value;
	var company = document.getElementById("e_company").value;
	var department = document.getElementById("e_department").value;
	var utype = document.getElementById("e_uType").value;
	var uid = document.getElementById("e_uid").value;
	
	if(!firstName)
	{
		alert("Firstname can not be left blank!");
		return;
	}
	if(!lastName)
	{
		alert("Lastname can not be left blank!");
		return;
	}
	/*
	if(!company)
	{
		alert("Please select company!");
		return;

	}
	*/
	if(!mobile)
	{
		alert("Please provide mobile no!");
		return;
	}
	if(!email)
	{
		alert("Please provide a valid email id!");
		return;
	}
	if(!utype)
	{
		alert("Invalid User Type!");
		return;
	}
	
	if(!username)
	{
		alert("Username can not be left blank!!");
		return;
	}
	/*
	if(!password)
	{
		alert("Password cant not be left blank!!");
		return;
	}
	*/
	
	document.getElementById("loadModE").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";

	var JSONObject = new Object;
	JSONObject.jcase = "userEdtData";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	if(!password)
		JSONObject.query = "UPDATE "+JSONObject.tablename+" SET first_name='"+firstName+"',last_name='"+lastName+"',designation='"+desig+"',mobile='"+mobile+"',email='"+email+"', department='"+ department+"', utype='"+ utype+"', status='1', parent_id='1', time_out='0', company_id='"+cmp_id+"' where user_id="+uid;
	else
		JSONObject.query = "UPDATE "+JSONObject.tablename+" SET first_name='"+firstName+"',last_name='"+lastName+"',designation='"+desig+"',mobile='"+mobile+"',email='"+email+"', password=md5('"+password+"'), utype='"+ utype+"', department='"+ department+"', status='1', parent_id='1', time_out='0', company_id='"+cmp_id+"' where user_id="+uid;
	JSONstring = JSON.stringify(JSONObject);
	runAjax(parser_page,JSONstring);
}

//PS
/*function updatePassword(){
	
	var opassword = document.getElementById("o_password").value;
	var npassword = document.getElementById("n_password").value;
	var cpassword = document.getElementById("c_password").value;
	
	var uid = document.getElementById("c_uid").value;
	
	if(!opassword)
	{
		alert("Old Password can not be left blank!");
		return;
	}
	if(!npassword)
	{
		alert("New Password can not be left blank!");
		return;
	}
	
	if(!cpassword)
	{
		alert("Confirm Password can not be left blank!");
		return;
	}
	if(npassword!=cpassword)
	{
		alert("New password and confirm password should be same!");
		return;
	}
	
	document.getElementById("loadModEcp").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";

	var JSONObject = new Object;
	JSONObject.jcase = "passEdtData";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	
		JSONObject.query = "UPDATE "+JSONObject.tablename+" SET  password=md5('"+npassword+"') where user_id="+uid +" and password=md5('"+opassword+"') ";
		//document.getElementById("loadModEcp").innerHTML = "UPDATE "+JSONObject.tablename+" SET  password=md5('"+npassword+"') where user_id="+uid +" and password=md5('"+opassword+"') ";
	JSONstring = JSON.stringify(JSONObject);
	runAjax(parser_page,JSONstring);
}*/

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
	JSONObject.query3 = "call sp_11kv_getGroupPriorityBandByCompany("+cmp_id+")";
	JSONstring = JSON.stringify(JSONObject);
	runAjax(parser_page,JSONstring);
}

var cont = null;
function grpDropData(content)
{
	cont = content;
	var feederCount = (content.data.Feeder).length;
	var zoneCount = (content.data.Zone).length;
	var priorityBandsCount = (content.data.Priority).length;
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
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td>';
				createConfTable += '<select name="priorityBandSearch" id="priorityBandSearch">';
					createConfTable += '<option value=null selected>Priority Band</option>';
					for(var pbc=0;pbc<priorityBandsCount;pbc++)
						createConfTable += '<option value="'+content.data.Priority[pbc].GroupBandID+'">'+(content.data.Priority[pbc].LowerRange ? content.data.Priority[pbc].LowerRange : "below")+'-'+(content.data.Priority[pbc].UpperRange ? content.data.Priority[pbc].UpperRange : "above")+'</option>'; 
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
	var pbid = document.getElementById("priorityBandSearch").value;
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
	JSONObject.query = "call sp_11kv_searchgroup1("+company_id+","+feeder+","+zone+","+pbid+","+peakP+","+offPeakP+","+grpName+")";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}
//PS
function searchCanelGrp(feeder)
{
	//var zoneObj = '';
	/*var zone = document.getElementById("zoneDrop").value;
	if(zone == "Select Zone")
	{*/
		zone = 0;
	//}
	/*var feeder = document.getElementById("feederDrop").value;
	if(feeder == 'Feeder Category')*/
		feeder = 0;
	/*for(var i=0; i<objData; i++)
	{
		if(document.getElementById("zoneParent").options[i].selected)
			zoneObj += document.getElementById("zoneParent").options[i].value+',';
	}
	if(zoneObj)
		zoneObj = zoneObj.substring(0,(zoneObj.length - 1));*/
	//var parentId = cont.data.UserInfo[0].parent_id;
	var peakP = document.getElementById("prio").value;
	var offPeakP = document.getElementById("offPrio").value;
	var grpName = document.getElementById("grpGrd").value;
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
	//JSONObject.query = "call sp_11kv_deleteGroup("+parseInt(obj)+")";
	JSONObject.query = "call sp_11kv_deleteGroup1("+parseInt(obj)+")";
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
	//JSONObject.query = "call sp_11kv_getgroupbyid("+parseInt(obj)+")";
	JSONObject.query = "call sp_11kv_getgroupbyid1("+parseInt(obj)+")";
	JSONObject.query3 = "call sp_11kv_getGroupPriorityBandByCompany("+cmp_id+")";
	//document.getElementById("body_main_pane").innerHTML = "sp_mis_feedercategory()&nbsp;sp_mis_get_geoObjectsOfClass(2,null,"+cmp_id+")&nbsp;sp_11kv_getgroupbyid("+parseInt(obj)+")";
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
	//var priorityCount = content.data.PRIORITIES.length;
	//console.log(content.data.DATA1);

	document.getElementById("body_main_pane").innerHTML = "";
	var createConfTable = '';
	/*
	createConfTable += '<table class="approvHead" style="height:8%;">';
		createConfTable += '<tr>';
			createConfTable += '<td style="float:left;">Group '+content.data.DATA1[0].GroupName+'</td>';
			createConfTable += '<td id="userProfErr"></td>';
		createConfTable += '</tr>';
	*/
	//createConfTable += '<h3 class="heading">Group '+content.data.DATA1[0].GroupName+'</h3>';
        createConfTable += '<h3 class="heading">Group '+content.data.DATA1.OUT1[0].GroupName+'';
	createConfTable += '<input type="button" name="submit" value="Update" onClick="updateGrp('+data2Count+')" class="btn btn-inverse pull-right">';
	//createConfTable += '&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" name="cancel" value="Cancel" onClick="searchCanelGrp('+content.data.DATA1[0].GroupID+')" class="btn btn-inverse pull-right">';
	createConfTable += '&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" name="cancel" value="Cancel" onClick="grpMaintenances()" class="btn btn-inverse pull-right">';
	createConfTable += '</h3>';
	
	createConfTable += '<div class="row-fluid">';
	createConfTable += '</table>';
	createConfTable += '<table class="approvtable1" width="80%">';
		createConfTable += '<tr id="stationGrp">';
		createConfTable += '<td  class="confFont">Group Name</td>';
		createConfTable += '&nbsp;&nbsp;&nbsp;&nbsp<td  class="confFont"><input class="UsrtextBox" type="text" name="grp" id="grpGrd" value="'+content.data.DATA1.OUT1[0].GroupName+'" placeholder="Group Name"></td>';
		createConfTable += '<td >&nbsp;</td>';
		createConfTable += '<td >&nbsp;</td>';
		createConfTable += '<td >&nbsp;</td>';
		//createConfTable += '<td align="center"><input class="btn btn-inverse" type="submit" name="submit" value="Save" onClick="updateGrp('+data2Count+')"></td>';
		//createConfTable += '<td align="center"><input class="btn btn-inverse" type="submit" name="cancel" value="Cancel" onClick="viewGrpInfo('+content.data.DATA1[0].GroupID+')"></td>';
		createConfTable += '</tr>';
		
		createConfTable += '<tr><td colspan="5">&nbsp;</td></tr>';
		createConfTable += '</table>';
		createConfTable += '<table class="approvtable1" width="80%">';
		createConfTable += '<tr>';
		createConfTable += '<td>Priority Band</td>';
		//createConfTable += '<td >&nbsp;</td>';
		createConfTable += '<td>Peak Priority</td>';
		createConfTable += '<td>Off Peak Priority</td>';
		createConfTable += '</tr>';
		for(var pb=0;pb<content.data.DATA1.OUT3.length;pb++)
		{
			createConfTable += '<tr name="priorityBandUpdateRow">';
			/*if(getConfTableG && getConfTableG1)
				createConfTable += getConfTableG+getConfTableG1;
			createConfTable += '</td>';
			document.getElementById("stationGrd").innerHTML = createConfTable;
			var createConfTable1 = '';*/
				createConfTable += '<td>'+(content.data.DATA1.OUT3[pb].LowerRange ? content.data.DATA1.OUT3[pb].LowerRange : "below")+'-'+(content.data.DATA1.OUT3[pb].UpperRange ? content.data.DATA1.OUT3[pb].UpperRange : "above")+'</td>';
				//createConfTable += '&nbsp;&nbsp;&nbsp;&nbsp<td  class="confFont" style="">';
				createConfTable += '<td  class="confFont" style="">';
					createConfTable += '<select name="updatePriority_'+pb+'" id="updatePriority_'+pb+'" class="selectGrp" style="">';
						createConfTable += '<option value=0 >Priority</option>';
						createConfTable += '<option value='+parseInt(content.data.DATA1.OUT3[pb].PeakPriority)+' selected>'+parseInt(content.data.DATA1.OUT3[pb].PeakPriority)+'</option>';
						for(var i=1;i<=10;i++)
						{
							if(i != parseInt(content.data.DATA1.OUT3[pb].PeakPriority))
								createConfTable += '<option value='+i+'>'+i+'</option>';
						}
					createConfTable += '</select>';
				createConfTable += '</td>';
				//createConfTable += '<td >&nbsp;</td>';
				//createConfTable += '<td align="left" class="confFont">Off Priority</td>';
				
				createConfTable += '<td  class="confFont">';
					//createConfTable += '&nbsp;&nbsp;&nbsp;&nbsp;<select name="updateOffPriority_'+pb+'" id="updateOffPriority_'+pb+'" class="selectGrp" style="">';
					createConfTable += '<select name="updateOffPriority_'+pb+'" id="updateOffPriority_'+pb+'" class="selectGrp" style="">';
						createConfTable += '<option value=0 >Off Peak Priority</option>';
						createConfTable += '<option value='+parseInt(content.data.DATA1.OUT3[pb].OffPeakPriority)+' selected>'+parseInt(content.data.DATA1.OUT3[pb].OffPeakPriority)+'</option>';
						for(var j=1;j<=10;j++)
						{
							if(j != parseInt(content.data.DATA1.OUT3[pb].OffPeakPriority))
								createConfTable += '<option value='+j+'>'+j+'</option>';
						}
					createConfTable += '</select>';
				createConfTable += '</td>';
			createConfTable += '</tr>';
		}
		createConfTable += '<tr><td>&nbsp;</td></tr>';
		createConfTable += '</table>';	
		createConfTable += '<table class="approvtable1" width="80%">';
		createConfTable += '<tr>';
			createConfTable += '<td  class="confFont" style="">Category</td>';
			createConfTable += '&nbsp;&nbsp;&nbsp;&nbsp<td  class="confFont">';
				//createConfTable += '<select name="zoneDrop" id="zoneDrop" class="selectGrp" onChange="getZone()">';
				createConfTable += '<select name="cat" id="cat" class="selectGrp" style="">';
					createConfTable += '<option value="selectCat" >Select Category</option>';
					for(var i=0; i<FCount; i++)
					{
						if(content.data.DATA1.OUT1[0].FEEDER_CATEGORY == content.data.Feeder[i].CategoryName)
							createConfTable += '<option value="'+content.data.Feeder[i].CategoryID+'" selected>'+content.data.Feeder[i].CategoryName+'</option>';
						else
							createConfTable += '<option value="'+content.data.Feeder[i].CategoryID+'">'+content.data.Feeder[i].CategoryName+'</option>';
					}
						//createConfTable += '<option value='+i+'>'+i+'</option>';
				createConfTable += '</select>';
			createConfTable += '</td>';
	//	createConfTable += '</tr>';
		//createConfTable += '<tr>';
		createConfTable += '<td >&nbsp;</td>';
			createConfTable += '<td  align="left" class="confFont" style="">Select Zone</td>';
			//createConfTable += '&nbsp<td   class="confFont">';
				//createConfTable += '<select name="zoneDrop" id="zoneDrop" class="selectGrp" onChange="getZone()">';
				createConfTable += '&nbsp;&nbsp;&nbsp;<td><select name="zoneG" id="zoneG" class="selectGrp" style="" onChange="chooseStationGRP()">';
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
			createConfTable += '<td  class="confFont">Stations</td>';
			createConfTable += '<td colspan="4"  class="confFont" ><div id="Restation">';
			createConfTable += '<select name="stationG" id="stationG" class="selectGrp" style="width:30%;height:60px;" multiple>';
				//createConfTable += '<option value="select" selected>Select Station</option>';
				/*for(var j=0; j<count10; j++)
					createConfTable += '<option value="'+content.data[j].GeoID+'">'+content.data[j].GeoName+'</option>';
					createConfTable += '<option value='+j+'>'+j+'</option>';*/
			createConfTable += '</select></div>';
			//createConfTable += '<span style="padding-left:15%;font-size:115%;" id="go" title="Go" onClick="getGrp('+count+')"><span class="printGo">Go</span></span>';
			//createConfTable += '<span style="padding-left:15%;font-size:115%;" id="go" title="Go" onClick="getGrp()"><span class="printGo">Go</span></span>';
			createConfTable += '</td>';
		createConfTable += '</tr>';

		
		
		createConfTable += '<tr id="stationPrior">';
			//createConfTable += '<td>&nbsp;</td>';
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
		//	createConfTable += '</td>&nbsp;&nbsp;</td>';
			createConfTable += '<td colspan="2" id="createFeeder" width="49%"></td>';
			createConfTable += '<td >&nbsp;</td>';
			createConfTable += '<td colspan="2" id="createFeeder1" width="49%">';
			var createConfTable11 = "";
				createConfTable11 += '<table class="table table-striped table-bordered dTableR dataTable">';
					createConfTable11 += '<tr>';
					createConfTable11 += '<tr><td colspan="5"><h2 align="center">Feeder Selected</h2></td></tr>';
						//createConfTable11 += '<td><input type="checkbox" name="feedChk" id="feedChk" onClick="setAndSendAll()"/></td>';
						createConfTable11 += '<td></td>';
						createConfTable11 += '<td>Station Name</td>';
						createConfTable11 += '<td>Feeder Name</td>';
						
						createConfTable11 += '<td>Group Name</td>';
						//createConfTable11 += '<td>Estimated Peak Load (MW)</td>';
					createConfTable11 += '</tr>';
					for(var i=0; i<data2Count; i++)
					{
						createConfTable11 += '<tr class="odd" id="noneMe_'+i+'">';
							createConfTable11 += '<td><input onclick="noneMeV(this, \''+i+'\');" type="checkbox" checked name='+content.data.DATA2[i].Class8GeoID+' id="feedChk_'+(i+1)+'"/></td>';
							createConfTable11 += '<td >'+content.data.DATA2[i].STATION+'</td>';
							createConfTable11 += '<td id='+content.data.DATA2[i].Class8GeoID+'>'+content.data.DATA2[i].FEEDER_NAME+'</td>';
							
							createConfTable11 += '<td id='+content.data.DATA2[i].FEEDER_SHUTDOWN_GROUP+i+'>'+setNulltoEmpty(content.data.DATA2[i].FEEDER_SHUTDOWN_GROUP)+'</td>';
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

function noneMeV(obj, oid)
{
	if(obj.checked == false)
	{
		document.getElementById("noneMe_"+oid).style.display = "none";
		document.getElementById("noneMe_"+oid).id = "";
		getConfTableG = document.getElementById("createFeeder1").innerHTML;
	}
}

function noneMeVT(obj, oid)
{
	if(obj.checked == false)
	{
		document.getElementById("noneMeT_"+oid).style.display = "none";
		document.getElementById("noneMeT_"+oid).id = "";
		getConfTableG = document.getElementById("createFeeder1").innerHTML;
	}
}

function updateGrp(count)
{
	var grpId = viewGrp.data.DATA1.OUT1[0].GroupID;
	var cat = document.getElementById("cat").value;
	var feeder = '';
	var priorityBandCount = document.getElementsByName("priorityBandUpdateRow").length;
	var priorityBands = '';
	var priorities = '';
	var offPriorities = '';
	for(var pb=0; pb<priorityBandCount;pb++)
	{
		priorityBands += (parseInt(pb+1))+',';
		
		if(document.getElementById("updatePriority_"+pb).value > 0)
			priorities += document.getElementById("updatePriority_"+pb).value + ',';
		else{
			alert("Priority cannot be left blank! Select a priority for every Band.");
			return;
		}

		if(document.getElementById("updateOffPriority_"+pb).value > 0)
			offPriorities += document.getElementById("updateOffPriority_"+pb).value + ',';
		else{
			alert("Off PeaK Priority cannot be left blank! Select an off peak priority for each band.");
			return;
		}
	}
	if(priorities)
		priorities = priorities.substring(0,(priorities.length - 1));
	if(offPriorities)
		offPriorities = offPriorities.substring(0,(offPriorities.length - 1));
	if(priorityBands)
		priorityBands = priorityBands.substring(0,(priorityBands.length - 1));

	//console.log(priorityBands);
	//console.log(priorites);
	//console.log(offPriorities);
	
	for(var i=1; i<=globalCountA; i++)
	{
		if(document.getElementById("feedChk_"+i).checked)
			feeder += document.getElementById("feedChk_"+i).name+",";
	}
	if(feeder)
		feeder = feeder.substring(0,(feeder.length - 1));
	//var priority = document.getElementById("prio").value;
	//var offPriority = document.getElementById("offPrio").value;
	var grp = document.getElementById("grpGrd").value;
	var company_id = cmp_id;
	//alert(cat+"_"+feeder+"_"+priority+"_"+offPriority+"_"+grp+"_"+company_id+"_"+grpId);
	var JSONObject = new Object;
	JSONObject.jcase = "grpUpdate";
	JSONObject.container = "body_main_pane";
	JSONObject.grpId = grpId;
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_groupfeedercategories";
	//JSONObject.query = "call sp_11kv_updateGroup('"+grp+"',"+priority+","+offPriority+","+company_id+","+user_id+",'"+feeder+"',"+grpId+")";
	JSONObject.query = "call sp_11kv_updateGroup1('"+grp+"','"+priorityBands+"','"+priorities+"','"+offPriorities+"',"+company_id+","+user_id+",'"+feeder+"',"+grpId+")";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
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
	JSONObject.query3 = "call sp_11kv_getGroupPriorityBandByCompany("+JSONObject.comp+")";
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
	var pbCount = content.data.SP3.length;
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
				createConfTable1 += '<table width="50%">';
				createConfTable1 += '<tr>';
				createConfTable1 += '<td>Group Name</td>';
				createConfTable1 += '<td><input type="text" name="grp" id="grpGrd" value="" placeholder="Group Name"></td>';
				createConfTable1 += '</tr>';
				createConfTable1 += '</table>';
				createConfTable1 += '<br />';
				createConfTable1 += '<table width="100%">';
				createConfTable1 += '<tr>';
				createConfTable1 += '<td>Priority Band</td>';
				createConfTable1 += '<td>Peak Priority</td>';
				createConfTable1 += '<td>Off Peak Priority</td>';
				createConfTable1 += '</tr>';
				createConfTable1 += '<tr>';
				createConfTable1 += '</tr>';
				for(var gridRows=0;gridRows<pbCount;gridRows++){
					createConfTable1 += '<tr name="prioritySelectionRow" id="priorityBandID_'+content.data.SP3[gridRows].GroupBandID+'">';
					createConfTable1 += '<td>';
						createConfTable1 += (content.data.SP3[gridRows].LowerRange ? content.data.SP3[gridRows].LowerRange : "below")+'-'+(content.data.SP3[gridRows].UpperRange ? content.data.SP3[gridRows].UpperRange : "above"); 
					createConfTable1 += '</td>';
					createConfTable1 += '<td>';
						createConfTable1 += '<select name="prio" id="priorityValue_'+gridRows+'">';
							createConfTable1 += '<option value=0 selected>Priority</option>';
							for(var i=1;i<=10;i++)
								createConfTable1 += '<option value='+i+'>'+i+'</option>';
						createConfTable1 += '</select>';
					createConfTable1 += '</td>';
					createConfTable1 += '<td>';
						createConfTable1 += '<select name="offPrio" id="offPriorityValue_'+gridRows+'">';
							createConfTable1 += '<option value=0 selected>Off Priority</option>';
							for(var j=1;j<=10;j++)
								createConfTable1 += '<option value='+j+'>'+j+'</option>';
						createConfTable1 += '</select>';
					createConfTable1 += '</td>';
					createConfTable1 += '</tr>';
				}
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
	if(zone == "zoneS")
	{
		showStationBlank();
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
function showStationBlank()
{
	//alert(count);
	var createConfTable = '';
	createConfTable += '<td>';
	createConfTable += '<select name="stationG" id="stationG" multiple style="float: left;">';
	//        createConfTable += '<option value="select" selected>Select Station</option>';
	createConfTable += '</select>';
	createConfTable += '</td>';	
	document.getElementById("Restation").innerHTML = createConfTable;
}
function ReshowStation(content)
{
	var count = content.data.length;
	stationCount = count;
	//alert(count);
	var createConfTable = '';
	createConfTable += '<td>';
	createConfTable += '<select name="stationG" id="stationG" multiple style="float: left;">';
	//	createConfTable += '<option value="select" selected>Select Station</option>';
		for(var j=0; j<count; j++)
			createConfTable += '<option value="'+content.data[j].GeoID+'">'+content.data[j].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTable += '</td>';
	createConfTable += '<td style="vertical-align:bottom;"><input type="button" id="go" title="Go" value="Go" name="confSave" class="btn btn-inverse pull-left" onClick="RegetGrp('+count+')" style="width:50px; float: left; margin-top: 20px; margin-left: 20px;"></td>';
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
	//JSONObject.query = "call sp_getfeedersbycategoryandhierarchy_formaintenance(4,'"+station+"',7,"+company_id+","+cat+")";
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
	if(station){
		var station1 = station.substring(0, 6);
		if(station1 == "select")
			return;
	}
	
	var company_id = user_id;
	//alert(cat+"__"+zone+"__"+station+"__"+company_id);
	var JSONObject = new Object;
	JSONObject.jcase = "RegetGrd";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_groupfeedercategories";
	//JSONObject.query = "call sp_getfeedersbycategoryandhierarchy_formaintenance(4,'"+station+"',7,"+company_id+","+cat+")";
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
		createConfTable += '<td id="createFeeder"  width="50%" style="vertical-align:top;">';
			createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
				createConfTable += '<thead>';
				createConfTable += '<tr><td colspan="5" align="center"><h2 align="center">Feeder Listing</h2></td></tr>';
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
						createConfTable += '<td>'+setNulltoEmpty(content.data[i].FEEDER_SHUTDOWN_GROUP)+'</td>';
						createConfTable += '<td>'+content.data[i].PEAKLOAD+'</td>';
					createConfTable += '</tr>';
				}
			createConfTable += '</tbody>';
			createConfTable += '</table>';
		createConfTable += '</td>';

		createConfTable += '<td id="createFeeder1" style="vertical-align:top;"  width="50%">';
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
	//createConfTable += '<td style="vertical-align:top;"></td>';
	//createConfTable += '<td>';
	createConfTable += '<td colspan="2" id="createFeeder" style="vertical-align:top;" width="50%">';
		createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
			createConfTable += '<thead>';
			createConfTable += '<tr><td colspan="5"><h2 align="center">Feeder Listing</h2></td></tr>';
			createConfTable += '<tr>';
				createConfTable += '<td><input type="checkbox" name="feedChk" id="feedChk" onClick="setAndSendAllV()"/></td>';
				createConfTable += '<td>Station Name</td>';
				createConfTable += '<td>Feeder Name</td>';
				
				createConfTable += '<td>Group Name</td>';
			//	createConfTable += '<td>Estimated Peak Load (MW)</td>';
			createConfTable += '</tr>';
			createConfTable += '</thead>';
			createConfTable += '<tbody>';
			for(var i=0; i<count; i++)
			{
				createConfTable += '<tr class="odd">';
					createConfTable += '<td><input type="checkbox" name="'+content.data[i].FeederID+'" id="feedChk_'+(i+1)+'" onClick="checkFeedandAddV(this)"/></td>';
					createConfTable += '<td id='+content.data[i].STATION+'>'+content.data[i].STATION+'</td>';
					createConfTable += '<td id='+content.data[i].FeederID+'>'+content.data[i].FEEDER_NAME+'</td>';
					if((content.data[i].FEEDER_SHUTDOWN_GROUP != "null") || (content.data[i].FEEDER_SHUTDOWN_GROUP != "NULL"))
						createConfTable += '<td id='+content.data[i].FEEDER_SHUTDOWN_GROUP+'>'+setNulltoEmpty(content.data[i].FEEDER_SHUTDOWN_GROUP)+'</td>';
					else
						createConfTable += '<td></td>';
					//createConfTable += '<td id='+content.data[i].PEAKLOAD+'>'+content.data[i].PEAKLOAD+'</td>';
				createConfTable += '</tr>';
			}
		createConfTable += '</tbody>';
		createConfTable += '</table>';
	createConfTable += '</td>';
	//createConfTable += '</td>';
	createConfTable += '</td><td >&nbsp;</td>';
	createConfTable += '<td id="createFeeder1" colspan="2" width="49%" style="vertical-align:top;">';
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
			createConfTable += '<table class="table table-striped dTableR dataTable">';
				createConfTable += '<thead>';
				createConfTable += '<tr>';
					createConfTable += '<td><input type="checkbox" name="feedChk" id="feedChk"/></td>';
					createConfTable += '<td>Feeder Name</td>';
					createConfTable += '<td>Station Name</td>';
					createConfTable += '<td>Group Name</td>';
					//createConfTable += '<td>Estimated Peak Load (MW)</td>';
				createConfTable += '</tr>';
				createConfTable += '</thead>';
				createConfTable += '<tbody id="noneMeT_'+grdData.data[itr-1].FeederID+'>"';
					createConfTable += '<tr class="odd">';
						createConfTable += '<td><input onclick="noneMeVT(this, \''+grdData.data[itr-1].FeederID+'\');" type="checkbox" checked name='+grdData.data[itr-1].FeederID+' id="feedChk_'+globalCountA+'"/></td>';
						createConfTable += '<td id='+grdData.data[itr-1].STATION+'>'+grdData.data[itr-1].STATION+'</td>';
						createConfTable += '<td id='+grdData.data[itr-1].FEEDER_NAME+'>'+grdData.data[itr-1].FEEDER_NAME+'</td>';
						createConfTable += '<td >'+setNulltoEmpty(grdData.data[itr-1].FEEDER_SHUTDOWN_GROUP)+'</td>';
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
			createRow += '<table class="table table-striped table-bordered dTableR dataTable" id="noneMeT_'+grdData.data[itr-1].FeederID+'"><tr class="odd">';
				createRow += '<td><input type="checkbox" onclick="noneMeVT(this, \''+grdData.data[itr-1].FeederID+'\');" checked name='+grdData.data[itr-1].FeederID+' id="feedChk_'+globalCountA+'"/></td>';
				createRow += '<td id='+grdData.data[itr-1].STATION+'>'+grdData.data[itr-1].STATION+'</td>';
				createRow += '<td align="center" id='+grdData.data[itr-1].FeederID+'>'+grdData.data[itr-1].FEEDER_NAME+'</td>';
				createRow += '<td>'+grdData.data[itr-1].FEEDER_SHUTDOWN_GROUP+'</td>';
			createRow += '</tr></table>';
			getConfTableG += createRow;
			document.getElementById("createFeeder1").innerHTML = getConfTableG+getConfTableG1;
		}
	}
}

function setAndSendAllV()
{
	var count = grdData.data.length;
	var createRow = '';
	var itr = parseInt(count[1]);
	if(document.getElementById("feedChk").checked)
	{
		for(var i=0;i<count;i++)
			document.getElementById('feedChk_'+(i+1)).checked = true;
		
		if(!getConfTableG)
		{
			var createConfTable = '';
			createConfTable += '<table class="table table-striped dTableR dataTable">';
				createConfTable += '<thead>';
				createConfTable += '<tr><td colspan="5"><h2 align="center">Feeder Selected</h2></td></tr>';
				createConfTable += '<tr>';
					createConfTable += '<td>&nbsp;</td>';
					createConfTable += '<td>Station Name</td>';
					createConfTable += '<td>Feeder Name</td>';
					createConfTable += '<td>Group Name</td>';
				createConfTable += '</tr>';
				createConfTable += '</thead>';
				createConfTable += '<tbody id="noneMe_'+grdData.data[itr-1].FeederID+'">';
				for(var i=globalCountA; i<count; i++)
				{
					++globalCountA;
					createConfTable += '<tr>';
						createConfTable += '<td><input onclick="noneMeV(this, \''+grdData.data[itr-1].FeederID+'\');" type="checkbox" checked name='+grdData.data[i].FeederID+' id="feedChk_'+globalCountA+'" /></td>';
						createConfTable += '<td align="left">'+grdData.data[i].STATION+'</td>';
						createConfTable += '<td align="left">'+grdData.data[i].FEEDER_NAME+'</td>';
						createConfTable += '<td align="left">'+setNulltoEmpty(grdData.data[i].FEEDER_SHUTDOWN_GROUP)+'</td>';
						//createConfTable += '<td align="center" >'+grdData.data[i].PEAKLOAD+'</td>';
					createConfTable += '</tr>';
				}
			createConfTable += '</tbody>';
			getConfTableG = createConfTable;
			getConfTableG1 = '</table>';
			//createConfTable += getConfTableG+getConfTableG1;
			document.getElementById("createFeeder1").innerHTML = getConfTableG+getConfTableG1;
		}
		else
		{
			//alert(count+"__"+globalCountA);
			for(var i=0; i<count; i++)
			{
				++globalCountA;
				createRow += '<table class="table table-striped dTableR dataTable" id="noneMe_'+grdData.data[i].FeederID+'">';
				createRow += '<tr>';
				createRow += '<td width="20px"><input onclick="noneMeV(this, \''+grdData.data[i].FeederID+'\');" type="checkbox" checked name='+grdData.data[i].FeederID+' id="feedChk_'+globalCountA+'"/></td>';
				createRow += '<td width="80px" align="left">'+grdData.data[i].STATION+'</td>';
				createRow += '<td width="80px" align="left">'+grdData.data[i].FEEDER_NAME+'</td>';
				createRow += '<td width="80px" align="left">'+grdData.data[i].FEEDER_SHUTDOWN_GROUP+'</td>';
				createRow += '</tr>';
				createRow += '</table>';
				getConfTableG += createRow;
				createRow = "";
			}
			//alert(getConfTableG);
			//document.write(getConfTableG);
			document.getElementById("createFeeder1").innerHTML = getConfTableG;
		}
		//document.getElementById("createFeeder").style.display = "none";
	}
	else
	{
		for(var i=0;i<count;i++)
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
				createConfTable += '<tr><td colspan="5"><h2 align="center">Feeder Selected</h2></td></tr>';
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
						createConfTable += '<td width="5%"><input onclick="noneMe(\''+grdData.data[itr-1].FeederID+'\');" type="checkbox" checked name='+grdData.data[itr-1].FeederID+' id="feedFinal_'+globalCount+'"/></td>';
						createConfTable += '<td width="25%">'+grdData.data[itr-1].STATION+'</td>';
						createConfTable += '<td width="25%">'+grdData.data[itr-1].FEEDER_NAME+'</td>';
						createConfTable += '<td width="22%">'+setNulltoEmpty(grdData.data[itr-1].FEEDER_SHUTDOWN_GROUP)+'</td>';
						createConfTable += '<td width="15%">'+grdData.data[itr-1].PEAKLOAD+'</td>';
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
					createRow += '<td width="5%"><input onclick="noneMe(\''+grdData.data[itr-1].FeederID+'\');" type="checkbox" checked name='+grdData.data[itr-1].FeederID+' id="feedFinal_'+globalCount+'"/></td>';
					createRow += '<td width="25%">'+grdData.data[itr-1].STATION+'</td>';
					createRow += '<td width="25%">'+grdData.data[itr-1].FEEDER_NAME+'</td>';
					createRow += '<td width="22%">'+grdData.data[itr-1].FEEDER_SHUTDOWN_GROUP+'</td>';
					createRow += '<td width="15%">'+grdData.data[itr-1].PEAKLOAD+'</td>';
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
				createConfTable += '<tr><td colspan="5"><h2 align="center">Feeder Selected</h2></td></tr>';
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
						createConfTable += '<td width="5%"><input onclick="noneMe(\''+grdData.data[i].FeederID+'\');" type="checkbox" checked name='+grdData.data[i].FeederID+' id="feedFinal_'+globalCount+'" /></td>';
						createConfTable += '<td width="25%">'+grdData.data[i].STATION+'</td>';
						createConfTable += '<td width="25%">'+grdData.data[i].FEEDER_NAME+'</td>';
						createConfTable += '<td width="22%">'+setNulltoEmpty(grdData.data[i].FEEDER_SHUTDOWN_GROUP)+'</td>';
						createConfTable += '<td width="15%">'+grdData.data[i].PEAKLOAD+'</td>';
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
						createConfTable += '<td width="5%"><input onclick="noneMe(\''+grdData.data[i].FeederID+'\');" type="checkbox" checked name='+grdData.data[i].FeederID+' id="feedFinal_'+globalCount+'" /></td>';
						createConfTable += '<td width="25%">'+grdData.data[i].STATION+'</td>';
						createConfTable += '<td width="25%">'+grdData.data[i].FEEDER_NAME+'</td>';
						createConfTable += '<td width="22%">'+grdData.data[i].FEEDER_SHUTDOWN_GROUP+'</td>';
						createConfTable += '<td width="15%">'+grdData.data[i].PEAKLOAD+'</td>';
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
	//var priority = parseInt(document.getElementById("prio").value);
	//var offPriority = parseInt(document.getElementById("offPrio").value);
	var groupName = document.getElementById("grpGrd").value;
	var priorities = '';
	var offPriorities = '';
	var priorityBandRows = document.getElementsByName("prioritySelectionRow");
	var priorityBands = '';
	//console.log("Total Priority Bands "+priorityBandRows.length);
	for(var pb=0; pb<priorityBandRows.length; pb++)
		priorityBands += parseInt(pb+1)+',';
	if(priorityBands)
		priorityBands = priorityBands.substring(0, (priorityBands.length - 1));

	//console.log(priorityBands);

	for(var pb=0; pb<priorityBandRows.length; pb++)
	{
		
		if(document.getElementById("priorityValue_"+pb).value > 0)
		{
			priorities += document.getElementById("priorityValue_"+pb).value+',';
		}
		else
		{
			alert("Priority cannot be left blank! Select a Priority for Each Priority Band.");
			return;
		}

		if(document.getElementById("offPriorityValue_"+pb).value >0)
		{
			offPriorities += document.getElementById("offPriorityValue_"+pb).value+',';
		}
		else
		{
			alert("Off Priority cannot be left blank! Select a Off Peak Priority for Each Priority Band.");
			return;
		}
	}

	//console.log("priorities "+priorities);
	//console.log("offPriorities "+offPriorities);
	if(priorities)
		priorities = priorities.substring(0, (priorities.length - 1));

	if(offPriorities)
		offPriorities = offPriorities.substring(0, (offPriorities.length - 1));
				

	if(!groupName)
	{
		alert("Group Name can not be left blank!");
		return;
	}
	/*
	if(!priority)
	{
		alert("Priority can not be left blank!");
		return;
	}
	if(!offPriority)
	{
		alert("Off Priority can not be left blank!");
		return;
	}*/
	for(var j=1; j<=globalCount; j++)
	{
		if(document.getElementById("feedFinal_"+j))
		{
			if(document.getElementById("feedFinal_"+j).checked)
			{
				//alert(document.getElementById("feedFinal_"+j).name);
				statn += document.getElementById("feedFinal_"+j).name+',';
			}
			else alert("nots");
		}
	}
	//console.log(statn);
	//alert(statn);
	if(statn)
		statn = statn.substring(0,(statn.length - 1));
	else	{
		alert("Please select atleast one Feeder");
		return;
	}
	var company_id = cmp_id;
	//console.log(company_id);
	//console.log(user_id);
	//console.log(userna);
	
	var JSONObject = new Object;
	JSONObject.jcase = "createGrp";
	JSONObject.container = "body_main_pane";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_groupfeedercategories";
	//JSONObject.query = "call sp_11kv_createGroup('"+groupName+"',1,1,"+company_id+","+user_id+",'"+statn+"')";
	JSONObject.query = "call sp_11kv_createGroup1('"+groupName+"',"+company_id+","+user_id+",'"+statn+"','"+priorities+"', '"+offPriorities+"', '"+priorityBands+"')";
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
			createConfTable += '<td align="center">Action</td>';
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
	var totalRelief = 0;
	var createConfTable = "";
	createConfTable += '<div id=potPlanHead>';
	createConfTable += "<h3 class=\"heading\">Potential Plan for Shutdown Event ID:"+adata.data[0].outageID+"</h3>";
	createConfTable += '</div>';
	createConfTable += '<div class="row-fluid">';
		createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
		createConfTable += '<tr>';
			createConfTable += '<td>Station</td>';
			createConfTable += '<td>Feeder</td>';
			createConfTable += '<td>Category</td>';
			createConfTable += '<td>Current Load (MW)</td>';
		createConfTable += '</tr>';
		for(i=0;i<(adata.data).length;i++)
		{
			createConfTable += '<tr>';
				createConfTable += '<td>'+adata.data[i].STATION+'</td>';
				createConfTable += '<td>'+adata.data[i].FEEDER_NAME+'</td>';
				createConfTable += '<td>'+adata.data[i].FEEDER_CATEGORY+'</td>';
				createConfTable += '<td>'+adata.data[i].feederLoad+'</td>';
				totalRelief += Number(adata.data[i].feederLoad);
			createConfTable += '</tr>';
		}
	createConfTable += '</table>';
	createConfTable += '</div>';
	document.getElementById("body_main_pane_pot").innerHTML = createConfTable;
	document.getElementById("potPlanHead").innerHTML = '<h3 class=\"heading\">Potential Plan for Shutdown Event ID:'+adata.data[0].outageID+' Total Relief: <strong>'+(Math.round(totalRelief))+' MW</strong> ';
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
			createConfTable += '<td>Shutdown Requested (MW)</td>';
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
			createConfTable += '<td style="text-align:right">'+adata.data[i].shutdownRequested+'</td>';
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

//PS
//HT CONSUMER
function viewhistoryHt()
{
	
	var createConfTable = '';
	createConfTable += '<h3 class="heading"> HT Consumers</h3> <a onclick="agetHtConsumerZSel()" data-toggle="modal" data-backdrop="static" href="#myModalht" class="btn">Add HT Consumer</a>';
	createConfTable += '<div class="modal hide fade" id="myModalht">';
	createConfTable += '<div class="modal-header">';
		createConfTable += '<button class="close" data-dismiss="modal">×</button>';
		createConfTable += '<h3>Add a new HT Consumer</h3>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-body" id="">';
	
	createConfTable += '<table width="100%">';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font> Name / Address</td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="name_add" id="name_add" value=""></td>';
		createConfTable += '</tr>';
		
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>RR Data</td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="add_rr_code" id="add_rr_code" value=""></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>CONTRACT DEMAND KVA</td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="add_contract" id="add_contract" value=""></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>VOLTAGE CLASS KV</td>';
			createConfTable += '<td><select name="" id="voltage_add"><option value="0">Voltage Class</option>';
			createConfTable += '<option value="11">11</option>';
			createConfTable += '<option value="66">66</option>';
			createConfTable += '<option value="110">110</option>';
			createConfTable += '<option value="220">220</option>';
			createConfTable += '</select>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>TARIFF</td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="add_tariff" id="add_tariff" value=""></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>INSTALLATION TYPE</td>';
			createConfTable += '<td class="usrFont"><input class="UsrtextBox" type="text" name="add_itype" id="add_itype" value=""></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>Email</td>';
			createConfTable += '<td class="usrFont"><input class="UsrtextBox" type="text" name="add_email" id="add_email" value=""></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>Mobile Number</td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="add_mobile1" id="add_mobile1" value="" onkeypress="return isNumber(event,0,this)"></td>';
		createConfTable += '</tr>';
		
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Mobile Number 2</td>';
			createConfTable += '<td class="usrFont"><input class="UsrtextBox" type="text" name="add_mobile2" id="add_mobile2" value="" onkeypress="return isNumber(event,0,this)"></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>Zone</td>';
			createConfTable += '<td class="usrFont"><div id="asel_zone"><select id="azone_sel"><option value="0">Select Zone</option> </select></div></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>Station</td>';
			createConfTable += '<td class="usrFont"><div id="sel_astation"><select id="estation_sel"><option value="0">Select Station</option> </select></div></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>Feeder Name</td>';
			createConfTable += '<td class="usrFont"><div id="esel_feeder"><select id="efeed_sel"><option value="0">Select Feeder</option> </select></div></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';
	createConfTable += '</table>';
		
	createConfTable += '</div>';
	createConfTable += '<div class="modal-footer">';
		createConfTable += '<a href="javascript:add_htConsumer(\'divw\');" class="btn"="modal"="">Submit</a>';
		createConfTable += '<a href="#" class="btn" data-dismiss="modal">Close</a>';
	createConfTable += '</div><a data-toggle="modal" data-backdrop="static" href="#myModalhte_edit" class="" id="modal_a">&nbsp;</a>';
	createConfTable += '</div>';
	createConfTable += '<div class="row-fluid" style="overflow-x:auto;">';
	createConfTable += '<table width="100%">';
		createConfTable += '<tr>';
		createConfTable += '<td>';
		createConfTable += '<table width="100%">';
		
			createConfTable += '<tr>';
			createConfTable += '<td width="24%"><input type="text" name="name_ht" id="name_ht" placeholder="Name"></td><td width="24%"> <input type="text" name="" id="rr_code" placeholder="RR Code"></td>';
			createConfTable += '';
			createConfTable += '<td width="24%"> <select name="" id="voltage"><option value="0">Voltage Class</option>';
			createConfTable += '<option value="11">11</option>';
			createConfTable += '<option value="66">66</option>';
			createConfTable += '<option value="110">110</option>';
			createConfTable += '<option value="220">220</option>';
			createConfTable += '</select></td><td width="24%">&nbsp;</td></tr><tr>';
			//createConfTable += '<td>Feeder Category</td><td><div id="feed_cat"><select name="" id="cat_sel"><option value="0">All</option>';
			//createConfTable += '</select></div></td></tr>';
			
			createConfTable += '<tr>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '</tr>';
			
			createConfTable += '<tr>';
			
			createConfTable += '<td><div id="sel_zone"></div></td>';
			createConfTable += '<td><div id="sel_station"></div></td>';
			createConfTable += '<td><div id="sel_feeder"></div></td>';
			createConfTable += '<td><div id=""><input type="button" value="Go" onclick="searchHtConsumer();"></div></td>';
			createConfTable += '</tr>';
			
			createConfTable += '<tr>';
			createConfTable += '<td><div id="name"></div></td>';
			createConfTable += '<td><div id="rr_code"></div></td>';
			createConfTable += '<td><div id="vol_class"></div></td>';
			createConfTable += '<td></td>';
			createConfTable += '</tr>';

			createConfTable += '<tr>';
			createConfTable += '<td id="sel_company"></td>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '</tr>';

			createConfTable += '<tr>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '</tr>';

		createConfTable += '</table>';
		createConfTable += '</td>';
		createConfTable += '</tr>';

		createConfTable += '<tr>';
		createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';

		createConfTable += '</table>';
		createConfTable += '<table>';
		
		createConfTable += '<tr>';
		createConfTable += '<td>';
		createConfTable += '<div id="body_main_pane_view" class="compactDiv">';
		createConfTable += '</div>';
		createConfTable += '</td>';
		createConfTable += '</tr>';
		
		
	createConfTable += '</table>';
	createConfTable += '</div>';
	document.getElementById("body_main_pane").innerHTML = createConfTable;
	//agetHtConsumerZSel();
	getHtConsumerZSel();
}

function getHtConsumerZSel()
{
	var compid = cmp_id; //cmp_id
	var JSONObject = new Object;
	JSONObject.jcase = "getHtConsumerZSel";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.query = "call sp_mis_get_geoObjectsOfClass(2,null,"+compid+")";
	JSONObject.query2 = "call sp_mis_feedercategory()";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("sel_zone").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function viewgetHtConsumerZSel(adata){
	//alert(adata);
	var len = adata.data.SP.length;
	
	var feedCount = adata.data.SP2.length;
	var createConfTable = '';
	createConfTable2 = '';
	createConfTable += '<select id="zone_sel" onchange="getHtConsumerSSel()">';
	createConfTable += '<option value="0">All Zones</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SP[i].GeoID+'">'+adata.data.SP[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	document.getElementById("sel_zone").innerHTML = createConfTable;
	//Add All Stations Column
        createConfTable = '<select id="station_sel"  onchange="getHtConsumerFeed()">';
        createConfTable += '<option value="0">All Station</option>';
        createConfTable += '</select>';
        document.getElementById("sel_station").innerHTML = createConfTable;

        //Add All Feeders Column
        createConfTable = '<select id="feed_sel">';
        createConfTable += '<option value="0">Feeders</option>';
        createConfTable += '</select>';
        document.getElementById("sel_feeder").innerHTML = createConfTable;
	
	//getHtConsumerSSel();
}

function getHtConsumerSSel()
{
	var compid = cmp_id; //cmp_id
	var zonevl = document.getElementById("zone_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "getHtConsumerSSel";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.query = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"',2,7,null,"+compid+")";
	//test JSONObject.query = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"',2,geoclassid=3 for cicle,null,"+compid+")";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("sel_station").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function viewgetHtConsumerSSel(adata)
{
	var len = adata.data.length;
	var createConfTable = '';
	createConfTable += '<select id="station_sel"  onchange="getHtConsumerFeed()">';
	createConfTable += '<option value="0">All Station</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data[i].GeoID+'">'+adata.data[i].GeoName+'</option>';
	createConfTable += '</select>';
	document.getElementById("sel_station").innerHTML = createConfTable;

	createConfTable = '<select id="feed_sel">';
	createConfTable += '<option value="0">Feeders</option>';
	createConfTable += '</select>';
	document.getElementById("sel_feeder").innerHTML = createConfTable;
	//searchStationHead();
	//getHtConsumerFeed();
}

function getHtConsumerFeed(){
	var compid = cmp_id; //cmp_id
	
	var station = document.getElementById("station_sel").value;
	//var cat = document.getElementById("cat_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "getHtConsumerFeed";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.query = "call sp_getfeedersbycategoryandhierarchy_formaintenance(4,'"+station+"',7,"+compid+",0)";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("sel_feeder").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);	
}

function egetHtConsumerFeed(){
	var compid = cmp_id; //cmp_id
	
	var station = document.getElementById("estation_sel").value;
	//var cat = document.getElementById("cat_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "egetHtConsumerFeed";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.query = "call sp_getfeedersbycategoryandhierarchy_formaintenance(4,'"+station+"',7,"+compid+",0)";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("esel_feeder").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);	
}

function viewgetHtConsumerFeed(adata)
{
	var len = adata.data.length;
	var createConfTable = '';
	createConfTable += '<select id="feed_sel">';
	createConfTable += '<option value="0">Feeders</option>';
	for(i = 0; i < len; i++)
		//createConfTable += '<option value="'+adata.data[i].FeederID+'">'+adata.data[i].FEEDER_NAME+'</option>';
		createConfTable += '<option value="'+adata.data[i].Class8GeoID+'">'+sumitarora+'</option>';
	createConfTable += '</select>';
	document.getElementById("sel_feeder").innerHTML = createConfTable;
	//searchStationHead();
	//searchHtConsumer();

}

function searchHtConsumer()
{
	var compid = cmp_id;
	var staid = parseInt(document.getElementById("station_sel").value);
	var zonevl = parseInt(document.getElementById("zone_sel").value);
	var name_ht = document.getElementById("name_ht").value;
	var rr_code = document.getElementById("rr_code").value;
	//var cat_sel = parseInt(document.getElementById("cat_sel").value);
	var voltage = parseInt(document.getElementById("voltage").value);
	var feed_sel = parseInt(document.getElementById("feed_sel").value);
	
	var JSONObject = new Object;
	JSONObject.jcase = "searchHtConsumer";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.query = "call sp_11kv_searchhtconsumers("+compid+",'"+name_ht+"','"+rr_code+"',"+voltage+","+zonevl+","+staid+","+feed_sel+")";
	//JSONObject.query = "call sp_11kv_searchhtconsumers(1,'Puram, ','C1HT3',11,373,1761, 2488)";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("body_main_pane_view").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function viewsearchHtConsumer(adata)
{
	var len = adata.data.length;
	var createConfTable = '';
	var feeder_id = document.getElementById("feed_sel").value;
	createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
		createConfTable += '<thead>';
		
			createConfTable += '<tr>';
			/*createConfTable += '<th>Name/Address</th>';
			createConfTable += '<th>RR Code</th>';
			createConfTable += '<th>CONTRACT DEMAND In KVA</th>';
			createConfTable += '<th>HT. VOLTAGE CLASS In KV</th>';
			createConfTable += '<th>TARIFF</th>';
			createConfTable += '<th>INSTALLATIONTYPE</th>';
			createConfTable += '<th>Email Address</th>';
			createConfTable += '<th>Mobile Number</th>';
			createConfTable += '<th>Alternate Number</th>';
			
			createConfTable += '<th>Station Name</th>';*/
			createConfTable += '<th>NAME/ADDRESS</th>';
			createConfTable += '<th>RR CODE</th>';
			createConfTable += '<th>CONTRACT DEMAND In KVA</th>';
			createConfTable += '<th>HT. VOLTAGE CLASS In KV</th>';
			createConfTable += '<th>TARIFF</th>';
			createConfTable += '<th>INSTALLATION TYPE</th>';
			createConfTable += '<th>EMAIL ADDRESS</th>';
			createConfTable += '<th>MOBILE NUMBER</th>';
			createConfTable += '<th>ALTERNATE NUMBER</th>';
			
			createConfTable += '<th>STATION NAME</th>';
			createConfTable += '<th>FEEDER</th>';
			createConfTable += '<th>&nbsp;</th>';
			createConfTable += '<th>&nbsp;</th>';
			createConfTable += '</tr>';
			
		createConfTable += '</thead>';
		
		createConfTable += '<tbody>';
		
		if(len>0){
			for(i = 0; i < len; i++)
			{
				createConfTable += '<tr class="odd" id="htconsumer'+adata.data[i].ID+'">';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].NAMEADDRESS)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].RR)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].CONTRACTDEMANDKVA)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].VOLTAGECLASSKV)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].TARIFF)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].INSTALLATIONTYPE)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].EMAIL)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].mobile1)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].mobile2)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].STATION)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].FEEDER_NAME)+'</td>';
				//createConfTable += '<td><input type="button" value="Edit" onclick="edit_htConsumer_data(\'htconsumer'+setNulltoEmpty(adata.data[i].ID)+'\',\''+setNulltoEmpty(adata.data[i].ID)+'\'\,\''+setNulltoEmpty(adata.data[i].NAMEADDRESS)+'\',\''+setNulltoEmpty(adata.data[i].RR)+'\',\''+setNulltoEmpty(adata.data[i].CONTRACTDEMANDKVA)+'\',\''+setNulltoEmpty(adata.data[i].VOLTAGECLASSKV)+'\',\''+setNulltoEmpty(adata.data[i].TARIFF)+'\'\,\''+setNulltoEmpty(adata.data[i].INSTALLATIONTYPE)+'\'\,\''+setNulltoEmpty(adata.data[i].EMAIL)+'\'\',\''+setNulltoEmpty(adata.data[i].mobile1)+'\',\''+setNulltoEmpty(adata.data[i].mobile2)+'\'\,\''+setNulltoEmpty(adata.data[i].STATION)+'\'\,\''+setNulltoEmpty(adata.data[i].FEEDER_NAME)+'\'\);"><!--<a data-toggle="modal" data-backdrop="static" href="#myModalht'+setNulltoEmpty(adata.data[i].ID)+'" class="btn">Edit</a>--></td>';
				createConfTable += '<td><input type="button" value="Edit" onclick="edit_htConsumer_data(\'htconsumer'+setNulltoEmpty(adata.data[i].ID)+'\',\''+setNulltoEmpty(adata.data[i].ID)+'\'\,\''+setNulltoEmpty(escape(adata.data[i].NAMEADDRESS))+'\',\''+setNulltoEmpty(adata.data[i].RR)+'\'\,\''+setNulltoEmpty(adata.data[i].CONTRACTDEMANDKVA)+'\'\,\''+setNulltoEmpty(adata.data[i].VOLTAGECLASSKV)+'\',\''+setNulltoEmpty(adata.data[i].TARIFF)+'\'\,\''+setNulltoEmpty(adata.data[i].INSTALLATIONTYPE)+'\'\,\''+setNulltoEmpty(adata.data[i].EMAIL)+'\'\,\''+setNulltoEmpty(adata.data[i].mobile1)+'\',\''+setNulltoEmpty(adata.data[i].mobile2)+'\'\,\''+setNulltoEmpty(adata.data[i].STATION)+'\'\,\''+setNulltoEmpty(escape(adata.data[i].FEEDER_NAME))+'\'\);"></td>';
				createConfTable += '<td><input type="button" value="Delete" onclick="del_htConsumer(\'htconsumer'+setNulltoEmpty(adata.data[i].ID)+'\','+setNulltoEmpty(adata.data[i].ID)+');">';
				
		/*createConfTable += '<div class="modal hide fade" id="myModalht'+setNulltoEmpty(adata.data[i].ID)+'">';
		createConfTable += '<div class="modal-header">';
			createConfTable += '<button class="close" data-dismiss="modal">×</button>';
			createConfTable += '<h3>Add a new User</h3>';
		createConfTable += '</div>';
		createConfTable += '<div class="modal-body" id="loadMod">';
		
		createConfTable += '<table width="100%">';
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;">*</font> Name / Address</td>';
				createConfTable += '<td><input class="UsrtextBox" type="text" name="name_add" id="name_add" value="'+adata.data[i].NAMEADDRESS+'"></td>';
			createConfTable += '</tr>';
			
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;">*</font>RR Data</td>';
				createConfTable += '<td><input class="UsrtextBox" type="text" name="edit_rr_code" id="edit_rr_code" value="'+adata.data[i].RR+'"></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>CONTRACT DEMAND KVA</td>';
				createConfTable += '<td><input class="UsrtextBox" type="text" name="contract" id="contract" value="'+adata.data[i].CONTRACTDEMANDKVA+'"></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>VOLTAGE CLASS KV</td>';
				createConfTable += '<td><input class="UsrtextBox" type="text" name="vclass" id="vclass" value="'+adata.data[i].VOLTAGECLASSKV+'"></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>TARIFF</td>';
				createConfTable += '<td><input class="UsrtextBox" type="text" name="tariff" id="tariff" value="'+adata.data[i].TARIFF+'"></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;">*</font>INSTALLATION TYPE</td>';
				createConfTable += '<td class="usrFont"><input class="UsrtextBox" type="text" name="itype" id="itype" value="'+adata.data[i].INSTALLATIONTYPE+'"></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;">*</font>Password</td>';
				createConfTable += '<td class="usrFont"><input class="UsrtextBox" type="text" name="email" id="email" value="'+adata.data[i].EMAIL+'"></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Mobile Number</td>';
				createConfTable += '<td><input class="UsrtextBox" type="text" name="mobile1" id="mobile1" value="'+adata.data[i].mobile1+'"></td>';
			createConfTable += '</tr>';
			
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;">*</font>Mobile Number 2</td>';
				createConfTable += '<td class="usrFont"><input class="UsrtextBox" type="text" name="mobile2" id="mobile2" value="'+adata.data[i].mobile2+'"></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;">*</font>Station</td>';
				createConfTable += '<td class="usrFont"><input class="UsrtextBox" type="text" name="station" id="station" value="'+adata.data[i].STATION+'"></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr>';
				createConfTable += '<td><font style="color:#ff0000;">*</font>Feeder Name</td>';
				createConfTable += '<td class="usrFont"><select class="UsrtextBox" name="feeder_name" id="feeder_name"><option value="'+feeder_id+'">'+adata.data[i].FEEDER_NAME+'</option></select></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr>';
				createConfTable += '<td>&nbsp;</td>';
				createConfTable += '<td>&nbsp;</td>';
			createConfTable += '</tr>';
		createConfTable += '</table>';
			
		createConfTable += '</div>';
		createConfTable += '<div class="modal-footer">';
			createConfTable += '<a href="javascript:edit_htConsumer(\'divw\','+adata.data[i].ID+');" class="btn"="modal"="">Submit</a>';
			createConfTable += '<a href="#" class="btn" data-dismiss="modal">Close</a>';
		createConfTable += '</div>';
		createConfTable += '</div>';*/
				createConfTable += '</td>';
				
				createConfTable += '</tr>';
			
			}
		}
		else{
			createConfTable += '<tr><td colspan="13" align="center" style="text-align: center;">No Data Found Here</td></tr>';
		}
		createConfTable += '</tbody>';
		
	createConfTable += '</table>';
	
	document.getElementById("body_main_pane_view").innerHTML = createConfTable;
}

function del_htConsumer(div_id,id){
	if(confirm("Do you really want to delete this?"))	{
		var JSONObject = new Object;
		JSONObject.jcase = "del_htConsumer";
		JSONObject.container = "";
		JSONObject.database = db_name;
		JSONObject.tablename = "tbl_company";
		
		JSONObject.query = "call sp_11kv_DEL_Htconsumer("+id+")";
		JSONstring = JSON.stringify(JSONObject);
		//document.getElementById("body_main_pane_view").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
		document.getElementById(div_id).style.display="none";
		runAjax(parser_page,JSONstring);
	}
	else return false;
}

function edit_htConusmerData(user)
{
	userInfo = user;
	document.getElementById("body_main_pane").innerHTML = "Loading....";
	var createConfTable = '';
	createConfTable += '<h3 class="heading">HT Consumer</h3>';
	//createConfTable += '<div id="create_user"></div>';
	
	document.getElementById("body_main_pane").innerHTML = createConfTable;
}

function edit_htConsumer(div_id,id){
		
		var name_add = escape(document.getElementById("name_add_edit").value);
		var rr_code = document.getElementById("edit_rr_code").value;
		var compid = cmp_id;
		var contract = document.getElementById("edit_contract").value;
		var vclass = parseInt(document.getElementById("edit_vclass").value);
		var tariff = document.getElementById("edit_tariff").value;
		var itype = document.getElementById("edit_itype").value;
		var email = document.getElementById("edit_email").value;
		var mobile1 = document.getElementById("edit_mobile1").value;
		var mobile2 = document.getElementById("edit_mobile2").value;
		var station = parseInt(document.getElementById("editstation_sel").value);
		var feeder_name = parseInt(document.getElementById("feeder_name").value);
		
		if(!name_add)
		{
			alert("Name can not be left blank!");
			return;
		}
		if(!rr_code)
		{
			alert("RR data can not be left blank!");
			return;
		}
		
		if(!contract)
		{
			alert("Contact Demand can not be left blank!");
			return;
		}
		
		if(!vclass)
		{
			alert("Please select Voltage Class!");
			return;
		}
		if(!tariff)
		{
			alert("Tariff can not be left blank!");
			return;
		}
		
		if(!itype)
		{
			alert("Installation Type can not be blank!!");
			return;
		}
		if(!email)
		{
			alert("Email can not be blank!!");
			return;
		}
		if(!validateEmail(email)){
			alert("Please enter valid Email!!");
			return;
		}
		if(!mobile1)
		{
			alert("Mobile Number can not be blank!!");
			return;
		}
		if(!station)
		{
			alert("Please select Station!");
			return;
		}
		
		if(!feeder_name)
		{
			alert("Please select Feeder Name!");
			return;
		}
		var JSONObject = new Object;
		JSONObject.jcase = "edit_htConsumer";
		JSONObject.container = "";
		JSONObject.database = db_name;
		JSONObject.tablename = "tbl_company";
		
		JSONObject.query = "call sp_11kv_INS_UPD_Htconsumer('"+name_add+"','"+rr_code+"','"+contract+"',"+vclass+",'"+tariff+"','"+itype+"','"+email+"','"+mobile1+"','"+mobile2+"',"+feeder_name+","+compid+","+id+")";
		JSONstring = JSON.stringify(JSONObject);
		//document.getElementById("myModalhte_edit").innerHTML = "call sp_11kv_INS_UPD_Htconsumer('"+name_add+"','"+rr_code+"','"+contract+"',"+vclass+",'"+tariff+"','"+itype+"','"+email+"','"+mobile1+"','"+mobile2+"',"+feeder_name+","+compid+","+id+")";
		//document.getElementById(div_id).style.display="none";
		runAjax(parser_page,JSONstring);
	
}
//Add HT consumer in database
function add_htConsumer(div_id){
		
		var name_add = document.getElementById("name_add").value;
		var rr_code = document.getElementById("add_rr_code").value;
		var compid = cmp_id;
		var contract = document.getElementById("add_contract").value;
		var vclass = parseInt(document.getElementById("voltage_add").value);
		var tariff = document.getElementById("add_tariff").value;
		var itype = document.getElementById("add_itype").value;
		var email = document.getElementById("add_email").value;
		var mobile1 = document.getElementById("add_mobile1").value;
		var mobile2 = document.getElementById("add_mobile2").value;
		var station = parseInt(document.getElementById("estation_sel").value);
		var feeder_name = parseInt(document.getElementById("efeed_sel").value);
		
		if(!name_add)
		{
			alert("Name can not be left blank!");
			return;
		}
		if(!rr_code)
		{
			alert("RR data can not be left blank!");
			return;
		}
		
		if(!contract)
		{
			alert("Contact Demand can not be left blank!");
			return;
		}
		
		if(!vclass)
		{
			alert("Please select Voltage Class!");
			return;
		}
		if(!tariff)
		{
			alert("Tariff can not be left blank!");
			return;
		}
		
		if(!itype)
		{
			alert("Installation Type can not be blank!!");
			return;
		}
		if(!email)
		{
			alert("Email can not be blank!!");
			return;
		}
		if(!validateEmail(email)){
			alert("Please enter valid Email!!");
			return;
		}
		if(!mobile1)
		{
			alert("Mobile Number can not be blank!!");
			return;
		}
		/*if(!mobile2)
		{
			alert("Mobile Number can not be blank!");
			return;
		}*/
		if(!station)
		{
			alert("Please select Station!");
			return;
		}
		
		if(!feeder_name)
		{
			alert("Please select Feeder Name!");
			return;
		}
		
		var JSONObject = new Object;
		JSONObject.jcase = "add_htConsumer";
		JSONObject.container = "";
		JSONObject.database = db_name;
		JSONObject.tablename = "tbl_company";
		
		JSONObject.query = "call sp_11kv_INS_UPD_Htconsumer('"+name_add+"','"+rr_code+"','"+contract+"',"+vclass+",'"+tariff+"','"+itype+"','"+email+"','"+mobile1+"','"+mobile2+"',"+feeder_name+","+compid+",'')";
		JSONstring = JSON.stringify(JSONObject);
		//document.getElementById("myModalhte_edit").innerHTML = "call sp_11kv_INS_UPD_Htconsumer('"+name_add+"','"+rr_code+"','"+contract+"',"+vclass+",'"+tariff+"','"+itype+"','"+email+"','"+mobile1+"','"+mobile2+"',"+feeder_name+","+compid+","+id+")";
		//document.getElementById(div_id).style.display="none";
		runAjax(parser_page,JSONstring);
	
}

function edit_htConsumer_data(div_id,id, name, rr_code,contract, vclass, tariff, itype, email, mobile1, mobile2, station,feeder_name){
		//alert(id);
		var compid = cmp_id;
		var zone_id = parseInt(document.getElementById("zone_sel").value);
//		var station_id = parseInt(document.getElementById("station").value);
		var createConfTable = '';
		/* , name, rr_code,contract, vclass, tariff, itype, email, mobile1, mobile2, station,feeder_name
		var name_add = document.getElementById("name_add").value;
		var rr_code = document.getElementById("edit_rr_code").value;
		var contract = parseInt(document.getElementById("contract").value);
		var vclass = parseInt(document.getElementById("vclass").value);
		var tariff = parseInt(document.getElementById("tariff").value);
		var itype = parseInt(document.getElementById("itype").value);
		var email = document.getElementById("email").value;
		var mobile1 = document.getElementById("mobile1").value;
		var mobile2 = parseInt(document.getElementById("mobile2").value);
		var station = parseInt(document.getElementById("station").value);
		var feeder_name = parseInt(document.getElementById("feeder_name").value);*/
		var JSONObject = new Object;
		JSONObject.jcase = "edit_htConsumer";
		JSONObject.container = "";
		JSONObject.database = db_name;
		JSONObject.tablename = "tbl_company";
		//createConfTable += '<div class="modal hide fade" id="myModalhte_edit">';
		createConfTable += '<div class="modal hide fade" id="myModalhte_edit">';
	createConfTable += '<div class="modal-header">';
		createConfTable += '<button class="close" data-dismiss="modal">×</button>';
		createConfTable += '<h3>Edit HT Consumer</h3>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-body" id="">';
	
	createConfTable += '<table width="100%">';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font> Name / Address</td>';
			createConfTable += '<td><textarea name="name_add_edit" id="name_add_edit" >'+unescape(name)+'</textarea></td>';
		createConfTable += '</tr>';
		
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>RR Data</td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="edit_rr_code" id="edit_rr_code" value="'+rr_code+'"></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>CONTRACT DEMAND KVA</td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="edit_contract" id="edit_contract" value="'+contract+'"></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>VOLTAGE CLASS KV</td>';
			createConfTable += '<td><select name="edit_vclass" id="edit_vclass"><option value="0">Voltage Class</option>';
			createConfTable += '<option value="11"';
			createConfTable += (vclass==="11") ? "selected" : "";
			createConfTable += '>11</option>';
			createConfTable += '<option value="66">';
			createConfTable += (vclass==="66") ? "selected" : "";
			createConfTable += '66</option>';
			createConfTable += '<option value="110">';
			createConfTable += (vclass==="110") ? "selected" : "";
			createConfTable += '110</option>';
			createConfTable += '<option value="220">';
			createConfTable += (vclass==="220") ? "selected" : "";
			createConfTable += '220</option>';
			//createConfTable += '<option value="220" '+(vclass==="220") ? "selected" : ""+'>220</option>';
			createConfTable += '</select></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>TARIFF</td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="edit_tariff" id="edit_tariff" value="'+tariff+'"></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>INSTALLATION TYPE</td>';
			createConfTable += '<td class="usrFont"><input class="UsrtextBox" type="text" name="edit_itype" id="edit_itype" value="'+itype+'"></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>Email</td>';
			createConfTable += '<td class="usrFont"><input class="UsrtextBox" type="text" name="edit_email" id="edit_email" value="'+email+'"></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>Mobile Number</td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="edit_mobile1" id="edit_mobile1" value="'+mobile1+'" onkeypress="return isNumber(event,0,this)"></td>';
		createConfTable += '</tr>';
		
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Mobile Number 2</td>';
			createConfTable += '<td class="usrFont"><input class="UsrtextBox" type="text" name="edit_mobile2" id="edit_mobile2" value="'+mobile2+'" onkeypress="return isNumber(event,0,this)"></td>';
		createConfTable += '</tr>';
		//createConfTable += '<tr>';
			//createConfTable += '<td><font style="color:#ff0000;">*</font>Zone</td>';
			//createConfTable += '<td class="usrFont"><select ><option value="">'+zone+'</option></select></td>';
		//createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>Station</td>';
			createConfTable += '<td class="usrFont" ><div id ="sel_editstation"><select class="UsrtextBox" name="edit_station" id="estation_sel"><option value="'+station+'">'+station+'</option></select></div></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font>Feeder Name</td>';
			createConfTable += '<td class="usrFont"><div id="editsel_feeder"><select class="UsrtextBox" name="feeder_name" id="feeder_name"><option value="'+unescape(feeder_name)+'">'+unescape(feeder_name)+'</option></select></div><input type="hidden" value="'+unescape(feeder_name)+'" id="feeder_val"></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';
	createConfTable += '</table>';
		
	createConfTable += '</div>';
	createConfTable += '<div class="modal-footer">';
		createConfTable += '<a href="javascript:edit_htConsumer(\'divw\','+id+');" class="btn"="modal"="">Submit</a>';
		createConfTable += '<a href="#" class="btn" data-dismiss="modal">Close</a>';
	createConfTable += '</div><a data-toggle="modal" data-backdrop="static" href="#myModalhte_edit" class="" id="modal_a">&nbsp;</a>';
	createConfTable += '</div>';
		//document.getElementById("body_main_pane").appendChild(createConfTable);
		$("#body_main_pane").append(createConfTable);
		$("#modal_a").click();
		egetHtConsumerSSel();
		//document.getElementById(div_id).style.display="none";
		//runAjax(parser_page,JSONstring);
	
}


//Edit HT Consumer
function egetHtConsumerSSel()
{
	var compid = cmp_id; //cmp_id
	var zonevl = document.getElementById("zone_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "egetHtConsumerSSel";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.query = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"',2,7,null,"+compid+")";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("sel_editstation").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function viewegetHtConsumerSSel(adata)
{
	var len = adata.data.length;
	var cur_station = document.getElementById("station_sel").value;
	
	//var cur_station = '';
	var createConfTable = '';
	createConfTable += '<select id="editstation_sel"  onchange="editgetHtConsumerFeed()">';
	createConfTable += '<option value="0">All Station</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data[i].GeoID+'" '+(cur_station == adata.data[i].GeoID ? "selected"  : "" )+'>'+adata.data[i].GeoName+'</option>';
	createConfTable += '</select>';
	document.getElementById("sel_editstation").innerHTML = createConfTable;
	//searchStationHead();
	createConfTable = '<select id="feed_sel">';
	createConfTable += '<option value="0">Feeders</option>';
	createConfTable += '</select>';
	document.getElementById("sel_feeder").innerHTML = createConfTable;
	editgetHtConsumerFeed();
}

function getHtConsumerFeed(){
	var compid = cmp_id; //cmp_id
	
	var station = document.getElementById("station_sel").value;
	//var cat = document.getElementById("cat_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "getHtConsumerFeed";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	//JSONObject.query = "call sp_getfeedersbycategoryandhierarchy_formaintenance(4,'"+station+"',7,"+compid+",0)";
	JSONObject.query = "call sp_getfeedersbycategoryandhierarchy(4,'"+station+"',7,"+compid+",0)";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("sel_feeder").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);	
}

function viewgetHtConsumerFeed(adata)
{
	var len = adata.data.length;
	var createConfTable = '';
	createConfTable += '<select id="feed_sel">';
	createConfTable += '<option value="0">Feeders</option>';
	for(i = 0; i < len; i++)
		//createConfTable += '<option value="'+adata.data[i].FeederID+'">'+adata.data[i].FEEDER_NAME+'</option>';
		createConfTable += '<option value="'+adata.data[i].Class8GeoID+'">'+adata.data[i].FEEDER_NAME+'</option>';
	createConfTable += '</select>';
	document.getElementById("sel_feeder").innerHTML = createConfTable;
	//searchStationHead();
	//searchHtConsumer();

}

function editgetHtConsumerFeed(){
	
	var compid = cmp_id; //cmp_id
	var station = document.getElementById("editstation_sel").value;
	//var cat = document.getElementById("cat_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "editgetHtConsumerFeed";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	//JSONObject.query = "call sp_getfeedersbycategoryandhierarchy_formaintenance(4,'"+station+"',7,"+compid+",0)";
	JSONObject.query = "call sp_getfeedersbycategoryandhierarchy(4,'"+station+"',7,"+compid+",0)";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("editsel_feeder").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);	
}

//edit htconsumer feeder
function vieweditgetHtConsumerFeed(adata)
{
	var len = adata.data.length;
	var feeder_val = document.getElementById("feeder_val").value;
	var createConfTable = '';
	createConfTable += '<select id="feeder_name">';
	createConfTable += '<option value="0">Feeders</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data[i].FeederID+'" '+(feeder_val == unescape(adata.data[i].FEEDER_NAME) ? "selected"  : "" )+'>'+adata.data[i].FEEDER_NAME+'</option>';
	createConfTable += '</select>';
	document.getElementById("editsel_feeder").innerHTML = createConfTable;
	//searchStationHead();
	//searchHtConsumer();

}


function viewegetHtConsumerFeed(adata)
{
	var len = adata.data.length;
	var createConfTable = '';
	createConfTable += '<select id="efeed_sel">';
	createConfTable += '<option value="0">Feeders</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data[i].FeederID+'">'+adata.data[i].FEEDER_NAME+'</option>';
	createConfTable += '</select>';
	document.getElementById("esel_feeder").innerHTML = createConfTable;
	//searchStationHead();
	//searchHtConsumer();

}

//Add HT consumer data
function agetHtConsumerZSel()
{
	var compid = cmp_id; //cmp_id
	var JSONObject = new Object;
	JSONObject.jcase = "agetHtConsumerZSel";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.query = "call sp_mis_get_geoObjectsOfClass(2,null,"+compid+")";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("asel_zone").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function viewagetHtConsumerZSel(adata){
	var len = adata.data.length;
	
	var createConfTable = '';
	createConfTable += '<select id="azone_sel" onchange="agetHtConsumerSSel()">';
	createConfTable += '<option value="0">All Zones</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data[i].GeoID+'">'+adata.data[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	document.getElementById("asel_zone").innerHTML = createConfTable;	
	agetHtConsumerSSel();
}
//Add HT Consumer
function agetHtConsumerSSel()
{
	var compid = cmp_id; //cmp_id
	var zonevl = document.getElementById("azone_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "agetHtConsumerSSel";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.query = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"',2,7,null,"+compid+")";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("sel_astation").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function viewagetHtConsumerSSel(adata)
{
	var len = adata.data.length;
	//var cur_station = document.getElementById("astation_sel").value;
	
	var createConfTable = '';
	createConfTable += '<select id="estation_sel"  onchange="egetHtConsumerFeed()">';
	createConfTable += '<option value="0">All Station</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data[i].GeoID+'">'+adata.data[i].GeoName+'</option>';
	createConfTable += '</select>';
	document.getElementById("sel_astation").innerHTML = createConfTable;
	//searchStationHead();
	egetHtConsumerFeed();
}

//PS
//FM 
function viewhistoryFm()
{
	//onclick="agetHtConsumerZSel()" 
	var createConfTable = '';
	createConfTable += '<h3 class="heading"> Feeder Management</h3> <a data-toggle="modal" onclick="getFeederAddData()" data-backdrop="static" href="#myModalht" class="btn">Add Feeder</a>';
	createConfTable += '<div class="modal hide fade" id="myModalht" style="width:950px; left:39%;">';
	createConfTable += '<div class="modal-header">';
		createConfTable += '<button class="close" data-dismiss="modal">×</button>';
		createConfTable += '<h3>Add a New Feeder</h3>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-body" id="">';
	
	createConfTable += '<table BORDER=0 RULES=COLS width="100%">';
		
		createConfTable += '<tr>';
                        createConfTable += '<td width="25%" align="center"> <img src="img/1.png" height="30" width="30" align="center"> </td>';
                        createConfTable += '<td width="25%" align="center"> <img src="img/2.png" height="30" width="30" align="center"> </td>';
                        createConfTable += '<td width="25%" align="center"> <img src="img/3.png" height="30" width="30" align="center"> </td>';
                        createConfTable += '<td width="25%" align="center"> <img src="img/4.png" height="30" width="30" align="center"> </td>';
                createConfTable += '</tr>';
		

		createConfTable += '<tr>';
			createConfTable += '<td width="25%"> <input class="UsrtextBox" type="text" name="feeder" id="feeder" value="" placeholder="Feeder Name"><font style="color:#ff0000;">*</font></td>';
			createConfTable += '<td width="25%"><div id="select_circle"><select name="" id="circle"><option value="0">Select Circle</option>';
			
			createConfTable += '</select></div></td>';
			createConfTable += '<td width="25%"><div id="select_revenue"><select name="" id="revenue_sel"><option value="0">Revenue Area</option>';
			
			createConfTable += '</select></div></td>';
			createConfTable += '<td width="25%" class="usrFont"><div id="mp"><select id="mp_sel"><option value="0">Select MP</option> </select></div></td>';
		createConfTable += '</tr>';
		
		createConfTable += '<tr>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="feeder_scada" id="feeder_scada" placeholder="Feeder SCADA" value=""></td>';
			createConfTable += '<td><div id="select_division"><select name="" id="division"><option value="0">Division</option>';
			createConfTable += '</select></div></td>';
			createConfTable += '<td><div id="select_district"><select name="" id="district_sel"><option value="0">District </option>';
			createConfTable += '</select></div></td>';
			createConfTable += '<td class="usrFont"><div id="mla"><select id="mla_sel"><option value="0">Select MLA</option> </select></div></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><div id="select_feeder"><select name="" id="feeder_cat"><option value="0">Feeder Category</option>';
			createConfTable += '</select></div></td>';
			createConfTable += '<td><div id="select_sub"><select name="" id="sub_sel"><option value="0">Sub-Division</option>';
			createConfTable += '</select></div></td>';
			createConfTable += '<td class="usrFont"><div id="taluq"><select id="talque_sel"><option value="0">Select Taluq</option> </select></div></td>';
			/*createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Zone</td>';*/
			createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><div id="select_zone"><select name="" id="zone"><option value="0">Select Zone</option>';
			
			createConfTable += '</select></div></td>';
			//createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font>Station</td>';
			createConfTable += '<td><div id="select_section"><select name="" id="section_sel"><option value="0">O&M Section</option>';
			createConfTable += '</select></div></td>';
			createConfTable += '<td class="usrFont"><div id="gramPanchayat"><select id="gp_sel"><option value="0">Select Gram Panchayat</option> </select></div></td>';
			createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><div id="select_station"><select name="" id="Station"><option value="0"> Select Station</option></select></div></td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';
		
		createConfTable += '<tr>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="batch" id="batch_sel" value="" placeholder="Batch"></td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="months" id="month_sel" value="" placeholder="Months"></td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="crops" id="crops_sel" value="" placeholder="Crops"></td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="capacity" id="capacity_sel" onkeypress="return isNumber(event,0,this)" value="" placeholder="Capacity"></td>';
		createConfTable += '</tr>';
		createConfTable += '<hr>';
		createConfTable += '<tr>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';
	createConfTable += '</table>';
		
	createConfTable += '</div>';
	createConfTable += '<div class="modal-footer">';
		createConfTable += '<a href="javascript:add_feeder();" class="btn"="modal"="">Submit</a>';
		createConfTable += '<a href="#" class="btn" data-dismiss="modal">Close</a>';
		createConfTable += '<span id="test_AddFM"></span>';
	createConfTable += '</div><a data-toggle="modal" data-backdrop="static" href="#myModalhte_edit" class="" id="modal_a">&nbsp;</a>';
	createConfTable += '</div>';
	createConfTable += '<div class="row-fluid" style="overflow-x:auto; margin-top:12px;">';
	createConfTable += '<table width="100%">';
		createConfTable += '<tr>';
		createConfTable += '<td>';
		//createConfTable += '<table width="90%" style="border:1px solid #000;">';
		createConfTable += '<table width="90%">';
		
			createConfTable += '<tr><td>&nbsp;</td></tr>';
			createConfTable += '<tr>';
			createConfTable += '<td width="33%"><div id="search_feeder"><select><option value="0">Feeder Category</option></select></div></td>';
			
			createConfTable += '<td width="2%">&nbsp;</td>';;
			createConfTable += '<td width="32%"><div id="search_zone"> <select name="" id="voltage"><option value="0">Zone </option>';
			
			createConfTable += '</select></td>';
			createConfTable += '<td width="32%"><div id=""></div></td>';
			
			
			createConfTable += '<tr>';
			
			createConfTable += '<td><br><strong>Search With Station:&nbsp;</strong><input type="radio" name="check_sc" checked id="station_check"><br><br><div style="border: 2px solid #635858; margin: 3px; padding: 10px;"><div id="search_station" style="float:left;" ><select id="station_sel"><option value="0">Station</option></select></div><!--<input style="float:left; display:block; margin-left:10px;" type="radio" name="check_sc" checked id="station_check">--><div style="clear:both"></div></div></td>';
			createConfTable += '<td><div style="font-weight: bold; font-size: 19px; vertical-align: middle; margin-right: 12px; text-transform: uppercase;margin-left: 11px;">or</div></td>';
			createConfTable += '<td colspan="2"><br><strong>Search With Circle:&nbsp;</strong><input type="radio" name="check_sc" id="circle_check"><br><br><div style="border:2px solid #635858; width:500px;"><table>';
			createConfTable += '<tr><td><div id="search_circle"><select><option value="0"> Circle</option></select></div></td> <td><div id="search_division"><select id="sdivision_sel"><option value="0"> Division</option></select></div><BR></td></tr>';
			createConfTable += '<tr><td><div id="search_sub"><select id="ssub_sel"><option value="0">Sub Division</option></select></div></td> <td><div id="search_section" style="float:left;"><select id="ssection_sel"><option value="0"> O&M Section</option></select></div><!--<input type="radio" style="margin-left:10px;" name="check_sc" id="circle_check">--></td></tr>';
			createConfTable += '</table></div><br><input type="button" value="Search" onclick="searchFeederM();"></td>';
			//createConfTable += '<td><div id="search_sub"><select><option value="0"> Sub Division</option></select></div></td>';
			//createConfTable += '<td><input type="button" value="Go" onclick="searchFeederM();"></td>';
			createConfTable += '<td></td>';
			createConfTable += '</tr>';
			createConfTable += '<tr>';
			
			createConfTable += '<td colspan ="4" align="right">&nbsp;</td>';
		
			createConfTable += '</tr>';
			createConfTable += '<tr>';
			
			createConfTable += '<td colspan ="4" align="right"><!--<input type="button" value="Go" onclick="searchFeederM();">--></td>';
		
			createConfTable += '</tr>';
			
			createConfTable += '<tr>';
			
			createConfTable += '<td><div id="sel_zone"></div></td>';
			createConfTable += '<td><div id="sel_station"></div></td>';
			createConfTable += '<td><div id="sel_feeder"></div></td>';
			createConfTable += '<td><div id=""></div></td>';
			createConfTable += '</tr>';
			
			createConfTable += '<tr>';
			createConfTable += '<td><div id="name"></div></td>';
			createConfTable += '<td><div id="rr_code"></div></td>';
			createConfTable += '<td><div id="vol_class"></div></td>';
			createConfTable += '<td></td>';
			createConfTable += '</tr>';

			createConfTable += '<tr>';
			createConfTable += '<td id="sel_company"></td>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '</tr>';

			createConfTable += '<tr>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '</tr>';

		createConfTable += '</table>';
		createConfTable += '</td>';
		createConfTable += '</tr>';

		createConfTable += '<tr>';
		createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';

		
		createConfTable += '<tr>';
		createConfTable += '<td>';
		createConfTable += '<div id="body_main_pane_view">';
		createConfTable += '</div>';
		createConfTable += '</td>';
		createConfTable += '</tr>';
		
		
	createConfTable += '</table>';
	createConfTable += '</div>';
	document.getElementById("body_main_pane").innerHTML = createConfTable;
	//agetHtConsumerZSel();
	//getHtConsumerZSel();
	getFeederSearchData();
}

function getFeederAddData()
{
	var compid = cmp_id; //cmp_id
	var JSONObject = new Object;
	JSONObject.jcase = "getFeederAddData";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	//JSONObject.querys = "call sp_mis_get_geoObjectsOfClass(7,null,"+compid+")";
	JSONObject.queryf = "call sp_mis_feedercategory()";
	JSONObject.queryz = "call sp_mis_get_geoObjectsOfClass(2,null,"+compid+")";
	JSONObject.queryr = "call sp_mis_get_geoObjectsOfClass(16,null,"+compid+")";
	JSONObject.querymp = "call sp_mis_get_geoObjectsOfClass(9,null,"+compid+")";
	/*JSONObject.queryc = "call sp_mis_get_geoObjectsOfClass(3,null,"+compid+")";
	JSONObject.queryd = "call sp_mis_get_geoObjectsOfClass(4,null,"+compid+")";
	JSONObject.querysd = "call sp_mis_get_geoObjectsOfClass(5,null,"+compid+")";
	JSONObject.queryom = "call sp_mis_get_geoObjectsOfClass(15,null,"+compid+")";
	
	JSONObject.queryt = "call sp_mis_get_geoObjectsOfClass(13,null,"+compid+")";
	JSONObject.querygp = "call sp_mis_get_geoObjectsOfClass(14,null,"+compid+")";
	
	JSONObject.querymla = "call sp_mis_get_geoObjectsOfClass(10,null,"+compid+")";
	JSONObject.querydis = "call sp_mis_get_geoObjectsOfClass(12,null,"+compid+")";*/
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("select_feeder").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	document.getElementById("select_zone").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function viewgetFeederAddData(adata){
	//alert(adata);
	//var len = adata.data.SPS.length;
	var feedCount = adata.data.SPF.length;
	var lenz = adata.data.SPZ.length;
	var lenmp = adata.data.SPMP.length;
	var lenr = adata.data.SPR.length;
	/*var lenc = adata.data.SPC.length;
	var lend = adata.data.SPD.length;
	var lensd = adata.data.SPSD.length;
	var lenom = adata.data.SPOM.length;
	
	var lendis = adata.data.SPDIS.length;
	var lengp = adata.data.SPGP.length;
	var lent = adata.data.SPT.length;
	
	var lenmla = adata.data.SPMLA.length;*/
	document.getElementById("feeder").value="";
	document.getElementById("feeder_scada").value="";
	document.getElementById("test_AddFM").innerHTML="";
	var createConfTable = '';
	var createConfTablef = '', createConfTablez, createConfTablec= '', createConfTabled = '', createConfTablesd = '', createConfTableom = '', createConfTabler= '', createConfTablet = '', createConfTablet ='', createConfTabledis ='', createConfTablegp = '', createConfTablemp = '', createConfTablemla = '';
	createConfTablez = '';
	
	createConfTablef += '<select id="feed_sel">';
	createConfTablef += '<option value="0">Select Feeder Category</option>';
	for(i = 0; i < feedCount; i++)
		createConfTablef += '<option value="'+adata.data.SPF[i].CategoryID+'">'+adata.data.SPF[i].CategoryName+'</option>';
	createConfTablef += '</select>';
	
	createConfTablez += '<select name="zone_sel" id="zone_sel" onchange="agetStationFM();">';
	createConfTablez += '<option value="0"> Select Zone</option>';
	for(var j=0; j<lenz; j++)
		createConfTablez+= '<option value="'+adata.data.SPZ[j].GeoID+'">'+adata.data.SPZ[j].GeoName+'</option>';
	createConfTablez += '</select>';
	createConfTable += '<select id="station_sel" >';
	createConfTable += '<option value="0">Select Station</option>';
	
	createConfTable += '</select>';
	createConfTablec += '<select name="circle_sel" id="circle_sel" >';
	createConfTablec += '<option value="0"> Select Circle</option>';
	
	createConfTablec += '</select>';
	createConfTabled += '<select id="division_sel">';
	createConfTabled += '<option value="0">Select Division</option>';
	
	createConfTabled += '</select>';
	
	createConfTablesd += '<select name="sub_sel" id="sub_sel">';
	createConfTablesd += '<option value="0"> Select Sub Division</option>';
	
	createConfTablesd += '</select>';
	
	createConfTableom += '<select id="section_sel" >';
	createConfTableom += '<option value="0">Select Section</option>';
	
	createConfTableom += '</select>';
	createConfTabler += '<select id="revenue_sel"  onchange="agetDistrict();">';
	createConfTabler += '<option value="0">Select Revenue Area</option>';
	for(var j=0; j<lenr; j++)
		createConfTabler+= '<option value="'+adata.data.SPR[j].GeoID+'">'+adata.data.SPR[j].GeoName+'</option>';
	createConfTabler += '</select>';
	
	createConfTabledis += '<select name="district_sel" id="district_sel">';
	createConfTabledis += '<option value="0"> Select District</option>';
	
	createConfTabledis += '</select>';
	createConfTablet += '<select name="talque_sel" id="talque_sel">';
	createConfTablet += '<option value="0"> Select Taluq</option>';
	
	createConfTablet += '</select>';
	createConfTablegp += '<select id="gp_sel">';
	createConfTablegp += '<option value="0">Select Gram Panchayat</option>';
	
	createConfTablegp += '</select>';
	
	createConfTablemp += '<select name="mp_sel" id="mp_sel" onchange="agetMLA();">';
	createConfTablemp += '<option value="0"> Select MP</option>';
	for(var j=0; j<lenmp; j++)
		createConfTablemp+= '<option value="'+adata.data.SPMP[j].GeoID+'">'+adata.data.SPMP[j].GeoName+'</option>';
	createConfTablemp += '</select>';
	createConfTablemla += '<select name="mla_sel" id="mla_sel">';
	createConfTablemla += '<option value="0"> Select MLA</option>';
	
	createConfTablemla += '</select>';
	
	//document.getElementById("select_station").innerHTML = createConfTable;
	document.getElementById("select_feeder").innerHTML = createConfTablef;
	document.getElementById("select_zone").innerHTML = createConfTablez;
	document.getElementById("select_circle").innerHTML = createConfTablec;
	document.getElementById("select_division").innerHTML = createConfTabled;
	document.getElementById("select_sub").innerHTML = createConfTablesd;
	document.getElementById("select_section").innerHTML = createConfTableom;
	document.getElementById("select_revenue").innerHTML = createConfTabler;
	document.getElementById("select_district").innerHTML = createConfTabledis;
	document.getElementById("taluq").innerHTML = createConfTablet;
	document.getElementById("gramPanchayat").innerHTML = createConfTablegp;
	document.getElementById("mp").innerHTML = createConfTablemp;
	document.getElementById("mla").innerHTML = createConfTablemla;
	
	//getHtConsumerSSel();
}
function agetStationFM(){
	
	var compid = cmp_id; //cmp_id
	zonevl = document.getElementById("zone_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "agetStationFM";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"',2,7,null,"+compid+")";
	
	JSONObject.queryc = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"',2,3,null,"+compid+")";

	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("select_station").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	document.getElementById("select_circle").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
		
}

//add feeder circle and station data
function viewagetStationFM(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	
	var lenc = adata.data.SPC.length;

	
	var createConfTable = '';
	var createConfTablef = '', createConfTablez, createConfTablec= '', createConfTabled = '', createConfTablesd = '', createConfTableom = '', createConfTabler= '', createConfTablet = '', createConfTablet ='', createConfTabledis ='', createConfTablegp = '', createConfTablemp = '', createConfTablemla = '';
	createConfTablez = '';
	
	createConfTable += '<select id="station_sel" >';
	createConfTable += '<option value="0">Select Station</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'">'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTablec += '<select id="circle_sel" onchange="agetDivisionFm();">';
	createConfTablec += '<option value="0">Select Circle</option>';
	for(i = 0; i < lenc; i++)
		createConfTablec += '<option value="'+adata.data.SPC[i].GeoID+'">'+adata.data.SPC[i].GeoName+'</option>';
	createConfTablec += '</select>';
	createConfTabled += '<select id="division_sel">';
	createConfTabled += '<option value="0">Select Division</option>';
	createConfTabled += '</select>';
	
	createConfTablesd += '<select name="sub_sel" id="sub_sel">';
	createConfTablesd += '<option value="0"> Select Sub Division</option>';
	
	createConfTablesd += '</select>';
	
	createConfTableom += '<select id="section_sel" >';
	createConfTableom += '<option value="0">Select Section</option>';
	
	createConfTableom += '</select>';
	createConfTabler += '<select id="revenue_sel">';
	createConfTabler += '<option value="0">Select Revenue Area</option>';
	
	createConfTabler += '</select>';
	
	createConfTabledis += '<select name="district_sel" id="district_sel">';
	createConfTabledis += '<option value="0"> Select District</option>';
	
	createConfTabledis += '</select>';
	createConfTablet += '<select name="talque_sel" id="talque_sel">';
	createConfTablet += '<option value="0"> Select Taluq</option>';
	
	createConfTablet += '</select>';
	createConfTablegp += '<select id="gp_sel">';
	createConfTablegp += '<option value="0">Select Gram Panchayat</option>';
	createConfTablegp += '</select>';
	
	createConfTablemp += '<select name="mp_sel" id="mp_sel">';
	createConfTablemp += '<option value="0"> Select MP</option>';
	
	createConfTablemp += '</select>';
	createConfTablemla += '<select name="mla_sel" id="mla_sel">';
	createConfTablemla += '<option value="0"> Select MLA</option>';
	createConfTablemla += '</select>';
	document.getElementById("select_station").innerHTML = createConfTable;
	document.getElementById("select_circle").innerHTML = createConfTablec;
	
	document.getElementById("select_division").innerHTML = createConfTabled;
	document.getElementById("select_sub").innerHTML = createConfTablesd;
	document.getElementById("select_section").innerHTML = createConfTableom;
	//document.getElementById("select_revenue").innerHTML = createConfTabler;
	/*document.getElementById("select_district").innerHTML = createConfTabledis;
	document.getElementById("taluq").innerHTML = createConfTablet;
	document.getElementById("gramPanchayat").innerHTML = createConfTablegp;
	document.getElementById("mp").innerHTML = createConfTablemp;
	document.getElementById("mla").innerHTML = createConfTablemla;*/
}
//feeder search data
function viewgetFeederSearchData(adata){
	//alert(adata);
	//var len = adata.data.SPS.length;
	var feedCount = adata.data.SPF.length;
	var lenz = adata.data.SPZ.length;
	/*var lenc = adata.data.SPC.length;
	var lend = adata.data.SPD.length;
	var lensd = adata.data.SPSD.length;
	var lenom = adata.data.SPOM.length;*/
	
	var createConfTable = '';
	var createConfTablef = '', createConfTablez, createConfTablec= '', createConfTabled = '', createConfTablesd = '', createConfTableom = '', createConfTabler= '', createConfTablet = '', createConfTabledis ='', createConfTablegp = '', createConfTablemp = '', createConfTablemla = '', createConfTables='';
	createConfTablez = '';
	
	createConfTablef += '<select id="sfeed_sel">';
	createConfTablef += '<option value="0">Select Feeder Category</option>';
	for(i = 0; i < feedCount; i++)
		createConfTablef += '<option value="'+adata.data.SPF[i].CategoryID+'">'+adata.data.SPF[i].CategoryName+'</option>';
	createConfTablef += '</select>';
	
	createConfTablez += '<select name="szone_sel" id="szone_sel" onchange="getStaionCircleFm();">';
	createConfTablez += '<option value="0"> Select Zone</option>';
	for(var j=0; j<lenz; j++)
		createConfTablez+= '<option value="'+adata.data.SPZ[j].GeoID+'">'+adata.data.SPZ[j].GeoName+'</option>';
	createConfTablez += '</select>';
	createConfTables += '<select name="station_sel" id="station_sel" >';
	createConfTables += '<option value="0"> Select Station</option>';
	
	createConfTables += '</select>';
	createConfTablec += '<select name="scircle_sel" id="scircle_sel" >';
	createConfTablec += '<option value="0"> Select Circle</option>';
	
	createConfTablec += '</select>';
	createConfTabled += '<select id="sdivision_sel">';
	createConfTabled += '<option value="0">Select Division</option>';
	
	createConfTabled += '</select>';
	
	createConfTablesd += '<select name="ssub_sel" id="ssub_sel">';
	createConfTablesd += '<option value="0"> Select Sub Division</option>';
	
	createConfTablesd += '</select>';
	
	createConfTableom += '<select id="ssection_sel" >';
	createConfTableom += '<option value="0">Select Section</option>';
	
	createConfTableom += '</select>';
	
	document.getElementById("search_station").innerHTML = createConfTables;
	document.getElementById("search_feeder").innerHTML = createConfTablef;
	document.getElementById("search_zone").innerHTML = createConfTablez;
	document.getElementById("search_circle").innerHTML = createConfTablec;
	document.getElementById("search_division").innerHTML = createConfTabled;
	document.getElementById("search_sub").innerHTML = createConfTablesd;
	document.getElementById("search_section").innerHTML = createConfTableom;
	
	//getHtConsumerSSel();
}

//Add Feeder maintenence in database
function add_feeder(){
		
		var feeder = document.getElementById("feeder").value;
		var feeder_scada = document.getElementById("feeder_scada").value;
		var feed_sel = document.getElementById("feed_sel").value;
		var station_sel = document.getElementById("station_sel").value;
		var compid = cmp_id;
		var zone_sel = document.getElementById("zone_sel").value;
		var circle_sel = parseInt(document.getElementById("circle_sel").value);
		var division_sel = document.getElementById("division_sel").value;
		var sub_sel = document.getElementById("sub_sel").value;
		var section_sel = document.getElementById("section_sel").value;
		var revenue_sel = document.getElementById("revenue_sel").value;
		var district_sel = document.getElementById("district_sel").value;
		var talque_sel = parseInt(document.getElementById("talque_sel").value);
		var gp_sel = parseInt(document.getElementById("gp_sel").value);
		var mp_sel = parseInt(document.getElementById("mp_sel").value);
		var mla_sel = parseInt(document.getElementById("mla_sel").value);
		var batch_sel = document.getElementById("batch_sel").value;
		var month_sel = document.getElementById("month_sel").value;
		var crops_sel = document.getElementById("crops_sel").value;
		var capacity_sel = parseInt(document.getElementById("capacity_sel").value);

		console.log(feeder);
		console.log(feeder_scada);
		console.log(feed_sel);
		console.log(station_sel);
		console.log(compid);
		console.log(zone_sel);
		console.log(circle_sel);
		console.log(division_sel);
		console.log(sub_sel);
		console.log(batch_sel);
		console.log(month_sel);
		console.log(crops_sel);
		console.log(capacity_sel);

		if(!feeder)
		{
			alert("Feeder can not be left blank!");
			return;
		}
		if(!feeder_scada)
		{
			alert("Feeder Scada can not be left blank!");
			return;
		}
		
		if(!station_sel)
		{
			alert("Please select Station!");
			return;
		}
		
		if(!feed_sel)
		{
			alert("Please select Feeder Category!");
			return;
		}
		if(!zone_sel)
		{
			alert("Please select Zone!");
			return;
		}
		
		if(!circle_sel)
		{
			alert("Please select circle!!");
			return;
		}
	/*
		if(!batch_sel)
		{
			alert("Please Enter Batch!!");
			return;
		}
		if(!month_sel)
		{
			alert("Please Enter Months!!");
			return;
		}
		if(!crops_sel)
		{
			alert("Please Enter Crops!");
			return;
		}
		if(!capacity_sel)
		{
			alert("Please Enter Capicity!");
			return;
		}
	*/	
		/*if(!district_sel)
		{
			alert("Please select district!");
			return;
		}
		if(!talque_sel)
		{
			alert("Please select taluq!");
			return;
		}
		
		if(!gp_sel)
		{
			alert("Please select Gram Panchayat!!");
			return;
		}
		if(!mp_sel)
		{
			alert("Please select MP!!");
			return;
		}
		if(!mla_sel)
		{
			alert("Please Select MLA!!");
			return;
		}*/
		
		var JSONObject = new Object;
		JSONObject.jcase = "add_feeder";
		JSONObject.container = "";
		JSONObject.database = db_name;
		JSONObject.tablename = "tbl_company";
		
		JSONObject.query = "call sp_11kv_createfeederhierarchy("+feed_sel+","+zone_sel+","+circle_sel+","+division_sel+","+sub_sel+","+station_sel+","+mp_sel+","+mla_sel+","+district_sel+","+talque_sel+","+gp_sel+","+section_sel+","+revenue_sel+",'"+batch_sel+"','"+crops_sel+"','"+month_sel+"',null,'Y','"+capacity_sel+"','"+feeder+"','"+feeder_scada+"',"+compid+")";
		JSONstring = JSON.stringify(JSONObject);
		//document.getElementById("test_AddFM").innerHTML ="call sp_11kv_createfeederhierarchy("+feed_sel+","+zone_sel+","+circle_sel+","+division_sel+","+sub_sel+","+station_sel+","+mp_sel+","+mla_sel+","+district_sel+","+talque_sel+","+gp_sel+","+section_sel+","+revenue_sel+",'"+batch_sel+"','"+crops_sel+"','"+month_sel+"','"+capacity_sel+"','Y','','"+feeder+"','"+feeder_scada+"',"+compid+")";
		//document.getElementById(div_id).style.display="none";
		runAjax(parser_page,JSONstring);
	
}

//search feeder ps
function getFeederSearchData()
{
	var compid = cmp_id; //cmp_id
	var JSONObject = new Object;
	JSONObject.jcase = "getFeederSearchData";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	//JSONObject.querys = "call sp_mis_get_geoObjectsOfClass(7,null,"+compid+")";
	JSONObject.queryf = "call sp_mis_feedercategory()";
	JSONObject.queryz = "call sp_mis_get_geoObjectsOfClass(2,null,"+compid+")";
	/*JSONObject.queryc = "call sp_mis_get_geoObjectsOfClass(3,null,"+compid+")";
	JSONObject.queryd = "call sp_mis_get_geoObjectsOfClass(4,null,"+compid+")";
	JSONObject.querysd = "call sp_mis_get_geoObjectsOfClass(5,null,"+compid+")";
	JSONObject.queryom = "call sp_mis_get_geoObjectsOfClass(15,null,"+compid+")";*/
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("search_feeder").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

//search feeder
function search_feeder(){
	
	
	//alert(adata);
	var len = adata.data.SPS.length;
	var feedCount = adata.data.SPF.length;
	var lenz = adata.data.SPZ.length;
	var lenc = adata.data.SPC.length;
	var lend = adata.data.SPD.length;
	var lensd = adata.data.SPSD.length;
	var lenom = adata.data.SPOM.length;
	var lenr = adata.data.SPR.length;
	var lendis = adata.data.SPDIS.length;
	var lengp = adata.data.SPGP.length;
	var lent = adata.data.SPT.length;
	
	var lenmp = adata.data.SPMP.length;
	var lenmla = adata.data.SPMLA.length;
	var createConfTable = '';
	var createConfTablef = '', createConfTablez, createConfTablec= '', createConfTabled = '', createConfTablesd = '', createConfTableom = '', createConfTabler= '', createConfTablet = '', createConfTablet ='', createConfTabledis ='', createConfTablegp = '', createConfTablemp = '', createConfTablemla = '';
	createConfTablez = '';
	createConfTable += '<select id="station_sel" >';
	createConfTable += '<option value="0">All Station</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'">'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTablef += '<select id="feed_sel">';
	createConfTablef += '<option value="0">All Feeder</option>';
	for(i = 0; i < feedCount; i++)
		createConfTablef += '<option value="'+adata.data.SPF[i].GeoID+'">'+adata.data.SPF[i].GeoName+'</option>';
	createConfTablef += '</select>';
	
	createConfTablez += '<select name="zone_sel" id="zone_sel">';
	createConfTablez += '<option value="0"> All Zone</option>';
	for(var j=0; j<lenz; j++)
		createConfTablez+= '<option value="'+adata.data.SPZ[j].GeoID+'">'+adata.data.SPZ[j].GeoName+'</option>';
	createConfTablez += '</select>';
	createConfTablec += '<select name="circle_sel" id="circle_sel">';
	createConfTablec += '<option value="0"> All Circle</option>';
	for(i = 0; i < lenc; i++)
		createConfTablec += '<option value="'+adata.data.SPC[i].GeoID+'">'+adata.data.SPC[i].GeoName+'</option>';
	createConfTablec += '</select>';
	createConfTabled += '<select id="division_sel">';
	createConfTabled += '<option value="0">All Division</option>';
	for(i = 0; i < lend; i++)
		createConfTabled += '<option value="'+adata.data.SPD[i].GeoID+'">'+adata.data.SPD[i].GeoName+'</option>';
	createConfTabled += '</select>';
	
	createConfTablesd += '<select name="sub_sel" id="sub_sel">';
	createConfTablesd += '<option value="0"> All Sub Division</option>';
	for(var j=0; j<lensd; j++)
		createConfTablesd += '<option value="'+adata.data.SPSD[j].GeoID+'">'+adata.data.SPSD[j].GeoName+'</option>';
	createConfTablesd += '</select>';
	
	
	createConfTableom += '<select id="section_sel" >';
	createConfTableom += '<option value="0">All Section</option>';
	for(i = 0; i < lenom; i++)
		createConfTableom += '<option value="'+adata.data.SPOM[i].GeoID+'">'+adata.data.SPOM[i].GeoName+'</option>';
	createConfTableom += '</select>';
	createConfTabler += '<select id="revenue_sel">';
	createConfTabler += '<option value="0">All Revenue Area</option>';
	for(i = 0; i < lenr; i++)
		createConfTabler += '<option value="'+adata.data.SPR[i].GeoID+'">'+adata.data.SPR[i].GeoName+'</option>';
	createConfTabler += '</select>';
	
	createConfTabledis += '<select name="district_sel" id="district_sel">';
	createConfTabledis += '<option value="0"> All District</option>';
	for(var j=0; j<lendis; j++)
		createConfTabledis+= '<option value="'+adata.data.SPDIS[j].GeoID+'">'+adata.data.SPDIS[j].GeoName+'</option>';
	createConfTabledis += '</select>';
	createConfTablet += '<select name="talque_sel" id="talque_sel">';
	createConfTablet += '<option value="0"> All Talque</option>';
	for(i = 0; i < lent; i++)
		createConfTablet += '<option value="'+adata.data.SPT[i].GeoID+'">'+adata.data.SPT[i].GeoName+'</option>';
	createConfTablet += '</select>';
	createConfTablegp += '<select id="gp_sel">';
	createConfTablegp += '<option value="0">All Gram Panchayat</option>';
	for(i = 0; i < lengp; i++)
		createConfTablegp += '<option value="'+adata.data.SPGP[i].GeoID+'">'+adata.data.SPGP[i].GeoName+'</option>';
	createConfTablegp += '</select>';
	
	createConfTablemp += '<select name="mp_sel" id="mp_sel">';
	createConfTablemp += '<option value="0"> All MP</option>';
	for(var j=0; j<lenmp; j++)
		createConfTablemp += '<option value="'+adata.data.SPMP[j].GeoID+'">'+adata.data.SPMP[j].GeoName+'</option>';
	createConfTablemp += '</select>';
	createConfTablemla += '<select name="mla_sel" id="mla_sel">';
	createConfTablemla += '<option value="0"> All MLA</option>';
	for(var j=0; j<lenmla; j++)
		createConfTablemla += '<option value="'+adata.data.SPMLA[j].GeoID+'">'+adata.data.SPMLA[j].GeoName+'</option>';
	createConfTablemla += '</select>';
	
	document.getElementById("select_station").innerHTML = createConfTable;
	document.getElementById("select_feeder").innerHTML = createConfTablef;
	document.getElementById("select_zone").innerHTML = createConfTablez;
	document.getElementById("select_circle").innerHTML = createConfTablec;
	document.getElementById("select_division").innerHTML = createConfTabled;
	document.getElementById("select_sub").innerHTML = createConfTablesd;
	document.getElementById("select_section").innerHTML = createConfTableom;
	document.getElementById("select_revenue").innerHTML = createConfTabler;
	document.getElementById("select_district").innerHTML = createConfTabledis;
	document.getElementById("taluq").innerHTML = createConfTablet;
	document.getElementById("gramPanchayat").innerHTML = createConfTablegp;
	document.getElementById("mp").innerHTML = createConfTablemp;
	document.getElementById("mla").innerHTML = createConfTablemla;
	
	//getHtConsumerSSel();
}

//search feeder maintanence
function searchFeederM()
{
	var compid = cmp_id;
	var station = parseInt(document.getElementById("station_sel").value);
	var feeder = parseInt(document.getElementById("sfeed_sel").value);
	var zonevl = parseInt(document.getElementById("szone_sel").value);
	var scircle_sel = parseInt(document.getElementById("scircle_sel").value);
	var ssection_sel = parseInt(document.getElementById("ssection_sel").value);
	//var cat_sel = parseInt(document.getElementById("cat_sel").value);
	var sdivision_sel = parseInt(document.getElementById("sdivision_sel").value);
	var ssub_sel = parseInt(document.getElementById("ssub_sel").value);
	var parentclass_id=0;
	var parentgeo_id=0;
	if(document.getElementById('station_check').checked) {
		//alert("stationds");
	  if(station!=0){
		parentgeo_id = station;
		parentclass_id = 7;
	  }
	}
	else{
		//alert("circle");
		  if(ssection_sel!=0){
			parentgeo_id = ssection_sel;
			parentclass_id = 15;
		}
		else if(ssub_sel!=0){
			parentgeo_id = ssub_sel;
			parentclass_id = 5;
		}
		else if(sdivision_sel!=0){
			parentgeo_id = sdivision_sel;
			parentclass_id = 4;
		}
		
		else if(scircle_sel!=0){
			parentgeo_id = scircle_sel;
			parentclass_id = 3;
		}
	}
	if(parentgeo_id==0){
		alert("Please select atleast one option to search within 2 boxes or choose correct option box");	
		return;
	}
	var JSONObject = new Object;
	JSONObject.jcase = "searchFeederM";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	//JSONObject.query = "call sp_getfeedersbycategoryandhierarchy_formaintenance('4','"+parentgeo_id+"','"+parentclass_id+"',"+compid+","+0+")";
	JSONObject.query = "call sp_getfeedersbycategoryandhierarchy_formaintenance('4','"+parentgeo_id+"','"+parentclass_id+"',"+compid+","+feeder+")";
	//JSONObject.query = "call sp_getfeedersbycategoryandhierarchy_formaintenance('4','"+parentgeo_id+"','"+parentclass_id+"',"+compid+","+feeder+")";
	//JSONObject.query = "call sp_11kv_searchhtconsumers(1,'Puram, ','C1HT3',11,373,1761, 2488)";
	JSONstring = JSON.stringify(JSONObject);
	//document.getElementById("body_main_pane_view").innerHTML = "call sp_getfeedersbycategoryandhierarchy_formaintenance('4','"+parentgeo_id+"','"+parentclass_id+"',"+compid+","+feeder+")";
	document.getElementById("body_main_pane_view").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

//search data from feeder maintanence
/*function viewsearchHtConsumer(adata)
{
	var len = adata.data.length;
	var createConfTable = '';
	var feeder_id = document.getElementById("feed_sel").value;
	createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
		createConfTable += '<thead>';
		
			createConfTable += '<tr>';
			
			createConfTable += '<th>NAME/ADDRESS</th>';
			createConfTable += '<th>RR CODE</th>';
			createConfTable += '<th>CONTRACT DEMAND In KVA</th>';
			createConfTable += '<th>HT. VOLTAGE CLASS In KV</th>';
			createConfTable += '<th>TARIFF</th>';
			createConfTable += '<th>INSTALLATION TYPE</th>';
			createConfTable += '<th>EMAIL ADDRESS</th>';
			createConfTable += '<th>MOBILE NUMBER</th>';
			createConfTable += '<th>ALTERNATE NUMBER</th>';
			
			createConfTable += '<th>STATION NAME</th>';
			createConfTable += '<th>FEEDER</th>';
			createConfTable += '<th>&nbsp;</th>';
			createConfTable += '<th>&nbsp;</th>';
			createConfTable += '</tr>';
			
		createConfTable += '</thead>';
		
		createConfTable += '<tbody>';
		
		for(i = 0; i < len; i++)
		{
			createConfTable += '<tr class="odd" id="htconsumer'+adata.data[i].ID+'">';
			createConfTable += '<td>'+setNulltoEmpty(adata.data[i].NAMEADDRESS)+'</td>';
			createConfTable += '<td>'+setNulltoEmpty(adata.data[i].RR)+'</td>';
			createConfTable += '<td>'+setNulltoEmpty(adata.data[i].CONTRACTDEMANDKVA)+'</td>';
			createConfTable += '<td>'+setNulltoEmpty(adata.data[i].VOLTAGECLASSKV)+'</td>';
			createConfTable += '<td>'+setNulltoEmpty(adata.data[i].TARIFF)+'</td>';
			createConfTable += '<td>'+setNulltoEmpty(adata.data[i].INSTALLATIONTYPE)+'</td>';
			createConfTable += '<td>'+setNulltoEmpty(adata.data[i].EMAIL)+'</td>';
			createConfTable += '<td>'+setNulltoEmpty(adata.data[i].mobile1)+'</td>';
			createConfTable += '<td>'+setNulltoEmpty(adata.data[i].mobile2)+'</td>';
			createConfTable += '<td>'+setNulltoEmpty(adata.data[i].STATION)+'</td>';
			createConfTable += '<td>'+setNulltoEmpty(adata.data[i].FEEDER_NAME)+'</td>';
			
			createConfTable += '<td><input type="button" value="Edit" onclick="edit_htConsumer_data(\'htconsumer'+setNulltoEmpty(adata.data[i].ID)+'\',\''+setNulltoEmpty(adata.data[i].ID)+'\'\,\''+setNulltoEmpty(escape(adata.data[i].NAMEADDRESS))+'\',\''+setNulltoEmpty(adata.data[i].RR)+'\'\,\''+setNulltoEmpty(adata.data[i].CONTRACTDEMANDKVA)+'\'\,\''+setNulltoEmpty(adata.data[i].VOLTAGECLASSKV)+'\',\''+setNulltoEmpty(adata.data[i].TARIFF)+'\'\,\''+setNulltoEmpty(adata.data[i].INSTALLATIONTYPE)+'\'\,\''+setNulltoEmpty(adata.data[i].EMAIL)+'\'\,\''+setNulltoEmpty(adata.data[i].mobile1)+'\',\''+setNulltoEmpty(adata.data[i].mobile2)+'\'\,\''+setNulltoEmpty(adata.data[i].STATION)+'\'\,\''+setNulltoEmpty(escape(adata.data[i].FEEDER_NAME))+'\'\);"></td>';
			createConfTable += '<td><input type="button" value="Delete" onclick="del_htConsumer(\'htconsumer'+setNulltoEmpty(adata.data[i].ID)+'\','+setNulltoEmpty(adata.data[i].ID)+');">';
			
			createConfTable += '</td>';
			
			createConfTable += '</tr>';
		
		}
		createConfTable += '</tbody>';
		
	createConfTable += '</table>';
	
	document.getElementById("body_main_pane_view").innerHTML = createConfTable;
}*/
var feederObjectEdit = null;
function viewsearchFeederM(adata)
{
	var len = adata.data.length;
	var createConfTable = '';
	var feeder_id = document.getElementById("sfeed_sel").value;
	createConfTable += '<div style="width:100%;overflow:auto;"><table class="table table-striped table-bordered dTableR dataTable">';
		createConfTable += '<thead>';
		
			createConfTable += '<tr>';
			
			createConfTable += '<th>&nbsp;</th>';
			createConfTable += '<th>&nbsp;</th>';
			createConfTable += '<th>Station</th>';
			createConfTable += '<th>Feeder Name</th>';
			//createConfTable += '<th>CONTRACT DEMAND In KVA</th>';
			createConfTable += '<th>Scada</th>';
			createConfTable += '<th>District</th>';
			createConfTable += '<th>Taluq </th>';
			createConfTable += '<th>Zone</th>';
			createConfTable += '<th>Circle</th>';
			createConfTable += '<th>Division</th>';
			
			createConfTable += '<th>Sub DIvision</th>';
			createConfTable += '<th>O &amp; M Section</th>';
			//createConfTable += '<th>Feeder Shut Down Group</th>';
			createConfTable += '<th>Revenue Area </th>';
			createConfTable += '<th>District</th>';
			createConfTable += '<th>Taluq</th>';
			createConfTable += '<th>Gram Panchayat</th>';
			createConfTable += '<th>MP</th>';
			createConfTable += '<th>MLA</th>';
			createConfTable += '</tr>';
			
		createConfTable += '</thead>';
		
		createConfTable += '<tbody>';
		feederObjectEdit = adata;
		//print()
		if(len>0){
			for(i = 0; i < len; i++)
			{
				createConfTable += '<tr class="odd" id="feeder'+adata.data[i].Class8GeoID+'">';
				createConfTable += '<td><input type="button" value="Edit" onclick="edit_FeederM_data(\'feederm'+setNulltoEmpty(adata.data[i].Class8GeoID)+'\',\''+setNulltoEmpty(adata.data[i].Class8GeoID)+'\'\,\''+setNulltoEmpty(escape(adata.data[i].STATION))+'\',\''+setNulltoEmpty(adata.data[i].FEEDER_NAME)+'\'\,\''+setNulltoEmpty(adata.data[i].SCADA_11_kV_SUMMARY)+'\'\,\''+setNulltoEmpty(adata.data[i].DISTRICT)+'\',\''+setNulltoEmpty(adata.data[i].TALUQ)+'\'\,\''+setNulltoEmpty(adata.data[i].ZONE)+'\'\,\''+setNulltoEmpty(adata.data[i].CIRCLE)+'\'\,\''+setNulltoEmpty(adata.data[i].DIVISION)+'\',\''+setNulltoEmpty(adata.data[i].SUB_DIVISION)+'\'\,\''+setNulltoEmpty(adata.data[i].ONM_SECTION)+'\'\,\''+setNulltoEmpty(escape(adata.data[i].FEEDER_SHUTDOWN_GROUP))+'\'\,\''+setNulltoEmpty(escape(adata.data[i].RevArea))+'\'\,\''+setNulltoEmpty(escape(adata.data[i].GRAMPANCHAYATS))+'\'\,\''+setNulltoEmpty(escape(adata.data[i].MPCONSTITUENCY))+'\'\,\''+setNulltoEmpty(escape(adata.data[i].MLACONSTITUENCY))+'\'\,\''+setNulltoEmpty(adata.data[i].FeederID)+'\'\,'+i+');"></td>';
				createConfTable += '<td><input type="button" value="Delete" onclick="del_FeederM(\'feeder'+setNulltoEmpty(adata.data[i].Class8GeoID)+'\','+setNulltoEmpty(adata.data[i].Class8GeoID)+');">';
				
				createConfTable += '</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].STATION)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].FEEDER_NAME)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].SCADA_11_kV_SUMMARY)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].DISTRICT)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].TALUQ)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].ZONE)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].CIRCLE)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].DIVISION)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].SUB_DIVISION)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].ONM_SECTION)+'</td>';
				//createConfTable += '<td>'+setNulltoEmpty(adata.data[i].FEEDER_SHUTDOWN_GROUP)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].RevArea)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].DISTRICT)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].TALUQ)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].GRAMPANCHAYATS)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].MPCONSTITUENCY)+'</td>';
				createConfTable += '<td>'+setNulltoEmpty(adata.data[i].MLACONSTITUENCY)+'</td>';				
				createConfTable += '</tr>';
			
			}
		}
		else{
			createConfTable += '<tr><td colspan="18" align="center" style="text-align: center;">No Data Found Here</td></tr>';
		}
		createConfTable += '</tbody>';
		
	createConfTable += '</table>';
	createConfTable += '<input type="hidden" id="station_hid" ><input type="hidden"  id="circle_hid"><input type="hidden"  id="division_hid"><input type="hidden"  id="sub_hid"><input type="hidden"  id="section_hid"><input type="hidden"  id="revenue_hid"><input type="hidden"  id="district_hid"><input type="hidden"  id="talqu_hid"><input type="hidden"  id="gp_hid"><input type="hidden" id="mp_hid"></div><input type="hidden"  id="mla_hid"><input type="hidden"  id="crops_hid"><input type="hidden"  id="capacity_hid"><input type="hidden" id="months_hid"></div><input type="hidden"  id="batch_hid"></div>';
	document.getElementById("body_main_pane_view").innerHTML = createConfTable;
}

// get Staion and Circle  for Feeder maintanence
function getStaionCircleFm() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("szone_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "getStaionCircleFm";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"',2,7,null,"+compid+")";
	
	JSONObject.queryc = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"',2,3,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("search_station").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	document.getElementById("search_circle").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function viewgetStaionCircleFm(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	var lenc = adata.data.SPC.length;

	var createConfTable = '', createConfTabled='', createConfTablesd='', createConfTableom='';
	var createConfTablec = '';
	
	createConfTable += '<select id="station_sel" >';
	createConfTable += '<option value="0">Select Station</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'">'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	createConfTablec += '<select name="scircle_sel" id="scircle_sel"  onchange="getDivisionFm();">';
	createConfTablec += '<option value="0"> Select Circle</option>';
	for(i = 0; i < lenc; i++)
		createConfTablec += '<option value="'+adata.data.SPC[i].GeoID+'">'+adata.data.SPC[i].GeoName+'</option>';
	createConfTablec += '</select>';
	
	createConfTabled += '<select id="sdivision_sel">';
	createConfTabled += '<option value="0">Select Division</option>';
	
	createConfTabled += '</select>';
	
	createConfTablesd += '<select name="ssub_sel" id="ssub_sel">';
	createConfTablesd += '<option value="0"> Select Sub Division</option>';
	
	createConfTablesd += '</select>';
	
	createConfTableom += '<select id="ssection_sel" >';
	createConfTableom += '<option value="0">Select Section</option>';
	
	createConfTableom += '</select>';
	
	document.getElementById("search_division").innerHTML = createConfTabled;
	document.getElementById("search_sub").innerHTML = createConfTablesd;
	document.getElementById("search_section").innerHTML = createConfTableom;
	document.getElementById("search_station").innerHTML = createConfTable;
	document.getElementById("search_circle").innerHTML = createConfTablec;

	
	//getHtConsumerSSel();
}

// get Staion and Circle  for Feeder maintanence
function getSectionFm() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("szone_sel").value;
	var geoId = document.getElementById("ssub_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "getSectionFm";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	//JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"','"+geoId+"',15,null,"+compid+")";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+5+"',15,null,"+compid+")";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("search_section").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewgetSectionFm(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	
	var createConfTable = '';
	
	createConfTable += '<select id="ssection_sel" >';
	createConfTable += '<option value="0">Select Section</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'">'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	document.getElementById("search_section").innerHTML = createConfTable;
	
}

// get Division  for Feeder maintanence
function getDivisionFm() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("szone_sel").value;
	var geoId = document.getElementById("scircle_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "getDivisionFm";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"',3,4,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("search_division").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewgetDivisionFm(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	
	var createConfTable = '', createConfTablesd = '', createConfTableom = '', createConfTabled = '';
	
	createConfTable += '<select id="sdivision_sel"  onchange="getSubDivisionFm();">';
	createConfTable += '<option value="0">Select Division</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'">'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	createConfTablesd += '<select name="ssub_sel" id="ssub_sel">';
	createConfTablesd += '<option value="0"> Select Sub Division</option>';
	
	createConfTablesd += '</select>';
	
	createConfTableom += '<select id="ssection_sel" >';
	createConfTableom += '<option value="0">Select Section</option>';
	
	createConfTableom += '</select>';
	
	document.getElementById("search_sub").innerHTML = createConfTablesd;
	document.getElementById("search_section").innerHTML = createConfTableom;
	document.getElementById("search_division").innerHTML = createConfTable;
	
}

// get Division  for Feeder maintanence
function agetDivisionFm()
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("zone_sel").value;
	var geoId = document.getElementById("circle_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "agetDivisionFm";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+3+"',4,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("select_division").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	//document.getElementById("select_division").innerHTML = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+3+"',4,null,"+compid+")";
	runAjax(parser_page,JSONstring);
}

function viewagetDivisionFm(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	
	var createConfTable = '', createConfTablesd='', createConfTableom='', createConfTabler='', createConfTabledis='',createConfTablet='', createConfTablegp='', createConfTablemp='', createConfTablemla='';
	
	createConfTable += '<select id="division_sel"  onchange="agetSubDivisionFm();">';
	createConfTable += '<option value="0">Select Division</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'">'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTablesd += '<select name="sub_sel" id="sub_sel">';
	createConfTablesd += '<option value="0"> Select Sub Division</option>';
	
	createConfTablesd += '</select>';
	createConfTableom += '<select id="section_sel" >';
	createConfTableom += '<option value="0">Select Section</option>';
	
	createConfTableom += '</select>';
	createConfTabler += '<select id="revenue_sel">';
	createConfTabler += '<option value="0">Select Revenue Area</option>';
	
	createConfTabler += '</select>';
	
	createConfTabledis += '<select name="district_sel" id="district_sel">';
	createConfTabledis += '<option value="0"> Select District</option>';
	
	createConfTabledis += '</select>';
	createConfTablet += '<select name="talque_sel" id="talque_sel">';
	createConfTablet += '<option value="0"> Select Taluq</option>';
	
	createConfTablet += '</select>';
	createConfTablegp += '<select id="gp_sel">';
	createConfTablegp += '<option value="0">Select Gram Panchayat</option>';
	createConfTablegp += '</select>';
	
	createConfTablemp += '<select name="mp_sel" id="mp_sel">';
	createConfTablemp += '<option value="0"> Select MP</option>';
	
	createConfTablemp += '</select>';
	createConfTablemla += '<select name="mla_sel" id="mla_sel">';
	createConfTablemla += '<option value="0"> Select MLA</option>';
	createConfTablemla += '</select>';
	document.getElementById("select_division").innerHTML = createConfTable;
	document.getElementById("select_sub").innerHTML = createConfTablesd;
	document.getElementById("select_section").innerHTML = createConfTableom;
	
	
}


// get Sub Division  for Feeder maintanence
function getSubDivisionFm() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("szone_sel").value;
	var geoId = document.getElementById("sdivision_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "getSubDivisionFm";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"',4,5,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("search_sub").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewgetSubDivisionFm(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	
	var createConfTable = '', createConfTableom = '';
	
	createConfTable += '<select id="ssub_sel" onchange="getSectionFm();">';
	createConfTable += '<option value="0">Select Sub Division</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'">'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTableom += '<select id="ssection_sel" >';
	createConfTableom += '<option value="0">Select Section</option>';
	
	createConfTableom += '</select>';	
	document.getElementById("search_section").innerHTML = createConfTableom;
	document.getElementById("search_sub").innerHTML = createConfTable;
	//getSectionFm();
}

// get Sub Division  for Feeder maintanence
function agetSubDivisionFm() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("zone_sel").value;
	var geoId = document.getElementById("division_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "agetSubDivisionFm";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+4+"',5,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("select_sub").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewagetSubDivisionFm(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	
	var createConfTable = '', createConfTableom='', createConfTabler = '', createConfTabledis = '', createConfTablet = '', createConfTablegp = '', createConfTablemp = '', createConfTablemla = '';
	
	createConfTable += '<select id="sub_sel" onchange="agetSectionFm();" >';
	createConfTable += '<option value="0">Select Sub Division</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'">'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTableom += '<select id="section_sel" >';
	createConfTableom += '<option value="0">Select Section</option>';
	
	createConfTableom += '</select>';
	createConfTabler += '<select id="revenue_sel">';
	createConfTabler += '<option value="0">Select Revenue Area</option>';
	
	createConfTabler += '</select>';
	
	createConfTabledis += '<select name="district_sel" id="district_sel">';
	createConfTabledis += '<option value="0"> Select District</option>';
	
	createConfTabledis += '</select>';
	createConfTablet += '<select name="talque_sel" id="talque_sel">';
	createConfTablet += '<option value="0"> Select Taluq</option>';
	
	createConfTablet += '</select>';
	createConfTablegp += '<select id="gp_sel">';
	createConfTablegp += '<option value="0">Select Gram Panchayat</option>';
	createConfTablegp += '</select>';
	
	createConfTablemp += '<select name="mp_sel" id="mp_sel">';
	createConfTablemp += '<option value="0"> Select MP</option>';
	
	createConfTablemp += '</select>';
	createConfTablemla += '<select name="mla_sel" id="mla_sel">';
	createConfTablemla += '<option value="0"> Select MLA</option>';
	createConfTablemla += '</select>';
	
	document.getElementById("select_section").innerHTML = createConfTableom;
	
	document.getElementById("select_sub").innerHTML = createConfTable;
	
}

function agetSectionFm() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("zone_sel").value;
	var geoId = document.getElementById("sub_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "agetSectionFm";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+5+"',15,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("select_section").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewagetSectionFm(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	
	var createConfTable = '', createConfTableom='', createConfTabler = '', createConfTabledis = '', createConfTablet = '', createConfTablegp = '', createConfTablemp = '', createConfTablemla = '';
	
	/*onchange="agetRevenue();" */
	createConfTable += '<select id="section_sel" >';
	createConfTable += '<option value="0">Select Section</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'">'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTabler += '<select id="revenue_sel">';
	createConfTabler += '<option value="0">Select Revenue Area</option>';
	
	createConfTabler += '</select>';
	
	createConfTabledis += '<select name="district_sel" id="district_sel">';
	createConfTabledis += '<option value="0"> Select District</option>';
	
	createConfTabledis += '</select>';
	createConfTablet += '<select name="talque_sel" id="talque_sel">';
	createConfTablet += '<option value="0"> Select Taluq</option>';
	
	createConfTablet += '</select>';
	createConfTablegp += '<select id="gp_sel">';
	createConfTablegp += '<option value="0">Select Gram Panchayat</option>';
	createConfTablegp += '</select>';
	
	createConfTablemp += '<select name="mp_sel" id="mp_sel">';
	createConfTablemp += '<option value="0"> Select MP</option>';
	
	createConfTablemp += '</select>';
	createConfTablemla += '<select name="mla_sel" id="mla_sel">';
	createConfTablemla += '<option value="0"> Select MLA</option>';
	createConfTablemla += '</select>';
	
	document.getElementById("select_section").innerHTML = createConfTable;
}
//add get revenue
function agetRevenue() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("zone_sel").value;
	var geoId = document.getElementById("section_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "agetRevenue";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+15+"',16,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("select_revenue").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewagetRevenue(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	
	var createConfTable = '', createConfTableom='', createConfTabler = '', createConfTabledis = '', createConfTablet = '', createConfTablegp = '', createConfTablemp = '', createConfTablemla = '';
	
	createConfTable += '<select id="revenue_sel" onchange="agetDistrict();" >';
	createConfTable += '<option value="0">Select Revenue Area</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'">'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTabledis += '<select name="district_sel" id="district_sel">';
	createConfTabledis += '<option value="0"> Select District</option>';
	
	createConfTabledis += '</select>';
	createConfTablet += '<select name="talque_sel" id="talque_sel">';
	createConfTablet += '<option value="0"> Select Taluq</option>';
	
	createConfTablet += '</select>';
	createConfTablegp += '<select id="gp_sel">';
	createConfTablegp += '<option value="0">Select Gram Panchayat</option>';
	createConfTablegp += '</select>';
	
	createConfTablemp += '<select name="mp_sel" id="mp_sel">';
	createConfTablemp += '<option value="0"> Select MP</option>';
	
	createConfTablemp += '</select>';
	createConfTablemla += '<select name="mla_sel" id="mla_sel">';
	createConfTablemla += '<option value="0"> Select MLA</option>';
	createConfTablemla += '</select>';
	
	document.getElementById("select_district").innerHTML = createConfTabledis;
	document.getElementById("taluq").innerHTML = createConfTablet;
	document.getElementById("gramPanchayat").innerHTML = createConfTablegp;
	document.getElementById("mp").innerHTML = createConfTablemp;
	document.getElementById("mla").innerHTML = createConfTablemla;
	document.getElementById("select_revenue").innerHTML = createConfTable;
}

function agetDistrict() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("zone_sel").value;
	var geoId = document.getElementById("revenue_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "agetDistrict";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+16+"',12,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("select_district").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewagetDistrict(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	
	var createConfTable = '', createConfTableom='', createConfTabler = '', createConfTabledis = '', createConfTablet = '', createConfTablegp = '', createConfTablemp = '', createConfTablemla = '';
	
	createConfTable += '<select id="district_sel" onchange="agetTalque();" >';
	createConfTable += '<option value="0">Select District </option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'">'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTablet += '<select name="talque_sel" id="talque_sel">';
	createConfTablet += '<option value="0"> Select Taluq</option>';
	createConfTablet += '</select>';
	createConfTablegp += '<select id="gp_sel">';
	createConfTablegp += '<option value="0">Select Gram Panchayat</option>';
	createConfTablegp += '</select>';
	
	
	document.getElementById("taluq").innerHTML = createConfTablet;
	document.getElementById("gramPanchayat").innerHTML = createConfTablegp;
	
	document.getElementById("select_district").innerHTML = createConfTable;
}

function agetTalque() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("zone_sel").value;
	var geoId = document.getElementById("district_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "agetTalque";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+12+"',13,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("taluq").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewagetTalque(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	
	var createConfTable = '', createConfTableom='', createConfTabler = '', createConfTabledis = '', createConfTablet = '', createConfTablegp = '', createConfTablemp = '', createConfTablemla = '';
	
	createConfTable += '<select id="talque_sel" onchange="agetGP();" >';
	createConfTable += '<option value="0">Select Taluq</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'">'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTablegp += '<select id="gp_sel">';
	createConfTablegp += '<option value="0">Select Gram Panchayat</option>';
	createConfTablegp += '</select>';
	
	createConfTablemp += '<select name="mp_sel" id="mp_sel">';
	createConfTablemp += '<option value="0"> Select MP</option>';
	
	createConfTablemp += '</select>';
	createConfTablemla += '<select name="mla_sel" id="mla_sel">';
	createConfTablemla += '<option value="0"> Select MLA</option>';
	createConfTablemla += '</select>';
	
	document.getElementById("gramPanchayat").innerHTML = createConfTablegp;
	
	document.getElementById("taluq").innerHTML = createConfTable;
}

function agetGP() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("zone_sel").value;
	var geoId = document.getElementById("talque_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "agetGP";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+13+"',14,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("gramPanchayat").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewagetGP(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	
	var createConfTable = '', createConfTabler = '', createConfTabledis = '', createConfTablet = '', createConfTablegp = '', createConfTablemp = '', createConfTablemla = '';
	
	createConfTable += '<select id="gp_sel" >';//onchange="agetMP();" 
	createConfTable += '<option value="0">Select Gram Panchayat</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'">'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTablemp += '<select name="mp_sel" id="mp_sel">';
	createConfTablemp += '<option value="0"> Select MP</option>';
	
	createConfTablemp += '</select>';
	createConfTablemla += '<select name="mla_sel" id="mla_sel">';
	createConfTablemla += '<option value="0"> Select MLA</option>';
	createConfTablemla += '</select>';
	
	//document.getElementById("mp").innerHTML = createConfTablemp;
	document.getElementById("mla").innerHTML = createConfTablemla;
	document.getElementById("gramPanchayat").innerHTML = createConfTable;
}

function agetMP() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("zone_sel").value;
	var geoId = document.getElementById("gp_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "agetMP";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+14+"',9,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("mp").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewagetMP(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	
	var createConfTable = '', createConfTablemla = '';
	
	createConfTable += '<select id="mp_sel" onchange="agetMLA();" >';
	createConfTable += '<option value="0">Select MP</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'">'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTablemla += '<select name="mla_sel" id="mla_sel">';
	createConfTablemla += '<option value="0"> Select MLA</option>';
	createConfTablemla += '</select>';
	
	document.getElementById("mla").innerHTML = createConfTablemla;
	document.getElementById("mp").innerHTML = createConfTable;
}

function agetMLA() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("zone_sel").value;
	var geoId = document.getElementById("mp_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "agetMLA";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+9+"',10,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("mla").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewagetMLA(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	
	var createConfTable = '';
	
	createConfTable += '<select id="mla_sel" onchange="" >';
	createConfTable += '<option value="0">Select MLA</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'">'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	document.getElementById("mla").innerHTML = createConfTable;
}

//edit ht consumer
function edit_FeederM_data(div_id,id, station, name, scada,district, taluq, zone, circle, division, sub_division, om_section, down_group,RevArea, gram, mp, mla,feeder,idx){
	
		var compid = cmp_id;
		//var zone_id = parseInt(document.getElementById("szone_sel").value);
//		var station_id = parseInt(document.getElementById("station").value);
		document.getElementById("station_hid").value = feederObjectEdit.data[idx].Class7GeoID;
		document.getElementById("circle_hid").value = feederObjectEdit.data[idx].Class3GeoID;
		document.getElementById("division_hid").value = feederObjectEdit.data[idx].Class4GeoID;
		document.getElementById("sub_hid").value = feederObjectEdit.data[idx].Class5GeoID;
		document.getElementById("section_hid").value = feederObjectEdit.data[idx].Class15GeoID;
		document.getElementById("revenue_hid").value = feederObjectEdit.data[idx].Class16GeoID;
		document.getElementById("district_hid").value = feederObjectEdit.data[idx].Class12GeoID;
		document.getElementById("talqu_hid").value = feederObjectEdit.data[idx].Class13GeoID;
		document.getElementById("gp_hid").value = feederObjectEdit.data[idx].Class14GeoID;
		document.getElementById("mp_hid").value = feederObjectEdit.data[idx].Class9GeoID;
		document.getElementById("mla_hid").value = feederObjectEdit.data[idx].Class10GeoID;
		document.getElementById("batch_hid").value = feederObjectEdit.data[idx].BATCH;
		document.getElementById("months_hid").value = feederObjectEdit.data[idx].MONTHS;
		document.getElementById("crops_hid").value = feederObjectEdit.data[idx].CROPS;
		document.getElementById("capacity_hid").value = feederObjectEdit.data[idx].AmperageCapacity;
		var capacity = feederObjectEdit.data[idx].AmperageCapacity;
		var crops = feederObjectEdit.data[idx].CROPS;
		var months = feederObjectEdit.data[idx].MONTHS;
		var batch = feederObjectEdit.data[idx].BATCH;
		var createConfTable = '';
		
		var JSONObject = new Object;
		JSONObject.jcase = "edit_FeederM_data";
		JSONObject.container = "";
		JSONObject.database = db_name;
		JSONObject.tablename = "tbl_company";
		//createConfTable += '<div class="modal hide fade" id="myModalhte_edit">';
		createConfTable += '<div class="modal hide fade" id="myModalhte_edit" style="width:950px;left:39%">';
	createConfTable += '<div class="modal-header">';
		createConfTable += '<button class="close" data-dismiss="modal">×</button>';
		createConfTable += '<h3>Edit Feeder Maintanence</h3>';
	createConfTable += '</div><div id="test"></div>';
	createConfTable += '<div class="modal-body" id="">';
	
	createConfTable += '<table width="100%">';
		
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;">*</font><input class="UsrtextBox" type="text" name="name_edit" id="name_edit" value="'+name+'" placeholder="Feeder Name"></td>';
			createConfTable += '<td><div name="circle_edit" id="circle_edit" ><select><option>'+unescape(circle)+'</option></select></td>';
			createConfTable += '<td><div name="revenue_edit" id="revenue_edit" ><select name="edit_area" id="edit_area"><option value="0">Select Revenue</option>';
			createConfTable += '</select></div></td>';
			createConfTable += '<td><div name="mp_edit" id="mp_edit" ><select name="edit_mp" id="edit_mp"><option value="0">Select MP</option>';
			createConfTable += '</select></div></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><font style="color:#ff0000;visibility:hidden;">*</font><input class="UsrtextBox" type="text" name="scada_edit" id="scada_edit" value="'+scada+'" placeholder="Feeder Scada"></td>';
			createConfTable += '<td><div name="division_edit" id="division_edit" ><select name="edit_division" id="edit_division"><option value="0">Select Division</option>';
			createConfTable += '</select></div></td>';
			createConfTable += '<td><div name="district_edit" id="district_edit" ><select name="edit_district" id="edit_district"><option value="0">Select District</option>';
			createConfTable += '</select></div></td>';
			createConfTable += '<td class="usrFont" ><div id ="mla_edit"><select class="UsrtextBox" name="edit_mla" id="edit_mla"><option value="0">Select MLA</option></select></div></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			
			createConfTable += '<td><div name="feeder_edit" id="feeder_edit" ><select id="editfeeder_sel">'+feederObjectEdit.data[idx].FeederID+'<option>'+feederObjectEdit.data[idx].FEEDER_NAME+'</option></select></div></td>';
			createConfTable += '<td><div name="sub_division_edit" id="sub_division_edit" ><select name="edit_sub_division" id="edit_sub_division"><option value="0">Select Sub Division</option>';
			createConfTable += '</select></div></td>';
			createConfTable += '<td><div name="taluq_edit" id="taluq_edit" ><select name="edit_taluq" id="edit_taluq"><option value="0">Select Taluq</option>';
			createConfTable += '</select></div></td>';
			createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
		
			createConfTable += '<td><div name="zone_edit" id="zone_edit" ><select><option value="'+unescape(feederObjectEdit.data[idx].Class2GeoID)+'">'+unescape(feederObjectEdit.data[idx].ZONE)+'</option></select></div></td>';
			createConfTable += '<td><div name="section_edit" id="section_edit" ><select name="edit_section" id="edit_section"><option value="0">Select O&M Section</option>';
			createConfTable += '</select></div></td>';
			createConfTable += '<td><div name="gp_edit" id="gp_edit" ><select name="edit_gram" id="edit_gram"><option value="0">Select Gram Panchayat</option>';
			createConfTable += '</select></div></td>';
			createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			
			createConfTable += '<td><div name="station_edit" id="station_edit" ><select><option>'+unescape(station)+'</option></select></td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="edit_batch" id="edit_batch" value="'+batch+'" placeholder="Batch"></td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="edit_months" id="edit_months" value="'+months+'" placeholder="Months"></td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="edit_crops" id="edit_crops" value="'+crops+'" placeholder="Crops"></td>';
			createConfTable += '<td><input class="UsrtextBox" type="text" name="edit_capacity" id="edit_capacity" onkeypress="return isNumber(event,0,this)" value="'+capacity+'" placeholder="Capacity"></td>';
		createConfTable += '</tr>';
		createConfTable += '<tr>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';
	createConfTable += '</table>';
		
	createConfTable += '</div>';
	createConfTable += '<div class="modal-footer">';
		createConfTable += '<a href="javascript:edit_FeederM(\'divw\','+id+');" class="btn"="modal"="">Submit</a>';
		createConfTable += '<a href="#" class="btn" data-dismiss="modal">Close</a>';
	createConfTable += '</div><a data-toggle="modal" data-backdrop="static" href="#myModalhte_edit" class="" id="modal_a">&nbsp;</a>';
	createConfTable += '</div>';
		//document.getElementById("body_main_pane").appendChild(createConfTable);
		$("#body_main_pane").append(createConfTable);
		$("#modal_a").click();
		//egetFeederFSel();
		egetFeederMSel();
		//document.getElementById(div_id).style.display="none";
		//runAjax(parser_page,JSONstring);
	
}


//Edit Feeder Maintanence
function egetFeederMSel()
{
	var compid = cmp_id; //cmp_id
	var zonevl = document.getElementById("szone_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "egetFeederMSel";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	//JSONObject.query = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"',2,7,null,"+compid+")";
	JSONObject.query = "call sp_mis_feedercategory()";
	JSONObject.queryz = "call sp_mis_get_geoObjectsOfClass(2,null,"+compid+")";
	JSONObject.queryr = "call sp_mis_get_geoObjectsOfClass(16,null,"+compid+")";
	JSONObject.querymp = "call sp_mis_get_geoObjectsOfClass(9,null,"+compid+")";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("feeder_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	document.getElementById("zone_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	document.getElementById("revenue_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	document.getElementById("mp_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function viewegetFeederMSel(adata)
{
	var len = adata.data.SP.length;
	var lenz = adata.data.SPZ.length;
	var lenmp = adata.data.SPMP.length;
	var lenr = adata.data.SPR.length;
	var cur_feeder = document.getElementById("sfeed_sel").value;
	var cur_zone = document.getElementById("szone_sel").value;
	var cur_area = document.getElementById("revenue_hid").value;
	var cur_mp = document.getElementById("mp_hid").value;
	var createConfTable = '',createConfTablez = '', createConfTablemp='', createConfTabler='';
	createConfTable += '<select id="editfeeder_sel"  onchange="">';
	//createConfTable += '<option value="0">Select Feeder</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SP[i].CategoryID+'" '+(cur_feeder == adata.data.SP[i].CategoryID ? "selected"  : "" )+'>'+adata.data.SP[i].CategoryName+'</option>';
	createConfTable += '</select>';
	createConfTablez += '<select id="editzone_sel"  onchange="edit_getStaionCircleFm();">';
	//createConfTable += '<option value="0">Select Zone</option>';
	for(i = 0; i < lenz; i++)
		createConfTablez += '<option value="'+adata.data.SPZ[i].GeoID+'" '+(cur_zone == adata.data.SPZ[i].GeoID ? "selected"  : "" )+'>'+adata.data.SPZ[i].GeoName+'</option>';
	createConfTablez += '</select>';
	createConfTabler += '<select id="edit_area"  onchange="egetDistrict();">';
	createConfTabler += '<option value="0">Select Revenue Area</option>';
	for(var j=0; j<lenr; j++)
		createConfTabler+= '<option value="'+adata.data.SPR[j].GeoID+'" '+(cur_area == adata.data.SPR[j].GeoID ? "selected"  : "" )+'>'+adata.data.SPR[j].GeoName+'</option>';
	createConfTabler += '</select>';
	createConfTablemp += '<select id="edit_mp"  onchange="egetMLA();">';
	createConfTablemp += '<option value="0">Select MP</option>';
	for(var j=0; j<lenmp; j++)
		createConfTablemp+= '<option value="'+adata.data.SPMP[j].GeoID+'" '+(cur_mp == adata.data.SPMP[j].GeoID ? "selected"  : "" )+'>'+adata.data.SPMP[j].GeoName+'</option>';
	createConfTablemp += '</select>';
	document.getElementById("feeder_edit").innerHTML = createConfTable;
	document.getElementById("zone_edit").innerHTML = createConfTablez;
	document.getElementById("revenue_edit").innerHTML = createConfTabler;
	document.getElementById("mp_edit").innerHTML = createConfTablemp;
	egetStaionCircleFm();
}

// get edit Staion and Circle  for Feeder maintanence
function egetStaionCircleFm() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("editzone_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "egetStaionCircleFm";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"',2,7,null,"+compid+")";
	
	JSONObject.queryc = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"',2,3,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("station_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	document.getElementById("circle_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function viewegetStaionCircleFm(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	var lenc = adata.data.SPC.length;
	var cur_circle = document.getElementById("circle_hid").value;
	var cur_station = document.getElementById("station_hid").value;
	
	var createConfTable = '';
	var createConfTablec = '', createConfTabled='', createConfTablesd='', createConfTableom='';
	
	createConfTable += '<select id="estation_sel" >';
	createConfTable += '<option value="0">Select Station</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'" '+(cur_station == adata.data.SPS[i].GeoID ? "selected"  : "" )+'>'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	createConfTablec += '<select name="ecircle_sel" id="ecircle_sel"  onchange="edit_getDivisionFm();">';
	createConfTablec += '<option value="0"> Select Circle</option>';
	for(i = 0; i < lenc; i++)
		createConfTablec += '<option value="'+adata.data.SPC[i].GeoID+'" '+(cur_circle == adata.data.SPC[i].GeoID ? "selected"  : "" )+'>'+adata.data.SPC[i].GeoName+'</option>';
	createConfTablec += '</select>';
	
	createConfTabled += '<select id="edit_division">';
	createConfTabled += '<option value="0">Select Division</option>';
	
	createConfTabled += '</select>';
	
	createConfTablesd += '<select name="edit_sub_division" id="edit_sub_division">';
	createConfTablesd += '<option value="0"> Select Sub Division</option>';
	
	createConfTablesd += '</select>';
	
	createConfTableom += '<select id="edit_section" >';
	createConfTableom += '<option value="0">Select Section</option>';
	
	createConfTableom += '</select>';
	
	document.getElementById("division_edit").innerHTML = createConfTabled;
	document.getElementById("sub_division_edit").innerHTML = createConfTablesd;
	document.getElementById("section_edit").innerHTML = createConfTableom;
	
	document.getElementById("station_edit").innerHTML = createConfTable;
	document.getElementById("circle_edit").innerHTML = createConfTablec;

	egetDivisionFm();
	
}

//delete Feeder maintenence

function del_FeederM(div_id,id){
	if(confirm("Do you really want to delete this?"))	{
		var JSONObject = new Object;
		JSONObject.jcase = "del_FeederM";
		JSONObject.container = "";
		JSONObject.database = db_name;
		JSONObject.tablename = "tbl_company";
		
		JSONObject.query = "call sp_11kv_deletegeoobjects("+id+",8)";
		JSONstring = JSON.stringify(JSONObject);
		//document.getElementById("body_main_pane_view").innerHTML ="call sp_11kv_deletegeoobjects("+id+",8)";
		//document.getElementById("body_main_pane_view").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
		document.getElementById(div_id).style.display="none";
		runAjax(parser_page,JSONstring);
	}
	else return false;
}

// get Division  for Feeder maintanence
function egetDivisionFm() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("editzone_sel").value;
	var geoId = document.getElementById("ecircle_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "egetDivisionFm";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"',3,4,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("division_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewegetDivisionFm(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	var cur_division = document.getElementById("division_hid").value;
	var createConfTable = '', createConfTablesd='', createConfTableom='';
	
	createConfTable += '<select id="edit_division"  onchange="edit_getSubDivisionFm();">';
	createConfTable += '<option value="0">Select Division</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'" '+(cur_division == adata.data.SPS[i].GeoID ? "selected"  : "" )+'>'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTablesd += '<select name="edit_sub_division" id="edit_sub_division">';
	createConfTablesd += '<option value="0"> Select Sub Division</option>';
	
	createConfTablesd += '</select>';
	
	createConfTableom += '<select id="edit_section" >';
	createConfTableom += '<option value="0">Select Section</option>';
	
	createConfTableom += '</select>';
	
	document.getElementById("sub_division_edit").innerHTML = createConfTablesd;
	document.getElementById("section_edit").innerHTML = createConfTableom;
	document.getElementById("division_edit").innerHTML = createConfTable;
	egetSubDivisionFm();
}

// get Sub Division  for Feeder maintanence
function egetSubDivisionFm() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("szone_sel").value;
	var geoId = document.getElementById("edit_division").value;
	var JSONObject = new Object;
	JSONObject.jcase = "egetSubDivisionFm";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"',4,5,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("sub_division_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewegetSubDivisionFm(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	var cur_sub_div = document.getElementById("sub_hid").value;
	var createConfTable = '', createConfTableom='';
	
	createConfTable += '<select id="edit_sub_division" onchange="edit_getSectionFm();">';
	createConfTable += '<option value="0">Select Sub Division</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'" '+(cur_sub_div == adata.data.SPS[i].GeoID ? "selected"  : "" )+'>'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	createConfTableom += '<select id="edit_section" >';
	createConfTableom += '<option value="0">Select Section</option>';
	
	createConfTableom += '</select>';
	
	document.getElementById("section_edit").innerHTML = createConfTableom;
	document.getElementById("sub_division_edit").innerHTML = createConfTable;
	egetSectionFm();
}

// get edit section  for Feeder maintanence
function egetSectionFm() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("editzone_sel").value;
	var geoId = document.getElementById("edit_sub_division").value;
	var JSONObject = new Object;
	JSONObject.jcase = "egetSectionFm";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	//JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"','"+geoId+"',15,null,"+compid+")";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+5+"',15,null,"+compid+")";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("section_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewegetSectionFm(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	var cur_section = document.getElementById("section_hid").value;
	var createConfTable = '';
	
	createConfTable += '<select id="edit_section">';
	createConfTable += '<option value="0">Select Section</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'" '+(cur_section == adata.data.SPS[i].GeoID ? "selected"  : "" )+'>'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	document.getElementById("section_edit").innerHTML = createConfTable;
	//egetRevenueFm();
	egetDistrict();
}

//edit get revenue
function egetRevenueFm() 
{
	var compid = cmp_id; //cmp_id 
	//var zonevl = document.getElementById("zone_sel").value;
	var geoId = document.getElementById("edit_section").value;
	var JSONObject = new Object;
	JSONObject.jcase = "egetRevenueFm";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+15+"',16,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("revenue_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewegetRevenueFm(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	var cur_revenue = document.getElementById("revenue_hid").value;
	var createConfTable = '';
	
	createConfTable += '<select id="edit_area" onchange="egetDistrict();" >';
	createConfTable += '<option value="0">Select Revenue Area</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'" '+(cur_revenue == adata.data.SPS[i].GeoID ? "selected"  : "" )+'>'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	document.getElementById("revenue_edit").innerHTML = createConfTable;
	egetDistrict();
}

function egetDistrict() 
{
	var compid = cmp_id; //cmp_id 
	//var zonevl = document.getElementById("zone_sel").value;
	var geoId = document.getElementById("edit_area").value;
	var JSONObject = new Object;
	JSONObject.jcase = "egetDistrict";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+16+"',12,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("district_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewegetDistrict(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	var cur_value = document.getElementById("district_hid").value;
	var createConfTable = '', createConfTablet='', createConfTablegp='';
	
	createConfTable += '<select id="edit_district" onchange="egetTalque();" >';
	createConfTable += '<option value="0">Select District </option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'" '+(cur_value == adata.data.SPS[i].GeoID ? "selected"  : "" )+'>'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTablet += '<select name="edit_taluq" id="edit_taluq">';
	createConfTablet += '<option value="0"> Select Taluq</option>';
	createConfTablet += '</select>';
	createConfTablegp += '<select id="edit_gram">';
	createConfTablegp += '<option value="0">Select Gram Panchayat</option>';
	createConfTablegp += '</select>';
	
	
	document.getElementById("taluq_edit").innerHTML = createConfTablet;
	document.getElementById("gp_edit").innerHTML = createConfTablegp;
	document.getElementById("district_edit").innerHTML = createConfTable;
	egetTalque();
}

function egetTalque() 
{
	var compid = cmp_id; //cmp_id 
	//var zonevl = document.getElementById("zone_sel").value;
	var geoId = document.getElementById("edit_district").value;
	var JSONObject = new Object;
	JSONObject.jcase = "egetTalque";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+12+"',13,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("taluq_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewegetTalque(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	var cur_value = document.getElementById("talqu_hid").value;
	var createConfTable = '';
	
	createConfTable += '<select id="edit_taluq" onchange="egetGP();" >';
	createConfTable += '<option value="0">Select Taluq</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'" '+(cur_value == adata.data.SPS[i].GeoID ? "selected"  : "" )+'>'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	document.getElementById("taluq_edit").innerHTML = createConfTable;
	egetGP();
}

function egetGP() 
{
	var compid = cmp_id; //cmp_id 
	//var zonevl = document.getElementById("zone_sel").value;
	var geoId = document.getElementById("edit_taluq").value;
	var JSONObject = new Object;
	JSONObject.jcase = "egetGP";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+13+"',14,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("gp_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewegetGP(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	var cur_value = document.getElementById("gp_hid").value;
	
	var createConfTable = '';
	
	createConfTable += '<select id="edit_gram"  >';
	createConfTable += '<option value="0">Select Gram Panchayat</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'" '+(cur_value == adata.data.SPS[i].GeoID ? "selected"  : "" )+'>'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	document.getElementById("gp_edit").innerHTML = createConfTable;
	if(cur_value)
		egetMLA();
}

function egetMP() 
{
	var compid = cmp_id; //cmp_id 
	//var zonevl = document.getElementById("zone_sel").value;
	var geoId = document.getElementById("edit_gram").value;
	var JSONObject = new Object;
	JSONObject.jcase = "egetMP";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+14+"',9,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("mp_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewegetMP(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	var cur_value = document.getElementById("mp_hid").value;
	var createConfTable = '';
	
	createConfTable += '<select id="edit_mp" onchange="egetMLA();" >';
	createConfTable += '<option value="0">Select MP</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'" '+(cur_value == adata.data.SPS[i].GeoID ? "selected"  : "" )+'>'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	document.getElementById("mp_edit").innerHTML = createConfTable;
	if(cur_value)
		egetMLA();
}

function egetMLA() 
{
	var compid = cmp_id; //cmp_id 
	//var zonevl = document.getElementById("zone_sel").value;
	var geoId = document.getElementById("edit_mp").value;
	var JSONObject = new Object;
	JSONObject.jcase = "egetMLA";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+9+"',10,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("mla_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewegetMLA(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	var cur_value = document.getElementById("mla_hid").value;
	var createConfTable = '';
	
	createConfTable += '<select id="edit_mla" onchange="" >';
	createConfTable += '<option value="0">Select MLA</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'" '+(cur_value == adata.data.SPS[i].GeoID ? "selected"  : "" )+'>'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	document.getElementById("mla_edit").innerHTML = createConfTable;
}
//edit feeder
function edit_FeederM(div_id,id){
		
		var name = escape(document.getElementById("name_edit").value);
		var scada_edit = document.getElementById("scada_edit").value;
		var compid = cmp_id;
		var feeder_edit = document.getElementById("editfeeder_sel").value;
		var zone_edit = parseInt(document.getElementById("editzone_sel").value);
		var estation_sel = document.getElementById("estation_sel").value;
		var ecircle_sel = document.getElementById("ecircle_sel").value;
		var edit_division = document.getElementById("edit_division").value;
		var edit_sub_division = document.getElementById("edit_sub_division").value;
		var edit_section = document.getElementById("edit_section").value;
		var edit_area = parseInt(document.getElementById("edit_area").value);
		var edit_district = parseInt(document.getElementById("edit_district").value);
		var edit_taluq = document.getElementById("edit_taluq").value;
		var edit_gram = document.getElementById("edit_gram").value;
		var edit_mp = parseInt(document.getElementById("edit_mp").value);
		var edit_mla = parseInt(document.getElementById("edit_mla").value);
		var edit_batch = document.getElementById("edit_batch").value;
		var edit_months = document.getElementById("edit_months").value;
		var edit_crops = document.getElementById("edit_crops").value;
		var edit_capacity = parseInt(document.getElementById("edit_capacity").value);
		if(!name)
		{
			alert("Name can not be left blank!");
			return;
		}
		if(!scada_edit)
		{
			alert("Scada can not be left blank!");
			return;
		}
		if(!feeder_edit)
		{
			alert("Feeder can not be left blank!");
			return;
		}
		if(!zone_edit)
		{
			alert("Please select Zone!");
			return;
		}
		if(!estation_sel)
		{
			alert("Station can not be left blank!");
			return;
		}
		
		if(!ecircle_sel)
		{
			alert("Circle can not be blank!!");
			return;
		}
		if(!edit_division)
		{
			alert("Division can not be blank!!");
			return;
		}
		/*if(!validateEmail(email)){
			alert("Please enter valid Email!!");
			return;
		}*/
		if(!edit_sub_division)
		{
			alert("Sub Division can not be blank!!");
			return;
		}
		if(!edit_section)
		{
			alert("Please select Section!");
			return;
		}
		
		if(!edit_area)
		{
			alert("Please select Revenue Area!");
			return;
		}
		
		if(!edit_district)
		{
			alert("Please select District!");
			return;
		}
		
		if(!edit_taluq)
		{
			alert("Please select Talqu!");
			return;
		}
/*
		if(!edit_batch)
		{
			alert("Batch can not be left blank!");
			return;
		}
		if(!edit_months)
		{
			alert("Months can not be left blank!");
			return;
		}
		if(!edit_crops)
		{
			alert("Crops can not be left blank!");
			return;
		}
		if(!edit_capacity)
		{
			alert("Capicity can not be left blank!");
			return;
		}
*/
		var JSONObject = new Object;
		JSONObject.jcase = "edit_FeederM";
		JSONObject.container = "";
		JSONObject.database = db_name;
		JSONObject.tablename = "tbl_company";
		
		JSONObject.query = "call sp_11kv_updatefeederhierarchy("+id+","+feeder_edit+","+zone_edit+","+ecircle_sel+","+edit_division+",'"+edit_sub_division+"','"+estation_sel+"','"+edit_mp+"',"+edit_mla+",'"+edit_district+"',"+edit_taluq+","+edit_gram+",'"+edit_section+"',"+edit_area+",'"+edit_batch+"','"+edit_crops+"','"+edit_months+"','Y','"+edit_capacity+"','"+name+"','"+scada_edit+"')";
		JSONstring = JSON.stringify(JSONObject);
		//alert('');
		//document.getElementById("test").innerHTML = "call sp_11kv_updatefeederhierarchy("+id+","+feeder_edit+","+zone_edit+","+ecircle_sel+","+edit_division+","+edit_sub_division+","+estation_sel+","+edit_mp+","+edit_mla+",'"+edit_district+"',"+edit_taluq+","+edit_gram+",'"+edit_section+"',"+edit_area+",'"+edit_batch+"','"+edit_crops+"','"+edit_months+"','Y','"+edit_capacity+"','"+name+"','"+scada_edit+"')";
		//document.getElementById(div_id).style.display="none";
		//alert(JSONstring);
		runAjax(parser_page,JSONstring);
		//searchFeederM();
	
}

// get edit Staion and Circle  for Feeder maintanence
function edit_getStaionCircleFm() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("editzone_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "edit_getStaionCircleFm";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"',2,7,null,"+compid+")";
	
	JSONObject.queryc = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"',2,3,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("station_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	document.getElementById("circle_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function viewedit_getStaionCircleFm(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	var lenc = adata.data.SPC.length;
	var cur_circle = document.getElementById("circle_hid").value;
	var cur_station = document.getElementById("station_hid").value;
	
	var createConfTable = '';
	var createConfTablec = '', createConfTabled='', createConfTablesd='', createConfTableom='';
	
	createConfTable += '<select id="estation_sel" >';
	createConfTable += '<option value="0">Select Station</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'">'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	createConfTablec += '<select name="ecircle_sel" id="ecircle_sel"  onchange="egetDivisionFm();">';
	createConfTablec += '<option value="0"> Select Circle</option>';
	for(i = 0; i < lenc; i++)
		createConfTablec += '<option value="'+adata.data.SPC[i].GeoID+'">'+adata.data.SPC[i].GeoName+'</option>';
	createConfTablec += '</select>';
	
	createConfTabled += '<select id="edit_division">';
	createConfTabled += '<option value="0">Select Division</option>';
	
	createConfTabled += '</select>';
	
	createConfTablesd += '<select name="edit_sub_division" id="edit_sub_division">';
	createConfTablesd += '<option value="0"> Select Sub Division</option>';
	
	createConfTablesd += '</select>';
	
	createConfTableom += '<select id="edit_section" >';
	createConfTableom += '<option value="0">Select Section</option>';
	
	createConfTableom += '</select>';
	
	document.getElementById("division_edit").innerHTML = createConfTabled;
	document.getElementById("sub_division_edit").innerHTML = createConfTablesd;
	document.getElementById("section_edit").innerHTML = createConfTableom;
	
	document.getElementById("station_edit").innerHTML = createConfTable;
	document.getElementById("circle_edit").innerHTML = createConfTablec;

}

// get Sub Division  for Feeder maintanence
function edit_getSubDivisionFm() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("szone_sel").value;
	var geoId = document.getElementById("edit_division").value;
	var JSONObject = new Object;
	JSONObject.jcase = "edit_getSubDivisionFm";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"',4,5,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("sub_division_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewedit_getSubDivisionFm(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	var cur_sub_div = document.getElementById("sub_hid").value;
	var createConfTable = '', createConfTableom='';
	
	createConfTable += '<select id="edit_sub_division" onchange="edit_getSectionFm();">';
	createConfTable += '<option value="0">Select Sub Division</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'" '+(cur_sub_div == adata.data.SPS[i].GeoID ? "selected"  : "" )+'>'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	createConfTableom += '<select id="edit_section" >';
	createConfTableom += '<option value="0">Select Section</option>';
	
	createConfTableom += '</select>';
	
	document.getElementById("section_edit").innerHTML = createConfTableom;
	document.getElementById("sub_division_edit").innerHTML = createConfTable;
	
}

// get edit section  for Feeder maintanence
function edit_getSectionFm() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("editzone_sel").value;
	var geoId = document.getElementById("edit_sub_division").value;
	var JSONObject = new Object;
	JSONObject.jcase = "edit_getSectionFm";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	//JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"','"+geoId+"',15,null,"+compid+")";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"','"+5+"',15,null,"+compid+")";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("section_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewedit_getSectionFm(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	var cur_section = document.getElementById("section_hid").value;
	var createConfTable = '';
	
	createConfTable += '<select id="edit_section">';
	createConfTable += '<option value="0">Select Section</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'" '+(cur_section == adata.data.SPS[i].GeoID ? "selected"  : "" )+'>'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	
	document.getElementById("section_edit").innerHTML = createConfTable;
	
}

function edit_getDivisionFm() 
{
	var compid = cmp_id; //cmp_id 
	var zonevl = document.getElementById("editzone_sel").value;
	var geoId = document.getElementById("ecircle_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "edit_getDivisionFm";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.querys = "call sp_mis_get_geoObjectsOfClassByParents('"+geoId+"',3,4,null,"+compid+")";
	
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("division_edit").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	
	runAjax(parser_page,JSONstring);
}

function viewedit_getDivisionFm(adata){
	//alert(adata);
	var len = adata.data.SPS.length;
	var cur_division = document.getElementById("division_hid").value;
	var createConfTable = '', createConfTablesd='', createConfTableom='';
	
	createConfTable += '<select id="edit_division"  onchange="edit_getSubDivisionFm();">';
	createConfTable += '<option value="0">Select Division</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data.SPS[i].GeoID+'" '+(cur_division == adata.data.SPS[i].GeoID ? "selected"  : "" )+'>'+adata.data.SPS[i].GeoName+'</option>';
	createConfTable += '</select>';
	createConfTablesd += '<select name="edit_sub_division" id="edit_sub_division">';
	createConfTablesd += '<option value="0"> Select Sub Division</option>';
	
	createConfTablesd += '</select>';
	
	createConfTableom += '<select id="edit_section" >';
	createConfTableom += '<option value="0">Select Section</option>';
	
	createConfTableom += '</select>';
	document.getElementById("division_edit").innerHTML = createConfTable;
	document.getElementById("sub_division_edit").innerHTML = createConfTablesd;
	document.getElementById("section_edit").innerHTML = createConfTableom;
	
}
