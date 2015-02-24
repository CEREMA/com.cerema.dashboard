Docs = {
	get: function(o,cb) {
		Docs.using('db').model('dashboard','select docId,filename,type,size from docs where docId="'+o+'"',cb);
	}
};

module.exports=Docs;