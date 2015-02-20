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
				itemclick: "grid_onclick"
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
			}
		});
		
		App.init('VMain',this.onLoad);
		
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
	facture_onShow: function()
	{
		console.log(App.get('facture panel#test'));
		var cp = new Ext.picker.Color({
			value: '993300',  
			renderTo: App.get('facture panel#test')
		});		
		var cat=App.get('grid#MainGrid').getStore().getProxy().extraParams.id;
		App.get('combo#cbo_marche').getStore().getProxy().extraParams.cat=cat;
		App.get('combo#cbo_marche').getStore().load();
	},
	onMarchesClose: function()
	{
		App.get('marches').close();
	},
	onFactureClose: function()
	{
		App.get('facture').close();
	},
	open_facture: function()
	{
		App.view.create('main.VFacture',{
			modal: true
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
		console.log(record);
		App.view.create('main.VFacture',{modal: true}).show();
	}
		
});
