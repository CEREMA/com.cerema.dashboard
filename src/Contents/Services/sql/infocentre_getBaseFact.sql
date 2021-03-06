select 	ID_demande,
		budget_annuel,
		budget_actuel,
		date_de_demande,
		libelle_nature,
		libelle_sous_nature,
		libelle_evolution,
		agent_beneficiaire,
		departement,
		service,
		quantite,
		libelle_priorite,
		libelle_commande, 
		motivation_demande,
		commentaire_demande,
		commentaire_s2i,
		libelle_avancement,
		libelle_domaine_metier, 
		prix_sous_nature,
		phasage,
		avancement,
		special,
		livre_valide
	from base as ba
	join domaine_metier 		on ID_domaine_metier = domaine_metier
	join nature 				on nature = ID_nature
	join sous_nature 			on sous_nature = ID_sous_nature
	join avancement 			on avancement = ID_avancement
	join evolution 				on evolution = ID_evolution
	join priorite 				on phasage = ID_priorite
	where 	ba.facture = {ID}