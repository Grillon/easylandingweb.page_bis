import { PortfolioTemplateType } from '../components/portfolio/PortfolioTemplateSelector';

export interface PortfolioTemplateStyles {
  fontImport: string;
  bodyFont: string;
  titleFont: string;
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  headerBackground: string;
  sectionBackground: string;
  cardBackground: string;
  footerBackground: string;
  footerTextColor: string;
  heroOverlay: string;
  titleAnimation: string;
  cardAnimation: string;
  additionalCSS: string;
}

export function getPortfolioTemplateStyles(template: PortfolioTemplateType, darkMode: boolean = false): PortfolioTemplateStyles {
  const baseStyles = getBasePortfolioTemplateStyles(template);
  
  if (darkMode) {
    return applyPortfolioDarkMode(baseStyles, template);
  }
  
  return baseStyles;
}

function getBasePortfolioTemplateStyles(template: PortfolioTemplateType): PortfolioTemplateStyles {
  switch (template) {
    case 'creative':
      return {
        fontImport: '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Dancing+Script:wght@400;500;600&display=swap" rel="stylesheet">',
        bodyFont: "'Poppins', system-ui, sans-serif",
        titleFont: "'Dancing Script', cursive",
        backgroundColor: '#faf5ff',
        textColor: '#2d1b69',
        primaryColor: '#7c3aed',
        secondaryColor: '#a855f7',
        accentColor: '#e11d48',
        headerBackground: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #e11d48 100%)',
        sectionBackground: '#faf5ff',
        cardBackground: 'rgba(255, 255, 255, 0.8)',
        footerBackground: 'linear-gradient(135deg, #2d1b69 0%, #7c3aed 100%)',
        footerTextColor: '#faf5ff',
        heroOverlay: 'linear-gradient(45deg, rgba(124, 58, 237, 0.1) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(225, 29, 72, 0.1) 100%)',
        titleAnimation: 'animation: creativeFloat 3s ease-in-out infinite;',
        cardAnimation: 'animation: creativePulse 4s ease-in-out infinite;',
        additionalCSS: `
          @keyframes creativeFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
          }
          
          @keyframes creativePulse {
            0%, 100% { transform: scale(1); box-shadow: 0 4px 20px rgba(124, 58, 237, 0.2); }
            50% { transform: scale(1.02); box-shadow: 0 8px 30px rgba(124, 58, 237, 0.3); }
          }
          
          .creative-gradient {
            background: linear-gradient(45deg, #7c3aed, #a855f7, #e11d48);
            background-size: 200% 200%;
            animation: gradientShift 4s ease infinite;
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .media-container {
            border-radius: 20px !important;
            overflow: hidden;
            border: 3px solid rgba(124, 58, 237, 0.3);
            box-shadow: 0 10px 30px rgba(124, 58, 237, 0.2);
          }
          
          .media-container:hover {
            transform: rotate(-2deg) scale(1.05);
            box-shadow: 0 15px 40px rgba(124, 58, 237, 0.3);
          }
        `
      };

    case 'minimal':
      return {
        fontImport: '<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&family=Roboto+Slab:wght@400;500&display=swap" rel="stylesheet">',
        bodyFont: "'Roboto', system-ui, sans-serif",
        titleFont: "'Roboto Slab', serif",
        backgroundColor: '#f9fafb',
        textColor: '#374151', // Texte sombre sur fond clair
        primaryColor: '#6b7280',
        secondaryColor: '#9ca3af',
        accentColor: '#1f2937',
        headerBackground: '#f9fafb',
        sectionBackground: '#f9fafb',
        cardBackground: 'rgba(255, 255, 255, 0.9)',
        footerBackground: '#f3f4f6',
        footerTextColor: '#374151', // Texte sombre sur footer clair
        heroOverlay: 'linear-gradient(45deg, rgba(107, 114, 128, 0.05) 0%, rgba(156, 163, 175, 0.03) 100%)',
        titleAnimation: '',
        cardAnimation: '',
        additionalCSS: `
          /* Style minimaliste - Mode clair */
          body {
            font-weight: 300;
            letter-spacing: 0.3px;
            line-height: 1.7;
            color: #374151 !important; /* Force le texte sombre */
          }
          
          .minimal-header {
            padding: 6rem 2rem 4rem !important;
            background: #f9fafb !important;
            border-bottom: 1px solid rgba(107, 114, 128, 0.1);
            color: #374151 !important; /* Texte sombre sur header clair */
          }
          
          .minimal-header h1 {
            font-weight: 400 !important;
            letter-spacing: 2px !important;
            text-transform: uppercase;
            font-size: 2.5rem !important;
            color: #374151 !important; /* Titre sombre */
          }
          
          .minimal-section {
            padding: 5rem 2rem !important;
            margin: 0 !important;
            color: #374151 !important; /* Texte sombre dans les sections */
          }
          
          .minimal-card {
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background: rgba(255, 255, 255, 0.9) !important;
            border-bottom: 1px solid rgba(107, 114, 128, 0.1) !important;
            padding: 3rem !important;
            color: #374151 !important; /* Texte sombre dans les cartes */
          }
          
          .minimal-card:hover {
            transform: none !important;
            background: rgba(255, 255, 255, 1) !important;
          }
          
          .media-container {
            border-radius: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
          
          .media-container:hover {
            transform: none !important;
            opacity: 0.8;
          }
          
          .minimal-footer {
            background: #f3f4f6 !important;
            border-top: 1px solid rgba(107, 114, 128, 0.1);
            padding: 4rem 2rem !important;
            color: #374151 !important; /* Texte sombre sur footer clair */
          }
          
          .minimal-social {
            background: transparent !important;
            border: 1px solid rgba(107, 114, 128, 0.3) !important;
            color: #374151 !important; /* Texte sombre sur boutons */
            border-radius: 0 !important;
            padding: 1rem 2rem !important;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 400;
          }
          
          .minimal-social:hover {
            background: #374151 !important;
            color: white !important; /* Texte blanc au hover */
            transform: none !important;
          }
          
          /* Force la couleur du texte partout */
          .minimal-header *, 
          .minimal-section *, 
          .minimal-card *, 
          .minimal-footer * {
            color: inherit !important;
          }
        `
      };

    case 'professional':
    default:
      return {
        fontImport: '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet">',
        bodyFont: "'Inter', system-ui, sans-serif",
        titleFont: "'Merriweather', serif",
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        primaryColor: '#1e40af',
        secondaryColor: '#3b82f6',
        accentColor: '#1d4ed8',
        headerBackground: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        sectionBackground: '#ffffff',
        cardBackground: 'rgba(255, 255, 255, 0.95)',
        footerBackground: 'linear-gradient(135deg, #1f2937 0%, #1e40af 100%)',
        footerTextColor: '#f9fafb',
        heroOverlay: 'linear-gradient(45deg, rgba(30, 64, 175, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
        titleAnimation: '',
        cardAnimation: '',
        additionalCSS: `
          /* Style professionnel */
          .professional-header {
            position: relative;
            overflow: hidden;
          }
          
          .professional-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="professional-pattern" width="20" height="20" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="10" height="10" fill="%23ffffff" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23professional-pattern)"/></svg>');
            pointer-events: none;
          }
          
          .professional-card {
            border: 1px solid rgba(30, 64, 175, 0.1) !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 6px rgba(30, 64, 175, 0.1) !important;
            transition: all 0.3s ease !important;
          }
          
          .professional-card:hover {
            transform: translateY(-4px) !important;
            box-shadow: 0 8px 25px rgba(30, 64, 175, 0.15) !important;
            border-color: rgba(30, 64, 175, 0.2) !important;
          }
          
          .media-container {
            border-radius: 8px !important;
            border: 1px solid rgba(30, 64, 175, 0.1) !important;
            overflow: hidden;
          }
          
          .professional-social {
            background: rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            border-radius: 6px !important;
            font-weight: 500 !important;
            transition: all 0.3s ease !important;
          }
          
          .professional-social:hover {
            background: rgba(255, 255, 255, 0.2) !important;
            transform: translateY(-2px) !important;
          }
        `
      };
  }
}

function applyPortfolioDarkMode(baseStyles: PortfolioTemplateStyles, template: PortfolioTemplateType): PortfolioTemplateStyles {
  switch (template) {
    case 'creative':
      return {
        ...baseStyles,
        backgroundColor: '#0f0f23',
        textColor: '#e2e8f0',
        primaryColor: '#a855f7',
        secondaryColor: '#c084fc',
        accentColor: '#f472b6',
        headerBackground: 'linear-gradient(135deg, #1e1b4b 0%, #7c3aed 50%, #be185d 100%)',
        sectionBackground: '#0f0f23',
        cardBackground: 'rgba(30, 27, 75, 0.8)',
        footerBackground: 'linear-gradient(135deg, #0f0f23 0%, #1e1b4b 100%)',
        footerTextColor: '#e2e8f0'
      };

    case 'minimal':
      return {
        ...baseStyles,
        backgroundColor: '#111827',
        textColor: '#e5e7eb', // Texte clair sur fond sombre
        primaryColor: '#9ca3af',
        secondaryColor: '#d1d5db',
        accentColor: '#f3f4f6',
        headerBackground: '#111827',
        sectionBackground: '#111827',
        cardBackground: 'rgba(31, 41, 55, 0.9)',
        footerBackground: '#0f172a',
        footerTextColor: '#e5e7eb', // Texte clair sur footer sombre
        additionalCSS: `
          /* Style minimaliste - Mode sombre */
          body {
            font-weight: 300;
            letter-spacing: 0.3px;
            line-height: 1.7;
            color: #e5e7eb !important; /* Force le texte clair */
          }
          
          .minimal-header {
            padding: 6rem 2rem 4rem !important;
            background: #111827 !important;
            border-bottom: 1px solid rgba(156, 163, 175, 0.1);
            color: #e5e7eb !important; /* Texte clair sur header sombre */
          }
          
          .minimal-header h1 {
            font-weight: 400 !important;
            letter-spacing: 2px !important;
            text-transform: uppercase;
            font-size: 2.5rem !important;
            color: #e5e7eb !important; /* Titre clair */
          }
          
          .minimal-section {
            padding: 5rem 2rem !important;
            margin: 0 !important;
            color: #e5e7eb !important; /* Texte clair dans les sections */
          }
          
          .minimal-card {
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background: rgba(31, 41, 55, 0.9) !important;
            border-bottom: 1px solid rgba(156, 163, 175, 0.1) !important;
            padding: 3rem !important;
            color: #e5e7eb !important; /* Texte clair dans les cartes */
          }
          
          .minimal-card:hover {
            transform: none !important;
            background: rgba(31, 41, 55, 1) !important;
          }
          
          .media-container {
            border-radius: 0 !important;
            border: none !important;
            box-shadow: none !important;
          }
          
          .media-container:hover {
            transform: none !important;
            opacity: 0.8;
          }
          
          .minimal-footer {
            background: #0f172a !important;
            border-top: 1px solid rgba(156, 163, 175, 0.1);
            padding: 4rem 2rem !important;
            color: #e5e7eb !important; /* Texte clair sur footer sombre */
          }
          
          .minimal-social {
            background: transparent !important;
            border: 1px solid rgba(156, 163, 175, 0.3) !important;
            color: #e5e7eb !important; /* Texte clair sur boutons */
            border-radius: 0 !important;
            padding: 1rem 2rem !important;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 400;
          }
          
          .minimal-social:hover {
            background: #e5e7eb !important;
            color: #111827 !important; /* Texte sombre au hover */
            transform: none !important;
          }
          
          /* Force la couleur du texte partout */
          .minimal-header *, 
          .minimal-section *, 
          .minimal-card *, 
          .minimal-footer * {
            color: inherit !important;
          }
        `
      };

    case 'professional':
    default:
      return {
        ...baseStyles,
        backgroundColor: '#0f172a',
        textColor: '#e2e8f0',
        primaryColor: '#3b82f6',
        secondaryColor: '#60a5fa',
        accentColor: '#93c5fd',
        headerBackground: 'linear-gradient(135deg, #1e293b 0%, #1e40af 100%)',
        sectionBackground: '#0f172a',
        cardBackground: 'rgba(30, 41, 59, 0.95)',
        footerBackground: 'linear-gradient(135deg, #020617 0%, #1e293b 100%)',
        footerTextColor: '#e2e8f0'
      };
  }
}