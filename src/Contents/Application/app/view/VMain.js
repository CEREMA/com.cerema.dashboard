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
			region: "south",
			width: "100%",
			height: 55,
			layout: "hbox",
			border: false,
			bodyCls: "lightblue",
			items: [
				{
					flex: 1,
					border: false
				},
				{
					xtype: "textfield",
					labelAlign: "top",
					fieldLabel: "Total Prév. <small>HT</small>",
					itemId: "totalprevht",
					fieldStyle: 'text-align: right;',
					readOnly: true,
					width: 130,
					height: 36,
					margin: {
						left:5,
						top: 5
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
					height: 36,
					margin: {
						left:5,
						top: 5
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
					height: 36,
					margin: {
						left:5,
						top: 5
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
					height: 36,
					margin: {
						left:5,
						top: 5,
						right: 5
					}
				}
			]
		},
		{
			region: "north",
			width: "100%",
			layout: "hbox",
			border: false,
			bodyCls: "lightblue",
			items: [
				{
					xtype: "combo",
					labelAlign: "top",
					fieldLabel: "Année",
					itemId: "cbo_year",
					store: App.store.create('dashboard://annees{libelle+}'),
					displayField:'libelle',
					valueField: 'libelle',
					selectOnFocus:true,
					width:100,
					readonly:true,
					editable: false,
					margin: {
						left:10,
						right:20,
						bottom: 5
					}
				},
				{
					xtype: "combo",
					labelAlign: "top",
					fieldLabel: "Rubrique",
					itemId: "cbo_cat",
					store: App.store.create('App.Categories.getAll'),
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
						right:20,
						bottom: 5
					}
				},
				{
					flex: 1,
					border: false
				},
				{
					xtype: "button",
					text: "Nouvelle facture",
					itemId: "win_facture",
					iconCls: "add-facture",
					iconAlign: "left",					
					disabled: true,
					width: 130,
					height: 40,
					margin: 5
				},
				{
					xtype: "button",
					text: "Sous rubriques",
					itemId: "win_marches",
					iconCls: "add-marche",
					iconAlign: "left",
					width: 100,
					height: 40,
					margin: 5
				}			
			]
		},
		{
			region: "center",
			layout: "vbox",						//layout: "fit", ****************** Changement
			items:								//******************* RAJOUT items
			[
				{
					xtype: "grid",			
					preserveScrollOnRefresh: true,
					width: "100%",
					flex: 1,
					border: false,
					itemId: "MainGrid",
					tbar: [
					{
						xtype: 'exportbutton',
						store: someStore
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
						{header: "DA", width: 70, sortable: true, dataIndex: 'numda'},
						{header: "Engagement", width: 70, sortable: true, dataIndex: 'engagement'},
						{header: "Bon de Cde", width: 100, sortable: true, dataIndex: 'ej'},
						{header: "Facture", width: 100, dataIndex: 'nofacture', sortable: true},
						{header: "", width: 32, dataIndex: '_BLOB', renderer : function(val){
							val=JSON.parse(val);
							if (val.length>0) return '<div class="attachment">&nbsp;&nbsp;&nbsp;&nbsp;</div>'; else return '<div>&nbsp;&nbsp;&nbsp;&nbsp;</div>';
						}},
						//***************************************************************************
						//									RAJOUT
						//***************************************************************************
						{header: "", width: 32, dataIndex: 'BES', renderer : function(val){
							if (val==1)	return('<div class="basket">&nbsp;&nbsp;&nbsp;&nbsp;</div>')
							else if (val==2) return('<div class="coche">&nbsp;&nbsp;&nbsp;&nbsp;</div>');
						}},
						//***************************************************************************

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
						{header: "", width: 50, sortable: true, dataIndex: 'cloture',xtype: "checkcolumn"}			
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
				},
				// *************************************************************
				//			RAJOUT : Zone horizontale avec deux grids
				// *************************************************************
				{
					
					layout       : {
						type: 'hbox',
						align: 'stretch',
						//padding: 5
					},
					border:false,
					width: '100%',
					itemId: "zoneCommandes",
					//hidden: true,
					items: 
					[
						//------------------------------------------------------
						{	// Champ caché de l'idfacture sélectionnée
							xtype	: "numberfield",
							itemId	: "hiddenFact",
							hidden	: true,
							value	: -100
							
						},
						//------------------------------------------------------
						{	// Eléments de la facture sélectionnée
							xtype			: "grid",
							padding			: 5,
							multiSelect		: true,
							itemId			: "gridFacture",
							title			: "Séléction",
							width			: '45%',
							height			: 400,
							disabled		: true,
							hidden: true,
							
							viewConfig: {
								plugins: {
									ptype		: 'gridviewdragdrop',
									dragGroup	: 'gridFacturegroup1',
									dropGroup	: 'gridInfocentregroup2'
								}
							},
							
							tbar: 
							[			// barre en haut de la grid
								'->',	// positionnement de ce qu'il y a à afficher : calé à droite
								{
									xtype: "label",
									text: "Total : "								
								},
								{
									xtype		: "textfield",
									itemId		: "nmbfTotalFact",
									fieldStyle	: 'text-align: center',
									readOnly	: true,
									hideLabel	: true
								}					
							],
							columns: [
								{header: "Domaine", 			width: 90, 	hidden: true, sortable: true, 	dataIndex: 'libelle_domaine_metier'},
								{header: "Nature", 				width: 100, hidden: false, sortable: true, 	dataIndex: 'libelle_nature'},
								{header: "Sous-nature", 		width: 120, hidden: false, sortable: true, 	dataIndex: 'libelle_sous_nature'},							
								{header: "Service", 			width: 80, hidden: true, sortable: true, 	dataIndex: 'LibsubC'},
								{header: "Dpt", 				width: 80, hidden: true, sortable: true, 	dataIndex: 'LibUnic'},
								{header: "Objet Motivation",	width: 150, hidden: false, sortable: true, 	dataIndex: 'motivation_demande'},
								{header: "Qté", 				width: 30, 	hidden: false, sortable: true, 	dataIndex: 'quantite'},
								{header: "Prix", 				width: 90,	hidden: false, sortable: true, 	dataIndex: 'prix_sous_nature', renderer:  Ext.util.Format.numberRenderer('0.00')},
								{header: "Avancement", 			width: 150, hidden: true, sortable: true, 	dataIndex: 'libelle_avancement'},
								{header: "Détails", 			width: 150, hidden: true, sortable: true, 	dataIndex: 'libelle_commande'},
								{header: "Commentaire", 		width: 150, hidden: true, sortable: true, 	dataIndex: 'commentaire_demande'},
								{header: "Livré", 				width: 30, 	hidden: false, sortable: true, 	dataIndex: 'livre_valide', xtype: 'checkcolumn', idItem: 'chkLivre'},
							],
							store: App.store.create('App.Infocentre.getBaseFact',{
								//autoLoad: true
							})					
						},
						//------------------------------------------------------
						{	// Eléments de la base de données infocentre2015
					
							xtype			: "grid",
							padding			: 5,
							multiSelect		: true,
							itemId			: "gridInfocentre",
							title			: "Demandes infocentre2015",
							width			: '55%',
							height			: 400,
							disabled		: true,
							hidden: true,
							
							viewConfig		: {
								plugins	: {
									ptype		: 'gridviewdragdrop',
									dragGroup	: 'gridInfocentregroup2',
									dropGroup	: 'gridFacturegroup1'
								},
							},
							//fieldLabel: "Nature",
							//labelAlign: "top",
							//tbar: [], // barre en haut de la grid
							
							tools: 
							[
								{
									itemId: 'refresh',
									type: 'refresh',
									hidden: false,
									callback: function() {
										var gridI=App.get('grid#gridInfocentre');
										gridI.getStore().getProxy().extraParams.ID=-1;
										gridI.getStore().getProxy().extraParams.CAT=App.get('combo#cbo_cat').getValue();
										gridI.getStore().getProxy().extraParams.YEAR=App.get('combo#cbo_year').getValue();										
										gridI.getStore().load();
									}
								},
							],
							columns: [
								{header: "Domaine", 			width: 90, 	hidden: true, sortable: true, 	dataIndex: 'libelle_domaine_metier'},
								{header: "Nature", 				width: 100, hidden: false, sortable: true, 	dataIndex: 'libelle_nature'},
								{header: "Sous-nature", 		width: 120, hidden: true, sortable: true, 	dataIndex: 'libelle_sous_nature'},
								{header: "Service", 			width: 80, hidden: true, sortable: true, 	dataIndex: 'LibSubC'},
								{header: "Dpt", 				width: 80, hidden: false, sortable: true, 	dataIndex: 'LibUnic'},
								{header: "Objet Motivation", 	width: 150, hidden: false, sortable: true, 	dataIndex: 'motivation_demande'},
								{header: "Qté", 				width: 20, 	hidden: false, sortable: true, 	dataIndex: 'quantite'},
								{header: "Prix", 				width: 70, 	hidden: true, sortable: true, 	dataIndex: 'prix_sous_nature',renderer:  Ext.util.Format.numberRenderer('0.00')},
								{header: "Avancement", 			width: 150, hidden: true, sortable: true, 	dataIndex: 'libelle_avancement'},
								{header: "Détails", 			width: 150, hidden: false, sortable: true, 	dataIndex: 'libelle_commande'},
								{header: "Commentaire", 		width: 150, hidden: true, sortable: true, 	dataIndex: 'commentaire_demande'},
								{header: "Livré", 				width: 30, 	hidden: true, sortable: true, 	dataIndex: 'livre_valide', xtype: 'checkcolumn', idItem: 'chkLivre'},
							],
							store: App.store.create('App.Infocentre.getBase',{
								//autoLoad: true
							})					
						}
				
					]	
				}	// ***************  FIN DU RAJOUT  *****************************
			]	// ** FIN DES ITEMS de la Region: center
		}	
	]
	
});
