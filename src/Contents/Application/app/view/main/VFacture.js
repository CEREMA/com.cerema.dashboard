App.view.define('main.VFacture', 
{
    extend: 'Ext.window.Window',
	alias : 'widget.facture',
	
	initComponent: function() {
		this.width = 470;
		this.labelWidth = 190;
		this.closable = true;
		this.draggable = true;
		this.resizable = false;
		this.closeAction = 'destroy';
		this.frame =  false;
		this.title = 'Facture';
		this.bodyStyle = 'padding:5px 5px 0';
		this.layout = 'form';
		this.defaults = {
			width: "100%"
		};
		this.tbar = [
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
				itemId: "bgreen",
				toggleGroup: 'colors'
			},
			{
				xtype: "button",
				enableToggle: true,
				text: "important",
				iconCls: "orange",
				itemId: "borange",
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
				itemId: "bred",
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
				itemId: "bblack",
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
				itemId: "bgrey",
				iconAlign: "left",
				margin: {
					left: 1
				},				
				flex: 1,
				toggleGroup: 'colors'
			}
	
		];
		this.bbar = [
		{
			xtype: 'numberfield',
			width:50,
			value: 1,
			minValue: 0,
			itemId: 'duplicate_number'
		},	
		{
			xtype: 'button',
			itemId: 'duplicate',
			text: 'Dupliquer'
		},
		'->',
		{ 
			text:'Valider', 
			itemId: "Facture_close",
			formBind:true, 
			scope:this
		},
		{ 
			text: 'Enregistrer', 
			formBind: true, 
			hidden: true,
			id: 'TFactureRecord',
			scope: this
		}
		];
		this.items = [
		{
			fieldLabel: 'Prestation',
			itemId: "prestation",
			name: 'prestation',
			allowBlank: false,
			xtype: 'textfield',
			width: "100%"
		},
		{
			fieldLabel: 'Référence',
			name: 'reference',
			itemId: "reference",
			xtype: 'textfield',
			width: "100%"
		},
		{
			fieldLabel: 'DA',	
			itemId: "da",			
			name: 'da',
			xtype: 'textfield',
			width: "100%"
		},
		{
			fieldLabel: 'Engagement',
			itemId: "engagement",
			name: 'engagement',
			xtype: 'textfield',
			width: "100%"
		},
		{
			fieldLabel: 'Echéance',	
			itemId: "echeance",			
			name: 'echeance',
			format: 'd/m/Y',
			xtype: 'datefield',
			width: "100%"
		},
		{
			xtype: 'combo',
			fieldLabel: 'Marché',
			allowBlank: false,
			triggerAction: 'all',
			editable: false,
			itemId: 'cbo_marche',
			store: App.store.create('App.Marches.getAll'),
			valueField: 'ID',
			displayField: 'TITLE',
			width: "100%"
		},
		{
			fieldLabel: 'Mt prévisionnel <small>HT</small>',
			name: 'montant_prev',
			itemId: "montant_prev",
			xtype: 'numberfield',
			decimalSeparator:'.',
			width: "100%"
		},
		{
			fieldLabel: 'Bon de Cde',
			name: 'ej',
			itemId: "ej",
			xtype: 'textfield',
			width: "100%"
		},
		{
			fieldLabel: 'N° Facture',
			name: 'nofacture',
			itemId: "nofacture",
			xtype: 'textfield',
			width: "100%"
		},
		{
			fieldLabel: 'Montant Facture <small>HT</small>',
			name: 'montant_facture',
			itemId: "montant_facture",
			xtype: 'numberfield',
			decimalSeparator:'.',
			width: "100%"
		},
		{
			fieldLabel: 'Date Facture',
			name: 'date_facture',
			itemId: 'date_facture',
			format: 'd/m/Y',
			xtype: 'datefield',
			width: "100%"
		},
		{
			fieldLabel: 'Service Fait',
			name: 'date_servicefait',
			itemId: 'date_servicefait',
			format: 'd/m/Y',
			xtype: 'datefield',
			width: "100%"
		},
		{
			fieldLabel: 'Date Chorus',
			name: 'date_chorus',
			itemId: 'date_chorus',
			format: 'Y-m-d',
			xtype: 'datefield',
			hidden: true,
			width: "100%"
		},
		{
			fieldLabel: 'immoNET',
			name: 'immonet',
			itemId: 'immonet',
			xtype: 'textfield',
			width: "100%"
		},
		{
			fieldLabel: 'Commentaire',
			name: 'commentaire',
			itemId: 'commentaire',
			xtype: 'textarea',
			width: "100%"
		},
		{
			fieldLabel: 'Id',
			itemId: 'FacturesId',
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
		
		this.callParent(arguments);
	}
	

});