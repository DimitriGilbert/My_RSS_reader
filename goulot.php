<?php
date_default_timezone_set('Europe/Paris');
include_once'fonction/main.php';

switch($_GET['a'])
{
	case'u':
		header('content-type text/xml');
		echo update_rss();	
		break;
	case'g':
		echo get_rss();	
		break;
	case'feed':
		header('content-type text/xml');
		echo file_get_contents($path.'media/sites.xml');
		break;
	case'add_feed':
		echo add_feed($_GET['i'],$_GET['n'],$_GET['u']);	
		break;	
	case'del_feed':
		echo del_feed($_GET['i']);	
		break;	
}

?>
