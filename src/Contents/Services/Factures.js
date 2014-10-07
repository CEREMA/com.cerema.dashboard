/*
 *
 *    Factures
 *    v1.00 
 *
 */

Factures = {
	get: function(o,cb) {
		var db=Factures.using('db');		
		db.model('dashboard',db.sql('factures_get',{ID: o.id}),cb);
	}
};

module.exports = Factures;