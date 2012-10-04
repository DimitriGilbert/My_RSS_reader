<?php
date_default_timezone_set('Europe/Paris');
include_once'fonction/main.php';

switch($_GET['a'])
{
	case'u':
		header('content-type text/xml');
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
		header('content-type text/xml');
		if(!isset($_GET['f']))
		{
			echo time().' ';
			get_rss();
			echo time();
		}
		else
		{
			echo time().' ';
			$feeds=explode('__i__', $_GET['f']);
			get_rss($feeds);
			echo time();
		}
		break;
	case'c':
		header('content-type text/xml');
		echo compile_rss();
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
