import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, TrendingUp, BarChart, Lock, BrainCircuit, Clock4, Users, Send } from 'lucide-react';
import Ticker from '@/components/Ticker';
import InvestmentPlans from '@/components/InvestmentPlans';
import CustomerReviews from '@/components/CustomerReviews';
import LiveTrading from '@/components/LiveTrading';

const Section = ({ children, className = '' }) => (
  <section className={`py-20 sm:py-28 ${className}`}>{children}</section>
);

const LandingScreen = ({ onLoginRequired }) => {
    const handleScrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

  return (
    <div className="bg-slate-900 text-white overflow-x-hidden">
      <header className="absolute top-0 left-0 w-full z-30 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
             <h1 className="text-2xl font-bold gradient-text">CryptoBoost</h1>
             <Button onClick={onLoginRequired}>Connexion</Button>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <Section className="relative min-h-screen flex items-center bg-grid-slate-800/[0.2]">
             <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-900"></div>
            <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan-400/20 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight"
            >
              💹 Investissez plus intelligemment avec les bots d’arbitrage <span className="gradient-text">Crypto Boost</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-10"
            >
              Boostez vos revenus passifs grâce à nos bots crypto intelligents, qui exploitent les écarts de prix entre plateformes 24h/24, 7j/7 — automatiquement, sans expertise requise.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center gap-4 flex-wrap"
            >
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold" onClick={() => handleScrollTo('plans')}>
                👉 Lancer mon premier bot
              </Button>
              <Button size="lg" variant="outline" className="border-slate-700 bg-slate-800/50 hover:bg-slate-800" onClick={() => handleScrollTo('how-it-works')}>
                Découvrir comment ça marche
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex items-center justify-center gap-2 text-green-400"
            >
              <Users className="w-5 h-5" />
              <p className="text-gray-300 text-sm">
                +500 investisseurs actifs. <span className="font-semibold text-white">Rejoignez les 30-40 nouveaux membres de ce mois.</span>
              </p>
            </motion.div>
          </div>
        </Section>

        {/* En une phrase */}
        <Section className="bg-slate-900/50">
          <div className="container mx-auto px-4 text-center">
             <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-10"
            >
                Crypto Boost, c’est une solution d’investissement automatisée basée sur l’arbitrage crypto, une stratégie éprouvée qui consiste à acheter sur une plateforme au prix le plus bas et vendre sur une autre au prix le plus haut — en quelques secondes.
            </motion.p>
             <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-6 md:gap-8"
            >
                {["100% automatisé", "Rendements réguliers", "Risques contrôlés", "Convient aux débutants"].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-lg text-green-400">
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-semibold text-gray-200">{item}</span>
                    </div>
                ))}
            </motion.div>
          </div>
        </Section>

        <div id="plans">
          <InvestmentPlans onLoginRequired={onLoginRequired} />
        </div>

        {/* Pourquoi choisir Crypto Boost */}
        <Section className="bg-slate-900/50">
          <div className="container mx-auto px-4">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
              <h2 className="text-4xl font-extrabold text-white sm:text-5xl">Pourquoi des centaines d’investisseurs ont déjà adopté nos bots d’arbitrage ?</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { icon: <Lock className="w-10 h-10 text-green-400"/>, title: "Sécurité & transparence", desc: "Vos fonds restent sur votre compte exchange. Nos bots ne peuvent ni retirer, ni déplacer votre argent." },
                    { icon: <BarChart className="w-10 h-10 text-blue-400"/>, title: "Performance mesurée", desc: "Des stratégies testées sur des milliers de transactions. Vous voyez vos résultats en temps réel." },
                    { icon: <BrainCircuit className="w-10 h-10 text-purple-400"/>, title: "Technologie intelligente", desc: "Nos algorithmes repèrent instantanément les écarts de prix les plus rentables entre plateformes." },
                    { icon: <Clock4 className="w-10 h-10 text-yellow-400"/>, title: "Automatisation totale", desc: "Installez, connectez, laissez faire. Gagnez du temps, réduisez le stress du trading manuel." },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15, duration: 0.5 }}
                    >
                        <Card className="h-full bg-slate-800/40 border-slate-700/50 p-6 text-center">
                            <div className="mb-4 inline-block p-4 bg-slate-700/50 rounded-full">{item.icon}</div>
                            <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                            <p className="text-gray-400">{item.desc}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>
          </div>
        </Section>
        
        <div id="how-it-works">
            <LiveTrading/>
        </div>

        {/* Comment ça marche */}
        <Section>
            <div className="container mx-auto px-4">
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-extrabold text-white sm:text-5xl">Comment ça fonctionne, concrètement ?</h2>
                </motion.div>
                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-700/50" aria-hidden="true"></div>
                    <div className="relative grid md:grid-cols-4 gap-12">
                        {[
                            { title: "Créez votre compte", desc: "Un email et un mot de passe suffisent pour commencer votre aventure." },
                            { title: "Connectez votre plateforme", desc: "Via API sécurisée (Binance, Kraken, etc.). Simple et rapide." },
                            { title: "Activez votre bot", desc: "Choisissez une stratégie ou laissez notre IA optimiser pour vous." },
                            { title: "Suivez vos gains", desc: "Tableau de bord simple et transparent. Retirez à tout moment." },
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2, duration: 0.5 }}
                                className="text-center"
                            >
                                <div className="mb-4 w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl font-bold shadow-lg">
                                    {i + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                                <p className="text-gray-400">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
        
        <CustomerReviews />

      </main>

      <footer className="bg-slate-900/80 border-t border-slate-800 py-12">
          <div className="container mx-auto px-4 text-center">
              <p className="text-2xl font-bold gradient-text mb-4">CryptoBoost</p>
              <p className="text-gray-400 mb-6">Rejoignez-nous sur Telegram pour les dernières mises à jour.</p>
              <div className="flex justify-center gap-4">
                 <Button asChild variant="ghost" className="bg-white/10 hover:bg-white/20 text-white rounded-full px-4 py-2 transition-all duration-300 shadow-lg backdrop-blur-sm border border-cyan-300/20 hover:border-cyan-300/50">
                  <a href="https://t.me/louis_botcrypto" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Send className="w-4 h-4 mr-2 text-cyan-300" /> Telegram Bot
                  </a>
                </Button>
                <Button asChild variant="ghost" className="bg-white/10 hover:bg-white/20 text-white rounded-full px-4 py-2 transition-all duration-300 shadow-lg backdrop-blur-sm border border-purple-300/20 hover:border-purple-300/50">
                  <a href="https://t.me/direction_ltd_crypto67" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Send className="w-4 h-4 mr-2 text-purple-300" /> Conseiller
                  </a>
                </Button>
              </div>
               <p className="text-xs text-gray-500 mt-8">&copy; {new Date().getFullYear()} CryptoBoost. Tous droits réservés.</p>
          </div>
      </footer>
    </div>
  );
};

export default LandingScreen;