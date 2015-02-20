App.view.define('main.VFacture', 
{
    extend: 'Ext.window.Window',
	alias : 'widget.facture',
	
	x:50,
	y:50,
    width: 980,
	closable: true,
	draggable: true,
	resizable: false,
	closeAction: 'destroy',
	labelWidth: 125,
	hidden: true,
	frame: false,
	title: 'Facture',
	bodyStyle:'padding:5px 5px 0',
	width: 420,
	defaults: {width: "100%"},
	bbar:[
	{
		xtype: 'numberfield',
		width:50,
		value: 1,
		minValue: 0,
		id: 'duplicate_number'
	},	
	{
		xtype: 'button',
		text: 'Dupliquer'/*,
		handler: factures_duplicate*/
	},
	'->',
	{ 
		text:'Annuler', 
		itemId: "Facture_close",
		formBind:true, 
		scope:this
	},
	{ 
		text: 'Supprimer', 
		id: 'TFactureDelete',
		hidden: true,
		formBind: true, 
		scope: this/*, 
		handler: myform_delete*/
	},
	{ 
		text: 'Enregistrer', 
		formBind: true, 
		hidden: true,
		id: 'TFactureRecord',
		scope: this/*, 
		handler: myform_post*/
	}
	],	  
	items: [
	{
		xtype: "panel",
		layout: "hbox",
		border: false,
		width: "100%",
		bodyStyle: 'background:transparent;',
		items: [
			{
				xtype: "label",
				text: "Etiquette:",
				margin: {
					left: 1,
					top:10,
					bottom:10
				},
				width: 102
			},
			{
				xtype: "button",
				enableToggle: true,
				style: 'background-color:green',
				iconAlign: "left",
				margin: {
					left: 1,
					top:10,
					bottom:10
				},				
				flex: 1,
				toggleGroup: 'colors'
			},
			{
				xtype: "button",
				enableToggle: true,
				style: 'background-color:orange',
				iconAlign: "left",
				margin: {
					left: 1,
					top:10,
					bottom:10
				},				
				flex: 1,
				toggleGroup: 'colors'
			},
			{
				xtype: "button",
				enableToggle: true,
				style: 'background-color:red',
				iconAlign: "left",
				margin: {
					left: 1,
					top:10,
					bottom:10
				},				
				flex: 1,
				toggleGroup: 'colors'
			},
			{
				xtype: "button",
				enableToggle: true,
				style: 'background-color:black',
				iconAlign: "left",
				margin: {
					left: 1,
					top:10,
					bottom:10
				},				
				flex: 1,
				toggleGroup: 'colors'
			},
			{
				xtype: "button",
				enableToggle: true,
				style: 'background-color:#DDDDDD',
				iconAlign: "left",
				margin: {
					left: 1,
					top:10,
					bottom:10
				},				
				flex: 1,
				toggleGroup: 'colors'
			}
		]
	},
	{
		fieldLabel: 'Prestation',
		name: 'prestation',
		allowBlank: false,
		xtype: 'textfield',
		width: "100%"
	},
	{
		fieldLabel: 'Référence',
		name: 'reference',
		xtype: 'textfield',
		width: "100%"
	},
	{
		fieldLabel: 'Code GM',
		name: 'gim',
		hidden: true,
		xtype: 'combo',
		store: App.store.create('App.GM.getAllnew',{
			autoLoad: true
		}),
		allowBlank: false,
		valueField: 'code',
		editable: false,
		displayField: 'code',
		width: "100%"
	},
	{
		fieldLabel: 'Echéance',
		name: 'echeance',
		format: 'Y-m-d',
		xtype: 'datefield',
		width: "100%"
	},
	{
		fieldLabel: 'Marché',
		name: 'marche',
		allowBlank: false,
		hiddenName: 'cbo_marche',
		xtype: 'combo',
		triggerAction: 'all',
		editable: false,
		selectOnFocus:false,			
		forceSelection:true, 
		mode: 'local',
		itemId: 'cbo_marche',
		store: App.store.create('App.Marches.getAll'),
		valueField: 'ID',
		displayField: 'TITLE',
		width: "100%"
	},
	{
		fieldLabel: 'Numéro DA',
		name: 'numda',
		xtype: 'textfield',
		width: "100%"
	},
	{
		fieldLabel: 'Montant prévisionnel',
		name: 'montant_prev',
		xtype: 'numberfield',
		width: "100%"
	},
	{
		fieldLabel: 'EJ',
		name: 'ej',
		xtype: 'textfield',
		width: "100%"
	},
	{
		fieldLabel: 'N° Facture',
		name: 'nofacture',
		xtype: 'textfield',
		width: "100%"
	},
	{
		fieldLabel: 'Montant Facture',
		name: 'montant_facture',
		xtype: 'numberfield',
		width: "100%"
	},
	{
		fieldLabel: 'Date Facture',
		name: 'date_facture',
		id: 'date_facture',
		format: 'Y-m-d',
		xtype: 'datefield',
		width: "100%"
	},
	{
		fieldLabel: 'Date Service Fait',
		name: 'date_servicefait',
		id: 'date_servicefait',
		format: 'Y-m-d',
		xtype: 'datefield',
		width: "100%"
	},
	{
		fieldLabel: 'Date Chorus',
		name: 'date_chorus',
		id: 'date_chorus',
		format: 'Y-m-d',
		xtype: 'datefield',
		hidden: true,
		width: "100%"
	},
	{
		fieldLabel: 'Commentaire',
		name: 'commentaire',
		xtype: 'textarea',
		width: "100%"
	},
	{
		fieldLabel: 'Id',
		id: 'FacturesId',
		name: 'id',
		hidden: true,
		xtype: 'textfield',
		width: "100%"
	},{
		xtype: "uploadfilemanager",
		width: "98%",
		height: 110,
		margin: {
			bottom: 5,
			right: 6
		}
	}
	]

});