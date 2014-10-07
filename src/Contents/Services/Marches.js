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
	}
};

module.exports = Marches;