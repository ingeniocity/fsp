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
		header("Location: ../index.php"); /* Redirect browser */
		exit();
		$llstat = "F";
	}
	if(!isset($_SESSION["PageStat"]))
		$_SESSION["PageStat"] = 1;
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>11KV Feeder Shutdown Protocol</title>
    
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
        
        <!--[if lte IE 8]>
            <link rel="stylesheet" href="css/ie.css" />
            <script src="js/ie/html5.js"></script>
            <script src="js/ie/respond.min.js"></script>
        <![endif]-->
        <script type="text/javascript" src="../js/md5.js"></script>
            <!-- include the Tools -->
  <script src="http://cdn.jquerytools.org/1.2.7/full/jquery.tools.min.js"></script>
		<script>var userna = "<?php echo $_SESSION["username"]; ?>";</script>
		<script>var user_id = "<?php echo $_SESSION["user_id"]; ?>";</script>
		<script>var cmp_id = "<?php echo $_SESSION['company_id']; ?>";</script>
		<script>var db_name = "<?php echo SQL_DB; ?>";</script>
		<script>var PageStat = "<?php echo $_SESSION["PageStat"]; ?>";</script>

        <script src="belint_src/js/ajax.js"></script>
        <script src="belint_src/js/funcall.js"></script>
        <script src="belint_src/js/error.js"></script>
		<script>var llstat = "<?php echo $llstat; ?>";</script>
        <script type="text/javascript">
            //* hide all elements & show preloader
            document.documentElement.className += 'js';
			
			function load_home()
			{
				if(llstat == "F")
				{
					log_me_out();
					return;
				}
				decrease_timeOut(userna);
				home_pagew(userna);
				switch(PageStat)
				{
					case "1":
					document.getElementById("M1").style.fontWeight = "bold";
                                        approvalUsr();
                                        break;
					
					case "2":
					document.getElementById("M2").style.fontWeight = "bold";
					grpMaintenances();
					break;
					
					case "3":
					document.getElementById("M3").style.fontWeight = "bold";
					configuration();
					break;
					
					case "4":
					document.getElementById("M4").style.fontWeight = "bold";
					userProfile();
					break;
					
					case "5":
					document.getElementById("M5").style.fontWeight = "bold";
					viewhistoryHt();
					break;
					
					case "6":
					document.getElementById("M6").style.fontWeight = "bold";
					viewhistoryFm();
					break;
				}
			}
			
			/*
			function openWizard()
			{
				document.location = "wizard.php?user="+userna+"&user_id="+user_id;
			}
			*/
        </script>
    </head>
    <body onLoad="load_home()">
	<?php  
                                        $logo_path = "";
                                                                switch($_SESSION['company_id'])
                                                                {
                                                                        case "1":
                                        $logo_path = "img/logos/bescom-full.png";
                                                                        break;
                                                                        case "2":
                                        $logo_path = "img/logos/gescom.png";
                                                                        break;
                                                                        case "3":
                                        $logo_path = "img/logos/hescom.png";
                                                                        break;
                                                                        case "4":
                                        $logo_path = "img/logos/mescom.png";
                                                                        break;
                                                                        case "5":
                                        $logo_path = "img/logos/cesc.png";
                                                                        break;
									case "6":
					$logo_path = "img/logos/kptcl_logo.png";
									break;
                                        }
        ?>
        <div id="loading_layer" style="display:none"><img src="img/ajax_loader.gif" alt="" /></div>
            
            <form name="fakeState" id="fakeState" method="post" action="SLDC.php" style="display:none;">
               <input type="text" name="PageStat" id="PageStat" value="1"/>
            </form>
            
        
        <div id="maincontainer" class="clearfix">
            <!-- header -->
            <header>

 <div class="navbar navbar-fixed-bottom" style="height:25px;">
                    <div class="navbar-inner">
                        <div class="container-fluid" style="text-align:right;">
                            <a style="color:#3993ba" target="_top" href="mailto:support@venergysolutions.com?Subject=">support@venergysolutions.com</a>
                            <font color="#3993ba">|</font>
                            <a style="color:#3993ba"  target="_blank" href="http://www.venergysolutions.com"> www.venergysolutions.com</a>
						</div>
                    </div>
                </div>

                <div class="navbar navbar-fixed-top">
                    <div class="navbar-inner">
                        <div class="container-fluid">
				<div class="brand">
                            		<!--<div class="logo">-->
                            			<img class="logo" src="<?php echo $logo_path?>"/>
			    		<!--</div>-->
			    		<!--<div class="header-text">
						11 KV Feeder Shutdown Protocol
			    		</div>-->
				</div>
                            
                            <ul class="nav user_menu pull-right">
				<li class="brand header-text">11 KV Feeder Shutdown Protocol</span></li>
                                <li class="divider-vertical hidden-phone hidden-tablet"></li>
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><img src="img/user_avatar.png" alt="" class="user_avatar" /> <span id="username">User Name</span><b class="caret"></b></a>
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
                        <center><img src="img/ajax_loader.gif" alt="" /></center>
                </div>
            </div>
            
            <!-- sidebar -->
            <a href="javascript:void(0)" class="sidebar_switch on_switch ttip_r" style="margin-top: 5px" title="Hide Sidebar">Sidebar switch</a>
            <div class="sidebar">
                
                <div class="antiScroll">
                    <div class="antiscroll-inner">
                        <div class="antiscroll-content">
                    
                            <div class="sidebar_inner">
                                <div id="side_accordion" class="accordion">

				    <div class="accordion-group" onClick="approvalUsr();menuSelect('M1');">
                                        <div class="accordion-heading">
                                            <a href="#" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle" style="margin-top: 5px;">
                                                <i class="icon-cog"></i> <span id="M1">Approvals</span>
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <div class="accordion-group" onClick="grpMaintenances();menuSelect('M2');">
                                        <div class="accordion-heading">
                                            <a href="#" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
                                                <i class="icon-folder-close"></i> <span id="M2">Group Management</span>
                                            </a>
                                        </div>
                                    </div>
                                    <!--
                                    <div class="accordion-group" onClick="grpPriority()">
                                        <div class="accordion-heading">
                                            <a href="#" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
                                                <i class="icon-th"></i> Group Priority
                                            </a>
                                        </div>
                                    </div>
                                    -->
                                    <div class="accordion-group" onClick="configuration();menuSelect('M3');">
                                        <div class="accordion-heading">
                                            <a href="#" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
                                                <i class="icon-th"></i> <span id="M3">Configuration</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="accordion-group" onClick="userProfile();menuSelect('M4');">
                                        <div class="accordion-heading">
                                            <a href="#" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
                                                <i class="icon-th"></i> <span id="M4">User Profile</span>
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <div class="accordion-group" onClick="viewhistoryHt();menuSelect('M5');">
                                        <div class="accordion-heading">
                                            <a href="#" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
                                                <i class="icon-th"></i> <span id="M5">HT Consumers</span>
                                            </a>
                                        </div>
                                    </div>
                                   
                                    <div class="accordion-group" onClick="viewhistoryFm();menuSelect('M6');">
                                        <div class="accordion-heading">
                                            <a href="#" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
                                                <i class="icon-th"></i> <span id="M6">Feeder Management</span>
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <!--<div class="accordion-group" onClick="FeederMaintenance();menuSelect('M6');">
				   
                                        <div class="accordion-heading">
                                            <a href="#" data-parent="#side_accordion" data-toggle="collapse" class="accordion-toggle">
                                                <i class="icon-cog"></i> Feeder Maintenance
                                            </a>
                                        </div>
                                    </div>-->
                                </div>

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
