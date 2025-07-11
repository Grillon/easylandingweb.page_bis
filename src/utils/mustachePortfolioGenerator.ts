interface ProjectFile {
  url: string;
  label: string;
  type: 'pdf' | 'video' | 'youtube' | 'image' | 'link';
}

interface MustachePortfolioProject {
  titre: string;
  type: string;
  annee: string;
  stack: string;
  role: string;
  probleme: string;
  solution: string[];
  apprentissage: string[];
  visuel?: string;
  files?: ProjectFile[];
  collapsed?: boolean;
}

interface MustachePortfolioDocument {
  nom: string;
  url: string;
  type?: string;
}

interface MustachePortfolioReseau {
  nom: string;
  url: string;
  icone: string;
  pseudo?: string;
}

interface MustachePortfolioData {
  nom: string;
  about: string;
  aboutl: string;
  galerie: Array<{
    image: string;
    projet: string;
  }>;
  projets: MustachePortfolioProject[];
  documents: MustachePortfolioDocument[];
  reseaux: MustachePortfolioReseau[];
}

// Fonction pour obtenir l'icône SVG d'un réseau social
function getSocialIconSVG(socialName: string): string {
  const icons: Record<string, string> = {
    'LinkedIn': `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>`,
    'GitHub': `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>`,
    'Instagram': `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>`,
    'X (Twitter)': `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>`,
    'YouTube': `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>`,
    'Site Web': `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>`,
    'Facebook': `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>`
  };
  
  return icons[socialName] || icons['Site Web'];
}

// Fonction pour obtenir l'icône de type de fichier
function getFileIcon(type: string): string {
  const icons: Record<string, string> = {
    'pdf': `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
    </svg>`,
    'video': `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z"/>
    </svg>`,
    'youtube': `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>`,
    'image': `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"/>
    </svg>`,
    'link': `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
    </svg>`
  };
  
  return icons[type.toLowerCase()] || icons['link'];
}

// Fonction pour obtenir l'icône de type de document
function getDocumentIcon(type: string): string {
  const extension = type.toLowerCase();
  if (['pdf', 'doc', 'docx'].includes(extension)) return getFileIcon('pdf');
  if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return getFileIcon('image');
  if (['mp4', 'avi', 'mov'].includes(extension)) return getFileIcon('video');
  return getFileIcon('link');
}

function convertYouTubeUrl(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  );
  if (match) {
    return `<iframe class="w-full aspect-video rounded shadow" src="https://www.youtube.com/embed/${match[1]}" frameborder="0" allowfullscreen></iframe>`;
  }
  return `<a href="${url}" target="_blank" class="text-blue-600 underline">${url}</a>`;
}

export function generateMustachePortfolioHTML(data: MustachePortfolioData): string {
  // Générer la galerie à partir des projets qui ont un visuel
  const galerie = data.projets
    .filter(projet => projet.visuel)
    .map(projet => ({
      image: projet.visuel!,
      projet: projet.titre.replace(/\s+/g, '-').toLowerCase()
    }));

  // Classer les documents par type
  const documentsClasses = (data.documents || []).map(doc => {
  let type = doc.type || 'link';

  if (type === 'youtube' && doc.url.includes('youtube.com')) {
    type = 'youtube';
  } else if (!doc.type) {
    const extension = doc.url.split('.').pop()?.toLowerCase() || '';
    if (['pdf', 'doc', 'docx'].includes(extension)) type = 'pdf';
    else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) type = 'image';
    else if (['mp4', 'avi', 'mov'].includes(extension)) type = 'video';
    else type = 'link';
  }

  return {
    ...doc,
    type,
    icon: getDocumentIcon(type)
  };
});


  const template = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio de ${data.nom}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/alpinejs" defer></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary-color: #1e40af;
      --secondary-color: #3b82f6;
      --accent-color: #60a5fa;
      --text-color: #1f2937;
      --bg-color: #ffffff;
      --card-bg: rgba(255, 255, 255, 0.95);
      --border-color: rgba(30, 64, 175, 0.1);
    }
    
    body {
      font-family: 'Inter', system-ui, sans-serif;
      line-height: 1.6;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      color: var(--text-color);
      scroll-behavior: smooth;
    }
    
    h1, h2, h3 {
      font-family: 'Playfair Display', serif;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    .section {
      margin: 4rem 0;
      padding: 3rem 0;
    }
    
    .card {
      background: var(--card-bg);
      border-radius: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 25px rgba(30, 64, 175, 0.1);
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
      overflow: hidden;
    }
    
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(30, 64, 175, 0.15);
    }
    
    .galerie {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }
    
    .galerie img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 0.5rem;
      transition: transform 0.3s ease;
    }
    
    .galerie a:hover img {
      transform: scale(1.05);
    }
    
    .projet {
      margin: 3rem 0;
      padding: 2rem;
      scroll-margin-top: 2rem;
    }
    
    .projet-meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 1.5rem 0;
      padding: 1.5rem;
      background: rgba(30, 64, 175, 0.05);
      border-radius: 0.5rem;
      border-left: 4px solid var(--primary-color);
    }
    
    .projet-meta li {
      list-style: none;
      padding: 0.25rem 0;
    }
    
    .projet-meta strong {
      color: var(--primary-color);
      font-weight: 600;
    }
    
    .solution-list, .apprentissage-list {
      margin: 1rem 0;
      padding-left: 1.5rem;
    }
    
    .solution-list li, .apprentissage-list li {
      margin: 0.5rem 0;
      position: relative;
    }
    
    .solution-list li::before {
      content: "✓";
      color: #10b981;
      font-weight: bold;
      position: absolute;
      left: -1.5rem;
    }
    
    .apprentissage-list li::before {
      content: "💡";
      position: absolute;
      left: -1.5rem;
    }
    
    .projet-visuel {
      margin: 2rem 0;
      text-align: center;
    }
    
    .projet-visuel img {
      max-width: 100%;
      height: auto;
      border-radius: 0.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .files-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
    }
    
    .file-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: var(--card-bg);
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
      text-decoration: none;
      color: inherit;
    }
    
    .file-item:hover {
      background: rgba(30, 64, 175, 0.05);
      transform: translateY(-2px);
    }
    
    .file-icon {
      color: var(--primary-color);
      flex-shrink: 0;
    }
    
    .file-type {
      font-size: 0.75rem;
      color: #6b7280;
      text-transform: uppercase;
      font-weight: 500;
    }
    
    .documents-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
    }
    
    .document-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: var(--card-bg);
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
      text-decoration: none;
      color: inherit;
    }
    
    .document-item:hover {
      background: rgba(30, 64, 175, 0.05);
      transform: translateY(-2px);
    }
    
    .document-icon {
      color: var(--primary-color);
      flex-shrink: 0;
    }
    
    .document-type {
      font-size: 0.75rem;
      color: #6b7280;
      text-transform: uppercase;
      font-weight: 500;
    }
    
    .socials {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;
      margin: 2rem 0;
    }
    
    .social-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--primary-color);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(30, 64, 175, 0.2);
    }
    
    .social-link:hover {
      background: var(--secondary-color);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
    }
    
    .header {
      background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
      color: white;
      padding: 4rem 0;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="10" height="10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
      pointer-events: none;
    }
    
    .header h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      position: relative;
      z-index: 1;
    }
    
    .footer {
      background: #1f2937;
      color: white;
      padding: 3rem 0 2rem;
      text-align: center;
      margin-top: 4rem;
    }
    
    .nav-links {
      position: fixed;
      top: 2rem;
      right: 2rem;
      z-index: 100;
      display: flex;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.95);
      padding: 0.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
    }
    
    .nav-link {
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      text-decoration: none;
      color: var(--text-color);
      font-weight: 500;
      font-size: 0.875rem;
      transition: all 0.3s ease;
    }
    
    .nav-link:hover {
      background: var(--primary-color);
      color: white;
    }
    
    .projects-index {
      position: fixed;
      top: 2rem;
      left: 2rem;
      z-index: 100;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 0.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      max-width: 300px;
      transition: all 0.3s ease;
    }
    
    .projects-index.collapsed {
      width: auto;
    }
    
    .projects-index-header {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: between;
      gap: 0.5rem;
      font-weight: 600;
      color: var(--primary-color);
    }
    
    .projects-index-content {
      padding: 0.5rem;
      max-height: 400px;
      overflow-y: auto;
    }
    
    .project-index-item {
      display: block;
      padding: 0.5rem 0.75rem;
      text-decoration: none;
      color: var(--text-color);
      border-radius: 0.25rem;
      font-size: 0.875rem;
      transition: all 0.3s ease;
      margin-bottom: 0.25rem;
    }
    
    .project-index-item:hover {
      background: var(--primary-color);
      color: white;
    }
    
    .fade-in {
      animation: fadeIn 0.6s ease-in-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @media (max-width: 768px) {
      .header h1 {
        font-size: 2.5rem;
      }
      
      .galerie {
        grid-template-columns: 1fr;
      }
      
      .projet-meta {
        grid-template-columns: 1fr;
      }
      
      .nav-links {
        position: static;
        justify-content: center;
        margin: 1rem;
      }
      
      .projects-index {
        position: static;
        margin: 1rem;
        max-width: none;
      }
      
      .socials {
        gap: 1rem;
      }
      
      .social-link {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }
      
      .files-grid, .documents-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <!-- Navigation flottante -->
  <nav class="nav-links">
    <a href="#aboutl" class="nav-link">A propos</a>
    ${galerie.length > 0 ? '<a href="#galerie" class="nav-link">Galerie</a>' : ''}
    <a href="#projets" class="nav-link">Projets</a>
    ${documentsClasses.length > 0 ? '<a href="#documents" class="nav-link">Documents</a>' : ''}
  </nav>

  <!-- Index des projets pliable (dans la page générée) -->
  ${data.projets.length > 0 ? `
  <div class="projects-index" id="projectsIndex">
    <div class="projects-index-header" onclick="toggleProjectsIndex()">
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
      </svg>
      <span>Projets (${data.projets.length})</span>
      <svg class="w-4 h-4 transition-transform" id="indexChevron" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
      </svg>
    </div>
    <div class="projects-index-content" id="projectsIndexContent">
      ${data.projets.map(projet => `
      <a href="#${projet.titre.replace(/\s+/g, '-').toLowerCase()}" class="project-index-item">
        ${projet.titre || 'Projet sans titre'}
      </a>
      `).join('')}
    </div>
  </div>
  ` : ''}

  <!-- Header -->
  <header class="header">
    <div class="container">
      <h1 class="fade-in">Portfolio de ${data.nom}</h1>
      ${data.about ? `<p class="text-xl opacity-90 mt-4">${data.about}</p>` : ''}
    </div>
  </header>

  <div class="container">
    <section id="aboutl" class="section fade-in">
      <div class="card">
        <div class="projet">
          <h2 class="text-3xl font-bold mb-4 text-center">À propos</h2>
          <p class="text-lg leading-relaxed text-left max-w-prose mx-auto">
            ${data.aboutl}
          </p>
        </div>
      </div>
    </section>
    ${galerie.length > 0 ? `
    <!-- Section Galerie -->
    <section id="galerie" class="section fade-in">
      <h2 class="text-3xl font-bold mb-8 text-center">Mes projets en un coup d'œil</h2>
      <div class="galerie">
        ${galerie.map(item => `
        <div class="card">
          <a href="#${item.projet}">
            <img src="${item.image}" alt="${item.projet}" loading="lazy">
            <div class="p-4">
              <h3 class="font-semibold text-center capitalize">${item.projet.replace(/-/g, ' ')}</h3>
            </div>
          </a>
        </div>
        `).join('')}
      </div>
    </section>
    ` : ''}

    <!-- Section Projets -->
    <section id="projets" class="section fade-in">
      <h2 class="text-3xl font-bold mb-8 text-center">Mes projets</h2>
      ${data.projets.length > 0 ? data.projets.map(projet => `
      <div class="card projet" id="${projet.titre.replace(/\s+/g, '-').toLowerCase()}">
        <h3 class="text-2xl font-bold mb-4">${projet.titre}</h3>
        
        <div class="projet-meta">
          <div><strong>Type :</strong> ${projet.type}</div>
          <div><strong>Année :</strong> ${projet.annee}</div>
          <div><strong>Stack :</strong> ${projet.stack}</div>
          <div><strong>Rôle :</strong> ${projet.role}</div>
        </div>
        
        <div class="mb-4">
          <p><strong class="text-lg">Problème :</strong></p>
          <p class="mt-2">${projet.probleme}</p>
        </div>
        
        ${projet.solution.length > 0 ? `
        <div class="mb-4">
          <p><strong class="text-lg">Solution :</strong></p>
          <ul class="solution-list">
            ${projet.solution.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
        
        ${projet.apprentissage.length > 0 ? `
        <div class="mb-4">
          <p><strong class="text-lg">Ce que j'ai appris :</strong></p>
          <ul class="apprentissage-list">
            ${projet.apprentissage.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
        
        ${projet.visuel ? `
        <div class="projet-visuel">
          <img src="${projet.visuel}" alt="Visuel ${projet.titre}" loading="lazy">
        </div>
        ` : ''}
        
        ${projet.files && projet.files.length > 0 ? `
          <div class="mt-6">
            <p><strong class="text-lg">Fichiers et ressources :</strong></p>
            <div class="files-grid mt-3">
              ${projet.files.map(file => {
                if (file.type === 'youtube') {
                  const match = file.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
                  const videoId = match ? match[1] : '';
                  return `
                    <div class="w-full mb-4">
                      <div class="font-medium mb-1">${file.label}</div>
                      <iframe class="w-full aspect-video rounded shadow"
                        src="https://www.youtube.com/embed/${videoId}"
                        frameborder="0"
                        allowfullscreen>
                      </iframe>
                    </div>`;
                }

                return `
                  <a href="${file.url}" target="_blank" class="file-item">
                    <div class="file-icon">${getFileIcon(file.type)}</div>
                    <div class="flex-1">
                      <div class="font-medium">${file.label}</div>
                      <div class="file-type">${file.type}</div>
                    </div>
                  </a>`;
              }).join('')}
            </div>
          </div>
        ` : ''}
      </div>
      `).join('') : `
      <div class="card projet">
        <div class="text-center py-12">
          <div class="text-6xl mb-4">📝</div>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">Aucun projet ajouté</h3>
          <p class="text-gray-500">Ajoutez vos premiers projets pour les voir apparaître ici.</p>
        </div>
      </div>
      `}
    </section>

    ${documentsClasses.length > 0 ? `
    <!-- Section Documents -->
    <section id="documents" class="section fade-in">
      <div class="card">
        <div class="projet">
          <h2 class="text-3xl font-bold mb-6 text-center">Documents à partager</h2>
          <div class="documents-grid">
            ${documentsClasses.map(doc => {
              if (doc.type === 'youtube' && doc.url.includes('youtube.com/embed/')) {
                return `
                  <div class="w-full mb-4">
                    <iframe class="w-full aspect-video rounded shadow"
                      src="${doc.url}"
                      frameborder="0" allowfullscreen></iframe>
                  </div>`;
              }

              return `
                <a href="${doc.url}" target="_blank" class="document-item">
                  <div class="document-icon">${doc.icon}</div>
                  <div class="flex-1">
                    <div class="font-medium">${doc.nom}</div>
                    <div class="document-type">${doc.type}</div>
                  </div>
                </a>`;
            }).join('')}
          </div>
        </div>
      </div>
    </section>
    ` : ''}
  </div>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      ${data.reseaux.length > 0 ? `
      <div class="socials">
        ${data.reseaux.map(reseau => `
        <a href="${reseau.url}" target="_blank" class="social-link">
          ${getSocialIconSVG(reseau.nom)}
          <span>${reseau.nom}</span>
        </a>
        `).join('')}
      </div>
      ` : ''}
      <div class="mt-8 pt-8 border-t border-gray-600">
        <p class="text-sm opacity-75">Page générée avec ❤️ par EasyLandingWeb</p>
        <p class="text-xs opacity-50 mt-2">© ${new Date().getFullYear()} ${data.nom}. Tous droits réservés.</p>
      </div>
    </div>
  </footer>

  <script>
    // Fonction pour basculer l'index des projets
    function toggleProjectsIndex() {
      const content = document.getElementById('projectsIndexContent');
      const chevron = document.getElementById('indexChevron');
      const index = document.getElementById('projectsIndex');
      
      if (content.style.display === 'none') {
        content.style.display = 'block';
        chevron.style.transform = 'rotate(0deg)';
        index.classList.remove('collapsed');
      } else {
        content.style.display = 'none';
        chevron.style.transform = 'rotate(-90deg)';
        index.classList.add('collapsed');
      }
    }

    // Animation au scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    // Animation immédiate pour le header
    document.querySelector('.header').style.opacity = '1';
    document.querySelector('.header').style.transform = 'translateY(0)';

    // Smooth scroll pour les liens de navigation
    document.querySelectorAll('.nav-link, .project-index-item').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  </script>
</body>
</html>`;

  return template;
}

export function downloadHTML(htmlContent: string, filename: string) {
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}