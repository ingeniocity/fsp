<?php
require("Core.php");
session_start();
$objJSON = new JsonClass();
//ini_set('display_errors', '1');

$decoded = NULL;
$finalVal = NULL;

$decoded = json_decode($_REQUEST['JSON']);
//$decoded = json_decode($_REQUEST['JSON'] = '{"jcase":"edit_FeederM","container":"","database":"escom","tablename":"tbl_company","query":"call sp_11kv_updatefeederhierarchy(2402,1,376,401,455,\'647\',\'1755\',\'6582\',6624,\'6569\',6524,7368,\'9203\',9191,\'B1\',\'Maize,Aracanaut,Vegitables,\',\'Throughout the year\',\'Y\',\'70\',\'F1-HEBBALU\',\'F1-HEBBALU\')"}');

switch($decoded->jcase)
{
	case "setAppUnApp":
		$operation = "UPDATE";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$decoded->appVal,"0"));
	break;
	
	case "historyGet":
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "userAppr":
		$_SESSION["PageStat"] = 4;
		$operation = "UPDATE";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		$operation = "SELECT";
		$cQuery = "select * from tbl_company where company_id='".$decoded->compID."'";
		$mysqlData1 = $objJSON->executeSQL($decoded->database, $decoded->tablename, $cQuery, $operation);
		$finalVal = array("CDT"=>$mysqlData1, "DATA"=>$mysqlData);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "userForApprov":
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		//print_r($mysqlData);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "grpUpdate":
		$operation = "UPDATE";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		//print_r($mysqlData);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$decoded->grpId,"0"));
	break;
	
	case "grpView":
		$operation = "INSERT";
		$mysqlData1 = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		$qry2 = "SELECT Class8GeoID,FEEDER_NAME, STATION, FEEDER_SHUTDOWN_GROUP FROM tbl_feederhierarchy where GROUP_ID=".$decoded->id;
		$mysqlData2 = $objJSON->executeSP($decoded->database, $decoded->tablename, $qry2, $operation);
		$mysqlData3 = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query1, $operation);
		$mysqlData4 = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query2, $operation);
		$finalVal = array("Feeder"=>$mysqlData3, "Zone"=>$mysqlData4, "DATA1"=>$mysqlData1,"DATA2"=>$mysqlData2);
		//print_r($finalVal);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "grpDelete":
		$operation = "INSERT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		//print_r($mysqlData);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "GetPOTPlan":
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "createGrp":
		$operation = "INSERT";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		//print_r($mysqlData);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "getGrd":
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		//print_r($mysqlData);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "RegetGrd":
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		//print_r($mysqlData);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "addStation":
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		//print_r($mysqlData);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;

	case "Restation":
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		//print_r($mysqlData);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;

	case "addGrp":
		$operation = "SELECT";
		$mysqlData1 = $objJSON->executeSP($decoded->database, $decoded->tablename1, $decoded->query1, $operation);
		$mysqlData2 = $objJSON->executeSP($decoded->database, $decoded->tablename1, $decoded->query2, $operation);
		$mysqlData3 = $objJSON->executeSP($decoded->database, $decoded->tablename1, $decoded->query3, $operation);
		$finalVal = array("SP1"=>$mysqlData1,"SP2"=>$mysqlData2, "SP3"=>$mysqlData3);
		//print_r($finalVal);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "loginAuth":
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		if($mysqlData)
		{
			$finalData = array("UserName"=>$decoded->username);
			$operation = "UPDATE";
			$qryTimeOut = "UPDATE tbl_11kv_user SET time_out=1800 WHERE email='".$decoded->username."' OR username='".$decoded->username."'";
			$mysqlTimeData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $qryTimeOut, $operation);
		}
		else
			$finalData = array("UserName"=>"Invalid");
		//print_r($finalData);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalData,"0"));
	break;
	
	case "time_out":
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		$finalData = array("TimeVal"=>$mysqlData, "UserName"=>$decoded->username);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalData,"0"));
	break;
	
	
	case "time_out_pool":
		$_SESSION["PageStat"] = 4;
		$_SESSION["username"] = NULL;
		session_destroy();
		//echo $decoded->query."____".$decoded->username;
		$operation = "UPDATE";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$decoded->username,"0"));
	break;
	
	
	case "confData":
		$_SESSION["PageStat"] = 2;
		$operation = "SELECT";
		$mysqlData1 = $objJSON->executeSQL($decoded->database, $decoded->tablename1, $decoded->query1, $operation);
		$mysqlData2 = $objJSON->executeSQL($decoded->database, $decoded->tablename2, $decoded->query2, $operation);
		$finalVal = array("DATA1"=>$mysqlData1, "DATA2"=>$mysqlData2);
		//print_r($finalVal);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "confDataSet":
		$operation = "UPDATE";
		$mysqlData0 = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query0, $operation);
		$mysqlData1 = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query1, $operation);
		if($mysqlData0 == "SUCCESS" && $mysqlData1 == "SUCCESS")
			$finalVal = array("MSG"=>"Configuration is saved successfully!");
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "userProf":
		$_SESSION["PageStat"] = 3;
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "userPass":
		$operation = "UPDATE";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		if($mysqlData == "SUCCESS")
			$finalVal = array("MSG"=>"Password is changed successfully!");
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;

	case "userProfData":
		$operation = "UPDATE";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		if($mysqlData == "SUCCESS")
			$finalVal = array("MSG"=>"User profile is being changed successfully!");
		else
			$finalVal = array("MSG"=>"Oops! Error creating user, try again!");
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "body_main_pane_uview":
		$_SESSION["PageStat"] = 3;
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
		
	//PS
	case "userInsData":
	$operation = "SELECT";
	$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query1, $operation);
	
	if($mysqlData)
	{
		$finalVal = array("MSG"=>"User alredy exists!");
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	}
	
	$operation = "INSERT";
	
	$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
	if($mysqlData == "SUCCESS")
		$finalVal = array("MSG"=>"User is added successfully!");
	else
		$finalVal = array("MSG"=>"Oops! Error creating user, try again!");
	die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "userEdtData":
	$operation = "INSERT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		if($mysqlData == "SUCCESS")
			$finalVal = array("MSG"=>"User is updated successfully!");
		else
			$finalVal = array("MSG"=>"Oops! Error updating user, try again!");
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "uDelete":
	case "del_FeederM":
	$operation = "DELETE";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		if($mysqlData == "SUCCESS")
			$finalVal = array("MSG"=>"User is updated successfully!");
		else
			$finalVal = array("MSG"=>"Oops! Error updating user, try again!");
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "pikTimSet":
		$operation = "UPDATE";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		if($mysqlData == "SUCCESS")
			$finalVal = array("MSG"=>"Peak Hours times are configured successfully!");
		else
			$finalVal = array("MSG"=>"Oops! Error setting peak hour time, try again.");
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "compDataSet":
		$operation = "UPDATE";
		$mysqlData1 = $objJSON->executeSQL($decoded->database, $decoded->tablename1, $decoded->query1, $operation);
		$mysqlData2 = $objJSON->executeSQL($decoded->database, $decoded->tablename2, $decoded->query2, $operation);
		$mysqlData3 = $objJSON->executeSQL($decoded->database, $decoded->tablename2, $decoded->query3, $operation);
		$mysqlData4 = $objJSON->executeSP($decoded->database, $decoded->tablename2, $decoded->query4, $operation);
		if($mysqlData1 == "SUCCESS" && $mysqlData2 == "SUCCESS" && $mysqlData3 == "SUCCESS")
			$finalVal = array("MSG"=>"Configuration is set successfully!");
		else
			$finalVal = array("MSG"=>"Oops! Error in configuration setting, try again.");
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "grpDrop":
		$_SESSION["PageStat"] = 1;
		$operation = "SELECT";
		$mysqlData1 = $objJSON->executeSP($decoded->database, $decoded->tablename1, $decoded->query1, $operation);
		$mysqlData2 = $objJSON->executeSP($decoded->database, $decoded->tablename1, $decoded->query2, $operation);
		$mysqlData3 = $objJSON->executeSP($decoded->database, $decoded->tablename1, $decoded->query3, $operation);
		$finalVal = array("Feeder"=>$mysqlData1, "Zone"=>$mysqlData2, "Priority"=>$mysqlData3);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "grpDetail":
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		//print_r($mysqlData);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "grpuser":
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		//print_r($mysqlData);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "zoneDrop":
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		//print_r($mysqlData);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "getHtConsumerSel":
		$_SESSION["PageStat"] = 5;
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
		//PS 
	case "getHtConsumerZSel":
		$_SESSION["PageStat"] = 5;
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		$mysqlData2 = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query2, $operation);
		$finalVal = array("SP"=>$mysqlData,"SP2"=>$mysqlData2);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	case "getFeederAddData":
	
		$_SESSION["PageStat"] = 6;
		$operation = "SELECT";
		//$mysqlDatas = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->querys, $operation);
		$mysqlDataf = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->queryf, $operation);
		$mysqlDataz = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->queryz, $operation);
		$mysqlDatar = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->queryr, $operation);
		$mysqlDatamp = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->querymp, $operation);
		/*$mysqlDatac = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->queryc, $operation);
		$mysqlDatad = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->queryd, $operation);
		$mysqlDatasd = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->querysd, $operation);
		$mysqlDataom = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->queryom, $operation);
		$mysqlDatat = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->queryt, $operation);
		$mysqlDatagp = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->querygp, $operation);
		
		$mysqlDatamla = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->querymla, $operation);
		
		$mysqlDatadis = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->querydis, $operation);
		,"SPC"=>$mysqlDatac,"SPD"=>$mysqlDatad,"SPSD"=>$mysqlDatasd,"SPOM"=>$mysqlDataom,"SPT"=>$mysqlDatat,"SPGP"=>$mysqlDatagp,"SPMLA"=>$mysqlDatamla,"SPDIS"=>$mysqlDatadis
		*/
		$finalVal = array("SPF"=>$mysqlDataf,"SPZ"=>$mysqlDataz, "SPR"=>$mysqlDatar,"SPMP"=>$mysqlDatamp);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "getFeederSearchData":
		$operation = "SELECT";
		$_SESSION["PageStat"] = 6;
		$mysqlDataf = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->queryf, $operation);
		$mysqlDataz = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->queryz, $operation);
		/*$mysqlDatac = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->queryc, $operation);
		$mysqlDatad = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->queryd, $operation);
		$mysqlDatasd = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->querysd, $operation);
		$mysqlDataom = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->queryom, $operation);*/
		
		$finalVal = array("SPF"=>$mysqlDataf,"SPZ"=>$mysqlDataz);
		//$finalVal = array("SPF"=>$mysqlDataf,"SPZ"=>$mysqlDataz,"SPC"=>$mysqlDatac,"SPD"=>$mysqlDatad,"SPSD"=>$mysqlDatasd,"SPOM"=>$mysqlDataom);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "agetHtConsumerZSel":
		$_SESSION["PageStat"] = 5;
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "getHtConsumerSSel":
	case "agetHtConsumerSSel":
	case "egetHtConsumerSSel":
		$_SESSION["PageStat"] = 5;
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	case "getHtConsumerFeed":
	case "egetHtConsumerFeed":
	case "editgetHtConsumerFeed":
		$_SESSION["PageStat"] = 5;
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	case "searchHtConsumer":
	case "searchFeederM":
		$_SESSION["PageStat"] = 6;
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	case "del_htConsumer":
	
		$_SESSION["PageStat"] = 5;
		$operation = "DELETE";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	case "edit_htConsumer":
	
	case "add_htConsumer":
	
		$_SESSION["PageStat"] = 5;
		$operation = "UPDATE";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	//PS
	case "edit_FeederM":
		$_SESSION["PageStat"] = 6;
		$operation = "UPDATE";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	case "passEdtData":
	$operation = "UPDATE";
	
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		if($mysqlData == "SUCCESS")
			$finalVal = array("MSG"=>"valid");
		else
			$finalVal = array("MSG"=>"Oops! Error updating user, try again!");
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	case "getStaionCircleFm":
	case "egetStaionCircleFm":
	case "edit_getStaionCircleFm":
		$_SESSION["PageStat"] = 6;
		$operation = "SELECT";
		$mysqlDatas = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->querys, $operation);
		
		$mysqlDatac = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->queryc, $operation);
		$finalVal = array("SPS"=>$mysqlDatas,"SPC"=>$mysqlDatac);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break; 
	case "agetStationFM":
		$_SESSION["PageStat"] = 6;
		$operation = "SELECT";
		$mysqlDatas = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->querys, $operation);
		
		$mysqlDatac = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->queryc, $operation);
		$finalVal = array("SPS"=>$mysqlDatas,"SPC"=>$mysqlDatac);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	case "getSectionFm":
	case "agetSectionFm":
	case "agetRevenue":
	case "egetRevenueFm":
	case "agetTalque":
	case "agetGP":
	case "agetDistrict":
	case "agetMP":
	case "agetMLA":
	case "egetTalque":
	case "egetGP":
	case "egetDistrict":
	case "egetMP":
	case "egetMLA":
		$_SESSION["PageStat"] = 6;
		$operation = "SELECT";
		$mysqlDatas = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->querys, $operation);
		
		$finalVal = array("SPS"=>$mysqlDatas);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	case "getDivisionFm":
	case "agetDivisionFm":
	case "egetDivisionFm":
	case "edit_getDivisionFm":
		$_SESSION["PageStat"] = 6;
		$operation = "SELECT";
		$mysqlDatas = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->querys, $operation);
		
		$finalVal = array("SPS"=>$mysqlDatas);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	case "getSubDivisionFm":
	case "agetSubDivisionFm":
	case "egetSubDivisionFm":
	case "edit_getSubDivisionFm":
	case "egetSectionFm":
	case "edit_getSectionFm":
		$_SESSION["PageStat"] = 6;
		$operation = "SELECT";
		$mysqlDatas = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->querys, $operation);
		
		$finalVal = array("SPS"=>$mysqlDatas);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	case "edit_FeederM_data":
	$_SESSION["PageStat"] = 6;
		$operation = "SELECT";
		$mysqlDatas = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->querys, $operation);
		
		$finalVal = array("SPS"=>$mysqlDatas);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	brea;
	case "add_feeder":
		$operation = "INSERT";
		$_SESSION["PageStat"] = 6;
		//echo $decoded->query;
		$mysqlDatas = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		if($mysqlDatas == "SUCCESS")
			$finalVal = array("MSG"=>"Feeder is added successfully!");
		else
			$finalVal = array("MSG"=>"Oops! Error creating Feeder, try again!");
		//$finalVal = array("MSG"=>$decoded->query);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	default:
	case "egetFeederMSel":
		$_SESSION["PageStat"] = 6;
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		
		$mysqlDataz = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->queryz, $operation);
		$mysqlDatar = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->queryr, $operation);
		$mysqlDatamp = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->querymp, $operation);
		$finalVal = array("SP"=>$mysqlData,"SPZ"=>$mysqlDataz, "SPR"=>$mysqlDatar,"SPMP"=>$mysqlDatamp);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	die($objJSON->getJSONarray($decoded->jcase,$decoded->container,"","3"));
}
?>
