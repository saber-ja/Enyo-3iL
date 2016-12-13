/**
	Define and instantiate your enyo.Application kind in this file.  Note,
	application rendering should be deferred until DOM is ready by wrapping
	it in a call to enyo.ready().
*/

enyo.kind({
	name: "myapp.Application",
	kind: "enyo.Application",
	view: "myapp.MainView"
});

enyo.kind({
	name: "today.Application",
	kind: "enyo.Application",
	view: "today.MainView"
});

var urlListGroup = "http://www.agenda.lab3il.fr/ServiceRestAgenda.svc/" + type + "/listgroup";

enyo.kind({
	name:"DynamicMenu", 
	kind: "onyx.Menu", 
	onSelect: "itemSelected",
	components: [
		{content: "Aujourd'hui", value: "today"}
	],
	create: function(inSender, inEvent){

		this.inherited(arguments);

		var x = new enyo.Ajax({url: urlListGroup});
		x.go();		
		x.response(this, function(inSender, inResponse) {
			var listGroup = inResponse.GetGroupListResult;
			for(i=0; i < listGroup.length; i++){
				this.setItems([
					{content: listGroup[i].sLib, value: listGroup[i].sNum}
				]);
			}
		});
	},
	setItems: function(menuItems){
		this.createComponents(menuItems, {owner: this});
		this.render();
	}
});

enyo.kind({
	name: "GroupeListe",
	kind: "enyo.Select",
	components: [
		{content: "Select", value: null, hidden: true}
	],
	create: function(inSender, inEvent){
		this.inherited(arguments);

		var x = new enyo.Ajax({url: urlListGroup});
		x.go();
		x.response(this, function(inSender, inResponse){
			var listGroup = inResponse.GetGroupListResult;
			for(i=0; i < listGroup.length; i++){
				this.setItems([
					{content: listGroup[i].sLib, value: listGroup[i].sNum}
				]);
			}
		});
	},
	setItems: function(items){
		this.createComponents(items, {owner: this});
		this.render();
	}
});


enyo.ready(function () {
	new myapp.Application({name: "app"});
});
