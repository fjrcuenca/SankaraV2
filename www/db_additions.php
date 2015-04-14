<? php
/**
 *
 *
 * In:
 * 	switch($_GET['action'])
 *
 *
 */ 
	case 'add_camp' :
		add_camp();
		break;
	case 'add_anganwandi' :
		add_anganwandi();
		break;
		
/**
 *
 *
 * Functions
 *	
 *
 *
 */
 
	/**  Function to Add Camp  **/
	function add_camp() {
		$data = json_decode(file_get_contents("php://input"));
		$camp_name      			= $data->camp_name;    
		$screening_date      		= $data->screening_date;
		$address  					= $data->address;
		$phone  					= $data->phone;
		$cosponsor  				= $data->cosponsor;
		$cosponsor_phone  			= $data->cosponsor_phone;
		$person_in_charge           = $data->person_in_charge;
		$person_in_charge_phone  	= $data->person_in_charge_phone;
	 
		print_r($data);
		$qry = 'INSERT INTO schools 
		(camp_name, screening_date, address, phone, cosponsor, cosponsor_phone, person_in_charge, person_in_charge_phone) 
		values 
		("' . $camp_name . '","' . $screening_date . '","' . $address . '","' . $phone . '","' . $cosponsor . '", 
		"' . $cosponsor_phone . '", "' . $person_in_charge . '", "' . $person_in_charge_phone . '")';
	   
		$qry_res = mysql_query($qry);
		if ($qry_res) {
			$arr = array('msg' => "Camp Added Successfully!!!", 'error' => '');
			$jsn = json_encode($arr);
			// print_r($jsn);
		} 
		else {
			$arr = array('msg' => "", 'error' => 'Error In inserting Camp');
			$jsn = json_encode($arr);
			// print_r($jsn);
		}
	}
	
	/**  Function to Add Anganwandi  **/
	function add_anganwandi() {
		$data = json_decode(file_get_contents("php://input"));
		$anganwandi_name      		= $data->anganwandi_name;    
		$screening_date      		= $data->screening_date;
		$headmaster     			= $data->headmaster;
		$address  					= $data->address;
		$phone  					= $data->phone;
		$cosponsor  				= $data->cosponsor;
		$cosponsor_phone  			= $data->cosponsor_phone;
		$person_in_charge           = $data->person_in_charge;
		$person_in_charge_phone  	= $data->person_in_charge_phone;
	 
		print_r($data);
		$qry = 'INSERT INTO schools 
		(anganwandi_name, screening_date, headmaster, address, phone, cosponsor, cosponsor_phone, person_in_charge, person_in_charge_phone) 
		values 
		("' . $anganwandi_name . '","' . $screening_date . '","' . $headmaster . '","' . $address . '","' . $phone . '","' . $cosponsor . '", 
		"' . $cosponsor_phone . '", "' . $person_in_charge . '", "' . $person_in_charge_phone . '")';
	   
		$qry_res = mysql_query($qry);
		if ($qry_res) {
			$arr = array('msg' => "Anganwandi Added Successfully!!!", 'error' => '');
			$jsn = json_encode($arr);
			// print_r($jsn);
		} 
		else {
			$arr = array('msg' => "", 'error' => 'Error In inserting Anganwandi');
			$jsn = json_encode($arr);
			// print_r($jsn);
		}
	}
		
?>