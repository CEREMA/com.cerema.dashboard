/*
 *
 *    Marchés
 *    v1.00 
 *
 */

Marches = {
	getAll: function(o,cb) {
		var db=Marches.using('db');	
		db.model('dashboard','SELECT * FROM business WHERE CAT_ID='+o.cat+' and YEAR='+o.year,cb);
	},
	update: function(o,cb) {
		var db=Marches.using('db');
		db.post('dashboard','business',o,cb);
	},
	del: function(o,cb) {
		var db=Marches.using('db');
		db.del('dashboard','business',o,cb);	
	}
};

module.exports = Marches;