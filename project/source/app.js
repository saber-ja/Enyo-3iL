/**
	Define and instantiate your enyo.Application kind in this file.  Note,
	application rendering should be deferred until DOM is ready by wrapping
	it in a call to enyo.ready().
*/

enyo.kind({
        name: "App",
        kind: "Panels",
        view: "view",
        fit: true,
        components: [
            {kind: "myapp.MainView"},
            {kind: "myapp.SubView"},
            {kind: "myapp.SubView2"}
        ]
});
new App().write();