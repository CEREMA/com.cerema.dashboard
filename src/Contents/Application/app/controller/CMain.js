App.controller.define('CMain', {

	views: [
		"VMain",
		"main.VMarches",
		"main.VFacture"
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
				itemdblclick: "grid_onclick"
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
				itemclick: "GridMarches_onclick",
				itemcontextmenu: "GridMarches_menu"
			},
			"button#Facture_close": {
				click: "onFactureClose"
			},
			"button#TMarcheClose": {
				click: "onMarchesClose"
			},
			"button": {
				toggle: function(p,press) {
					
				}
			},
			"facture": {
				show: "facture_onShow"
			},
			"facture>button#MnuMarchesDelete": {
				click: function()
				{
					alert('sddfsklj');
				}
			},
			"marches>button TMarcheNew": {
				click: function() {
					alert('tic');
				}
			},
			"TShowDoc button#Exit": {
                click: "button_exit_onclick"
            },
			"uploadfilemanager#up": {
				itemdblclick: "up_onclick"
			}
		});
		
		App.init('VMain',this.onLoad);
		
	},
	button_exit_onclick: function(p) {
		p.up('window').close();
	},
	up_onclick: function(p, record)
	{
		console.log(record);
		App.view.create('VShowDoc', {
			modal: true,
			title: record.data.filename,
			pid: record.data.docId
		}).show().center();		
	},
	Menu_onClick: function()
	{
		if (p.itemId) {
			switch (p.itemId) 
			{
				case "MnuMarchesDelete":
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
			var color=p.facture.etiquette;
			if (color=="FF9900") App.get('button#borange').toggle(true);
			if (color=="000000") App.get('button#bblack').toggle(true);
			if (color=="FF0000") App.get('button#bred').toggle(true);
			if (color=="99CC00") App.get('button#bgreen').toggle(true);			
			if (color=="C0C0C0") App.get('button#bgrey').toggle(true);
			App.get('textfield#ej').setValue(p.facture.ej);
			App.get('textfield#prestation').setValue(p.facture.prestation);
			App.get('numberfield#montant_prev').setValue(p.facture.montant_prev);
			App.get('numberfield#montant_facture').setValue(p.facture.montant_facture);
			App.get('textfield#reference').setValue(p.facture.reference);
			App.get('combo#cbo_marche').setValue(p.facture.marche);
			App.get('datefield#echeance').setValue(p.facture.echeance);
			App.get('datefield#date_facture').setValue(p.facture.date_facture);
			App.get('datefield#date_servicefait').setValue(p.facture.date_servicefait);
			App.get('datefield#date_chorus').setValue(p.facture.date_chorus);
			App.get('textfield#nofacture').setValue(p.facture.nofacture);
			App.get('textarea#commentaire').setValue(p.facture.commentaire);
			App.Docs.get(p.facture.DOC,function(err,row){
				App.get('uploadfilemanager#up').setFiles(row.result.data);
			});
		};
		console.log(p.facture);
	},
	onMarchesClose: function()
	{
		App.get('marches').close();
	},
	onFactureClose: function()
	{
		App.get('facture').close();
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
	GridMarches_onclick: function()
	{

	},
	cbo_marches_select: function(p, records)
	{
		var grid=App.get('grid#GridMarches');
		var form=App.get('form#TFormMarche');
		grid.getStore().getProxy().extraParams.cat=records[0].data.id;
		grid.getStore().load();
		form.getForm().reset();
		form.getComponent(0).setValue(records[0].data.id);
	},
	open_marches: function()
	{
		App.view.create('main.VMarches',{
			modal:true
		}).show();
	},
	cbo_cat_select: function(p, records, eOpts)
	{
		var d=records[0].data;
		var grid=App.get('grid#MainGrid');
		grid.getStore().getProxy().extraParams.id=d.id;
		grid.getStore().load();
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
