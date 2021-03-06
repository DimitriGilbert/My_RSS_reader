<?php
$path=dirname(__FILE__).'/../';

function get_rss($ids=false)
{
	global $path;
	$xml=new DOMDocument();
	$xml->load($path.'media/sites.xml');
	$sites=$xml->getElementsByTagName('site');
	
	foreach($sites as $s)
	{
		if(($ids and in_array($s->getAttribute('id'), $ids)) or (!$ids))
		{
			$feed=file_get_contents($s->getAttribute('feed'));
			$out=$path.'rss/received/'.$s->getAttribute('id').'.xml';
			@unlink($out);
			file_put_contents($out,$feed);
		}
	}
	return $ids;
}

function get_item_pub_date($item)
{
	$cs=$item->childNodes;
	foreach($cs as $c)
	{
		if($c->nodeName=='pubDate')
		{
			return $c->nodeValue;
		}
	}
	
	return false;
}

function get_item_timestamp($item)
{
	$pub_date=get_item_pub_date($item);
	if($pub_date)
	{
		return strtotime($pub_date);
	}
}

function usort_rss_func($x,$y)
{
	return get_item_timestamp($y)-get_item_timestamp($x);
}

function compile_rss()
{
	global $path;
	$c_rss=new DOMDocument();
	$c_rss->load($path.'media/void_c_rss.xml');
	$rss=new DOMDocument();
	$c_rss_a=array();
	$r_path=$path.'rss/received/';
	$dir=scandir($r_path);
	$today=mktime(0, 0, 0, date("m"), date("d"), date("y")) - 172800;
	foreach($dir as $r)
	{
		if(!in_array($r, array('.', '..', 'received')))
		{
			$from=explode('.', $r);
			$from=$from[0];
			@$rss->load($r_path.$r);
			//])> not allowed
			$items=$rss->getElementsByTagName('item');
			foreach($items as $i)
			{
				if(((int)get_item_timestamp($i))>$today)
				{
					$i->setAttribute('from',$from);
					$i->setAttribute('id',get_primkey());
					array_push($c_rss_a,$i);
				}				
			}
		}
	}
	usort($c_rss_a,'usort_rss_func');
	
	foreach($c_rss_a as $e)
	{
		$ne=$c_rss->importNode($e,true);
		
		$c_rss->getElementsByTagName('channel')->item(0)->appendChild($ne);
	}
	$fop=fopen($path.'rss/compiled/'.$today.'.xml','w');
	fclose($fop);
	$c_rss->save($path.'rss/compiled/'.$today.'.xml');
	return $c_rss->saveXML();
}

function update_rss()
{
	global $path;
	get_rss();
	return compile_rss();
}

function add_feed($id,$nom,$url)
{
	global $path;
	$xml=new DOMDocument();
	$xml->load($path.'media/sites.xml');
	$site=$xml->createElement('site');
	$site->setAttribute('id',$id);
	$site->setAttribute('name',$nom);
	$site->setAttribute('feed',$url);
	$xml->documentElement->appendChild($site);
	if($xml->save($path.'media/sites.xml'))
	{
		return 1;
	}
	else
	{
		return 'probleme de sauvegarde !';
	}
}

function del_feed($id)
{
	global $path;
	$xml=new DOMDocument();
	$xml->load($path.'media/sites.xml');
	$xp=new DOMXpath($xml);
	$node=$xp->query('//sites/site');
	print_r($node);
	//$xml->documentElement->removeChild($node);
	if($xml->save($path.'media/sites.xml'))
	{
		return 141;
	}
	else
	{
		return 'probleme de sauvegarde !';
	}
}

/**
*
*/
function get_latest()
{
	global $path;
	$files = scandir($path.'rss/compiled/', SCANDIR_SORT_DESCENDING);
	$file = $files[0];
	$xml = new DOMDocument();
	$xml->load($path.'rss/compiled/'.$file);
	return $xml->saveXML();
}

function get_primkey()
{
	$key=time();
	for($i=0;$i<2;$i++)
	{
		$k=rand(48 ,57);
		$key.=chr($k);
	}
	for($i=0;$i<5;$i++)
	{
		$k=rand(97 ,122);
		$key.=chr($k);
	}
	return $key;
}
?>
