<?php
// date_default_timezone_set('Europe/Paris');
include_once'fonction/main.php';

switch($_GET['a'])
{
	case'u':
		if(!isset($_GET['f']))
		{
			echo update_rss();	
		}
		else
		{
			$feeds=explode('__i__', $_GET['f']);
			get_rss($feeds);
			echo compile_rss();
		}
		break;
	case'g':
		if(!isset($_GET['f']))
		{
			get_rss();
		}
		else
		{
			header('content-type: application/json');
			$feeds=explode('__i__', $_GET['f']);
			echo json_encode(get_rss($feeds));
		}
		break;
	case'c':
		echo compile_rss();
		break;
	case'latest':
		echo get_latest();
		break;
	case'feed':
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
