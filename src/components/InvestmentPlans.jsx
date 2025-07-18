import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, BarChart, TrendingUp, Zap, Copy, Check, Clock, Wallet } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const plans = [
  { name: "Plan Starter", price: 250, profitTarget: 6900, profitRange: "250€ ~ 2500/3000€", features: ["Gains générés sur 4h", "Support par email", "Rapport personnalisé"], icon: <BarChart className="w-8 h-8 text-blue-400" />, color: "blue", },
  { name: "Plan Pro", price: 500, profitTarget: 10900, profitRange: "500€ ~ 5000/5500€", features: ["Gains générés sur 4h", "Support prioritaire", "Analyses de marché", "Webinaires exclusifs"], icon: <TrendingUp className="w-8 h-8 text-purple-400" />, color: "purple", popular: true, },
  { name: "Plan Expert", price: 1000, profitTarget: 16900, profitRange: "1000€ ~ 7500/8500€", features: ["Gains générés sur 4h", "Accès API", "Conseiller personnel", "Stratégies personnalisées"], icon: <Zap className="w-8 h-8 text-yellow-400" />, color: "yellow", },
];

const cryptoPrices = { BTC: 60000, ETH: 3000, SOL: 150 };

const PlanCard = ({ plan, index, onSelectPlan }) => (
  <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15, duration: 0.5 }}>
    <Card className={`relative flex flex-col h-full bg-slate-900/50 border-2 border-slate-800 backdrop-blur-sm hover:border-${plan.color}-500 hover:scale-105 transition-all duration-300 shadow-2xl shadow-slate-900/50`}>
      {plan.popular && <div className="absolute -top-3 right-5 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">POPULAIRE</div>}
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-slate-700/50 rounded-full">{plan.icon}</div>
        <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
        <CardDescription className="text-gray-400">Bénéfice cible : <span className={`font-semibold text-${plan.color}-400`}>{plan.profitRange}</span></CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="text-center">
          <span className="text-4xl font-extrabold text-white">{plan.price}€</span>
          <span className="text-gray-400"> / investissement</span>
        </div>
        <ul className="space-y-3 text-gray-300">
          {plan.features.map((feature, i) => ( <li key={i} className="flex items-center"> <CheckCircle className={`w-5 h-5 mr-3 text-${plan.color}-400 shrink-0`} /> <span>{feature}</span> </li> ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onSelectPlan(plan)} className={`w-full bg-gradient-to-r from-${plan.color}-600 to-${plan.color}-500 hover:from-${plan.color}-700 hover:to-${plan.color}-600 text-white font-bold py-3 text-base`}>
          Choisir ce Plan
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const InvestmentPlans = ({ onInvestment, user, onLoginRequired, updateUser }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [copied, setCopied] = useState(false);
  const [depositAddresses, setDepositAddresses] = useState({});
  const [activeTab, setActiveTab] = useState('BTC');
  const [paymentMethod, setPaymentMethod] = useState('deposit');

  useEffect(() => {
    const storedAddresses = JSON.parse(localStorage.getItem('depositAddresses'));
    if (storedAddresses) {
      setDepositAddresses(storedAddresses);
    }
  }, [selectedPlan]);
  
  const handleSelectPlan = (plan) => {
    if (user) {
      setSelectedPlan(plan);
      setPaymentMethod('deposit');
    } else {
      onLoginRequired();
    }
  };

  const cryptoAmount = selectedPlan ? (selectedPlan.price / cryptoPrices[activeTab]) : 0;
  const currentAddress = depositAddresses[activeTab] || '';

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(currentAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copié !", description: "L'adresse de dépôt a été copiée." });
  };
  
  const handleConfirmInvestment = () => {
    const investments = JSON.parse(localStorage.getItem('investments') || '[]');
    let paymentDetails = {};
    let updatedUser;
    
    if (paymentMethod === 'capital') {
      if ((user.totalCapital || 0) < selectedPlan.price) {
        toast({ variant: 'destructive', title: 'Capital Total insuffisant', description: 'Votre capital total est insuffisant pour ce plan.' });
        return;
      }
      updatedUser = { 
        ...user, 
        investedCapital: (user.investedCapital || 0) + selectedPlan.price,
      };
      paymentDetails = {
        cryptoType: 'EUR',
        cryptoAmount: selectedPlan.price,
        paidWith: 'capital'
      };
      toast({ title: "Investissement réussi!", description: "Le montant a été alloué depuis votre capital total." });
    } else {
        updatedUser = {
            ...user,
            investedCapital: (user.investedCapital || 0) + selectedPlan.price,
            totalCapital: (user.totalCapital || 0) + selectedPlan.price,
            totalDeposited: (user.totalDeposited || 0) + selectedPlan.price,
        };
        paymentDetails = {
            cryptoType: activeTab,
            cryptoAmount: cryptoAmount,
            paidWith: 'deposit'
        };
        toast({ title: "Paiement en attente", description: "Votre investissement sera validé par un administrateur." });
    }
    
    updateUser(updatedUser);

    const newInvestment = {
      id: new Date().getTime(),
      userEmail: user.email,
      planName: selectedPlan.name,
      price: selectedPlan.price,
      profitTarget: selectedPlan.profitTarget,
      finalProfitTarget: selectedPlan.profitTarget,
      status: 'pending',
      isComplete: false,
      date: new Date().toISOString(),
      adminComment: '',
      ...paymentDetails
    };
    
    localStorage.setItem('investments', JSON.stringify([...investments, newInvestment]));
    
    setSelectedPlan(null);
    if(onInvestment) onInvestment();
  };

  return (
    <>
      <div className="py-12">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
        >
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">Des Plans Conçus pour Votre Succès</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">Choisissez le plan qui correspond à vos ambitions et rejoignez notre communauté de plus de 500 investisseurs satisfaits.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => <PlanCard key={plan.name} plan={plan} index={index} onSelectPlan={handleSelectPlan} />)}
        </div>
      </div>

      <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Paiement pour le {selectedPlan?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Choisissez une méthode de paiement.
            </DialogDescription>
          </DialogHeader>
          <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                <TabsTrigger value="deposit">Déposer Crypto</TabsTrigger>
                <TabsTrigger value="capital" disabled={(user?.totalCapital || 0) < (selectedPlan?.price || 0)}>
                    Utiliser Capital Total ({new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(user?.totalCapital || 0)})
                </TabsTrigger>
            </TabsList>
            <TabsContent value="deposit">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
                  <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
                    <TabsTrigger value="BTC">BTC</TabsTrigger>
                    <TabsTrigger value="ETH">ETH</TabsTrigger>
                    <TabsTrigger value="SOL">SOL</TabsTrigger>
                  </TabsList>
                  <TabsContent value={activeTab}>
                    <div className="py-4 space-y-6">
                      <div className="text-center p-4 bg-slate-800 rounded-lg">
                        <p className="text-gray-300">Montant à envoyer</p>
                        <p className="text-2xl font-bold text-purple-400">{cryptoAmount.toFixed(6)} {activeTab}</p>
                      </div>
                      <div>
                        <Label htmlFor="deposit-address" className="text-gray-300">Adresse de dépôt {activeTab}</Label>
                        <div className="flex items-center space-x-2 mt-2">
                          <Input id="deposit-address" value={currentAddress} readOnly className="bg-slate-700 border-slate-500 text-sm" />
                          <Button variant="outline" size="icon" onClick={handleCopyToClipboard} className="bg-purple-600 hover:bg-purple-700 border-purple-500 shrink-0">
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <p className="text-center text-sm text-yellow-400/80">
                          ⚠️ Important : Une fois le paiement effectué, cliquez sur "J'ai effectué le paiement".
                      </p>
                    </div>
                   </TabsContent>
              </Tabs>
            </TabsContent>
            <TabsContent value="capital">
                <div className="py-4 space-y-4 text-center">
                    <Wallet className="w-16 h-16 mx-auto text-purple-400"/>
                    <h3 className="text-xl font-bold">Confirmer le paiement</h3>
                    <p className="text-gray-400">
                        Vous êtes sur le point d'utiliser <span className="font-bold text-white">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(selectedPlan?.price || 0)}</span> de votre capital total pour activer le {selectedPlan?.name}.
                    </p>
                    <p className="text-gray-400">
                       Votre capital investi augmentera, mais votre capital total restera le même.
                    </p>
                </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button onClick={handleConfirmInvestment} className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
              {paymentMethod === 'deposit' ? <Clock className="w-4 h-4 mr-2" /> : <CheckCircle className="w-4 h-4 mr-2" />}
              {paymentMethod === 'deposit' ? "J'ai effectué le paiement" : "Confirmer et Activer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InvestmentPlans;