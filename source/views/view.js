/**
	For simple applications, you might define all of your views in this file.  
	For more complex applications, you might choose to separate these kind definitions 
	into multiple files under this folder.
*/
var symbol = 0;
enyo.kind({
	name: "myapp.MainView",
	kind: "FittableRows",
	fit: true,
	components:[
		{kind: "onyx.Toolbar", content: "Main View"},
		{kind: "enyo.Scroller", fit: true, components: [
			{name: "main", classes: "nice-padding", allowHtml: true}
		]},
		{kind: "onyx.Toolbar", components: [
            {kind: "onyx.Button", content: "1", ontap: "thingTap"},
			{kind: "onyx.Button", content: "2", ontap: "thingTap"},
			{kind: "onyx.Button", content: "3", ontap: "thingTap"},
			{kind: "onyx.Button", content: "4", ontap: "thingTap"}
		]},
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Button", content: "5", ontap: "thingTap"},
			{kind: "onyx.Button", content: "6", ontap: "thingTap"},
			{kind: "onyx.Button", content: "7", ontap: "thingTap"},
			{kind: "onyx.Button", content: "8", ontap: "thingTap"}
		]},
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Button", content: "9", ontap: "thingTap"},
			{kind: "onyx.Button", content: "0", ontap: "thingTap"},
			{kind: "onyx.Button", content: "+", ontap: "thingTap"},
			{kind: "onyx.Button", content: "-", ontap: "thingTap"}
		]},
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Button", content: "*", ontap: "thingTap"},
			{kind: "onyx.Button", content: "/", ontap: "thingTap"},
			{kind: "onyx.Button", content: "=", ontap: "calculationTap"},
			{kind: "onyx.Button", content: "R", ontap: "resetTap"}
        ]}
	],
	thingTap: function(inSender, inEvent) {
		this.$.main.addContent(inSender.content);
		if(inSender.content == "+" || inSender.content == "-" || inSender.content == "*" || inSender.content == "/"){
			var sym = inSender.content;
			symbol++;
			if(symbol > 1){
				symbol = 1;
				var text = this.$.main.getContent();
				text = text.slice(0, -1);
				var calc;
				var tab;

				if(text.indexOf("*") != -1){
					tab = text.split("*");
					calc = parseInt(tab[0]) * parseInt(tab[1]);
				}
				if(text.indexOf("/") != -1){
					tab = text.split("/");
					calc = parseInt(tab[0]) / parseInt(tab[1]);
				}
				if(text.indexOf("+") != -1){
					tab = text.split("+");
					calc = parseInt(tab[0]) + parseInt(tab[1]);
				}
				if(text.indexOf("-") != -1){
					tab = text.split("-");
					calc = parseInt(tab[0]) - parseInt(tab[1]);
				}
				this.$.main.setContent(calc);
				this.$.main.addContent(sym);
			}
		}
	},
	calculationTap: function(inSender, inEvent){
		var text = this.$.main.getContent();
		var calc;
		var tab;

		if(text.indexOf("*") != -1){
			tab = text.split("*");
			calc = parseInt(tab[0]) * parseInt(tab[1]);
		}
		if(text.indexOf("/") != -1){
			tab = text.split("/");
			calc = parseInt(tab[0]) / parseInt(tab[1]);
		}
		if(text.indexOf("+") != -1){
			tab = text.split("+");
			calc = parseInt(tab[0]) + parseInt(tab[1]);
		}
		if(text.indexOf("-") != -1){
			tab = text.split("-");
			calc = parseInt(tab[0]) - parseInt(tab[1]);
		}
		this.$.main.setContent(calc);
	},
	resetTap: function(inSender, inEvent) {
		symbol = 0;
		this.$.main.setContent("");
	}
});