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
	title: 'Marchés',
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
			xtype:'form',
			border: false,
			itemId: 'TFormMarche',
			bodyStyle:'padding:5px 5px 0',
			defaults: {width: 450},			
			items: [
				{
					xtype: 'combo',
					itemId: "marches_categories",
					fieldLabel: 'Catégorie',
					name: 'CAT_ID',
					store: new Ext.data.DirectStore({
						autoLoad: true,
						directFn: App.Categories.getAll						
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
					fieldLabel: 'Prix',
					id: 'TMarchePrix',
					name: 'PRICE'			
				},
				{
					id: 'DropPDF',
					border: false,
					align:'right',
					hidden: true,
					height:30,
					html:'<input type="file" id="fileToUpload" width="50px"></input><button style="float:right" id="filetodownload">Document</button>&nbsp;&nbsp;<button style="float:right" id="filetosend">Téléverser</button>'
				},				
				{
					xtype: 'textfield',
					fieldLabel: 'Id',
					name: 'ID',
					hidden: true,
					id:'MyIDMarche'
				},
				{
					xtype: 'combo',
					fieldLabel: 'Cat.',
					id: 'NEW_CAT_ID',
					store: new Ext.data.DirectStore({
						autoLoad: true,
						directFn: App.Categories.getAll						
					}),
					typeAhead: true,
					editable: false,
					triggerAction: 'all',
					mode: 'remote',
					emptyText:'Sélectionner une catégorie',
					selectOnFocus:true,
					readonly:true,
					displayField:'libelle',
					valueField: 'id'/*,
					listeners: {
						select: mymarches_select_newcat
					}*/
				}				
			]
		},
		{
			xtype: 'grid',
			border: false,
			itemId: "GridMarches",
			store: new Ext.data.DirectStore({
				autoLoad: false,
				directFn: App.Marches.getAll			
			}),
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
