/*									O B J E T	P E R S O N N A G E
=========================================================================================================================
*/

// Création de l'objet personnage
var Personnage = {
	
	// Initaialisation du personnage
	initPerso: function(nom, sante, force){
		this.nom = nom;
		this.sante = sante;
		this.force = force;
	},
	// Attaque un personnage cible
    attaquer: function (cible) {
        if (this.sante > 0) {
            var degats = this.force;
            console.log(this.nom + " attaque " + cible.nom + " et lui fait " + degats + " points de dégâts");
            cible.sante = cible.sante - degats;
            if (cible.sante > 0) {
                console.log(cible.nom + " a encore " + cible.sante + " points de vie");
            } else {
                cible.sante = 0;
                console.log(cible.nom + " est mort !");
            }
        } else {
            console.log(this.nom + " ne peut pas attaquer : il est mort...");
        }
    }
};

/*										O B J E T	J O U E U R
=========================================================================================================================
*/

//Creation d'un objet Joueur avec Personnage comme prototype
var Joueur = Object.create(Personnage);

//Initialisation du joueur
Joueur.initJoueur = function(nom, sante, force){
	this.initPerso(nom,sante,force);
	this.xp = 0; // expérience de vie du joueur initialisé à 0
};

// Methode renvoyant la description du personnage
Joueur.decrire = function () { 
		var description = this.nom + " a " + this.sante + " de point de vie, " + 
			this.force + " en force et " + this.xp + " point d'experience";
		return description ;
};

// Combat un adversaire
Joueur.combattre = function (adversaire) {
    this.attaquer(adversaire);
    if (adversaire.sante === 0) {
        console.log(this.nom + " a tué " + adversaire.nom + " et gagne " +
            adversaire.valeur + " points d'expérience");
        this.xp += adversaire.valeur;
    }
};

/*									O B J E T	A D V E R S A I R E
=========================================================================================================================
*/

//Cration d'un objet Adversaire avec Personnage comme prototype
var Adversaire = Object.create(Personnage);

//Initialisation de l'adversaire
Adversaire.initAdversaire = function(nom, sante, force, race, valeur){
	this.initPerso(nom, sante, force);
	this.race = race;
	this.valeur = valeur;
};

/*							C R E A T I O N		D E S	P E R S O N N A G E S
=========================================================================================================================
*/

//Les joueurs
var joueur1 = Object.create(Joueur);
joueur1.initJoueur("Lino", 200, 100);

var joueur2 = Object.create(Joueur);
joueur2.initJoueur("Patou", 150, 70);

//les adversaires
var monstre = Object.create(Adversaire);
monstre.initAdversaire("ZogZog", 80, 90, "org", 10);

//=======================================================================================================================
console.log("Bienvenu !!!!!!!!!!!!!!!!!!!!!!!!!!!!");
console.log(joueur1.decrire());
console.log(joueur2.decrire());
console.log("Un affreux monstre arrive : c'est un " + monstre.race + " nommé " + monstre.nom);

monstre.attaquer(joueur1);
monstre.attaquer(joueur2);

joueur1.combattre(monstre);
joueur2.combattre(monstre);

console.log(joueur1.decrire());
console.log(joueur2.decrire());