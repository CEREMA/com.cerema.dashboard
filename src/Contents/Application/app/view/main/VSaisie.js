App.view.define('main.VSaisie',{
    
	extend: 'Ext.window.Window',
	alias: 'widget.saisie',	
	
	x:50,
	y:50,
    height: 640,
    width: 850,
	closable: false,
	draggable: true,
	resizable: false,
	closeAction: 'hide',
	labelWidth: 125,
	hidden: true,
	frame: false,
	title: 'Facture',
	bodyStyle:'padding:5px 5px 0',
	width: 420,
	defaults: {width: 390},
	id: 'myform',
	tbar:[
	{
		text: "Téléverser",
		id: 'TFactureUploadButton',
		hidden: true/*,
		handler: uploadFacturesFile*/
	},
	{
		text: "Document",
		id: 'TFactureUploadFile',
		hidden: false/*,
		handler: downloadFacturesFile*/
	},	
	{
		xtype: 'panel',
		id: 'TFactureUpload',
		hidden: true,
		html: '<input type="file" id="fileToUploadF"></input>'
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
		text:'Annuler', 
		itemid: "FactureCancel",
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
		xtype: 'textfield'
	},
	{
		fieldLabel: 'Référence',
		name: 'reference',
		xtype: 'textfield'
	},
	{
		fieldLabel: 'Etiquette',
		name: 'etiquette',
		xtype: 'colorfield',
		triggerAction: 'all',
		editable: false,
		selectOnFocus:false,			
		forceSelection:true
	},
	{
		fieldLabel: 'Echéance',
		name: 'echeance',
		format: 'Y-m-d',
		xtype: 'datefield'
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
		store: new Ext.data.DirectStore({
			directFn: App.Marches.getAll,
			autoLoad: false
		}),
		valueField: 'ID',
		displayField: 'TITLE'
	},
	{
		fieldLabel: 'Numéro DA',
		name: 'numda',
		xtype: 'textfield'
	},
	{
		fieldLabel: 'Montant prévisionnel',
		name: 'montant_prev',
		xtype: 'numberfield'
	},
	{
		fieldLabel: 'EJ',
		name: 'ej',
		xtype: 'textfield'
	},
	{
		fieldLabel: 'N° Facture',
		name: 'nofacture',
		xtype: 'textfield'
	},
	{
		fieldLabel: 'Montant Facture',
		name: 'montant_facture',
		xtype: 'numberfield'
	},
	{
		fieldLabel: 'Date Facture',
		name: 'date_facture',
		id: 'date_facture',
		format: 'Y-m-d',
		xtype: 'datefield'
	},
	{
		fieldLabel: 'Date Service Fait',
		name: 'date_servicefait',
		id: 'date_servicefait',
		format: 'Y-m-d',
		xtype: 'datefield'
	},
	{
		fieldLabel: 'Date Chorus',
		name: 'date_chorus',
		id: 'date_chorus',
		format: 'Y-m-d',
		xtype: 'datefield',
		hidden: true
	},
	{
		fieldLabel: 'Commentaire',
		name: 'commentaire',
		xtype: 'textarea'
	},
	{
		fieldLabel: 'Id',
		id: 'FacturesId',
		name: 'id',
		hidden: true,
		xtype: 'textfield'
	}
	]
	
});