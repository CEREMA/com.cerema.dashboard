/*
 *
 *    Categories
 *    v1.00 
 *
 */

Categories = {
	getAll: function(cb) {
		Categories.using('db').model('dashboard','SELECT id,libelle FROM categories',cb);
	}
};

module.exports = Categories;