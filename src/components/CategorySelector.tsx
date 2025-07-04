import React from 'react';
import { ListRestart as Restaurant, User, Briefcase, Calendar, Globe, Sparkles, CreditCard } from 'lucide-react';

export type CategoryType = 'restaurant' | 'portfolio' | 'coming-soon-1' | 'coming-soon-2' | 'coming-soon-3' | 'coming-soon-4';

interface CategorySelectorProps {
  selectedCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

const categories = [
  {
    id: 'restaurant' as CategoryType,
    name: 'Restaurant',
    description: 'Landing pages pour restaurants et établissements culinaires',
    icon: Restaurant,
    color: 'bg-orange-600 hover:bg-orange-700',
    available: true
  },
  {
    id: 'portfolio' as CategoryType,
    name: 'Portfolio',
    description: 'Sites personnels pour créatifs et professionnels',
    icon: User,
    color: 'bg-purple-600 hover:bg-purple-700',
    available: true
  },
  {
    id: 'coming-soon-1' as CategoryType,
    name: 'Business',
    description: 'Sites d\'entreprise et services',
    icon: Briefcase,
    color: 'bg-blue-600 hover:bg-blue-700',
    available: false
  },
  {
    id: 'coming-soon-2' as CategoryType,
    name: 'Événement',
    description: 'Pages pour événements et célébrations',
    icon: Calendar,
    color: 'bg-green-600 hover:bg-green-700',
    available: false
  },
  {
    id: 'coming-soon-3' as CategoryType,
    name: 'Landing',
    description: 'Pages de capture et conversion',
    icon: Globe,
    color: 'bg-indigo-600 hover:bg-indigo-700',
    available: false
  },
  {
    id: 'coming-soon-4' as CategoryType,
    name: 'Carte de visite',
    description: 'Cartes de visite numériques personnelles',
    icon: CreditCard,
    color: 'bg-pink-600 hover:bg-pink-700',
    available: false
  }
];

export function CategorySelector({ selectedCategory, onCategoryChange }: CategorySelectorProps) {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-800 rounded-lg">
            <Sparkles className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Choisissez votre catégorie</h2>
        </div>
        
        {/* Grille 3x2 pour 6 catégories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            const isAvailable = category.available;
            
            return (
              <button
                key={category.id}
                onClick={() => isAvailable && onCategoryChange(category.id)}
                disabled={!isAvailable}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left relative ${
                  isSelected && isAvailable
                    ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                    : isAvailable
                    ? 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                    : 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                }`}
              >
                {!isAvailable && (
                  <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Bientôt
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-3">
                  <div className={`p-3 rounded-lg ${
                    isSelected && isAvailable ? 'bg-blue-600 text-white' : 
                    isAvailable ? category.color.split(' ')[0] + ' text-white' : 'bg-gray-400 text-white'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">{category.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  </div>
                </div>
                
                {isSelected && isAvailable && (
                  <div className="text-sm text-blue-600 font-medium">
                    ✓ Catégorie sélectionnée
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            💡 <strong>Nouvelles catégories :</strong> D'autres types de templates seront bientôt disponibles pour répondre à tous vos besoins !
          </p>
        </div>
      </div>
    </div>
  );
}