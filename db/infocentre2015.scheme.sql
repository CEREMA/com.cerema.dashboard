CREATE TABLE acteur (
    ID_profil INT(11) NOT NULL,
    ID_agent INT(11) NOT NULL,
    PRIMARY KEY (ID_profil)
) ENGINE=MyISAM COLLATE=utf8_unicode_ci;
CREATE TABLE annee_budgetaire (
    ID_annee_budgetaire INT(4) NOT NULL,
    cle_annee INT(4) NOT NULL,
    cle_budget_actuel FLOAT NOT NULL,
    cle_budget_annuel FLOAT NOT NULL,
    annee_encours TINYINT(1) NOT NULL,
    PRIMARY KEY (ID_annee_budgetaire)
) ENGINE=MyISAM COLLATE=utf8_unicode_ci;
CREATE TABLE avancement (
    ID_avancement INT(4) AUTO_INCREMENT NOT NULL,
    cle_avacement INT(4) NOT NULL,
    libelle_avancement VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    PRIMARY KEY (ID_avancement)
) ENGINE=MyISAM COLLATE=utf8_unicode_ci;
CREATE TABLE base (
    ID_demande INT(11) AUTO_INCREMENT NOT NULL,
    service INT(4) NOT NULL,
    departement INT(4) NOT NULL,
    agent_demandeur INT(4) NOT NULL,
    agent_beneficiaire INT(4) NOT NULL,
    budget_annuel FLOAT NOT NULL,
    budget_actuel FLOAT NOT NULL,
    date_de_demande DATETIME NULL DEFAULT NULL,
    nature INT(4) NOT NULL,
    sous_nature INT(4) NOT NULL,
    evolution INT(4) NOT NULL,
    quantit� TINYINT(4) NOT NULL,
    phasage INT(2) NOT NULL,
    libelle_commande LONGTEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    motivation_demande VARCHAR(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    commentaire_demande LONGTEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
    commentaire_s2i LONGTEXT CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
    etat_s2i INT(2) NOT NULL DEFAULT 0,
    priorite_valide TINYINT(1) NOT NULL DEFAULT -1,
    etape_valide TINYINT(1) NOT NULL DEFAULT -1,
    priorite_niveau INT(2) NOT NULL DEFAULT -1,
    avancement INT(4) NOT NULL DEFAULT 0,
    special TINYINT(1) NOT NULL DEFAULT -1,
    annulation TINYINT(1) NOT NULL DEFAULT -1,
    cloture TINYINT(1) NOT NULL DEFAULT -1,
    annee_budget INT(4) NOT NULL,
    domaine_metier INT(4) NOT NULL,
    date_modif DATETIME NULL DEFAULT NULL,
    livre_valide TINYINT(4) NULL DEFAULT NULL,
    facture INT(11) NULL DEFAULT -1,
    PRIMARY KEY (ID_demande)
) ENGINE=MyISAM COLLATE=utf8_unicode_ci;
CREATE TABLE competences (
    id INT(11) AUTO_INCREMENT NOT NULL,
    id_domaine INT(11) NOT NULL DEFAULT 0,
    libelle VARCHAR(150) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '0',
    PRIMARY KEY (id)
) ENGINE=InnoDB COLLATE=latin1_swedish_ci;
CREATE TABLE docs (
    docId VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT 'NO' NOT NULL,
    _blob LONGTEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    filename VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    type VARCHAR(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    size INT(11) NULL DEFAULT NULL,
    PRIMARY KEY (docId)
) ENGINE=MyISAM COLLATE=latin1_swedish_ci;
CREATE TABLE domaine_metier (
    ID_domaine_metier INT(4) NOT NULL,
    libelle_domaine_metier VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    PRIMARY KEY (ID_domaine_metier)
) ENGINE=MyISAM COLLATE=utf8_unicode_ci;
CREATE TABLE evolution (
    ID_evolution INT(4) AUTO_INCREMENT NOT NULL,
    libelle_evolution VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    PRIMARY KEY (ID_evolution)
) ENGINE=MyISAM COLLATE=utf8_unicode_ci;
CREATE TABLE nature (
    ID_nature INT(4) AUTO_INCREMENT NOT NULL,
    ID_domaine_metier INT(4) NOT NULL,
    libelle_nature VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    PRIMARY KEY (ID_nature, ID_domaine_metier)
) ENGINE=MyISAM COLLATE=utf8_unicode_ci;
CREATE TABLE priorite (
    ID_priorite TINYINT(4) NOT NULL,
    libelle_priorite VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    PRIMARY KEY (ID_priorite)
) ENGINE=MyISAM COLLATE=utf8_unicode_ci;
CREATE TABLE profil (
    ID_profil INT(4) NOT NULL AUTO_INCREMENT,
    type_profil INT(4) NOT NULL,
    libelle_profil VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    INDEX ID_profil (ID_profil)
) ENGINE=MyISAM COLLATE=utf8_unicode_ci;
CREATE TABLE rayon (
    id INT(11) AUTO_INCREMENT NOT NULL,
    id_domaine INT(11) NOT NULL DEFAULT 0,
    rayon VARCHAR(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '0',
    PRIMARY KEY (id)
) ENGINE=InnoDB COLLATE=latin1_swedish_ci;
CREATE TABLE sous_nature (
    ID_sous_nature INT(4) AUTO_INCREMENT NOT NULL,
    ID_nature INT(4) NOT NULL,
    libelle_sous_nature VARCHAR(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
    prix_sous_nature FLOAT NOT NULL DEFAULT 0,
    INDEX ID_sous_nature (ID_sous_nature),
    PRIMARY KEY (ID_sous_nature, ID_nature)
) ENGINE=MyISAM COLLATE=utf8_unicode_ci;
CREATE TABLE states (
    id INT(11) NULL DEFAULT NULL,
    value VARCHAR(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    total INT(11) NULL DEFAULT NULL
) ENGINE=InnoDB COLLATE=latin1_swedish_ci;
CREATE TABLE ticket (
    id INT(11) AUTO_INCREMENT NOT NULL,
    agent INT(11) NOT NULL,
    agent_nom VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT '0',
    agent_departement VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT '0',
    agent_departement_id INT(11) NULL DEFAULT 0,
    agent_service_id INT(11) NULL DEFAULT 0,
    agent_service VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT '0',
    titre VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '0',
    demande LONGTEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
    date_depot DATETIME NOT NULL,
    date_attrib DATETIME NULL DEFAULT NULL,
    competence INT(11) NULL DEFAULT NULL,
    competence_display VARCHAR(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    attrib INT(11) NULL DEFAULT NULL,
    attrib_nom VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    sur_site TINYINT(4) NULL DEFAULT NULL,
    state INT(11) NOT NULL,
    _BLOB LONGTEXT CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB COLLATE=latin1_swedish_ci;
CREATE TABLE users (
    id_agent INT(11) NULL DEFAULT NULL,
    nom_agent VARCHAR(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
    id_domaine INT(11) NULL DEFAULT NULL,
    id_rayon INT(11) NULL DEFAULT NULL,
    valid_rayon INT(11) NULL DEFAULT NULL
) ENGINE=InnoDB COLLATE=latin1_swedish_ci;
