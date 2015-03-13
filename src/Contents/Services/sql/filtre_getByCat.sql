SELECT 	categorie,
		nature,
		coche,
		libelle_nature
		FROM    filtre
		JOIN 	infocentre2015.nature on nature = ID_nature
		WHERE 	categorie = {ID}