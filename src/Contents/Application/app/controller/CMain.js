
App.controller.define('CMain', {

	views: [
		"VMain",
		"main.VMarches",
		"main.VFacture",
		"main.VMarchesModify",
		"VShowDoc",
		"main.VForm",
		"main.VFiltre"
	],
	
	models: [
	],
	
	init: function()
	{

		this.control({
			"menu>menuitem": {
				click: "Menu_onClick"
			},
			"grid#MainGrid": {
				itemdblclick: "grid_ondblclick",	// changement du nom : 'grid_ondblclick' au lieu de 'grid_onclick'
				itemcontextmenu: "MainGrid_menu",
				//***********************************************
				//					RAJOUT
				//***********************************************
				itemclick: "grid_onclick",
				//*****************FIN RAJOUT********************
			},
			"grid#MainGrid checkcolumn": {
				checkchange: "oncheckchange",
			},
			"combo#cbo_cat": {
				select: "cbo_cat_select"
			},
			"button#win_marches": {
				click: "open_marches"
			},
			"button#win_facture": {
				click: "open_facture"
			},
			"combo#marches_categories": {
				select: "cbo_marches_select"
			},
			"grid#GridMarches": {
				itemcontextmenu: "GridMarches_menu",
				itemdblclick: "GridMarches_onclick"
			},
            "button#export_excel": {
                click: "export_excel"  
            },
			"button#Facture_close": {
				click: "onFactureClose"
			},
			"button#TMarcheClose": {
				click: "onMarchesClose"
			},
			"button#rubrik_new": {
				click: "rubrik_new_onclick"
			},
			"button": {
				toggle: "toggle_buttons"
			},
			"marches": {
				show: "marches_onshow"
			},
			"facture": {
				show: "facture_onShow"
			},
			"button#duplicate": {
				click: "facture_duplicate"
			},
			"TShowDoc button#Exit": {
                click: "button_exit_onclick"
            },
			"uploadfilemanager#up": {
				itemdblclick: "up_onclick"
			},
			"button#rubrik_record": {
				click: "rubrik_record_onclick"
			},
			"marchesmod": {
				show: "marchesmod_onshow"
			},
			"button#rubrik_close": {
				click: "rubrik_close_onclick"
			},
			"combo#cbo_year": {
				select: "getYear_onselect"
			},
			//*********************************
			//         Rajouts évènements
			//*********************************
			// ---------- VMain
			"grid#gridFacture>gridview": {
				drop: "gridFacture_drop"
			},
			"grid#gridInfocentre>gridview": {
				drop: "gridInfocentre_drop"
			},
			"grid#gridInfocentre": {
				itemdblclick: "gridInfocentre_dblclick"
			},
			"grid#gridFacture": {
				itemdblclick: "gridInfocentre_dblclick"
			},
			"grid#gridFacture checkcolumn": {
				checkchange: "gridFacture_checkchange"
			},
			// ---------- VForm
			"button#btnVFormClose": {
				click: "onVFormClose"
			},
			// ---------- VFiltre
			"grid#gridFiltre checkcolumn": {
				checkchange: "gridFiltre_checkchange"
			},
			"button#btnVFiltreAnnuler": {
				click: "onVFiltreAnnuler"
			},
			"button#btnVFiltreEnregistrer": {
				click: "onVFiltreEnreg"
			},
			"combo#cbo_catFiltre": {
				select: "cbo_catFiltre_select"
			},
			//*********************************
			//      Fin rajouts évènements
			//*********************************
		});
		
		App.init('VMain',this.onLoad);
		
	},
	oncheckchange: function(column, rowIdx, checked, eOpts)
	{
		var id_facture=App.get("grid#MainGrid").getStore().getAt(rowIdx).data.idfacture;
		if (checked) var checked=1; else var checked=false;
		var o={
			id: id_facture,
			cloture: checked
		};
		App.Factures.update(o,function(err,o) {
			if (checked)
			App.notify('la facture est maintenant close.');
			else
			App.notify('la facture a été décloturée.');
		});				
	},
	getYear_onselect: function()
	{
		App.get('combo#cbo_cat').getStore().getProxy().extraParams.profile=Auth.User.profile;
		App.get('combo#cbo_cat').getStore().getProxy().extraParams.year=App.get('combo#cbo_year').getValue();
		App.get('combo#cbo_cat').getStore().load();	
		App.get('combo#cbo_cat').setValue('');
		App.get('grid#MainGrid').getStore().getProxy().extraParams.year=App.get('combo#cbo_year').getValue();
		App.get('grid#MainGrid').getStore().load();
	},
	rubrik_close_onclick: function(p)
	{
		App.get('grid#MainGrid').getStore().load();
		p.up('window').close();
	},
	rubrik_new_onclick: function(p)
	{
		App.view.create('main.VMarchesModify',{
			modal: true,
			rubrik: {
				ID: -1,
				CAT_ID: App.get('combo#cbo_cat').getValue()
			}
		}).show();	
	},
	rubrik_record_onclick: function(p)
	{
		var rubrik={
			CAT_ID: App.get('combo#marches_categories').getValue(),
			TITLE: App.get('textfield#TMarcheNom').getValue(),
			_DESC: App.get('textfield#TMarcheDescription').getValue(),
			PRICE: App.get('textfield#TMarchePrix').getValue(),
			YEAR: App.get('combo#cbo_year').getValue()
		};
		if (p.up('window').rubrik.ID!=-1) rubrik.ID=p.up('window').rubrik.ID;
		App.Marches.update(rubrik,function(err,response) {
			App.get('grid#GridMarches').getStore().load();
			p.up('window').close();
		});
	},
	marches_onshow: function(p)
	{
		App.get('grid#GridMarches').getStore().getProxy().extraParams.cat=App.get('combo#cbo_cat').getValue();
		App.get('grid#GridMarches').getStore().getProxy().extraParams.year=App.get('combo#cbo_year').getValue();
		App.get('grid#GridMarches').getStore().load();
	},
	marchesmod_onshow: function(p)
	{
		App.get('combo#marches_categories').getStore().getProxy().extraParams.year=App.get('combo#cbo_year').getValue();
		App.get('combo#marches_categories').getStore().load();
		App.get('combo#marches_categories').setValue(p.rubrik.CAT_ID);
		App.get('textfield#TMarcheNom').setValue(p.rubrik.TITLE);
		App.get('textfield#TMarcheDescription').setValue(p.rubrik._DESC);
		App.get('textfield#TMarchePrix').setValue(p.rubrik.PRICE);
	},
	MainGrid_menu: function( p, record, item, index, e )
	{
		//***********************************************
		//					RAJOUT
		//***********************************************
		var _p=this;
		var gridF=App.get('grid#gridFacture');
		var gridI=App.get('grid#gridInfocentre');
		//gridF.setDisabled(false);
		//gridI.setDisabled(false);
		//console.log(record.data);
		//console.log('Aie:'+record.data.idfacture);
		App.get('numberfield#hiddenFact').setValue(record.data.idfacture);
		//alert(App.get('numberfield#hiddenFact').getValue());
		gridF.setTitle('Marché: ' + record.data.marche_title + ' - ' + record.data.prestation + (record.data.ej!=''?(' (EJ: '+record.data.ej+')'):''));
		gridF.getStore().getProxy().extraParams.ID=record.data.idfacture;
		//gridF.getStore().load();
		gridF.getStore().load(function () {
			//console.log('grid_onclick:'+record.data.date_servicefait+', '+record.data.idfacture);
			_p.gestionFacture(record.data.date_servicefait, record.data.idfacture, record.data.ej);
		});
		gridF.getStore().on('load',function() {
			_p.calcTotal(App.get('grid#gridFacture').getStore().data);
		});
		//*****************FIN RAJOUT********************
		
		e.stopEvent();
		new Ext.menu.Menu({
			items: 
			[/*{
				itemId: 'MnuFactureDuplicate',
				text: 'Dupliquer la facture'
			},*/
				{
					itemId: 'MnuFactureDelete',
					text: 'Supprimer la facture',
				},
				//***********************************************
				//					RAJOUT
				//***********************************************
				{
					xtype: "menuseparator"
				},
				{
					itemId: 'MnuGestionBesoins',
					text: 'Gérer les besoins',
					handler: function(widget, event) {
						//alert('Gérer les commandes');
						//console.log(App.get('zoneCommandes'));
						App.get('grid#MainGrid').setHeight(400);
						gridF.setVisible(true);
						gridI.setVisible(true);
						gridF.setDisabled(false);
						gridI.setDisabled(false);
					}

				},
				{
					itemId: 'MnuStopGestionBesoins',
					text: 'Annuler la gestion des besoins',
					handler: function(widget, event) {
						//alert('Annuler la gestion des commandes');				
						gridF.setVisible(false);
						gridI.setVisible(false);
						App.get('grid#MainGrid').setHeight(800);
						//App.get('grid#MainGrid>gridview').refresh();
					}
				},
				{
					xtype: "menuseparator"
				},
				{
					itemId: 'MnuGestionFiltres',
					text: 'Gérer les filtres',
					handler: function(widget, event) {
						//alert('Annuler la gestion des commandes');
						_p.open_filtre();
						_p.createFiltres();
						var annee = App.get('combo#cbo_year').getValue();
						//console.log(annee);
						App.get('combo#cbo_catFiltre').getStore().getProxy().extraParams.year = annee;
						App.get('combo#cbo_catFiltre').getStore().load();	
						//console.log(App.get('combo#cbo_catFiltre').getStore());
						
						App.get('grid#gridFiltreAll').getStore().getProxy().extraParams.year = annee;
						App.get('grid#gridFiltreAll').getStore().load();
						App.get('grid#gridFiltre').getStore().filter('categorie',-1);
						App.get('grid#gridFiltre').getStore().getProxy().extraParams.year = annee;
						App.get('grid#gridFiltre').getStore().load();
						
					}
				}
				//*****************FIN RAJOUT********************
			]
		}).showAt(e.xy);
	},
	facture_duplicate: function(p) {
		var o={
			ID: p.up('window').facture.idfacture,
			n: App.get('numberfield#duplicate_number').getValue()
		};
		//console.log(o.ID);
		//console.log('facture-duplicate:'+App.get('datefield#date_servicefait').getValue()+', '+data.id);
		//this.gestionFacture(App.get('datefield#date_servicefait').getValue(), data.id);
		App.Factures.duplicate(o,function(err,r) {
			console.log(err);
			console.log(r);
			App.notify('La facture a été dupliquée.');
			p.up('window').close();
			App.get('grid#MainGrid').getStore().load();
		});
	},
	toggle_buttons: function(p,press) {
		if (p.iconCls=="orange") p.up('window').state_id="FF9900";
		if (p.iconCls=="black") p.up('window').state_id="000000";
		if (p.iconCls=="red") p.up('window').state_id="FF0000";
		if (p.iconCls=="green") p.up('window').state_id="99CC00";
		if (p.iconCls=="grey") p.up('window').state_id="C0C0C0";
	},
	button_exit_onclick: function(p) {
		p.up('window').close();
	},
	up_onclick: function(p, record)
	{
		App.view.create('VShowDoc', {
			modal: true,
			title: record.data.filename,
			pid: record.data.docId
		}).show().center();		
	},
	doFactureDelete: function()
	{
		var sel=App.get('grid#MainGrid').getSelectionModel();
		if (sel.selected.items.length>0) {
			console.log(sel.selected.items[0].data);
			if 	((sel.selected.items[0].data.ej=="") 
				&& (sel.selected.items[0].data.nofacture=="") 
				/*&& (sel.selected.items[0].data._BLOB==[])*/
				&& (sel.selected.items[0].data.BES==0) 
				&& !(sel.selected.items[0].data.date_servicefait) 
				&& (sel.selected.items[0].data.cloture==false))
			{
				App.Factures.del(sel.selected.items[0].data.idfacture,function(err,result) {
					App.notify("La facture a été supprimée");
					App.get('grid#MainGrid').getStore().load();
				});
				//************************************************
				//*******************RAJOUT***********************
				//************************************************
				var gridF=App.get('grid#gridFacture');
				var gridI=App.get('grid#gridInfocentre');
				gridF.setDisabled(true);
				gridI.setDisabled(true);
				gridF.getStore().getProxy().extraParams.ID=-100;
				gridF.setTitle("Séléction");
				gridF.getStore().load();
				gridI.getStore().getProxy().extraParams.ID=-1;
				gridI.getStore().getProxy().extraParams.CAT=App.get('combo#cbo_cat').getValue();
				gridI.getStore().getProxy().extraParams.YEAR=App.get('combo#cbo_year').getValue();
				gridI.getStore().load();
				App.get('numberfield#hiddenFact').setValue(-100);
				//************************************************
			}
			else
			{
				App.notify('Facture id:'+sel.selected.items[0].data.idfacture+' - Suppression non autorisée !');
				//alert('Facture id:'+sel.selected.items[0].data.idfacture+' - Suppression non autorisée !');
			}
			;	
		};
		
	},
	Menu_onClick: function(p)
	{
		if (p.itemId) {
			switch (p.itemId) 
			{
				case "MnuFactureDelete" :
					this.doFactureDelete();
					break;
				case "MnuMarchesDelete" :
					this.doMarchesDelete();
					break;
			};
		};		
	},
	facture_onShow: function(p)
	{	
		
		var cat=App.get('grid#MainGrid').getStore().getProxy().extraParams.id;
		App.get('combo#cbo_marche').getStore().getProxy().extraParams.cat=cat;
		App.get('combo#cbo_marche').getStore().getProxy().extraParams.year=App.get('combo#cbo_year').getValue();
		App.get('combo#cbo_marche').getStore().load();
		
		if (p.facture) {
			// update
			var color=p.facture.etiquette;
			if (color=="FF9900") App.get('button#borange').toggle(true);
			if (color=="000000") App.get('button#bblack').toggle(true);
			if (color=="FF0000") App.get('button#bred').toggle(true);
			if (color=="99CC00") App.get('button#bgreen').toggle(true);			
			if (color=="C0C0C0") App.get('button#bgrey').toggle(true);
			
			App.get('textfield#ej').setValue(p.facture.ej);
			App.get('textfield#prestation').setValue(p.facture.prestation);
			App.get('textfield#da').setValue(p.facture.numda);
			
			App.get('textfield#engagement').setValue(p.facture.engagement);
			App.get('numberfield#montant_prev').setValue(p.facture.montant_prev);
			App.get('numberfield#montant_facture').setValue(p.facture.montant_facture);
			App.get('textfield#reference').setValue(p.facture.reference);
			
			App.get('combo#cbo_marche').getStore().on('load',function(){
				App.get('combo#cbo_marche').setValue(p.facture.marche);
			});
			
			
			App.get('datefield#echeance').setValue(p.facture.echeance);
			App.get('datefield#date_facture').setValue(p.facture.date_facture);
			App.get('datefield#date_servicefait').setValue(p.facture.date_servicefait);
			App.get('datefield#date_chorus').setValue(p.facture.date_chorus);
			App.get('textfield#nofacture').setValue(p.facture.nofacture);
			App.get('textfield#immonet').setValue(p.facture.immonet);
			App.get('textarea#commentaire').setValue(p.facture.commentaire);
			
			App.get('uploadfilemanager#up').setFiles(JSON.parse(p.facture._BLOB));
						
		} 		
	},
	onMarchesClose: function()
	{
		App.get('marches').close();
	},
	onFactureClose: function(p)
	{
		if (!App.get('combo#cbo_marche').getValue()) {
			App.notify('Vous avez oublié de sélectionner un marché !');
			return;
		};
		var data={
			prestation: App.get('textfield#prestation').getValue(),
			reference: App.get('textfield#reference').getValue(),
			etiquette: p.up('window').state_id,
			echeance: App.get('datefield#echeance').getValue(),
			marche:App.get('combo#cbo_marche').getValue(),
			numda: App.get('textfield#da').getValue(),
			engagement: App.get('textfield#engagement').getValue(),
			montant_prev:App.get('numberfield#montant_prev').getValue(),
			ej: App.get('textfield#ej').getValue(),
			commentaire:App.get('textarea#commentaire').getValue(),
			montant_facture: App.get('numberfield#montant_facture').getValue(),
			nofacture: App.get('textfield#nofacture').getValue(),
			date_facture: App.get('datefield#date_facture').getValue(),
			date_servicefait: App.get('datefield#date_servicefait').getValue(),
			immonet: App.get('textfield#immonet').getValue(),
			_BLOB: App.get('uploadfilemanager#up').getFiles()
		};
		
		if (p.up('window').facture) {
			// update
			data.id=p.up('window').facture.idfacture;
			App.Factures.update(data,function(err,result) {
				App.get('grid#MainGrid').getStore().load();
			});
			//************************************************
			//*******************RAJOUT***********************
			//************************************************
			//console.log('onFactureClose:'+data.date_servicefait+', '+data.id);
			this.gestionFacture(data.date_servicefait, data.id, data.ej);
			//************************************************
		} else {
			// create
			App.Factures.insert(data,function(err,result) {
				App.get('grid#MainGrid').getStore().load();
			});			
		};
		p.up('window').close();
		App.get('grid#gridFacture').getStore().load();
	},
	open_facture: function(p, record, item, index, e)
	{
		App.view.create('main.VFacture',{
			modal: true,
			facture: record.data
		}).show();
		App.get('numberfield#duplicate_number').setVisible(false);
		App.get('button#duplicate').setVisible(false);
	},
	GridMarches_menu: function( p, record, item, index, e )
	{
		e.stopEvent();
		new Ext.menu.Menu({
			items: [{
				itemId: 'MnuMarchesDelete',
				text: 'Supprimer'
			}]
		}).showAt(e.xy);
	},
	GridMarches_onclick: function(p,record,item,index,e)
	{
		App.view.create('main.VMarchesModify',{
			modal: true,
			rubrik: record.data
		}).show();
	},
	cbo_marches_select: function(p, records)
	{
		
	},
	open_marches: function()
	{
		var marches=App.view.create('main.VMarches',{
			modal:true
		}).show();	
	},
	cbo_cat_select: function(p, records, eOpts)
	{
		var d=records[0].data;
		// refresh the grid
		var grid=App.get('grid#MainGrid');
		grid.getStore().getProxy().extraParams.id=d.id;
		grid.getStore().getProxy().extraParams.year=App.get('combo#cbo_year').getValue();
		grid.getStore().load();
		grid.getStore().on('beforeload',function() {
			// totals
			App.get('textfield#totalprevht').setValue('0.00');
			App.get('textfield#totalprevttc').setValue('0.00');
			App.get('textfield#totalfactureht').setValue('0.00');
			App.get('textfield#totalfacturettc').setValue('0.00');
		});
		// refresh.
		App.get('button#win_facture').setDisabled(false);
		
		//************************************************
		//*******************RAJOUT***********************
		//************************************************
		var gridF=App.get('grid#gridFacture');
		var gridI=App.get('grid#gridInfocentre');
		gridF.setDisabled(true);
		gridI.setDisabled(true);
		
		gridF.getStore().getProxy().extraParams.ID=-100;
		//gridF.getStore().getProxy().extraParams.CAT=d.id;
		gridF.setTitle("Séléction");
		gridF.getStore().load();
		
		gridI.getStore().getProxy().extraParams.ID=-1;
		gridI.getStore().getProxy().extraParams.YEAR=App.get('combo#cbo_year').getValue();;
		gridI.getStore().getProxy().extraParams.CAT=d.id;
		gridI.getStore().load();
		
		//******************FIN RAJOUT*********************

	},
	onLoad: function()
	{
		Auth.login(function(user) {
			App.profils.get(user.uid,function(r,x) {
				if (r.length==0) {					
					App.disabled();
				} else {
					Auth.User.profile=r[0].profil_code;
					App.get('combo#cbo_cat').getStore().getProxy().extraParams.profile=Auth.User.profile;
					App.get('combo#cbo_year').setValue(new Date().getFullYear());
					App.get('combo#cbo_cat').getStore().getProxy().extraParams.year=new Date().getFullYear();
					App.get('combo#cbo_cat').getStore().load();
				}
			});
		});/*
		Auth.User.profile=1;
		Auth.User.uid=614;*/
		
		App.get('combo#cbo_cat').getStore().getProxy().extraParams.profile=Auth.User.profile;
		App.get('combo#cbo_year').setValue(new Date().getFullYear());
		App.get('combo#cbo_cat').getStore().getProxy().extraParams.year=new Date().getFullYear();
		App.get('combo#cbo_cat').getStore().load();		
	},
	doMarchesDelete: function()
	{
		var sel=App.get('grid#GridMarches').getSelectionModel();
		//console.log(sel);
		if (sel.selected.items.length>0) {
			App.Marches.del(sel.selected.items[0].data.ID,function(err,result) {
				App.notify("Le marché a été supprimé");
				App.get('grid#GridMarches').getStore().load();
			});
		}
	},
	grid_ondblclick: function( p, record, item, index )	// changement du nom : 'grid_ondblclick' au lieu de 'grid_onclick'
	{
		App.view.create('main.VFacture',{
			modal: true,
			facture: record.data
		}).show();
		// ********* Rajout
		App.get('numberfield#hiddenFact').setValue(record.data.idfacture);
		// *********
	},
	
	//***************************************************************************************************
	//               							RAJOUTS
	//***************************************************************************************************
	grid_onclick: function( p, record, item, index )
	{
		var _p=this;
		var gridF=App.get('grid#gridFacture');
		var gridI=App.get('grid#gridInfocentre');
		gridF.setDisabled(false);
		gridI.setDisabled(false);
		App.get('numberfield#hiddenFact').setValue(record.data.idfacture);
		gridF.setTitle('Marché: ' + record.data.marche_title + ' - ' + record.data.prestation + (record.data.ej!=''?(' (EJ: '+record.data.ej+')'):''));
		gridF.getStore().getProxy().extraParams.ID = record.data.idfacture;
		gridF.getStore().load(function () {
			//console.log('grid_onclick:'+record.data.date_servicefait+', '+record.data.idfacture);
			_p.gestionFacture(record.data.date_servicefait, record.data.idfacture, record.data.ej);
		});
		
		gridF.getStore().on('load',function() {
			_p.calcTotal(App.get('grid#gridFacture').getStore().data);
		});
		
	},
	//---------------------------------------------
	gestionFacture: function(serviceFait, idFact, bdc)
	{
		//var fact=App.get('numberfield#hiddenFact').getValue();
		App.get('numberfield#hiddenFact').setValue(idFact);
		var gridF=App.get('grid#gridFacture');
		var gridI=App.get('grid#gridInfocentre');
		if (serviceFait)									// La facture est réalisée
		{
			//alert('serviceFait is not null');
			//console.log(gridF);
			gridF.getView().plugins[0].dragZone.lock();		// On bloque la possibilité de drag & drop
			gridI.getView().plugins[0].dragZone.lock();
			//gridF.columns[10].setVisible(true);
			App.get('grid#gridFacture checkcolumn').setVisible(true);
			//gridF.columns[10].setDisabled(true);
			App.get('grid#gridFacture checkcolumn').setDisabled(true);
			if(gridF.getStore().data.length != 0) 			// Des besoins sont rattachés à la facture
			{
				var o = {id: idFact, bes: 2};				// On fixe le champ BES (=besoins rattachés) à 2 (=facture finie et besoins rattachés)
				//console.log('setBES:'+o.id+' à '+o.bes);
				App.Factures.setBES(o, function(result) {
					//console.log(result);
				});
				var tabBes=[];								// On fixe l'avancement des besoins dans infocentre à 6 ("Paiement facture")
				for(var i=0; i < gridF.getStore().data.length; i++)
				{
					tabBes.push(gridF.getStore().data.items[i].data.ID_demande);
				};
				var o = {avanc: 6, data: tabBes};			
				App.Infocentre.setBaseAv(o, function(result) {
					//console.log(result);
				});
			}
			else											// Pas de besoins sont rattachés à la facture
			{												// On fixe le champ BES (=besoins rattachés) à 0 (=pas de besoins rattachés)
				var o = {id: idFact, bes: 0};				
				//console.log('setBES:'+o.id+' à '+o.bes);
				App.Factures.setBES(o, function(result) {
					//console.log(result);
				});
			};
		}
		else												// La facture n'est pas réalisée
		{
			//alert('serviceFait is null');
			gridF.getView().plugins[0].dragZone.unlock();	// On débloque la possibilité de drag & drop
			gridI.getView().plugins[0].dragZone.unlock();
			App.get('grid#gridFacture checkcolumn').setDisabled(false);
			//gridF.columns[10].setDisabled(false);
			(bdc!='')?App.get('grid#gridFacture checkcolumn').setVisible(true):App.get('grid#gridFacture checkcolumn').setVisible(false);
			
			if(gridF.getStore().data.length != 0)			// Des besoins sont rattachés à la facture
			{
				var o = {id: idFact, bes: 1};				// On fixe le champ BES (=besoins rattachés) à 1 (=des besoins sont rattachés)
				//console.log('setBES:'+o.id+' à '+o.bes);
				App.Factures.setBES(o, function(result) {
					//console.log(result);
				});
				if (bdc!='')								// Un bon de commande est renseigné
				{
					var tabBes4=[];							// On fixe l'avancement des besoins = 3 dans infocentre à 4 ("Commande")
					var tabBes5=[];
					for(var i=0; i < gridF.getStore().data.length; i++)
					{
						if (gridF.getStore().data.items[i].data.livre_valide) {
							tabBes5.push(gridF.getStore().data.items[i].data.ID_demande);
						} else {
							tabBes4.push(gridF.getStore().data.items[i].data.ID_demande);
						};
					};
					var o4 = {avanc: 4, data: tabBes4};
					var o5 = {avanc: 5, data: tabBes5};	
					App.Infocentre.setBaseAv(o4, function(result) {
						//console.log(result);
						App.Infocentre.setBaseAv(o5, function(result) {
						//console.log(result);
							gridF.getStore().load();
						});
					});
				} else {
					var tabBes=[];							// On fixe l'avancement des besoins dans infocentre à 3 ("Validation S2i")
					for(var i=0; i < gridF.getStore().data.length; i++)
					{
						gridF.getStore().data.items[i].data.coche=false;
						tabBes.push(gridF.getStore().data.items[i].data.ID_demande);
					};
					var o = {avanc: 3, data: tabBes};			
					App.Infocentre.setBaseAv(o, function(result) {
						//console.log(result);
						var obj = {coche:0, bes:tabBes};
						App.Infocentre.setBaseLivre(obj, function(result) {
						//console.log(result);
						});
					});
				}
			};
		};
	},
	//---------------------------------------------
	open_filtre: function()
	{
		App.view.create('main.VFiltre',{
			modal: true
		}).show();
	},
	//---------------------------------------------
	onVFiltreAnnuler: function()
	{
		App.get('VFiltre').close();
	},
	//---------------------------------------------
	onVFiltreEnreg: function()
	{
		//console.log(App.get('grid#gridFiltreAll').getStore().data.items);
		var tab=App.get('grid#gridFiltreAll').getStore().data.items;
		var data=[];
		var annee = App.get('combo#cbo_year').getValue();
		for (var i=0;i<tab.length;i++) {
			data.push({
				categorie:tab[i].data.categorie,
				coche:tab[i].data.coche,
				nature:tab[i].data.nature
			});
		};
		var obj = {
			year : annee,
			tableau : data
		};
		App.Filtre.update(obj, function(result) {
			//console.log(result);
			App.get('grid#gridInfocentre').getStore().getProxy().extraParams.ID=-1;
			App.get('grid#gridInfocentre').getStore().getProxy().extraParams.YEAR=annee;
			App.get('grid#gridInfocentre').getStore().getProxy().extraParams.CAT=App.get('combo#cbo_cat').getValue();
			App.get('grid#gridInfocentre').getStore().load();
		});
		App.get('VFiltre').close();
		
	},
	//---------------------------------------------
	cbo_catFiltre_select: function(p, records, eOpts)
	{
		var d=records[0].data;
		var grid=App.get('grid#gridFiltre');
		var annee = App.get('combo#cbo_year').getValue();
		//grid.getStore().getProxy().extraParams.id=d.id;
		grid.getStore().clearFilter();
		grid.getStore().filter('categorie',d.id);
		grid.getStore().getProxy().extraParams.year = annee;
		//grid.getStore().filter('annee',App.get('combo#cbo_year').getValue());
		grid.getStore().load(function () {
			for(var ligne=0; ligne <grid.getStore().data.length; ligne++)
			{
				var cat = App.get('grid#gridFiltre').getStore().data.items[ligne].data.categorie;
				var nat = App.get('grid#gridFiltre').getStore().data.items[ligne].data.nature;
				var match = App.get('grid#gridFiltreAll').getStore().findBy( function (record, id) {
					if (record.get('categorie') == cat && record.get('nature') == nat && record.get('annee') == annee)
						{return true};
				});
				App.get('grid#gridFiltre').getStore().data.items[ligne].data.coche = 
					App.get('grid#gridFiltreAll').getStore().data.items[match].data.coche;
			};
			App.get('grid#gridFiltre').getView().refresh();
		});
	},
	//---------------------------------------------
	gridFiltre_checkchange: function( moi, rowIndex, checked, eOpts )
	{
		//alert('click on checkcolumn');
		if(checked)
		{
			var cat = App.get('grid#gridFiltre').getStore().data.items[rowIndex].data.categorie;
			var nat = App.get('grid#gridFiltre').getStore().data.items[rowIndex].data.nature;
			var match = App.get('grid#gridFiltreAll').getStore().findBy( function (record, id) {
				if (record.get('categorie') == cat && record.get('nature') == nat)
					{return true};
			});
			App.get('grid#gridFiltreAll').getStore().data.items[match].data.coche = true;
			App.get('grid#gridFiltreAll').getView().refresh();
		}
		else
		{
			var cat = App.get('grid#gridFiltre').getStore().data.items[rowIndex].data.categorie;
			var nat = App.get('grid#gridFiltre').getStore().data.items[rowIndex].data.nature;
			var match = App.get('grid#gridFiltreAll').getStore().findBy( function (record, id) {
				if (record.get('categorie') == cat && record.get('nature') == nat)
					{return true};
			});
			App.get('grid#gridFiltreAll').getStore().data.items[match].data.coche = false;
			App.get('grid#gridFiltreAll').getView().refresh();
		};
	},
	//---------------------------------------------
	createFiltres: function()
	{
		App.Infocentre.getNatureAll(function(tabNature) {
		//console.log('+2');
			if (tabNature.message!="OK") {alert(tabNature.message.code);return;}
			var annee=App.get('combo#cbo_year').getValue();
			var o={year: annee};
			//console.log(tabNature);
			App.Categories.getAll(o, function(tabCategorie) {
				//console.log('+3');
				if (tabCategorie.message!="OK") {alert(tabNature.message.code);return;}
				//console.log(tabCategorie);
				App.Filtre.getAll(o, function(tabFiltre) {
					if (tabFiltre.message!="OK") {alert(tabFiltre.message.code);return;}
					var _data=[];
					/*console.log('------ FILTRE');
					//console.log(tabFiltre);
					//console.log('------ CATEGORIE');
					console.log(tabCategorie);
					console.log('------ NATURE');
					console.log(tabNature);*/
					for(var cat=0; cat < tabCategorie.data.length; cat++)
					{
						for(var nat=0; nat < tabNature.data.length; nat++)
						{
							var posExistFiltre =-1;
							for(var filt=0; filt < tabFiltre.data.length; filt++)
							{
								if ((tabFiltre.data[filt].categorie==tabCategorie.data[cat].id) &&
									(tabFiltre.data[filt].nature==tabNature.data[nat].ID_nature) &&
									(tabFiltre.data[filt].annee==annee)
									)
										posExistFiltre = filt;
							};
							if (posExistFiltre==-1)
								_data.push({
									categorie	: tabCategorie.data[cat].id,
									nature		: tabNature.data[nat].ID_nature,
									coche		: 0,
									annee		: annee,
								})
							else;
								//_data.push(tabFiltre.data[posExistFiltre])
						}
					};
					/*console.log('------ DATA');
					console.log(_data);*/
					var obj={year: annee, dataArray: _data};
					//console.log(obj);
					if (_data.length>0) 
						App.Filtre.insert(obj, function(result) {
						});
				});						
			});			
		});
	},
	//---------------------------------------------
	open_form: function()
	{
		App.view.create('main.VForm',{
			modal: true
		}).show();
	},
	//---------------------------------------------
	onVFormClose: function()
	{
		App.get('VForm').close();		
	},
	//---------------------------------------------
	gridFacture_drop: function(node, data, dropRec, dropPosition)
	{
		//console.log('Infocentre --> Facture');
		//console.log(App.get('grid#MainGrid').getSelectionModel());
		var fact = App.get('numberfield#hiddenFact').getValue();
		var _data=[];
		var sel = App.get('grid#MainGrid').getSelectionModel();
		var ava;
		valEj=App.get('grid#MainGrid').getStore().findRecord( 'idfacture', sel.selected.items[0].data.idfacture).data.ej;
		//console.log('long sel MainGrid:'+sel.selected.items.length);
		if (sel.selected.items.length>0) {
		//console.log('bdc sel MainGrid:'+sel.selected.items[0].data.idfacture);
		//console.log('valEj:'+valEj);
			if 	(valEj!=""){
				ava = 4;
			} else {
				ava = 3;
			};
		};
		//console.log('ava:'+ava);
		for(var i=0; i < data.records.length; i++)
		{
			data.records[i].data.livre_valide=false;
			_data.push({
				ID_demande	: data.records[i].data.ID_demande,
				facture		: fact,
				avancement	: ava
			});
		};
		App.Infocentre.setBaseFact(_data, function(result) {
			//console.log(result);
			App.notify("Demande(s) ajoutée(s) au panier");
		});
		
		if(App.get('grid#gridFacture').getStore().data.length != 0)
		{
			var o = {id: fact, bes: 1};
			App.Factures.setBES(o, function(result) {
				//console.log(result);
			});
		};
		
		App.get('grid#MainGrid').getStore().reload();
		App.get('grid#gridFacture').getStore().reload();	
		this.calcTotal(App.get('grid#gridFacture').getStore().data);
		
	},
	//---------------------------------------------
	gridFacture_checkchange: function( moi, rowIndex, checked, eOpts )
	{
		//alert('click on checkcolumn');
		var demande=App.get('grid#gridFacture').getStore().data.items[rowIndex].data.ID_demande;
		//console.log(rowIndex);
		//console.log(demande);
		if(checked)									
		{	
			var tabBes=[];							// Coché
			tabBes.push(demande);
			var o = {coche: 1, bes: tabBes};		// On check le champ livre_valide dans infocentre
			App.Infocentre.setBaseLivre(o, function(result) {
				//console.log(result);
			});
													// On fixe l'avancement du besoin à 5 ("Livraison")
			var o = {avanc: 5, data: tabBes};			
			App.Infocentre.setBaseAv(o, function(result) {
				//console.log(result);
			});
		}
		else
		{	
			var tabBes=[];							// Décoché
			tabBes.push(demande);
			var o = {coche:0, bes:tabBes};			// On uncheck le champ livre_valide dans infocentre
			App.Infocentre.setBaseLivre(o, function(result) {
			//console.log(result);
			});
			var sel=App.get('grid#MainGrid').getSelectionModel();
			if (sel.selected.items.length>0) {
				if 	(sel.selected.items[0].data.ej=="") 
				{											// Il n'existe pas de bdc sur cette facture
					var o = {avanc: 3, data: tabBes};		// On fixe l'avancement du besoin à 3 ("validation chef S2i")
				} 
				else 
				{											// Il existe un de bdc sur cette facture
					var o = {avanc: 4, data: tabBes};		// On fixe l'avancement du besoin à 4 ("Commande")
				};			
				App.Infocentre.setBaseAv(o, function(result) {
					//console.log(result);
				});
			}
		};
		App.get('grid#gridFacture').getStore().load();
	},
	//---------------------------------------------
	formatTotal : function(v)
	{
		v = (Math.round((v-0)*100))/100;
		v = (v == Math.floor(v)) ? v + ".00" : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
		return (v).replace(/\./, ',');
	},
	calcTotal: function (donnees)
	{
		var total=0;
		//console.log('-*-*-*-* longueur donnees:'+donnees.length);
		for(var i=0; i < donnees.length; i++)
		{
			//console.log(donnees.items[i].data.prix_sous_nature);
			total += (donnees.items[i].data.quantite * donnees.items[i].data.prix_sous_nature);
		};
		//console.log(total);
		App.get('textfield#nmbfTotalFact').setValue(this.formatTotal(total));
	},
	//---------------------------------------------
	gridInfocentre_drop: function(node, data, dropRec, dropPosition)
	{
		//console.log('Facture --> Infocentre');
		var fact=App.get('numberfield#hiddenFact').getValue();
		var factNone=-1;
		var _data=[];
		for(var i=0; i < data.records.length; i++)
		{
			data.records[i].data.livre_valide=false;
			_data.push({
				ID_demande	: data.records[i].data.ID_demande,
				facture		: factNone,
				avancement	: 3
			});
		};
		App.Infocentre.setBaseFact(_data, function(result) {
			//console.log(result);
			App.notify("Demandes(s) supprimée(s) du panier");
		});
		//console.log(App.get('grid#gridFacture').getStore().data.length);
		//console.log(fact);
		if(App.get('grid#gridFacture').getStore().data.length == 0)
		{
			var o = {id: fact, bes: 0};
			App.Factures.setBES(o, function(result) {
				//console.log(result);
			});
		};
		App.get('grid#MainGrid').getStore().load();
		App.get('grid#gridInfocentre').getStore().load();
		this.calcTotal(App.get('grid#gridFacture').getStore().data);
	},
	//---------------------------------------------
	gridInfocentre_dblclick: function( moi, record, item, index, e, eOpts )
	{
		//console.log(record.data.libelle_domaine_metier);
		this.open_form();
		
		App.get('textfield#txtfDepartement').setValue(record.data.LibUnic);
		App.get('textfield#txtfService').setValue(record.data.LibSubC);
		App.get('textfield#txtfBeneficiaire').setValue(record.data.NomPre);
		App.get('textfield#txtfDomaine').setValue(record.data.libelle_domaine_metier);
		App.get('textfield#txtfNature').setValue(record.data.libelle_nature);
		App.get('textfield#txtfSousNature').setValue(record.data.libelle_sous_nature);
		App.get('numberfield#nmbfQte').setValue(record.data.quantite);
		App.get('textfield#txtfmotivation').setValue(record.data.motivation_demande);
		App.get('textfield#txtalibelledemande').setValue(record.data.commentaire_demande);
		App.get('textfield#txtacommentaire').setValue(record.data.commentaire_s2i);
		App.get('datefield#datfdatedem').setValue(record.data.date_de_demande);
		App.get('numberfield#txtfprix').setValue(record.data.prix_sous_nature);
		//console.log('prix:'+record.data.prix_sous_nature);
		var valeurprogress = (record.data.avancement / 6);
		App.get('progressbar#progbAvancement').updateProgress(valeurprogress);
		App.get('text#txtAvancement').setText(record.data.libelle_avancement);
		
		if (record.data.phasage==0) App.get('progressbar#progbAvancement').getEl().dom.style.background = 'red';
		if (record.data.phasage==1) App.get('progressbar#progbAvancement').getEl().dom.style.background = 'orange';
		if (record.data.phasage==2) App.get('progressbar#progbAvancement').getEl().dom.style.background = 'green';
		if (record.data.phasage==3) App.get('progressbar#progbAvancement').getEl().dom.style.background = 'purple';
							
		if (record.data.phasage==0) App.get('radio#RP0').setValue(true);
		if (record.data.phasage==1) App.get('radio#RP1').setValue(true);
		if (record.data.phasage==2) App.get('radio#RP2').setValue(true);
		if (record.data.phasage==3) App.get('radio#RP3').setValue(true);
		
		App.get('checkbox#chbspecial').setValue(record.data.special);

		//alert('double click');
		//console.log('sortie');
	},
	//---------------------------------------------
});
