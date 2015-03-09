App.view.define('main.VMarchesModify', 
{
    extend: 'Ext.window.Window',
	alias : 'widget.marchesmod',
    height: 535,
    width: 830,
	closable: true,
	draggable: true,
	resizable: false,
	layout: "vbox",
	closeAction: 'destroy',
	title: 'Marchés',
	bbar: [
		'->',
		{
			itemId: "rubrik_record",
			text: "Enregistrer"
		}
	],
	items: [
	]
});
