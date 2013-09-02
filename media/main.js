function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

var Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		 
		input = Base64._utf8_encode(input);
		 
		while (i < input.length) {
		 
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		 
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		 
		if (isNaN(chr2)) {
		enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
		enc4 = 64;
		}
		 
		output = output +
		this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
		this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		 
		}
		 
		return output;
	},
	 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		 
		while (i < input.length) {
		 
		enc1 = this._keyStr.indexOf(input.charAt(i++));
		enc2 = this._keyStr.indexOf(input.charAt(i++));
		enc3 = this._keyStr.indexOf(input.charAt(i++));
		enc4 = this._keyStr.indexOf(input.charAt(i++));
		 
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		 
		output = output + String.fromCharCode(chr1);
		 
		if (enc3 != 64) {
		output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
		output = output + String.fromCharCode(chr3);
		}
		 
		}
		 
		output = Base64._utf8_decode(output);
		 
		return output;
	 
	},
	 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		 
		for (var n = 0; n < string.length; n++) {
		 
		var c = string.charCodeAt(n);
		 
		if (c < 128) {
		utftext += String.fromCharCode(c);
		}
		else if((c > 127) && (c < 2048)) {
		utftext += String.fromCharCode((c >> 6) | 192);
		utftext += String.fromCharCode((c & 63) | 128);
		}
		else {
		utftext += String.fromCharCode((c >> 12) | 224);
		utftext += String.fromCharCode(((c >> 6) & 63) | 128);
		utftext += String.fromCharCode((c & 63) | 128);
		}
		 
		}
		 
		return utftext;
	},
	 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		 
		while ( i < utftext.length ) {
		 
		c = utftext.charCodeAt(i);
		 
		if (c < 128) {
		string += String.fromCharCode(c);
		i++;
		}
		else if((c > 191) && (c < 224)) {
		c2 = utftext.charCodeAt(i+1);
		string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
		i += 2;
		}
		else {
		c2 = utftext.charCodeAt(i+1);
		c3 = utftext.charCodeAt(i+2);
		string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
		i += 3;
		}
	 
	}
	 
	return string;
	}
}

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
/**
*initialisation of the reader object
*/

var My_RSS_reader={
	'settings':null,
	'RSS':null,
	'FEED':{
		'raw':null,
		'list':null
	},
	'marked':{
		'list': Array(),
		'tab':null
	},
	'init':function(settings){
		var def={
			'refresh':{
				'auto':false,
				'lapse':10,
				'pending':null
			},
			'read':{
				'hide':false,
				'bg_color':'#88CC00',
				'color':'#000'
			},
			'infos':{
				'width':'4',
				'height':'300',
				'auto_hide':true,
				'bg_color':'',
				'color':''
			},
			'go_web':{
				'target':'frame',
				'preload':false
			}
		};
		if(settings)
		{
			if(typeof(settings!='Object'))
			{
				settings=eval(settings);
				if(typeof(settings!='Object'))
				{
					settings={};
				}
			}
		}
		else
		{
			settings={};
		}
		
		this.settings=$.extend({},def,settings);
		this.loadFEED();
		// this.loadRSS();
		var loader=docelid('loader_info');
		loader.appendChild(jsi.div([],[],'Loading feeds list...'));
		this.loader();
	},
	'loader':function(){
		$('#main').hide();
		$('#loader').show();
		var loader=docelid('loader_info');
		if(this.FEED.raw===null)
		{
			setTimeout('My_RSS_reader.loader()',250);
			return false;
		}
		else
		{
			$('#loader_bar').attr('style','width:10%');
			loader.innerHTML='';
			loader.appendChild(jsi.div([],[],'Updating feeds...'));
			var x=0;
			var y=this.FEED.list.length;
			var percent=90/y;
			var old=2;
			percent=Math.round(percent);
			while(x<y)
			{
				loader.appendChild(jsi.div([],[],'Updating '+this.FEED.list[x].getAttribute('id')+'...'));
				$('#loader_bar').attr('style','width:'+old+'%');
				this.updateRSS([this.FEED.list[x].getAttribute('id')]);
				old=percent+old;
				x++;
			}
			$('#loader_bar').attr('style','width:97%');
			loader.appendChild(jsi.div([],[],'Merging feeds...'));
			this.compileRSS();

			$('#loader_bar').attr('style','width:99%');
			loader.appendChild(jsi.div([],[],'Building interface...'));
			this.build_news_list();
			$('#loader_bar').attr('style','width:100%');

			$('#loader').hide();
			$('#loader_bar').attr('style','width:1%');
			$('#main').fadeIn();
			if(this.settings.refresh.auto===true)
			{
				var timo=this.settings.refresh.lapse*60*1000;
				this.settings.refresh.pending=setTimeout('My_RSS_reader.loader()',timo);
			}
		}
	},
	'loadRSS':function(){
		this.RSS=loadXML('goulot.php?a=u');
		this.build_news_list();
		if(this.settings.refresh.auto===true)
		{
			var timo=this.settings.refresh.lapse*60*1000;
			this.settings.refresh.pending=setTimeout('My_RSS_reader.loadRSS()',timo);
		}
	},
	'updateRSS':function(ids){
		var rep=serv_req('goulot.php?a=g&f='+ids.join('__i__'));
		return rep;
	},
	'compileRSS':function(){
		this.RSS=loadXML('goulot.php?a=c');
	},
	'build_news_list':function(){
		if(this.RSS===null)
		{
			setTimeout('build_news_list()',250);
			return false;
		}
		else
		{
			var news=this.RSS.getElementsByTagName('item');
			var cont=docelid('infos');
			cont.innerHTML='';
			
			var x=0;
			var y=news.length;
			var info='';
			while(x<y)
			{
				info=this.build_info(news[x]);
				if(info)
				{
					cont.appendChild(info);
				}
				x++;
			}
			cont.childNodes[0].click();
		}
	},
	'get_info_child':function(item,tag){
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
	},
	'build_info':function(item){
		var title=this.get_info_child(item,'title');
		var descrip=this.get_info_child(item,'description');
		var link=this.get_info_child(item,'link');
		var d=this.get_info_child(item,'pubDate');
		var from=this.get_info_child(item,'from');
		if(title!==false && descrip!==false && link!==false && d!==false)
		{
			
			var id=gen_id();
			var info=jsi.div(['class','onclick','id'],['info','My_RSS_reader.read_info(this.id);',id]);
			info.appendChild(jsi.div(['class','id'],['info_title',id+'_title'],title+'<div onclick="My_RSS_reader.mark(\''+id+'\')">mark</div>'));
			info.appendChild(jsi.div(['class','id'],['info_descrip',id+'_descrip'],descrip));
			info.appendChild(jsi.div(['class','id'],['info_link',id+'_link'],link));
			info.appendChild(jsi.div(['class','id'],['info_date',id+'_date'],d));
			info.appendChild(jsi.div(['class','id'],['info_from',id+'_from'],from));
			return info;
		}
		else
		{
			return false;
		}
	},
	'build_reader':function(id,title,descrip,link,d){
		var r_cont=jsi.div(['class','id'],['reader_content',id+'_reader']);

		r_cont.appendChild(jsi.div(['class','onclick'],['go_previou float_left','$("#'+id+'").previous().click();'],'<< previous'));
		r_cont.appendChild(jsi.div(['class','onclick'],['go_web','My_RSS_reader.go_web("'+id+'")'],'GO WEB !'));
		r_cont.appendChild(jsi.div(['class','onclick'],['go_next float_right','$("#'+id+'").next().click()'],'next >>'));
		r_cont.appendChild(jsi.div(['class'],['float_clear10']));

		r_cont.appendChild(jsi.h2(['class'],['reader_title'],title));
		r_cont.appendChild(jsi.div(['class'],['reader_date'],d));
		r_cont.appendChild(jsi.div(['class'],['reader_descrip'],descrip));
		
		r_cont.appendChild(jsi.div(['class','onclick'],['go_previou float_left','$("#'+id+'").previous().click();'],'<< previous'));
		r_cont.appendChild(jsi.div(['class','onclick'],['go_web','My_RSS_reader.go_web("'+id+'")'],'GO WEB !'));
		r_cont.appendChild(jsi.div(['class','onclick'],['go_next float_right','$("#'+id+'").next().click()'],'next >>'));
		r_cont.appendChild(jsi.div(['class'],['float_clear']));
		docelid('reader').appendChild(r_cont);
		docelid('tweet_share').setAttribute('onclick','tweet_share("'+id+'");');
		docelid('g_share').setAttribute('onclick','g_share("'+id+'");');
		docelid('fb_share').setAttribute('onclick','fb_share("'+id+'");');
	},
	'read_info':function(id){
		title=docelid(id+'_title').innerHTML;
		descrip=docelid(id+'_descrip').innerHTML;
		link=docelid(id+'_link').innerHTML;
		d=docelid(id+'_date').innerHTML;
		docelid('reader').innerHTML='';
		this.build_reader(id,title,descrip,link,d);
		$('#'+id).parent().children().each(function(){
			if($(this).hasClass('info_active'))
			{
				$(this).removeClass('info_active');
			}
		});
		if(this.settings.read.hide===true)
		{
			$('.read').hide();
		}
		if(this.settings.read.bg_color!=='')
		{
			$('.read').attr('style',$('.read').attr('style')+'background-color:'+this.settings.read.bg_color+';');
		}
		if(this.settings.read.color!=='')
		{
			$('.read').attr('style',$('.read').attr('style')+'color:'+this.settings.read.color+';');
		}
		$('#'+id).addClass('info_active read');
	},
	'go_web':function(id){
		var frame=jsi.iframe(['class'],['go_web_frame'],docelid(id+'_link').innerHTML);	
		docelid('reader').innerHTML='';
		docelid('reader').appendChild(frame);
	},
	'infos_hide':function(){
		$('#info').attr('class','span2');
		$('#reader').attr('class','span10');
	},
	'info_show':function(){
		$('#info').attr('class','span4');
		$('#reader').attr('class','span8');
	},
	'loadFEED':function(){
		this.FEED.raw=loadXML('goulot.php?a=feed');
		this.FEED.list=this.FEED.raw.getElementsByTagName('site');
	},
	'build_feed':function(item){
		var info=jsi.div(['class','id'],['feed',item.getAttribute('id')],item.getAttribute('name'));
		info.appendChild(jsi.div(['class','onclick'],['delete','del_feed("'+item.getAttribute('id')+'")'],'X'));
		return info;
	},
	'build_feed_list':function(){
		if(this.FEED.raw===null)
		{
			setTimeout('build_feed_list()',250);
			return false;
		}
		else
		{
			var cont=docelid('feed_list');
			cont.innerHTML='';
			
			var x=0;
			var y=this.FEED.list.length;
			var info='';
			while(x<y)
			{
				info=build_feed(this.FEED.list[x]);
				cont.appendChild(info);
				x++;
			}
		}
	},
	'display_feed':function(){
		var sl=docelid('site_liste');
		if(this.FEED===null)
		{
			loadFEED();
		}
		if(docelid('feed_list').innerHTML==='')
		{
			this.build_feed_list();
		}
		if(sl.style.display=='none')
		{
			sl.style.display='block';
		}
		else
		{
			sl.style.display='none';
		}
	},
	'mark':function(id){
		this.marked.list.push(docelid(id+'_link').innerHTML);
	},
	'read_marked':function(){
		var data='Array("'+this.marked.list.join('","')+'")';
		data=Base64.encode(data);
		this.marked.tab=window.open('tab_read.php?m='+data,'_blank');
		// this.marked.tab.focus();
		console.log(this.marked.tab);
		//setTimeout("My_RSS_reader.marked.tab.tab_reader.init(My_RSS_reader.marked.list)",250) ;
	}
};

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














