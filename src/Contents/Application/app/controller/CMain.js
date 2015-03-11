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
			}
		});
		
		App.init('VMain',this.onLoad);
		
	},
	rubrik_close_onclick: function(p)
	{
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
					this.doMarchesDelete();
					break;
			};
		};		
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
	},
	onLoad: function()
	{
		Auth.login(function(user) {
			App.profils.get(user.uid,function(r) {
				if (r.length==0) {
					document.getElementsByTagName('body')[0].innerHTML='<table width=100% height=100%><tr><td width=100% height=100% align=center valign=middle><img src="data:image/png;base64,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"/></td></tr></table>';
					//alert("Vous n'avez pas accès à l'application.");
				}
			});
		});
	},
	doMarchesDelete: function()
	{
		var sel=App.get('grid#GridMarches').getSelectionModel();
		console.log(sel);
		if (sel.selected.items.length>0) {
			App.Marches.del(sel.selected.items[0].data.ID,function(err,result) {
				App.notify("Le marché a été supprimé");
				App.get('grid#GridMarches').getStore().load();
			});
		}
	},
	grid_onclick: function( p, record, item, index )
	{
		App.view.create('main.VFacture',{
			modal: true,
			facture: record.data
		}).show();
	}
		
});
