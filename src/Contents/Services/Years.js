Years = {
	getAll: function(o,cb) {
		var db=Years.using('db');
		db.model('dashboard','select * from annees order by libelle desc',cb);
	}
};

module.exports = Years;