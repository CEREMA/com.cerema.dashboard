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
		var sql='UPDATE base SET facture = "'+data[0].facture+'", livre_valide = 0 WHERE base.ID_demande in ('+tab.join(',')+')';
		//console.log(sql);
		db.query('infocentre2015',sql ,cb);
	},
	// --------------------------------------------------------------------
	setBaseLivre: function(o,cb) {
		var db=Infocentre.using('db');	
		//console.log('o.ID_demande:'+o.ID_demande);
		//console.log('o.facture:'+o.facture);
		var sql='UPDATE base SET livre_valide = "'+o.coche+'" WHERE base.ID_demande = "'+o.bes+'"';
		//console.log(sql);
		db.query('infocentre2015',sql ,cb);
	},
	// --------------------------------------------------------------------
	setBaseAv: function(o,cb) {
		var db=Infocentre.using('db');	
		//console.log('o.ID_demande:'+o.ID_demande);
		//console.log('o.facture:'+o.facture);
		//var tab=[];		
		//for (var i=0;i<o.data.length;i++) tab.push(data[i].ID_demande);	
		var sql='UPDATE base SET avancement = "'+o.avanc+'" WHERE base.ID_demande in ('+o.data.join(',')+')';
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
