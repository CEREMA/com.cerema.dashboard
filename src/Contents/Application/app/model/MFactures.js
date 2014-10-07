App.model.define('MFactures', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'idfacture'},
		{name: 'prestation'},
		{name: 'reference'},
		{name: 'marche_title'},
		{name: 'gim'},
		{name: 'etiquette'},
		{name: 'echeance', type: 'date', dateFormat: 'Y-m-d'},
		{name: 'marche'},
		{name: 'numda'},
		{name: 'montant_prev', type: 'number'},
		{name: 'ej'},
		{name: 'nofacture'},
		{name: 'montant_facture', type: 'number'},
		{name: 'date_facture', type: 'date', dateFormat: 'Y-m-d'},
		{name: 'date_servicefait', type: 'date', dateFormat: 'Y-m-d'},
		{name: 'date_chorus', type: 'date', dateFormat: 'Y-m-d'},
		{name: 'commentaire'},
		{name: 'marche'},
		{name: 'DESC'},
		{name: 'PRICE'},
		{name: 'LIBELLE'},
		{name: 'DOC'}
    ]
});
