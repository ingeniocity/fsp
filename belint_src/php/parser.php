<?php
require("Core.php");
session_start();
$objJSON = new JsonClass();
//ini_set('display_errors', '1');

$decoded = NULL;
$finalVal = NULL;

$decoded = json_decode($_REQUEST['JSON']);
//$decoded = json_decode($_REQUEST['JSON'] ='{"jcase":"wizard_opr_next3","container":"","database":"escom","tablename":"","query":"CALL sp_11kv_shutdownfeedersforcycle(7596,\'\',\'\')","query1":"CALL sp_11kv_gettrackinfo(429)"}');
switch($decoded->jcase)
{
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
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalData,"0"));
	break;
	
	case "time_out":
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		$finalData = array("TimeVal"=>$mysqlData, "UserName"=>$decoded->username);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalData,"0"));
	break;
	
	case "time_out_pool":
		//echo $decoded->query."____".$decoded->username;
		$operation = "UPDATE";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$decoded->username,"0"));
	break;
	
	case "confData":
		$_SESSION["PageStat"] = 4;
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "confDataSet":
		$operation = "UPDATE";
		$mysqlData0 = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query0, $operation);
		$mysqlData1 = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query1, $operation);
		if($mysqlData0 == "SUCCESS" && $mysqlData1 == "SUCCESS")
			$finalVal = array("MSG"=>"Configuration is saved successfully!");
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	case "getStepDetails":
		$_SESSION["PageStat"] = 1;
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		$mysqlData1 = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query1, $operation);
		$finalVal = array("DT1"=>$mysqlData,"DT2"=>$mysqlData1);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "wizard_opr_next1":
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSP_MULTI($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "wizard_opr_next2":
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSP_MULTI($decoded->database, $decoded->tablename, $decoded->query, $operation);
		$mysqlDataQ = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query1, $operation);
		$fVal = array_merge($mysqlData,array("NOC"=>$mysqlDataQ));
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$fVal,"0"));
	break;
	
	case "wizard_opr_next3":
		$operation = "INSTERT";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		$operation = "SELECT";
		$mysqlData1 = $objJSON->executeSP_MULTI($decoded->database, $decoded->tablename, $decoded->query1, $operation);
		$finalVal = array($mysqlData1);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "viewFeed":
		$operation = "SELECT";
		$sct = date("H:i:s");
		$f1 = explode(":", $sct);
		$f2 = explode(":", $decoded->etime);
		
		$dt1 = intval($f1[0].$f1[1].$f1[2]);
		$dt2 = intval($f2[0].$f2[1].$f2[2]);
		
		$cyTime = "Track Current Cycle";
		if($dt2 < $dt1)
			$cyTime = "Track Past Cycle";
		
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		$finalVal = array("CYC"=>$cyTime,"OUT1"=>$mysqlData, "ST"=>$decoded->stime, "ET"=>$decoded->etime);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalVal,"0"));
	break;
	
	case "reqApAL":
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		$finalData = array("OUT2"=>$mysqlData);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$finalData,"0"));
	break;
	
	case "reqApCL":
		$_SESSION["PageStat"] = 2;
		$operation = "INSERT";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "reqApCL":
		$_SESSION["PageStat"] = 2;
		$operation = "INSERT";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "requestCancel":
		$_SESSION["PageStat"] = 2;
		$operation = "INSERT";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "reqAp":
		$operation = "INSERT";
		$mysqlData = $objJSON->executeSP($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "historyGet":
		$_SESSION["PageStat"] = 2;
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
	
	case "fillWizAgain":
		$_SESSION["wizid"] = $decoded->wizoutID;
		$operation = "SELECT";
		$wQuery = "CALL sp_11kv_getoutagedetailsbyid(".$decoded->wizoutID.")";
		$mysqlWIZata = $objJSON->executeSP_MULTI(SQL_DB, "sp_11kv_getoutagedetailsbyid", $wQuery, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlWIZata,"0"));
	break;
	
	case "getStationHeadSel":
		$_SESSION["PageStat"] = 3;
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
        
	case "getStationHeadZSel":
		$_SESSION["PageStat"] = 3;
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
        
	case "getStationHeadSSel":
		$_SESSION["PageStat"] = 3;
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
        
	case "searchStationHead":
		$_SESSION["PageStat"] = 3;
		$operation = "SELECT";
		$mysqlData = $objJSON->executeSQL($decoded->database, $decoded->tablename, $decoded->query, $operation);
		die($objJSON->getJSONarray($decoded->jcase,$decoded->container,$mysqlData,"0"));
	break;
        
	default:
	die($objJSON->getJSONarray($decoded->jcase,$decoded->container,"","3"));
}
?>
