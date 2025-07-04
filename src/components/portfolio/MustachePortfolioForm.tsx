import React, { useState } from 'react';
import { Eye, Download, ExternalLink, Plus, X, FileText, Image as ImageIcon, Video, Youtube, Upload, ChevronDown, ChevronUp, List } from 'lucide-react';
import { FormField } from '../FormField';
import { ImportExportSection } from '../ImportExportSection';
import { GitHubIntegration } from '../GitHubIntegration';
import { SimplifiedSocialMediaBanner } from './SimplifiedSocialMediaBanner';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { generateMustachePortfolioHTML, downloadHTML } from '../../utils/mustachePortfolioGenerator';

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
  galerie: Array<{
    image: string;
    projet: string;
  }>;
  projets: MustachePortfolioProject[];
  documents: MustachePortfolioDocument[];
  reseaux: MustachePortfolioReseau[];
}

const initialMustachePortfolioData: MustachePortfolioData = {
  nom: '',
  about: '',
  galerie: [],
  projets: [],
  documents: [],
  reseaux: []
};

interface MustachePortfolioFormProps {
  onPreview: (html: string) => void;
  onUpload: (repoUrl: string) => void;
}

export function MustachePortfolioForm({ onPreview, onUpload }: MustachePortfolioFormProps) {
  const [data, setData] = useLocalStorage<MustachePortfolioData>('mustache-portfolio-data', initialMustachePortfolioData);
  const [showProjectIndex, setShowProjectIndex] = useState(false);

  const updateField = <K extends keyof MustachePortfolioData>(field: K, value: MustachePortfolioData[K]) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreview = () => {
    const html = generateMustachePortfolioHTML(data);
    onPreview(html);
  };

  const handlePreviewNewPage = () => {
    const html = generateMustachePortfolioHTML(data);
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
    }
  };

  const handleDownload = () => {
    const html = generateMustachePortfolioHTML(data);
    downloadHTML(html, 'portfolio.html');
  };

  const handleImport = (importedData: MustachePortfolioData) => {
    setData(importedData);
  };

  // Gestion des projets
  const addProject = () => {
    updateField('projets', [...data.projets, {
      titre: '',
      type: '',
      annee: '',
      stack: '',
      role: '',
      probleme: '',
      solution: [],
      apprentissage: [],
      visuel: '',
      files: [],
      collapsed: false
    }]);
  };

  const updateProject = (index: number, field: keyof MustachePortfolioProject, value: any) => {
    const newProjects = [...data.projets];
    newProjects[index] = { ...newProjects[index], [field]: value };
    updateField('projets', newProjects);
  };

  const removeProject = (index: number) => {
    const newProjects = data.projets.filter((_, i) => i !== index);
    updateField('projets', newProjects);
  };

  const toggleProjectCollapse = (index: number) => {
    const newProjects = [...data.projets];
    newProjects[index].collapsed = !newProjects[index].collapsed;
    updateField('projets', newProjects);
  };

  const collapseAllProjects = () => {
    const newProjects = data.projets.map(p => ({ ...p, collapsed: true }));
    updateField('projets', newProjects);
  };

  const expandAllProjects = () => {
    const newProjects = data.projets.map(p => ({ ...p, collapsed: false }));
    updateField('projets', newProjects);
  };

  // Gestion des fichiers de projet
  const addProjectFile = (projectIndex: number) => {
    const newProjects = [...data.projets];
    if (!newProjects[projectIndex].files) {
      newProjects[projectIndex].files = [];
    }
    newProjects[projectIndex].files!.push({
      url: '',
      label: '',
      type: 'link'
    });
    updateField('projets', newProjects);
  };

  const updateProjectFile = (projectIndex: number, fileIndex: number, field: keyof ProjectFile, value: any) => {
    const newProjects = [...data.projets];
    if (newProjects[projectIndex].files) {
      newProjects[projectIndex].files![fileIndex] = {
        ...newProjects[projectIndex].files![fileIndex],
        [field]: value
      };
      updateField('projets', newProjects);
    }
  };

  const removeProjectFile = (projectIndex: number, fileIndex: number) => {
    const newProjects = [...data.projets];
    if (newProjects[projectIndex].files) {
      newProjects[projectIndex].files = newProjects[projectIndex].files!.filter((_, i) => i !== fileIndex);
      updateField('projets', newProjects);
    }
  };

  // Gestion des solutions
  const addSolution = (projectIndex: number) => {
    const newProjects = [...data.projets];
    newProjects[projectIndex].solution.push('');
    updateField('projets', newProjects);
  };

  const updateSolution = (projectIndex: number, solutionIndex: number, value: string) => {
    const newProjects = [...data.projets];
    newProjects[projectIndex].solution[solutionIndex] = value;
    updateField('projets', newProjects);
  };

  const removeSolution = (projectIndex: number, solutionIndex: number) => {
    const newProjects = [...data.projets];
    newProjects[projectIndex].solution = newProjects[projectIndex].solution.filter((_, i) => i !== solutionIndex);
    updateField('projets', newProjects);
  };

  // Gestion des apprentissages
  const addApprentissage = (projectIndex: number) => {
    const newProjects = [...data.projets];
    newProjects[projectIndex].apprentissage.push('');
    updateField('projets', newProjects);
  };

  const updateApprentissage = (projectIndex: number, apprentissageIndex: number, value: string) => {
    const newProjects = [...data.projets];
    newProjects[projectIndex].apprentissage[apprentissageIndex] = value;
    updateField('projets', newProjects);
  };

  const removeApprentissage = (projectIndex: number, apprentissageIndex: number) => {
    const newProjects = [...data.projets];
    newProjects[projectIndex].apprentissage = newProjects[projectIndex].apprentissage.filter((_, i) => i !== apprentissageIndex);
    updateField('projets', newProjects);
  };

  // Gestion des documents
  const addDocument = () => {
    updateField('documents', [...data.documents, { nom: '', url: '', type: '' }]);
  };

  const updateDocument = (index: number, field: keyof MustachePortfolioDocument, value: string) => {
    const newDocuments = [...data.documents];
    newDocuments[index][field] = value;
    updateField('documents', newDocuments);
  };

  const removeDocument = (index: number) => {
    const newDocuments = data.documents.filter((_, i) => i !== index);
    updateField('documents', newDocuments);
  };

  // Helper pour convertir URL YouTube en embed
  const convertYouTubeUrl = (url: string): string => {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(youtubeRegex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        {/* Section GitHub Integration */}
        <div className="mb-8">
          <GitHubIntegration onUpload={onUpload} />
        </div>

        {/* Section Import/Export */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Gestion des données</h3>
          <ImportExportSection data={data} onImport={handleImport} />
        </div>

        <form className="space-y-8">
          {/* Informations de base */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField label="Votre nom *">
              <input
                type="text"
                value={data.nom}
                onChange={(e) => updateField('nom', e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </FormField>

            <FormField label="À propos">
              <textarea
                value={data.about}
                onChange={(e) => updateField('about', e.target.value)}
                placeholder="Développeur passionné par l'innovation..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-vertical"
              />
            </FormField>
          </div>

          {/* Réseaux sociaux simplifiés */}
          <SimplifiedSocialMediaBanner
            reseaux={data.reseaux}
            onChange={(reseaux) => updateField('reseaux', reseaux)}
          />

          {/* Index des projets pliable - UNIQUEMENT pour la gestion dans le générateur */}
          {data.projets.length > 0 && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <button
                type="button"
                onClick={() => setShowProjectIndex(!showProjectIndex)}
                className="flex items-center gap-2 text-blue-800 font-semibold mb-2"
              >
                <List size={20} />
                Gestion des projets ({data.projets.length})
                {showProjectIndex ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {showProjectIndex && (
                <div className="space-y-2">
                  <div className="flex gap-2 mb-3">
                    <button
                      type="button"
                      onClick={collapseAllProjects}
                      className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                    >
                      Tout replier
                    </button>
                    <button
                      type="button"
                      onClick={expandAllProjects}
                      className="px-3 py-1 text-xs bg-blue-200 text-blue-700 rounded hover:bg-blue-300 transition-colors"
                    >
                      Tout déplier
                    </button>
                  </div>
                  
                  {data.projets.map((projet, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="font-medium">
                        {projet.titre || `Projet ${index + 1}`}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleProjectCollapse(index)}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                      >
                        {projet.collapsed ? (
                          <>Déplier <ChevronDown size={12} /></>
                        ) : (
                          <>Replier <ChevronUp size={12} /></>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                💡 <strong>Note :</strong> Un index de navigation sera automatiquement généré dans la page finale pour permettre aux visiteurs de naviguer entre vos projets.
              </div>
            </div>
          )}

          {/* Projets */}
          <FormField label="Projets">
            <div className="space-y-6">
              {data.projets.map((project, projectIndex) => (
                <div key={projectIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* En-tête du projet pliable */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                    <button
                      type="button"
                      onClick={() => toggleProjectCollapse(projectIndex)}
                      className="flex items-center gap-2 text-left flex-1"
                    >
                      <h4 className="text-lg font-semibold text-gray-800">
                        {project.titre || `Projet ${projectIndex + 1}`}
                      </h4>
                      {project.collapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => removeProject(projectIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Contenu du projet */}
                  {!project.collapsed && (
                    <div className="p-6 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={project.titre}
                          onChange={(e) => updateProject(projectIndex, 'titre', e.target.value)}
                          placeholder="Titre du projet"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={project.type}
                          onChange={(e) => updateProject(projectIndex, 'type', e.target.value)}
                          placeholder="Type de projet"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={project.annee}
                          onChange={(e) => updateProject(projectIndex, 'annee', e.target.value)}
                          placeholder="Année"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={project.stack}
                          onChange={(e) => updateProject(projectIndex, 'stack', e.target.value)}
                          placeholder="Stack technique"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          value={project.role}
                          onChange={(e) => updateProject(projectIndex, 'role', e.target.value)}
                          placeholder="Votre rôle"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                          type="url"
                          value={project.visuel || ''}
                          onChange={(e) => updateProject(projectIndex, 'visuel', e.target.value)}
                          placeholder="URL du visuel principal"
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <textarea
                          value={project.probleme}
                          onChange={(e) => updateProject(projectIndex, 'probleme', e.target.value)}
                          placeholder="Problème à résoudre"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
                        />
                      </div>

                      {/* Solutions */}
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Solutions apportées</h5>
                        {project.solution.map((solution, solutionIndex) => (
                          <div key={solutionIndex} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={solution}
                              onChange={(e) => updateSolution(projectIndex, solutionIndex, e.target.value)}
                              placeholder="Solution mise en place"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => removeSolution(projectIndex, solutionIndex)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addSolution(projectIndex)}
                          className="flex items-center gap-2 px-3 py-2 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <Plus size={16} />
                          Ajouter une solution
                        </button>
                      </div>

                      {/* Apprentissages */}
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Apprentissages</h5>
                        {project.apprentissage.map((apprentissage, apprentissageIndex) => (
                          <div key={apprentissageIndex} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={apprentissage}
                              onChange={(e) => updateApprentissage(projectIndex, apprentissageIndex, e.target.value)}
                              placeholder="Ce que vous avez appris"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => removeApprentissage(projectIndex, apprentissageIndex)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addApprentissage(projectIndex)}
                          className="flex items-center gap-2 px-3 py-2 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <Plus size={16} />
                          Ajouter un apprentissage
                        </button>
                      </div>

                      {/* Fichiers du projet */}
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Fichiers et ressources</h5>
                        {(project.files || []).map((file, fileIndex) => (
                          <div key={fileIndex} className="p-4 bg-gray-50 rounded-lg border mb-3">
                            <div className="flex gap-2 mb-3">
                              <select
                                value={file.type}
                                onChange={(e) => updateProjectFile(projectIndex, fileIndex, 'type', e.target.value as ProjectFile['type'])}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              >
                                <option value="link">Lien</option>
                                <option value="pdf">PDF</option>
                                <option value="image">Image</option>
                                <option value="video">Vidéo (fichier)</option>
                                <option value="youtube">YouTube</option>
                              </select>
                              
                              <input
                                type="text"
                                value={file.label}
                                onChange={(e) => updateProjectFile(projectIndex, fileIndex, 'label', e.target.value)}
                                placeholder="Nom du fichier"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                              
                              <button
                                type="button"
                                onClick={() => removeProjectFile(projectIndex, fileIndex)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <X size={20} />
                              </button>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {file.type === 'pdf' && <FileText className="text-red-600" size={16} />}
                              {file.type === 'image' && <ImageIcon className="text-blue-600" size={16} />}
                              {file.type === 'video' && <Video className="text-green-600" size={16} />}
                              {file.type === 'youtube' && <Youtube className="text-red-600" size={16} />}
                              
                              <input
                                type="url"
                                value={file.url}
                                onChange={(e) => {
                                  let url = e.target.value;
                                  // Auto-conversion pour YouTube
                                  if (file.type === 'youtube' && url.includes('youtube.com/watch')) {
                                    url = convertYouTubeUrl(url);
                                  }
                                  updateProjectFile(projectIndex, fileIndex, 'url', url);
                                }}
                                placeholder={
                                  file.type === 'youtube' ? 'URL YouTube (sera convertie automatiquement)' :
                                  file.type === 'pdf' ? 'URL du PDF' :
                                  file.type === 'image' ? 'URL de l\'image' :
                                  file.type === 'video' ? 'URL de la vidéo' :
                                  'URL du lien'
                                }
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              />
                            </div>
                            
                            {file.type === 'youtube' && (
                              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                                💡 <strong>YouTube :</strong> Collez l'URL normale (ex: https://youtube.com/watch?v=...) et elle sera automatiquement convertie
                              </div>
                            )}
                          </div>
                        ))}
                        
                        <button
                          type="button"
                          onClick={() => addProjectFile(projectIndex)}
                          className="flex items-center gap-2 px-3 py-2 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
                        >
                          <Plus size={16} />
                          Ajouter un fichier
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={addProject}
                className="flex items-center gap-2 px-4 py-2 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <Plus size={16} />
                Ajouter un projet
              </button>
            </div>
          </FormField>

          {/* Documents */}
          <FormField label="Documents généraux">
            <div className="space-y-3">
              {data.documents.map((doc, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={doc.nom}
                    onChange={(e) => updateDocument(index, 'nom', e.target.value)}
                    placeholder="Nom du document"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <input
                    type="url"
                    value={doc.url}
                    onChange={(e) => updateDocument(index, 'url', e.target.value)}
                    placeholder="URL du document"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeDocument(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addDocument}
                className="flex items-center gap-2 px-4 py-2 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <Plus size={16} />
                Ajouter un document
              </button>
            </div>
          </FormField>
        </form>

        {/* Boutons d'action */}
        <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t">
          <button
            onClick={handlePreviewNewPage}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <ExternalLink size={18} />
            Aperçu nouvelle page
          </button>

          <button
            onClick={handlePreview}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <Eye size={18} />
            Aperçu modal
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            <Download size={18} />
            Télécharger HTML
          </button>
        </div>

        {/* Indication de sauvegarde automatique */}
        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-700">
            💡 <strong>Sauvegarde automatique :</strong> Vos données de portfolio sont automatiquement sauvegardées dans votre navigateur.
          </p>
        </div>
      </div>
    </div>
  );
}