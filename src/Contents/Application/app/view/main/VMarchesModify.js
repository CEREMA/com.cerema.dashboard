App.view.define('main.VMarchesModify', 
{
    extend: 'Ext.window.Window',
	alias : 'widget.marchesmod',
    height: 235,
    width: 435,
	closable: true,
	draggable: true,
	resizable: false,
	layout: "fit",
	bodyStyle: "background-color: white",
	closeAction: 'destroy',
	title: 'Sous rubrique',
	bbar: [
		'->',
		{
			itemId: "rubrik_record",
			text: "Enregistrer"
		}
	],
	items: [
		{
			layout: "form",
			width: "100%",
			flex: 1,
			border: false,
			padding: 10,
			items: [
			{
				xtype: 'combo',
				itemId: "marches_categories",
				fieldLabel: 'Rubrique',
				store: App.store.create('App.Categories.getAll'),
				editable: false,
				emptyText:'Sélectionner une catégorie',
				displayField:'libelle',
				valueField: 'id'
			},
			{
				xtype: 'textfield',
				fieldLabel: 'Nom',
				id: 'TMarcheNom',
				name: 'TITLE'
			},
			{
				xtype: 'textfield',
				fieldLabel: 'Description',
				id: 'TMarcheDescription',
				name: '_DESC'
			},
			{
				xtype: 'numberfield',
				fieldLabel: 'Montant',
				id: 'TMarchePrix',
				name: 'PRICE'			
			}				
			
			]
		}
	]
});
