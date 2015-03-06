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
					labelAlign: "top",
					fieldLabel: "Rubriques",
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
					editable: false,
					margin: {
						left:10,
						right:5,
						bottom: 5
					}
				},
				{
					xtype: "textfield",
					labelAlign: "top",
					fieldLabel: "Total Prév. <small>HT</small>",
					itemId: "totalprevht",
					fieldStyle: 'text-align: right;',
					readOnly: true,
					width: 130,
					margin: {
						right:5
					}
				},
				{
					xtype: "textfield",
					labelAlign: "top",
					fieldLabel: "Total Prév. <small>TTC</small>",
					itemId: "totalprevttc",
					fieldStyle: 'text-align: right;color: blue',
					readOnly: true,
					width: 130,
					margin: {
						right:5
					}
				},
				{
					xtype: "textfield",
					labelAlign: "top",
					fieldLabel: "Total Facture <small>HT</small>",
					itemId: "totalfactureht",
					readOnly: true,
					fieldStyle: 'text-align: right;',
					width: 130,
					margin: {
						right:5
					}
				},
				{
					xtype: "textfield",
					labelAlign: "top",
					fieldLabel: "Total Facture <small>TTC</small>",
					itemId: "totalfacturettc",
					readOnly: true,
					fieldStyle: 'text-align: right;color: blue',
					width: 130,
					margin: {
						right:5
					}
				},
				'->',
				{
					text: "Nouvelle facture",
					itemId: "win_facture",
					iconCls: "add-facture",
					iconAlign: "left",					
					disabled: true,
					height: 40
				},
				{
					text: "Sous rubriques",
					itemId: "win_marches",
					iconCls: "add-marche",
					iconAlign: "left",
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
				{header: "Mt prév. <small>HT</small>", width: 80, sortable: true, align:"right", renderer: function(v,r) {
					var total=App.get('textfield#totalprevht').getValue()*1;
					if (r.recordIndex!=-1) total+=v;
					App.get('textfield#totalprevht').setValue(total.toFixed(2));
					return v.toFixed(2);
				}, dataIndex: 'montant_prev',summaryType: 'sum'},
				{header: "Mt prév. <small>TTC</small>", width: 80, sortable: true, align:"right", renderer:  function(v,r){
					var total=App.get('textfield#totalprevttc').getValue()*1;
					if (r.recordIndex!=-1) total+=v*1.2;
					App.get('textfield#totalprevttc').setValue(total.toFixed(2));
					return '<div style="color: blue">'+Ext.util.Format.number(v*1.2, '0.00')+'</div>';
				}, dataIndex: 'montant_prev',summaryType: 'sum'},
				{header: "Bon de Cde.", width: 100, sortable: true, dataIndex: 'ej'},
				{header: "Facture", width: 100, dataIndex: 'nofacture', sortable: true},
				{header: "", width: 32, dataIndex: '_BLOB', renderer : function(val){
					val=JSON.parse(val);
					if (val.length>0) return '<div class="attachment">&nbsp;&nbsp;&nbsp;&nbsp;</div>'; else return '<div>&nbsp;&nbsp;&nbsp;&nbsp;</div>';
				}},
				{header: "Mt facture <small>HT</small>", width: 80, sortable: true, align:"right", renderer:  function(v,r) {
					var total=App.get('textfield#totalfactureht').getValue()*1;
					if (r.recordIndex!=-1) total+=v;
					App.get('textfield#totalfactureht').setValue(total.toFixed(2));
					return v.toFixed(2);				
				}, dataIndex: 'montant_facture', summaryType:'sum'},
				{header: "Mt facture <small>TTC</small>", width: 80, sortable: true, align:"right", renderer: function(v,r) {
					var total=App.get('textfield#totalfacturettc').getValue()*1;
					if (r.recordIndex!=-1) total+=v*1.2;
					App.get('textfield#totalfacturettc').setValue(total.toFixed(2));
					return '<div style="color: blue">'+Ext.util.Format.number(v*1.2, '0.00')+'</div>';				
				}, dataIndex: 'montant_facture', summaryType:'sum'},
				{header: "Service fait", width: 80, sortable: true, renderer: Ext.util.Format.dateRenderer('Y-m-d'), dataIndex: 'date_servicefait'},
				{header: "Date facture", width: 80, sortable: true, renderer: Ext.util.Format.dateRenderer('Y-m-d'), dataIndex: 'date_facture'},
				{header: "ImmoNET", width: 65, sortable: true, dataIndex: 'immonet'},
				{header: "Commentaire", sortable: true, dataIndex: 'commentaire',flex: 1},
				{header: "", width: 50, sortable: true, dataIndex: 'commentaire',xtype: "checkcolumn"}			
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
