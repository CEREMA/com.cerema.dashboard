/*
 *
 *    Factures
 *    v1.00 
 *
 */

Math.uuid = function() {
	var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var chars = CHARS, uuid = new Array(36), rnd=0, r;
    for (var i = 0; i < 36; i++) {
      if (i==8 || i==13 ||  i==18 || i==23) {
        uuid[i] = '-';
      } else if (i==14) {
        uuid[i] = '4';
      } else {
        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('');
};

Factures = {
    export: function(o,cb)
    {
        var db=Factures.using('db');
        var excelbuilder=Factures.using('msexcel-builder');
        
        var uid=Math.uuid();
        if (!require('fs').existsSync(__dirname+require('path').sep+'tmp')) require('fs').mkdirSync(__dirname+require('path').sep+'tmp');
        var workbook = excelbuilder.createWorkbook(__dirname+require('path').sep+'tmp', uid+'.xlsx');
        var sheet1 = workbook.createSheet('BPCLight', 1500, 1500);
        var conf={};
        var sql=db.sql('export');
        sql+=" WHERE factures.id in ("+o.join(',')+")";
        console.log(sql);
        db.query("dashboard",sql,function(e,tabs) {
            conf.cols=[];
            if (tabs.length==0) {
                cb("-1");
                return;  
            };
            var tab=tabs[0];
            for (var el in tab) {
                conf.cols.push({
                    caption: el,
                    type: "string",
                    width: 50
                });  
            };
            for (var e=0;e<conf.cols.length;e++) {
                sheet1.set(e+1,1,conf.cols[e].caption);
                sheet1.width(e+1, conf.cols[e].width*1);
            };
            for (var i=0;i<tabs.length;i++) {
                var element=tabs[i];
                var k=1;
                var ii=i+2;
                for (var el in element) {
                    if (k<18) {
                        sheet1.set(k, ii, element[el]);								
                    };
                    k++;
                };
            };			
            workbook.save(function(ok){
                if (ok) cb(uid); else cb(-1);
            });

        });        
    },
	get: function(o,cb) {
		var db=Factures.using('db');		
		console.log(db.sql('factures_get',{ID: o.id,YEAR: o.year}));
		db.model('dashboard',db.sql('factures_get',{ID: o.id,YEAR: o.year}),cb);
	},
	duplicateme: function(tab,ndx,cb) {
		var db=Factures.using('db');
		if (ndx<tab.length) {
			tab[ndx].prestation=tab[ndx].prestation;
			db.post('dashboard','factures',tab[ndx],function(err,response) {
				Factures.duplicateme(tab,ndx+1,cb);
			});
		} else cb();
	},
	duplicate: function(o,cb) {
		//console.log('duplicate');
		var db=Factures.using('db');
		//console.log(o);
		db.query('dashboard','select * from factures where id="'+o.ID+'"',function(err,result) {
			//console.log(err);
			//console.log(result);
			if (result.length>0) {
				var r=result[0];
				r._BLOB=[];
				delete r.id;
				//r.engagement='';
				r.immoNET='';
				r.BES=0;
				r.date_servicefait='NULL';
				r.nofacture='NULL';
				r.montant_facture='NULL';
				r.ej='';
				r.date_facture='NULL';
				var tab=[];
				for (var i=0;i<o.n;i++) tab.push(r);
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
		Factures.using('db').post('dashboard','factures',o,function(r,x){
			//console.log(o);
			if (o._BLOB) {
				Factures.upload_blob(o._BLOB,0,function() {
					cb(r);
				});
			} else cb(r);
		});	
	},
	//********************************************************************
	//								RAJOUT
	//********************************************************************
	setBES: function(o,cb) {
		var db=Factures.using('db');
		//console.log(o);	
		//db.query('infocentre2015',sql ,cb);		
		db.query('dashboard',db.sql('factures_setBES',{ID: o.id, BES: o.bes}),cb);
	}
	//********************************************************************
	//********************************************************************
};

module.exports = Factures;