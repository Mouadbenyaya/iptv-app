import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const offres = [
  {
    titre: "Offre Mensuelle",
    description: "Accès complet à plus de 10 000 chaînes et VOD.",
    prix: "10€ / mois"
  },
  {
    titre: "Offre Trimestrielle",
    description: "Accès complet pendant 3 mois avec une réduction.",
    prix: "25€ / 3 mois"
  },
  {
    titre: "Offre Annuelle",
    description: "Accès complet pendant 1 an à prix réduit.",
    prix: "80€ / an"
  }
];

const PageOffresIPTV = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Nos Offres IPTV</h1>
        <p className="text-gray-600">Choisissez l'offre qui vous convient le mieux !</p>
      </motion.div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {offres.map((offre, index) => (
          <Card key={index} className="rounded-2xl shadow-lg">
            <CardHeader className="p-4">
              <h2 className="text-xl font-semibold">{offre.titre}</h2>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-700 mb-4">{offre.description}</p>
              <p className="text-lg font-bold text-blue-600 mb-4">{offre.prix}</p>
              <Button variant="primary" className="w-full">Acheter</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PageOffresIPTV;
