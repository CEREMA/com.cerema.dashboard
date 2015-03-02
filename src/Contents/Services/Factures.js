/*
 *
 *    Factures
 *    v1.00 
 *
 */

Factures = {
	get: function(o,cb) {
		var db=Factures.using('db');		
		db.model('dashboard',db.sql('factures_get',{ID: o.id}),cb);
	},
	duplicateme: function(tab,ndx,cb) {
		var db=Factures.using('db');
		
		if (ndx<tab.length) {
			console.log('-----------------------------------');
			tab[ndx].prestation=tab[ndx].prestation+' (X'+ndx+')';
			console.log(tab);
			db.post('dashboard','factures',tab[ndx],function(err,response) {
				console.log(err);
				console.log(response);
				Factures.duplicateme(tab,ndx+1,cb);
			});
		} else cb();
	},
	duplicate: function(o,cb) {
		console.log('duplicate');
		var db=Factures.using('db');
		console.log(o);
		db.query('dashboard','select * from factures where id="'+o.ID+'"',function(err,result) {
			console.log(err);
			console.log(result);
			if (result.length>0) {
				var r=result[0];
				delete r._BLOB;
				delete r.id;
				var tab=[];
				for (var i=0;i<o.n;i++) tab.push(r);
				console.log(tab);
				Factures.duplicateme(tab,0,cb);
			}
		});
	},
	upload_blob: function(list,ndx,cb)
	{
		if (!list[ndx]) {cb();return;}
		Factures.using('db').query('dashboard','select docId from docs where docId="'+list[ndx].docId+'"',function(err,result) {
			if (result.length>0) {
				// déjà uploadé
				Factures.upload_blob(list,ndx+1,cb);
			} else {
				Factures.using('db').query('dashboard','insert into docs VALUES ("'+list[ndx].docId+'","-1","-1","-1","-1")',function() {
					Factures.using('db').post('dashboard','docs',{
						docId: list[ndx].docId,
						_blob: App.upload.toBase64(list[ndx].docId),
						filename: list[ndx].filename,
						type: list[ndx].filetype,
						size: list[ndx].filesize
					},function() {
						Factures.upload_blob(list,ndx+1,cb);
					});
				});			
			}
		});
	},	
	insert: function(o,cb) {
		Factures.using('db').post('dashboard','factures',o,function(r){
			if (o._BLOB) {
				Factures.upload_blob(o._BLOB,0,function() {
					cb(r);
				});
			} else cb(r);
		});		
	},
	del: function(o,cb) {
		Factures.using('db').del('dashboard','factures',o,cb);
	},
	update: function(o,cb) {
		Factures.using('db').post('dashboard','factures',o,function(r){
			if (o._BLOB) {
				Factures.upload_blob(o._BLOB,0,function() {
					cb(r);
				});
			} else cb(r);
		});	
	}
};

module.exports = Factures;