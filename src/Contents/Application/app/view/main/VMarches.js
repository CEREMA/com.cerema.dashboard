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
			text: "Enregistrer"
		}
	],
	items: [
		{
			xtype: 'grid',
			flex: 1,
			width: "100%",
			border: false,
			itemId: "GridMarches",
			plugins: [
				{ 
					ptype: 'cellediting',
					clicksToEdit: 1
				}			
			],
			store: App.store.create('App.Marches.getAll'),
			columns: [
				{
					header   : 'Titre', 
					flex	 : 1,
					width    : 160, 
					sortable : true,
					field: {
						xtype: "textfield"
					}, 
					dataIndex: 'TITLE'
				},
				{
					header   : 'Description', 
					width    : 250,
					flex	 : 1,					
					sortable : true,
					field: {
						xtype: "textfield"
					},
					dataIndex: '_DESC'
				},			
				{
					header   : 'Montant', 
					width    : 90, 
					sortable : true, 
					align: 'right',
					field: {
						xtype: "numberfield"
					},
					renderer : Ext.util.Format.Euro, 
					dataIndex: 'PRICE'
				},
				{
					header   : 'Rubrique', 
					width    : 250,
					itemId	 : "rubrik",
					field: {
						xtype: 'combo',
						margin: 5,
						width: "100%",
						bodyCls: "white",
						itemId: "marches_categories",
						name: 'CAT_ID',
						store: App.store.create('App.Categories.getAll',{
							autoLoad: true
						}),
						typeAhead: true,
						editable: false,
						triggerAction: 'all',
						mode: 'remote',
						emptyText:'Sélectionner une catégorie',
						selectOnFocus:true,
						readonly:true,
						displayField:'libelle',
						valueField: 'id'					
					}
				}				
			]			
		}
	]
});
