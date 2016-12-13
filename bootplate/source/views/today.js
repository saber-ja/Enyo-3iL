/**
	For simple applications, you might define all of your views in this file.  
	For more complex applications, you might choose to separate these kind definitions 
	into multiple files under this folder.
*/

var type = "json";
var urlListGroup = "http://www.agenda.lab3il.fr/ServiceRestAgenda.svc/" + type + "/listgroup";
var urlEDTByGroup = "http://www.agenda.lab3il.fr/ServiceRestAgenda.svc/" + type + "/agenda/";

var weekday = new Array(7);
weekday[0] = "Dimanche";
weekday[1] = "Lundi";
weekday[2] = "Mardi";
weekday[3] = "Mercredi";
weekday[4] = "Jeudi";
weekday[5] = "Vendredi";
weekday[6] = "Samedi";

var today = new Date();

enyo.kind({
	name: "today.MainView",
	kind: "FittableRows",
	fit: true,
	components:[
		{kind: "onyx.Toolbar", content: "3iL Agenda", style: "background: #e84e0f;border: 1px solid #ffffff;", components: [
			{kind: "onyx.MenuDecorator", onSelect: "itemSelected", components: [
				{content: "Menu"},
				{name: "dynaMenu", kind: "DynamicMenu", style: "margin-top: auto;"}
			]},
			{kind: "onyx.Item", content: "3iL Agenda"}
		]},
		{kind: "enyo.Scroller", fit: true, components: [
            {kind: "GroupeListe", name: "groupeListe"}
			//{name: "main", classes: "nice-padding", allowHtml: true}
		]},
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Button", content: "List group"}
		]}
	],
	create: function(inSender, inEvent) {
		this.inherited(arguments);
	}
});
