import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const newsItems = [
    { id: 1, source: 'CoinDesk', title: 'Bitcoin dépasse les 70 000$ alors que les investisseurs institutionnels affluent.' },
    { id: 2, source: 'Bloomberg', title: 'La SEC approuve un nouvel ETF Ethereum, le marché réagit positivement.' },
    { id: 3, source: 'Reuters', title: 'Analyse : La tokenisation des actifs réels pourrait être le prochain grand catalyseur crypto.' },
    { id: 4, source: 'The Block', title: 'Les volumes sur les exchanges décentralisés (DEX) atteignent un nouveau record mensuel.' },
];

const LiveTrading = () => {
    const [isWidgetLoaded, setWidgetLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
            if (window.TradingView && document.getElementById('tradingview-widget-container__widget')) {
                new window.TradingView.widget({
                    "autosize": true,
                    "symbol": "BITSTAMP:BTCUSD",
                    "interval": "D",
                    "timezone": "Etc/UTC",
                    "theme": "dark",
                    "style": "1",
                    "locale": "fr",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "withdateranges": true,
                    "hide_side_toolbar": false,
                    "allow_symbol_change": true,
                    "container_id": "tradingview-widget-container__widget"
                });
                setWidgetLoaded(true);
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="container mx-auto px-4 py-8 sm:py-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
                <Card className="h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl text-white flex items-center">
                          <TrendingUp className="mr-2 text-purple-400 w-5 h-5 sm:w-6 sm:h-6" /> 
                          Graphique de Trading en Direct
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base text-gray-400">
                          Analyse technique en temps réel pour BTC/USD.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-80px)] sm:h-[calc(100%-100px)] p-0">
                         {!isWidgetLoaded && <div className="w-full h-full flex items-center justify-center text-gray-400">Chargement du graphique...</div>}
                        <div id="tradingview-widget-container" className="h-full">
                            <div id="tradingview-widget-container__widget" className="h-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl text-white">Actualités du Marché</CardTitle>
                         <CardDescription className="text-sm sm:text-base text-gray-400">
                           Les dernières informations qui influencent les marchés.
                         </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                           {newsItems.map((item, index) => (
                               <motion.li 
                                   key={item.id}
                                   initial={{ opacity: 0, x: 20 }}
                                   animate={{ opacity: 1, x: 0 }}
                                   transition={{ delay: index * 0.1 }}
                                   className="border-l-4 border-purple-500 pl-3 sm:pl-4 py-2 hover:bg-slate-800/50 rounded-r-lg transition-colors"
                                >
                                    <p className="font-semibold text-white text-xs sm:text-sm leading-relaxed">{item.title}</p>
                                    <p className="text-xs text-purple-400 mt-1">{item.source}</p>
                                </motion.li>
                           ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
          </div>
        </motion.div>
    );
};

export default LiveTrading;