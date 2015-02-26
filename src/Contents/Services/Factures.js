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
	upload_blob: function(list,ndx,cb)
	{
		if (!list[ndx]) {cb();return;}
		Factures.using('db').query('dashboard','insert into docs VALUES ("'+list[ndx].tmpfilename+'","-1","-1","-1","-1")',function() {
			Factures.using('db').post('dashboard','docs',{
				docId: list[ndx].docId,
				_blob: App.upload.toBase64(list[ndx].tmpfilename),
				filename: list[ndx].filename,
				type: list[ndx].filetype,
				size: list[ndx].filesize
			},function() {
				Factures.upload_blob(list,ndx+1,cb);
			});
		});
	},	
	insert: function(o,cb) {
	
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