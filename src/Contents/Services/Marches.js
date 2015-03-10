/*
 *
 *    Marchés
 *    v1.00 
 *
 */

Marches = {
	getAll: function(o,cb) {
		var db=Marches.using('db');		
		db.model('dashboard','SELECT * FROM business WHERE CAT_ID='+o.cat,cb);
	},
	update: function(o,cb) {
		var db=Marches.using('db');
		db.post('dashboard','business',o,cb);
	}
};

module.exports = Marches;