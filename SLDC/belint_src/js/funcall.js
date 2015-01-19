var parser_page = "parser";
var MYURL = document.URL;

function menuSelect(id)
{
	for(i=1;i<6;i++)
	{
		var sid = "M"+i;
		document.getElementById(sid).style.fontWeight = "normal";
		if(sid == id)
			document.getElementById(sid).style.fontWeight = "bold";
	}
}

function login_auth()
{
	document.getElementById("signingin").innerHTML = "<img src='img/ajax_loader.gif'>";
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
	JSONObject.query = "SELECT * FROM "+JSONObject.tablename+" WHERE company_id=6";
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
			createConfTable += '<td><input type="hidden" name="c_uid" value="" id="c_uid"><input type="hidden" name="c_uid" value="" id="c_uid"></td><input type="hidden" name="c_upass" value="" id="c_upass"></td>';
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
	//document.getElementById("e_password").value = usrObjectEdit.data[idx].password;
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
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_11kv_user";
	
		JSONObject.query = "UPDATE "+JSONObject.tablename+" SET  password=md5('"+npassword+"') where user_id="+uid +" and password=md5('"+opassword+"') ";
		//document.getElementById("loadModEcp").innerHTML = "UPDATE "+JSONObject.tablename+" SET  password=md5('"+npassword+"') where user_id="+uid +" and password=md5('"+opassword+"') ";
	JSONstring = JSON.stringify(JSONObject);
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
	manageFunc();
}

function home_pagew(user)
{
	document.getElementById("username").innerHTML = user;
}

function manageFunc()
{
	manageFuncData();
}

function manageFuncData()
{
	document.getElementById("body_main_pane").innerHTML = "";
	var createConfTable = '';
	createConfTable += '<div class="row-fluid">';
		createConfTable += '<div class="span12">';
			createConfTable += '<h3 class="heading">Wizard with validation</h3>';
			createConfTable += '<div class="row-fluid">';
				createConfTable += '<div class="span2"></div>';
				createConfTable += '<div class="span8">';
					createConfTable += '<form id="validate_wizard" class="stepy-wizzard form-horizontal">';
						createConfTable += '<fieldset title="Personal info">';
							createConfTable += '<legend class="hide">Lorem ipsum dolor&hellip;</legend>';
							createConfTable += '<div class="formSep control-group">';
								createConfTable += '<label for="v_username" class="control-label">Username:</label>';
								createConfTable += '<div class="controls">';
									createConfTable += '<input type="text" name="v_username" id="v_username" />';
								createConfTable += '</div>';
							createConfTable += '</div>';
							createConfTable += '<div class="formSep control-group">';
								createConfTable += '<label for="v_password" class="control-label">Password:</label>';
								createConfTable += '<div class="controls">';
									createConfTable += '<input type="password" name="v_password" id="v_password" />';
								createConfTable += '</div>';
							createConfTable += '</div>';
							createConfTable += '<div class="control-group">';
								createConfTable += '<label for="v_email" class="control-label">E-mail:</label>';
								createConfTable += '<div class="controls">';
									createConfTable += '<input type="text" name="v_email" id="v_email" />';
								createConfTable += '</div>';
							createConfTable += '</div>';
						createConfTable += '</fieldset>';
						createConfTable += '<fieldset title="Contact info">';
							createConfTable += '<legend class="hide">Lorem ipsum dolor&hellip;</legend>';
							createConfTable += '<div class="formSep control-group">';
								createConfTable += '<label for="v_street" class="control-label">Street Address:</label>';
								createConfTable += '<div class="controls">';
									createConfTable += '<input type="text" name="v_street" id="v_street" />';
								createConfTable += '</div>';
							createConfTable += '</div>';
							createConfTable += '<div class="formSep control-group">';
								createConfTable += '<label for="v_city" class="control-label">City:</label>';
								createConfTable += '<div class="controls">';
									createConfTable += '<input type="text" name="v_city" id="v_city" />';
								createConfTable += '</div>';
							createConfTable += '</div>';
							createConfTable += '<div class="control-group">';
								createConfTable += '<label for="v_country" class="control-label">Country:</label>';
								createConfTable += '<div class="controls">';
									createConfTable += '<input type="text" name="v_country" id="v_country" />';
								createConfTable += '</div>';
							createConfTable += '</div>';
						createConfTable += '</fieldset>';
						createConfTable += '<fieldset title="Additional info">';
							createConfTable += '<legend class="hide">Lorem ipsum dolor&hellip;</legend>';
							createConfTable += '<div class="formSep control-group">';
								createConfTable += '<label for="v_message" class="control-label">Your Message:</label>';
								createConfTable += '<div class="controls">';
									createConfTable += '<textarea name="v_message" id="v_message" rows="3"></textarea>';
								createConfTable += '</div>';
							createConfTable += '</div>';
							createConfTable += '<div class="control-group">';
								createConfTable += '<label class="control-label">Newsletter:</label>';
								createConfTable += '<div class="controls">';
									createConfTable += '<label class="radio inline" for="newsletter_yes">';
										createConfTable += '<input type="radio" value="yes" id="newsletter_yes" name="v_newsletter"> Yes';
									createConfTable += '</label>';
									createConfTable += '<label class="radio inline" for="newsletter_no">';
										createConfTable += '<input type="radio" value="no" id="newsletter_no" name="v_newsletter"> No';
									createConfTable += '</label>';
								createConfTable += '</div>';
							createConfTable += '</div>';
						createConfTable += '</fieldset>';
						createConfTable += '<button type="button" class="finish btn btn-primary"><i class="icon-ok icon-white"></i> Send registration</button>';
					createConfTable += '</form>';
				createConfTable += '</div>';
			createConfTable += '</div>';
		createConfTable += '</div>';
	createConfTable += '</div>';
		
	createConfTable += '</div>';
	createConfTable += '</div>';
            
	document.getElementById("body_main_pane").innerHTML = createConfTable;
}

function confFunc()
{
	document.getElementById("PageStat").value = 4;
	//document.getElementById("body_main_pane").innerHTML = "<center>Configuration Event content</center>";
	var JSONObject = new Object;
	JSONObject.jcase = "confData";
	JSONObject.container = "body_main_pane";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_config";
	JSONObject.query = "SELECT * FROM "+JSONObject.tablename;
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	runAjax(parser_page,JSONstring);
}

function confFuncData(content)
{
	var shutDownHour = Math.floor((parseInt(content.data[2].ConfigValue))/60);
	var shutDownMinute = (parseInt(content.data[2].ConfigValue))%60;
	document.getElementById(content.container).innerHTML = "";
	var createConfTable = '';
	createConfTable += '<h3 class="heading">Configuration</h3>';
	createConfTable += '<div class="row-fluid">';
	createConfTable += '<table>';
		createConfTable += '<tr>';
		createConfTable += '<td>';
		createConfTable += '<table>';
		
			createConfTable += '<tr>';
			createConfTable += '<td>Shutdown Cycle Duration &nbsp;&nbsp;&nbsp;&nbsp;</td>';
			createConfTable += '<td>Hour&nbsp;</td>';
			createConfTable += '<td><input type="text" name="shutHour" id="shutHour" value="'+shutDownHour+'"></td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>Minutes&nbsp;<input type="text" name="shutMinute" id="shutMinute" value="'+shutDownMinute+'"></td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '</tr>';
			
			createConfTable += '<tr>';
			createConfTable += '<td>Send SMS to Station Head atmost &nbsp;&nbsp;&nbsp;&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td><input type="text" name="sms" id="sms" value="'+parseInt(content.data[3].ConfigValue)+'"></td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>Minutes before shutdown</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '</td>';
			createConfTable += '</tr>';
			
			createConfTable += '<tr>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '</tr>';
			
			createConfTable += '<tr>';
			createConfTable += '<td><input class="btn btn-inverse pull-left" type="submit" name="confSave" value="Save" onClick="setConfVal()"></td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '</tr>';
			
		createConfTable += '</table>';
		createConfTable += '</td>';
		createConfTable += '</tr>';
	createConfTable += '</table>';
	createConfTable += '</div>';
	document.getElementById(content.container).innerHTML = createConfTable;
}

function setConfVal()
{
	var hr = document.getElementById("shutHour").value;
	var mint = document.getElementById("shutMinute").value;
	var smsVal = document.getElementById("sms").value;
	var finalTime = parseInt(hr)*60 + parseInt(mint);

	var JSONObject = new Object;
	JSONObject.jcase = "confDataSet";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_config";
	JSONObject.query0 = "UPDATE "+JSONObject.tablename+" SET ConfigValue='"+finalTime+"' WHERE ConfigName='ShutdownCycleDurationMins'";
	JSONObject.query1 = "UPDATE "+JSONObject.tablename+" SET ConfigValue='"+smsVal+"' WHERE ConfigName='SendSMSStationheadAtmostMins'";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	var x = confirm("Are you sure you want to change configuration?");
	if(x)
		runAjax(parser_page,JSONstring);
}

function getStepDetails(step)
{
	allowedFlag = 0;
	if(document.getElementById("v_tgcmwdiv"))
		document.getElementById("v_tgcmwdiv").innerHTML = "<img src='img/ajax_loader.gif'>";
	if(document.getElementById("sp_basiccdiv"))
		document.getElementById("sp_basiccdiv").innerHTML = "<img src='img/ajax_loader.gif'>";
	contFlag = 1;
	switch(step)
	{
		case 1:
			var JSONObject = new Object;
			JSONObject.jcase = "getStepDetails";
			JSONObject.container = "";
			JSONObject.database = db_name;
			JSONObject.tablename = "tbl_config";
			//JSONObject.query = "SELECT ConfigValue from "+JSONObject.tablename+" where ConfigName='Generation'";
			JSONObject.query = "SELECT L.* FROM `tbl_220kv_generation` L JOIN (SELECT MAX(`ForTime`) AS ForTime,`GenerationGeoID` FROM `tbl_220kv_generation` WHERE `GenerationGeoID`=6 GROUP BY GenerationGeoID) LL ON LL.GenerationGeoID=L.GenerationGeoID AND LL.ForTime=L.ForTime";
			JSONObject.query1 = "SELECT ConfigValue from "+JSONObject.tablename+" where ConfigName='ShutdownCycleDurationMins'";
			JSONObject.query2 = "SELECT L.* FROM `tbl_220kv_load` L JOIN (SELECT MAX(`ForTime`) AS ForTime,`GeoID` FROM `tbl_220kv_load` WHERE GeoID<6 GROUP BY GeoID) LL ON LL.GeoID=L.GeoID AND LL.ForTime=L.ForTime";
			JSONstring = JSON.stringify(JSONObject);
			//alert(JSONstring);
			runAjax(parser_page,JSONstring);
		break;
		default:
	}
}

function calcOutage()
{
	var tgcmw = document.getElementById("v_tgcmw").value;
	var tomw = document.getElementById("v_tomw").value;
	var outage = parseInt(tgcmw) - parseInt(tomw);
	
	if(isNaN(outage))
		document.getElementById("v_aomw").value = "";
	else
		document.getElementById("v_aomw").value = outage;
}

function stationFunc()
{
	document.getElementById("PageStat").value = 3;
	var createConfTable = '';
	createConfTable += '<h3 class="heading">Station Head Contacts</h3>';
	createConfTable += '<div class="row-fluid">';
	createConfTable += '<table>';
		createConfTable += '<tr>';
		createConfTable += '<td>';
		createConfTable += '<table>';
		
			createConfTable += '<tr>';
			createConfTable += '<td><div id="sel_company"></div></td>';
			createConfTable += '<td><div id="sel_zone"></div></td>';
			createConfTable += '<td><div id="sel_station"></div></td>';
			createConfTable += '<td><div id=""><input type="button" value="Go" onclick="searchStationHead();"></div></td>';
			createConfTable += '</tr>';

			createConfTable += '<tr>';
			createConfTable += '<td></td>';
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

			/*
			createConfTable += '<tr>';
			createConfTable += '<td><input type="radio" name="xyz" />All</td>';
			createConfTable += '<td><input type="radio" name="xyz" />Contact Not Assigned</td>';
			createConfTable += '<td><input type="submit" onclick="searchStationHead()" value="Search" name="confSave" class="btn btn-inverse pull-left"></td>';
			createConfTable += '<td><input type="submit" onclick="#" value="Reset" name="confSave" class="btn btn-inverse pull-left"></td>';
			createConfTable += '</tr>';
			*/
			
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
	getStationHeadSel();
}

function viewhistoryHt()
{
	
	var createConfTable = '';
	createConfTable += '<h3 class="heading"> HT Consumers</h3>';
	createConfTable += '<div class="row-fluid">';
	createConfTable += '<table>';
		createConfTable += '<tr>';
		createConfTable += '<td>';
		createConfTable += '<table>';
		
			createConfTable += '<tr>';
			createConfTable += '<td><div id="sel_zone"></div></td>';
			createConfTable += '<td><div id="sel_station"></div></td>';
			createConfTable += '<td><div id="sel_feeder"></div></td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '</tr>';
			
			createConfTable += '<tr>';
			createConfTable += '<td><div id="name"></div></td>';
			createConfTable += '<td><div id="rr_code"></div></td>';
			createConfTable += '<td><div id="vol_class"></div></td>';
			createConfTable += '<td><div id=""><input type="button" value="Go"></div></td>';
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

			/*
			createConfTable += '<tr>';
			createConfTable += '<td><input type="radio" name="xyz" />All</td>';
			createConfTable += '<td><input type="radio" name="xyz" />Contact Not Assigned</td>';
			createConfTable += '<td><input type="submit" onclick="searchStationHead()" value="Search" name="confSave" class="btn btn-inverse pull-left"></td>';
			createConfTable += '<td><input type="submit" onclick="#" value="Reset" name="confSave" class="btn btn-inverse pull-left"></td>';
			createConfTable += '</tr>';
			*/
			
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
	getHtConsumerZSel();
}

function getStationHeadSel()
{
	var JSONObject = new Object;
	JSONObject.jcase = "getStationHeadSel";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	//JSONObject.query = "select company_id, company_name from tbl_company";
	JSONObject.query = "CALL sp_mis_get_companyId_by_companyType(1)";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("sel_company").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	if(document.getElementById("compid_sel"))
	{
		var ttd = document.getElementById("compid_sel").value;
		if(ttd == "0")
		{
			createConfTable = '<select id="zone_sel" onchange="getStationHeadSSel()">';
			createConfTable += '<option value="0">All Zones</option>';
			createConfTable += '</select>';
			document.getElementById("sel_zone").innerHTML = createConfTable;
	
			createConfTable = '<select id="station_sel"  onchange="searchStationHead()">';
			createConfTable += '<option value="0">All Station</option>';
			createConfTable += '</select>';
			document.getElementById("sel_station").innerHTML = createConfTable;
		}
		else
			runAjax(parser_page,JSONstring);
	}
	else
		runAjax(parser_page,JSONstring);
}

//PS
/*function getHtConsumerSel()
{
	
	var JSONObject = new Object;
	JSONObject.jcase = "getHtConsumerSel";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	//JSONObject.query = "select company_id, company_name from tbl_company";
	JSONObject.query = "CALL sp_mis_get_companyId_by_companyType(1)";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("sel_company").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
	//alert("hi");
}*/

function viewgetStationHeadSel(adata)
{
	var len = adata.data.length;
	var createConfTable = '';
	createConfTable += '<select id="compid_sel" onchange="getStationHeadZSel()">';
		createConfTable += '<option value="0">All Companies</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data[i].company_id+'">'+adata.data[i].company_name+'</option>';
	createConfTable += '</select>';
	document.getElementById("sel_company").innerHTML = createConfTable;
	var compid = document.getElementById("compid_sel").value;
	if(compid == "0")
	{
		createConfTable = '<select id="zone_sel" onchange="getStationHeadSSel()">';
		createConfTable += '<option value="0">All Zones</option>';
		createConfTable += '</select>';
		document.getElementById("sel_zone").innerHTML = createConfTable;

		createConfTable = '<select id="station_sel"  onchange="searchStationHead()">';
		createConfTable += '<option value="0">All Station</option>';
		createConfTable += '</select>';
		document.getElementById("sel_station").innerHTML = createConfTable;
	}
	else
		getStationHeadZSel()
}

//Ps
function viewgetHtConsumerSel(adata){
	var len = adata.data.length;
	var createConfTable = '';
	createConfTable += '<select id="compid_sel" onchange="getHtConsumerZSel()">';
		createConfTable += '<option value="0">All Companies</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data[i].company_id+'">'+adata.data[i].company_name+'</option>';
	createConfTable += '</select>';
	document.getElementById("sel_company").innerHTML = createConfTable;
	//getHtConsumerSel()	;
	getHtConsumerZSel();
}

function getStationHeadZSel()
{
	var compid = document.getElementById("compid_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "getStationHeadZSel";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.query = "call sp_mis_get_geoObjectsOfClass(2,null,"+compid+")";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("sel_zone").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	if(document.getElementById("compid_sel"))
	{
		var ttd = document.getElementById("compid_sel").value;
		if(ttd == "0")
		{
			createConfTable = '<select id="zone_sel" onchange="getStationHeadSSel()">';
			createConfTable += '<option value="0">All Zones</option>';
			createConfTable += '</select>';
			document.getElementById("sel_zone").innerHTML = createConfTable;
	
			createConfTable = '<select id="station_sel"  onchange="searchStationHead()">';
			createConfTable += '<option value="0">All Station</option>';
			createConfTable += '</select>';
			document.getElementById("sel_station").innerHTML = createConfTable;
		}
		else
			runAjax(parser_page,JSONstring);
	}
	else
		runAjax(parser_page,JSONstring);
}

function getHtConsumerZSel()
{
	//var compid = document.getElementById("compid_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "getHtConsumerZSel";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.query = "call sp_mis_get_geoObjectsOfClass(2,null,"+cmp_id+")";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("sel_zone").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

//PS
function viewgetHtConsumerZSel(adata)
{
	
	var len = adata.data.length;
	var createConfTable = '';
	createConfTable += '<select id="zone_sel" onchange="getStationHeadSSel()">';
	createConfTable += '<option value="0">All Zones</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data[i].GeoID+'">'+adata.data[i].GeoName+'</option>';
	createConfTable += '</select>';
	document.getElementById("sel_zone").innerHTML = createConfTable;
	if(compid != "0")
	{
		getStationHeadSSel();
	}
}

function viewgetStationHeadZSel(adata)
{
	var len = adata.data.length;
	var createConfTable = '';
	createConfTable += '<select id="zone_sel" onchange="getStationHeadSSel()">';
	createConfTable += '<option value="0">All Zones</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data[i].GeoID+'">'+adata.data[i].GeoName+'</option>';
	createConfTable += '</select>';
	document.getElementById("sel_zone").innerHTML = createConfTable;

	//getStationHeadSSel();
	createConfTable = '';
        createConfTable += '<select id="station_sel"  onchange="searchStationHead()">';
        createConfTable += '<option value="0">All Station</option>';
        createConfTable += '</select>';
        document.getElementById("sel_station").innerHTML = createConfTable;
}


//PS
function getHtConsumerSSel()
{
	//var compid = document.getElementById("compid_sel").value;
	var zonevl = document.getElementById("zone_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "getStationHeadSSel";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.query = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"',2,7,null,"+cmp_id+")";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("sel_station").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function getStationHeadSSel()
{
	var compid = document.getElementById("compid_sel").value;
	var zonevl = document.getElementById("zone_sel").value;
	var JSONObject = new Object;
	JSONObject.jcase = "getStationHeadSSel";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.query = "call sp_mis_get_geoObjectsOfClassByParents('"+zonevl+"',2,7,null,"+compid+")";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("sel_station").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function viewgetStationHeadSSel(adata)
{
	var len = adata.data.length;
	var createConfTable = '';
	createConfTable += '<select id="station_sel"  onchange="searchStationHead()">';
	createConfTable += '<option value="0">All Station</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data[i].GeoID+'">'+adata.data[i].GeoName+'</option>';
	createConfTable += '</select>';
	document.getElementById("sel_station").innerHTML = createConfTable;
	//searchStationHead();
}

function viewgetHtConsumerSSel(adata)
{
	var len = adata.data.length;
	var createConfTable = '';
	createConfTable += '<select id="station_sel"  onchange="searchStationHead()">';
	createConfTable += '<option value="0">All Station</option>';
	for(i = 0; i < len; i++)
		createConfTable += '<option value="'+adata.data[i].GeoID+'">'+adata.data[i].GeoName+'</option>';
	createConfTable += '</select>';
	document.getElementById("sel_station").innerHTML = createConfTable;
	searchStationHead();
}

function searchStationHead()
{
	var compid = parseInt(document.getElementById("compid_sel").value);
	var staid = parseInt(document.getElementById("station_sel").value);
	var zonevl = parseInt(document.getElementById("zone_sel").value);
	var JSONObject = new Object;
	JSONObject.jcase = "searchStationHead";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "tbl_company";
	JSONObject.query = "call sp_11kv_searchstationhead("+compid+","+zonevl+","+staid+",0)";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("body_main_pane_view").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function setNulltoEmpty(val)
{
	if(val == null)
		return "";
	return val;
}

function viewsearchStationHead(adata)
{
	var len = adata.data.length;
	var createConfTable = '';
	createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
		createConfTable += '<thead>';
		
			createConfTable += '<tr>';
			createConfTable += '<th>Station Name</th>';
			createConfTable += '<th>Contact Person</th>';
			//createConfTable += '<th>Designation</th>';
			createConfTable += '<th>Mobile Number</th>';
			createConfTable += '<th>Alternate Number</th>';
			createConfTable += '<th>Email Address</th>';
			createConfTable += '</tr>';
			
		createConfTable += '</thead>';
		
		createConfTable += '<tbody>';
		
		for(i = 0; i < len; i++)
		{
			createConfTable += '<tr class="odd">';
			createConfTable += '<td>'+setNulltoEmpty(adata.data[i].STATION)+'</td>';
			createConfTable += '<td>'+setNulltoEmpty(adata.data[i].name)+'</td>';
			//createConfTable += '<td>'+setNulltoEmpty(adata.data[i].designationID)+'</td>';
			createConfTable += '<td>'+setNulltoEmpty(adata.data[i].mobile)+'</td>';
			createConfTable += '<td>'+setNulltoEmpty(adata.data[i].alternateNumber)+'</td>';
			createConfTable += '<td>'+setNulltoEmpty(adata.data[i].email)+'</td>';
			createConfTable += '</tr>';
		}
		createConfTable += '</tbody>';
		
	createConfTable += '</table>';
	document.getElementById("body_main_pane_view").innerHTML = createConfTable;
}

function convertDateFormat(inDate,delim,sdelim)
{
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

function historyFunc()
{
	var hst = convertDateFormat(document.getElementById("viewdates").value,"-",null)+" 00:00";
	var het = convertDateFormat(document.getElementById("viewdatee").value,"-",null)+" 00:00";
	
	var JSONObject = new Object;
	JSONObject.jcase = "historyGet";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "";
	JSONObject.query = "CALL sp_11kv_getoutagehistory('"+hst+"','"+het+"')";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("body_main_pane_view").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function resetVewdata()
{
	document.getElementById("viewdates").value = "";
	document.getElementById("viewdatee").value = "";
}

function checkEventState(eTime, Step)
{
	var atoday = new Date();
	var add = atoday.getDate();
	var amm = atoday.getMonth()+1;
	var ayyyy = atoday.getFullYear();
	var ahh = atoday.getHours();
	var amin = atoday.getMinutes();
	var ass = atoday.getSeconds();
	
	var fDate = add+"/"+amm+"/"+ayyyy+" "+ahh+":"+amin+":"+ass;
	eTime = eTime.replace("-", "/");
		
	if ((Date.parse (eTime) < Date.parse (fDate)) && (parseInt(Step) < 4))
		return 0;
	return 1;
}

function viewhistoryGet()
{
	document.getElementById("PageStat").value = 2;
	menuSelect('M2');
	
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

	var createConfTable = '';
	createConfTable += '<h3 class="heading">Outage History Management</h3>';
	createConfTable += '<div class="row-fluid">';
	createConfTable += '<table>';
		createConfTable += '<tr>';
		createConfTable += '<td>';
		
		createConfTable += '<table>';
			createConfTable += '<tr>';
			createConfTable += '<td>From:&nbsp;&nbsp;</td>';
			createConfTable += '<td>';
				createConfTable += '<div class="input-append date" id="dp3"data-date-format="dd-mm-yyyy">';
				createConfTable += '<input class="span6" type="text" readonly value="'+oDate+'"  id="viewdates"/>';
				createConfTable += '<span class="add-on"><i class="splashy-calendar_day"></i></span>';
				createConfTable += '</div>';
			createConfTable += '</td>';
			createConfTable += '<td>To:&nbsp;&nbsp;</td>';
			createConfTable += '<td>';
				createConfTable += '<div class="input-append date" id="dp4" data-date-format="dd-mm-yyyy">';
				createConfTable += '<input class="span6" type="text" readonly  value="'+fDate+'" id="viewdatee"/>';
				createConfTable += '<span class="add-on" ><i class="splashy-calendar_day"></i></span>';
				createConfTable += '</div>';
			createConfTable += '</td>';
			createConfTable += '<td><input type="button" onclick="historyFunc()" value="Search" name="confSave" class="btn btn-inverse pull-left"></td>';
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

		createConfTable += '</div>';
		document.getElementById("body_main_pane").innerHTML = createConfTable;
		gebo_datepicker.init();
		historyFunc();
}


function viewhistoryGetSUB(adata)
{
	var createConfTable = '';
		
		createConfTable += '<center><div id="loaderEv"></div></center>';

		createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
			createConfTable += '<thead>';
			
				createConfTable += '<tr>';
				createConfTable += '<th>Shutdown Event ID</th>';
				createConfTable += '<th>Outage (MW)</th>';
				createConfTable += '<th>When</th>';
				createConfTable += '<th>Initiated By</th>';
				createConfTable += '<th>Step Number</th>';
				createConfTable += '<th>Action</th>';
				createConfTable += '</tr>';
				
			createConfTable += '</thead>';
			
		createConfTable += '<tbody>';
		for(i=0;i<(adata.data).length;i++)
		{
			createConfTable += '<tr class="odd">';
			createConfTable += '<td>'+adata.data[i].outageID+'</td>';
			createConfTable += '<td>'+adata.data[i].outageVolume+'</td>';
			createConfTable += '<td>'+removeSecondsFromDateTime(convertDateFormat(adata.data[i].outageDateTime,"-"," "))+'</td>';
			createConfTable += '<td>'+adata.data[i].first_name+' '+adata.data[i].last_name+'</td>';
			createConfTable += '<td>'+adata.data[i].stepNumber+'</td>';
			if(checkEventState(adata.data[i].outageDateTime, adata.data[i].stepNumber))
				createConfTable += '<td><a href="javascript:fillWizAgain('+parseInt(adata.data[i].outageID)+')">View</a></td>';
			else
				createConfTable += '<td><a href="javascript:requestCancel('+parseInt(adata.data[i].outageID)+')">Cancel</a></td>';
			createConfTable += '</tr>';
		}
		createConfTable += '</tbody>';
		createConfTable += '</table>';

	createConfTable += '</table>';
	//createConfTable += '</div>';
	document.getElementById("body_main_pane_view").innerHTML = createConfTable;
}

function requestCancel(outageIDVal)
{
	var JSONObject = new Object;
	JSONObject.jcase = "requestCancel";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "";
	JSONObject.query = "CALL sp_11kv_CancelOutageDetails("+parseInt(outageIDVal)+",'')";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("loaderEv").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
	
}

function fillWizAgain(wizoutID)
{
	document.getElementById("M1").style.fontWeight = "bold";
	document.getElementById("M2").style.fontWeight = "normal";
	document.getElementById("body_main_pane").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";;
	//document.location = "wizard.php?user="+userna+"&user_id="+user_id+"&wizid="+wizoutID;
	//document.location = "wizard.php?wizid="+wizoutID;
	var JSONObject = new Object;
	JSONObject.jcase = "fillWizAgain";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.wizoutID = wizoutID;
	JSONObject.tablename = "";
	JSONObject.query = "CALL sp_11kv_getoutagedetailsbyid("+parseInt(wizoutID)+")";
	JSONstring = JSON.stringify(JSONObject);
	runAjax(parser_page,JSONstring);
}
var allowedFlag = 0;
var NOCVAL = 0;
function viewfillWizAgain(adata)
{
	var tmp = (adata.data.OUT1[0].outageDateTime).split(" ");
	var wizTime = tmp[1];
	var tmp2 = (tmp[0]).split("-");
	var wizDate = tmp2[2]+"-"+tmp2[1]+"-"+tmp2[0];
	//alert(tmp);
        //alert(wizTime);
        //alert(tmp2);
        //alert(wizDate);
	allowedFlag = parseInt(adata.data.OUT1[0].stepNumber);
	//if(allowedFlag == 1)
	//	allowedFlag = 2;
	contFlag = 0;
	NOCVAL = adata.data.OUT1[0].numberOfCycles;
	
	var wizDurH = parseInt(parseInt(adata.data.OUT1[0].outageTentativeDurationMins) / 60);
	var wizDurM = parseInt(adata.data.OUT1[0].outageTentativeDurationMins) % 60;
	
	shutTimez = adata.data.OUT1[0].outageDateTime;
	var tmpst = shutTimez.split(" ");
	var tmpst0 = tmpst[0].split("-");
	var tmpst1 = tmpst[1].split(":");
	shutTimez1 = tmpst0;
	//shutTimez1[1] = tmpst0[1];
	//shutTimez1[2] = tmpst0[2];
	shutTimez1[3] = tmpst1[0];
	shutTimez1[4] = tmpst1[1];
	
	durationz = adata.data.OUT1[0].outageTentativeDurationMins;

	stoppedInBetweenTime = adata.data.OUT1[0].stoppedInBetweenTime;
	//alert(stoppedInBetween);
	
	var createConfTable = '';
	createConfTable += '<div class="row-fluid">';
		createConfTable += '<div class="span12">';
			createConfTable += '<h3 class="heading">Manage Outage Event</h3>';
			createConfTable += '<div class="row-fluid">';
				createConfTable += '<div class="span8">';
					createConfTable += '<form id="validate_wizard" class="stepy-wizzard form-horizontal">';
						createConfTable += '<fieldset title="Outage Detail" id="fld1">';
							createConfTable += '<legend class="hide">&nbsp;Enter Outage Details&hellip;</legend>';
							createConfTable += '<div class="formSep control-group">';
								createConfTable += '<label for="v_tgcmw" class="control-label" style="width:200px;text-align:left;">Total Generation Capacity(MW)</label>';
								createConfTable += '<div class="controls">';
									//createConfTable += '<input type="text" name="v_tgcmw" id="v_tgcmw" readonly value="'+adata.data.OUT1[0].generationVolume+'"/>';
									createConfTable += '<input type="text" name="v_tgcmw" id="v_tgcmw" readonly value="'+adata.data.OUT1[0].generationVolume+'" onkeypress="return isNumber(event,0,this)"/>';
								createConfTable += '</div>';
							createConfTable += '</div>';
							createConfTable += '<div class="formSep control-group">';
								createConfTable += '<label for="v_tomw" class="control-label" style="width:200px;text-align:left;"><font color="#FF0000" size="+2">*</font>Total Outage (MW)</label>';
								createConfTable += '<div class="controls">';
									createConfTable += '<input value="'+adata.data.OUT1[0].outageVolume+'"  readonly type="text" name="v_tomw" id="v_tomw" onKeyUp="calcOutage()" onkeypress="return isNumber(event,0,this)" onKeyUp="shouldRetain(0,this)"/>';
									//createConfTable += '<input value="'+adata.data.OUT1[0].outageVolume+'"  type="text" name="v_tomw" id="v_tomw" onKeyUp="calcOutage()" onkeypress="return isNumber(event,0,this)" onKeyUp="shouldRetain(0,this)"/>';
									createConfTable += '&nbsp;&nbsp;&nbsp;&nbsp;Available MW&nbsp;&nbsp;&nbsp;&nbsp;';
									createConfTable += '<input type="text" name="v_aomw" id="v_aomw" value="'+adata.data.OUT1[0].availableVolume+'" readonly/>';
									//createConfTable += '<input type="text" name="v_aomw" id="v_aomw" readonly value="'+adata.data.OUT1[0].availableVolume+'"/>';
								createConfTable += '</div>';
							createConfTable += '</div>';
							createConfTable += '<div class="control-group">';
								createConfTable += '<label for="v_tdate" class="control-label" style="width:200px;text-align:left;"><font color="#FF0000" size="+2">*</font>Date</label>';
								createConfTable += '<div class="input-append date" id="dp2" data-date-format="dd-mm-yyyy">';
									createConfTable += '<input class="span8" id="datedp2" type="text" readonly value="'+wizDate+'"/>';
									createConfTable += '<span class="add-on"><i class="splashy-calendar_day"></i></span>';
								createConfTable += '</div>';
							createConfTable += '</div>';
							createConfTable += '<div class="control-group"></div>';
							createConfTable += '<div class="control-group">';
								createConfTable += '<label for="v_ttime" class="control-label" style="width:200px;text-align:left;"><font color="#FF0000" size="+2">*</font>Start Time (HH:MM)</label>';
								createConfTable += '<input type="text" class="span3" id="tp_1" value="'+wizTime+'" readonly/>';
							createConfTable += '</div>';
							createConfTable += '<div class="formSep control-group">';
								createConfTable += '<div class="control">';
									createConfTable += '<label for="v_ttime" class="control-label" style="width:157px;text-align:left;"><font color="#FF0000" size="+2">*</font>Duration</label>';
									createConfTable += 'Hour';
									createConfTable += '&nbsp;&nbsp;';
									createConfTable += '<input value="'+wizDurH+'" readonly type="text" id="sp_basica" name="sp_basica" value="0" onkeypress="return isNumber(event,59,this)" onKeyUp="shouldRetain(59,this)"/>';
	
									 createConfTable += '&nbsp;&nbsp;';
									 createConfTable += '&nbsp;&nbsp;';
									 createConfTable += '&nbsp;&nbsp;';
									 createConfTable += '&nbsp;&nbsp;';
									 createConfTable += ' Minutes';
									 createConfTable += '&nbsp;&nbsp;';
									createConfTable += '<input value="'+wizDurM+'" readonly  type="text" id="sp_basicb" name="sp_basicb" value="1"onkeypress="return isNumber(event,59,this)" onKeyUp="shouldRetain(59,this)"/>';
								createConfTable += '</div>';
							createConfTable += '</div>';
							createConfTable += '<div class="formSep control-group">';
								createConfTable += '<label class="control-label" style="width:200px;text-align:left;"><font color="#FF0000" size="+2">*</font>Cycle Duration</label>';
								createConfTable += '<input value="'+adata.data.OUT1[0].cycleDurationMins+'" readonly type="text" id="sp_basicc" name="sp_basicc" value="1" onkeypress="return isNumber(event,59,this)" onKeyUp="shouldRetain(59,this)"/>';
								createConfTable += 'Minutes';
								createConfTable += '<br>';


								createConfTable += '<table>';
								createConfTable += '<tr>';
									createConfTable += '<td><label class="control-label" style="width:200px;text-align:left;"><font color="#FF0000" size="+2">*</font>BESCOM Current Load(MW)</label></td>';
									createConfTable += '<td><label class="control-label" style="width:200px;text-align:left;"><font color="#FF0000" size="+2">*</font>GESCOM Current Load(MW)</label></td>';
									createConfTable += '<td><label class="control-label" style="width:200px;text-align:left;"><font color="#FF0000" size="+2">*</font>HESCOM Current Load(MW)</label></td>';
									createConfTable += '<td><label class="control-label" style="width:200px;text-align:left;"><font color="#FF0000" size="+2">*</font>MESCOM Current Load(MW)</label></td>';
									createConfTable += '<td><label class="control-label" style="width:200px;text-align:left;"><font color="#FF0000" size="+2">*</font>CESC Current Load(MW)</label></td>';
								createConfTable += '</tr>';
								createConfTable += '<tr>';
									createConfTable += '<td><input readonly type="text" id="cw_bescom" name="cw_bescom" value="'+adata.data.OUT2[0].currentLoad+'" onKeyPress="return isNumber(event,1000000,this)" onKeyUp="shouldRetain(1000000,this)"/></td>';
									createConfTable += '<td><input readonly type="text" id="cw_gescom" name="cw_gescom" value="'+adata.data.OUT2[1].currentLoad+'" onKeyPress="return isNumber(event,1000000,this)" onKeyUp="shouldRetain(1000000,this)"/></td>';
									createConfTable += '<td><input readonly type="text" id="cw_hescom" name="cw_hescom" value="'+adata.data.OUT2[2].currentLoad+'" onKeyPress="return isNumber(event,1000000,this)" onKeyUp="shouldRetain(1000000,this)"/></td>';
									createConfTable += '<td><input readonly type="text" id="cw_mescom" name="cw_mescom" value="'+adata.data.OUT2[3].currentLoad+'" onKeyPress="return isNumber(event,1000000,this)" onKeyUp="shouldRetain(1000000,this)"/></td>';
									createConfTable += '<td><input readonly type="text" id="cw_cesc" name="cw_cesc" value="'+adata.data.OUT2[4].currentLoad+'" onKeyPress="return isNumber(event,1000000,this)" onKeyUp="shouldRetain(1000000,this)"/></td>';
								createConfTable += '</tr>';
								createConfTable += '</table>';



								createConfTable += '<br>';
								createConfTable += 'Remarks&nbsp;&nbsp;&nbsp;&nbsp;';
								//createConfTable += '<br>';
								createConfTable += '<textarea name="auto_expand" id="auto_expand" cols="1" rows="4" readonly style="width:35%; height:40px;">'+adata.data.OUT1[0].remarks+'</textarea>';
							createConfTable += '</div>';
							createConfTable += '<div style="float:left">All Fields marked with <font color="#FF0000" size="+2">*</font> are compulsory to fill.</div>';
							createConfTable += '<a href="javascript:viewhistoryGet()" class="btn" style="margin-left:10px;float:right;"> Outage History</a>';
						createConfTable += '</fieldset>';
						createConfTable += '<fieldset title="Request Approval" id="fld2">';
							createConfTable += '<legend class="hide">&nbsp;Approve/Reject Requests&hellip;</legend>';
							createConfTable += '<div id="dataw2">';
								createConfTable += '<br><br>';
								createConfTable += '<center><img src="img/ajax_loader.gif"></center>';
								createConfTable += '<br><br>';
							createConfTable += '</div>';
						createConfTable += '</fieldset>';
					    createConfTable += '<fieldset title="Shutdown Feeders" id="fld3">';
							createConfTable += '<legend class="hide">&nbsp;Manage Feeder Shutdown&hellip;</legend>';
							createConfTable += '<div id="dataw3">';
								createConfTable += '<br><br>';
								createConfTable += '<center><img src="img/ajax_loader.gif"></center>';
								createConfTable += '<br><br>';
							createConfTable += '</div>';
						createConfTable += '</fieldset>';
						createConfTable += '<fieldset title="Track" id="fld4">';
							createConfTable += '<legend class="hide">&nbsp;Track Feeder Cycles&hellip;</legend>';
							createConfTable += '<div id="dataw4">';
								createConfTable += '<br><br>';
								createConfTable += '<center><img src="img/ajax_loader.gif"></center>';
								createConfTable += '<br><br>';
							createConfTable += '</div>';
						createConfTable += '</fieldset>';
						createConfTable += '<button type="button" class="finish btn btn-primary" style="visibility:hidden;"><i class="icon-ok icon-white"></i> Send registration</button>';
					createConfTable += '</form>';
				createConfTable += '</div>';
			createConfTable += '</div>';
		createConfTable += '</div>';
	createConfTable += '</div>';
	
	document.getElementById("body_main_pane").innerHTML = createConfTable;
	
	//* wizard with validation
	gebo_wizard.validation();
	//* add step numbers to titles
	gebo_wizard.steps_nb();
	wizard_step2(adata,1, true);
	wizard_step3(adata,1, true);
	wizard_step4(adata,1, true);
}
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

function ChkisNumber(evt)
{
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function shouldRetain(mlen,obj)
{
	if(mlen && parseInt(obj.value) > mlen)
        obj.value = obj.title;
}

var reqAp = 0;
var outID = 0;
var outCY = 0;
//var canContinue = "N";
var contFlag = 0;

var shutTimez = null;
var shutTimez1 = null;
var durationz = null;
var stoppedInBetweenTime = null;

function wizard_opr_next(indx)
{
	var eFlag = 0;
	switch(indx)
	{
		case 1:
			var v_tgcmw = document.getElementById("v_tgcmw").value;
			var v_tomw = document.getElementById("v_tomw").value;
			var v_aomw = document.getElementById("v_aomw").value;
			var tp_1 =  document.getElementById("tp_1").value;
			var datedp2 = convertDateFormat(document.getElementById("datedp2").value,"-",null)+" "+tp_1+":00";
			shutTimez = datedp2;
			//alert(shutTimez);
			

			//datedp2 = datedp2.replace("/","-");
			var tmpaa = (document.getElementById("datedp2").value).split("-");
			datedpmc2 = parseInt(tmpaa[2])+parseInt(tmpaa[1])+parseInt(tmpaa[0]);
			shutTimez1 = tmpaa;
			//alert("init " + shutTimez1);
			var tmpst = (document.getElementById("tp_1").value).split(":");
			shutTimez1[3] = tmpst[0];
                        shutTimez1[4] = tmpst[1];
			
			var sp_basic = document.getElementById("sp_basica").value;
			var sp_basic1 = document.getElementById("sp_basicb").value;
			var sp_basic2 = document.getElementById("sp_basicc").value;
			durationz = sp_basic2;
			var outageD = (parseInt(sp_basic)*60) + parseInt(sp_basic1);

			var cw_bescom = document.getElementById("cw_bescom").value;
			var cw_gescom = document.getElementById("cw_gescom").value;
			var cw_hescom = document.getElementById("cw_hescom").value;
			var cw_mescom = document.getElementById("cw_mescom").value;
			var cw_cesc = document.getElementById("cw_cesc").value;


			var auto_expand = document.getElementById("auto_expand").value;
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();

			if((document.getElementById("cw_cesc").value).length < 1)
			{
				eFlag = 1;
				contFlag = 1;
				alert("Invalid Current Load for CESC, Please fill in valid value");
				return;
			}
			
			if((document.getElementById("cw_mescom").value).length < 1)
			{
				eFlag = 1;
				contFlag = 1;
				alert("Invalid Current Load for MESCOM, Please fill in valid value");
				return;
			}
			
			if((document.getElementById("cw_hescom").value).length < 1)
			{
				eFlag = 1;
				contFlag = 1;
				alert("Invalid Current Load for HESCOM, Please fill in valid value");
				return;
			}
			
			if((document.getElementById("cw_gescom").value).length < 1)
			{
				eFlag = 1;
				contFlag = 1;
				alert("Invalid Current Load for GESCOM, Please fill in valid value");
				return;
			}
			
			if((document.getElementById("cw_bescom").value).length < 1)
			{
				eFlag = 1;
				contFlag = 1;
				alert("Invalid Current Load for BESCOM, Please fill in valid value");
				return;
			}
			
			if((document.getElementById("datedp2").value).length < 1)
			{
				eFlag = 1;
				contFlag = 1;
				alert("Invalid Date, Please fill in vaid date");
				return;
			}
			
			if(datedpmc2 < (dd+mm+yyyy))
			{
				eFlag = 1;
				contFlag = 1;
				alert("Invalid Date, Date can not be past date!");
				return;
			}
			
			if(tp_1.length < 1)
			{
				eFlag = 1;
				contFlag = 1;
				alert("Invalid Start Time, Please fill in vaid Start Time");
				return;
			}
			
			if(v_tomw.length < 1)
			{
				eFlag = 1;
				contFlag = 1;
				alert("Invalid Total Outage, Please fill in vaid Total Outage");
				return;
			}
			
			if(sp_basic.length < 1)
			{
				eFlag = 1;
				contFlag = 1;
				alert("Invalid Duration Hour, Please fill in vaid Duration Hour");
				return;
			}
			
			if(sp_basic1.length < 1)
			{
				eFlag = 1;
				contFlag = 1;
				alert("Invalid Duration Minutes, Please fill in vaid Duration Minutes");
				return;
			}
			if(((sp_basic * 60) + sp_basic1) < 20)
			{
				eFlag = 1;
				contFlag = 1;
				alert("Duration should be at least 20 mins");
				return;
			}
			
			if(sp_basic2.length < 1)
			{
				eFlag = 1;
				contFlag = 1;
				alert("Invalid Cycle Duration, Please fill in vaid Cycle Duration");
				return;
			}

			if((sp_basic2 < 0) || (sp_basic2 > 0 && sp_basic2 < 15))
			{
				eFlag = 1;
                                contFlag = 1;
                                alert("Cycle Duration can either be 0 or at least 15 minutes");
                                return;
			}	
			if(!outageD)
			{
				eFlag = 1;
				contFlag = 1;
				alert("Invalid Duration, Duration must be greater than 0");
				return;
			}
			
			if(eFlag)
			{
				//alert("Invalid Values! Please fill in all values.");
				contFlag = 1;
				return;
			}
			else
				contFlag = 0;
			
			var JSONObject = new Object;
			JSONObject.jcase = "wizard_opr_next1";
			JSONObject.container = "";
			JSONObject.database = db_name;
			JSONObject.tablename = "";
			//JSONObject.query = "CALL sp_11kv_insertOutageDetails("+v_tgcmw+","+v_tomw+","+v_aomw+",'"+datedp2+"',"+outageD+","+sp_basic2+",'"+auto_expand+"',"+user_id+")";
			JSONObject.query = "CALL sp_11kv_insertOutageDetailsWithLoadData("+v_tgcmw+","+v_tomw+","+v_aomw+",'"+datedp2+"',"+outageD+","+sp_basic2+",'"+auto_expand+"',"+user_id+","+cw_bescom+","+cw_gescom+","+cw_hescom+","+cw_mescom+","+cw_cesc+")";
			JSONstring = JSON.stringify(JSONObject);
			//alert(JSONstring);
			document.getElementById("dataw2").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
			runAjax(parser_page,JSONstring);
		break;
		
		case 2:
		if(contFlag == 1)
			alert("Cannot Continue to Next Step!");
		else
		{
			contFlag = 0;
			var JSONObject = new Object;
			JSONObject.jcase = "wizard_opr_next2";
			JSONObject.container = "";
			JSONObject.database = db_name;
			JSONObject.tablename = "";
			JSONObject.query = "CALL sp_11kv_calcfeedersforshutdown("+parseInt(outCY)+")";
			JSONObject.query1 = "select numberOfCycles from tbl_11kv_outage where outageID="+outID+"";
			JSONstring = JSON.stringify(JSONObject);
			document.getElementById("dataw3").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
			runAjax(parser_page,JSONstring);
		}
		break;
		
		case 3:
			var indx = 0;
			var cidallA = "";
			var cidallM = "";
			var x = confirm("Shutdown Process will be initiated once you proceed to Step4. Do you want to continue ?");
			if(x)
			{
				contFlag = 0;
				for(indx=1;indx<6;indx++)
				{
					switch(indx)
					{
						case 1:
						len = aaal;
						chid = "aaa";
						break;
						
						case 2:
						len = bbbl;
						accID = "collapseTwo";
						chid = "bbb";
						break;
						
						case 3:
						len = cccl;
						accID = "collapseThree";
						chid = "ccc";
						break;
						
						case 4:
						len = dddl;
						accID = "collapseFour";
						chid = "ddd";
						break;
						
						case 5:
						len = eeel;
						accID = "collapseFive";
						chid = "eee";
						break;
						
						default:
					}
					for(i=0; i<len; i++)
					{
						var chkdA = document.getElementById("A"+chid+"_"+i).checked;
						var chkdM = document.getElementById("M"+chid+"_"+i).checked;
						
						//if(chkdM)
						//	cidallM += document.getElementById("M"+chid+"_"+i).title+",";
						
						if(chkdA)
						{
							if(document.getElementById("A"+chid+"_"+i).style.visibility == "visible")
								cidallA += document.getElementById("A"+chid+"_"+i).title+",";
						}
					}
				}
				
				cidallM = "";
				//cidallM = cidallM.substring(0, cidallM.length - 1);
				cidallA = cidallA.substring(0, cidallA.length - 1);
					
				if(cidallM.length < 1)
					cidallM = "";
				
				if(cidallA.length < 1)
					cidallA = "";
				
				var JSONObject = new Object;
				JSONObject.jcase = "wizard_opr_next3";
				JSONObject.container = "";
				JSONObject.database = db_name;
				JSONObject.tablename = "";
				JSONObject.query = "CALL sp_11kv_shutdownfeedersforcycle("+parseInt(outCY)+",'"+cidallM+"','"+cidallA+"')";
				JSONObject.query1 = "CALL sp_11kv_gettrackinfo("+parseInt(outID)+")";
				JSONstring = JSON.stringify(JSONObject);
				document.getElementById("dataw4").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
				runAjax(parser_page,JSONstring);
			}
			else
				contFlag = 1;
		break;
		
		case 4:
		break;
		
		default:		
	}
}

function refreshStep4(cyid)
{
        var JSONObject = new Object;
        JSONObject.jcase = "refreshStep4";
        JSONObject.container = "";
        JSONObject.database = db_name;
        JSONObject.tablename = "";
        JSONObject.query = "CALL sp_11kv_gettrackinfo("+parseInt(cyid)+")";
        JSONstring = JSON.stringify(JSONObject);
        document.getElementById("dataw4").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
        runAjax(parser_page,JSONstring);
}

function wizard_opr_prev(indx)
{
	switch(indx)
	{
		case 1:
			allowedFlag = 1;
			document.getElementById("v_tgcmw").disabled = true;
			document.getElementById("v_tomw").disabled = true;
			document.getElementById("tp_1").disabled = true;
			document.getElementById("sp_basica").disabled = true;
			document.getElementById("sp_basicb").disabled = true;
			document.getElementById("sp_basicc").disabled = true;
			document.getElementById("cw_bescom").disabled = true;
			document.getElementById("cw_hescom").disabled = true;
			document.getElementById("cw_gescom").disabled = true;
			document.getElementById("cw_mescom").disabled = true;
			document.getElementById("cw_cesc").disabled = true;
			document.getElementById("auto_expand").disabled = true;
		break;
		
		case 2:
			allowedFlag = 2;
			document.getElementById("v_tgcmw").disabled = true;
			document.getElementById("v_tomw").disabled = true;
			document.getElementById("tp_1").disabled = true;
			document.getElementById("sp_basica").disabled = true;
			document.getElementById("sp_basicb").disabled = true;
			document.getElementById("sp_basicc").disabled = true;
			document.getElementById("cw_bescom").disabled = true;
			document.getElementById("cw_hescom").disabled = true;
			document.getElementById("cw_gescom").disabled = true;
			document.getElementById("cw_mescom").disabled = true;
			document.getElementById("cw_cesc").disabled = true;
			document.getElementById("auto_expand").disabled = true;
		break;
		
		case 3:
			allowedFlag = 3;
		break;
		
		case 4:
			allowedFlag = 4;
		break;
		
		default:
	}
}

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

function keepReqAlive(cyid)
{
	var JSONObject = new Object;
	JSONObject.jcase = "reqApAL";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "";
	JSONObject.query = "CALL sp_11kv_getapprovalstatusforoutage("+parseInt(cyid)+")";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("dataw2").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function wizard_step2(adata, opr, viewMode)
{
	//alert(viewMode);
	var i = 0;
	
	outID = adata.data.OUT1[0].outageID;
	
	if(opr == 1)
		outCY = adata.data.OUT2[0].outageCycleID;
	else
		outCY = adata.data.OUT1[0].outageCycleID;
		
	reqAp = adata.data.OUT2[0].outageCompanyShareID;

	var createConfTable = '';
	createConfTable += '<div class="formSep control-group">';
		createConfTable += '<label for="v_street" class="control-label">Shutdown Event ID: '+outID+'</label>';
		if (!viewMode) {
			createConfTable += '<button type="button" class="btn btn-primary" style="float:right;" onclick="keepReqAlive('+parseInt(outCY)+')">Refresh</button>';
		}
	createConfTable += '</div>';
	createConfTable += '<div class="formSep control-group">';
		createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
		createConfTable += '<thead>';
			createConfTable += '<tr>';
				createConfTable += '<th>Company</th>';
				createConfTable += '<th>Current Load (MW)</th>';
				createConfTable += '<th>Share %</th>';
				createConfTable += '<th>Sanctioned Load Considering Shutdown</th>';
				createConfTable += '<th>Shutdown Needed</th>';
				createConfTable += '<th>Suggested Shutdown</th>';
				createConfTable += '<th>Shutdown Requested</th>';
				createConfTable += '<th>Action to be taken</th>';
			createConfTable += '</tr>';
		createConfTable += '</thead>';
		createConfTable += '<tbody>';
		contFlag = 0;

		var CcurrentLoad = 0;
		var CsharePercent = 0;
		var CsanctionedLoadAfterShutdown = 0;
		var CshutdownNeeded = 0;
		//var CsuggestedShutdown = 0;
		
		for(i = 0; i < (adata.data.OUT2).length; i++)
		{
			var compNAME = getCompName(adata.data.OUT2[i].companyID);
			var tdTstyle = 'style="border:0px;text-align:left"';
			var tdTNumstyle = 'style="text-align:right"';
			var tdTNumstyleT = 'style="text-align:left"';
			var tdTNumstyleE = 'style="text-align:right;background-color:#333; color:#fff;"';
			var tdTNumstyleTE = 'style="text-align:left;background-color:#333; color:#fff;"';

			if(parseInt(adata.data.OUT2[i].shutdownRequested) && (viewMode === false))
				var sgstDown = '<input '+tdTNumstyle+' onkeypress="return ChkisNumber(event)" type="text" id="shutdownRequested_'+adata.data.OUT2[i].outageCompanyShareID+'" name="" class="span6" value="'+adata.data.OUT2[i].shutdownRequested+'"/>';
			else
				var sgstDown = adata.data.OUT2[i].shutdownRequested;

			CcurrentLoad += parseInt(adata.data.OUT2[i].currentLoad);
			CsharePercent += parseInt(adata.data.OUT2[i].sharePercent);
			CsanctionedLoadAfterShutdown += parseInt(adata.data.OUT2[i].sanctionedLoadAfterShutdown);
			CshutdownNeeded += parseInt(adata.data.OUT2[i].shutdownNeeded);
			//CsuggestedShutdown += parseInt(adata.data.OUT2[i].suggestedShutdown);

			createConfTable += '<tr class="odd">';
			createConfTable += '<td '+tdTNumstyleT+'>'+compNAME+'</td>';
			createConfTable += '<td '+tdTNumstyle+'>'+adata.data.OUT2[i].currentLoad+'</td>';
			createConfTable += '<td '+tdTNumstyle+'>'+adata.data.OUT2[i].sharePercent+'</td>';
			createConfTable += '<td '+tdTNumstyle+'>'+adata.data.OUT2[i].sanctionedLoadAfterShutdown+'</td>';
			createConfTable += '<td '+tdTNumstyle+'>'+adata.data.OUT2[i].shutdownNeeded+'</td>';
			createConfTable += '<td '+tdTNumstyle+'>'+adata.data.OUT2[i].suggestedShutdown+'</td>';
			createConfTable += '<td '+tdTNumstyle+'>'+sgstDown+'</td>';
			
			
			createConfTable += '<td><table '+tdTstyle+'>';
				createConfTable += '<tr><td '+tdTstyle+'>';
			//alert(parseInt(adata.data.OUT2[i].outageApprovalStatusID));
			switch(parseInt(adata.data.OUT2[i].outageApprovalStatusID))
			{
				case 1:
					//createConfTable += '<td>Not Requested</td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+2+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Request Approval</a></div></td>';
					contFlag = 1;
				break;
				case 2:
					//createConfTable += '<td>Requested</td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+3+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Re Request</a></div></td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+6+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Bypass</a></div></td>';
					contFlag = 1;
				break;
				case 3:
					//createConfTable += '<td>Requested Again</td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+3+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Re Request</a></div></td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+6+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Bypass</a></div></td>';
					contFlag = 1;
				break;
				case 4:
					createConfTable += '<td '+tdTstyle+'>Approved</td>';
				break;
				case 5:
					//createConfTable += '<td>Rejected</td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+8+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Request Again</a></div></td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+6+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Bypass</a></div></td>';
					contFlag = 1;
				break;
				case 6:
					createConfTable += '<td '+tdTstyle+'>Bypass Approval</td>';
				break;
				case 7:
					createConfTable += '<td '+tdTstyle+'>Not Needed</td>';
				break;
				case 8:
					//createConfTable += '<td>Requested Again After Response</td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+3+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Re Request</a></div></td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+6+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Bypass</a></div></td>';
					contFlag = 1;
				break;
				case 9:
					createConfTable += '<td>Cancelled</td>';
				break;
			}
			createConfTable += '</td>';
			createConfTable += '</tr>';			
			createConfTable += '</table>';
			createConfTable += '</td>';
			
			//if(adata.data.OUT2[i].canContinue == "Y")
			//{
			//	createConfTable += '<td><div class="span2" onClick="requestApproval('+parseInt(adata.data.OUT1[0].outageID)+','+parseInt(adata.data.OUT1[0].outageCycleID)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">'+adata.data.OUT2[i].outageApprovalStatusName+'</a></div></td>';
			//}
			
			//if(parseInt(adata.data.OUT2[i].suggestedShutdown))
				//createConfTable += '<td><div class="span2" onClick="requestApproval('+parseInt(adata.data.OUT1[0].outageID)+','+parseInt(adata.data.OUT1[0].outageCycleID)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Request Approval</a></div></td>';
			//else
			//	createConfTable += '<td>&nbsp;</td>';
			createConfTable += '</tr>';
		}
		createConfTable += '<tr style="background-color:#333; color:#fff;">';
			createConfTable += '<th '+tdTNumstyleTE+'>Total</th>';
			createConfTable += '<th '+tdTNumstyleE+'>'+CcurrentLoad+'</th>';
			createConfTable += '<th '+tdTNumstyleE+'>'+CsharePercent+'</th>';
			createConfTable += '<th '+tdTNumstyleE+'>'+CsanctionedLoadAfterShutdown+'</th>';
			createConfTable += '<th '+tdTNumstyleE+'>'+CshutdownNeeded+'</th>';
			createConfTable += '<th '+tdTNumstyleE+'>&nbsp;</th>';
			createConfTable += '<th '+tdTNumstyleE+'>&nbsp;</th>';
			createConfTable += '<th '+tdTNumstyleE+'>&nbsp;</th>';
		createConfTable += '</tr>';
		createConfTable += '</tbody>';
		createConfTable += '</table>';
	createConfTable += '</div>';
	
	createConfTable += '<div class="modal hide fade" id="myModal2">';
	createConfTable += '<div class="modal-header">';
		createConfTable += '<button class="close" data-dismiss="modal">×</button>';
		createConfTable += '<h3>Request Approval</h3>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-body" id="loadMod">';
		createConfTable += '<textarea id="rcomment" cols="1" rows="4" style="width:97%"></textarea>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-footer">';
		createConfTable += '<a href="javascript:sendRequestApproval();" class="btn"="modal">Submit</a>';
		createConfTable += '<a href="#" class="btn" data-dismiss="modal">Close</a>';
	createConfTable += '</div>';
	createConfTable += '</div>';


	createConfTable += '<div class="modal hide fade" id="myModal3">';
	createConfTable += '<div class="modal-header">';
		createConfTable += '<button class="close" data-dismiss="modal">×</button>';
		createConfTable += '<h3>Cancel Event</h3>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-body" id="loadModC">';
		createConfTable += '<textarea id="rcommentC" cols="1" rows="4" style="width:97%"></textarea>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-footer">';
		createConfTable += '<a href="javascript:requestC();" class="btn"="modal">Submit</a>';
		createConfTable += '<a href="#" class="btn" data-dismiss="modal">Close</a>';
	createConfTable += '</div>';
	createConfTable += '</div>';

	var d = new Date();
	//alert(d + "new date");
	//alert(shutTimez + "hello");
        //var endTimeString = shutTimez.replace(" ","T");
	//alert(endTimeString + "abcd");
	//alert("Given Time "+shutTimez1[2]+(shutTimez1[1]-1) + shutTimez1[1] + shutTimez1[3] + shutTimez1[4]);
        var endTime = new Date(shutTimez1[2], (shutTimez1[1]-1), shutTimez1[0], shutTimez1[3],shutTimez1[4]);
	//var endTime = new Date(shutTimez1[0], (shutTimez1[1]-1), shutTimez1[2], shutTimez1[3],shutTimez1[4], 0, 0);
	//alert(endTime + "abcd11 ");
        var mins = durationz;
        var p = new Date(endTime.getTime() + mins*60000);
	//alert("SHOW TIME " + d + p);	
        if((d<p) && (viewMode === false))	
		createConfTable += '<div class="span2"><a data-toggle="modal" data-backdrop="static" href="#myModal3" class="btn"><i class="splashy-error_small"></i>Cancel Event</a></div>';

	document.getElementById("dataw2").innerHTML = createConfTable;
}
var StatID = 0;
var ShutR = 0;

function wizard_step2_1(adata)
{
	var i = 0;
	var createConfTable = '';
	createConfTable += '<div class="formSep control-group">';
		createConfTable += '<label for="v_street" class="control-label">Shutdown Event ID: '+outID+'</label>';
		createConfTable += '<button type="button" class="btn btn-primary" style="float:right;" onclick="keepReqAlive('+parseInt(outCY)+')">Refresh</button>';
	createConfTable += '</div>';
	createConfTable += '<div class="formSep control-group">';
		createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
		createConfTable += '<thead>';
			createConfTable += '<tr>';
				createConfTable += '<th>xxCompany</th>';
				createConfTable += '<th>Current Load (MW)</th>';
				createConfTable += '<th>Share %</th>';
				createConfTable += '<th>Sanctioned Load Considering Shutdown</th>';
				createConfTable += '<th>Shutdown Needed</th>';
				createConfTable += '<th>Suggested Shutdown</th>';
				createConfTable += '<th>Shutdown Requested</th>';
				createConfTable += '<th>Action to be taken</th>';
			createConfTable += '</tr>';
		createConfTable += '</thead>';
		createConfTable += '<tbody>';
		//canContinue = "Y";
		contFlag = 0;
		var CcurrentLoad = 0;
		var CsharePercent = 0;
		var CsanctionedLoadAfterShutdown = 0;
		var CshutdownNeeded = 0;
		//var CsuggestedShutdown = 0;
		for(i = 0; i < (adata.data.OUT2).length; i++)
		{
			//if(adata.data.OUT2[i].canContinue == "N")
			//{
			//	canContinue = "N";
			//	contFlag = 1;
			//}
			
			var compNAME = getCompName(adata.data.OUT2[i].companyID);
			var tdTstyle = 'style="border:0px;text-align:left"';
			var tdTNumstyle = 'style="text-align:right"';
			var tdTNumstyleT = 'style="text-align:left"';
			var tdTNumstyleE = 'style="text-align:right;background-color:#333; color:#fff;"';
			var tdTNumstyleTE = 'style="text-align:left;background-color:#333; color:#fff;"';

			if(parseInt(adata.data.OUT2[i].shutdownRequested))
				var sgstDown = '<input '+tdTNumstyle+' onkeypress="return ChkisNumber(event)" type="text" id="shutdownRequested_'+adata.data.OUT2[i].outageCompanyShareID+'" name="" class="span6" value="'+adata.data.OUT2[i].shutdownRequested+'"/>';
			else
				var sgstDown = adata.data.OUT2[i].shutdownRequested;

			CcurrentLoad += parseInt(adata.data.OUT2[i].currentLoad);
			CsharePercent += parseInt(adata.data.OUT2[i].sharePercent);
			CsanctionedLoadAfterShutdown += parseInt(adata.data.OUT2[i].sanctionedLoadAfterShutdown);
			CshutdownNeeded += parseInt(adata.data.OUT2[i].shutdownNeeded);
			//CsuggestedShutdown += parseInt(adata.data.OUT2[i].suggestedShutdown);

			createConfTable += '<tr class="odd">';
			createConfTable += '<td '+tdTNumstyleT+'>'+compNAME+'</td>';
			createConfTable += '<td '+tdTNumstyle+'>'+adata.data.OUT2[i].currentLoad+'</td>';
			createConfTable += '<td '+tdTNumstyle+'>'+adata.data.OUT2[i].sharePercent+'</td>';
			createConfTable += '<td '+tdTNumstyle+'>'+adata.data.OUT2[i].sanctionedLoadAfterShutdown+'</td>';
			createConfTable += '<td '+tdTNumstyle+'>'+adata.data.OUT2[i].shutdownNeeded+'</td>';
			createConfTable += '<td '+tdTNumstyle+'>'+adata.data.OUT2[i].suggestedShutdown+'</td>';
			createConfTable += '<td '+tdTNumstyle+'>'+sgstDown+'</td>';
			//if(parseInt(adata.data.OUT2[i].suggestedShutdown))
			//	createConfTable += '<td><div class="span2" onClick="requestApproval('+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Request Approval</a></div></td>';
			//else
			//	createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td><table '+tdTstyle+'>';
				createConfTable += '<tr><td '+tdTstyle+'>';
			switch(parseInt(adata.data.OUT2[i].outageApprovalStatusID))
			{
				case 1:
					//createConfTable += '<td>Not Requested</td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+2+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Request Approval</a></div></td>';
					contFlag = 1;
				break;
				case 2:
					//createConfTable += '<td>Requested</td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+3+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Re Request</a></div></td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+6+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Bypass</a></div></td>';
					contFlag = 1;
				break;
				case 3:
					//createConfTable += '<td>Requested Again</td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+3+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Re Request</a></div></td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+6+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Bypass</a></div></td>';
					contFlag = 1;
				break;
				case 4:
					createConfTable += '<td>Approved</td>';
				break;
				case 5:
					//createConfTable += '<td>Rejected</td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+8+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Request Again</a></div></td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+6+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Bypass</a></div></td>';
					contFlag = 1;
				break;
				case 6:
					createConfTable += '<td '+tdTstyle+'>Bypass Approval</td>';
				break;
				case 7:
					createConfTable += '<td '+tdTstyle+'>Not Needed</td>';
				break;
				case 8:
					//createConfTable += '<td>Requested Again After Response</td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+3+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Re Request</a></div></td>';
					createConfTable += '<td '+tdTstyle+'><div class="span2" onClick="requestApproval('+adata.data.OUT2[i].shutdownRequested+','+6+','+parseInt(outID)+','+parseInt(outCY)+','+parseInt(adata.data.OUT2[i].outageCompanyShareID)+')"><a data-toggle="modal" data-backdrop="static" href="#myModal2" class="btn">Bypass</a></div></td>';
					contFlag = 1;
				break;
				case 9:
					createConfTable += '<td>Cancelled</td>';
				break;
			}
			createConfTable += '</td>';
			createConfTable += '</tr>';						
			createConfTable += '</table>';
			createConfTable += '</td>';
			createConfTable += '</tr>';
		}
		createConfTable += '<tr style="background-color:#333; color:#fff;">';
			createConfTable += '<th '+tdTNumstyleTE+'>Total</th>';
			createConfTable += '<th '+tdTNumstyleE+'>'+CcurrentLoad+'</th>';
			createConfTable += '<th '+tdTNumstyleE+'>'+CsharePercent+'</th>';
			createConfTable += '<th '+tdTNumstyleE+'>'+CsanctionedLoadAfterShutdown+'</th>';
			createConfTable += '<th '+tdTNumstyleE+'>'+CshutdownNeeded+'</th>';
			createConfTable += '<th '+tdTNumstyleE+'>&nbsp;</th>';
			createConfTable += '<th '+tdTNumstyleE+'>&nbsp;</th>';
			createConfTable += '<th '+tdTNumstyleE+'>&nbsp;</th>';
		createConfTable += '</tr>';
		createConfTable += '</tbody>';
		createConfTable += '</table>';
	createConfTable += '</div>';
	
	createConfTable += '<div class="modal hide fade" id="myModal2">';
	createConfTable += '<div class="modal-header">';
		createConfTable += '<button class="close" data-dismiss="modal">×</button>';
		createConfTable += '<h3>Request Approval</h3>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-body" id="loadMod">';
		createConfTable += '<textarea id="rcomment" cols="1" rows="4" style="width:97%"></textarea>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-footer">';
		createConfTable += '<a href="javascript:sendRequestApproval();" class="btn"="modal">Submit</a>';
		createConfTable += '<a href="#" class="btn" data-dismiss="modal">Close</a>';
	createConfTable += '</div>';
	createConfTable += '</div>';
	
	createConfTable += '<div class="modal hide fade" id="myModal3">';
	createConfTable += '<div class="modal-header">';
		createConfTable += '<button class="close" data-dismiss="modal">×</button>';
		createConfTable += '<h3>Cancel Event</h3>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-body" id="loadModC">';
		createConfTable += '<textarea id="rcommentC" cols="1" rows="4" style="width:97%"></textarea>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-footer">';
		createConfTable += '<a href="javascript:requestC();" class="btn"="modal">Submit</a>';
		createConfTable += '<a href="#" class="btn" data-dismiss="modal">Close</a>';
	createConfTable += '</div>';
	createConfTable += '</div>';
	
	createConfTable += '<div class="span2"><a data-toggle="modal" data-backdrop="static" href="#myModal3" class="btn"><i class="splashy-error_small"></i>Cancel Event</a></div>';

	document.getElementById("dataw2").innerHTML = createConfTable;
}


function requestApproval(sr,sid,oid,cid,val)
{
	outID = oid;
	outCY = cid;
	reqAp = val;
	StatID = sid;
	ShutR = document.getElementById("shutdownRequested_" + val).value;
}

function requestC()
{
	var comment = document.getElementById("rcommentC").value;
	var JSONObject = new Object;
	JSONObject.jcase = "reqApCL";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "";
	JSONObject.query = "CALL sp_11kv_CancelOutageDetails("+parseInt(outID)+",'"+comment+"')";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("loadModC").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
	
}

function requestCS()
{
	var comment = "";/*document.getElementById("rcommentC").value;*/
	var JSONObject = new Object;
	JSONObject.jcase = "reqApCLCS";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "";
	JSONObject.query = "CALL sp_11kv_StopOutageInBetween("+parseInt(outID)+",'"+comment+"')";
	//JSONObject.query = "CALL sp_11kv_CancelOutageDetails("+parseInt(outID)+",'"+comment+"')";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("loadModCCS").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function sendRequestApproval()
{
	var comment = document.getElementById("rcomment").value;
	var JSONObject = new Object;
	JSONObject.jcase = "reqAp";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "";
	JSONObject.query = "CALL sp_11kv_requestapprovalforoutage("+parseInt(outID)+","+parseInt(reqAp)+","+parseInt(StatID)+",'"+comment+"',"+parseInt(ShutR)+")";
	JSONstring = JSON.stringify(JSONObject);
	//alert(JSONstring);
	document.getElementById("loadMod").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

function check_allSF(chid, len, opr)
{
	var i=0;
	var autoCount = 0;
	for(i=0; i<len; i++)
	{
		var oprA = "A";
		var oprD = "M";
		if(opr == "M")
		{
			var oprA = "M";
			var oprD = "A";
		}
		
		document.getElementById(oprD+chid+"_"+i).checked = false;
		if(oprA == "A")
		{
			if(oprA == "A" && document.getElementById(oprA+chid+"_"+i).style.visibility == "visible")
			{
				document.getElementById(oprA+chid+"_"+i).checked = true;
				autoCount++;
			}
			else
				document.getElementById(oprD+chid+"_"+i).checked = true;
		}
		else
		{
			document.getElementById(oprA+chid+"_"+i).checked = true;
			document.getElementById(oprD+chid+"_"+i).checked = false;
		}
	}
	if(autoCount == 0)
	{
		document.getElementById(chid+"_allM").checked = true;
		document.getElementById(chid+"_allA").checked = false;
	}
}

var aaal = null;
var bbbl = null;
var cccl = null;
var dddl = null;
var eeel = null;

function wizard_step3(adata,opr)
{
	var i = 0;
	var itr = 0;
	var createConfTable = '';
	if(NOCVAL == 0)
		NOCVAL = adata.data.NOC[0].numberOfCycles;
	createConfTable += '<div class="formSep control-group">';
	createConfTable += '<label for="v_street" class="control-label">Shutdown Event ID: '+parseInt(outID)+'</label>';
	createConfTable += '<label for="v_street" class="control-label">No of Cycles: '+NOCVAL+'</label>';
	createConfTable += '</div>';
	for(itr=1;itr<6;itr++)
	{
		var arrobj = "";
		var accID = "";
		var chkID = "";
		switch(itr)
		{
			case 1:
				if(opr == 0)
					arrobj = adata.data.OUT1;
				else
					arrobj = adata.data.OUT3;
				aaal = arrobj.length;
				accID = "collapseOne";
				chkID = "aaa";
			break;
			
			case 2:
				if(opr == 0)
					arrobj = adata.data.OUT2;
				else
					arrobj = adata.data.OUT4;
				bbbl = arrobj.length;
				accID = "collapseTwo";
				chkID = "bbb";
			break;
			
			case 3:
				if(opr == 0)
					arrobj = adata.data.OUT3;
				else
					arrobj = adata.data.OUT5;
				cccl = arrobj.length;
				accID = "collapseThree";
				chkID = "ccc";
			break;
			
			case 4:
				if(opr == 0)
					arrobj = adata.data.OUT4;
				else
					arrobj = adata.data.OUT6;
				dddl = arrobj.length;
				accID = "collapseFour";
				chkID = "ddd";
			break;
			
			case 5:
				if(opr == 0)
					arrobj = adata.data.OUT5;
				else
					arrobj = adata.data.OUT7;
				eeel = arrobj.length;
				accID = "collapseFive";
				chkID = "eee";
			break;
		}
		
		var countFN = 0;
		var countSN = 0;
		
		var oldvalFN = "";
		var oldvalSN = "";
		
		for(k=0;k<arrobj.length;k++)
		{
			if(oldvalFN != arrobj[k].FEEDER_NAME)
			{
				oldvalFN = arrobj[k].FEEDER_NAME;
				countFN++;
			}

			if(oldvalSN != arrobj[k].STATION)
			{
				oldvalSN = arrobj[k].STATION;
				countSN++;
			}
		}
		createConfTable += '<div class="control-group">';
		createConfTable += '<div id="side_accordion" class="accordion">';
			
			createConfTable += '<div class="accordion-group">';
				createConfTable += '<div class="accordion-heading">';
					createConfTable += '<a href="#'+accID+'" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">';
					createConfTable += '<i class="icon-th"></i>'+getCompName(itr);
					createConfTable += '</a>';
						
						createConfTable += '<table>';
						createConfTable += '<tr>';
						createConfTable += '<td>Cycle 1: '+countSN+' Stations '+countFN+' feeders</td>';
						
						if(arrobj.length)
						{
							createConfTable += '<td>&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="'+chkID+'_allA" id="'+chkID+'_allM" checked onclick="check_allSF(\''+chkID+'\',\''+arrobj.length+'\',\'M\')"/>&nbsp;&nbsp;All Manual</td>';
							createConfTable += '<td>&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="'+chkID+'_allA" id="'+chkID+'_allA" onclick="check_allSF(\''+chkID+'\',\''+arrobj.length+'\',\'A\')"/>&nbsp;&nbsp;All Automatic</td>';
						}
						//createConfTable += '</tr>';
						//createConfTable += '<tr>';
						createConfTable += '</tr>';
						createConfTable += '</table>';
						
				createConfTable += '</div>';
				createConfTable += '<div class="accordion-body collapse" id="'+accID+'">';
					createConfTable += '<div class="accordion-inner">';
						//createConfTable += '9 AM to 12 PM';
						createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
						createConfTable += '<thead>';
							createConfTable += '<tr>';
								createConfTable += '<th>Station</th>';
								createConfTable += '<th>Feeder</th>';
								createConfTable += '<th>Category</th>';
								createConfTable += '<th>Manual/Automated</th>';
							createConfTable += '</tr>';
						createConfTable += '</thead>';
						createConfTable += '<tbody>';
						for(i = 0; i < arrobj.length; i++)
						{
							createConfTable += '<tr class="odd">';
								createConfTable += '<td>'+arrobj[i].STATION+'</td>';
								createConfTable += '<td>'+arrobj[i].FEEDER_NAME+'</td>';
								createConfTable += '<td>'+arrobj[i].FEEDER_CATEGORY+'</td>';
								createConfTable += '<td>';
								var style = 'style="visibility:hidden"';

								if(arrobj[i].isAutomaticAllowed == "N")
									createConfTable += '<input type="radio" name="'+chkID+'_'+i+'" id="A'+chkID+'_'+i+'" title="'+arrobj[i].FeederID+'" '+style+'/>';
								else
									createConfTable += '<input type="radio" name="'+chkID+'_'+i+'" id="A'+chkID+'_'+i+'" title="'+arrobj[i].FeederID+'"/> Automatic';

								createConfTable += '<br>';
								createConfTable += '<input type="radio" name="'+chkID+'_'+i+'" id="M'+chkID+'_'+i+'"  title="'+arrobj[i].FeederID+'" checked/> Manual';
								createConfTable += '</td>';
							createConfTable += '</tr>';
						}
						createConfTable += '</tbody>';
						createConfTable += '</table>';
					createConfTable += '</div>';
				createConfTable += '</div>';
			createConfTable += '</div>';
		createConfTable += '</div>';
	}
	document.getElementById("dataw3").innerHTML = createConfTable;
}

function getTimeSplit(bTime)
{
	var tmp = bTime.split(" ");
	return tmp[1];
}

function removeSecondsFromDateTime(bTime)
{
	if(bTime != null)
	{
		var tmp1 = bTime.split(" ");
		var tmp2 = tmp1[1].split(":");
		return tmp1[0]+" "+tmp2[0]+":"+tmp2[1];
	}
	return bTime;
}

/*
JSONresponse ='{"jcase":"wizard_opr_next3","container":"","data":[{"OUT1":[{"outageCycleID":"7599","outageID":"432","cycleNumber":"1","cyclePlannedStartTime":"2014-04-27 00:00:00","cyclePlannedEndTime":"2014-04-27 00:02:00","isCancelled":"N","cycleStoppedTime":null}],"OUT2":[{"outageCycleID":"7599","outageID":"432","cycleNumber":"1","cyclePlannedStartTime":"2014-04-27 00:00:00","cyclePlannedEndTime":"2014-04-27 00:02:00","isCancelled":"N","cycleStoppedTime":null,"companyID":"1","NumFeeders":"200","NumFeedersShutdown":"0"}],"OUT3":null,"OUT4":null,"OUT5":null,"OUT6":null,"OUT7":null,"OUT8":null,"OUT9":null}],"error":"0"}';
parseJSON(JSONresponse);
*/

var createConfTable2 = "";

function fillmeAgain()
{
	document.getElementById("loadModCCS").innerHTML = '<textarea id="rcommentC" cols="1" rows="4" style="width:97%"></textarea>';
}

function wizard_step4(adata,opr)
{
	var itdx = 0;
	
	var arrobjnew = null;
	var arrobjnew2 = null;
	
	if(opr == 0)
	{
		arrobjnew2 = adata.data[0].OUT2;
		arrobjnew = adata.data[0].OUT2;
	}
	else
	{
		arrobjnew2 = adata.data.OUT9;
		arrobjnew = adata.data.OUT9;
	}
	//alert(arrobjnew.length+"_"+arrobjnew[0].companyID+"_"+adata.data[0].OUT2[0].companyID);
	
	
	var createConfTable = "";
	
	createConfTable += '<div class="modal hide fade" id="myModal4">';
	createConfTable += '<div class="modal-header">';
		createConfTable += '<button class="close" data-dismiss="modal">×</button>';
		createConfTable += '<h3>Stop Ongoing Outage</h3>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-body" id="loadModCCS">';
		createConfTable += '<textarea id="rcommentC" cols="1" rows="4" style="width:97%"></textarea>';
	createConfTable += '</div>';
	createConfTable += '<div class="modal-footer">';
		createConfTable += '<a href="javascript:requestCS();" class="btn"="modal">Submit</a>';
		createConfTable += '<a href="#" class="btn" data-dismiss="modal">Close</a>';
	createConfTable += '</div>';
	createConfTable += '</div>';

	createConfTable += '<div class="formSep control-group">';
	createConfTable += '<label for="v_message" class="control-label">Shutdown Event ID: '+outID+'</label>';
	createConfTable += '<div class="controls">';
	//createConfTable += '<button type="button" class="btn btn-primary" style="margin-left:10px;float:right;" onClick="requestCS()"><i class="icon-ok icon-white"></i> Stop Ongoing Process</button>';

	var d = new Date();
	//alert(shutTimez);
	//var endTimeString = shutTimez.replace(" ","T");
	//var endTime = new Date(endTimeString);
	//alert(endTimeString);
	//alert("shutTimez1");
	//alert(shutTimez1);
	//alert("Given Time "+shutTimez1[0]+(shutTimez1[1]-1) + shutTimez1[2] + shutTimez1[3] + shutTimez1[4]);
	//var endTime = new Date(shutTimez1[2], (shutTimez1[1]-1), shutTimez1[0], shutTimez1[3],shutTimez1[4]);
	var endTime = new Date(shutTimez1[0], (shutTimez1[1]-1), shutTimez1[2], shutTimez1[3],shutTimez1[4], 0, 0);
	//alert("endTime");
	//alert(endTime);
	var mins = durationz; 
	//alert(mins);
	var p = new Date(endTime.getTime() + mins*60000);
	//alert(p);
	//alert("SHOW TIME " + d + p);
	
	if(d<p  && !(stoppedInBetweenTime)){
		//alert(stoppedInBetweenTime);
		createConfTable += '<div class="span6"><a data-toggle="modal" data-backdrop="static" href="#myModal4" class="btn btn-danger" onclick="fillmeAgain()"><i class="splashy-error_small"></i>Stop Ongoing Process</a></div>';
		createConfTable += '<div class="span6"><a data-toggle="modal" data-backdrop="static" class="btn" onclick="refreshStep4('+outID+')">Refresh</div>';
	}

	createConfTable += '</div>';
	createConfTable += '</div>';
	var compID = new Array();
	
	var cyNum1 = new Array();
	var cyNum2 = new Array();
	var cyNum3 = new Array();
	var cyNum4 = new Array();
	var cyNum5 = new Array();

	var cyID = new Array();
/*	var cyID2 = new Array();
	var cyID3 = new Array();
	var cyID4 = new Array();
	var cyID5 = new Array();*/
	
	
	var NumFd1 = new Array();
	var NumFd2 = new Array();
	var NumFd3 = new Array();
	var NumFd4 = new Array();
	var NumFd5 = new Array();
	
	var Stime1 = new Array();
	var Stime2 = new Array();
	var Stime3 = new Array();
	var Stime4 = new Array();
	var Stime5 = new Array();
	
	var Etime1 = new Array();
	var Etime2 = new Array();
	var Etime3 = new Array();
	var Etime4 = new Array();
	var Etime5 = new Array();
	
	var NumFS1 = new Array();
	var NumFS2 = new Array();
	var NumFS3 = new Array();
	var NumFS4 = new Array();
	var NumFS5 = new Array();

	var iter = 0;
	for(itdx=0;itdx<(arrobjnew).length;itdx++)
	{
		if(compID.indexOf((arrobjnew[itdx].companyID)) == -1 && arrobjnew[itdx].companyID != null)
		{
			compID[iter] = (arrobjnew[itdx].companyID);
			iter++;
		}
	}

	var subid1 = 0;
	var subid2 = 0;
	var subid3 = 0;
	var subid4 = 0;
	var subid5 = 0;
	
	for(k=0;k<(arrobjnew2).length;k++)
	{
		if(compID[0] && (compID[0] == arrobjnew[k].companyID || arrobjnew[k].companyID == null))
		{
			cyNum1[subid1] = arrobjnew2[k].cycleNumber;
			cyID[subid1] = arrobjnew2[k].outageCycleID;
			NumFd1[subid1] = arrobjnew2[k].NumFeeders;
			Stime1[subid1] = convertDateFormat(arrobjnew2[k].cyclePlannedStartTime,"-"," ");
			Etime1[subid1] = convertDateFormat(arrobjnew2[k].cyclePlannedEndTime,"-"," ");
			NumFS1[subid1] = arrobjnew2[k].NumFeedersShutdown;
			subid1++;
		}
		if(compID[1] && (compID[1] == arrobjnew[k].companyID || arrobjnew[k].companyID == null))
		{
			cyNum2[subid2] = arrobjnew2[k].cycleNumber;
			cyID[subid2] = arrobjnew2[k].outageCycleID;
			NumFd2[subid2] = arrobjnew2[k].NumFeeders;
			Stime2[subid2] = convertDateFormat(arrobjnew2[k].cyclePlannedStartTime,"-"," ");
			Etime2[subid2] = convertDateFormat(arrobjnew2[k].cyclePlannedEndTime,"-"," ");
			NumFS2[subid2] = arrobjnew2[k].NumFeedersShutdown;
			subid2++;
		}
		if(compID[2] && (compID[2] == arrobjnew[k].companyID || arrobjnew[k].companyID == null))
		{
			cyNum3[subid3] = arrobjnew2[k].cycleNumber;
			cyID[subid3] = arrobjnew2[k].outageCycleID;
			NumFd3[subid3] = arrobjnew2[k].NumFeeders;
			Stime3[subid3] = convertDateFormat(arrobjnew2[k].cyclePlannedStartTime,"-"," ");
			Etime3[subid3] = convertDateFormat(arrobjnew2[k].cyclePlannedEndTime,"-"," ");
			NumFS3[subid3] = arrobjnew2[k].NumFeedersShutdown;
			subid3++;
		}
		if(compID[3] && (compID[3] == arrobjnew[k].companyID || arrobjnew[k].companyID == null))
		{
			cyNum4[subid4] = arrobjnew2[k].cycleNumber;
			cyID[subid4] = arrobjnew2[k].outageCycleID;
			NumFd4[subid4] = arrobjnew2[k].NumFeeders;
			Stime4[subid4] = convertDateFormat(arrobjnew2[k].cyclePlannedStartTime,"-"," ");
			Etime4[subid4] = convertDateFormat(arrobjnew2[k].cyclePlannedEndTime,"-"," ");
			NumFS4[subid4] = arrobjnew2[k].NumFeedersShutdown;
			subid4++;
		}
		if(compID[4] && (compID[4] == arrobjnew[k].companyID || arrobjnew[k].companyID == null))
		{
			cyNum5[subid5] = arrobjnew2[k].cycleNumber;
			cyID[subid5] = arrobjnew2[k].outageCycleID;
			NumFd5[subid5] = arrobjnew2[k].NumFeeders;
			Stime5[subid5] = convertDateFormat(arrobjnew2[k].cyclePlannedStartTime,"-"," ");
			Etime5[subid5] = convertDateFormat(arrobjnew2[k].cyclePlannedEndTime,"-"," ");
			NumFS5[subid5] = arrobjnew2[k].NumFeedersShutdown;
			subid5++;
		}
	}
	
	for(j=0;j<(compID).length;j++)
	{
		/*
		for(k=0;k<cyNum1.length;k++)
			alert("1_"+cyNum1[k]);
		for(k=0;k<cyNum2.length;k++)
			alert("2_"+cyNum2[k]);
		for(k=0;k<cyNum3.length;k++)
			alert("3_"+cyNum3[k]);
		for(k=0;k<cyNum4.length;k++)
			alert("4_"+cyNum4[k]);
		for(k=0;k<cyNum5.length;k++)
			alert("5_"+cyNum5[k]);
		*/
		
		createConfTable += '<div class="control-group">';
		
			createConfTable += '<div id="side_accordion" class="accordion">';
				
				createConfTable += '<div class="accordion-group">';
					createConfTable += '<div class="accordion-heading">';
						//createConfTable += '<a href="#collapseSix" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">';
							
							createConfTable += '<table>';
							createConfTable += '<tr>';
							createConfTable += '<td><i class="icon-th"></i>'+getCompName(compID)+'</td>';
							createConfTable += '</tr>';
							createConfTable += '<tr>';
							createConfTable += '<td>';
								createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
								createConfTable += '<thead>';
									createConfTable += '<tr>';
										createConfTable += '<th>Cycle #</th>';
										createConfTable += '<th>Cycle Date-Time</th>';
										createConfTable += '<th>No. Of Feeders</th>';
										createConfTable += '<th>Feeders Shutdown</th>';
										createConfTable += '<th>Action</th>';
									createConfTable += '</tr>';
								createConfTable += '</thead>';
								createConfTable += '<tbody>';

								for(k=0;k<cyNum1.length;k++)
								{
									switch(j)
									{
										case 0:
											var cyNu = cyNum1[k];
											var outCyId = cyID[k];
											var NumF = NumFd1[k];
											var Stim = Stime1[k];
											var Etim = Etime1[k];
											var NumFS = NumFS1[k];
										break;

										case 1:
											var cyNu = cyNum2[k];
											var outCyId = cyID[k];
											var NumF = NumFd2[k];
											var Stim = Stime2[k];
											var Etim = Etime2[k];
											var NumFS = NumFS2[k];
										break;

										case 2:
											var cyNu = cyNum3[k];
											var outCyId = cyID[k];
											var NumF = NumFd3[k];
											var Stim = Stime3[k];
											var Etim = Etime3[k];
											var NumFS = NumFS3[k];
										break;

										case 3:
											var cyNu = cyNum4[k];
											var outCyId = cyID[k];
											var NumF = NumFd4[k];
											var Stim = Stime4[k];
											var Etim = Etime4[k];
											var NumFS = NumFS4[k];
										break;

										case 4:
											var cyNu = cyNum5[k];
											var outCyId = cyID[k];
											var NumF = NumFd5[k];
											var Stim = Stime5[k];
											var Etim = Etime5[k];
											var NumFS = NumFS5[k];
										break;
									}
									createConfTable += '<tr class="odd">';
										if(NumF == null)
											var iamView = '';
										else
											var iamView = '<a href="javascript:viewFeed(\''+outCyId+'\',\''+outID+'\',\''+compID+'\',\''+Stim+'\',\''+Etim+'\')">View</a>';
											//var iamView = '<a href="javascript:viewFeed_old(\''+Stim+'\',\''+Etim+'\',\''+compID+'\')">View</a>';
										createConfTable += '<td>'+setNulltoEmpty(cyNu)+'</td>';
										createConfTable += '<td>'+setNulltoEmpty(removeSecondsFromDateTime(Stim))+' - '+setNulltoEmpty(removeSecondsFromDateTime(Etim))+'</td>';
										createConfTable += '<td>'+setNulltoEmpty(NumF)+'</td>';
										createConfTable += '<td>'+setNulltoEmpty(NumFS)+'</td>';
										createConfTable += '<td>'+iamView+'</td>';
									createConfTable += '</tr>';
								}
								createConfTable += '</tbody>';
								createConfTable += '</table>';
							createConfTable += '</td>';
							createConfTable += '</tr>';
							createConfTable += '</table>';
						//createConfTable += '</a>';
					createConfTable += '</div>';
				createConfTable += '</div>';
			createConfTable += '</div>';
	}
	createConfTable += '<div id="loadModTFC">';
	createConfTable += '</div>';
	
	document.getElementById("dataw4").innerHTML = createConfTable;
}

var viewst ="";
var viewet ="";
var viewcd ="";
var viewocd ="";

function CloseviewFeed()
{
	document.getElementById("loadModTFC").style.display = "none";
}

function viewFeed(outageCycleID, outageID, companyID, st, et)
{
        document.getElementById("loadModTFC").style.display = "block";
        document.getElementById("loadModTFC").style.zIndex = "100";
        document.getElementById("loadModTFC").style.position = "relative";
        document.getElementById("loadModTFC").style.width = "100%";
        document.getElementById("loadModTFC").style.height = "100%";
        document.getElementById("loadModTFC").style.top = "0px";
        document.getElementById("loadModTFC").style.left = "0px";
        document.getElementById("loadModTFC").style.backgroundColor = "#DDDDDD";

        viewst = st;
        viewet = et;
        viewcd = companyID;
	viewocd = outageCycleID;
 
        var JSONObject = new Object;
        JSONObject.jcase = "viewFeed";
        JSONObject.container = "";
        JSONObject.database = db_name;
        JSONObject.tablename = "";
        JSONObject.stime = st;
        JSONObject.etime = et;
        JSONObject.query = "CALL sp_11kv_gettrackinfoforcycle("+parseInt(outageCycleID)+","+parseInt(companyID)+")";
//	document.getElementById("loadModTFC").innerHTML = "CALL sp_11kv_gettrackinfoforcycle("+parseInt(outageCycleID)+","+parseInt(companyID)+")";
        JSONstring = JSON.stringify(JSONObject);
        document.getElementById("loadModTFC").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
        runAjax(parser_page,JSONstring);
}

function viewFeed_old(st, et, cd)
{
	document.getElementById("loadModTFC").style.display = "block";
	document.getElementById("loadModTFC").style.zIndex = "100";
	document.getElementById("loadModTFC").style.position = "relative";
	document.getElementById("loadModTFC").style.width = "100%";
	document.getElementById("loadModTFC").style.height = "100%";
	document.getElementById("loadModTFC").style.top = "0px";
	document.getElementById("loadModTFC").style.left = "0px";
	document.getElementById("loadModTFC").style.backgroundColor = "#DDDDDD";

	viewst = st;
	viewet = et;
	viewcd = cd;
	var JSONObject = new Object;
	JSONObject.jcase = "viewFeed";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "";
	JSONObject.stime = st;
	JSONObject.etime = et;
	JSONObject.query = "CALL sp_11kv_gettrackinfoforcycle("+parseInt(outCY)+","+parseInt(cd)+")";
	JSONstring = JSON.stringify(JSONObject);
	document.getElementById("loadModTFC").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
}

var viewadata = null;

function uviewFeedDetails(opr)
{
	viewFeedDetails(viewadata, opr);
}
function viewFeedDetails(adata, sall)
{
	viewadata = adata;
	var createConfTable = '';
	var shutNULL = 0;
	var fLoad = parseFloat(0);
	for(i=0;i<(adata.data.OUT1).length;i++)
	{
		if(adata.data.OUT1[i].feederShutdownTime != null)
			shutNULL++;
			
		fLoad += parseFloat(adata.data.OUT1[i].feederLoad);
	}
	
	fLoad = parseInt(fLoad);
	
	createConfTable += '<h3 class="heading">'+adata.data.CYC+'</h3>';
	createConfTable += '<div class="row-fluid">';
	createConfTable += '<table>';
		createConfTable += '<tr>';
		createConfTable += '<td>';
		
		createConfTable += '<table>';
		
			/*
			createConfTable += '<tr>';
			createConfTable += '<td>Shutdown ID: '+outID+'</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '</tr>';
			*/
			createConfTable += '<tr>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '</tr>';
			/*
			createConfTable += '<tr>';
			createConfTable += '<td>Shutdown Time : '+convertDateFormat(shutTimez,"-"," ")+'</td>';
			createConfTable += '<td>&nbsp;&nbsp;&nbsp;Duration : '+durationz+'</td>';
			createConfTable += '<td>&nbsp;&nbsp;&nbsp;Cycle : '+adata.data.ST+' to '+adata.data.ET+'</td>';
			createConfTable += '</tr>';
			
			createConfTable += '<tr>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '</tr>';
			*/
			createConfTable += '<tr>';
			createConfTable += '<td>Total # of feeders shutdown : '+shutNULL+'/'+(adata.data.OUT1).length+'</td>';
			createConfTable += '<td>Total Load Relief : '+fLoad+' MW</td>';
			createConfTable += '<td>&nbsp;</td>';
			createConfTable += '</tr>';

			createConfTable += '<tr>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '<td></td>';
			createConfTable += '</tr>';

			createConfTable += '<tr>';
			if(sall)
			{
				createConfTable += '<td><input type="radio" name="xyzz" checked onclick="uviewFeedDetails('+1+')"/>Show All</td>';
				createConfTable += '<td><input type="radio" name="xyzz" onclick="uviewFeedDetails('+0+')"/>Show Feeders not Shutdown</td>';
			}
			else
			{
				createConfTable += '<td><input type="radio" name="xyzz" onclick="uviewFeedDetails('+1+')"/>Show All</td>';
				createConfTable += '<td><input type="radio" name="xyzz" checked onclick="uviewFeedDetails('+0+')"/>Show Feeders not Shutdown</td>';
			}
			//createConfTable += '<td><input type="button" onclick="viewFeed(\''+viewst+'\', \''+viewet+'\', \''+viewcd+'\')" value="Refresh" name="confSave" class="btn btn-inverse pull-right"></td>';
			createConfTable += '<td><input type="button" onclick="viewFeed(\''+viewocd+'\',\''+parseInt(outCY)+'\',\''+viewcd+'\', \''+viewst+'\', \''+viewet+'\')" value="Refresh" name="confSave" class="btn btn-inverse pull-right"></td>';
			createConfTable += '<td><input type="button" onclick="CloseviewFeed()" value="Close" name="confSave" class="btn btn-inverse pull-right"></td>';			
			createConfTable += '</tr>';

		createConfTable += '</table>';

		createConfTable += '</td>';
		createConfTable += '</tr>';

		createConfTable += '<tr>';
		createConfTable += '<td>&nbsp;</td>';
		createConfTable += '</tr>';

		createConfTable += '<tr>';
		createConfTable += '<td>';
		createConfTable += '<table class="table table-striped table-bordered dTableR dataTable">';
			createConfTable += '<thead>';
			
				createConfTable += '<tr>';
				createConfTable += '<th>Feeder</th>';
				createConfTable += '<th>Station</th>';
				createConfTable += '<th>Category</th>';
				createConfTable += '<th>Manual/Automatic</th>';
				createConfTable += '<th>Last Notification Time</th>';
				createConfTable += '<th>Shutdown Time</th>';
				createConfTable += '</tr>';
				
			createConfTable += '</thead>';
			
		createConfTable += '<tbody>';

		 var d = new Date();
                 //var endTimeString = shutTimez.replace(" ","T");
		 //var endTime = new Date(shutTimez1[2], (shutTimez1[1]-1), shutTimez1[0], shutTimez1[3],shutTimez1[4]);                 
		 var endTime = new Date(shutTimez1[0], (shutTimez1[1]-1), shutTimez1[2], shutTimez1[3],shutTimez1[4], 0, 0);
                 var mins = durationz;
                 var p = new Date(endTime.getTime() + mins*60000);
		 //alert("SHOW TIME " + d + p);
	
		for(i=0;i<(adata.data.OUT1).length;i++)
		{
			if(sall)
			{
				var mode = "Manual";
				if(adata.data.OUT1[i].isAutomaticAllowed == "Y")
					mode ="Automatic";
				createConfTable += '<tr class="even">';
				createConfTable += '<td>'+adata.data.OUT1[i].FEEDER_NAME+'</td>';
				createConfTable += '<td>'+adata.data.OUT1[i].STATION+'</td>';
				createConfTable += '<td>'+adata.data.OUT1[i].FEEDER_CATEGORY+'</td>';
				createConfTable += '<td>'+mode+'</td>';
				createConfTable += '<td id="lastNotification_'+adata.data.OUT1[i].Class8GeoID+'">'+setNulltoEmpty(adata.data.OUT1[i].stationHeadLastRequestTime)+'</td>';
				createConfTable += '<td>';
				if(adata.data.OUT1[i].feederShutdownTime == null)
				{
					createConfTable += '<table>';
					
					createConfTable += '<tr>';
					createConfTable += '<td>Not Yet</td>';
					createConfTable += '<td><input type="radio" name="xyz_'+i+'" checked/>Manually</td>';
					createConfTable += '</tr>';
					
					createConfTable += '<tr>';
				        if(d<p){
						//createConfTable += '<td><input type="submit" onclick="#" value="Re-Request" name="confSave" class="btn btn-inverse pull-left"></td>';
						createConfTable += '<td><input type="button" onclick="reRequestFeederShutdown(\''+viewocd+'\',\''+adata.data.OUT1[i].Class8GeoID+'\')" value="Re-Request" name="confSave" class="btn btn-inverse pull-left"></td>';
					}
					if(adata.data.OUT1[i].isAutomatcAllowed == "Y")
						createConfTable += '<td><input type="radio" name="xyz_'+i+'" />Automatic</td>';
					else
						createConfTable += '<td></td>';
					createConfTable += '</tr>';
					
					createConfTable += '</table>';
				}
				else
					createConfTable += adata.data.OUT1[i].feederShutdownTime;
				createConfTable += '</td>';
				createConfTable += '</tr>';
			}
			else
			{
				if(adata.data.OUT1[i].feederShutdownTime == null)
				{
					var mode = "Manual";
					if(adata.data.OUT1[i].isAutomaticAllowed == "Y")
						mode ="Automatic";
					createConfTable += '<tr class="even">';
					createConfTable += '<td>'+adata.data.OUT1[i].FEEDER_NAME+'</td>';
					createConfTable += '<td>'+adata.data.OUT1[i].STATION+'</td>';
					createConfTable += '<td>'+adata.data.OUT1[i].FEEDER_CATEGORY+'</td>';
					createConfTable += '<td>'+mode+'</td>';
					createConfTable += '<td id="lastNotification_'+adata.data.OUT1[i].Class8GeoID+'">'+setNulltoEmpty(adata.data.OUT1[i].stationHeadLastRequestTime)+'</td>';
					createConfTable += '<td>';
					if(adata.data.OUT1[i].feederShutdownTime == null)
					{
						createConfTable += '<table>';
						
						createConfTable += '<tr>';
						createConfTable += '<td>Not Yet</td>';
						createConfTable += '<td><input type="radio" name="xyz_'+i+'" checked/>Manually</td>';
						createConfTable += '</tr>';
						
						createConfTable += '<tr>';
						if(d<p){
							//createConfTable += '<td><input type="submit" onclick="#" value="Re-Request" name="confSave" class="btn btn-inverse pull-left"></td>';
							createConfTable += '<td><input type="button" onclick="reRequestFeederShutdown(\''+viewocd+'\',\''+adata.data.OUT1[i].Class8GeoID+'\')" value="Re-Request" name="confSave" class="btn btn-inverse pull-left"></td>';
						}
						if(adata.data.OUT1[i].isAutomaticAllowed == "Y")
							createConfTable += '<td><input type="radio" name="xyz_'+i+'" />Automatic</td>';
						else
							createConfTable += '<td></td>';
						createConfTable += '</tr>';
						
						createConfTable += '</table>';
					}
					else
						createConfTable += adata.data.OUT1[i].feederShutdownTime;
					createConfTable += '</td>';
					createConfTable += '</tr>';
				}
			}
		}
		createConfTable += '</tbody>';
		createConfTable += '</table>';
		createConfTable += '</td>';
		createConfTable += '</tr>';


	createConfTable += '</table>';
	createConfTable += '</div>';
	document.getElementById("loadModTFC").innerHTML = createConfTable;
}

function reRequestFeederShutdown(outageCycleID, outageFeederId)
{
	var JSONObject = new Object;
	var d = new Date;
	JSONObject.jcase = "reRequestFeederShutdown";
	JSONObject.container = "";
	JSONObject.database = db_name;
	JSONObject.tablename = "";
	JSONObject.NewRequestTime = d;
	JSONObject.outageCycleFeederID = outageFeederId;
	JSONObject.query = 'CALL sp_11kv_shutdownfeederssendreminder('+outageCycleID+', '+outageFeederId+')';
	JSONstring = JSON.stringify(JSONObject);
	var elementId = 'lastNotification_'+outageFeederId;
	document.getElementById(elementId).innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
	runAjax(parser_page,JSONstring);
	
}

function reRequestFeederShutdownUpdate(adata)
{
	var elementId = 'lastNotification_'+adata.data.outageCycleFeederID;
	var currentTime = new Date();

	var currentOffset = currentTime.getTimezoneOffset();

	var ISTOffset = 330;   // IST offset UTC +5:30 

	var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

	var lastNotificationTime = ISTTime.getDate() + "-" + (ISTTime.getMonth()+1) + "-" + ISTTime.getFullYear() + " " + ISTTime.getHours() + ":" + ISTTime.getMinutes();
	//alert(lastNotificationTime);
	document.getElementById(elementId).innerHTML = lastNotificationTime;
//	viewFeed(viewocd,parseInt(outCY),viewcd,viewst,viewet);
}
