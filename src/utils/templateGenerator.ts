import { TemplateType } from '../components/TemplateSelector';
import { CustomizationOptions } from '../components/CustomizationMenu';
import { getTemplateStyles } from './templateStyles';

interface RestaurantData {
  nom: string;
  accroche: string;
  banniere_url: string;
  images: string[];
  adresse: string;
  maps_url: string;
  telephone: string;
  horaires: string;
  socials: Array<{ nom: string; url: string; }>;
  customization?: string;
  customCSS?: string;
  template?: TemplateType;
  darkMode?: boolean;
  aiCustomizationEnabled?: boolean;
  customizationOptions?: CustomizationOptions;
  menuCards?: Array<{ type: 'pdf' | 'image'; url: string; title: string; }>;
}

export function generateHTML(data: RestaurantData): string {
  const template = data.template || 'simple';
  const darkMode = data.darkMode || false;
  const aiEnabled = data.aiCustomizationEnabled || false;
  
  // Si le menu de personnalisation est activé, on utilise les options sélectionnées
  const styles = aiEnabled && data.customizationOptions 
    ? getCustomStyles(data.customizationOptions) 
    : getTemplateStyles(template, darkMode);
  
  // Générer du CSS personnalisé basé sur les options du menu
  const customCSS = aiEnabled && data.customizationOptions 
    ? generateMenuBasedCSS(data.customizationOptions) 
    : '';
  
  const htmlTemplate = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{nom}}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  ${getMenuFontImports(data.customizationOptions)}
  ${styles.fontImport}
  <style>
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      font-family: ${styles.bodyFont};
      background: ${styles.backgroundColor};
      color: ${styles.textColor};
      line-height: 1.6;
    }
    
    .title-section {
      text-align: center;
      padding: 3rem 1rem 2rem;
      background: ${styles.headerBackground};
      position: relative;
      overflow: hidden;
    }
    
    .title-section h1 {
      font-family: ${styles.titleFont};
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 700;
      margin: 0;
      color: ${styles.primaryColor};
      text-shadow: 0 2px 4px ${styles.primaryColor}20;
      position: relative;
      z-index: 1;
      ${styles.titleAnimation}
    }
    
    .hero {
      background: url('{{banniere_url}}') center/cover no-repeat;
      height: 70vh;
      position: relative;
      overflow: hidden;
    }
    
    .hero::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${styles.heroOverlay};
      pointer-events: none;
    }
    
    .tagline {
      text-align: center;
      font-size: 1.3rem;
      font-weight: 500;
      color: ${styles.secondaryColor};
      margin: 2rem auto;
      max-width: 700px;
      padding: 2rem 1rem;
      background: ${styles.taglineBackground};
      border-radius: 15px;
      border: 2px solid ${styles.accentColor}40;
      box-shadow: 0 4px 15px ${styles.primaryColor}20;
      backdrop-filter: blur(10px);
      ${styles.taglineAnimation}
    }
    
    .gallery-section {
      background: ${styles.sectionBackground};
      padding: 4rem 2rem;
      margin: 3rem 0;
      position: relative;
    }
    
    .gallery-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, ${styles.accentColor}, transparent);
    }
    
    .gallery-section::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, ${styles.accentColor}, transparent);
    }
    
    .gallery-title {
      font-family: ${styles.titleFont};
      font-size: 2.5rem;
      font-weight: 600;
      text-align: center;
      color: ${styles.primaryColor};
      margin-bottom: 2rem;
      text-shadow: 0 2px 4px ${styles.primaryColor}20;
    }
    
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .gallery img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 15px;
      box-shadow: 0 8px 25px ${styles.primaryColor}30;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: 3px solid ${styles.accentColor}40;
      ${styles.imageAnimation}
    }
    
    .gallery img:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 15px 35px ${styles.primaryColor}40;
    }
    
    .menu-cards-link {
      text-align: center;
      margin: 2rem 0;
    }
    
    .menu-cards-link a {
      color: ${styles.textColor};
      text-decoration: underline;
      font-size: 1rem;
      cursor: pointer;
      transition: color 0.3s ease;
    }
    
    .menu-cards-link a:hover {
      color: ${styles.primaryColor};
    }
    
    .menu-cards-section {
      background: ${styles.sectionBackground};
      padding: 3rem 2rem;
      margin: 2rem 0;
      border-radius: 15px;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
      display: none;
      position: relative;
    }
    
    .menu-cards-section.active {
      display: block;
      animation: slideDown 0.5s ease-out;
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .menu-cards-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, ${styles.accentColor}, transparent);
    }
    
    .menu-cards-section::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, ${styles.accentColor}, transparent);
    }
    
    .menu-cards-title {
      font-family: ${styles.titleFont};
      font-size: 2.5rem;
      font-weight: 600;
      text-align: center;
      color: ${styles.primaryColor};
      margin-bottom: 2rem;
      text-shadow: 0 2px 4px ${styles.primaryColor}20;
    }
    
    .menu-cards-close {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .menu-cards-close button {
      background: none;
      border: none;
      color: ${styles.textColor};
      text-decoration: underline;
      cursor: pointer;
      font-size: 1rem;
      transition: color 0.3s ease;
    }
    
    .menu-cards-close button:hover {
      color: ${styles.primaryColor};
    }
    
    .menu-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .menu-card-item {
      text-align: center;
      background: rgba(255, 255, 255, 0.1);
      padding: 1.5rem;
      border-radius: 15px;
      border: 2px solid ${styles.accentColor}30;
    }
    
    .menu-card-item h3 {
      margin-bottom: 1rem;
      color: ${styles.primaryColor};
      font-family: ${styles.titleFont};
      font-size: 1.5rem;
    }
    
    .menu-card-item img {
      width: 100%;
      max-height: 400px;
      object-fit: contain;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .menu-card-item img:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    }
    
    .menu-card-item iframe {
      width: 100%;
      height: 400px;
      border: none;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }
    
    /* Modal pour l'affichage en plein écran des images */
    .image-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.95);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      padding: 2rem;
      cursor: pointer;
    }
    
    .image-modal.active {
      display: flex;
    }
    
    .image-modal img {
      max-width: 95vw;
      max-height: 95vh;
      object-fit: contain;
      border-radius: 10px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
      cursor: default;
    }
    
    .image-modal-close {
      position: absolute;
      top: 2rem;
      right: 2rem;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      font-size: 1.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      color: #333;
      font-weight: bold;
    }
    
    .image-modal-close:hover {
      background: white;
      transform: scale(1.1);
    }
    
    .image-modal-info {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 1rem 2rem;
      border-radius: 25px;
      font-size: 0.9rem;
      text-align: center;
      backdrop-filter: blur(10px);
    }
    
    .info {
      text-align: center;
      padding: 3rem 2rem;
      background: ${styles.infoBackground};
      margin: 2rem 0;
      border-radius: 20px;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
      border: 2px solid ${styles.accentColor}30;
    }
    
    .info-title {
      font-family: ${styles.titleFont};
      font-size: 2rem;
      font-weight: 600;
      color: ${styles.primaryColor};
      margin-bottom: 2rem;
      text-shadow: 0 2px 4px ${styles.primaryColor}20;
    }
    
    .info p {
      margin: 15px 0;
      font-size: 1.1rem;
      font-weight: 400;
      color: ${styles.textColor};
    }
    
    .info strong {
      color: ${styles.primaryColor};
      font-weight: 600;
    }
    
    .map-container {
      margin: 2.5rem auto;
      max-width: 700px;
      text-align: center;
      padding: 0 1rem;
    }
    
    .map-container iframe {
      width: 100%;
      height: 350px;
      border: 0;
      border-radius: 15px;
      box-shadow: 0 10px 30px ${styles.primaryColor}30;
      border: 3px solid ${styles.accentColor}50;
    }
    
    .socials {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      padding: 0 1rem;
    }
    
    .social-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      text-decoration: none;
      color: white;
      font-weight: 600;
      font-family: ${styles.bodyFont};
      border-radius: 25px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      border: 2px solid rgba(255, 255, 255, 0.2);
      ${styles.socialAnimation}
    }
    
    .social-link:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
      border-color: rgba(255, 255, 255, 0.4);
    }
    
    .social-facebook { 
      background: linear-gradient(135deg, #1877F2, #0d5dbf);
    }
    .social-instagram { 
      background: linear-gradient(135deg, #F56040, #E1306C, #C13584, #833AB4);
    }
    .social-x { 
      background: linear-gradient(135deg, #000000, #333333);
    }
    .social-youtube { 
      background: linear-gradient(135deg, #FF0000, #cc0000);
    }
    .social-linkedin { 
      background: linear-gradient(135deg, #0A66C2, #084d94);
    }
    .social-site-web { 
      background: linear-gradient(135deg, #10B981, #059669);
    }
    
    .social-icon {
      width: 22px;
      height: 22px;
      fill: currentColor;
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
    }
    
    footer {
      text-align: center;
      padding: 3rem 1rem;
      background: ${styles.footerBackground};
      color: ${styles.footerTextColor};
      margin-top: 4rem;
      position: relative;
      overflow: hidden;
    }
    
    footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, ${styles.accentColor}, ${styles.primaryColor}, ${styles.accentColor});
    }
    
    .footer-content p {
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    }
    
    ${styles.additionalCSS}
    
    /* CSS personnalisé généré par le menu - APPLIQUÉ EN DERNIER POUR PRIORITÉ MAXIMALE */
    ${customCSS}
    
    /* Responsive Design */
    @media (max-width: 768px) {
      .title-section {
        padding: 2rem 1rem;
      }
      
      .hero {
        height: 50vh;
      }
      
      .tagline {
        font-size: 1.1rem;
        margin: 1.5rem auto;
        padding: 1.5rem 1rem;
      }
      
      .gallery-section {
        padding: 3rem 1rem;
      }
      
      .gallery {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
      }
      
      .gallery img {
        height: 180px;
      }
      
      .info {
        padding: 2rem 1rem;
        margin: 1.5rem 1rem;
      }
      
      .social-link {
        padding: 10px 16px;
        font-size: 0.9rem;
      }
      
      .socials {
        gap: 10px;
        margin-bottom: 1.5rem;
      }
      
      .menu-cards-section {
        padding: 2rem 1rem;
        margin: 1.5rem 1rem;
      }
      
      .menu-cards-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .menu-card-item {
        padding: 1rem;
      }
      
      .image-modal {
        padding: 1rem;
      }
      
      .image-modal-close {
        top: 1rem;
        right: 1rem;
        width: 40px;
        height: 40px;
        font-size: 1.2rem;
      }
      
      .image-modal-info {
        bottom: 1rem;
        padding: 0.8rem 1.5rem;
        font-size: 0.8rem;
      }
    }
  </style>
</head>
<body>
  <div class="title-section">
    <h1>{{nom}}</h1>
  </div>

  <header class="hero"></header>

  <div class="tagline">
    <p>{{accroche}}</p>
  </div>

  <section class="gallery-section">
    <h2 class="gallery-title">Notre Galerie</h2>
    <div class="gallery">
      {{#images}}
      <img src="{{.}}" alt="photo">
      {{/images}}
    </div>
  </section>

  {{#menuCards}}
  <div class="menu-cards-link">
    <a href="#" onclick="toggleMenuCards(event)">Accéder à la carte</a>
  </div>
  {{/menuCards}}

  <section id="menuCardsSection" class="menu-cards-section">
    <div class="menu-cards-close">
      <button onclick="hideMenuCards()">Masquer la carte</button>
    </div>
    <h2 class="menu-cards-title">Nos Cartes</h2>
    <div class="menu-cards-grid">
      {{#menuCardsContent}}
      <div class="menu-card-item">
        <h3>{{title}}</h3>
        {{#isImage}}
        <img src="{{url}}" alt="{{title}}" loading="lazy" onclick="openImageModal(this, '{{title}}')">
        {{/isImage}}
        {{#isPdf}}
        <iframe src="{{url}}" title="{{title}}"></iframe>
        {{/isPdf}}
      </div>
      {{/menuCardsContent}}
    </div>
  </section>

  <!-- Modal pour l'affichage en plein écran des images -->
  <div id="imageModal" class="image-modal" onclick="closeImageModal()">
    <button class="image-modal-close" onclick="closeImageModal()">&times;</button>
    <img id="modalImage" src="" alt="">
    <div class="image-modal-info">
      <span id="modalImageTitle"></span><br>
      <small>Cliquez n'importe où pour fermer</small>
    </div>
  </div>

  <section class="info">
    <h2 class="info-title">Informations Pratiques</h2>
    <p><strong>Adresse :</strong> {{adresse}}</p>
    
    {{#maps_url}}
    <div class="map-container">
      <iframe src="{{maps_url}}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    {{/maps_url}}
    
    <p><strong>Téléphone :</strong> {{telephone}}</p>
    <p><strong>Horaires :</strong><br>{{horaires}}</p>
  </section>

  <footer>
    <div class="socials">
      {{#socials}}
      <a href="{{url}}" target="_blank" class="social-link social-{{class}}">
        {{#icon}}{{icon}}{{/icon}}
        {{nom}}
      </a>
      {{/socials}}
    </div>
    
    <div class="footer-content">
      <p>Page générée avec ❤️ par <strong>EasyLandingWeb</strong></p>
    </div>
  </footer>

  <script>
    function toggleMenuCards(event) {
      event.preventDefault();
      const section = document.getElementById('menuCardsSection');
      if (section.classList.contains('active')) {
        hideMenuCards();
      } else {
        showMenuCards();
      }
    }
    
    function showMenuCards() {
      const section = document.getElementById('menuCardsSection');
      section.classList.add('active');
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    function hideMenuCards() {
      const section = document.getElementById('menuCardsSection');
      section.classList.remove('active');
    }
    
    // Fonctions pour la modal d'image
    function openImageModal(img, title) {
      event.stopPropagation(); // Empêcher la propagation du clic
      const modal = document.getElementById('imageModal');
      const modalImg = document.getElementById('modalImage');
      const modalTitle = document.getElementById('modalImageTitle');
      
      modal.classList.add('active');
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalTitle.textContent = title;
      
      // Empêcher le scroll du body
      document.body.style.overflow = 'hidden';
    }
    
    function closeImageModal() {
      const modal = document.getElementById('imageModal');
      modal.classList.remove('active');
      
      // Rétablir le scroll du body
      document.body.style.overflow = 'auto';
    }
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeImageModal();
      }
    });
    
    // Empêcher la fermeture quand on clique sur l'image elle-même
    document.getElementById('modalImage').addEventListener('click', function(event) {
      event.stopPropagation();
    });
  </script>
</body>
</html>`;

  // Remplacer les variables simples
  let result = htmlTemplate
    .replace(/{{nom}}/g, escapeHtml(data.nom))
    .replace(/{{accroche}}/g, escapeHtml(data.accroche))
    .replace(/{{banniere_url}}/g, data.banniere_url)
    .replace(/{{adresse}}/g, escapeHtml(data.adresse).replace(/\n/g, '<br>'))
    .replace(/{{telephone}}/g, escapeHtml(data.telephone))
    .replace(/{{horaires}}/g, escapeHtml(data.horaires).replace(/\n/g, '<br>'));

  // Remplacer la section images
  const imagesSection = data.images
    .filter(img => img.trim() !== '') // Filtrer les URLs vides
    .map(img => `      <img src="${img}" alt="photo">`)
    .join('\n');
  
  result = result.replace(
    /{{#images}}[\s\S]*?{{\/images}}/g,
    imagesSection
  );

  // Remplacer la section cartes des menus
  const menuCards = data.menuCards || [];
  const hasMenuCards = menuCards.filter(card => card.url.trim() !== '' && card.title.trim() !== '').length > 0;
  
  if (hasMenuCards) {
    result = result.replace(/{{#menuCards}}[\s\S]*?{{\/menuCards}}/g, `
  <div class="menu-cards-link">
    <a href="#" onclick="toggleMenuCards(event)">Accéder à la carte</a>
  </div>`);

    // Générer le contenu des cartes
    const menuCardsContent = menuCards
      .filter(card => card.url.trim() !== '' && card.title.trim() !== '')
      .map(card => {
        const isImage = card.type === 'image';
        const isPdf = card.type === 'pdf';
        
        return `        <div class="menu-card-item">
          <h3>${escapeHtml(card.title)}</h3>
          ${isImage ? `<img src="${card.url}" alt="${escapeHtml(card.title)}" loading="lazy" onclick="openImageModal(this, '${escapeHtml(card.title)}')">` : ''}
          ${isPdf ? `<iframe src="${card.url}" title="${escapeHtml(card.title)}"></iframe>` : ''}
        </div>`;
      })
      .join('\n');
    
    result = result.replace(/{{#menuCardsContent}}[\s\S]*?{{\/menuCardsContent}}/g, menuCardsContent);
  } else {
    result = result.replace(/{{#menuCards}}[\s\S]*?{{\/menuCards}}/g, '');
    result = result.replace(/{{#menuCardsContent}}[\s\S]*?{{\/menuCardsContent}}/g, '');
  }

  // Remplacer la section Google Maps
  const mapsSection = data.maps_url.trim() !== '' 
    ? `    <div class="map-container">
      <iframe src="${data.maps_url}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>`
    : '';
  
  result = result.replace(
    /{{#maps_url}}[\s\S]*?{{\/maps_url}}/g,
    mapsSection
  );

  // Remplacer la section réseaux sociaux avec icônes
  const socialIcons = {
    'Facebook': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    'Instagram': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
    'X (Twitter)': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    'YouTube': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    'LinkedIn': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    'Site Web': '<svg class="social-icon" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'
  };

  const socialsSection = data.socials
    .filter(social => social.nom.trim() !== '' && social.url.trim() !== '') // Filtrer les entrées vides
    .map(social => {
      const socialClass = social.nom.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const icon = socialIcons[social.nom as keyof typeof socialIcons] || socialIcons['Site Web'];
      
      return `      <a href="${social.url}" target="_blank" class="social-link social-${socialClass}">
        ${icon}
        ${escapeHtml(social.nom)}
      </a>`;
    })
    .join('\n');
  
  result = result.replace(
    /{{#socials}}[\s\S]*?{{\/socials}}/g,
    socialsSection
  );

  return result;
}

// Fonction pour obtenir les imports de polices basés sur le menu
function getMenuFontImports(options?: CustomizationOptions): string {
  if (!options) return '';

  let fontImports = '';

  switch (options.typography) {
    case 'moderne':
      fontImports += '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">\n';
      break;
    case 'elegant':
      fontImports += '<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+Pro:wght@300;400;500;600&display=swap" rel="stylesheet">\n';
      break;
    case 'luxueux':
      fontImports += '<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Cinzel:wght@400;500;600&display=swap" rel="stylesheet">\n';
      break;
    case 'classique':
      fontImports += '<link href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">\n';
      break;
    case 'manuscrite':
      fontImports += '<link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Kalam:wght@300;400;700&family=Caveat:wght@400;500;600;700&display=swap" rel="stylesheet">\n';
      break;
    case 'flottante':
      fontImports += '<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&family=Comfortaa:wght@300;400;500;700&display=swap" rel="stylesheet">\n';
      break;
  }

  return fontImports;
}

// Fonction pour obtenir les styles personnalisés basés sur le menu
function getCustomStyles(options: CustomizationOptions) {
  const colorPalette = getColorPalette(options.color, options.darkMode);
  const typography = getTypography(options.typography);
  
  return {
    fontImport: '', // Géré séparément par getMenuFontImports
    bodyFont: typography.bodyFont,
    titleFont: typography.titleFont,
    backgroundColor: colorPalette.background,
    textColor: colorPalette.text,
    primaryColor: colorPalette.primary,
    secondaryColor: colorPalette.secondary,
    accentColor: colorPalette.accent,
    headerBackground: colorPalette.headerBackground,
    sectionBackground: colorPalette.sectionBackground,
    taglineBackground: colorPalette.taglineBackground,
    infoBackground: colorPalette.infoBackground,
    footerBackground: colorPalette.footerBackground,
    footerTextColor: colorPalette.footerTextColor,
    heroOverlay: colorPalette.heroOverlay,
    titleAnimation: getAnimation(options.animation, 'title'),
    taglineAnimation: getAnimation(options.animation, 'tagline'),
    imageAnimation: getAnimation(options.animation, 'image'),
    socialAnimation: getAnimation(options.animation, 'social'),
    additionalCSS: getAmbianceCSS(options.ambiance)
  };
}

// Fonction pour obtenir la palette de couleurs
function getColorPalette(color: string, darkMode: boolean) {
  const palettes: Record<string, any> = {
    rouge: {
      primary: '#dc2626',
      secondary: '#b91c1c',
      accent: '#f87171',
      background: darkMode ? 'linear-gradient(135deg, #1a0f0f, #2d1b1b)' : 'linear-gradient(135deg, #fef2f2, #fee2e2)',
      headerBackground: darkMode ? '#1a0f0f' : '#fef2f2',
      sectionBackground: darkMode ? '#2d1b1b' : '#fee2e2',
      taglineBackground: darkMode ? 'rgba(26, 15, 15, 0.9)' : 'rgba(254, 242, 242, 0.9)',
      infoBackground: darkMode ? 'rgba(45, 27, 27, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      footerBackground: darkMode ? 'linear-gradient(135deg, #0f0606, #1a0f0f)' : 'linear-gradient(135deg, #7f1d1d, #991b1b)',
      footerTextColor: darkMode ? '#f87171' : '#fef2f2',
      text: darkMode ? '#f87171' : '#7f1d1d',
      heroOverlay: darkMode ? 'linear-gradient(45deg, rgba(220, 38, 38, 0.2) 0%, rgba(185, 28, 28, 0.15) 100%)' : 'linear-gradient(45deg, rgba(220, 38, 38, 0.15) 0%, rgba(185, 28, 28, 0.1) 100%)'
    },
    rose: {
      primary: '#e11d48',
      secondary: '#be185d',
      accent: '#f472b6',
      background: darkMode ? 'linear-gradient(135deg, #1a0f14, #2d1b26)' : 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
      headerBackground: darkMode ? '#1a0f14' : '#fdf2f8',
      sectionBackground: darkMode ? '#2d1b26' : '#fce7f3',
      taglineBackground: darkMode ? 'rgba(26, 15, 20, 0.9)' : 'rgba(253, 242, 248, 0.9)',
      infoBackground: darkMode ? 'rgba(45, 27, 38, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      footerBackground: darkMode ? 'linear-gradient(135deg, #0f0610, #1a0f14)' : 'linear-gradient(135deg, #831843, #9d174d)',
      footerTextColor: darkMode ? '#f472b6' : '#fdf2f8',
      text: darkMode ? '#f472b6' : '#831843',
      heroOverlay: darkMode ? 'linear-gradient(45deg, rgba(225, 29, 72, 0.2) 0%, rgba(190, 24, 93, 0.15) 100%)' : 'linear-gradient(45deg, rgba(225, 29, 72, 0.15) 0%, rgba(190, 24, 93, 0.1) 100%)'
    },
    orange: {
      primary: '#ea580c',
      secondary: '#c2410c',
      accent: '#fb923c',
      background: darkMode ? 'linear-gradient(135deg, #1a1209, #2d2416)' : 'linear-gradient(135deg, #fff7ed, #fed7aa)',
      headerBackground: darkMode ? '#1a1209' : '#fff7ed',
      sectionBackground: darkMode ? '#2d2416' : '#fed7aa',
      taglineBackground: darkMode ? 'rgba(26, 18, 9, 0.9)' : 'rgba(255, 247, 237, 0.9)',
      infoBackground: darkMode ? 'rgba(45, 36, 22, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      footerBackground: darkMode ? 'linear-gradient(135deg, #0f0c06, #1a1209)' : 'linear-gradient(135deg, #9a3412, #c2410c)',
      footerTextColor: darkMode ? '#fb923c' : '#fff7ed',
      text: darkMode ? '#fb923c' : '#9a3412',
      heroOverlay: darkMode ? 'linear-gradient(45deg, rgba(234, 88, 12, 0.2) 0%, rgba(194, 65, 12, 0.15) 100%)' : 'linear-gradient(45deg, rgba(234, 88, 12, 0.15) 0%, rgba(194, 65, 12, 0.1) 100%)'
    },
    jaune: {
      primary: '#d97706',
      secondary: '#b45309',
      accent: '#fbbf24',
      background: darkMode ? 'linear-gradient(135deg, #1a1609, #2d2a16)' : 'linear-gradient(135deg, #fffbeb, #fef3c7)',
      headerBackground: darkMode ? '#1a1609' : '#fffbeb',
      sectionBackground: darkMode ? '#2d2a16' : '#fef3c7',
      taglineBackground: darkMode ? 'rgba(26, 22, 9, 0.9)' : 'rgba(255, 251, 235, 0.9)',
      infoBackground: darkMode ? 'rgba(45, 42, 22, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      footerBackground: darkMode ? 'linear-gradient(135deg, #0f0e06, #1a1609)' : 'linear-gradient(135deg, #92400e, #b45309)',
      footerTextColor: darkMode ? '#fbbf24' : '#fffbeb',
      text: darkMode ? '#fbbf24' : '#92400e',
      heroOverlay: darkMode ? 'linear-gradient(45deg, rgba(217, 119, 6, 0.2) 0%, rgba(180, 83, 9, 0.15) 100%)' : 'linear-gradient(45deg, rgba(217, 119, 6, 0.15) 0%, rgba(180, 83, 9, 0.1) 100%)'
    },
    vert: {
      primary: '#16a34a',
      secondary: '#15803d',
      accent: '#4ade80',
      background: darkMode ? 'linear-gradient(135deg, #0f1a0f, #1b2d1b)' : 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
      headerBackground: darkMode ? '#0f1a0f' : '#f0fdf4',
      sectionBackground: darkMode ? '#1b2d1b' : '#dcfce7',
      taglineBackground: darkMode ? 'rgba(15, 26, 15, 0.9)' : 'rgba(240, 253, 244, 0.9)',
      infoBackground: darkMode ? 'rgba(27, 45, 27, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      footerBackground: darkMode ? 'linear-gradient(135deg, #060f06, #0f1a0f)' : 'linear-gradient(135deg, #14532d, #166534)',
      footerTextColor: darkMode ? '#4ade80' : '#f0fdf4',
      text: darkMode ? '#4ade80' : '#14532d',
      heroOverlay: darkMode ? 'linear-gradient(45deg, rgba(22, 163, 74, 0.2) 0%, rgba(21, 128, 61, 0.15) 100%)' : 'linear-gradient(45deg, rgba(22, 163, 74, 0.15) 0%, rgba(21, 128, 61, 0.1) 100%)'
    },
    bleu: {
      primary: '#2563eb',
      secondary: '#1d4ed8',
      accent: '#60a5fa',
      background: darkMode ? 'linear-gradient(135deg, #0f1419, #1b2d45)' : 'linear-gradient(135deg, #eff6ff, #dbeafe)',
      headerBackground: darkMode ? '#0f1419' : '#eff6ff',
      sectionBackground: darkMode ? '#1b2d45' : '#dbeafe',
      taglineBackground: darkMode ? 'rgba(15, 20, 25, 0.9)' : 'rgba(239, 246, 255, 0.9)',
      infoBackground: darkMode ? 'rgba(27, 45, 69, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      footerBackground: darkMode ? 'linear-gradient(135deg, #06090f, #0f1419)' : 'linear-gradient(135deg, #1e3a8a, #1e40af)',
      footerTextColor: darkMode ? '#60a5fa' : '#eff6ff',
      text: darkMode ? '#60a5fa' : '#1e3a8a',
      heroOverlay: darkMode ? 'linear-gradient(45deg, rgba(37, 99, 235, 0.2) 0%, rgba(29, 78, 216, 0.15) 100%)' : 'linear-gradient(45deg, rgba(37, 99, 235, 0.15) 0%, rgba(29, 78, 216, 0.1) 100%)'
    },
    violet: {
      primary: '#9333ea',
      secondary: '#7c3aed',
      accent: '#a855f7',
      background: darkMode ? 'linear-gradient(135deg, #14091a, #26162d)' : 'linear-gradient(135deg, #faf5ff, #e9d5ff)',
      headerBackground: darkMode ? '#14091a' : '#faf5ff',
      sectionBackground: darkMode ? '#26162d' : '#e9d5ff',
      taglineBackground: darkMode ? 'rgba(20, 9, 26, 0.9)' : 'rgba(250, 245, 255, 0.9)',
      infoBackground: darkMode ? 'rgba(38, 22, 45, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      footerBackground: darkMode ? 'linear-gradient(135deg, #0f060f, #14091a)' : 'linear-gradient(135deg, #581c87, #6b21a8)',
      footerTextColor: darkMode ? '#a855f7' : '#faf5ff',
      text: darkMode ? '#a855f7' : '#581c87',
      heroOverlay: darkMode ? 'linear-gradient(45deg, rgba(147, 51, 234, 0.2) 0%, rgba(124, 58, 237, 0.15) 100%)' : 'linear-gradient(45deg, rgba(147, 51, 234, 0.15) 0%, rgba(124, 58, 237, 0.1) 100%)'
    },
    italie: {
      primary: '#dc2626',
      secondary: '#16a34a',
      accent: '#fbbf24',
      background: darkMode ? 'linear-gradient(135deg, #1a0f0f, #0f1a0f, #1a1609)' : 'linear-gradient(135deg, #fef2f2, #f0fdf4, #fffbeb)',
      headerBackground: darkMode ? '#1a0f0f' : '#fef2f2',
      sectionBackground: darkMode ? '#0f1a0f' : '#f0fdf4',
      taglineBackground: darkMode ? 'rgba(26, 15, 15, 0.9)' : 'rgba(254, 242, 242, 0.9)',
      infoBackground: darkMode ? 'rgba(15, 26, 15, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      footerBackground: darkMode ? 'linear-gradient(135deg, #0f0606, #060f06)' : 'linear-gradient(135deg, #7f1d1d, #14532d)',
      footerTextColor: darkMode ? '#fbbf24' : '#fffbeb',
      text: darkMode ? '#fbbf24' : '#7f1d1d',
      heroOverlay: darkMode ? 'linear-gradient(45deg, rgba(220, 38, 38, 0.2) 0%, rgba(22, 163, 74, 0.15) 50%, rgba(251, 191, 36, 0.2) 100%)' : 'linear-gradient(45deg, rgba(220, 38, 38, 0.15) 0%, rgba(22, 163, 74, 0.1) 50%, rgba(251, 191, 36, 0.15) 100%)'
    },
    france: {
      primary: '#1e40af',
      secondary: '#dc2626',
      accent: '#f8fafc',
      background: darkMode ? 'linear-gradient(135deg, #0f1419, #1a0f0f, #1a1a1a)' : 'linear-gradient(135deg, #eff6ff, #fef2f2, #f8fafc)',
      headerBackground: darkMode ? '#0f1419' : '#eff6ff',
      sectionBackground: darkMode ? '#1a0f0f' : '#fef2f2',
      taglineBackground: darkMode ? 'rgba(15, 20, 25, 0.9)' : 'rgba(239, 246, 255, 0.9)',
      infoBackground: darkMode ? 'rgba(26, 15, 15, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      footerBackground: darkMode ? 'linear-gradient(135deg, #06090f, #0f0606)' : 'linear-gradient(135deg, #1e3a8a, #7f1d1d)',
      footerTextColor: darkMode ? '#f8fafc' : '#f8fafc',
      text: darkMode ? '#f8fafc' : '#1e3a8a',
      heroOverlay: darkMode ? 'linear-gradient(45deg, rgba(30, 64, 175, 0.2) 0%, rgba(220, 38, 38, 0.15) 50%, rgba(248, 250, 252, 0.1) 100%)' : 'linear-gradient(45deg, rgba(30, 64, 175, 0.15) 0%, rgba(220, 38, 38, 0.1) 50%, rgba(248, 250, 252, 0.05) 100%)'
    },
    mexique: {
      primary: '#dc2626',
      secondary: '#b91c1c',
      accent: '#fbbf24',
      background: darkMode ? 'linear-gradient(135deg, #1a0f0f, #1a1609)' : 'linear-gradient(135deg, #fef2f2, #fed7aa, #fef3c7)',
      headerBackground: darkMode ? '#1a0f0f' : '#fef2f2',
      sectionBackground: darkMode ? '#1a1609' : '#fed7aa',
      taglineBackground: darkMode ? 'rgba(26, 15, 15, 0.9)' : 'rgba(254, 242, 242, 0.9)',
      infoBackground: darkMode ? 'rgba(26, 22, 9, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      footerBackground: darkMode ? 'linear-gradient(135deg, #0f0606, #0f0c06)' : 'linear-gradient(135deg, #7f1d1d, #92400e)',
      footerTextColor: darkMode ? '#fbbf24' : '#fef2f2',
      text: darkMode ? '#fbbf24' : '#7f1d1d',
      heroOverlay: darkMode ? 'linear-gradient(45deg, rgba(220, 38, 38, 0.25) 0%, rgba(251, 191, 36, 0.2) 100%)' : 'linear-gradient(45deg, rgba(220, 38, 38, 0.2) 0%, rgba(251, 191, 36, 0.15) 100%)'
    },
    mediterranee: {
      primary: '#0ea5e9',
      secondary: '#0284c7',
      accent: '#38bdf8',
      background: darkMode ? 'linear-gradient(135deg, #0f1419, #1a1a1a)' : 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
      headerBackground: darkMode ? '#0f1419' : '#f0f9ff',
      sectionBackground: darkMode ? '#1a1a1a' : '#e0f2fe',
      taglineBackground: darkMode ? 'rgba(15, 20, 25, 0.9)' : 'rgba(240, 249, 255, 0.9)',
      infoBackground: darkMode ? 'rgba(26, 26, 26, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      footerBackground: darkMode ? 'linear-gradient(135deg, #06090f, #0f0f0f)' : 'linear-gradient(135deg, #0c4a6e, #075985)',
      footerTextColor: darkMode ? '#38bdf8' : '#f0f9ff',
      text: darkMode ? '#38bdf8' : '#0c4a6e',
      heroOverlay: darkMode ? 'linear-gradient(45deg, rgba(14, 165, 233, 0.2) 0%, rgba(2, 132, 199, 0.15) 100%)' : 'linear-gradient(45deg, rgba(14, 165, 233, 0.15) 0%, rgba(2, 132, 199, 0.1) 100%)'
    },
    chaude: {
      primary: '#dc2626',
      secondary: '#ea580c',
      accent: '#d97706',
      background: darkMode ? 'linear-gradient(135deg, #1a0f0f, #1a1209, #1a1609)' : 'linear-gradient(135deg, #fef2f2, #fff7ed, #fffbeb)',
      headerBackground: darkMode ? '#1a0f0f' : '#fef2f2',
      sectionBackground: darkMode ? '#1a1209' : '#fff7ed',
      taglineBackground: darkMode ? 'rgba(26, 15, 15, 0.9)' : 'rgba(254, 242, 242, 0.9)',
      infoBackground: darkMode ? 'rgba(26, 18, 9, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      footerBackground: darkMode ? 'linear-gradient(135deg, #0f0606, #0f0c06)' : 'linear-gradient(135deg, #7f1d1d, #9a3412)',
      footerTextColor: darkMode ? '#d97706' : '#fffbeb',
      text: darkMode ? '#d97706' : '#7f1d1d',
      heroOverlay: darkMode ? 'linear-gradient(45deg, rgba(220, 38, 38, 0.2) 0%, rgba(234, 88, 12, 0.18) 50%, rgba(217, 119, 6, 0.2) 100%)' : 'linear-gradient(45deg, rgba(220, 38, 38, 0.15) 0%, rgba(234, 88, 12, 0.12) 50%, rgba(217, 119, 6, 0.15) 100%)'
    },
    froide: {
      primary: '#2563eb',
      secondary: '#16a34a',
      accent: '#9333ea',
      background: darkMode ? 'linear-gradient(135deg, #0f1419, #0f1a0f, #14091a)' : 'linear-gradient(135deg, #eff6ff, #f0fdf4, #faf5ff)',
      headerBackground: darkMode ? '#0f1419' : '#eff6ff',
      sectionBackground: darkMode ? '#0f1a0f' : '#f0fdf4',
      taglineBackground: darkMode ? 'rgba(15, 20, 25, 0.9)' : 'rgba(239, 246, 255, 0.9)',
      infoBackground: darkMode ? 'rgba(15, 26, 15, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      footerBackground: darkMode ? 'linear-gradient(135deg, #06090f, #060f06)' : 'linear-gradient(135deg, #1e3a8a, #14532d)',
      footerTextColor: darkMode ? '#9333ea' : '#eff6ff',
      text: darkMode ? '#9333ea' : '#1e3a8a',
      heroOverlay: darkMode ? 'linear-gradient(45deg, rgba(37, 99, 235, 0.2) 0%, rgba(22, 163, 74, 0.15) 50%, rgba(147, 51, 234, 0.2) 100%)' : 'linear-gradient(45deg, rgba(37, 99, 235, 0.15) 0%, rgba(22, 163, 74, 0.1) 50%, rgba(147, 51, 234, 0.15) 100%)'
    }
  };

  return palettes[color] || palettes.bleu;
}

// Fonction pour obtenir la typographie
function getTypography(typography: string) {
  const typographies: Record<string, any> = {
    moderne: {
      bodyFont: "'Inter', 'Poppins', system-ui, sans-serif",
      titleFont: "'Poppins', 'Inter', sans-serif"
    },
    elegant: {
      bodyFont: "'Source Sans Pro', system-ui, sans-serif",
      titleFont: "'Playfair Display', serif"
    },
    luxueux: {
      bodyFont: "'Cinzel', serif",
      titleFont: "'Cormorant Garamond', serif"
    },
    classique: {
      bodyFont: "'Lato', system-ui, sans-serif",
      titleFont: "'Crimson Text', serif"
    },
    manuscrite: {
      bodyFont: "'Kalam', cursive",
      titleFont: "'Dancing Script', 'Caveat', cursive"
    },
    flottante: {
      bodyFont: "'Comfortaa', cursive",
      titleFont: "'Quicksand', sans-serif"
    }
  };

  return typographies[typography] || typographies.moderne;
}

// Fonction pour obtenir les animations
function getAnimation(animation: string, element: string) {
  const animations: Record<string, Record<string, string>> = {
    subtile: {
      title: '',
      tagline: '',
      image: '',
      social: ''
    },
    dynamique: {
      title: 'animation: dynamicBounce 2s ease-in-out infinite;',
      tagline: 'animation: dynamicFloat 3s ease-in-out infinite;',
      image: '',
      social: 'animation: dynamicPulse 2s ease-in-out infinite;'
    },
    flottante: {
      title: 'animation: gentleFloat 4s ease-in-out infinite;',
      tagline: 'animation: gentleFloat 5s ease-in-out infinite;',
      image: '',
      social: 'animation: gentleFloat 6s ease-in-out infinite;'
    },
    pulsante: {
      title: 'animation: gentlePulse 3s ease-in-out infinite;',
      tagline: 'animation: gentlePulse 4s ease-in-out infinite;',
      image: '',
      social: 'animation: gentlePulse 2s ease-in-out infinite;'
    },
    lumineuse: {
      title: 'animation: glowEffect 2s ease-in-out infinite alternate;',
      tagline: 'animation: glowEffect 3s ease-in-out infinite alternate;',
      image: '',
      social: 'animation: glowEffect 4s ease-in-out infinite alternate;'
    },
    aucune: {
      title: '',
      tagline: '',
      image: '',
      social: ''
    }
  };

  return animations[animation]?.[element] || '';
}

// Fonction pour obtenir le CSS d'ambiance
function getAmbianceCSS(ambiance: string) {
  const ambianceStyles: Record<string, string> = {
    chaleureuse: `
      /* Ambiance chaleureuse */
      .gallery img {
        border-radius: 20px !important;
        border: 4px solid rgba(255, 255, 255, 0.8) !important;
        box-shadow: 0 15px 35px rgba(0,0,0,0.2) !important;
      }
      
      .tagline, .info {
        background: rgba(255, 255, 255, 0.9) !important;
        border: 2px solid rgba(255,255,255,0.5) !important;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1) !important;
      }
    `,
    elegante: `
      /* Ambiance élégante */
      .title-section h1 {
        letter-spacing: 6px !important;
        text-transform: uppercase !important;
        font-weight: 300 !important;
      }
      
      .gallery img {
        border-radius: 0 !important;
        filter: grayscale(30%) contrast(1.1) !important;
        border: 1px solid rgba(0,0,0,0.1) !important;
      }
      
      .gallery img:hover {
        filter: grayscale(0%) contrast(1.2) !important;
      }
      
      .tagline, .info {
        border: 1px solid rgba(0,0,0,0.1) !important;
        backdrop-filter: blur(20px) !important;
      }
    `,
    familiale: `
      /* Ambiance familiale */
      .gallery img {
        border-radius: 15px !important;
        transform: rotate(-1deg) !important;
      }
      
      .gallery img:nth-child(even) {
        transform: rotate(1deg) !important;
      }
      
      .gallery img:hover {
        transform: rotate(0deg) scale(1.05) !important;
      }
      
      .tagline {
        font-style: italic !important;
        transform: rotate(-1deg) !important;
      }
    `,
    moderne: `
      /* Ambiance moderne */
      .gallery img {
        border-radius: 25px !important;
        box-shadow: 0 25px 50px rgba(0,0,0,0.15) !important;
        border: none !important;
      }
      
      .info, .tagline {
        border-radius: 25px !important;
        backdrop-filter: blur(20px) !important;
        border: 1px solid rgba(255,255,255,0.2) !important;
      }
      
      .title-section h1 {
        background: linear-gradient(45deg, var(--ai-primary, #3b82f6), var(--ai-accent, #60a5fa)) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
      }
    `,
    rustique: `
      /* Ambiance rustique */
      .gallery img {
        border-radius: 10px !important;
        border: 3px solid #8b4513 !important;
        box-shadow: 0 8px 20px rgba(139, 69, 19, 0.3) !important;
      }
      
      .tagline, .info {
        background: rgba(245, 245, 220, 0.9) !important;
        border: 2px solid #8b4513 !important;
        border-radius: 10px !important;
      }
      
      .title-section h1 {
        text-shadow: 3px 3px 0px #8b4513 !important;
      }
    `,
    luxueuse: `
      /* Ambiance luxueuse */
      .title-section h1 {
        font-weight: 300 !important;
        letter-spacing: 8px !important;
        text-transform: uppercase !important;
      }
      
      .gallery img {
        border-radius: 0 !important;
        border: 1px solid #ffd700 !important;
        filter: sepia(10%) contrast(1.1) !important;
      }
      
      .gallery img:hover {
        border-color: #ffd700 !important;
        box-shadow: 0 0 30px rgba(255, 215, 0, 0.5) !important;
      }
      
      .social-link:hover {
        box-shadow: 0 0 25px #ffd700 !important;
        border-color: #ffd700 !important;
      }
    `,
    romantique: `
      /* Ambiance romantique */
      .gallery img {
        border-radius: 50% !important;
        border: 4px solid rgba(255, 192, 203, 0.8) !important;
      }
      
      .tagline {
        font-style: italic !important;
        background: rgba(255, 240, 245, 0.9) !important;
        border: 2px solid rgba(255, 192, 203, 0.5) !important;
      }
      
      .title-section h1 {
        color: #ff69b4 !important;
        text-shadow: 0 0 20px rgba(255, 105, 180, 0.5) !important;
      }
    `,
    festive: `
      /* Ambiance festive */
      .title-section h1 {
        animation: festiveGlow 1s ease-in-out infinite alternate !important;
      }
      
      .gallery img {
        border: 3px solid #ff6347 !important;
        transform: rotate(-2deg) !important;
      }
      
      .gallery img:nth-child(even) {
        transform: rotate(2deg) !important;
      }
      
      .gallery img:hover {
        transform: rotate(0deg) scale(1.1) !important;
        border-color: #ffd700 !important;
      }
      
      .social-link {
        animation: festiveBounce 2s ease-in-out infinite !important;
      }
    `
  };

  return ambianceStyles[ambiance] || '';
}

// Fonction pour générer le CSS basé sur le menu
function generateMenuBasedCSS(options: CustomizationOptions): string {
  let css = '\n/* 🎨 PERSONNALISATION PAR MENU - SYSTÈME FIABLE */\n';

  // Animations keyframes
  css += `
@keyframes dynamicBounce {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-10px) scale(1.02); }
}

@keyframes dynamicFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

@keyframes dynamicPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes gentleFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

@keyframes gentlePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

@keyframes glowEffect {
  0% { text-shadow: 0 0 10px currentColor; }
  100% { text-shadow: 0 0 30px currentColor, 0 0 40px currentColor; }
}

@keyframes festiveGlow {
  0% { text-shadow: 0 0 10px #ff6347; }
  100% { text-shadow: 0 0 30px #ffd700, 0 0 40px #ff6347; }
}

@keyframes festiveBounce {
  0%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.05) rotate(1deg); }
  75% { transform: scale(1.05) rotate(-1deg); }
}
`;

  // Styles spécifiques à la typographie manuscrite
  if (options.typography === 'manuscrite') {
    css += `
/* Style manuscrite spécialisé */
.title-section h1 {
  font-family: 'Dancing Script', cursive !important;
  font-weight: 700 !important;
  font-size: clamp(3.5rem, 8vw, 7rem) !important;
  transform: rotate(-3deg) !important;
  text-shadow: 4px 4px 8px rgba(0,0,0,0.4) !important;
  letter-spacing: 3px !important;
  line-height: 1.1 !important;
}

.info-title, .gallery-title {
  font-family: 'Caveat', cursive !important;
  font-weight: 700 !important;
  transform: rotate(-1.5deg) !important;
  font-size: 3rem !important;
  text-shadow: 3px 3px 6px rgba(0,0,0,0.3) !important;
}

.tagline p {
  font-family: 'Kalam', cursive !important;
  font-style: italic !important;
  transform: rotate(1deg) !important;
  font-size: 1.6rem !important;
  line-height: 1.7 !important;
}
`;
  }

  // Styles spécifiques aux couleurs vives (Mexique)
  if (options.color === 'mexique') {
    css += `
/* Style mexicain spécialisé */
.title-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(220, 38, 38, 0.1) 10px,
    rgba(220, 38, 38, 0.1) 20px,
    transparent 20px,
    transparent 30px,
    rgba(251, 191, 36, 0.1) 30px,
    rgba(251, 191, 36, 0.1) 40px
  );
  pointer-events: none;
}

.gallery img {
  border: 3px solid #fbbf24 !important;
  transform: rotate(-2deg) !important;
}

.gallery img:nth-child(even) {
  transform: rotate(2deg) !important;
}

.gallery img:hover {
  transform: rotate(0deg) scale(1.08) !important;
  border-color: #dc2626 !important;
}
`;
  }

  return css;
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function downloadHTML(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}