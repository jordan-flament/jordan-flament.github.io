<!--

# 🤖Réalisation de la partie convoyage d'une ligne d'embouteillage de bidon d'huile

Le but de ce projet est de réaliser la gestion du convoyage entre les différentes machines de la ligne, et gérer les échanges d'informations entre l'automate et les machines.

Il a été développé en 6 jours au total comprenant :

 * 1 jour de réalisation de l'analyse fonctionnelle
 * 3 jours de développement du programme et de l'IHM
 * 1 jour d'essais
 * 1 jour de mise en service chez le client

Ce projet a été géré avec le matériel suivant :

* Un automate S7-1200 de chez Siemens
* Une *Interface Homme-Machine* (IHM) unified de chez Siemens
* 3 variateurs de vitesse ATV-320 de chez Schneider pilotés en Profinet par l'automate

### ⚙️ Le processus de production

Pour bien comprendre le rôle des convoyeurs, voici le parcours précis d'un bidon d'huile tout au long de cette ligne :

1. **💧 Le remplissage :** Le cycle débute par la remplisseuse, qui dose et injecte l'huile dans les bidons vides en entrée de ligne.
2. **🔥 Le thermoscellage :** Les bidons passent ensuite dans une thermocelleuse. Cette machine chauffe et dépose une opercule pour garantir la parfaite étanchéité du produit.
3. **🏷️ L'étiquetage :** Arrivée dans l'étiqueteuse, où l'habillage visuel du bidon et les codes-barres de traçabilité sont appliqués.
4. **📦 L'encaissage :** Enfin, la ligne s'achève par une encaisseuse qui regroupe et range proprement les bidons dans des cartons, prêts pour la zone de stockage.

Voici un aperçu 3D de la ligne :

<img src="../images/LigneYacco.png" alt="3D de la ligne" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">

Sur ce projet nous gérons tous les cas possibles comme un moteur HS, des bourrages suites à un arrêt d'une machine etc... Evidemment, afin de pouvoir dépanner au plus vite, chaque problème est remonté grâce à une alarme IHM qui permet un diagnostique rapide.

La ligne est entièrement configurable grâce à l'*Interface Homme-Machine*, comme :

* La mise en service 
* Le changement de mode :
    * Manuel
    * Automatique
* La vitesse des convoyeurs
* L'acquittement et le diagnosique de la machine
* La visualisation en temps réel du process

<div style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 30px;">

  <div style="flex: 1; min-width: 250px; text-align: center;">
    <img src="../images/yacco/armoire.jpg" alt="Armoire électrique" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <p style="margin-top: 10px; font-style: italic; opacity: 0.8; font-size: 0.9em;">L'armoire électrique</p>
  </div>

  <div style="flex: 1; min-width: 250px; text-align: center;">
    <img src="../images/yacco/ihm.jpg" alt="IHM Unified" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <p style="margin-top: 10px; font-style: italic; opacity: 0.8; font-size: 0.9em;">Interface Homme-Machine (IHM)</p>
  </div>

</div>

[Retour à l'accueil](index.md)

-->

# 🤖 Convoyage d'une ligne d'embouteillage de bidons d'huile

<div style="background: rgba(64, 153, 255, 0.05); padding: 20px; border-radius: 8px; border-left: 4px solid #4099ff; margin-bottom: 30px;">
  <strong>🎯 Objectif du projet :</strong> Assurer la gestion globale du convoyage entre les différentes machines de la ligne et piloter les échanges d'informations entre l'automate central et les équipements.
</div>

<div style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 40px;">
  <div style="flex: 1; min-width: 250px; background: rgba(0, 0, 0, 0.02); padding: 20px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.05);">
    <h3 style="margin-top: 0; color: rgba(20, 96, 210, 0.97); font-size: 1.1em;">⏱️ Déroulement (6 Jours)</h3>
    <ul style="margin-bottom: 0; padding-left: 20px;">
      <li style="margin-bottom: 5px;"><strong>1 jour :</strong> Analyse fonctionnelle</li>
      <li style="margin-bottom: 5px;"><strong>3 jours :</strong> Développement (Prog & IHM)</li>
      <li style="margin-bottom: 5px;"><strong>1 jour :</strong> Essais en atelier</li>
      <li style="margin-bottom: 0;"><strong>1 jour :</strong> Mise en service chez le client</li>
    </ul>
  </div>

  <div style="flex: 1; min-width: 250px; background: rgba(0, 0, 0, 0.02); padding: 20px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.05);">
    <h3 style="margin-top: 0; color: rgba(20, 96, 210, 0.97); font-size: 1.1em;">🛠️ Matériel Utilisé</h3>
    <ul style="margin-bottom: 0; padding-left: 20px;">
      <li style="margin-bottom: 5px;">Automate <strong>Siemens S7-1200</strong></li>
      <li style="margin-bottom: 5px;">Écran <strong>IHM Unified Siemens</strong></li>
      <li style="margin-bottom: 5px;">3x Variateurs <strong>Schneider ATV-320</strong></li>
      <li style="margin-bottom: 0;"><em>Réseau industriel Profinet</em></li>
    </ul>
  </div>
</div>

### ⚙️ Le processus de production

Pour bien comprendre le rôle des convoyeurs, voici le parcours précis d'un bidon d'huile tout au long de cette ligne :

1. **💧 Le remplissage :** Le cycle débute par la remplisseuse, qui dose et injecte l'huile dans les bidons vides en entrée de ligne.
2. **🔥 Le thermoscellage :** Les bidons passent ensuite dans une thermocelleuse. Cette machine chauffe et dépose une opercule pour garantir la parfaite étanchéité du produit.
3. **🏷️ L'étiquetage :** Arrivée dans l'étiqueteuse, où l'habillage visuel du bidon et les codes-barres de traçabilité sont appliqués.
4. **📦 L'encaissage :** Enfin, la ligne s'achève par une encaisseuse qui regroupe et range proprement les bidons dans des cartons, prêts pour la zone de stockage.

<div style="text-align: center; margin: 40px 0;">
  <img src="../images/LigneYacco.png" alt="Aperçu 3D de la ligne" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <p style="margin-top: 10px; font-style: italic; opacity: 0.8; font-size: 0.9em;">Aperçu 3D de la ligne complète</p>
</div>

<div style="background: rgba(0, 200, 83, 0.05); padding: 20px; border-radius: 8px; border-left: 4px solid #00c853; margin-bottom: 40px;">
  <h3 style="margin-top: 0; color: #00c853; font-size: 1.2em;">🛡️ Sécurité, Diagnostic & Supervision</h3>
  <p style="margin-bottom: 15px;">Sur ce projet, nous gérons tous les aléas possibles (défaut moteur, bourrages suite à l'arrêt d'une machine, etc.). Pour dépanner au plus vite, chaque anomalie remonte sous forme d'alarme sur l'IHM, permettant un <strong>diagnostic immédiat</strong>.</p>
  <p style="margin-bottom: 10px;">La ligne est entièrement configurable depuis l'Interface Homme-Machine :</p>
  <ul style="margin-bottom: 0; padding-left: 20px;">
    <li>Aide à la mise en service</li>
    <li>Changement de modes (Manuel / Automatique)</li>
    <li>Réglage de la vitesse des convoyeurs</li>
    <li>Acquittement et diagnostic matériel</li>
    <li>Visualisation du process en temps réel</li>
  </ul>
</div>

<div style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 40px;">
  <div style="flex: 1; min-width: 250px; text-align: center;">
    <img src="../images/yacco/armoire.jpg" alt="Armoire électrique" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <p style="margin-top: 10px; font-style: italic; opacity: 0.8; font-size: 0.9em;">L'armoire électrique</p>
  </div>
  <div style="flex: 1; min-width: 250px; text-align: center;">
    <img src="../images/yacco/ihm.jpg" alt="IHM Unified" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
    <p style="margin-top: 10px; font-style: italic; opacity: 0.8; font-size: 0.9em;">Interface Homme-Machine (IHM)</p>
  </div>
</div>

<div style="margin-top: 40px;">
  <a href="../#mes-projets" style="background-color: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #4099ff; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: bold;">
    ⬅️ Retour à l'accueil
  </a>
</div>