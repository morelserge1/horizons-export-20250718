import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, TrendingUp, BarChart, Lock, BrainCircuit, Clock4, Users, Send, Menu, X, Activity, Shield, Cpu, Database, Wifi, Eye } from 'lucide-react';
import Ticker from '@/components/Ticker';
import InvestmentPlans from '@/components/InvestmentPlans';
import CustomerReviews from '@/components/CustomerReviews';
import LiveTrading from '@/components/LiveTrading';

const Section = ({ children, className = '' }) => (
  <section className={`py-16 sm:py-24 lg:py-32 ${className}`}>{children}</section>
);

const TechParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="particle absolute animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 3}s`
        }}
      />
    ))}
  </div>
);

const MatrixBackground = () => (
  <div className="matrix-bg">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="matrix-char"
        style={{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${8 + Math.random() * 4}s`
        }}
      >
        {String.fromCharCode(0x30A0 + Math.random() * 96)}
      </div>
    ))}
  </div>
);

const LandingScreen = ({ onLoginRequired }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const handleScrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    }

  return (
    <div className="tech-bg text-white overflow-x-hidden min-h-screen">
      <MatrixBackground />
      <TechParticles />
      
      <header className="fixed top-0 left-0 w-full z-50 glass-card border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl sm:text-3xl font-bold gradient-text-primary font-mono glitch"
            >
              ⚡ CryptoBoost
            </motion.h1>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => handleScrollTo('plans')} className="text-cyan-300 hover:text-cyan-100 transition-all duration-300 hover:neon-glow font-medium">
                Plans
              </button>
              <button onClick={() => handleScrollTo('how-it-works')} className="text-cyan-300 hover:text-cyan-100 transition-all duration-300 hover:neon-glow font-medium">
                Technologie
              </button>
              <button onClick={() => handleScrollTo('reviews')} className="text-cyan-300 hover:text-cyan-100 transition-all duration-300 hover:neon-glow font-medium">
                Communauté
              </button>
              <Button onClick={onLoginRequired} className="btn-tech px-6 py-2 font-semibold">
                <Activity className="w-4 h-4 mr-2" />
                Connexion
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 glass-card rounded-lg neon-border"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-300" /> : <Menu className="w-6 h-6 text-cyan-300" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-cyan-500/20 pt-4 glass-card-dark rounded-lg"
            >
              <div className="flex flex-col space-y-4 p-4">
                <button onClick={() => handleScrollTo('plans')} className="text-left text-cyan-300 hover:text-cyan-100 transition-colors font-medium">
                  Plans d'Investissement
                </button>
                <button onClick={() => handleScrollTo('how-it-works')} className="text-left text-cyan-300 hover:text-cyan-100 transition-colors font-medium">
                  Technologie IA
                </button>
                <button onClick={() => handleScrollTo('reviews')} className="text-left text-cyan-300 hover:text-cyan-100 transition-colors font-medium">
                  Communauté
                </button>
                <Button onClick={onLoginRequired} className="w-full btn-tech">
                  <Activity className="w-4 h-4 mr-2" />
                  Accéder à la Plateforme
                </Button>
              </div>
            </motion.nav>
          )}
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <Section className="relative min-h-screen flex items-center pt-20 cyber-grid">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
          
          {/* Floating Tech Elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 neon-border rounded-full animate-float opacity-20"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 neon-border rounded-lg animate-float opacity-30" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 neon-border rounded-full animate-float opacity-25" style={{animationDelay: '4s'}}></div>
          
          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 glass-card rounded-full border border-cyan-500/30 mb-6">
                <Wifi className="w-4 h-4 text-green-400 mr-2 status-online" />
                <span className="text-sm font-mono text-cyan-300">SYSTÈME ACTIF • 24/7 TRADING</span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 tracking-tight leading-tight"
            >
              <span className="block gradient-text-primary font-mono">CRYPTO</span>
              <span className="block text-white">ARBITRAGE</span>
              <span className="block gradient-text-success neon-text">AUTOMATION</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-4xl mx-auto text-lg sm:text-xl md:text-2xl text-cyan-100 mb-10 px-4 leading-relaxed"
            >
              <span className="font-mono text-cyan-300">[SYSTÈME IA]</span> Exploitez les écarts de prix crypto avec nos algorithmes haute fréquence. 
              <span className="gradient-text-success font-semibold"> Rendements automatisés 24h/24</span> sans intervention humaine.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-6 px-4 mb-12"
            >
              <Button 
                size="lg" 
                className="btn-tech px-8 py-4 text-lg font-bold neon-border animate-pulse-neon" 
                onClick={() => handleScrollTo('plans')}
              >
                <Zap className="w-5 h-5 mr-2" />
                ACTIVER BOT TRADING
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="glass-card border-cyan-500/50 hover:border-cyan-300 text-cyan-100 px-8 py-4 text-lg font-semibold" 
                onClick={() => handleScrollTo('how-it-works')}
              >
                <Eye className="w-5 h-5 mr-2" />
                VOIR LA TECH
              </Button>
            </motion.div>

            {/* Stats Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {[
                { label: "TRADERS ACTIFS", value: "500+", icon: <Users className="w-6 h-6" />, color: "text-cyan-400" },
                { label: "UPTIME SYSTÈME", value: "99.9%", icon: <Activity className="w-6 h-6" />, color: "text-green-400" },
                { label: "TRADES/SECONDE", value: "1,200", icon: <Cpu className="w-6 h-6" />, color: "text-purple-400" }
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6 rounded-xl neon-border text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-black/30 mb-3 ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className={`text-2xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                  <div className="data-bar mt-2"></div>
                </div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* Tech Features */}
        <Section className="bg-black/20">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
                <span className="gradient-text-primary font-mono">TECHNOLOGIE</span> DE POINTE
              </h2>
              <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
                Infrastructure haute performance pour l'arbitrage crypto automatisé
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  icon: <Shield className="w-12 h-12 text-cyan-400"/>, 
                  title: "SÉCURITÉ MILITAIRE", 
                  desc: "Chiffrement AES-256, authentification multi-facteurs, fonds sécurisés sur exchanges régulés.",
                  tech: "ENCRYPTION • MFA • COLD STORAGE"
                },
                { 
                  icon: <Cpu className="w-12 h-12 text-purple-400"/>, 
                  title: "IA PRÉDICTIVE", 
                  desc: "Algorithmes d'apprentissage automatique analysant 50+ indicateurs en temps réel.",
                  tech: "MACHINE LEARNING • NEURAL NETWORKS"
                },
                { 
                  icon: <Activity className="w-12 h-12 text-green-400"/>, 
                  title: "EXÉCUTION ULTRA-RAPIDE", 
                  desc: "Latence sub-milliseconde, connexions directes aux exchanges, arbitrage haute fréquence.",
                  tech: "HFT • LOW LATENCY • API DIRECT"
                },
                { 
                  icon: <Database className="w-12 h-12 text-yellow-400"/>, 
                  title: "BIG DATA ANALYTICS", 
                  desc: "Traitement de millions de points de données, détection d'opportunités en temps réel.",
                  tech: "REAL-TIME • PATTERN RECOGNITION"
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="group"
                >
                  <Card className="h-full glass-card neon-border p-8 text-center hover:neon-glow transition-all duration-500 group-hover:scale-105">
                    <div className="mb-6 inline-block p-4 glass-card-dark rounded-full animate-float">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-white font-mono">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">{item.desc}</p>
                    <div className="text-xs font-mono text-cyan-400 bg-black/30 px-3 py-1 rounded-full inline-block">
                      {item.tech}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <div id="plans">
          <InvestmentPlans onLoginRequired={onLoginRequired} />
        </div>

        <div id="how-it-works">
          <LiveTrading/>
        </div>

        {/* Algorithm Visualization */}
        <Section className="bg-gradient-to-b from-black/40 to-black/60">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
                <span className="gradient-text-primary font-mono">ALGORITHME</span> EN ACTION
              </h2>
            </motion.div>

            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-30"></div>
              <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {[
                  { 
                    step: "01", 
                    title: "SCAN MULTI-EXCHANGE", 
                    desc: "Surveillance simultanée de 15+ plateformes crypto majeures",
                    icon: <Database className="w-8 h-8" />
                  },
                  { 
                    step: "02", 
                    title: "DÉTECTION OPPORTUNITÉS", 
                    desc: "IA identifie les écarts de prix rentables en <100ms",
                    icon: <Eye className="w-8 h-8" />
                  },
                  { 
                    step: "03", 
                    title: "EXÉCUTION AUTOMATIQUE", 
                    desc: "Achat/vente simultané sur exchanges différents",
                    icon: <Zap className="w-8 h-8" />
                  },
                  { 
                    step: "04", 
                    title: "PROFIT SÉCURISÉ", 
                    desc: "Bénéfices transférés instantanément sur votre compte",
                    icon: <TrendingUp className="w-8 h-8" />
                  },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.5 }}
                    className="text-center relative"
                  >
                    <div className="mb-6 w-20 h-20 mx-auto glass-card neon-border rounded-full flex items-center justify-center text-2xl font-bold font-mono gradient-text-primary animate-pulse-neon">
                      {step.step}
                    </div>
                    <div className="mb-4 text-cyan-400">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-white font-mono">{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed text-sm">{step.desc}</p>
                    <div className="data-bar mt-4"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>
        
        <div id="reviews">
          <CustomerReviews />
        </div>
      </main>

      <footer className="glass-card border-t border-cyan-500/20 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-3xl font-bold gradient-text-primary mb-6 font-mono">⚡ CryptoBoost</p>
          <p className="text-cyan-200 mb-8 text-lg">Rejoignez notre communauté de traders automatisés</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
            <Button asChild className="btn-tech px-6 py-3">
              <a href="https://t.me/louis_botcrypto" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Send className="w-5 h-5 mr-2 text-cyan-300" /> 
                <span className="font-semibold">Trading Bot Channel</span>
              </a>
            </Button>
            <Button asChild className="btn-tech px-6 py-3">
              <a href="https://t.me/direction_ltd_crypto67" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Send className="w-5 h-5 mr-2 text-purple-300" /> 
                <span className="font-semibold">Support Expert</span>
              </a>
            </Button>
          </div>
          <div className="text-xs text-gray-500 font-mono">
            &copy; {new Date().getFullYear()} CryptoBoost • Technologie d'arbitrage automatisé
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingScreen;