App.view.define('main.VFacture', 
{
    extend: 'Ext.window.Window',
	alias : 'widget.facture',
	
    width: 580,
	closable: true,
	draggable: true,
	resizable: false,
	closeAction: 'destroy',
	hidden: true,
	frame: false,
	title: 'Facture',

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
				text: "important",
				iconCls: "orange",
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
				text: "obligatoire",
				iconCls: "red",
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
				text: "reliquat",
				iconCls: "black",
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
				text: "reportable",
				iconCls: 'grey',
				iconAlign: "left",
				margin: {
					left: 1,
					top:10,
					bottom:10
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
			}
		]
	},
	{
		fieldLabel: 'Prestation',
		labelWidth: 80,
		name: 'prestation',
		allowBlank: false,
		xtype: 'textfield',
		width: "100%"
	},
	{
		fieldLabel: 'Référence',
		labelWidth: 80,
		name: 'reference',
		xtype: 'textfield',
		width: "100%"
	},
	{
		fieldLabel: 'Code GM',
		labelWidth: 80,
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
		labelWidth: 80,
		name: 'echeance',
		format: 'Y-m-d',
		xtype: 'datefield',
		width: "100%"
	},
	{
		fieldLabel: 'Marché',
		labelWidth: 80,
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
		labelWidth: 80,
		name: 'numda',
		xtype: 'textfield',
		width: "100%"
	},
	{
		fieldLabel: 'Mt prévisionnel',
		labelWidth: 80,
		name: 'montant_prev',
		xtype: 'numberfield',
		width: "100%"
	},
	{
		fieldLabel: 'EJ',
		labelWidth: 80,
		name: 'ej',
		xtype: 'textfield',
		width: "100%"
	},
	{
		fieldLabel: 'N° Facture',
		labelWidth: 80,
		name: 'nofacture',
		xtype: 'textfield',
		width: "100%"
	},
	{
		fieldLabel: 'Montant Facture',
		labelWidth: 80,
		name: 'montant_facture',
		xtype: 'numberfield',
		width: "100%"
	},
	{
		fieldLabel: 'Date Facture',
		labelWidth: 80,
		name: 'date_facture',
		id: 'date_facture',
		format: 'Y-m-d',
		xtype: 'datefield',
		width: "100%"
	},
	{
		fieldLabel: 'Service Fait',
		labelWidth: 80,
		name: 'date_servicefait',
		id: 'date_servicefait',
		format: 'Y-m-d',
		xtype: 'datefield',
		width: "100%"
	},
	{
		fieldLabel: 'Date Chorus',
		labelWidth: 80,
		name: 'date_chorus',
		id: 'date_chorus',
		format: 'Y-m-d',
		xtype: 'datefield',
		hidden: true,
		width: "100%"
	},
	{
		fieldLabel: 'Commentaire',
		labelWidth: 80,
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