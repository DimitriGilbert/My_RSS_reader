function docelid(id)
{
	return document.getElementById(id);
}

function serv_req(url,rep,met,data)
{
	if (window.XMLHttpRequest)
	{
		xhr_object = new XMLHttpRequest();
	}        
    else
    {
    	if (window.ActiveXObject)
    	{
    		xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
    	}
    	else
    	{
    		return (false);
    	}            
    }
    
    if(!met || met=="")
    {
    	var met="GET";
    }        
    xhr_object.open(met, url, false);
    
    if(met=="POST")
    {
    	xhr_object.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    	xhr_object.send(data);
    }
    else
    {
   		xhr_object.send(null);
    }
    
	
	if (xhr_object.readyState == 4)
	{
		if(!rep)
		{
			var rep="";
		}
		switch(rep)
		{
			case'':
				return xhr_object.responseText;
				break;
			case'text':
				return xhr_object.responseText;
				break;
			case'xml':
				return xhr_object.responseXml;
				break;
			case'object':
				return xhr_object;
				break;
		}
		
	}        
    else
    {
   		return (false);
    }
}

//creation d'id aleatoire
var gen_id=function() 
{
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');    
    len=12;    
    var str = '';
    for (var i = 0; i < len; i++)
    {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

var RSS='';
var FEED='';
var jsi=new JSI;

function loadXML(url)
{
	try
	{
		var XML = document.implementation.createDocument("", "", null);
	}
	catch(exc)
	{
		var XML = new ActiveXObject("Microsoft.XMLDOM"); 
	}
	if(typeof ASYNC != "undefined")
	{
		XML.async=ASYNC;
	}
	var parser = new DOMParser ();
	var xmlhttp = serv_req(url);
		
    XML = parser.parseFromString (xmlhttp, "text/xml");
    return XML
}

/**********************************************************************************************
//gestion du chargement et de l'affichage des flux
**********************************************************************************************/

function loadRSS()
{
	RSS=loadXML('goulot.php?a=u')
    build_news_list();
}

function get_info_child(item,tag)
{
	var cn=item.childNodes;
	var x=0;
	var y=cn.length;
	while(x<y)
	{
		if(cn[x].nodeName==tag)
		{
			return cn[x].textContent;
		}
		x++;
	}
	return false;
}

function build_info(item)
{
	var title=get_info_child(item,'title');
	var descrip=get_info_child(item,'description');
	var link=get_info_child(item,'link');
	var d=get_info_child(item,'pubDate');
	if(title!=false && descrip!=false && link!=false && d!=false)
	{
		
		var id=gen_id();
		var info=jsi.div(['class','onclick','id'],['info','read_info(this.id);',id]);
		info.appendChild(jsi.div(['class','id'],['info_title',id+'_title'],title));
		info.appendChild(jsi.div(['class','id'],['info_descrip',id+'_descrip'],descrip));
		info.appendChild(jsi.div(['class','id'],['info_link',id+'_link'],link));
		info.appendChild(jsi.div(['class','id'],['info_date',id+'_date'],d));
		return info;
	}
	else
	{
		return false;
	}
}

function build_news_list()
{
	if(RSS=='')
	{
		setTimeout('build_news_list()',250);
		return false;
	}
	else
	{
		var news=RSS.getElementsByTagName('item');
		var cont=docelid('infos');
		cont.innerHTML='';
		
		var x=0;
		var y=news.length;
		var info='';
		while(x<y)
		{
			info=build_info(news[x]);
			if(info)
			{
				cont.appendChild(info);
			}
			x++;
		}
	}
} 

function build_reader(id,title,descrip,link,d)
{
	var r_cont=jsi.div(['class','id'],['reader_content',id+'_reader']);
	r_cont.appendChild(jsi.h2(['class'],['reader_title'],title));
	r_cont.appendChild(jsi.div(['class'],['reader_date'],d));
	r_cont.appendChild(jsi.div(['class'],['reader_descrip'],descrip));
	r_cont.appendChild(jsi.div(['class','onclick'],['go_web','go_web("'+id+'")'],'GO WEB !'));
	docelid('reader').appendChild(r_cont);
	docelid('tweet_share').setAttribute('onclick','tweet_share("'+id+'");');
	docelid('g_share').setAttribute('onclick','g_share("'+id+'");');
	docelid('fb_share').setAttribute('onclick','fb_share("'+id+'");');
}

function read_info(id)
{
	title=docelid(id+'_title').innerHTML;
	descrip=docelid(id+'_descrip').innerHTML;
	link=docelid(id+'_link').innerHTML;
	d=docelid(id+'_date').innerHTML;
	docelid('reader').innerHTML='';
	build_reader(id,title,descrip,link,d);
}

function go_web(id)
{
	var frame=jsi.iframe(['class'],['go_web_frame'],docelid(id+'_link').innerHTML);	
	docelid('reader').innerHTML='';
	docelid('reader').appendChild(frame);
}

/********************************************************************************
//partage des items du flux
********************************************************************************/

function tweet_share(id)
{
	var url='https://twitter.com/intent/tweet?original_referer=My_RSS_reader&text='+encodeURIComponent(docelid(id+'_title').innerHTML)+'&url='+encodeURIComponent(docelid(id+'_link').innerHTML)
	window.open(url,'share on twitter','height=300,width=550');
}

function g_share(id)
{
	t=docelid(id+'_link').innerHTML+' : '+docelid(id+'_title').innerHTML;
	onclick=window.open('https://m.google.com/app/plus/x/?v=compose&content='+t,'google+ share','width=550,height=300');
}

function fb_share(id)
{
	t=docelid(id+'_link').innerHTML+' : '+docelid(id+'_title').innerHTML;
	onclick=window.open('http://www.facebook.com/sharer.php?u='+docelid(id+'_link').innerHTML+'&t='+docelid(id+'_title').innerHTML,'Facebook share','width=550,height=300');
}

/*******************************************************************************
//gestion de la liste des flux
*******************************************************************************/

function loadFEED()
{
	FEED=loadXML('goulot.php?a=feed');
	build_feed_list();
}

function build_feed(item)
{
	var info=jsi.div(['class','id'],['feed',item.getAttribute('id')],item.getAttribute('name'));
	info.appendChild(jsi.div(['class','onclick'],['delete','del_feed("'+item.getAttribute('id')+'")'],'X'));
	return info;
}

function build_feed_list()
{
	if(FEED=='')
	{
		setTimeout('build_feed_list()',250);
		return false;
	}
	else
	{
		var news=FEED.getElementsByTagName('site');
		var cont=docelid('feed_list');
		cont.innerHTML='';
		
		var x=0;
		var y=news.length;
		var info='';
		while(x<y)
		{
			info=build_feed(news[x]);
			cont.appendChild(info);
			x++;
		}
	}
}

function display_feed()
{
	var sl=docelid('site_liste');
	if(docelid('feed_list').innerHTML=='')
	{
		loadFEED();
	}
	if(sl.style.display=='none')
	{
		sl.style.display='block';
	}
	else
	{
		sl.style.display='none';
	}
}

function add_feed(id,nom,url)
{
	var r=serv_req('goulot.php?a=add_feed&i='+id+'&n='+nom+'&u='+url);
	if(r=='1')
	{
		window.location.reload();
	}
	else
	{
		alert('Problème lors de l\'ajout de la feed : '+r);
	}
}

function del_feed(id)
{
	var r=serv_req('goulot.php?a=del_feed&i='+id);
	if(r=='1')
	{
		window.location.reload();
	}
	else
	{
		alert('Problème lors de la suppression de la feed : '+r);
	}
}














