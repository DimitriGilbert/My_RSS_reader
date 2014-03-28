var Jsi = {};

Jsi.created = {};

Jsi.docelid = function (id) {
	return document.getElementById(id);
}

Jsi.append = function (parent, elt) {
	if (typeof elt != 'object' || elt.tag != undefined) {
		elt = this.elt(elt);
	}
	if (typeof parent != 'object') {
		parent = this.docelid(parent);
	}

	parent.appendChild(elt);
	return parent;
}

Jsi.textNode=function(content){
	return document.createTextNode(content);
};

/**
*{
*	"tag":"type of element",
*	"attr":{
*		"attribute1":"value of attr 1",
*		"...":"..."
*	},
*	"inner":"the inner content of the node"
*}
*/
Jsi.elt = function(c) {
	if (this.created[c.tag] == undefined) {
		this.created[c.tag] = document.createElement(c.tag);
		var elt = this.created[c.tag].cloneNode();
	}
	else {
		var elt=this.created[c.tag].cloneNode();		
	}
	var at_key = '';
	if(c.attr !== undefined)
	{
		for(var key in c.attr)
		{
			switch(key){
				case 'onclick':
					elt.addEventListener('click', c.attr[key]);
					break;
				case 'onchange':
					elt.addEventListener('change', c.attr[key]);
					break;
				case 'onfocus':
					elt.addEventListener('focus', c.attr[key]);
					break;
				case 'onkeyup':
					elt.addEventListener('keyup', c.attr[key]);
					break;
				case 'onkeypress':
					elt.addEventListener('keypress', c.attr[key]);
					break;
				case 'onsubmit':
					elt.addEventListener('submit', c.attr[key]);
					break;
				case 'className':
					elt.setAttribute('class',c.attr[key]);
					break;
				default:
					elt.setAttribute(key,c.attr[key]);
					break;
			}
		}
	}

	if (c.append !== undefined) {
		for (var ap in c.append) {
			if (c.append[ap].tag !== undefined) {
				elt = this.append(elt, this.elt(c.append[ap]));
			}
			else{
				elt = this.append(c.append[ap]);
			}
		}
	}
	
	if (c.inner !== undefined){
		elt.appendChild(this.textNode(c.inner));
	}

	if (c.innerForce !== undefined) {

		elt.innerHTML = c.innerForce;
	};

	return elt;
};