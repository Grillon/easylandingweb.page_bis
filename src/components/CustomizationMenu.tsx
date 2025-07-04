import React from 'react';
import { Palette, Type, Sparkles, Heart, Sun, Moon } from 'lucide-react';

export interface CustomizationOptions {
  color: string;
  typography: string;
  animation: string;
  ambiance: string;
  darkMode: boolean;
}

interface CustomizationMenuProps {
  options: CustomizationOptions;
  onChange: (options: CustomizationOptions) => void;
}

const colorOptions = [
  { id: 'rouge', name: 'Rouge', preview: '#dc2626', description: 'Passion et énergie' },
  { id: 'rose', name: 'Rose', preview: '#e11d48', description: 'Douceur et romantisme' },
  { id: 'orange', name: 'Orange', preview: '#ea580c', description: 'Chaleur et convivialité' },
  { id: 'jaune', name: 'Jaune', preview: '#d97706', description: 'Joie et luminosité' },
  { id: 'vert', name: 'Vert', preview: '#16a34a', description: 'Nature et fraîcheur' },
  { id: 'bleu', name: 'Bleu', preview: '#2563eb', description: 'Confiance et sérénité' },
  { id: 'violet', name: 'Violet', preview: '#9333ea', description: 'Créativité et mystère' },
  { id: 'italie', name: 'Italie', preview: 'linear-gradient(45deg, #dc2626, #16a34a, #fbbf24)', description: 'Rouge, vert, jaune' },
  { id: 'france', name: 'France', preview: 'linear-gradient(45deg, #1e40af, #f8fafc, #dc2626)', description: 'Bleu, blanc, rouge' },
  { id: 'mexique', name: 'Mexique', preview: 'linear-gradient(45deg, #dc2626, #fbbf24)', description: 'Rouge et jaune vifs' },
  { id: 'mediterranee', name: 'Méditerranée', preview: 'linear-gradient(45deg, #0ea5e9, #f8fafc)', description: 'Bleu mer et blanc' },
  { id: 'chaude', name: 'Chaude', preview: 'linear-gradient(45deg, #dc2626, #ea580c, #d97706)', description: 'Rouge, orange, jaune' },
  { id: 'froide', name: 'Froide', preview: 'linear-gradient(45deg, #2563eb, #16a34a, #9333ea)', description: 'Bleu, vert, violet' }
];

const typographyOptions = [
  { id: 'moderne', name: 'Moderne', preview: 'Inter, sans-serif', description: 'Clean et contemporain' },
  { id: 'elegant', name: 'Élégant', preview: 'Playfair Display, serif', description: 'Raffiné et sophistiqué' },
  { id: 'luxueux', name: 'Luxueux', preview: 'Cormorant Garamond, serif', description: 'Haut de gamme' },
  { id: 'classique', name: 'Classique', preview: 'Times New Roman, serif', description: 'Traditionnel et intemporel' },
  { id: 'manuscrite', name: 'Manuscrite', preview: 'Dancing Script, cursive', description: 'Personnel et chaleureux' },
  { id: 'flottante', name: 'Flottante', preview: 'Quicksand, sans-serif', description: 'Léger et aérien' }
];

const animationOptions = [
  { id: 'subtile', name: 'Subtile', description: 'Animations discrètes et élégantes' },
  { id: 'dynamique', name: 'Dynamique', description: 'Mouvements énergiques et vivants' },
  { id: 'flottante', name: 'Flottante', description: 'Effets de lévitation douce' },
  { id: 'pulsante', name: 'Pulsante', description: 'Battements rythmés' },
  { id: 'lumineuse', name: 'Lumineuse', description: 'Effets de brillance et éclat' },
  { id: 'aucune', name: 'Aucune', description: 'Pas d\'animation' }
];

const ambianceOptions = [
  { id: 'chaleureuse', name: 'Chaleureuse', description: 'Conviviale et accueillante' },
  { id: 'elegante', name: 'Élégante', description: 'Raffinée et sophistiquée' },
  { id: 'familiale', name: 'Familiale', description: 'Décontractée et conviviale' },
  { id: 'moderne', name: 'Moderne', description: 'Contemporaine et épurée' },
  { id: 'rustique', name: 'Rustique', description: 'Authentique et traditionnelle' },
  { id: 'luxueuse', name: 'Luxueuse', description: 'Haut de gamme et exclusive' },
  { id: 'romantique', name: 'Romantique', description: 'Intime et séduisante' },
  { id: 'festive', name: 'Festive', description: 'Joyeuse et animée' }
];

const premixOptions = [
  {
    id: 'japonais-zen',
    name: 'Style japonais zen',
    description: 'Vert et beige, typographie élégante, animations subtiles',
    options: { color: 'vert', typography: 'elegant', animation: 'subtile', ambiance: 'moderne', darkMode: false }
  },
  {
    id: 'food-truck-mexicain',
    name: 'Food truck mexicain',
    description: 'Couleurs vives mexicaines, typographie dynamique, animations énergiques',
    options: { color: 'mexique', typography: 'moderne', animation: 'dynamique', ambiance: 'festive', darkMode: false }
  },
  {
    id: 'restaurant-gastronomique',
    name: 'Restaurant gastronomique',
    description: 'Élégant et sombre, typographie luxueuse, animations subtiles',
    options: { color: 'bleu', typography: 'luxueux', animation: 'subtile', ambiance: 'luxueuse', darkMode: true }
  },
  {
    id: 'bistrot-francais',
    name: 'Bistrot français',
    description: 'Couleurs France, typographie classique, ambiance chaleureuse',
    options: { color: 'france', typography: 'classique', animation: 'subtile', ambiance: 'chaleureuse', darkMode: false }
  },
  {
    id: 'pizzeria-italienne',
    name: 'Pizzeria italienne',
    description: 'Couleurs Italie, typographie manuscrite, ambiance familiale',
    options: { color: 'italie', typography: 'manuscrite', animation: 'flottante', ambiance: 'familiale', darkMode: false }
  },
  {
    id: 'restaurant-moderne',
    name: 'Restaurant moderne',
    description: 'Design épuré, typographie moderne, animations lumineuses',
    options: { color: 'bleu', typography: 'moderne', animation: 'lumineuse', ambiance: 'moderne', darkMode: false }
  }
];

export function CustomizationMenu({ options, onChange }: CustomizationMenuProps) {
  const updateOption = <K extends keyof CustomizationOptions>(key: K, value: CustomizationOptions[K]) => {
    onChange({ ...options, [key]: value });
  };

  const applyPremix = (premixOptions: CustomizationOptions) => {
    onChange(premixOptions);
  };

  return (
    <div className="space-y-8">
      {/* Prémixages */}
      <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200">
        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Sparkles className="text-indigo-600" size={20} />
          Styles prêts à l'emploi
        </h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {premixOptions.map((premix) => (
            <button
              key={premix.id}
              onClick={() => applyPremix(premix.options)}
              className="p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 text-left group"
            >
              <h5 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                {premix.name}
              </h5>
              <p className="text-sm text-gray-600 mt-1">{premix.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Mode sombre */}
      <div className="p-6 bg-gray-50 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-600 rounded-lg">
              {options.darkMode ? <Moon className="text-white" size={20} /> : <Sun className="text-white" size={20} />}
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-800">Mode d'affichage</h4>
              <p className="text-sm text-gray-600">Clair ou sombre</p>
            </div>
          </div>
          <button
            onClick={() => updateOption('darkMode', !options.darkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              options.darkMode ? 'bg-indigo-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                options.darkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Couleurs */}
      <div className="p-6 bg-white rounded-2xl border-2 border-gray-200">
        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Palette className="text-blue-600" size={20} />
          Couleurs
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {colorOptions.map((color) => (
            <button
              key={color.id}
              onClick={() => updateOption('color', color.id)}
              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                options.color === color.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div
                className="w-full h-8 rounded-md mb-2 border border-gray-200"
                style={{ background: color.preview }}
              />
              <h5 className="font-medium text-sm text-gray-800">{color.name}</h5>
              <p className="text-xs text-gray-600 mt-1">{color.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Typographie */}
      <div className="p-6 bg-white rounded-2xl border-2 border-gray-200">
        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Type className="text-green-600" size={20} />
          Typographie
        </h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {typographyOptions.map((typo) => (
            <button
              key={typo.id}
              onClick={() => updateOption('typography', typo.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                options.typography === typo.id
                  ? 'border-green-500 bg-green-50 shadow-lg'
                  : 'border-gray-200 hover:border-green-300 hover:shadow-md'
              }`}
            >
              <h5 className="font-medium text-gray-800" style={{ fontFamily: typo.preview }}>
                {typo.name}
              </h5>
              <p className="text-sm text-gray-600 mt-1">{typo.description}</p>
              <p className="text-xs text-gray-500 mt-1 font-mono">{typo.preview}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Animations */}
      <div className="p-6 bg-white rounded-2xl border-2 border-gray-200">
        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Sparkles className="text-purple-600" size={20} />
          Animations
        </h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {animationOptions.map((anim) => (
            <button
              key={anim.id}
              onClick={() => updateOption('animation', anim.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                options.animation === anim.id
                  ? 'border-purple-500 bg-purple-50 shadow-lg'
                  : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
              }`}
            >
              <h5 className="font-medium text-gray-800">{anim.name}</h5>
              <p className="text-sm text-gray-600 mt-1">{anim.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Ambiance */}
      <div className="p-6 bg-white rounded-2xl border-2 border-gray-200">
        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Heart className="text-red-600" size={20} />
          Ambiance
        </h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {ambianceOptions.map((amb) => (
            <button
              key={amb.id}
              onClick={() => updateOption('ambiance', amb.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                options.ambiance === amb.id
                  ? 'border-red-500 bg-red-50 shadow-lg'
                  : 'border-gray-200 hover:border-red-300 hover:shadow-md'
              }`}
            >
              <h5 className="font-medium text-gray-800">{amb.name}</h5>
              <p className="text-sm text-gray-600 mt-1">{amb.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Résumé de la sélection */}
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
        <h4 className="text-lg font-bold text-gray-800 mb-4">✨ Votre sélection</h4>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-700">Couleur:</span>
            <p className="text-gray-700">{colorOptions.find(c => c.id === options.color)?.name || 'Non sélectionnée'}</p>
          </div>
          <div>
            <span className="font-medium text-green-700">Typographie:</span>
            <p className="text-gray-700">{typographyOptions.find(t => t.id === options.typography)?.name || 'Non sélectionnée'}</p>
          </div>
          <div>
            <span className="font-medium text-purple-700">Animation:</span>
            <p className="text-gray-700">{animationOptions.find(a => a.id === options.animation)?.name || 'Non sélectionnée'}</p>
          </div>
          <div>
            <span className="font-medium text-red-700">Ambiance:</span>
            <p className="text-gray-700">{ambianceOptions.find(a => a.id === options.ambiance)?.name || 'Non sélectionnée'}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="font-medium text-gray-700">Mode:</span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            options.darkMode ? 'bg-gray-800 text-white' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {options.darkMode ? '🌙 Sombre' : '☀️ Clair'}
          </span>
        </div>
      </div>
    </div>
  );
}