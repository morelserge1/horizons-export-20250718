import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, PiggyBank, Wallet, Save, Users, ArrowDownToLine, DollarSign, Trash2, Ban, UserCog, Shield, Edit, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const AdminPanel = ({ onUpdate, allUsers, updateUser, deleteUser, banUser, promoteUser, currentUser }) => {
  const [investments, setInvestments] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [addresses, setAddresses] = useState({ BTC: '', ETH: '', SOL: '' });
  const [feeAddresses, setFeeAddresses] = useState({ BTC: '', ETH: '', SOL: '' });
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [profitTarget, setProfitTarget] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [fundsAmount, setFundsAmount] = useState(0);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [adminNote, setAdminNote] = useState('');

  const loadData = () => {
    setInvestments(JSON.parse(localStorage.getItem('investments') || '[]'));
    setDeposits(JSON.parse(localStorage.getItem('deposits') || '[]'));
    setWithdrawals(JSON.parse(localStorage.getItem('withdrawals') || '[]'));
  };

  useEffect(() => {
    loadData();
    const storedAddresses = JSON.parse(localStorage.getItem('depositAddresses'));
    if (storedAddresses) {
      setAddresses(storedAddresses);
    }
    const storedFeeAddresses = JSON.parse(localStorage.getItem('feeAddresses'));
    if (storedFeeAddresses) {
      setFeeAddresses(storedFeeAddresses);
    }
  }, []);

  const handleAddressChange = (crypto, value) => setAddresses(prev => ({ ...prev, [crypto]: value }));
  const saveAddresses = () => {
    localStorage.setItem('depositAddresses', JSON.stringify(addresses));
    toast({ title: "Adresses de dépôt sauvegardées" });
  };

  const handleFeeAddressChange = (crypto, value) => setFeeAddresses(prev => ({ ...prev, [crypto]: value }));
  const saveFeeAddresses = () => {
    localStorage.setItem('feeAddresses', JSON.stringify(feeAddresses));
    toast({ title: "Adresses de frais sauvegardées" });
  };
  
  const handleApproveClick = (investment) => {
    setSelectedInvestment(investment);
    setProfitTarget(investment.profitTarget);
  };
  
  const confirmApproval = () => {
    if(!selectedInvestment) return;
    updateInvestmentStatus(selectedInvestment.id, 'approved', profitTarget);
    setSelectedInvestment(null);
    setProfitTarget(0);
  };
  
  const updateInvestmentStatus = (id, status, finalProfitTarget) => {
    const updatedInvestments = investments.map(inv => {
      if (inv.id === id) {
        const newStatus = { ...inv, status };
        if (status === 'approved' && inv.status !== 'approved') {
          newStatus.approvalDate = new Date().toISOString();
          newStatus.finalProfitTarget = finalProfitTarget;
        }
        if (status === 'stopped') {
          newStatus.isComplete = true;
        }
        return newStatus;
      }
      return inv;
    });
    localStorage.setItem('investments', JSON.stringify(updatedInvestments));
    loadData();
    toast({ title: "Mise à jour réussie", description: `L'investissement est maintenant ${status}.`});
    if (onUpdate) onUpdate();
  };

  const updateDepositStatus = (id, status) => {
    const updatedDeposits = deposits.map(dep => {
      if (dep.id === id && dep.status === 'pending') {
        if(status === 'approved') {
            const userToUpdate = allUsers.find(u => u.email === dep.userEmail);
            if (userToUpdate) {
                const newCapital = (userToUpdate.capital || 0) + dep.amount;
                const newTotalCapital = (userToUpdate.totalCapital || 0) + dep.amount;
                updateUser({ ...userToUpdate, capital: newCapital, totalCapital: newTotalCapital });
            }
        }
        return { ...dep, status };
      }
      return dep;
    });
    localStorage.setItem('deposits', JSON.stringify(updatedDeposits));
    loadData();
    toast({ title: "Mise à jour réussie", description: `Le dépôt est maintenant ${status}.` });
    if (onUpdate) onUpdate();
  };

  const updateWithdrawalStatus = (id, status) => {
    const updatedWithdrawals = withdrawals.map(w => {
      if (w.id === id && w.status === 'pending') {
        if (status === 'approved') {
          const userToUpdate = allUsers.find(u => u.email === w.userEmail);
          if (userToUpdate) {
            const updatedUser = { ...userToUpdate, capital: 0, benefits: 0, totalCapital: 0 };
            updateUser(updatedUser);
          }
        }
        return { ...w, status };
      }
      return w;
    });
    localStorage.setItem('withdrawals', JSON.stringify(updatedWithdrawals));
    loadData();
    toast({ title: "Mise à jour réussie", description: `Le retrait est maintenant ${status}.` });
    if (onUpdate) onUpdate();
  };

  const handleAddFunds = () => {
    const newCapital = (selectedUser.capital || 0) + fundsAmount;
    const newTotalCapital = (selectedUser.totalCapital || 0) + fundsAmount;
    updateUser({ ...selectedUser, capital: newCapital, totalCapital: newTotalCapital });
    toast({ title: "Fonds ajoutés", description: `${fundsAmount}€ ajoutés au capital de ${selectedUser.email}` });
    setSelectedUser(null);
    setFundsAmount(0);
  };

  const handleRemoveFunds = () => {
    const newCapital = Math.max(0, (selectedUser.capital || 0) - fundsAmount);
    const newTotalCapital = Math.max(0, (selectedUser.totalCapital || 0) - fundsAmount);
    updateUser({ ...selectedUser, capital: newCapital, totalCapital: newTotalCapital });
    toast({ title: "Fonds retirés", description: `${fundsAmount}€ retirés du capital de ${selectedUser.email}` });
    setSelectedUser(null);
    setFundsAmount(0);
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
      case 'stopped': return <span className="flex items-center text-orange-400"><Ban className="w-4 h-4 mr-1" /> Stoppé</span>;
      default: return <span className="flex items-center text-yellow-400"><Clock className="w-4 h-4 mr-1" /> En attente</span>;
    }
  };

  const pendingDeposits = deposits.filter(d => d.status === 'pending');
  const pendingInvestments = investments.filter(i => i.status === 'pending');
  const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <Tabs defaultValue="clients" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="clients"><Users className="w-4 h-4 mr-2"/>Clients</TabsTrigger>
          <TabsTrigger value="deposits"><ArrowDownToLine className="w-4 h-4 mr-2"/>Dépôts</TabsTrigger>
          <TabsTrigger value="investments"><PiggyBank className="w-4 h-4 mr-2"/>Investissements</TabsTrigger>
          <TabsTrigger value="withdrawals"><DollarSign className="w-4 h-4 mr-2"/>Retraits</TabsTrigger>
        </TabsList>

        <TabsContent value="clients">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardHeader><CardTitle className="text-2xl text-white flex items-center"><Users className="w-6 h-6 mr-3 text-purple-400" /> Gestion des Utilisateurs</CardTitle></CardHeader>
                <CardContent>
                     {allUsers.length === 0 ? <p className="text-center text-gray-400 py-8">Aucun utilisateur enregistré.</p> : (
                        <div className="space-y-4">
                            {allUsers.map(user => (
                                <div key={user.email} className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                                   <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-white flex items-center">{user.email} {user.role === 'admin' && <Shield className="w-4 h-4 ml-2 text-yellow-400"/>}</p>
                                            <p className="text-xs text-gray-400">Capital Total: {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(user.totalCapital || 0)}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 text-xs rounded-full ${user.banned ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>{user.banned ? 'Banni' : 'Actif'}</span>
                                            {currentUser.email !== user.email && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4"/></Button></DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700 text-white">
                                                    <DropdownMenuItem onClick={() => setSelectedUser(user)}><Edit className="w-4 h-4 mr-2"/>Gérer les fonds</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => banUser(user.email, !user.banned)}>{user.banned ? <CheckCircle className="w-4 h-4 mr-2"/> : <Ban className="w-4 h-4 mr-2"/>}{user.banned ? 'Débannir' : 'Bannir'}</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => promoteUser(user.email, user.role !== 'admin')}>{user.role === 'admin' ? <UserCog className="w-4 h-4 mr-2"/> : <Shield className="w-4 h-4 mr-2"/>}{user.role === 'admin' ? 'Rétrograder' : 'Promouvoir Admin'}</DropdownMenuItem>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild><DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-400"><Trash2 className="w-4 h-4 mr-2"/>Supprimer</DropdownMenuItem></AlertDialogTrigger>
                                                        <AlertDialogContent className="bg-slate-900 border-slate-700 text-white">
                                                            <AlertDialogHeader><AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle><AlertDialogDescription>Cette action est irréversible et supprimera définitivement le compte de {user.email}.</AlertDialogDescription></AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => deleteUser(user.email)} className="bg-red-600 hover:bg-red-700">Supprimer</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            )}
                                        </div>
                                   </div>
                                </div>
                            ))}
                        </div>
                     )}
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="deposits">
             <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardHeader><CardTitle className="text-2xl text-white flex items-center"><ArrowDownToLine className="w-6 h-6 mr-3 text-purple-400" /> Validation des Dépôts</CardTitle></CardHeader>
                <CardContent>
                  {pendingDeposits.length === 0 ? <p className="text-center text-gray-400 py-8">Aucun dépôt en attente.</p> : (
                    <div className="space-y-4">
                      {pendingDeposits.map(dep => (
                         <div key={dep.id} className="p-4 rounded-lg bg-slate-800 border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="flex-1">
                            <p className="font-bold text-white">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(dep.amount)} ({dep.cryptoType})</p>
                            <p className="text-sm text-gray-300">Client: {dep.userEmail}</p>
                            <p className="text-xs text-gray-500">Date: {new Date(dep.date).toLocaleString('fr-FR')}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => updateDepositStatus(dep.id, 'approved')}>Approuver</Button>
                            <Button size="sm" variant="destructive" onClick={() => updateDepositStatus(dep.id, 'rejected')}>Rejeter</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="investments">
             <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardHeader><CardTitle className="text-2xl text-white flex items-center"><PiggyBank className="w-6 h-6 mr-3 text-purple-400" /> Gestion des Investissements</CardTitle></CardHeader>
                <CardContent>
                  {investments.length === 0 ? <p className="text-center text-gray-400 py-8">Aucune demande d'investissement.</p> : (
                    <div className="space-y-4">
                      {investments.sort((a, b) => new Date(b.date) - new Date(a.date)).map(inv => (
                        <div key={inv.id} className="p-4 rounded-lg bg-slate-800 border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="flex-1">
                            <p className="font-bold text-white">{inv.planName} - {inv.price}€</p>
                            <p className="text-sm text-gray-300">Client: {inv.userEmail}</p>
                            <p className="text-xs text-gray-500">Date: {new Date(inv.date).toLocaleString('fr-FR')}</p>
                          </div>
                          <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="flex-1">{getStatusBadge(inv.status)}</div>
                            {inv.status === 'pending' && (
                              <div className="flex gap-2">
                                <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproveClick(inv)}>Approuver</Button>
                                <Button size="sm" variant="destructive" onClick={() => updateInvestmentStatus(inv.id, 'rejected')}>Rejeter</Button>
                              </div>
                            )}
                            {inv.status === 'approved' && !inv.isComplete && (
                                <Button size="sm" variant="destructive" onClick={() => updateInvestmentStatus(inv.id, 'stopped')}>Stopper</Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="withdrawals">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardHeader><CardTitle className="text-2xl text-white flex items-center"><DollarSign className="w-6 h-6 mr-3 text-purple-400" /> Gestion des Retraits</CardTitle></CardHeader>
                <CardContent>
                  {pendingWithdrawals.length === 0 ? <p className="text-center text-gray-400 py-8">Aucune demande de retrait en attente.</p> : (
                    <div className="space-y-4">
                      {pendingWithdrawals.map(w => (
                        <div key={w.id} className="p-4 rounded-lg bg-slate-800 border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="flex-1">
                            <p className="font-bold text-white">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(w.amount)} en {w.cryptoType}</p>
                            <p className="text-sm text-gray-300">Client: {w.userEmail}</p>
                            <p className="text-xs text-gray-500 break-all">Adresse: {w.address}</p>
                            {w.tax > 0 && <p className="text-xs text-yellow-400">Frais de {w.tax.toFixed(2)}€ à vérifier.</p>}
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => updateWithdrawalStatus(w.id, 'approved')}>Approuver</Button>
                            <Button size="sm" variant="destructive" onClick={() => updateWithdrawalStatus(w.id, 'rejected')}>Rejeter</Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => {setSelectedWithdrawal(w); setAdminNote(w.adminNote || '');}}>Noter</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur-sm mt-8">
        <CardHeader><CardTitle className="text-2xl text-white flex items-center"><Wallet className="w-6 h-6 mr-3 text-purple-400" /> Adresses de Dépôt & Frais</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-gray-200">Adresses de Dépôt Capital</h4>
            <div><Label htmlFor="btc-address" className="text-gray-300">Adresse Bitcoin (BTC)</Label><Input id="btc-address" value={addresses.BTC} onChange={(e) => handleAddressChange('BTC', e.target.value)} className="bg-slate-800 border-slate-600" /></div>
            <div><Label htmlFor="eth-address" className="text-gray-300">Adresse Ethereum (ETH)</Label><Input id="eth-address" value={addresses.ETH} onChange={(e) => handleAddressChange('ETH', e.target.value)} className="bg-slate-800 border-slate-600" /></div>
            <div><Label htmlFor="sol-address" className="text-gray-300">Adresse Solana (SOL)</Label><Input id="sol-address" value={addresses.SOL} onChange={(e) => handleAddressChange('SOL', e.target.value)} className="bg-slate-800 border-slate-600" /></div>
            <Button onClick={saveAddresses} className="w-full bg-gradient-to-r from-purple-600 to-blue-600"><Save className="w-4 h-4 mr-2" /> Sauvegarder</Button>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-gray-200">Adresses de Paiement des Frais</h4>
            <div><Label htmlFor="fee-btc-address" className="text-gray-300">Adresse Frais Bitcoin (BTC)</Label><Input id="fee-btc-address" value={feeAddresses.BTC} onChange={(e) => handleFeeAddressChange('BTC', e.target.value)} className="bg-slate-800 border-slate-600" /></div>
            <div><Label htmlFor="fee-eth-address" className="text-gray-300">Adresse Frais Ethereum (ETH)</Label><Input id="fee-eth-address" value={feeAddresses.ETH} onChange={(e) => handleFeeAddressChange('ETH', e.target.value)} className="bg-slate-800 border-slate-600" /></div>
            <div><Label htmlFor="fee-sol-address" className="text-gray-300">Adresse Frais Solana (SOL)</Label><Input id="fee-sol-address" value={feeAddresses.SOL} onChange={(e) => handleFeeAddressChange('SOL', e.target.value)} className="bg-slate-800 border-slate-600" /></div>
            <Button onClick={saveFeeAddresses} className="w-full bg-gradient-to-r from-purple-600 to-blue-600"><Save className="w-4 h-4 mr-2" /> Sauvegarder</Button>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={!!selectedInvestment} onOpenChange={() => setSelectedInvestment(null)}>
        <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700 text-white">
            <DialogHeader><DialogTitle>Approuver l'investissement</DialogTitle><DialogDescription>Définissez l'objectif de gain final pour cet investissement.</DialogDescription></DialogHeader>
            <div className="py-4 space-y-4">
                <div><Label htmlFor="profitTarget">Bénéfice final (€)</Label><Input id="profitTarget" type="number" value={profitTarget} onChange={(e) => setProfitTarget(parseFloat(e.target.value) || 0)} className="bg-slate-800 border-slate-600 mt-1"/><p className="text-xs text-gray-400 mt-2">Le client verra son gain fluctuer avant d'atteindre ce montant en 4 heures.</p></div>
            </div>
            <DialogFooter><Button variant="outline" onClick={() => setSelectedInvestment(null)}>Annuler</Button><Button onClick={confirmApproval} className="bg-green-600 hover:bg-green-700">Confirmer l'Approbation</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700 text-white">
            <DialogHeader><DialogTitle>Gérer les fonds de {selectedUser?.email}</DialogTitle></DialogHeader>
            <div className="py-4 space-y-4">
                <div><Label htmlFor="fundsAmount">Montant (€)</Label><Input id="fundsAmount" type="number" value={fundsAmount} onChange={(e) => setFundsAmount(parseFloat(e.target.value) || 0)} className="bg-slate-800 border-slate-600 mt-1"/></div>
            </div>
            <DialogFooter className="grid grid-cols-2 gap-2"><Button onClick={handleAddFunds} className="bg-green-600 hover:bg-green-700">Ajouter</Button><Button onClick={handleRemoveFunds} variant="destructive">Retirer</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedWithdrawal} onOpenChange={() => setSelectedWithdrawal(null)}>
        <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700 text-white">
            <DialogHeader><DialogTitle>Ajouter une note au retrait</DialogTitle></DialogHeader>
            <div className="py-4 space-y-4">
                <div><Label htmlFor="adminNote">Note pour le client</Label><Input id="adminNote" value={adminNote} onChange={(e) => setAdminNote(e.target.value)} className="bg-slate-800 border-slate-600 mt-1"/></div>
            </div>
            <DialogFooter><Button onClick={handleSaveNote}>Enregistrer la note</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AdminPanel;