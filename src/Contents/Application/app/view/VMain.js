App.view.define('VMain', {

    extend: 'Ext.Panel',
	alias : 'widget.mainform',
	border: false,
	
	layout: "border",
	
	items: [
		{
			region: 'north',
			height: 25,
			minHeight: 25,
			maxHeight: 25,
			border:false,
			baseCls: 'cls-header',
			xtype: "Menu",
			itemId: "MenuPanel",
			menu: [
			]		
		},
		{
			region: "center",
			xtype: "grid",
			preserveScrollOnRefresh: true,
			height: "100%",
			width: "100%",
			border: false,
			itemId: "MainGrid",
			tbar: [
				{
					xtype: "combo",
					itemId: "cbo_cat",
					store: new Ext.data.DirectStore({
						autoLoad: true,
						directFn: App.Categories.getAll					
					}),
					margin: 10,
					displayField:'libelle',
					valueField: 'id',	
					typeAhead: true,
					triggerAction: 'all',
					mode: 'remote',
					emptyText:'Sélectionner une catégorie',
					selectOnFocus:true,
					width:300,
					readonly:true,
					editable: false
				},
				'->',
				{
					text: "Ajouter",
					itemId: "win_facture",
					disabled: true,
					height: 40
				},
				{
					text: "Marchés",
					itemId: "win_marches",
					height: 40
				}
			],
			columns:[
				{header: "ID Facture", width: 80, sortable: true, dataIndex: 'idfacture',hidden: true},
				{header: "Prestation", width: 180, sortable: true, dataIndex: 'prestation'},
				{header: "Ref", width: 90, sortable: true, dataIndex: 'reference',summaryType: 'count',summaryRenderer: function(v){
					return "<b>"+v+" ligne(s)</b>";
				}},
				{header: "GM", width: 60, sortable: true, dataIndex: 'gim',hidden: true},
				{header: "Etiq", width: 30, sortable: true, dataIndex: 'etiquette',renderer : function(val){
					return '<span style="background-color:#'+val+';">&nbsp;&nbsp;&nbsp;&nbsp;</span>';
				}},
				{header: "Marché", width: 1, sortable: true, dataIndex: 'marche',hidden: false},
				{header: "Echéance", width: 80, sortable: true, renderer: Ext.util.Format.dateRenderer('Y-m-d'), dataIndex: 'echeance'},
				{header: "DA", width: 90, sortable: true, dataIndex: 'numda'},
				{header: "Mt prév.", width: 100, sortable: true, align:"right", renderer:  Ext.util.Format.numberRenderer('0.00'), dataIndex: 'montant_prev',summaryType: 'sum'},
				{header: "EJ", width: 100, sortable: true, dataIndex: 'ej'},
				{header: "Facture", width: 100, dataIndex: 'nofacture', sortable: true},
				{header: "PDF", width: 32, dataIndex: 'DOC', renderer : function(val){
					if (val!=0)	return '<div class="attachment">&nbsp;&nbsp;&nbsp;&nbsp;</div>';
				}},
				{header: "Mt facture", width: 100, sortable: true, align:"right", renderer:  Ext.util.Format.numberRenderer('0.00'), dataIndex: 'montant_facture', summaryType:'sum'},
				{header: "Service fait", width: 80, sortable: true, renderer: Ext.util.Format.dateRenderer('Y-m-d'), dataIndex: 'date_servicefait'},
				{header: "Date facture", width: 80, sortable: true, renderer: Ext.util.Format.dateRenderer('Y-m-d'), dataIndex: 'date_facture'},
				{header: "Commentaire", width: 200, sortable: true, dataIndex: 'commentaire',flex: 1}			
			],
			features: [
				{
					groupHeaderTpl: 'Marché: {name} ({rows.length} élément{[values.rows.length > 1 ? "s" : ""]})',
					ftype: 'groupingsummary'
				}
			],
			store: App.store.create('App.Factures.get',{
				sortInfo:{field: 'prestation', direction: "ASC"},
				groupField:'marche_title'
			})
		}
	]
	
});
