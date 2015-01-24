<?php

define("SQL_HOST","127.0.0.1");
/*define("SQL_HOST","164.100.133.243");*/
define("SQL_USER","root");
define("SQL_PASS","");
define("SQL_DB","escom");

/*
define("SQL_HOST","119.82.77.182");// 115.249.190.2
define("SQL_USER","escom");//root
define("SQL_PASS","comm@123");
define("SQL_DB","escom");
*/
class JsonClass
{
	public function getJSON($resultSet)
	{
		$rows = array();
		while($r = mysql_fetch_assoc($resultSet))
			$rows[] = $r;
		return $rows;
	}
	

	public function getJSONarray($jcase, $container, $data, $error)
	{
		$dataray = array('jcase' => $jcase, 'container' => $container, 'data' => $data, "error" => $error);
		return json_encode($dataray);
	}
	
	public function executeSQL($database, $tablename, $query, $operation)
	{
		$out = "SUCCESS";
		$SQLOPERATION = array("SELECT");
		$objJSON = new JsonClass();
		$con = mysql_connect(SQL_HOST,SQL_USER,SQL_PASS);
		if(!$con)
			return($out = $objJSON->getJSON(mysql_error()));
		mysql_select_db($database, $con);
		$result = mysql_query($query);
		if(!$result)
			return($out = $objJSON->getJSON(mysql_error()));
		if(in_array($operation,$SQLOPERATION))
			$out = $objJSON->getJSON($result);
		mysql_close($con);
		return($out);
	}

	public function getiJSON($resultSet)
	{
		//print_r($resultSet);
		$rows = array();
		while($r = mysqli_fetch_assoc($resultSet))
			$rows[] = $r;
		return $rows;
	}

	public function executeSP($database, $tablename, $query, $operation)
	{
		$objJSON = new JsonClass();
		$mysqli = new mysqli(SQL_HOST,SQL_USER,SQL_PASS,$database);
		if ($mysqli->connect_errno)
		    return "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
		
		$result = $mysqli->query($query);
		if (!$result)
    		return "CALL failed: (" . $mysqli->errno . ") " . $mysqli->error;
		
		$out = $objJSON->getiJSON($result);
		
		mysqli_close($mysqli);
		return($out);
	}
	/*
	public function executeSPMultiDataSet($database, $tablename, $query, $operation)
	{
		$objJSON = new JsonClass();
		$mysqli = new mysqli(SQL_HOST, SQL_USER, SQL_PASS, $database);
		if($mysqli->connect_errno)
			return "Failed to Connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;

		$result = $mysqli->query($query);

		if (!$result)
			return "CALL Failed: (" . $mysqli->errno . ") " . $mysqli->error;

		$i = 0;
		$out = array();
		do {
			$rowset = $result->fetch_assoc();
			if ($rowset) {
				$out[] = $objJSON->getiJSON($rowset);
			}
			$i++;
		} while ($result->nextRowset());

		//$out = $objJSON->getiJSON($result);

		mysqli_close($mysqli);
		return($out);
	}
	*/

	public function executeSP_MULTI($database, $tablename, $query, $operation)
	{
		$flag = 0;
		$out1 = NULL;
		$out2 = NULL;
		$out3 = NULL;
		$out4 = NULL;
		$out5 = NULL;
		$objJSON = new JsonClass();
		$mysqli = new mysqli(SQL_HOST,SQL_USER,SQL_PASS,$database);
		/* execute multi query */
		if ($mysqli->multi_query($query))
		{
			do
			{
				/* store first result set */
				if ($result = $mysqli->store_result())
				{
					switch($flag)
					{
						case 0:
						$out1 = $objJSON->getiJSON($result);
						break;
						
						case 1:
						$out2 = $objJSON->getiJSON($result);
						break;
						
						case 2:
						$out3 = $objJSON->getiJSON($result);
						break;
						
						case 3:
						$out4 = $objJSON->getiJSON($result);
						break;
						
						case 4:
						$out5 = $objJSON->getiJSON($result);
						break;
									
						default:
					}
					$result->free();
				}
				
				/* Switch to second RS */
				if ($mysqli->more_results())
					$flag++;
					
			} while ($mysqli->more_results() && $mysqli->next_result());
		}
		$finalData = array("OUT1"=>$out1, "OUT2"=>$out2, "OUT3"=>$out3, "OUT4"=>$out4, "OUT5"=>$out5);
		mysqli_close($mysqli);
		return($finalData);
	}
}
?>
