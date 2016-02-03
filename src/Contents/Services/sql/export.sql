SELECT 	factures.id idfacture,
		factures.prestation,
		factures.reference,
		factures.gim,
		factures.etiquette,
		factures.echeance,
		factures.engagement,
		business.TITLE marche_title,
		factures.numda,
		factures.montant_prev,
		factures.ej,
		factures.nofacture,
		factures.montant_facture,
		factures.date_facture,
		factures.date_servicefait,
		factures.date_chorus,
		factures.commentaire,
		factures.marche,
		factures.immonet,
		business._DESC,
		business.PRICE,
		categories.LIBELLE,
		factures._BLOB,
		factures.cloture,
		factures.BES
		FROM    (   
			(   business business
				JOIN
					categories categories
				ON (business.CAT_ID = categories.ID))
				JOIN
					factures factures
				ON (factures.marche = business.ID))		
