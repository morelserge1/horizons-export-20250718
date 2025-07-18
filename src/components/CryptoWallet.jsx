import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownToLine, ArrowUpFromLine, Copy, Check, Clock, CheckCircle, XCircle, TrendingUp, Info, MessageSquare, Briefcase, BarChartBig, Layers, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CryptoWallet = ({ user, updateUser, onDataUpdate }) => {
  const [isDepositOpen, setDepositOpen] = useState(false);
  const [isWithdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawStep, setWithdrawStep] = useState(1);
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [copied, setCopied] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [depositAddresses, setDepositAddresses] = useState({});
  const [feeAddresses, setFeeAddresses] = useState({});
  const [activeDepositTab, setActiveDepositTab] = useState('BTC');
  const [activeWithdrawTab, setActiveWithdrawTab] = useState('BTC');
  const [depositAmount, setDepositAmount] = useState('');
  const [displayedBenefits, setDisplayedBenefits] = useState(user.benefits || 0);
  
  const PROFIT_DURATION = 4 * 60 * 60 * 1000;
  const WITHDRAWAL_TAX_PERCENT = 0.03;

  const hasInvestmentHistory = useMemo(() => {
    const allInvestments = JSON.parse(localStorage.getItem('investments') || '[]');
    return allInvestments.some(inv => inv.userEmail === user.email);
  }, [user.email, transactions]);


  const calculateGains = useCallback(() => {
    const allInvestments = JSON.parse(localStorage.getItem('investments') || '[]');
    const userInvestments = allInvestments.filter(inv => inv.userEmail === user.email);
    
    let investmentCompleted = false;
    let currentDynamicBenefits = 0;
    
    const investmentsToComplete = [];

    userInvestments.forEach(inv => {
      if (inv.status === 'approved' && inv.approvalDate && !inv.isComplete) {
        const approvalTime = new Date(inv.approvalDate).getTime();
        const now = new Date().getTime();
        const elapsedTime = now - approvalTime;
        
        if (elapsedTime >= PROFIT_DURATION) {
          investmentsToComplete.push(inv);
        } else {
          const timeRatio = elapsedTime / PROFIT_DURATION;
          const baseProfit = timeRatio * (inv.finalProfitTarget || 0);
          const fluctuation = (Math.random() - 0.5) * baseProfit * 0.05;
          currentDynamicBenefits += Math.max(0, baseProfit + fluctuation);
        }
      }
    });

    const completedBenefits = userInvestments
      .filter(inv => inv.isComplete)
      .reduce((sum, inv) => sum + (inv.finalProfitTarget || 0), 0);
      
    setDisplayedBenefits(completedBenefits + currentDynamicBenefits);

    if (investmentsToComplete.length > 0) {
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const currentUserIndex = allUsers.findIndex(u => u.email === user.email);
      if(currentUserIndex !== -1) {
        let currentUser = allUsers[currentUserIndex];
        let totalProfitToAdd = 0;
        let totalInvestedToRemove = 0;

        investmentsToComplete.forEach(inv => {
          const investmentInStorage = allInvestments.find(i => i.id === inv.id);
          if (investmentInStorage) {
            investmentInStorage.isComplete = true;
            totalProfitToAdd += (inv.finalProfitTarget || 0);
            totalInvestedToRemove += inv.price;
          }
        });

        currentUser.totalCapital = (currentUser.totalCapital || 0) + totalProfitToAdd;
        currentUser.investedCapital = Math.max(0, (currentUser.investedCapital || 0) - totalInvestedToRemove);
        currentUser.benefits = (currentUser.benefits || 0) + totalProfitToAdd;
        
        allUsers[currentUserIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(allUsers));
        localStorage.setItem('investments', JSON.stringify(allInvestments));
        updateUser(currentUser);
        toast({ title: "Investissement(s) Terminé(s)!", description: "Vos bénéfices ont été ajoutés à votre capital total." });
        if(onDataUpdate) onDataUpdate();
      }
    }
    
    const deposits = JSON.parse(localStorage.getItem('deposits') || '[]').filter(d => d.userEmail === user.email);
    const storedInvestments = JSON.parse(localStorage.getItem('investments') || '[]').filter(i => i.userEmail === user.email);
    const withdrawals = JSON.parse(localStorage.getItem('withdrawals') || '[]').filter(w => w.userEmail === user.email);
    setTransactions([...deposits, ...storedInvestments, ...withdrawals].sort((a,b) => new Date(b.date) - new Date(a.date)));

  }, [user.email, updateUser, onDataUpdate]);

  useEffect(() => {
    const storedAddresses = JSON.parse(localStorage.getItem('depositAddresses'));
    if (storedAddresses) setDepositAddresses(storedAddresses);
    
    const storedFeeAddresses = JSON.parse(localStorage.getItem('feeAddresses'));
    if (storedFeeAddresses) setFeeAddresses(storedFeeAddresses);

    const interval = setInterval(calculateGains, 2000);

    return () => clearInterval(interval);
  }, [calculateGains]);
  
  const handleCopyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copié !", description: "L'adresse a été copiée." });
  };
  
  const withdrawableAmount = user.totalCapital || 0;
  const withdrawalTax = hasInvestmentHistory ? withdrawableAmount * WITHDRAWAL_TAX_PERCENT : 0;

  const handleWithdrawalAttempt = () => {
    if (withdrawableAmount > 0) {
      setWithdrawOpen(true);
    } else {
        toast({ title: "Aucun fonds à retirer", description: "Votre solde est de 0€." });
    }
  };

  const handleWithdrawalConfirmation = () => {
    if (withdrawStep === 1) {
      setWithdrawStep(2);
    } else if (withdrawStep === 2) {
      if (!withdrawAddress) {
        toast({ variant: "destructive", title: "Erreur", description: "Veuillez saisir votre adresse de retrait." });
        return;
      }
      
      const withdrawals = JSON.parse(localStorage.getItem('withdrawals') || '[]');
      const newWithdrawal = {
        id: new Date().getTime(),
        userEmail: user.email,
        amount: withdrawableAmount,
        tax: withdrawalTax,
        cryptoType: activeWithdrawTab,
        address: withdrawAddress,
        status: 'pending',
        date: new Date().toISOString(),
        adminNote: ''
      };
      localStorage.setItem('withdrawals', JSON.stringify([...withdrawals, newWithdrawal]));

      toast({
        title: "Demande de retrait soumise",
        description: `Votre demande de retrait de ${withdrawableAmount.toFixed(2)}€ est en attente d'approbation.`,
      });
      setWithdrawStep(1);
      setWithdrawOpen(false);
      setWithdrawAddress('');
    }
  };
  
  const handleDepositConfirmation = () => {
    const amount = parseFloat(depositAmount);
    if(isNaN(amount) || amount <= 0) {
        toast({variant: "destructive", title: "Montant invalide", description: "Veuillez entrer un montant de dépôt valide."});
        return;
    }

    const deposits = JSON.parse(localStorage.getItem('deposits') || '[]');
    const newDeposit = {
      id: new Date().getTime(),
      userEmail: user.email,
      amount: amount,
      cryptoType: activeDepositTab,
      status: 'pending',
      date: new Date().toISOString(),
      adminComment: ''
    };
    localStorage.setItem('deposits', JSON.stringify([...deposits, newDeposit]));

    toast({
      title: "Demande de dépôt enregistrée",
      description: "Votre dépôt sera validé par un administrateur.",
    });

    setDepositOpen(false);
    setDepositAmount('');
  };

  const getTransactionType = (tx) => {
    if (tx.planName) return 'Investissement';
    if (tx.address) return 'Retrait';
    if (tx.cryptoType && tx.amount && !tx.address && !tx.planName) return 'Dépôt';
    return 'Inconnu';
  };

  const getTransactionDetails = (tx) => {
    const type = getTransactionType(tx);
    switch(type) {
        case 'Investissement': return `${tx.planName} - ${tx.price}€`;
        case 'Retrait': return `${tx.amount.toFixed(2)}€ en ${tx.cryptoType}`;
        case 'Dépôt': return `${tx.amount}€ (${tx.cryptoType})`;
        default: return '';
    }
  };

  const getStatusBadge = (tx) => {
    const status = tx.isComplete ? 'terminé' : tx.status;
    switch (status) {
      case 'approved': return <span className="flex items-center text-green-400 text-sm"><TrendingUp className="w-4 h-4 mr-2"/>Actif</span>;
      case 'rejected': return <span className="flex items-center text-red-400 text-sm"><XCircle className="w-4 h-4 mr-2"/>Rejeté</span>;
      case 'pending': return <span className="flex items-center text-yellow-400 text-sm"><Clock className="w-4 h-4 mr-2"/>En attente</span>;
      case 'terminé': return <span className="flex items-center text-cyan-400 text-sm"><CheckCircle className="w-4 h-4 mr-2"/>Terminé</span>;
      case 'stopped': return <span className="flex items-center text-orange-400 text-sm"><XCircle className="w-4 h-4 mr-2"/>Stoppé</span>;
      default: return <span className="text-gray-400 text-sm">{status}</span>;
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 sm:space-y-8">
      <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl text-white">Mon Portefeuille</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-6 rounded-lg bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-center flex flex-col items-center justify-center">
                <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-blue-300"/>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300">Capital Investi</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(user.investedCapital || 0)}</p>
              </div>
              <div className="p-6 rounded-lg bg-gradient-to-r from-green-600/30 to-cyan-600/30 text-center flex flex-col items-center justify-center">
                <BarChartBig className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-green-300"/>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300">Bénéfices</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(displayedBenefits)}</p>
              </div>
               <div className="p-6 rounded-lg bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-center flex flex-col items-center justify-center sm:col-span-2 lg:col-span-1">
                <Layers className="w-6 h-6 sm:w-8 sm:h-8 mb-2 text-purple-300"/>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300">Capital Total</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(user.totalCapital || 0)}</p>
              </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Dialog open={isDepositOpen} onOpenChange={setDepositOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 sm:py-6 text-sm sm:text-base lg:text-lg">
                  <ArrowDownToLine className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> 
                  <span className="hidden sm:inline">Déposer du Capital</span>
                  <span className="sm:hidden">Déposer</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700 text-white">
                <DialogHeader><DialogTitle>Déposer du Capital</DialogTitle></DialogHeader>
                <Tabs value={activeDepositTab} onValueChange={setActiveDepositTab} className="w-full mt-4">
                  <TabsList className="grid w-full grid-cols-3 bg-slate-800"><TabsTrigger value="BTC">BTC</TabsTrigger><TabsTrigger value="ETH">ETH</TabsTrigger><TabsTrigger value="SOL">SOL</TabsTrigger></TabsList>
                  <TabsContent value={activeDepositTab}>
                      <div className="py-4 space-y-4">
                        <div><Label htmlFor="deposit-amount" className="text-gray-300">Montant du dépôt en EUR</Label><Input id="deposit-amount" type="number" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} placeholder="Ex: 500" className="bg-slate-800 border-slate-600 mt-1" /></div>
                        <p className="text-center text-sm text-yellow-400">Envoyez la contre-valeur en {activeDepositTab} à l'adresse ci-dessous.</p>
                        <div className="p-4 rounded-md bg-slate-800 border border-slate-600">
                          <Label htmlFor={`deposit-address-${activeDepositTab}`} className="text-gray-300">Adresse de dépôt {activeDepositTab}</Label>
                          <div className="flex items-center space-x-2 mt-2">
                            <Input id={`deposit-address-${activeDepositTab}`} value={depositAddresses[activeDepositTab] || ''} readOnly className="bg-slate-700 border-slate-500" />
                            <Button variant="outline" size="icon" onClick={() => handleCopyToClipboard(depositAddresses[activeDepositTab] || '')} className="bg-purple-600 hover:bg-purple-700 border-purple-500">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}</Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                </Tabs>
                <DialogFooter><Button onClick={handleDepositConfirmation} className="w-full bg-gradient-to-r from-green-600 to-green-500">Confirmer le dépôt</Button></DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={isWithdrawOpen} onOpenChange={(open) => { if (!open) { setWithdrawOpen(false); setWithdrawStep(1); }}}>
              <DialogTrigger asChild>
                <Button onClick={handleWithdrawalAttempt} className="w-full bg-red-600 hover:bg-red-700 text-white py-4 sm:py-6 text-sm sm:text-base lg:text-lg">
                  <ArrowUpFromLine className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> 
                  <span className="hidden sm:inline">Effectuer un Retrait</span>
                  <span className="sm:hidden">Retirer</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg bg-slate-900 border-slate-700 text-white">
                <DialogHeader><DialogTitle>Retirer vos fonds en Crypto</DialogTitle></DialogHeader>
                {withdrawStep === 1 && (
                  <div className="py-4 space-y-4">
                    {hasInvestmentHistory ? (
                      <>
                        <DialogDescription className="text-gray-400">Pour initier le retrait, vous devez d'abord payer des frais de performance de 3% en avance.</DialogDescription>
                        <div className="p-4 bg-slate-800 rounded-lg space-y-2">
                          <div className="flex justify-between"><span className="text-gray-400">Capital total à retirer:</span> <span>{withdrawableAmount.toFixed(2)}€</span></div>
                          <div className="flex justify-between text-red-400 font-bold"><span className="text-gray-400">Frais de performance (3%):</span> <span>{withdrawalTax.toFixed(2)}€</span></div>
                        </div>
                        <div className="flex items-start p-3 bg-blue-900/30 rounded-lg text-blue-300 border border-blue-500/30">
                          <Info className="w-5 h-5 mr-3 mt-1 shrink-0" />
                          <p className="text-xs">Veuillez payer les frais de {withdrawalTax.toFixed(2)}€ à l'une des adresses de frais dédiées. Une fois le paiement effectué, cliquez sur "Continuer" pour soumettre votre demande de retrait.</p>
                        </div>
                        <Tabs value={activeWithdrawTab} onValueChange={setActiveWithdrawTab} className="w-full mt-4">
                          <TabsList className="grid w-full grid-cols-3 bg-slate-800"><TabsTrigger value="BTC">BTC</TabsTrigger><TabsTrigger value="ETH">ETH</TabsTrigger><TabsTrigger value="SOL">SOL</TabsTrigger></TabsList>
                          <TabsContent value={activeWithdrawTab}>
                            <div className="p-4 rounded-md bg-slate-800 border border-slate-600 mt-2">
                              <Label htmlFor={`fee-address-${activeWithdrawTab}`} className="text-gray-300">Adresse de paiement des frais ({activeWithdrawTab})</Label>
                              <div className="flex items-center space-x-2 mt-2">
                                <Input id={`fee-address-${activeWithdrawTab}`} value={feeAddresses[activeWithdrawTab] || ''} readOnly className="bg-slate-700 border-slate-500" />
                                <Button variant="outline" size="icon" onClick={() => handleCopyToClipboard(feeAddresses[activeWithdrawTab] || '')} className="bg-purple-600 hover:bg-purple-700 border-purple-500">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}</Button>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </>
                    ) : (
                      <DialogDescription className="text-gray-400">Vous êtes sur le point de retirer votre capital. Comme vous n'avez pas encore d'historique d'investissement, aucun frais de performance ne s'applique.</DialogDescription>
                    )}
                  </div>
                )}
                {withdrawStep === 2 && (
                  <div className="py-4 space-y-4">
                     <DialogDescription className="text-gray-400">Veuillez sélectionner la cryptomonnaie et fournir votre adresse de réception pour le capital de {withdrawableAmount.toFixed(2)}€.</DialogDescription>
                     <Tabs value={activeWithdrawTab} onValueChange={setActiveWithdrawTab} className="w-full mt-4">
                        <TabsList className="grid w-full grid-cols-3 bg-slate-800"><TabsTrigger value="BTC">BTC</TabsTrigger><TabsTrigger value="ETH">ETH</TabsTrigger><TabsTrigger value="SOL">SOL</TabsTrigger></TabsList>
                     </Tabs>
                     <div className="mt-4">
                        <Label htmlFor="withdraw-address" className="text-gray-300">Votre adresse de portefeuille {activeWithdrawTab}</Label>
                        <Input id="withdraw-address" value={withdrawAddress} onChange={(e) => setWithdrawAddress(e.target.value)} placeholder={`Entrez votre adresse ${activeWithdrawTab}`} className="bg-slate-800 border-slate-600 mt-1" />
                     </div>
                  </div>
                )}
                <DialogFooter><Button onClick={() => { setWithdrawStep(1); setWithdrawOpen(false); }} variant="outline">Annuler</Button><Button onClick={handleWithdrawalConfirmation} className="bg-gradient-to-r from-purple-600 to-blue-600">{withdrawStep === 1 ? 'Continuer' : 'Soumettre la demande'}</Button></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl text-white flex items-center">
            <History className="w-5 h-5 sm:w-6 sm:h-6 mr-2"/>
            <span className="hidden sm:inline">Historique des Transactions</span>
            <span className="sm:hidden">Historique</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          {transactions.length === 0 ? <p className="text-center text-gray-400">Vous n'avez encore aucune transaction.</p> : (
            <ul className="space-y-3 sm:space-y-4">
              {transactions.map(tx => (
                  <li key={tx.id} className="p-3 sm:p-4 bg-slate-800 rounded-lg border border-slate-700/50">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                      <div>
                        <p className="font-semibold text-white text-sm sm:text-base">{getTransactionType(tx)}</p>
                        <p className="text-xs sm:text-sm text-gray-300">{getTransactionDetails(tx)}</p>
                        <p className="text-xs text-gray-400">{new Date(tx.date).toLocaleString('fr-FR')}</p>
                      </div>
                      <div className="self-end sm:self-auto">{getStatusBadge(tx)}</div>
                    </div>
                     {(tx.adminComment || tx.adminNote) && (
                        <div className="mt-2 p-2 bg-slate-700/50 rounded-md text-xs sm:text-sm">
                          <p className="text-cyan-300 flex items-start">
                            <MessageSquare className="w-4 h-4 mr-2 mt-0.5 shrink-0" /> 
                            <span>Note de l'admin : <span className="text-gray-300 ml-1">{tx.adminComment || tx.adminNote}</span></span>
                          </p>
                        </div>
                      )}
                  </li>
                ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CryptoWallet;