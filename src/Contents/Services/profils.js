profils= {
	get: function(o,cb)
	{
		var db=profils.using('db');
		db.query('dashboard','select * from profils where profil_kage='+o,cb);
	}
};

module.exports = profils;