import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MessageSquare as MessageSquareQuote, TrendingUp, Zap, Shield } from 'lucide-react';
import { FaTelegramPlane } from 'react-icons/fa';

const reviews = [
  {
    author: "Alex_Trader_2024",
    platform: "Telegram",
    text: "Bot QUANTUM ELITE activé depuis 3 semaines. ROI de 847% déjà atteint ! L'algorithme détecte des opportunités que je n'aurais jamais vues. C'est de la pure technologie.",
    rating: 5,
    color: "cyan",
    profit: "+12,847€",
    verified: true
  },
  {
    author: "Marie_Crypto_Pro",
    platform: "Discord",
    text: "PRO ALGORITHM fonctionne parfaitement. Interface ultra-claire, exécution en millisecondes. Le support technique répond en moins de 5 minutes. Du jamais vu !",
    rating: 5,
    color: "purple",
    profit: "+5,234€",
    verified: true
  },
  {
    author: "Julien_HFT_Master",
    platform: "Telegram",
    text: "Sceptique au début sur l'arbitrage automatisé, mais les résultats parlent. 4h d'attente et boom, objectif atteint. L'IA fait vraiment la différence.",
    rating: 5,
    color: "green",
    profit: "+3,456€",
    verified: true
  },
  {
    author: "Sophie_DeFi_Queen",
    platform: "Forum",
    text: "Transparence totale, retraits instantanés, frais clairement expliqués. Enfin une plateforme qui respecte ses utilisateurs. Je recommande à 200% !",
    rating: 5,
    color: "yellow",
    profit: "+7,891€",
    verified: true
  },
  {
    author: "Kevin_Algo_Trader",
    platform: "Telegram",
    text: "STARTER BOT parfait pour débuter. L'algorithme de base est déjà très performant. Conseiller personnel au top, stratégies expliquées clairement.",
    rating: 5,
    color: "blue",
    profit: "+2,123€",
    verified: true
  },
  {
    author: "Émilie_Blockchain",
    platform: "Discord",
    text: "Le ticker en temps réel est hypnotisant ! Voir les transactions s'exécuter automatiquement 24h/24, c'est magique. Technologie de pointe.",
    rating: 5,
    color: "pink",
    profit: "+4,567€",
    verified: true
  },
  {
    author: "Lucas_Quant_Dev",
    platform: "Telegram",
    text: "API privée du QUANTUM ELITE = game changer. Accès aux données de trading institutionnel. C'est du niveau hedge fund accessible au retail.",
    rating: 5,
    color: "purple",
    profit: "+15,234€",
    verified: true
  },
  {
    author: "Clara_AI_Enthusiast",
    platform: "Forum",
    text: "L'IA prédictive analyse 50+ indicateurs simultanément. Impossible à faire manuellement. ROI constant, stress zéro. Révolutionnaire !",
    rating: 5,
    color: "cyan",
    profit: "+6,789€",
    verified: true
  },
];

const PlatformIcon = ({ platform }) => {
  if (platform === "Telegram") {
    return <FaTelegramPlane className="w-4 h-4 text-cyan-400" />;
  }
  if (platform === "Discord") {
    return <MessageSquareQuote className="w-4 h-4 text-purple-400" />;
  }
  return <MessageSquareQuote className="w-4 h-4 text-gray-400" />;
};

const ReviewCard = ({ review, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="h-full group"
  >
    <Card className="h-full flex flex-col glass-card neon-border backdrop-blur-sm shadow-lg group-hover:neon-glow transition-all duration-500 p-6 holographic">
      <CardHeader className="p-0 mb-4">
        <div className="flex items-center justify-between mb-3">
          <CardTitle className="text-lg font-bold text-white font-mono flex items-center">
            {review.author}
            {review.verified && (
              <Shield className="w-4 h-4 text-green-400 ml-2" title="Utilisateur vérifié" />
            )}
          </CardTitle>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <PlatformIcon platform={review.platform} />
            <span className="font-mono">{review.platform}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-mono font-bold text-sm">{review.profit}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-grow">
        <blockquote className="text-cyan-100 italic leading-relaxed">
          "{review.text}"
        </blockquote>
      </CardContent>

      <div className="mt-4 pt-4 border-t border-gray-700/50">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500 font-mono">TRADER VÉRIFIÉ</span>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 font-mono">ACTIF</span>
          </div>
        </div>
      </div>
    </Card>
  </motion.div>
);

const CustomerReviews = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-black/40 to-black/20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
            <span className="gradient-text-primary font-mono">COMMUNAUTÉ</span> DE TRADERS
          </h2>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Rejoignez plus de 500 traders qui automatisent leurs profits avec nos algorithmes IA
          </p>

          {/* Community Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {[
              { label: "TRADERS ACTIFS", value: "500+", icon: <TrendingUp className="w-6 h-6" />, color: "text-cyan-400" },
              { label: "PROFITS GÉNÉRÉS", value: "€2.4M", icon: <Zap className="w-6 h-6" />, color: "text-green-400" },
              { label: "TAUX DE SUCCÈS", value: "94.7%", icon: <Shield className="w-6 h-6" />, color: "text-purple-400" },
              { label: "SATISFACTION", value: "98.2%", icon: <Star className="w-6 h-6" />, color: "text-yellow-400" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card p-4 rounded-xl neon-border text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/30 mb-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-400 font-mono">{stat.label}</div>
                <div className="data-bar mt-2"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="glass-card p-8 rounded-2xl neon-border max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white font-mono mb-4">
              REJOIGNEZ LA RÉVOLUTION
            </h3>
            <p className="text-cyan-200 mb-6">
              Automatisez vos profits crypto avec l'IA la plus avancée du marché
            </p>
            <div className="text-sm font-mono text-gray-400">
              +30-40 nouveaux traders automatisés chaque mois
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerReviews;