<?php
// Fill up array with names

include('config.php');

$qry = mysql_query('SELECT schoolname, headmaster from schools order by schoolname');
$a = array();
    $count = 0;
while($rows = mysql_fetch_array($qry))
{
	$a[$count]['schoolname'] = $rows['schoolname'];
    $a[$count]['headmaster'] = $rows['headmaster'];
    $count++;
}


//get the q parameter from URL
$q=$_GET["q"];//lookup all hints from array if length of q>0

if (strlen($q) > 0) {
  	$hint="";
	for($i=0; $i<count($a); $i++) {
  		if (strtolower($q)==strtolower(substr($a[$i]['schoolname'],0,strlen($q)))) {
    			if ($hint=="") {
      				$hint=$a[$i]['schoolname'] . '<i> (' . $a[$i]['headmaster'] . ') </i>';
      			}
    			else{
      				$hint= $hint. ' <li class="item" ng-click="viewSchoolProfile()">' .$a[$i]['schoolname'] . ' <i> ('. $a[$i]['headmaster'] . ') </i> </li>' ;
      			}
    		}
  	}
}

// Set output to "no suggestion" if no hint was found
// or to the correct values
if ($hint == ""){
	$response="<li class='item'> No Suggestion </li>";
}
else {
	$response= '<li class="item" ng-click="viewSchoolProfile()">' .$hint. '</li>';
}

//output the response
echo $response;
?>

