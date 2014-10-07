/*
 *
 *    GM
 *    v1.00 
 *
 */

GM = {
	getAll: function(o,cb) {
		var db=GM.using('db');		
		db.model('dashboard','SELECT * FROM codegm order by code',cb);
	}
};

module.exports = GM;