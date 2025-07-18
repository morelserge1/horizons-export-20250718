
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, UserPlus } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FcGoogle } from 'react-icons/fc';

const LoginScreen = ({ isOpen, setIsOpen, onLogin, onRegister, onLoginWithGoogle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [activeTab, setActiveTab] = useState('login');

  const handleLogin = (e) => {
    e.preventDefault();
    if (onLogin(email, password)) {
        setIsOpen(false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (onRegister(regEmail, regPassword)) {
      setRegEmail('');
      setRegPassword('');
      setActiveTab('login');
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await onLoginWithGoogle();
    if (!error) {
      setIsOpen(false);
    }
  };

  const SocialLoginButton = () => (
    <div className="flex flex-col w-full gap-4">
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-900 px-2 text-slate-400">
                    Ou continuer avec
                </span>
            </div>
        </div>
        <Button variant="outline" className="w-full bg-slate-800 border-slate-600 hover:bg-slate-700" onClick={handleGoogleLogin}>
            <FcGoogle className="mr-2 h-5 w-5" />
            Google
        </Button>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-transparent border-none shadow-none p-0 max-w-md">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold gradient-text">CryptoBoost</CardTitle>
                  <CardDescription className="text-gray-400 pt-2">Connectez-vous pour investir</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="m@exemple.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-slate-800 border-slate-600" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-slate-800 border-slate-600" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col gap-4">
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <LogIn className="mr-2 h-4 w-4" /> Connexion
                    </Button>
                    <SocialLoginButton />
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            <TabsContent value="register">
              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold gradient-text">Rejoignez-nous</CardTitle>
                  <CardDescription className="text-gray-400 pt-2">Créez un compte pour commencer</CardDescription>
                </CardHeader>
                <form onSubmit={handleRegister}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input id="reg-email" type="email" placeholder="m@exemple.com" required value={regEmail} onChange={(e) => setRegEmail(e.target.value)} className="bg-slate-800 border-slate-600" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Mot de passe</Label>
                      <Input id="reg-password" type="password" required value={regPassword} onChange={(e) => setRegPassword(e.target.value)} className="bg-slate-800 border-slate-600" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col gap-4">
                    <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600">
                      <UserPlus className="mr-2 h-4 w-4" /> S'inscrire
                    </Button>
                    <SocialLoginButton />
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginScreen;
