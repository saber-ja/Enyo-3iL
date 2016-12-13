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
	name: "myapp.MainView",
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
			{name: "main", classes: "nice-padding", allowHtml: true}
		]},
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Button", content: "List group", ontap: "getListGroup"}
		]}
	],
	create: function(inSender, inEvent) {
		this.inherited(arguments);
	},
	itemSelected: function(inSender, inEvent) {
		this.$.main.setContent("");
		//Menu items send an onSelect event with a reference to themselves & any directly displayed content
		if (inEvent.originator.content){
			if(inEvent.originator.content == "Aujourd'hui"){
				new today.Application({name: "app2"});
			}else{
				var style = "";
				var urlEDT = urlEDTByGroup + inEvent.originator.value;
				var x = new enyo.Ajax({url: urlEDT});
				x.go();		
				x.response(this, function(inSender, inResponse) {
					var agenda = inResponse.GetAgendaResult;
					this.$.main.addContent("<table>");
					for(i=0; i < agenda.length; i++){
						var tab = agenda[i].sDate.split('-');
						var day = tab[0]; var month = tab[1]; var year = tab[2];
						var d = new Date(year + "-" + month + "-" + day);
						
						if(d.getDate() == today.getDate() && d.getMonth() == today.getMonth() && d.getFullYear() == today.getFullYear()){
							style = 'style="color: #e84e0f;"';
						}else{
							style = 'style="color: #00000;"';
						}

						this.$.main.addContent("<tr>");
						this.$.main.addContent("<td " + style + "><b>" + weekday[d.getDay()] + "</b></td>");
						this.$.main.addContent("<td>" + day + "/" + month + "</td>");
						this.$.main.addContent("<td>" + agenda[i].sActivite + "</td>");
						this.$.main.addContent("<td>" + agenda[i].sHeure + "</td>");
						this.$.main.addContent("<td>" + agenda[i].sSalle + "</td>");
						this.$.main.addContent("</tr>");
					}
					this.$.main.addContent("</table>");
				});
			}

		} else if (inEvent.selected){
			//	Since some of the menu items do not have directly displayed content (they are kinds with subcomponents),
			//	we have to handle those items differently here.
			this.$.main.addContent(inEvent.selected.controlAtIndex(1).content + " Selected<br/>");
		}
		return true;
	},
	helloWorldTap: function(inSender, inEvent) {
		this.$.main.addContent("The button was tapped.<br/>");
	},
	getListGroup: function(inSender, InEvent) {
		var x = new enyo.Ajax({url: urlListGroup});
		x.go();		
		x.response(this, function(inSender, inResponse) {
			var listGroup = inResponse.GetGroupListResult;
			for(i=0; i < listGroup.length; i++){
				this.$.main.addContent(listGroup[i].sLib + "<br/>");
			}
		});
	}
});
