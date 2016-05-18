App = {
	init: function(app,server) {
		app.post('/',app.UPLOAD.any(),function(req,res,next) {
			App.upload.up(req,res);
		});
		app.get('/docs/*',function(req,res) {
			var ff=req.originalUrl.split('/docs/')[1];
			App.using('db').query('dashboard','select * from docs where docId="'+ff+'"',function(err,response) {
				if (response.length>0) {
					if (response[0]._blob=="") {
						res.end('Aucun document lié.');
					} else {
                        App.file.reader(response[0],res);
					}
				} else App.upload.reader(ff,res);
            });
        });
	}
};

module.exports = App;