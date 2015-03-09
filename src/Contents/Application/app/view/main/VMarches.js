App.view.define('main.VMarches', 
{
    extend: 'Ext.window.Window',
	alias : 'widget.marches',
	x:50,
	y:50,
    height: 535,
    width: 530,
	closable: true,
	draggable: true,
	resizable: false,
	closeAction: 'destroy',
	layout: "vbox",
	title: 'Sous rubriques',
	tbar:[
	{ 
		text:'Nouveau', 
		formBind:true, 
		id:'TMarcheNew',
		hidden: false,
		scope:this/*, 
		handler: mymarches_new*/
	},
	{
		text:'Annuler',
		id: 'TMarcheClose'
	}
	],
	bbar:[
	'->',
	{ 
		text:'Supprimer	', 
		formBind:true, 
		id:'TMarcheDelete',
		scope:this, 
		hidden: false/*,
		handler: mymarches_del*/
	},
	{ 
		text: 'Enregistrer', 
		formBind: true, 
		id:'TMarcheRecord',
		hidden: false,
		scope: this/*, 
		handler: myform_record*/
	}
	],	
	listeners: {
		show: function()
		{
			/*$('#filetosend').click(uploadFile);
			$('#filetodownload').click(downloadFile);*/
		}
	},
	items: [
		{
			layout:'form',
			border: false,
			itemId: 'TFormMarche',
			bodyStyle:'padding:5px 5px 0',		
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
					name: 'TITLE',
					hidden: true
				},
				{
					xtype: 'textfield',
					fieldLabel: 'Description',
					id: 'TMarcheDescription',
					name: '_DESC',
					hidden: true
				},
				{
					xtype: 'numberfield',
					fieldLabel: 'Montant',
					id: 'TMarchePrix',
					name: 'PRICE',
					hidden: true			
				}
			]
		},
		{
			xtype: 'grid',
			flex: 1,
			border: false,
			itemId: "GridMarches",
			plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
				clicksToEdit: 1
			})],
			store: App.store.create('App.Marches.getAll'),
			height:305,
			//listeners: {
//				itemclick: grid_marches_click
			//},/
			columns: [
				{
					header   : 'ID', 
					width    : 1, 
					sortable : true, 
					dataIndex: 'ID',
					hidden	: true
				},
				{
					header   : 'Titre', 
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
