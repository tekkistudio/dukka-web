// vercel-build.js
const fs = require('fs');
const path = require('path');

// On crée un dossier .next vide pour éviter le prérendu
console.log('Creating minimal .next output without SSR...');
fs.mkdirSync('.next', { recursive: true });

// On crée un fichier package.json minimal dans .next
fs.writeFileSync(
  path.join('.next', 'package.json'),
  JSON.stringify({
    name: 'dukka-web-static',
    version: '0.1.0',
    private: true
  })
);

// On crée un fichier HTML minimal pour la page d'accueil
const indexHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dukka - La Meilleure Alternative à Shopify et Woocommerce en Afrique</title>
  <meta name="description" content="Dukka réinvente l'e-commerce pour l'adapter à la réalité africaine, en permettant aux commerçants et marques de créer des boutiques en ligne où la conversation est au cœur de l'expérience d'achat.">
  <link rel="icon" href="/images/logo/fav.png">
  <script>
    // Redirection JavaScript vers l'app client-side
    window.location.href = '/app.html';
  </script>
</head>
<body>
  <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;">
    <div style="width: 50px; height: 50px; border: 5px solid #f3f3f3; border-top: 5px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>
    <p style="margin-top: 20px;">Chargement de Dukka...</p>
  </div>
  <style>
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</body>
</html>
`;

// On crée le fichier d'application client-side
const appHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dukka - La Meilleure Alternative à Shopify et Woocommerce en Afrique</title>
  <meta name="description" content="Dukka réinvente l'e-commerce pour l'adapter à la réalité africaine, en permettant aux commerçants et marques de créer des boutiques en ligne où la conversation est au cœur de l'expérience d'achat.">
  <link rel="icon" href="/images/logo/fav.png">
</head>
<body>
  <div id="root"></div>
  <script src="/_next/static/chunks/main.js"></script>
  <script>
    // Script d'initialisation
    document.addEventListener('DOMContentLoaded', function() {
      // Le code Next.js chargera l'application ici
    });
  </script>
</body>
</html>
`;

// Créer un dossier public s'il n'existe pas déjà
fs.mkdirSync('public', { recursive: true });

// Sauvegarder les fichiers HTML
fs.writeFileSync(path.join('.next', 'index.html'), indexHtml);
fs.writeFileSync(path.join('public', 'app.html'), appHtml);

console.log('Static files created successfully. Skipping Next.js build.');