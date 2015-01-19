<?php
    require("belint_src/php/Core.php");
	session_start();
	if(isset($_REQUEST["username"]) && isset($_REQUEST["password"]))
	{
		$user = $_REQUEST["username"];
		$pass = $_REQUEST["password"];
		
		$objJSON = new JsonClass();
		$query = "SELECT * FROM tbl_11kv_user WHERE (username='".$user."' OR email='".$user."')  AND password=md5('".$pass."')"; //AND company_id='6'
		$mysqlData = $objJSON->executeSQL(SQL_DB, "tbl_11kv_user", $query, "SELECT");
		
		if($mysqlData)
		{
		
			$lstat = "S";
			$qryTimeOut = "UPDATE tbl_11kv_user SET time_out='1800' WHERE email='".$user."' OR username='".$user."'";
			$mysqlTimeData = $objJSON->executeSQL(SQL_DB, "tbl_11kv_user", $qryTimeOut, "UPDATE");
			$_SESSION['username']=$user;
			$_SESSION['password']=$pass;
			
			$_SESSION['company_id']=$mysqlData[0]["company_id"];
			$_SESSION['user_id']=$mysqlData[0]["user_id"];
		}
		else
			$lstat = "F";
		$_SESSION['lstat']=$lstat;
		
	}
	//else if(isset($_REQUEST["repassword"])) 
	//{
	//	sendingmail('jatin.jitu@gmail.com');
	//}  
?>
<!DOCTYPE html>
<html lang="en" class="login_page">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>11KV Feeder Shutdown Protocol</title>
    
        <!-- Bootstrap framework -->
            <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />
            <link rel="stylesheet" href="bootstrap/css/bootstrap-responsive.min.css" />
        <!-- theme color-->
            <link rel="stylesheet" href="css/blue.css" />
        <!-- tooltip -->    
            <link rel="stylesheet" href="lib/qtip2/jquery.qtip.min.css" />
        <!-- main styles -->
            <link rel="stylesheet" href="css/style.css" />
    
        <!-- Favicon -->
            <link rel="shortcut icon" href="favicon.ico" />
            
        <link href='http://fonts.googleapis.com/css?family=PT+Sans' rel='stylesheet' type='text/css'>
    
        <!--[if lte IE 8]>
            <script src="js/ie/html5.js"></script>
            <script src="js/ie/respond.min.js"></script>
        <![endif]-->
       
    <script>
	var db_name = "";
	var user_id = "";
	var lstat = "";
	var userna = "";
	function load_me_home()
	{
		db_name = "<?php echo SQL_DB; ?>";
		cmp_id = "<?php if(isset($_SESSION["username"]) && isset($_REQUEST["password"]))echo $_SESSION['company_id']; ?>";
		user_id = "<?php if(isset($_REQUEST["username"]) && isset($_REQUEST["password"]))echo $_SESSION["user_id"]; ?>";
		lstat = "<?php if(isset($_REQUEST["username"]) && isset($_REQUEST["password"])) echo $_SESSION["lstat"]; ?>";
		userna = "<?php if(isset($_REQUEST["username"]) && isset($_REQUEST["password"]))echo $_SESSION["username"]; ?>";
		if(lstat == "S")
		{
			if(cmp_id =="6")
				document.location = "SLDC/SLDC.php";//?user="+userna+"&user_id="+user_id+"&cmp_id="+cmp_id;
			else
				document.location = "ESCOM/ESCOM.php";
		}
		else if(lstat == "F")
			document.getElementById("signingin").innerHTML = "<font color='red'>Login Failed, Username or Password wrong!</font>";
	}
	
	function cleanMe(obj, val)
	{
		if(obj.value == val)
			obj.value = "";
	}
 
 
       // function sendingmail(val)
        //{
       
           
           // return true; 
            
       // }
        
      //  function generatePassword($length = 6) 
      //  {
      //      $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      //      $count = mb_strlen($chars);

      //      for ($i = 0, $result = ''; $i < $length; $i++) 
      //      {
      //          $index = rand(0, $count - 1);
      //          $result .= mb_substr($chars, $index, 1);
      //      }

      //      return $result;
      //  }


    </script>
     <?php
           if(isset($_POST["repass"])){
                $from = "support@venergysolutions.com"; //$_POST["from"]; // sender support@blintinc.com venergysolutions
               $subject = "Reset password";
              $var2 = rand(); 
			  $header="Mime-Version: 1.0\r\n";

              $val = $_POST["repassword"];

				//$val=mysql_real_escape_string($_POST["repassword"]);
		    $header.= 'Content-type: text/html; charset=iso-8859-1;  charset=UTF-8' . "\r\n";
		   $header.= 'Content-Transfer-Encoding: 8bit'."\r\n";
		$header.="From: "." < ". $from." > \r\n";
		 $header.= 'X-Mailer: PHP/' . phpversion(); 
               $message = "<!DOCTYPE htm>
<head>
<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
<title>Reset Password </title>
</head>

<body>
<table width='200' border='1'>
  <tr>
    <td>Hello,</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><div><span dir='ltr' id=':sn'>Your New Password is $var2</span></div>
      </td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Regards,</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Support Team</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
</table>

</body>
</html>";
                // message lines should not exceed 70 characters (PHP rule), so wrap it
              //  $message = wordwrap($message, 70);
                // send mail
                //mail($val,$subject,$message,"From: support@venergysolutions.com");

                mail($val, $subject, $message, $header);
                //mail("jatin.jitu@gmail.com", $subject, $message, $header);
               $objJSON = new JsonClass();
	        $query = "UPDATE tbl_11kv_user set password=md5('".$var2."') where  email='".$val."'";
	        $mysqlData = $objJSON->executeSQL(SQL_DB, "tbl_11kv_user", $query, "UPDATE");
               // echo "Password sent to your mail id";
              ?>
              <script type="text/javascript">alert("Password Send Successfully");</script>
            <?php
		   }
            ?> 
    </head>
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
	</header>    
    <body onLoad="load_me_home()">

		<table align="center" width="100%">
        	<tr><td>&nbsp;</td></tr>
        	<tr>
            	<td align="left"><img src="img/logos/Kptcl_logo.png" height="100" width="100"></td>
            	<td align="right"><img src="img/logos/all.jpg"></td>
                <!--
            	<td align="center"><img src="img/logos/CESCOM.jpg" height="100" width="100"></td>
            	<td align="center"><img src="img/logos/GESCOM.gif" height="100" width="100"></td>
            	<td align="center"><img src="img/logos/HESCOM.png" height="100" width="100"></td>
            	<td align="center"><img src="img/logos/MESCOM.jpg" height="100" width="100"></td>
                -->
            </tr>
        </table>
		<?php
		if(!isset($_REQUEST["username"]) && !isset($_REQUEST["password"]))
		{
		?>
        <div class="login_box">
            <form action="index.php" method="post" id="login_form">
                <div class="top_b">Sign in to Feeder Shutdown Protocol</div>    
                <div class="alert alert-info alert-login">
                    Username and Password are mandatory.
                </div>
                <div class="cnt_b">
                    <div class="formRow">
                        <div class="input-prepend">
                            <span class="add-on"><i class="icon-user"></i></span><input type="text" id="usr" name="username" placeholder="Username" value="" onClick="cleanMe(this,'Username')"/>
                        </div>
                    </div>
                    <div class="formRow">
                        <div class="input-prepend">
                            <span class="add-on"><i class="icon-lock"></i></span><input type="password" id="pass" name="password" placeholder="Password" value="" onClick="cleanMe(this,'password')"/>
                        </div>
                    </div>
                    <!--
                    <div class="formRow clearfix">
                        <label class="checkbox"><input type="checkbox" /> Remember me</label>
                    </div>
                    -->
                </div>
                <div class="btm_b clearfix">
                    <button class="btn btn-inverse pull-right" type="submit">Sign In</button>
                    <!--<span class="link_reg"><a href="#reg_form">Not registered? Sign up here</a></span>-->
                    <span id="signingin" class="link_reg"></span>
                </div>  
            </form>
            <form action="index.php" method="post" id="pass_form" style="display:none">
                <div class="top_b">Can't sign in?</div>    
                    <div class="alert alert-info alert-login">
                    Please enter your email address. You will receive login details via email.
                </div>
                <div class="cnt_b">
                    <div class="formRow clearfix">
                        <div class="input-prepend">
                            <span class="add-on">@</span><input type="text" name="repassword" placeholder="Your email address" />
                        </div>
                    </div>
                </div>
                <div class="btm_b tac">
                    <button class="btn btn-inverse" name="repass">Request New Password</button>
                </div>  
            </form>
        <div class="links_b links_btm clearfix">
            <span class="linkform"><a href="#pass_form">Forgot password?</a></span>
            <span class="linkform" style="display:none">Never mind, <a href="#login_form">send me back to the sign-in screen</a></span>
        </div>
        </div>
        
		<?php
		}
		else if($_SESSION['lstat']=="F"){
			
			?>
            <center>Wrong Username or Passwrod</center>
            <span class="linkform"><center><a href="javascript:history.go(-1)">click here to go back and try again</a></center></span>
            
            <?php
		}
		else
		{
        ?>
		<center><img src='img/ajax_loader.gif'></center>
		<?php
		}
        ?>
        <script src="js/jquery.min.js"></script>
        <script src="js/jquery-migrate.min.js"></script>
        <script src="js/jquery.actual.min.js"></script>
        <script src="lib/validation/jquery.validate.min.js"></script>
        <script src="bootstrap/js/bootstrap.min.js"></script>
        <script src="belint_src/js/ajax.js"></script>
        <script src="belint_src/js/funcall.js"></script>
        <script src="belint_src/js/error.js"></script>
        <script>
            $(document).ready(function(){
                
                //* boxes animation
                form_wrapper = $('.login_box');
                function boxHeight() {
                    form_wrapper.animate({ marginTop : ( - ( form_wrapper.height() / 2) - 24) },400);   
                };
                form_wrapper.css({ marginTop : ( - ( form_wrapper.height() / 2) - 24) });
                $('.linkform a,.link_reg a').on('click',function(e){
                    var target  = $(this).attr('href'),
                        target_height = $(target).actual('height');
                    $(form_wrapper).css({
                        'height'        : form_wrapper.height()
                    }); 
                    $(form_wrapper.find('form:visible')).fadeOut(400,function(){
                        form_wrapper.stop().animate({
                            height   : target_height,
                            marginTop: ( - (target_height/2) - 24)
                        },500,function(){
                            $(target).fadeIn(400);
                            $('.links_btm .linkform').toggle();
                            $(form_wrapper).css({
                                'height'        : ''
                            }); 
                        });
                    });
                    e.preventDefault();
                });
                
                //* validation
                $('#login_form').validate({
                    onkeyup: false,
                    errorClass: 'error',
                    validClass: 'valid',
                    rules: {
                        username: { required: true, minlength: 3 },
                        password: { required: true, minlength: 3 }
                    },
                    highlight: function(element) {
                        $(element).closest('div').addClass("f_error");
                        setTimeout(function() {
                            boxHeight()
                        }, 200)
                    },
                    unhighlight: function(element) {
                        $(element).closest('div').removeClass("f_error");
                        setTimeout(function() {
                            boxHeight()
                        }, 200)
                    },
                    errorPlacement: function(error, element) {
                        $(element).closest('div').append(error);
                    }
                });
            });
			
        </script>
    </body>
</html>
