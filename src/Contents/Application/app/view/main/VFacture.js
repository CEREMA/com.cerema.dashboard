App.view.define('main.VFacture', 
{
    extend: 'Ext.window.Window',
	alias : 'widget.facture',
	
    width: 400,
	labelWidth: 110,
	closable: true,
	draggable: true,
	resizable: false,
	closeAction: 'destroy',
	hidden: true,
	frame: false,
	title: 'Facture',
	bodyStyle:'padding:5px 5px 0',
	layout: 'form',
	defaults: {
		width: "100%"
	},
	tbar: [
			{
				xtype: "button",
				enableToggle: true,
				text: "Libre",
				iconCls: "green",
				iconAlign: "left",
				margin: {
					left: 1
				},				
				flex: 1,
				toggleGroup: 'colors'
			},
			{
				xtype: "button",
				enableToggle: true,
				text: "important",
				iconCls: "orange",
				iconAlign: "left",
				margin: {
					left: 1
				},				
				flex: 1,
				toggleGroup: 'colors'
			},
			{
				xtype: "button",
				enableToggle: true,
				text: "obligatoire",
				iconCls: "red",
				iconAlign: "left",
				margin: {
					left: 1
				},				
				flex: 1,
				toggleGroup: 'colors'
			},
			{
				xtype: "button",
				enableToggle: true,
				text: "reliquat",
				iconCls: "black",
				iconAlign: "left",
				margin: {
					left: 1
				},				
				flex: 1,
				toggleGroup: 'colors'
			},
			{
				xtype: "button",
				enableToggle: true,
				text: "reportable",
				iconCls: 'grey',
				iconAlign: "left",
				margin: {
					left: 1
				},				
				flex: 1,
				toggleGroup: 'colors'
			}
	
	],
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
		text:'Fermer', 
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
		fieldLabel: 'Mt prévisionnel',
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
		fieldLabel: 'Service Fait',
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
		itemId: "up",
		width: "100%",
		height: 110,
		border: false
	}
	]

});