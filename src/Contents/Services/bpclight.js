Bpclight = {
	
	getAgent: function(o,cb)
	{
		var db=Bpclight.using('db');
		db.model('bpclight','select Kage, concat(Nom," ",Prenom) NomPre from agents where kuni='+o.kuni+' and ksub='+o.ksub+' and Actif=1 order by Nom asc',cb);
	},
		
	getService: function(o,cb)
	{
		var db=Bpclight.using('db');
		db.model('bpclight','select * from subdis where Archive=0 and kuni='+o.id+' order by LibSubC asc',cb);
	},
	getDepartement: function(o,cb)
	{
		var db=Bpclight.using('db');		
		db.model('bpclight','select * from unites where Archive=0 and kuni='+o.id+' order by LibUni asc',cb);
	},
}

module.exports = Bpclight;
