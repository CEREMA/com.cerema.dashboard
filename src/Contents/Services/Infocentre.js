Infocentre = {
	getBase: function(o, cb) {
		function boucle(o,name,n) {
			var tmp={};
			for (var i=0;i<o.data.length;i++) {
				tmp[o.data[i][name]]=o.data[i][n];
			};
			return tmp;
		};
		var db=Infocentre.using('db');		
		//console.log(o);
		db.model('dashboard', "select dashboard.filtre.nature from dashboard.filtre where dashboard.filtre.categorie = "+o.CAT+" and coche = 1 and annee= "+o.YEAR+" ",function(err,r) {
			var nature=[];
			for (var i=0;i<r.data.length;i++) nature.push(r.data[i].nature);
			//console.log('----NATURE---');
			//console.log(nature);
			db.model('infocentre2015',db.sql('infocentre_getBase',{ID: o.ID, NAT: nature}), function(err,result) {
				var AGENTS=[];
				var DEPARTEMENTS=[];
				var SERVICES=[];
				db.model('bpclight',"select kage, concat(Nom,' ',Prenom) NomPre from agents",function(err,agents) {
					db.model('bpclight',"select kuni,libunic from unites",function(err,departements) {
						db.model('bpclight',"select ksub,libsubc from subdis",function(err,services) {
							AGENTS=boucle(agents,'kage','NomPre');
							DEPARTEMENTS=boucle(departements,'kuni','libunic');
							SERVICES=boucle(services,'ksub','libsubc');
							for (var i=0;i<result.data.length;i++) {
								result.data[i].NomPre=AGENTS[result.data[i].agent_beneficiaire];
								result.data[i].LibSubC=SERVICES[result.data[i].service];
								result.data[i].LibUnic=DEPARTEMENTS[result.data[i].departement];
								if (result.data[i].commentaire_s2i=="undefined") result.data[i].commentaire_s2i="";
							};
							result.metaData.fields[result.metaData.fields.length]={
								name: "LibUnic",
								type: "string",
								length: "255",
							};
							result.metaData.fields[result.metaData.fields.length]={
								name: "LibSubC",
								type: "string",
								length: "255",
							};
							result.metaData.fields[result.metaData.fields.length]={
								name: "NomPre",
								type: "string",
								length: "255",
							};
							cb(err,result);
						});
					});
				});
			});
		});
	},
	// --------------------------------------------------------------------
	getBaseFact: function(o, cb) {
		function boucle(o,name,n) {
			var tmp={};
			for (var i=0;i<o.data.length;i++) {
				tmp[o.data[i][name]]=o.data[i][n];
			};
			return tmp;
		};	
		var db=Infocentre.using('db');		
		db.model('infocentre2015', db.sql('infocentre_getBaseFact',{ID: o.ID}), function(err,result) {
			var AGENTS=[];
			var DEPARTEMENTS=[];
			var SERVICES=[];
			db.model('bpclight',"select kage, concat(Nom,' ',Prenom) NomPre from agents",function(err,agents) {
				db.model('bpclight',"select kuni,libunic from unites",function(err,departements) {
					db.model('bpclight',"select ksub,libsubc from subdis",function(err,services) {
						AGENTS=boucle(agents,'kage','NomPre');
						DEPARTEMENTS=boucle(departements,'kuni','libunic');
						SERVICES=boucle(services,'ksub','libsubc');
						for (var i=0;i<result.data.length;i++) {							
							result.data[i].NomPre=AGENTS[result.data[i].agent_beneficiaire];
							result.data[i].LibSubC=SERVICES[result.data[i].service];
							result.data[i].LibUnic=DEPARTEMENTS[result.data[i].departement];
							if (result.data[i].commentaire_s2i=="undefined") result.data[i].commentaire_s2i="";
						};
						result.metaData.fields[result.metaData.fields.length]={
							name: "LibUnic",
							type: "string",
							length: "255",
						};
						result.metaData.fields[result.metaData.fields.length]={
							name: "LibSubC",
							type: "string",
							length: "255",
						};
						result.metaData.fields[result.metaData.fields.length]={
							name: "NomPre",
							type: "string",
							length: "255",
						};
						cb(err,result);
					});
				});
			});
		});		
	},
	// --------------------------------------------------------------------
	setBaseFact: function(data,cb) {
		var db=Infocentre.using('db');	
		//console.log('o.ID_demande:'+o.ID_demande);
		//console.log('o.facture:'+o.facture);
		var tab=[];		
		for (var i=0;i<data.length;i++) tab.push(data[i].ID_demande);	
		var sql='UPDATE base SET facture = "'+data[0].facture+'", livre_valide = 0, base.avancement = "'+data[0].avancement+'" WHERE base.ID_demande in ('+tab.join(',')+')';
		//console.log(sql);
		db.query('infocentre2015',sql ,cb);
	},
	// --------------------------------------------------------------------
	setBaseLivre: function(o,cb) {
		var db=Infocentre.using('db');	
		//console.log('o.ID_demande:'+o.ID_demande);
		//console.log('o.facture:'+o.facture);
		var sql='UPDATE base SET livre_valide = "'+o.coche+'" WHERE base.ID_demande in ('+o.bes.join(',')+')';
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
