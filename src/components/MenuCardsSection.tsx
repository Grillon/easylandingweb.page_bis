import React from 'react';
import { Plus, X, FileText, Image } from 'lucide-react';
import { FormField } from './FormField';

interface MenuCard {
  type: 'pdf' | 'image';
  url: string;
  title: string;
}

interface MenuCardsSectionProps {
  menuCards: MenuCard[];
  onChange: (menuCards: MenuCard[]) => void;
}

export function MenuCardsSection({ menuCards, onChange }: MenuCardsSectionProps) {
  const addMenuCard = () => {
    onChange([...menuCards, { type: 'image', url: '', title: '' }]);
  };

  const updateMenuCard = (index: number, field: keyof MenuCard, value: string) => {
    const newMenuCards = [...menuCards];
    newMenuCards[index] = { ...newMenuCards[index], [field]: value };
    onChange(newMenuCards);
  };

  const removeMenuCard = (index: number) => {
    const newMenuCards = menuCards.filter((_, i) => i !== index);
    onChange(newMenuCards);
  };

  return (
    <FormField label="Carte des menus (optionnel)">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Ajoutez vos cartes de menus (PDF ou images) pour permettre à vos clients de consulter vos plats et boissons.
        </p>
        
        {menuCards.map((card, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg border">
            <div className="flex gap-3 mb-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre de la carte
                </label>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => updateMenuCard(index, 'title', e.target.value)}
                  placeholder="Carte des plats, Carte des vins..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="w-32">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={card.type}
                  onChange={(e) => updateMenuCard(index, 'type', e.target.value as 'pdf' | 'image')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="image">Image</option>
                  <option value="pdf">PDF</option>
                </select>
              </div>
              
              <button
                type="button"
                onClick={() => removeMenuCard(index)}
                className="mt-6 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL du fichier
              </label>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white rounded border">
                  {card.type === 'pdf' ? (
                    <FileText className="text-red-600" size={16} />
                  ) : (
                    <Image className="text-blue-600" size={16} />
                  )}
                </div>
                <input
                  type="url"
                  value={card.url}
                  onChange={(e) => updateMenuCard(index, 'url', e.target.value)}
                  placeholder={card.type === 'pdf' ? 'https://exemple.com/menu.pdf' : 'https://exemple.com/menu.jpg'}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          type="button"
          onClick={addMenuCard}
          className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <Plus size={16} />
          Ajouter une carte ({menuCards.length}/5)
        </button>
        
        {menuCards.length > 0 && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 <strong>Conseil :</strong> Les cartes apparaîtront sous forme d'un lien discret "Accéder à la carte" qui ouvrira une galerie pour vos clients.
            </p>
          </div>
        )}
      </div>
    </FormField>
  );
}