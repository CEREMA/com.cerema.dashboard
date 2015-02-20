App = {
	init: function(app,server) {
		app.use('/tmp',server.static(__dirname + require('path').sep+'tmp'));		
		app.post('/upload',function(req,res) {
			App.upload.up(req,res);
		});
	}
};

module.exports = App;