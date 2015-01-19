<?php
    require("belint_src/php/Core.php");
	// this starts the session 
	session_start();
	if(isset($_SESSION["username"]))
	{
		$llstat = "S";
		$user = $_SESSION["username"];
		$objJSON = new JsonClass();
		$query = "SELECT * FROM tbl_11kv_user WHERE username='".$user."'";
		$mysqlData = $objJSON->executeSQL(SQL_DB, "tbl_11kv_user", $query, "SELECT");
		if($mysqlData[0]["time_out"] == "0")
		{
			$llstat = "F";
			session_destroy();
		}
 	}
	else
	{
		session_destroy();
		header("Location: index.php"); /* Redirect browser */
		exit();
		$llstat = "F";
	}
	if(!isset($_SESSION["PageStat"]))
		$_SESSION["PageStat"] = 2;
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SLDC | 11KV Feeder Shutdown Protocol</title>
    
        <!-- Bootstrap framework -->
            <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />
            <link rel="stylesheet" href="bootstrap/css/bootstrap-responsive.min.css" />
        <!-- breadcrumbs-->
            <link rel="stylesheet" href="lib/jBreadcrumbs/css/BreadCrumb.css" />
        <!-- tooltips-->
            <link rel="stylesheet" href="lib/qtip2/jquery.qtip.min.css" />
        <!-- notifications -->
            <link rel="stylesheet" href="lib/sticky/sticky.css" />    
        <!-- splashy icons -->
            <link rel="stylesheet" href="img/splashy/splashy.css" />
        <!-- wizard -->
            <link rel="stylesheet" href="lib/stepy/css/jquery.stepy.css" />
        <!-- colorbox -->
            <link rel="stylesheet" href="lib/colorbox/colorbox.css" />  
            
		<!-- datepicker -->
            <link rel="stylesheet" href="lib/datepicker/datepicker.css" />

        <!-- splashy icons -->
            <link rel="stylesheet" href="img/splashy/splashy.css" />

        <!-- gebo color theme-->
            <link rel="stylesheet" href="css/blue.css" id="link_theme" />
        <!-- main styles -->
            <link rel="stylesheet" href="css/style.css" />
            
            <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=PT+Sans" />
    
		<!-- toggle buttons -->
            <link rel="stylesheet" href="lib/toggle_buttons/bootstrap-toggle-buttons.css" />
        <!-- jQuery UI theme-->
            <link rel="stylesheet" href="lib/jquery-ui/css/Aristo/Aristo.css" />
        <!-- Favicon -->
            <link rel="shortcut icon" href="favicon.ico" />

        <!-- Clean Sticky Footer -->
 		<link rel="stylesheet" type="text/css" href="css/fstyles.css" media="screen" charset="utf-8" />
        
        <!--[if lte IE 8]>
            <link rel="stylesheet" href="css/ie.css" />
            <script src="js/ie/html5.js"></script>
            <script src="js/ie/respond.min.js"></script>
        <![endif]-->
        <style>
			#footer 
			{
				text-align:right;
				height: 20px;
				background-color:#333;
				color:#FFF;
				width:100%;
				margin:0px;
				padding:0px;
				float:right;
				vertical-align:middle;
			}
        </style>
		<script>var userna = "<?php echo $_SESSION["username"]; ?>";</script>
		<script>var user_id = "<?php echo $_SESSION["user_id"]; ?>";</script>
		<script>var cmp_id = "<?php echo $_SESSION['company_id']; ?>";</script>
		<script>var db_name = "<?php echo SQL_DB; ?>";</script>
		<script>var PageStat = "<?php echo $_SESSION["PageStat"]; ?>";</script>
		<script>var wizid = "<?php if(isset($_REQUEST["wizid"])) echo $_REQUEST["wizid"]; ?>";</script>

        <script src="belint_src/js/ajax.js"></script>
        <script src="belint_src/js/funcall.js"></script>
        <script src="belint_src/js/error.js"></script>
		<script>var llstat = "<?php echo $llstat; ?>";</script>
        <script type="text/javascript">
            //* hide all elements & show preloader
            document.documentElement.className += 'js';
			
			function load_home()
			{
				contFlag = 0;

				var atoday = new Date();
				var add = atoday.getDate();
				var amm = atoday.getMonth()+1;
				var ayyyy = atoday.getFullYear();
				
				var fDate = add+"-"+amm+"-"+ayyyy;
				
				document.getElementById("datedp2").value = fDate;
					
				if(llstat == "F")
				{
					log_me_out();
					return;
				}
				decrease_timeOut(userna);
				home_pagew(userna);
				document.getElementById("M1").style.fontWeight = "bold";
				//viewhistoryGet();
				getStepDetails(1);
				/*
				switch(PageStat)
				{
					case "1":
					document.getElementById("M1").style.fontWeight = "bold";
					getStepDetails(1);
					break;
					
					case "2":
					document.getElementById("M2").style.fontWeight = "bold";
					viewhistoryGet();
					break;
					
					case "3":
					document.getElementById("M3").style.fontWeight = "bold";
					stationFunc();
					break;
					
					case "4":
					document.getElementById("M4").style.fontWeight = "bold";
					confFunc();
					break;
				}
				*/
			}
			
			function openWizard()
			{
				getStepDetails(1);
				document.getElementById("body_main_pane").innerHTML = "<center><img src='img/ajax_loader.gif'></center>";
				document.location = "wizard.php";//?user="+userna+"&user_id="+user_id+"&cmp_id="+cmp_id;
			}

        </script>
    </head>
    <body onLoad="load_home()">
        <div id="loading_layer" style="display:none"><img src="img/ajax_loader.gif" alt="" /></div>
        
        <div id="maincontainer" class="clearfix">
            <!-- header -->
            <header>
                <div class="navbar navbar-fixed-bottom" style="height:25px;">
                    <div class="navbar-inner">
                        <div class="container-fluid" style="text-align:right;">
                            <a style="color:#FFF" target="_top" href="mailto:support@venergysolutions.com?Subject=">support@venergysolutions.com</a>
                            <font color="#FFFFFF">|</font>
                            <a style="color:#FFF"  target="_blank" href="http://www.venergysolutions.com"> www.venergysolutions.com</a>
						</div>
                    </div>
                </div>



                <div class="navbar navbar-fixed-top">
                    <div class="navbar-inner">
                        <div class="container-fluid">
                            <a class="brand">
                            <i class="icon-home icon-white"></i> 11 KV Feeder Shutdown Protocol
                            </a>
                            <ul class="nav user_menu pull-right">
                                <li class="divider-vertical hidden-phone hidden-tablet"></li>
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="img/user_avatar.png" alt="" class="user_avatar" /> <span id="username">User Name </span><b class="caret"></b></a>
                                    <ul class="dropdown-menu">
                                        <!--
                                        <li><a href="user_profile.html">My Profile</a></li>
                                        <li class="divider"></li>
                                        -->
                                        <li><a href="javascript:log_me_out()">Log Out</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            
            <!-- main content -->
            <div id="contentwrapper">
                <div id="body_main_pane" class="main_content">
                    <div class="row-fluid">
                        <div class="span12">
                            <h3 class="heading">Manage Outage Event</h3>
                            <div class="row-fluid">
                                <div class="span8">
                                    <form id="validate_wizard" class="stepy-wizzard form-horizontal">
                                        <fieldset title="Outage Detail" id="fld1">
                                            <legend class="hide">&nbsp;Enter Outage Details&hellip;</legend>
                                            <div class="formSep control-group">
                                                <label for="v_tgcmw" class="control-label" style="width:200px;text-align:left;">Total Generation Capacity(MW)</label>
                                                <div class="controls" id="v_tgcmwdiv">
                                                    <input type="text" name="v_tgcmw" id="v_tgcmw" readonly/>
                                                </div>
                                            </div>
                                            <div class="formSep control-group">
                                                <label for="v_tomw" class="control-label" style="width:200px;text-align:left;"><font color="#FF0000" size="+2">*</font>Total Outage (MW)</label>
                                                <div class="controls">
                                                    <input type="text" name="v_tomw" id="v_tomw" onKeyUp="calcOutage()" onkeypress="return isNumber(event,0,this)" onKeyUp="shouldRetain(0,this)"/>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;Available MW&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <input type="text" name="v_aomw" id="v_aomw" readonly/>
                                                </div>
                                            </div>
                                            <div class="control-group">
                                                <label for="v_tdate" class="control-label" style="width:200px;text-align:left;"><font color="#FF0000" size="+2">*</font>Date</label>
                                                <div class="input-append date" id="dp2" data-date-format="dd-mm-yyyy">
                                                    <input class="span6" id="datedp2" type="text" readonly />
                                                    <span class="add-on"><i class="splashy-calendar_day"></i></span>
                                                </div>
                                            </div>
                                            <div class="control-group"></div>
                                            <div class="control-group">
                                                <label for="v_ttime" class="control-label" style="width:200px;text-align:left;"><font color="#FF0000" size="+2">*</font>Start Time (HH:MM)</label>
                                                <input type="text" class="span2" id="tp_1" />
                                            </div>
                                            <div class="formSep control-group">
                                                <div class="control">
                                                    <label for="v_ttime" class="control-label" style="width:157px;text-align:left;"><font color="#FF0000" size="+2">*</font>Duration</label>
	                                            	Hour
                                                    &nbsp;&nbsp;
                                                    <input type="text" id="sp_basica" name="sp_basica" value="0" onKeyPress="return isNumber(event,1000000,this)" onKeyUp="shouldRetain(1000000,this)"/>
    
                                                     &nbsp;&nbsp;
                                                     &nbsp;&nbsp;
                                                     &nbsp;&nbsp;
                                                     &nbsp;&nbsp;
                                                     Minutes
                                                     &nbsp;&nbsp;
                                                    <input type="text" id="sp_basicb" name="sp_basicb" value="0"onkeypress="return isNumber(event,59,this)" onKeyUp="shouldRetain(59,this)"/>
                                                </div>
                                            </div>
                                            <div class="formSep control-group">
                                                <!--<input id="v_cdur" name="v_cdur" type="checkbox" checked="checked">-->
                                                <label for="v_cdur" class="control-label" style="width:200px;text-align:left;"><font color="#FF0000" size="+2">*</font>Cycle Duration</label>
                                                <div class="controls" id="sp_basiccdiv">
                                                <input type="text" id="sp_basicc" name="sp_basicc" value="1" onKeyPress="return isNumber(event,1000000,this)" onKeyUp="shouldRetain(1000000,this)"/>
                                                Minutes
                                                </div>
                                                <br>
                                                <br>
                                                Remarks&nbsp;&nbsp;&nbsp;&nbsp;
                                                <textarea name="auto_expand" id="auto_expand" cols="1" rows="4" style="width:35%; height:40px;"></textarea>
                                            </div>
                                        	<div style="float:left">All Fields marked with <font color="#FF0000" size="+2">*</font> are compulsory to fill.</div>
                                            <a href="javascript:viewhistoryGet()" class="btn" style="margin-left:10px;float:right;width:100px;"> Outage History</a>
                                        </fieldset>
                                        <fieldset title="Request Approval" id="fld2">
                                            <legend class="hide">&nbsp;Approve/Reject Requests&hellip;</legend>
                                            <div id="dataw2">
                                                <br><br>
                                                <center><img src='img/ajax_loader.gif'></center>
                                                <br><br>
                                            </div>
                                        </fieldset>
                                       <fieldset title="Shutdown Feeders" id="fld3">
                                            <legend class="hide">&nbsp;Manage Feeder Shutdown&hellip;</legend>
                                            <div id="dataw3">
                                                <br><br>
                                                <center><img src='img/ajax_loader.gif'></center>
                                                <br><br>
                                            </div>
                                        	<!--
                                            <button type="button" class="btn btn-primary" style="margin-left:10px;float:right;" onClick="openWizard()"><i class="icon-ok icon-white"></i> Cancel</button>
                                            <a href="javascript:openWizard()" class="btn" style="margin-left:10px;float:right;"><i class="splashy-error_small"></i> Cancel</a>-->
                                        </fieldset>
                                        <fieldset title="Track" id="fld4">
                                            <legend class="hide">&nbsp;Track Feeder Cycles&hellip;</legend>
                                            <div id="dataw4">
                                                <br><br>
                                                <center><img src='img/ajax_loader.gif'></center>
                                                <br><br>
                                            </div>
                                        </fieldset>
                                        <button type="button" class="finish btn btn-primary" style="visibility:hidden;"><i class="icon-ok icon-white"></i> Send registration</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                </div>
            </div>
            
            <!-- sidebar -->
            <a href="javascript:void(0)" class="sidebar_switch on_switch ttip_r" title="Hide Sidebar">Sidebar switch</a>
            <div class="sidebar">
                
                <div class="antiScroll">
                    <div class="antiscroll-inner">
                        <div class="antiscroll-content">
                    
                            <div class="sidebar_inner">
                                <div id="side_accordion" class="accordion">
                                    
                                    <div class="accordion-group" onClick="document.location='SLDC.php';">
                                        <div class="accordion-heading">
                                            <a href="SLDC.php" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
                                                <i class="icon-folder-close"></i> <span id="M1">Manage Outage Event</span>
                                            </a>
                                        </div>
                                    </div>
                                    <!--
                                    <div class="accordion-group" onClick="currentFunc()">
                                        <div class="accordion-heading">
                                            <a href="#" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
                                                <i class="icon-th"></i> Track Current Outage
                                            </a>
                                        </div>
                                    </div>
                                    -->
                                    <div class="accordion-group" onClick="document.location='SLDC.php';">
                                        <div class="accordion-heading">
                                            <a href="SLDC.php" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
                                                <i class="icon-th"></i> <span id="M2">Outage History</span>
                                            </a>
                                        </div>
                                    </div> <!--viewhistoryHt();menuSelect('M5')-->
                                    <div class="accordion-group" onClick="document.location='testpoo.php';">
                                        <div class="accordion-heading">
                                            <a href="testpoo.php" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
                                                <i class="icon-th"></i> <span id="M5">HT Consumer</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="accordion-group" onClick="document.location='SLDC.php'">
                                        <div class="accordion-heading">
                                            <a href="SLDC.php" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
                                                <i class="icon-th"></i> <span id="M3">Station Head Contacts</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="accordion-group" onClick="document.location='SLDC.php'">
                                        <div class="accordion-heading">
                                            <a href="SLDC.php" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
                                                <i class="icon-cog"></i> <span id="M4">Configuration</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <?php
								switch($_SESSION['company_id'])
								{
									case "1":
                                	echo '<center><img src="img/logos/Kptcl_logo.png"/></center>';
									break;
									case "2":
                                	echo '<center><img src="img/logos/Kptcl_logo.png"/></center>';
									break;
									case "3":
                                	echo '<center><img src="img/logos/Kptcl_logo.png"/></center>';
									break;
									case "4":
                                	echo '<center><img src="img/logos/Kptcl_logo.png"/></center>';
									break;
									case "5":
                                	echo '<center><img src="img/logos/Kptcl_logo.png"/></center>';
									break;
								}
								?>
                                <div class="push"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
            <script src="js/jquery.min.js"></script>
            <script src="js/jquery-migrate.min.js"></script>
            <script src="lib/jquery-ui/jquery-ui-1.10.0.custom.min.js"></script>
            <!-- smart resize event -->
            <script src="js/jquery.debouncedresize.min.js"></script>
            <!-- hidden elements width/height -->
            <script src="js/jquery.actual.min.js"></script>
            <!-- js cookie plugin -->
            <script src="js/jquery_cookie.min.js"></script>
            <!-- main bootstrap js -->
            <script src="bootstrap/js/bootstrap.min.js"></script>
             <!-- bootstrap plugins -->
            <script src="js/bootstrap.plugins.min.js"></script>
            <!-- tooltips -->
            <script src="lib/qtip2/jquery.qtip.min.js"></script>
            <!-- jBreadcrumbs -->
            <script src="lib/jBreadcrumbs/js/jquery.jBreadCrumb.1.1.min.js"></script>
            <!-- fix for ios orientation change -->
            <script src="js/ios-orientationchange-fix.js"></script>
            <!-- scrollbar -->
            <script src="lib/antiscroll/antiscroll.js"></script>
            <script src="lib/antiscroll/jquery-mousewheel.js"></script>
            <!-- lightbox -->
            <script src="lib/colorbox/jquery.colorbox.min.js"></script>
            <!-- mobile nav -->
            <script src="js/selectNav.js"></script>
            <!-- common functions -->
            <script src="js/gebo_common.js"></script>
            
            <!-- validation -->
            <script src="lib/validation/jquery.validate.min.js"></script>
            <!-- wizard -->
            <!--<script src="lib/stepy/js/jquery.stepy.min.js"></script>-->
            <script src="lib/stepy/js/jquery.stepy.js"></script>
            <!-- wizard functions -->
            <script src="js/gebo_wizard.js"></script>
            <!-- datepicker -->
            <script src="lib/datepicker/bootstrap-datepicker.js"></script>
            <!-- timepicker -->
            <script src="lib/datepicker/bootstrap-timepicker.js"></script>
			<!-- form functions -->
            <script src="js/gebo_forms.js"></script>
            <!-- masked inputs -->
            <script src="js/forms/jquery.inputmask.min.js"></script>
            <!-- toggle buttons -->
            <script src="lib/toggle_buttons/jquery.toggle.buttons.js"></script>

            <!-- smoke_js -->
            <script src="lib/smoke/smoke.js"></script>
            <!-- notifications functions -->
            <script src="js/gebo_notifications.js"></script>
            
            <script>
                $(document).ready(function() {
                    //* show all elements & remove preloader
                    setTimeout('$("html").removeClass("js")',1000);
                });							
			</script>
        
        </div>
    </body>
</html>
