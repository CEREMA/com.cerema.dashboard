/*
 *
 *    Categories
 *    v1.00 
 *
 */

Categories = {
	getAll: function(o,cb) {
		//console.log('SELECT id,libelle FROM categories where YEAR like "%'+o.year+'%"');
		Categories.using('db').model('dashboard','SELECT id,libelle FROM categories where YEAR like "%'+o.year+'%"',cb);
	},
	getAllYears: function(cb) {
		Categories.using('db').model('dashboard','SELECT id,libelle FROM categories',cb);
	}
};

module.exports = Categories;