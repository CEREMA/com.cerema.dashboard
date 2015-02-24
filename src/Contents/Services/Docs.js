Docs = {
	get: function(o,cb) {
		Docs.using('db').model('dashboard','select docId tmpfilename,filename,type filetype,size filesize from docs where docId="'+o+'"',cb);
	}
};

module.exports=Docs;