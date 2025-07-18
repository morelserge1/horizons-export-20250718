import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MessageSquare as MessageSquareQuote } from 'lucide-react';
import { FaTelegramPlane } from 'react-icons/fa';

const reviews = [
  {
    author: "Alex D.",
    platform: "Telegram",
    text: "Incroyable ! J'ai commencé avec le plan Starter et j'ai vu des résultats rapidement. Le robot fait vraiment le travail. C'est presque trop beau pour être vrai !",
    rating: 5,
    color: "cyan"
  },
  {
    author: "Marie L.",
    platform: "Forum",
    text: "Très sceptique au début, mais CryptoBoost a dépassé toutes mes attentes. L'interface est super simple et le support est réactif. Je suis passée au plan Pro sans hésiter.",
    rating: 5,
    color: "purple"
  },
  {
    author: "Julien R.",
    platform: "Telegram",
    text: "Les 4 heures d'attente pour les gains peuvent sembler longues, mais ça en vaut largement la peine quand on voit le résultat final. C'est une machine à cash !",
    rating: 4,
    color: "yellow"
  },
  {
    author: "Sophie T.",
    platform: "Recommandation",
    text: "Enfin une plateforme qui tient ses promesses. Les retraits sont clairs, les frais sont expliqués. C'est transparent et ça marche. Je recommande à 100%.",
    rating: 5,
    color: "green"
  },
  {
    author: "Kevin G.",
    platform: "Forum",
    text: "J'ai pris le plan Expert et le conseiller personnel est un vrai plus. Des stratégies pointues et un suivi au top. C'est du sérieux.",
    rating: 5,
    color: "blue"
  },
   {
    author: "Émilie B.",
    platform: "Telegram",
    text: "Le fait de voir les transactions en direct avec le ticker est super rassurant. On sent que ça travaille en permanence. Très pro !",
    rating: 5,
    color: "pink"
  },
  {
    author: "Lucas M.",
    platform: "Telegram",
    text: "Contacté le conseiller sur Telegram, réponse en moins de 10 minutes. Il m'a guidé pour mon premier investissement. Service client au top !",
    rating: 5,
    color: "purple"
  },
  {
    author: "Clara P.",
    platform: "Telegram",
    text: "Le bot Telegram est super pratique pour avoir des nouvelles rapides. J'ai eu une question sur mon plan, et j'ai eu ma réponse via le bot. Efficace !",
    rating: 5,
    color: "cyan"
  },
];

const PlatformIcon = ({ platform }) => {
  if (platform === "Telegram") {
    return <FaTelegramPlane className="w-4 h-4 text-cyan-400" />;
  }
  return <MessageSquareQuote className="w-4 h-4 text-gray-400" />;
};

const ReviewCard = ({ review, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="h-full"
  >
    <Card className={`h-full flex flex-col bg-slate-900/50 border-2 border-slate-800 backdrop-blur-sm shadow-lg shadow-slate-900/50 p-6`}>
      <CardHeader className="p-0 mb-4">
        <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-white">{review.author}</CardTitle>
            <div className="flex items-center gap-2 text-xs text-gray-400">
                <PlatformIcon platform={review.platform} />
                <span>via {review.platform}</span>
            </div>
        </div>
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < review.rating ? `text-yellow-400 fill-yellow-400` : `text-gray-600`}`} />
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        <p className="text-gray-300 italic">"{review.text}"</p>
      </CardContent>
    </Card>
  </motion.div>
);

const CustomerReviews = () => {
  return (
    <div className="py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl">Ce que Nos Investisseurs Disent</h2>
        <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">La confiance de notre communauté est notre plus grande réussite.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;