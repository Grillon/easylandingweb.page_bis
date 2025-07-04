import React, { useState } from 'react';
import { Eye, Download, ExternalLink, ListRestart as Restaurant, BookOpen, Sparkles, Palette } from 'lucide-react';
import { FormField } from './components/FormField';
import { ImageUploadSection } from './components/ImageUploadSection';
import { MenuCardsSection } from './components/MenuCardsSection';
import { SocialMediaBanner } from './components/SocialMediaBanner';
import { ImportExportSection } from './components/ImportExportSection';
import { PreviewModal } from './components/PreviewModal';
import { DocumentationModal } from './components/DocumentationModal';
import { TemplateSelector, TemplateType } from './components/TemplateSelector';
import { CustomizationMenu, CustomizationOptions } from './components/CustomizationMenu';
import { GitHubIntegration } from './components/GitHubIntegration';
import { CategorySelector, CategoryType } from './components/CategorySelector';
import { MustachePortfolioForm } from './components/portfolio/MustachePortfolioForm';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateHTML, downloadHTML } from './utils/templateGenerator';

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
  template: TemplateType;
  darkMode: boolean;
  customization: string;
  aiCustomizationEnabled: boolean;
  customizationOptions: CustomizationOptions;
  menuCards: Array<{ type: 'pdf' | 'image'; url: string; title: string; }>;
}

const initialRestaurantData: RestaurantData = {
  nom: '',
  accroche: '',
  banniere_url: '',
  images: [],
  adresse: '',
  maps_url: '',
  telephone: '',
  horaires: '',
  socials: [],
  template: 'simple',
  darkMode: false,
  customization: '',
  aiCustomizationEnabled: false,
  customizationOptions: {
    color: '',
    typography: '',
    animation: '',
    ambiance: '',
    darkMode: false
  },
  menuCards: []
};

function App() {
  const [selectedCategory, setSelectedCategory] = useLocalStorage<CategoryType>('selected-category', 'restaurant');
  const [restaurantData, setRestaurantData] = useLocalStorage<RestaurantData>('restaurant-data', initialRestaurantData);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDocumentationOpen, setIsDocumentationOpen] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [deployedUrl, setDeployedUrl] = useState('');

  const updateRestaurantField = <K extends keyof RestaurantData>(field: K, value: RestaurantData[K]) => {
    setRestaurantData(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomizationChange = (options: CustomizationOptions) => {
    setRestaurantData(prev => ({ 
      ...prev, 
      customizationOptions: options,
      darkMode: options.darkMode // Synchroniser avec le mode sombre global
    }));
  };

  const handleRestaurantPreview = () => {
    const html = generateHTML(restaurantData);
    setGeneratedHTML(html);
    setIsPreviewOpen(true);
  };

  const handleRestaurantPreviewNewPage = () => {
    const html = generateHTML(restaurantData);
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
    }
  };

  const handleRestaurantDownload = () => {
    const html = generateHTML(restaurantData);
    downloadHTML(html, 'index.html');
  };

  const handleRestaurantImport = (importedData: RestaurantData) => {
    setRestaurantData(importedData);
  };

  const handleGitHubUpload = (repoUrl: string) => {
    setDeployedUrl(repoUrl);
  };

  const handlePortfolioPreview = (html: string) => {
    setGeneratedHTML(html);
    setIsPreviewOpen(true);
  };

  const renderCategoryContent = () => {
    switch (selectedCategory) {
      case 'portfolio':
        return (
          <MustachePortfolioForm 
            onPreview={handlePortfolioPreview}
            onUpload={handleGitHubUpload}
          />
        );
      
      case 'restaurant':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Switch Personnalisation IA */}
              <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <Sparkles className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Mode Personnalisation
                    </h3>
                  </div>
                  
                  {/* Switch Principal */}
                  <div className="flex items-center gap-3">
                    <Palette className="text-purple-600" size={20} />
                    <button
                      onClick={() => updateRestaurantField('aiCustomizationEnabled', !restaurantData.aiCustomizationEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                        restaurantData.aiCustomizationEnabled ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          restaurantData.aiCustomizationEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <Sparkles className="text-purple-600" size={20} />
                    <span className="text-sm font-medium text-gray-700">
                      {restaurantData.aiCustomizationEnabled ? 'Menu Activé' : 'Templates'}
                    </span>
                  </div>
                </div>

                {restaurantData.aiCustomizationEnabled ? (
                  // Mode Menu de Personnalisation
                  <div>
                    <div className="mb-4 p-4 bg-white rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2">🎯 Personnalisation par menu</h4>
                      <p className="text-sm text-gray-700">
                        Choisissez vos options dans les menus ci-dessous. Chaque combinaison est testée et garantie de fonctionner parfaitement !
                      </p>
                    </div>

                    <CustomizationMenu
                      options={restaurantData.customizationOptions}
                      onChange={handleCustomizationChange}
                    />
                  </div>
                ) : (
                  // Mode Templates classiques
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      Utilisez les templates prédéfinis ou activez le menu de personnalisation pour un design sur mesure
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Palette size={16} />
                      <span>Templates classiques actifs</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Sélecteur de template - Affiché seulement si menu désactivé */}
              {!restaurantData.aiCustomizationEnabled && (
                <TemplateSelector
                  selectedTemplate={restaurantData.template}
                  onTemplateChange={(template) => updateRestaurantField('template', template)}
                  darkMode={restaurantData.darkMode}
                  onDarkModeChange={(darkMode) => updateRestaurantField('darkMode', darkMode)}
                />
              )}

              {/* Section GitHub Integration */}
              <div className="mb-8">
                <GitHubIntegration onUpload={handleGitHubUpload} />
              </div>

              {/* Section Import/Export */}
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Gestion des données</h3>
                <ImportExportSection data={restaurantData} onImport={handleRestaurantImport} />
              </div>

              <form className="space-y-8">
                {/* Informations de base */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField label="Nom du restaurant *">
                    <input
                      type="text"
                      value={restaurantData.nom}
                      onChange={(e) => updateRestaurantField('nom', e.target.value)}
                      placeholder="Le Petit Bistrot"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </FormField>

                  <FormField label="Téléphone">
                    <input
                      type="tel"
                      value={restaurantData.telephone}
                      onChange={(e) => updateRestaurantField('telephone', e.target.value)}
                      placeholder="01 23 45 67 89"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </FormField>
                </div>

                <FormField label="Accroche du restaurant">
                  <input
                    type="text"
                    value={restaurantData.accroche}
                    onChange={(e) => updateRestaurantField('accroche', e.target.value)}
                    placeholder="Une cuisine authentique dans un cadre chaleureux"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </FormField>

                <FormField label="URL de l'image de bannière">
                  <input
                    type="url"
                    value={restaurantData.banniere_url}
                    onChange={(e) => updateRestaurantField('banniere_url', e.target.value)}
                    placeholder="https://exemple.com/banniere.jpg"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </FormField>

                <ImageUploadSection
                  images={restaurantData.images}
                  onChange={(images) => updateRestaurantField('images', images)}
                />

                <MenuCardsSection
                  menuCards={restaurantData.menuCards}
                  onChange={(menuCards) => updateRestaurantField('menuCards', menuCards)}
                />

                <FormField label="Adresse complète">
                  <textarea
                    value={restaurantData.adresse}
                    onChange={(e) => updateRestaurantField('adresse', e.target.value)}
                    placeholder="123 Rue de la Paix&#10;75001 Paris&#10;France"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                  />
                </FormField>

                <FormField label="URL Google Maps (optionnel)">
                  <input
                    type="url"
                    value={restaurantData.maps_url}
                    onChange={(e) => updateRestaurantField('maps_url', e.target.value)}
                    placeholder="https://www.google.com/maps/embed?pb=..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    💡 Pour obtenir l'URL : allez sur Google Maps, recherchez votre adresse, cliquez sur "Partager" → "Intégrer une carte" et copiez l'URL dans src=""
                  </p>
                </FormField>

                <FormField label="Horaires d'ouverture">
                  <textarea
                    value={restaurantData.horaires}
                    onChange={(e) => updateRestaurantField('horaires', e.target.value)}
                    placeholder="Lundi - Vendredi : 12h - 14h30 et 19h - 22h30&#10;Samedi : 19h - 23h&#10;Dimanche : Fermé"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                  />
                </FormField>

                <SocialMediaBanner
                  socials={restaurantData.socials}
                  onChange={(socials) => updateRestaurantField('socials', socials)}
                />
              </form>

              {/* Boutons d'action */}
              <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t">
                <button
                  onClick={handleRestaurantPreviewNewPage}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <ExternalLink size={18} />
                  Aperçu nouvelle page
                </button>

                <button
                  onClick={handleRestaurantPreview}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Eye size={18} />
                  Aperçu modal
                </button>

                <button
                  onClick={handleRestaurantDownload}
                  className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  <Download size={18} />
                  Télécharger HTML
                </button>

                <button
                  onClick={() => setIsDocumentationOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  <BookOpen size={18} />
                  Documentation
                </button>
              </div>

              {/* Indication de sauvegarde automatique */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  💡 <strong>Sauvegarde automatique :</strong> Vos données sont automatiquement sauvegardées dans votre navigateur pendant que vous saisissez.
                </p>
                {deployedUrl && (
                  <p className="text-sm text-green-700 mt-2">
                    🚀 <strong>Site déployé :</strong> <a href={deployedUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-green-800">{deployedUrl}</a>
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="p-8">
                <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="text-yellow-600" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Bientôt disponible !</h3>
                <p className="text-gray-600 mb-6">
                  Cette catégorie de templates est en cours de développement. 
                  Nous travaillons dur pour vous offrir de nouveaux types de sites web.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-700">
                    💡 En attendant, vous pouvez utiliser les catégories <strong>Restaurant</strong> et <strong>Portfolio</strong> qui sont déjà disponibles !
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Badge Bolt officiel - Respecte les guidelines */}
      <a
        href="https://bolt.new/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 right-4 z-50 group"
        style={{ opacity: 0.85 }}
      >
        <div className="bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-gray-200 p-2">
          <img 
            src="/white_circle_360x360.png" 
            alt="Made with Bolt"
            className="w-24 h-24 object-contain"
          />
        </div>
      </a>

      {/* Bouton Aperçu Rapide Restaurant uniquement */}
      {selectedCategory === 'restaurant' && (
        <button
          onClick={handleRestaurantPreview}
          disabled={!restaurantData.nom.trim()}
          className={`fixed top-40 right-4 z-50 group rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 border-2 p-4 ${
            restaurantData.nom.trim()
              ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500 cursor-pointer'
              : 'bg-gray-400 text-gray-200 border-gray-300 cursor-not-allowed'
          }`}
          title="Aperçu rapide Restaurant"
        >
          <Eye size={28} className="drop-shadow-sm" />
          <div className={`absolute -left-24 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap ${
            !restaurantData.nom.trim() ? 'hidden' : ''
          }`}>
            Aperçu Restaurant
          </div>
        </button>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Restaurant className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">
              EasyLandingWeb
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Créez des sites web professionnels en quelques minutes
          </p>
        </div>

        {/* Sélecteur de catégorie */}
        <CategorySelector
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Contenu selon la catégorie */}
        {renderCategoryContent()}
      </div>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        htmlContent={generatedHTML}
      />

      <DocumentationModal
        isOpen={isDocumentationOpen}
        onClose={() => setIsDocumentationOpen(false)}
      />
    </div>
  );
}

export default App;