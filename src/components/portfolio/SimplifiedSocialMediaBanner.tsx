import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Globe, Github } from 'lucide-react';

interface SocialMedia {
  nom: string;
  url: string;
  icone: string;
  pseudo?: string;
}

interface SimplifiedSocialMediaBannerProps {
  reseaux: SocialMedia[];
  onChange: (reseaux: SocialMedia[]) => void;
}

const socialPlatforms = [
  {
    name: 'Facebook',
    icon: Facebook,
    baseUrl: 'https://facebook.com/',
    placeholder: 'votre.nom',
    color: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    baseUrl: 'https://instagram.com/',
    placeholder: 'votre_nom',
    color: 'bg-pink-600 hover:bg-pink-700'
  },
  {
    name: 'X (Twitter)',
    icon: Twitter,
    baseUrl: 'https://x.com/',
    placeholder: 'votre_nom',
    color: 'bg-black hover:bg-gray-800'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    baseUrl: 'https://linkedin.com/in/',
    placeholder: 'votre-nom',
    color: 'bg-blue-700 hover:bg-blue-800'
  },
  {
    name: 'GitHub',
    icon: Github,
    baseUrl: 'https://github.com/',
    placeholder: 'votre-username',
    color: 'bg-gray-800 hover:bg-gray-900'
  },
  {
    name: 'Site Web',
    icon: Globe,
    baseUrl: 'https://',
    placeholder: 'www.votre-site.com',
    color: 'bg-green-600 hover:bg-green-700'
  }
];

export function SimplifiedSocialMediaBanner({ reseaux, onChange }: SimplifiedSocialMediaBannerProps) {
  const toggleSocial = (platformName: string) => {
    const existingIndex = reseaux.findIndex(s => s.nom === platformName);
    
    if (existingIndex >= 0) {
      // Supprimer le réseau social
      const newReseaux = reseaux.filter((_, i) => i !== existingIndex);
      onChange(newReseaux);
    } else {
      // Ajouter le réseau social
      const platform = socialPlatforms.find(p => p.name === platformName);
      if (platform) {
        onChange([...reseaux, { 
          nom: platformName, 
          url: platform.baseUrl,
          icone: '',
          pseudo: ''
        }]);
      }
    }
  };

  const updateSocialPseudo = (platformName: string, pseudo: string) => {
    const platform = socialPlatforms.find(p => p.name === platformName);
    if (!platform) return;

    const newReseaux = reseaux.map(reseau => {
      if (reseau.nom === platformName) {
        return {
          ...reseau,
          url: platform.baseUrl + pseudo,
          pseudo: pseudo
        };
      }
      return reseau;
    });
    onChange(newReseaux);
  };

  const getSocialPseudo = (platformName: string): string => {
    const reseau = reseaux.find(s => s.nom === platformName);
    const platform = socialPlatforms.find(p => p.name === platformName);
    
    if (!reseau || !platform) return '';
    
    return reseau.url.replace(platform.baseUrl, '');
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700">
        Réseaux sociaux (sélection simplifiée)
      </label>
      
      {/* Banderole de sélection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {socialPlatforms.map((platform) => {
          const Icon = platform.icon;
          const isSelected = reseaux.some(s => s.nom === platform.name);
          
          return (
            <button
              key={platform.name}
              type="button"
              onClick={() => toggleSocial(platform.name)}
              className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
                isSelected 
                  ? `${platform.color} text-white shadow-lg` 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{platform.name}</span>
            </button>
          );
        })}
      </div>

      {/* Champs de saisie pour les réseaux sélectionnés */}
      {reseaux.length > 0 && (
        <div className="space-y-3 mt-6">
          <h4 className="text-sm font-medium text-gray-700">Configurez vos réseaux sociaux :</h4>
          {reseaux.map((reseau) => {
            const platform = socialPlatforms.find(p => p.name === reseau.nom);
            if (!platform) return null;

            const Icon = platform.icon;
            
            return (
              <div key={reseau.nom} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded ${platform.color.split(' ')[0]} text-white`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    {reseau.nom}
                  </label>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-1 font-mono bg-gray-100 px-2 py-1 rounded-l border border-r-0">
                      {platform.baseUrl}
                    </span>
                    <input
                      type="text"
                      value={getSocialPseudo(reseau.nom)}
                      onChange={(e) => updateSocialPseudo(reseau.nom, e.target.value)}
                      placeholder={platform.placeholder}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-r focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    URL finale : <span className="font-mono">{reseau.url}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700">
          💡 <strong>Astuce :</strong> Sélectionnez vos réseaux sociaux et entrez simplement votre nom d'utilisateur. L'URL complète sera générée automatiquement !
        </p>
      </div>
    </div>
  );
}