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
					db.model('bpclight',"select kuni,libuni from unites",function(err,departements) {
						db.model('bpclight',"select ksub,libsub from subddis",function(err,services) {
							AGENTS=boucle(agents,'kage','NomPre');
							DEPARTEMENTS=boucle(departements,'kuni','libuni');
							SERVICES=boucle(services,'ksub','libsub');
							for (var i=0;i<result.length;i++) {
								var rr=result[i];
								rr.NomPre=AGENTS[rr.agent_beneficiaire];
								rr.LibSub=SERVICES[rr.service];
								rr.LibUni=DEPARTEMENTS[rr.departement];
							};
							result.metaData.fields[result.metaData.fields.length]={
								name: "LibUni",
								type: "string",
								length: "255",
							};
							result.metaData.fields[result.metaData.fields.length]={
								name: "LibSub",
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
				db.model('bpclight',"select kuni,libuni from unites",function(err,departements) {
					db.model('bpclight',"select ksub,libsub from subddis",function(err,services) {
						AGENTS=boucle(agents,'kage','NomPre');
						DEPARTEMENTS=boucle(departements,'kuni','libuni');
						SERVICES=boucle(services,'ksub','libsub');
						for (var i=0;i<result.length;i++) {
							var rr=result[i];
							rr.NomPre=AGENTS[rr.agent_beneficiaire];
							rr.LibSub=SERVICES[rr.service];
							rr.LibUni=DEPARTEMENTS[rr.departement];
						};
						result.metaData.fields[result.metaData.fields.length]={
							name: "LibUni",
							type: "string",
							length: "255",
						};
						result.metaData.fields[result.metaData.fields.length]={
							name: "LibSub",
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
