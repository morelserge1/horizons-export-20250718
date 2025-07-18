import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, PiggyBank, Wallet, Save, UserCheck, UserPlus, DollarSign, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';

const AdminWithdrawals = ({ onUpdate, pendingUsers, approveUser }) => {
  const [investments, setInvestments] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [adminNote, setAdminNote] = useState('');
  const [addresses, setAddresses] = useState({
    BTC: '',
    ETH: '',
    SOL: '',
  });
  
  const loadData = () => {
    setInvestments(JSON.parse(localStorage.getItem('investments') || '[]'));
    setWithdrawals(JSON.parse(localStorage.getItem('withdrawals') || '[]'));
  };

  useEffect(() => {
    loadData();
    const storedAddresses = JSON.parse(localStorage.getItem('depositAddresses'));
    if (storedAddresses) {
      setAddresses(storedAddresses);
    } else {
      const defaultAddresses = {
        BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        ETH: '0x1234567890123456789012345678901234567890',
        SOL: 'SoL1anAAdre55123456789012345678901234567890',
      };
      setAddresses(defaultAddresses);
      localStorage.setItem('depositAddresses', JSON.stringify(defaultAddresses));
    }
  }, []);

  const handleAddressChange = (crypto, value) => {
    setAddresses(prev => ({ ...prev, [crypto]: value }));
  };

  const saveAddresses = () => {
    localStorage.setItem('depositAddresses', JSON.stringify(addresses));
    toast({
      title: "Adresses sauvegardées",
      description: "Les nouvelles adresses de dépôt ont été enregistrées.",
    });
  };

  const updateInvestmentStatus = (id, status) => {
    const updatedInvestments = investments.map(inv => {
      if (inv.id === id) {
        const newStatus = { ...inv, status };
        if (status === 'approved' && inv.status !== 'approved') {
          newStatus.approvalDate = new Date().toISOString();
        }
        return newStatus;
      }
      return inv;
    });

    setInvestments(updatedInvestments);
    localStorage.setItem('investments', JSON.stringify(updatedInvestments));
    toast({
      title: "Mise à jour réussie",
      description: `Le statut de l'investissement a été changé en "${status}".`,
    });
    if (onUpdate) onUpdate();
  };

  const handleSaveNote = () => {
    const updatedWithdrawals = withdrawals.map(w => w.id === selectedWithdrawal.id ? { ...w, adminNote } : w);
    localStorage.setItem('withdrawals', JSON.stringify(updatedWithdrawals));
    loadData();
    toast({ title: "Note enregistrée" });
    setSelectedWithdrawal(null);
    setAdminNote('');
  };


  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved': return <span className="flex items-center text-green-400"><CheckCircle className="w-4 h-4 mr-1" /> Approuvé</span>;
      case 'rejected': return <span className="flex items-center text-red-400"><XCircle className="w-4 h-4 mr-1" /> Rejeté</span>;
      default: return <span className="flex items-center text-yellow-400"><Clock className="w-4 h-4 mr-1" /> En attente</span>;
    }
  };

  const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
       <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center"><UserCheck className="w-6 h-6 mr-3 text-purple-400" /> Approbation des Utilisateurs</CardTitle>
          <CardDescription className="text-gray-400">Validez les nouvelles inscriptions de clients.</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingUsers.length === 0 ? <p className="text-center text-gray-400 py-8">Aucun nouvel utilisateur en attente.</p> : (
            <div className="space-y-4">
              {pendingUsers.map(user => (
                <div key={user.email} className="p-4 rounded-lg bg-slate-800 border border-slate-700 flex justify-between items-center">
                  <p className="font-bold text-white">{user.email}</p>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => approveUser(user.email)}>
                    <UserPlus className="w-4 h-4 mr-2" /> Approuver
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center"><DollarSign className="w-6 h-6 mr-3 text-purple-400" /> Gestion des Retraits</CardTitle>
          <CardDescription className="text-gray-400">Gérez les demandes de retrait des clients.</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingWithdrawals.length === 0 ? <p className="text-center text-gray-400 py-8">Aucune demande de retrait en attente.</p> : (
            <div className="space-y-4">
              {pendingWithdrawals.map(w => (
                <div key={w.id} className="p-4 rounded-lg bg-slate-800 border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-white">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(w.amount)}</p>
                    <p className="text-sm text-gray-300">Client: {w.userEmail}</p>
                    <p className="text-xs text-gray-500">IBAN: {w.rib}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => {setSelectedWithdrawal(w); setAdminNote(w.adminNote || '');}}>
                        <MessageSquare className="w-4 h-4 mr-2"/> Noter
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center"><Wallet className="w-6 h-6 mr-3 text-purple-400" /> Gestion des Adresses de Dépôt</CardTitle>
          <CardDescription className="text-gray-400">Modifiez les adresses de réception pour les dépôts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="btc-address" className="text-gray-300">Adresse Bitcoin (BTC)</Label>
            <Input id="btc-address" value={addresses.BTC} onChange={(e) => handleAddressChange('BTC', e.target.value)} className="bg-slate-800 border-slate-600" />
          </div>
          <div>
            <Label htmlFor="eth-address" className="text-gray-300">Adresse Ethereum (ETH)</Label>
            <Input id="eth-address" value={addresses.ETH} onChange={(e) => handleAddressChange('ETH', e.target.value)} className="bg-slate-800 border-slate-600" />
          </div>
          <div>
            <Label htmlFor="sol-address" className="text-gray-300">Adresse Solana (SOL)</Label>
            <Input id="sol-address" value={addresses.SOL} onChange={(e) => handleAddressChange('SOL', e.target.value)} className="bg-slate-800 border-slate-600" />
          </div>
          <Button onClick={saveAddresses} className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
            <Save className="w-4 h-4 mr-2" /> Sauvegarder les Adresses
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center"><PiggyBank className="w-6 h-6 mr-3 text-purple-400" /> Gestion des Investissements</CardTitle>
          <CardDescription className="text-gray-400">Approuvez ou rejetez les nouveaux investissements.</CardDescription>
        </CardHeader>
        <CardContent>
          {investments.length === 0 ? <p className="text-center text-gray-400 py-8">Aucune demande d'investissement.</p> : (
            <div className="space-y-4">
              {investments.sort((a, b) => new Date(b.date) - new Date(a.date)).map(inv => (
                <div key={inv.id} className="p-4 rounded-lg bg-slate-800 border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-white">{inv.planName} - {inv.price}€ ({typeof inv.cryptoAmount === 'number' ? inv.cryptoAmount.toFixed(6) : 'N/A'} {inv.cryptoType})</p>
                    <p className="text-xs text-gray-500">Date: {new Date(inv.date).toLocaleString('fr-FR')}</p>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="flex-1">{getStatusBadge(inv.status)}</div>
                    {inv.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => updateInvestmentStatus(inv.id, 'approved')}>Approuver</Button>
                        <Button size="sm" variant="destructive" onClick={() => updateInvestmentStatus(inv.id, 'rejected')}>Rejeter</Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Dialog open={!!selectedWithdrawal} onOpenChange={() => setSelectedWithdrawal(null)}>
        <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700 text-white">
            <DialogHeader><DialogTitle>Ajouter une note au retrait</DialogTitle></DialogHeader>
            <div className="py-4 space-y-4">
                <div>
                  <Label htmlFor="adminNote">Note pour le client</Label>
                  <Input id="adminNote" value={adminNote} onChange={(e) => setAdminNote(e.target.value)} className="bg-slate-800 border-slate-600 mt-1"/>
                </div>
            </div>
            <DialogFooter><Button onClick={handleSaveNote}>Enregistrer la note</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AdminWithdrawals;