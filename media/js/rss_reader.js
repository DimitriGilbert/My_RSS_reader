var rss_reader = {};

rss_reader.helper = {};
rss_reader.controller = {};
rss_reader.view = {};
rss_reader.template = {};
rss_reader.feed = false;


/*********************************HELPER*********************************/
rss_reader.helper.getChildsByName = function(item,tag){
	var cn=item.childNodes;
	var child = [];
	for (x in cn)
	{
		if(cn[x].nodeName==tag)
		{
			child.push(cn[x]);
		}
	}
	return child;
}
/*********************************END HELPER*********************************/

/*********************************CONTROLLER*********************************/
rss_reader.controller.loadFeed = function () {
	$.get('goulot.php?a=latest', function(data){
		// rss_reader.feed = rss_reader.helper.parseXML(data);
		rss_reader.feed = $.parseXML(data);
		rss_reader.view.loadFeed();
	})
};

rss_reader.controller.addFeed = function () {
	$.get('goulot.php?a=add_feed&i='+$('#feed_id').val()+'&n='+$('#feed_name').val()+'&u='+$('#feed_url').val(), function(){
		$('#feed_id').val('');
		$('#feed_name').val('');
		$('#feed_url').val('');
		$('#add_feed').modal('hide');
	});
}

/*********************************END CONTROLLER*********************************/

/*********************************VIEW*********************************/
rss_reader.view.loadFeed = function () {
	var items = rss_reader.feed.getElementsByTagName('item');
	var infosContainer = Jsi.docelid('infos');
	var elt = null;
	var item = null;
	for (i in items){
		elt = rss_reader.template.feedItem(items[i]);
		if (elt) {
			Jsi.append(infosContainer, elt);
		}
	}
	items = null;

	return infosContainer;
};

rss_reader.view.showItem = function (elt) {
	var elt2 = rss_reader.template.readerItem(elt);
	elt2 = Jsi.elt(elt2);
	$('#reader').empty();
	Jsi.append('reader', elt2);
}

rss_reader.view.goWeb = function (elt) {
	var link = elt.getAttribute('data_link');
	$('#reader').empty();
	Jsi.append('reader', rss_reader.template.readerIframe(link));
}

rss_reader.view.addFeed = function () {
	$('#add_feed').modal();
	$('#add_feed').fadeIn();
}

/*********************************END VIEW*********************************/

/*********************************TEMPLATE*********************************/
rss_reader.template.feedItemTitle = function (title) {
	var tpl = {
		"tag":"div",
		"attr":{
			"className":"col-sm-12 feed_item_title"
		},
		"inner":title
	}

	return tpl;
}

rss_reader.template.feedItemDescription = function (description) {
	var tpl = {
		"tag":"div",
		"attr":{
			"className":"hidden"
		},
		"innerForce":description
	}

	return tpl;
}

rss_reader.template.feedItem = function (item) {
	var title = rss_reader.helper.getChildsByName(item, 'title');
	if (title.length > 0) {
		title = rss_reader.template.feedItemTitle(title[0].textContent);
		
		var link = rss_reader.helper.getChildsByName(item, 'link');

		var description = rss_reader.template.feedItemDescription(rss_reader.helper.getChildsByName(item, 'description')[0].textContent);

		var tpl = {
			"tag":"div",
			"attr":{
				"className":"col-sm-12 bg-primary feed_item",
				"data_from":item.getAttribute('from'),
				"data_link":link[0].textContent,
				"onclick":function () {
					rss_reader.view.showItem(this);
				}
			},
			"append":[
				title,
				description
			]
		}
	}
	else{
		tpl = false;
	}

	return tpl;
}

rss_reader.template.readerTitle = function (title) {
	var tpl = rss_reader.template.feedItemTitle(title);
	tpl.attr.className = "col-sm-12 text-center reader_title";
	return tpl;
}

rss_reader.template.readerDescription = function (description) {
	var tpl = rss_reader.template.feedItemDescription(description);
	tpl.attr.className = "col-sm-12 reader_description";
	return tpl;
}

rss_reader.template.readerGoWeb = function (link) {
	var tpl = {
		"tag":"div",
		"attr":{
			"className":"col-sm-2 col-sm-offset-5 text-center"
		},
		"append":[
			{
				"tag":"button",
				"attr":{
					"className":"btn btn-primary",
					"type":"button",
					"data_link":link,
					"onclick":function () {
						rss_reader.view.goWeb(this);
					}
				},
				"inner":"Go Web !"
			}
		]
	}
	return tpl;
}

rss_reader.template.readerItem = function (item) {
	var tpl = {
		"tag":"div",
		"attr":{
			"className":"col-sm-12 reader_item",
			"data_from":item.getAttribute('data_from'),
			"data_link":item.getAttribute('data_link')
		},
		"append":[
			rss_reader.template.readerTitle(item.childNodes[0].textContent),
			rss_reader.template.readerDescription(item.childNodes[1].innerHTML),
			rss_reader.template.readerGoWeb(item.getAttribute('data_link'))
		]
	}

	return tpl;
}

rss_reader.template.readerIframe = function (link) {
	var tpl = {
		"tag":"iframe",
		"attr":{
			"src":link,
			"className":"col-sm-12 reader_iframe"
		}
	}
	return tpl;
}

/*********************************END TEMPLATE*********************************/

rss_reader.init = function () {
	this.controller.loadFeed();
}