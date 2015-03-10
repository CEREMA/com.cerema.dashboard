App.view.define('main.VMarches', 
{
    extend: 'Ext.window.Window',
	alias : 'widget.marches',
    height: 535,
    width: 830,
	closable: true,
	draggable: true,
	resizable: false,
	layout: "vbox",
	closeAction: 'destroy',
	title: 'Sous rubriques',
	bbar: [
		'->',
		{
			itemId: "rubrik_record",
			text: "Nouveau"
		}
	],
	items: [
		{
			xtype: 'grid',
			flex: 1,
			width: "100%",
			border: false,
			itemId: "GridMarches",
			store: App.store.create('App.Marches.getAll'),
			columns: [
				{
					header   : 'Titre', 
					flex	 : 1,
					width    : 160, 
					sortable : true,
					dataIndex: 'TITLE'
				},
				{
					header   : 'Description', 
					width    : 250,
					flex	 : 1,					
					sortable : true,
					dataIndex: '_DESC'
				},			
				{
					header   : 'Montant', 
					width    : 90, 
					sortable : true, 
					align: 'right',
					renderer : Ext.util.Format.Euro, 
					dataIndex: 'PRICE'
				}				
			]			
		}
	]
});
