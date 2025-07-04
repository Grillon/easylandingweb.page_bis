import React, { useState } from 'react';
import { Github, Upload, CheckCircle, ExternalLink, Sparkles, Wand2 } from 'lucide-react';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
}

interface GitHubIntegrationProps {
  onUpload: (repoUrl: string) => void;
}

export function GitHubIntegration({ onUpload }: GitHubIntegrationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [user, setUser] = useState<GitHubUser | null>(null);

  // Simulation de connexion GitHub
  const handleGitHubLogin = () => {
    // Simulation d'une connexion réussie
    setTimeout(() => {
      const mockUser: GitHubUser = {
        login: 'demo-user',
        name: 'Utilisateur Démo',
        avatar_url: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'
      };
      setUser(mockUser);
      setIsConnected(true);
    }, 1500);
  };

  // Simulation d'upload vers GitHub
  const handleUploadToGitHub = () => {
    if (!isConnected) return;

    setIsUploading(true);
    
    // Simulation du processus d'upload
    setTimeout(() => {
      const mockRepoUrl = `https://github.com/${user?.login}/restaurant-landing-page`;
      const mockPagesUrl = `https://${user?.login}.github.io/restaurant-landing-page`;
      
      setRepoUrl(mockPagesUrl);
      setIsUploading(false);
      setUploadSuccess(true);
      onUpload(mockPagesUrl);
    }, 3000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setUser(null);
    setUploadSuccess(false);
    setRepoUrl('');
  };

  if (!isConnected) {
    return (
      <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl border-2 border-gray-700 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white rounded-lg">
            <Github className="text-gray-900" size={24} />
          </div>
          <h3 className="text-xl font-bold">Connexion GitHub</h3>
        </div>
        
        <p className="text-gray-300 mb-6">
          Connectez-vous à GitHub pour déployer automatiquement votre landing page et activer GitHub Pages.
        </p>
        
        <button
          onClick={handleGitHubLogin}
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors font-medium w-full justify-center"
        >
          <Github size={20} />
          Se connecter avec GitHub
        </button>
        
        <div className="mt-4 p-3 bg-blue-900/30 border border-blue-700 rounded-lg">
          <p className="text-blue-200 text-sm">
            💡 <strong>Mode démo :</strong> Cette connexion est simulée pour la démonstration. 
            Dans un environnement réel, vous seriez redirigé vers GitHub OAuth.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border-2 border-green-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-600 rounded-lg">
            <CheckCircle className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Connecté à GitHub</h3>
            <p className="text-sm text-gray-600">Prêt pour le déploiement</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <img 
            src={user?.avatar_url} 
            alt={user?.name}
            className="w-10 h-10 rounded-full border-2 border-green-500"
          />
          <div className="text-right">
            <p className="font-medium text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-600">@{user?.login}</p>
          </div>
        </div>
      </div>

      {!uploadSuccess ? (
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <h4 className="font-semibold text-gray-800 mb-2">🚀 Déploiement automatique</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Création du repository "restaurant-landing-page"</li>
              <li>• Upload du fichier HTML généré</li>
              <li>• Activation automatique de GitHub Pages</li>
              <li>• Configuration du domaine personnalisé</li>
            </ul>
          </div>

          <button
            onClick={handleUploadToGitHub}
            disabled={isUploading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium w-full justify-center transition-all ${
              isUploading 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Déploiement en cours...
              </>
            ) : (
              <>
                <Upload size={20} />
                Déployer sur GitHub Pages
              </>
            )}
          </button>

          {isUploading && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm font-medium text-blue-800">Étapes en cours :</span>
              </div>
              <div className="text-sm text-blue-700 space-y-1">
                <div>✓ Connexion au repository</div>
                <div>✓ Génération du HTML optimisé</div>
                <div className="animate-pulse">⏳ Upload des fichiers...</div>
                <div className="text-gray-500">⏳ Configuration GitHub Pages</div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="text-green-600" size={20} />
              <span className="font-semibold text-green-800">Déploiement réussi !</span>
            </div>
            <p className="text-sm text-green-700 mb-3">
              Votre landing page a été déployée avec succès. GitHub Pages a été automatiquement activé.
            </p>
            
            <div className="bg-white p-3 rounded border border-green-200">
              <p className="text-sm font-medium text-gray-700 mb-1">Votre site est maintenant en ligne :</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-2 py-1 bg-gray-100 rounded text-sm font-mono text-gray-800">
                  {repoUrl}
                </code>
                <button
                  onClick={() => window.open(repoUrl, '_blank')}
                  className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                  title="Ouvrir le site"
                >
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => window.open(repoUrl, '_blank')}
              className="flex-1 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium justify-center"
            >
              <ExternalLink size={18} />
              Voir le site
            </button>
            
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Déconnecter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}