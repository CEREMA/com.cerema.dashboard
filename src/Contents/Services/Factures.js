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
	},
	insert: function(o,cb) {
	
	},
	update: function(o,cb) {
		Factures.using('db').post('dashboard','factures',o,function(r){
			if (o._BLOB) {
				AO.upload_blob(o._BLOB,0,function() {
					cb(r);
				});
			} else cb(r);
		});	
	}
};

module.exports = Factures;