import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, Activity, Cpu, Database, Zap, Eye, BarChart3, Target } from 'lucide-react';

const newsItems = [
    { 
        id: 1, 
        source: 'ALGORITHM ALERT', 
        title: 'Opportunité détectée: BTC/ETH spread 2.3% sur Binance-Coinbase',
        type: 'opportunity',
        time: '12:34:56',
        profit: '+€234'
    },
    { 
        id: 2, 
        source: 'EXECUTION ENGINE', 
        title: 'Trade exécuté: Arbitrage SOL/USDT - Profit réalisé en 0.8s',
        type: 'execution',
        time: '12:33:21',
        profit: '+€156'
    },
    { 
        id: 3, 
        source: 'MARKET SCANNER', 
        title: 'Analyse: Volatilité élevée détectée sur 12 paires - Opportunités multiples',
        type: 'analysis',
        time: '12:32:45',
        profit: 'SCANNING'
    },
    { 
        id: 4, 
        source: 'RISK MANAGEMENT', 
        title: 'Seuil de sécurité: Positions ajustées automatiquement - Risque optimisé',
        type: 'security',
        time: '12:31:12',
        profit: 'SECURED'
    },
];

const tradingMetrics = [
    { label: 'TRADES ACTIFS', value: '47', icon: <Activity className="w-5 h-5" />, color: 'text-cyan-400' },
    { label: 'PROFIT/HEURE', value: '€1,247', icon: <TrendingUp className="w-5 h-5" />, color: 'text-green-400' },
    { label: 'PRÉCISION IA', value: '94.7%', icon: <Target className="w-5 h-5" />, color: 'text-purple-400' },
    { label: 'LATENCE MOY.', value: '0.3ms', icon: <Zap className="w-5 h-5" />, color: 'text-yellow-400' },
];

const LiveTrading = () => {
    const [isWidgetLoaded, setWidgetLoaded] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
            if (window.TradingView && document.getElementById('tradingview-widget-container__widget')) {
                new window.TradingView.widget({
                    "autosize": true,
                    "symbol": "BITSTAMP:BTCUSD",
                    "interval": "1",
                    "timezone": "Etc/UTC",
                    "theme": "dark",
                    "style": "1",
                    "locale": "fr",
                    "toolbar_bg": "#0a0a0f",
                    "enable_publishing": false,
                    "withdateranges": true,
                    "hide_side_toolbar": false,
                    "allow_symbol_change": true,
                    "container_id": "tradingview-widget-container__widget",
                    "backgroundColor": "#0a0a0f",
                    "gridColor": "rgba(0, 255, 255, 0.1)",
                    "studies": [
                        "Volume@tv-basicstudies",
                        "MACD@tv-basicstudies"
                    ]
                });
                setWidgetLoaded(true);
            }
        };
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        }
    }, []);

    const getNewsIcon = (type) => {
        switch(type) {
            case 'opportunity': return <Eye className="w-4 h-4 text-cyan-400" />;
            case 'execution': return <Zap className="w-4 h-4 text-green-400" />;
            case 'analysis': return <BarChart3 className="w-4 h-4 text-purple-400" />;
            case 'security': return <Database className="w-4 h-4 text-yellow-400" />;
            default: return <Activity className="w-4 h-4 text-gray-400" />;
        }
    };

    const getNewsColor = (type) => {
        switch(type) {
            case 'opportunity': return 'border-cyan-500/30';
            case 'execution': return 'border-green-500/30';
            case 'analysis': return 'border-purple-500/30';
            case 'security': return 'border-yellow-500/30';
            default: return 'border-gray-500/30';
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="container mx-auto px-4 py-16 bg-gradient-to-b from-black/20 to-black/40"
        >
            {/* Header */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
                    <span className="gradient-text-primary font-mono">TRADING</span> EN TEMPS RÉEL
                </h2>
                <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
                    Observez nos algorithmes IA en action. Analyse de marché, détection d'opportunités et exécution automatique.
                </p>
            </motion.div>

            {/* Real-time Metrics */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
                {tradingMetrics.map((metric, i) => (
                    <div key={i} className="glass-card p-4 rounded-xl neon-border text-center">
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 mb-2 ${metric.color}`}>
                            {metric.icon}
                        </div>
                        <div className={`text-xl font-bold font-mono ${metric.color}`}>{metric.value}</div>
                        <div className="text-xs text-gray-400 font-mono">{metric.label}</div>
                        <div className="data-bar mt-2"></div>
                    </div>
                ))}
            </motion.div>

            {/* System Status */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-card p-4 rounded-xl neon-border mb-8"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 font-mono font-bold">SYSTÈME ACTIF</span>
                        </div>
                        <div className="text-gray-400 font-mono text-sm">
                            {currentTime.toLocaleTimeString('fr-FR')}
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-mono">
                        <span className="text-cyan-400">15 EXCHANGES CONNECTÉS</span>
                        <span className="text-purple-400">AI SCANNING</span>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Trading Chart */}
                <div className="lg:col-span-2">
                    <Card className="h-[500px] lg:h-[700px] glass-card neon-border backdrop-blur-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl text-white flex items-center font-mono">
                                <BarChart3 className="mr-3 text-cyan-400 w-6 h-6" /> 
                                ANALYSE TECHNIQUE • BTC/USD
                            </CardTitle>
                            <CardDescription className="text-cyan-200 font-mono">
                                Graphique haute fréquence avec indicateurs IA intégrés
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="h-[calc(100%-100px)] p-0 relative">
                            {!isWidgetLoaded && (
                                <div className="w-full h-full flex flex-col items-center justify-center text-cyan-400">
                                    <Cpu className="w-12 h-12 mb-4 animate-spin" />
                                    <div className="font-mono">CHARGEMENT DONNÉES MARCHÉ...</div>
                                    <div className="loading-shimmer w-32 h-2 rounded mt-4"></div>
                                </div>
                            )}
                            <div id="tradingview-widget-container" className="h-full">
                                <div id="tradingview-widget-container__widget" className="h-full" />
                            </div>
                            
                            {/* Overlay indicators */}
                            <div className="absolute top-4 right-4 glass-card-dark p-3 rounded-lg">
                                <div className="text-xs font-mono text-cyan-400 mb-1">SIGNAL IA</div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-green-400 font-mono font-bold text-sm">BULLISH</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Trading Activity Feed */}
                <div>
                    <Card className="glass-card neon-border backdrop-blur-sm h-[500px] lg:h-[700px] flex flex-col">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl text-white font-mono flex items-center">
                                <Activity className="mr-3 text-purple-400 w-6 h-6" />
                                ACTIVITÉ ALGORITHME
                            </CardTitle>
                            <CardDescription className="text-cyan-200 font-mono">
                                Feed en temps réel des actions de trading automatisé
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-hidden">
                            <div className="space-y-4 h-full overflow-y-auto">
                                {newsItems.map((item, index) => (
                                    <motion.div 
                                        key={item.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`glass-card-dark p-4 rounded-lg border-l-4 ${getNewsColor(item.type)} hover:neon-glow transition-all duration-300`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                {getNewsIcon(item.type)}
                                                <span className="text-xs font-mono text-cyan-400 font-bold">
                                                    {item.source}
                                                </span>
                                            </div>
                                            <div className="text-xs font-mono text-gray-400">
                                                {item.time}
                                            </div>
                                        </div>
                                        <p className="text-white text-sm leading-relaxed mb-2">
                                            {item.title}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="data-bar w-16"></div>
                                            <span className={`text-xs font-mono font-bold ${
                                                item.profit.startsWith('+') ? 'text-green-400' : 
                                                item.profit === 'SCANNING' ? 'text-cyan-400' :
                                                'text-yellow-400'
                                            }`}>
                                                {item.profit}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Performance Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 glass-card p-6 rounded-xl neon-border"
            >
                <div className="text-center">
                    <h3 className="text-xl font-bold text-white font-mono mb-4">
                        PERFORMANCE SYSTÈME • DERNIÈRES 24H
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                        {[
                            { label: 'TRADES EXÉCUTÉS', value: '2,847', color: 'text-cyan-400' },
                            { label: 'TAUX DE RÉUSSITE', value: '94.7%', color: 'text-green-400' },
                            { label: 'PROFIT TOTAL', value: '€29,847', color: 'text-purple-400' },
                            { label: 'TEMPS MOYEN', value: '0.8s', color: 'text-yellow-400' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className={`text-2xl font-bold font-mono ${stat.color}`}>
                                    {stat.value}
                                </div>
                                <div className="text-xs text-gray-400 font-mono">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default LiveTrading;