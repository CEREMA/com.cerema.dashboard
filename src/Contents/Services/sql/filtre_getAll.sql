SELECT 	categorie,
		nature,
		coche,
		libelle_nature,
		annee
		FROM    filtre
		JOIN 	infocentre2015.nature on nature = ID_nature
		WHERE	annee = {AN}