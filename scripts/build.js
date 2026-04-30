const fs = require('fs');
const path = require('path');

// Chemins vers le dossier des quiz et le fichier JSON de sortie
const quizzesDir = path.join(__dirname, '../quizzes');
const outputFile = path.join(__dirname, '../available-days.json');

let unlockedDays = [];

// On vérifie que le dossier existe
if (fs.existsSync(quizzesDir)) {
    // On lit tous les fichiers dans le dossier /quizzes
    const files = fs.readdirSync(quizzesDir);
    
    files.forEach(file => {
        // On cherche les fichiers qui s'appellent "jourX.html" (ex: jour4.html)
        const match = file.match(/^jour(\d+)\.html$/);
        if (match) {
            unlockedDays.push(parseInt(match[1])); // On ajoute le numéro (ex: 4) à la liste
        }
    });
}

// On trie les jours par ordre croissant (1, 2, 3, 4...)
unlockedDays.sort((a, b) => a - b);

// On génère le fichier JSON à la racine du projet
fs.writeFileSync(outputFile, JSON.stringify(unlockedDays));

console.log(`✅ Netlify Build : Fichier généré avec succès ! Jours débloqués : ${unlockedDays.join(', ')}`);
