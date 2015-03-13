App.view.define('main.VFiltre', 
	{
		extend		: 'Ext.window.Window',
		alias		: 'widget.VFiltre',
		//x:50,
		//y:50,
		//height: 590, //418
		width		: 300,
		//height		: '100%',
		closable	: true,
		draggable	: true,
		resizable	: false,
		closeAction	: 'destroy',
		layout		: 'vbox',
		title			: "Filtre Catégories/Natures",
		tbar: 
		[
			{
				/*xtype: "combo",
				itemId: "cbo_catFiltre",
				store: App.store.create('App.Categories.getAll'),
				margin: 10,
				displayField:'libelle',
				valueField: 'id',	
				typeAhead: true,
				triggerAction: 'all',
				mode: 'remote',
				emptyText:'Sélectionner une catégorie',
				selectOnFocus:true,
				width:260,
				readonly:true,
				editable: false*/
				
				xtype: "combo",
				labelAlign: "top",
				fieldLabel: "Rubrique",
				itemId: "cbo_catFiltre",
				store: App.store.create('App.Categories.getAll'),
				margin: 10,
				displayField:'libelle',
				valueField: 'id',	
				typeAhead: true,
				triggerAction: 'all',
				mode: 'remote',
				emptyText:'Sélectionner une catégorie',
				selectOnFocus:true,
				width:260,
				readonly:true,
				editable: false,
				margin: {
					left:10,
					right:20,
					bottom: 5
				}
			}
		],
		bbar		: 
		[	
			{
				xtype	: "button",
				itemId	: "btnVFiltreAnnuler",
				text	: "Annuler"
			},
			'->',
			{
				xtype	: "button",
				itemId	: "btnVFiltreEnregistrer",
				text	: "Enregistrer"
			}
		],
		items		:
		[
			{
				xtype			: "grid",
				padding			: 5,
				itemId			: "gridFiltre",
				width			: '100%',
				height			: 500,
				columns: [
					{header: "Catégorie", 		width: 150, hidden: true, 	sortable: true, 	dataIndex: 'categorie'},
					{header: "Année", 			width: 150, hidden: true, 	sortable: true, 	dataIndex: 'annee'},
					{header: "Nature", 			width: 200, hidden: false, 	sortable: true, 	dataIndex: 'libelle_nature'},
					{header: "Active", 			width: 76, 	hidden: false, 	sortable: true, 	dataIndex: 'coche', xtype: 'checkcolumn', idItem: 'chkcActFiltre'}
				],
				
				store: App.store.create('App.Filtre.getAll',{
								//autoLoad: true
					})		
			},
			{
				xtype			: "grid",
				padding			: 5,
				itemId			: "gridFiltreAll",
				width			: '100%',
				height			: 200,
				hidden			: true,
				columns: [
					{header: "Catégorie", 		width: 150, hidden: true, 	sortable: true, 	dataIndex: 'categorie'},
					{header: "Année", 			width: 150, hidden: true, 	sortable: true, 	dataIndex: 'annee'},
					{header: "Nature", 			width: 200, hidden: false, 	sortable: true, 	dataIndex: 'libelle_nature'},
					{header: "Active", 			width: 76, 	hidden: false, 	sortable: true, 	dataIndex: 'coche', xtype: 'checkcolumn'}
				],
				
				store: App.store.create('App.Filtre.getAll',{
								//autoLoad: true
					})	
								
			}
		]
		
		//bodyStyle	: 'padding:5px 5px 0',


//====================================
	});