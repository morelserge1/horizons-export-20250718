import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Users, Wallet, ShieldCheck, Zap, Newspaper, LogOut, MessageSquare as MessageSquareQuote, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CryptoWallet from '@/components/CryptoWallet';
import AdminPanel from '@/components/AdminPanel';
import InvestmentPlans from '@/components/InvestmentPlans';
import LiveTrading from '@/components/LiveTrading';
import Ticker from '@/components/Ticker';
import CustomerReviews from '@/components/CustomerReviews';

const Dashboard = ({ user, logout, allUsers, updateUser, deleteUser, banUser, promoteUser }) => {
  const [activeTab, setActiveTab] = useState('wallet');
  const [totalInvested, setTotalInvested] = useState(0);
  const [displayedTotalCapital, setDisplayedTotalCapital] = useState(user.totalCapital || 0);

  const refreshData = useCallback(() => {
    const investments = JSON.parse(localStorage.getItem('investments') || '[]');
    const approvedInvestments = investments.filter(inv => inv.status === 'approved');
    const total = approvedInvestments.reduce((sum, inv) => sum + inv.price, 0);
    setTotalInvested(total);
  }, []);

  useEffect(() => {
    refreshData();
  }, [allUsers, refreshData]);

  const handleDataUpdate = useCallback(() => {
    refreshData();
  }, [refreshData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  useEffect(() => {
    const PROFIT_DURATION = 4 * 60 * 60 * 1000;
    const interval = setInterval(() => {
      const allInvestments = JSON.parse(localStorage.getItem('investments') || '[]');
      const userInvestments = allInvestments.filter(inv => inv.userEmail === user.email);
      
      const completedBenefits = userInvestments
        .filter(inv => inv.isComplete)
        .reduce((sum, inv) => sum + (inv.finalProfitTarget || 0), 0);

      let currentDynamicBenefits = 0;
      userInvestments.forEach(inv => {
        if (inv.status === 'approved' && inv.approvalDate && !inv.isComplete) {
          const approvalTime = new Date(inv.approvalDate).getTime();
          const now = new Date().getTime();
          const elapsedTime = now - approvalTime;
          
          if (elapsedTime < PROFIT_DURATION) {
            const timeRatio = elapsedTime / PROFIT_DURATION;
            const baseProfit = timeRatio * (inv.finalProfitTarget || 0);
            const fluctuation = (Math.random() - 0.5) * baseProfit * 0.05;
            currentDynamicBenefits += Math.max(0, baseProfit + fluctuation);
          }
        }
      });
      
      setDisplayedTotalCapital((user.capital || 0) + completedBenefits + currentDynamicBenefits);
    }, 2000);

    return () => clearInterval(interval);
  }, [user.email, user.capital]);

  return (
    <div className="min-h-screen bg-grid-slate-800/[0.2] bg-slate-900">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 gradient-text">CryptoBoost</h1>
              <p className="text-sm sm:text-base text-gray-300">Bienvenue, {user.email}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
               <Button asChild variant="ghost" size="sm" className="bg-white/10 hover:bg-white/20 text-white rounded-full px-3 sm:px-4 py-2 transition-all duration-300 shadow-lg backdrop-blur-sm border border-cyan-300/20 hover:border-cyan-300/50 text-xs sm:text-sm">
                  <a href="https://t.me/louis_botcrypto" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-cyan-300" /> 
                    <span className="hidden sm:inline">Telegram Bot</span>
                    <span className="sm:hidden">Bot</span>
                  </a>
                </Button>
                <Button asChild variant="ghost" size="sm" className="bg-white/10 hover:bg-white/20 text-white rounded-full px-3 sm:px-4 py-2 transition-all duration-300 shadow-lg backdrop-blur-sm border border-purple-300/20 hover:border-purple-300/50 text-xs sm:text-sm">
                  <a href="https://t.me/direction_ltd_crypto67" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-purple-300" /> 
                    <span className="hidden sm:inline">Conseiller</span>
                    <span className="sm:hidden">Support</span>
                  </a>
                </Button>
              <Button onClick={logout} variant="destructive" size="icon" className="rounded-full w-8 h-8 sm:w-10 sm:h-10">
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </motion.header>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <TabsList className="h-auto bg-slate-800/50 border-slate-700 w-full grid grid-cols-2 sm:flex sm:flex-wrap justify-center p-1 gap-1">
             <TabsTrigger value="wallet" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs sm:text-sm px-2 sm:px-4 py-2">
              <Wallet className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Portefeuille</span>
              <span className="sm:hidden">Wallet</span>
            </TabsTrigger>
            <TabsTrigger value="plans" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs sm:text-sm px-2 sm:px-4 py-2">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Plans
            </TabsTrigger>
             <TabsTrigger value="reviews" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs sm:text-sm px-2 sm:px-4 py-2">
              <MessageSquareQuote className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Avis
            </TabsTrigger>
            <TabsTrigger value="trading" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs sm:text-sm px-2 sm:px-4 py-2">
              <Newspaper className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Trading
            </TabsTrigger>
            {user.role === 'admin' && (
              <TabsTrigger value="admin" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs sm:text-sm px-2 sm:px-4 py-2 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Admin
              </TabsTrigger>
            )}
          </TabsList>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
          >
            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-500/30 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-green-300">Total Investi (Approuvé)</CardTitle>
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{formatCurrency(totalInvested)}</div>
                <p className="text-xs sm:text-sm text-green-400/80">Sur tous les plans actifs</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border-blue-500/30 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-blue-300">Capital Total (Vous)</CardTitle>
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">{formatCurrency(displayedTotalCapital)}</div>
                <p className="text-xs sm:text-sm text-blue-400/80">Capital + Bénéfices</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-purple-500/30 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6">
                <CardTitle className="text-xs sm:text-sm font-medium text-purple-300">Investisseurs Actifs</CardTitle>
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold">>500</div>
                <p className="text-xs sm:text-sm text-purple-400/80">+30-40 nouveaux chaque mois</p>
              </CardContent>
            </Card>
          </motion.div>

          <Ticker />
          
           <TabsContent value="wallet">
            <CryptoWallet user={user} updateUser={updateUser} onDataUpdate={handleDataUpdate}/>
          </TabsContent>

          <TabsContent value="plans">
            <InvestmentPlans onInvestment={handleDataUpdate} user={user} onLoginRequired={() => {}} updateUser={updateUser} />
          </TabsContent>

          <TabsContent value="reviews">
            <CustomerReviews />
          </TabsContent>

          <TabsContent value="trading">
            <LiveTrading />
          </TabsContent>
          
          {user.role === 'admin' && (
            <TabsContent value="admin">
              <AdminPanel 
                onUpdate={handleDataUpdate} 
                allUsers={allUsers}
                updateUser={updateUser}
                deleteUser={deleteUser}
                banUser={banUser}
                promoteUser={promoteUser}
                currentUser={user}
              />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;