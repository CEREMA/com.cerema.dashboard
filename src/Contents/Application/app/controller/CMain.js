App.controller.define('CMain', {

	views: [
		"VMain",
		"main.VMarches",
		"main.VFacture",
		"main.VMarchesModify"
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
				itemdblclick: "grid_onclick",
				itemcontextmenu: "MainGrid_menu"
			},
			"grid#MainGrid checkcolumn": {
				checkchange: function(column, rowIdx, checked, eOpts){
					alert('x');
				}			
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
			"button#Facture_close": {
				click: "onFactureClose"
			},
			"button#TMarcheClose": {
				click: "onMarchesClose"
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
			}
		});
		
		App.init('VMain',this.onLoad);
		
	},
	rubrik_record_onclick: function(p)
	{
		var rubrik={
			CAT_ID: App.get('combo#marches_categories').getValue(),
			TITLE: App.get('textfield#TMarcheNom').getValue(),
			_DESC: App.get('textfield#TMarcheDescription').getValue(),
			PRICE: App.get('textfield#TMarchePrix').getValue()
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
		App.get('grid#GridMarches').getStore().load();
	},
	marchesmod_onshow: function(p)
	{
		App.get('combo#marches_categories').setValue(p.rubrik.CAT_ID);
		App.get('textfield#TMarcheNom').setValue(p.rubrik.TITLE);
		App.get('textfield#TMarcheDescription').setValue(p.rubrik._DESC);
		App.get('textfield#TMarchePrix').setValue(p.rubrik.PRICE);
	},
	MainGrid_menu: function( p, record, item, index, e )
	{
		e.stopEvent();
		new Ext.menu.Menu({
			items: [{
				itemId: 'MnuFactureDuplicate',
				text: 'Dupliquer la facture'
			},{
				itemId: 'MnuFactureDelete',
				text: 'Supprimer la facture'
			}]
		}).showAt(e.xy);
	},
	facture_duplicate: function(p) {
		var o={
			ID: p.up('window').facture.idfacture,
			n: App.get('numberfield#duplicate_number').getValue()
		};
		App.Factures.duplicate(o,function(err,r) {
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
			App.Factures.del(sel.selected.items[0].data.idfacture,function(err,result) {
				App.notify("La facture a été supprimée");
				App.get('grid#MainGrid').getStore().load();
			});
		}
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
					this.doMarchesDelete;
					break;
			};
		};		
	},
	doMarchesDelete: function(p)
	{
		var sel=App.get('grid#MainGrid').getSelectionModel();
		if (sel.selected.items.length>0) {
			App.Marches.del(sel.selected.items[0].data.ID,function(err,result) {
				App.notify("Le marché a été supprimé");
				App.get('grid#MainGrid').getStore().load();
			});
		}
		
	},
	facture_onShow: function(p)
	{	
		
		var cat=App.get('grid#MainGrid').getStore().getProxy().extraParams.id;
		App.get('combo#cbo_marche').getStore().getProxy().extraParams.cat=cat;
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
			App.get('combo#cbo_marche').setValue(p.facture.marche);
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
		console.log(data);
		if (p.up('window').facture) {
			// update
			data.id=p.up('window').facture.idfacture;
			console.log(data);
			App.Factures.update(data,function(err,result) {
				App.get('grid#MainGrid').getStore().load();
			});
		} else {
			// create
			App.Factures.insert(data,function(err,result) {
				App.get('grid#MainGrid').getStore().load();
			});			
		};
		p.up('window').close();
	},
	open_facture: function(p, record, item, index, e)
	{
		App.view.create('main.VFacture',{
			modal: true,
			facture: record.data
		}).show();
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
		/*App.get('combo#cbo_marche').getStore().getProxy().extraParams.cat=d.id;
		App.get('combo#cbo_marche').getStore().load();*/
	},
	onLoad: function()
	{
		Auth.login(function(user) {
			
		});
	},
	doMarchesDelete: function()
	{
		alert('bonjour');
	},
	grid_onclick: function( p, record, item, index )
	{
		App.view.create('main.VFacture',{
			modal: true,
			facture: record.data
		}).show();
	}
		
});
