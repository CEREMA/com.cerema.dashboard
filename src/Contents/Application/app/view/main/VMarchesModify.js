App.view.define('main.VMarchesModify', 
{
    extend: 'Ext.window.Window',
	alias : 'widget.marchesmod',
    height: 235,
    width: 435,
	closable: true,
	draggable: true,
	resizable: false,
	layout: "form",
	margin: {
		left: 10,
		top: 10,
		bottom: 10,
		right: 10
	},
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
			xtype: 'combo',
			itemId: "marches_categories",
			fieldLabel: 'Rubrique',
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
});
