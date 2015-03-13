Infocentre = {
	getBase: function(o, cb) {
		var db=Infocentre.using('db');		
		//console.log(o);
		db.model('infocentre2015', db.sql('infocentre_getBase',{ID: o.ID, CAT: o.CAT}), cb);
	},
	// --------------------------------------------------------------------
	getBaseFact: function(o, cb) {
		var db=Infocentre.using('db');		
		db.model('infocentre2015', db.sql('infocentre_getBaseFact',{ID: o.ID}), cb);
	},
	// --------------------------------------------------------------------
	setBaseFact: function(data,cb) {
		var db=Infocentre.using('db');	
		//console.log('o.ID_demande:'+o.ID_demande);
		//console.log('o.facture:'+o.facture);
		var tab=[];		
		for (var i=0;i<data.length;i++) tab.push(data[i].ID_demande);	
		var sql='UPDATE base SET facture = "'+data[0].facture+'" WHERE base.ID_demande in ('+tab.join(',')+')';
		//console.log(sql);
		db.query('infocentre2015',sql ,cb);
	},
	// --------------------------------------------------------------------
	getNatureAll: function(cb) {
		var db=Infocentre.using('db');		
		db.model('infocentre2015', db.sql('infocentre_getNatureAll'), cb);
	},
}

module.exports = Infocentre;
