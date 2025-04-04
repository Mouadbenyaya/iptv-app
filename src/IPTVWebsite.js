import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Monitor, Smartphone, Tablet, Tv, Wifi, Shield, Headphones } from 'lucide-react';
// Importation du fichier CSS Module (ESSENTIEL)
import styles from './IPTVWebsite.module.css';

const IPTVWebsite = () => {
  const [activeTab, setActiveTab] = useState('accueil');

  // Gestion du défilement fluide vers les sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Redirection vers WhatsApp
  const handleWhatsAppContact = () => {
    window.open('https://wa.me/+0123456789', '_blank'); // Remplacez par votre vrai numéro
  };

  // Suivi de la section active au scroll
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4,
    };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Appliquer scroll-smooth globalement via JS (peut aussi être dans CSS global)
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    // Utilisation de la classe principale du module CSS
    <div className={styles.iptvWebsiteWrapper}>
      {/* Barre de navigation */}
      <header className={styles.header}>
        {/* Utilisation de la classe container du module */}
        <div className={styles.container}>
          {/* Logo */}
          <div className={styles.logoLink} onClick={() => scrollToSection('accueil')}>
            <div className={styles.logoText}>
              IPTV<span className={styles.logoTextSpan}>Vision</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className={styles.navigation}>
            {['accueil', 'services', 'abonnements', 'appareils', 'faq'].map((tabId) => (
              <button
                key={tabId}
                onClick={() => scrollToSection(tabId)}
                // Combinaison de la classe de base et de la classe active conditionnelle
                className={`${styles.navButton} ${activeTab === tabId ? styles.active : ''}`}
              >
                {tabId.charAt(0).toUpperCase() + tabId.slice(1)}
              </button>
            ))}
          </nav>

          {/* Bouton WhatsApp */}
          <button onClick={handleWhatsAppContact} className={styles.whatsappButton}>
            <span>Contact WhatsApp</span>
            <ArrowRight className={styles.buttonIcon} /> {/* Classe optionnelle pour l'icône */}
          </button>
        </div>
      </header>

      {/* Section d'accueil Hero */}
      <section id="accueil" className={styles.heroSection}>
        <div className={`${styles.container} ${styles.heroContainer}`}> {/* Classe modificateur pour hero */}
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Des services IPTV de qualité supérieure</h1>
            <p className={styles.heroSubtitle}>Accédez à des milliers de chaînes TV et du contenu VOD avec notre service IPTV premium, stable et fiable.</p>
            <div className={styles.heroButtons}>
              <button onClick={() => scrollToSection('abonnements')} className={styles.offersButton}>
                Voir nos offres
              </button>
              <button onClick={handleWhatsAppContact} className={`${styles.whatsappButton} ${styles.whatsappHeroButton}`}> {/* Modificateur pour hero */}
                Contact WhatsApp
                <ArrowRight className={styles.buttonIcon} />
              </button>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Tv className={styles.heroIcon} />
          </div>
        </div>
      </section>

      {/* Section des services */}
      <section id="services" className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle}>Nos Services IPTV</h2>
            <p className={styles.sectionSubtitle}>Découvrez notre gamme complète de services offrant une expérience télévisuelle de haute qualité.</p>
          </div>

          <div className={`${styles.cardGrid} ${styles.cardGrid3Cols}`}> {/* Grille à 3 colonnes */}
            {/* Carte Service 1 */}
            <div className={`${styles.card} ${styles.serviceCard}`}> {/* Classe de base + spécifique */}
              <div className={styles.cardIcon}>
                <Tv /> {/* Les dimensions seront définies dans CSS */}
              </div>
              <h3 className={styles.cardTitle}>TV en Direct</h3> {/* Classe optionnelle */}
              <p>Accédez à +10,000 chaînes mondiales en HD/4K.</p>
              <ul>
                {['Sports', 'Films', 'Séries', 'Documentaires', 'International'].map((item, index) => (
                  <li key={index}>
                    <Check /> {/* Style via .card li svg */}
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Carte Service 2 */}
            <div className={`${styles.card} ${styles.serviceCard}`}>
               <div className={styles.cardIcon}>
                 <Monitor />
               </div>
               <h3 className={styles.cardTitle}>VOD Premium</h3>
               <p>Bibliothèque VOD énorme et mise à jour régulièrement.</p>
               <ul>
                 {['Films récents', 'Séries complètes', 'Contenu Enfants', 'Documentaires', 'Sans publicité'].map((item, index) => (
                   <li key={index}>
                     <Check />
                     {item}
                   </li>
                 ))}
               </ul>
            </div>

            {/* Carte Service 3 */}
            <div className={`${styles.card} ${styles.serviceCard}`}>
               <div className={styles.cardIcon}>
                 <Wifi />
               </div>
               <h3 className={styles.cardTitle}>Streaming Haute Performance</h3>
               <p>Streaming fluide grâce à nos serveurs dédiés.</p>
               <ul>
                 {['Aucun gel (Anti-freeze)', 'Haute Définition', 'Faible Latence', 'Serveurs Stables', 'Support 24/7'].map((item, index) => (
                   <li key={index}>
                     <Check />
                     {item}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section des abonnements */}
      <section id="abonnements" className={styles.abonnementsSection}>
        <div className={styles.container}>
           <div className={styles.sectionHeading}>
              <h2 className={styles.sectionTitle}>Nos Formules d'Abonnement</h2>
              <p className={styles.sectionSubtitle}>Choisissez la formule flexible et sans engagement qui vous convient.</p>
           </div>

          {/* items-stretch est géré via align-items: stretch dans CSS */}
          <div className={`${styles.cardGrid} ${styles.cardGrid3Cols} ${styles.itemsStretch}`}>
            {/* Carte Standard */}
            <div className={`${styles.card} ${styles.pricingCard}`}>
              <h3 className={styles.cardTitle}>Formule Standard</h3>
              <p className={styles.cardDescription}>Idéal pour démarrer</p>
              <div className={styles.price}>19,99€ <span>/mois</span></div>
              <ul>
                {[ '5,000+ chaînes', 'Qualité HD', '2 connexions', 'VOD basique', 'Support Email' ].map((feature, index) => (
                  <li key={index}><Check /><span>{feature}</span></li>
                ))}
              </ul>
              <button onClick={handleWhatsAppContact} className={styles.orderButton}>
                Commander
              </button>
            </div>

            {/* Carte Premium (Populaire) */}
            <div className={`${styles.card} ${styles.pricingCard} ${styles.popular}`}>
               {/* Badge ajouté via CSS ::before ou un div séparé */}
               <div className={styles.popularBadge}>Populaire</div>
               <h3 className={styles.cardTitle}>Formule Premium</h3>
               <p className={styles.cardDescription}>Notre meilleure offre</p>
               <div className={styles.price}>29,99€ <span>/mois</span></div>
               <ul>
                 {[ '10,000+ chaînes', 'Qualité HD & 4K', '4 connexions', 'VOD complète', 'Support Prioritaire 24/7' ].map((feature, index) => (
                   <li key={index}><Check /><span>{feature}</span></li>
                 ))}
               </ul>
               <button onClick={handleWhatsAppContact} className={styles.orderButton}>
                 Commander
               </button>
            </div>

            {/* Carte Famille */}
            <div className={`${styles.card} ${styles.pricingCard}`}>
               <h3 className={styles.cardTitle}>Formule Famille</h3>
               <p className={styles.cardDescription}>Pour toute la tribu</p>
               <div className={styles.price}>39,99€ <span>/mois</span></div>
               <ul>
                 {[ '10,000+ chaînes', 'Qualité HD & 4K', '6 connexions', 'VOD complète', 'Support Prioritaire 24/7', 'Contrôle parental' ].map((feature, index) => (
                   <li key={index}><Check /><span>{feature}</span></li>
                 ))}
               </ul>
               <button onClick={handleWhatsAppContact} className={styles.orderButton}>
                 Commander
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section des appareils compatibles */}
      <section id="appareils" className={styles.appareilsSection}>
         <div className={styles.container}>
            <div className={styles.sectionHeading}>
               <h2 className={styles.sectionTitle}>Appareils Compatibles</h2>
               <p className={styles.sectionSubtitle}>Profitez de votre contenu préféré sur l'appareil de votre choix.</p>
            </div>

           <div className={styles.deviceGrid}>
             {[
               { icon: Smartphone, name: 'Smartphones', desc: 'iOS & Android' },
               { icon: Tablet, name: 'Tablettes', desc: 'iPad & Android' },
               { icon: Tv, name: 'Smart TV', desc: 'Samsung, LG, Android TV...' },
               { icon: Monitor, name: 'Box TV', desc: 'Android Box, Fire Stick, MAG...' },
             ].map((device, index) => {
               const IconComponent = device.icon;
               return (
                 <div key={index} className={styles.deviceItem}>
                   <div className={styles.deviceIconWrapper}>
                     <IconComponent />
                   </div>
                   <h3>{device.name}</h3>
                   <p>{device.desc}</p>
                 </div>
               );
             })}
           </div>

           <div className={styles.configBox}>
             <h3 className={styles.configTitle}>Configuration Recommandée</h3>
             <div className={styles.configGrid}>
               <div className={`${styles.configColumn} ${styles.minimal}`}> {/* Classe modificateur */}
                 <h4>Exigences Minimales</h4>
                 <ul>
                   {[
                     'Connexion internet: 10 Mbps', 'RAM: 2 GB (appareil)',
                     'Android 5.0+ / iOS 12.0+', 'Smart TV (modèle 2018+)',
                   ].map((req, index) => ( <li key={index}><Check /><span>{req}</span></li> ))}
                 </ul>
               </div>

               <div className={`${styles.configColumn} ${styles.optimal}`}> {/* Classe modificateur */}
                 <h4>Configuration Optimale (pour 4K)</h4>
                 <ul>
                   {[
                     'Connexion internet: 25+ Mbps', 'Box Android/TV dédiée récente',
                     'TV 4K compatible HDR', 'Connexion Ethernet (filaire)',
                   ].map((req, index) => ( <li key={index}><Check /><span>{req}</span></li> ))}
                 </ul>
               </div>
             </div>
           </div>
         </div>
      </section>

      {/* Section FAQ */}
      <section id="faq" className={styles.faqSection}>
         <div className={styles.container}>
             <div className={styles.sectionHeading}>
                <h2 className={styles.sectionTitle}>Questions Fréquentes (FAQ)</h2>
                <p className={styles.sectionSubtitle}>Trouvez ici les réponses à vos interrogations.</p>
             </div>

           <div className={`${styles.cardGrid} ${styles.cardGrid2Cols} ${styles.faqGrid}`}> {/* Grille 2 colonnes + spécifique FAQ */}
             {[
                { q: "Qu'est-ce que l'IPTV ?", a: "L'IPTV (Internet Protocol Television) diffuse la TV via Internet, offrant plus de flexibilité que le satellite ou le câble." },
                { q: "Comment ça marche ?", a: "Après abonnement, vous recevez des identifiants à entrer dans une application compatible (ex: IPTV Smarters, TiviMate) sur votre appareil." },
                { q: "Combien d'appareils simultanés ?", a: "Cela dépend de votre formule : Standard (2), Premium (4), Famille (6). Une connexion = un appareil à la fois." },
                { q: "Qualité de streaming garantie ?", a: "Nous offrons des serveurs performants, mais la qualité finale dépend de votre vitesse internet et de la performance de votre appareil." },
                { q: "Comment contacter le support ?", a: "Via WhatsApp (Premium/Famille) 24/7 ou par Email (Standard). Les détails sont fournis après l'achat." },
                { q: "Mes données sont-elles sécurisées ?", a: "Oui, nous utilisons des connexions sécurisées et ne partageons pas vos informations personnelles." },
             ].map((item, index) => (
               <div key={index} className={`${styles.card} ${styles.faqCard}`}>
                 <h3>{item.q}</h3>
                 <p>{item.a}</p>
               </div>
             ))}
           </div>
         </div>
      </section>

      {/* Section Sécurité et Confidentialité */}
       <section id="securite" className={styles.securitySection}> {/* Ajout ID */}
         <div className={styles.container}>
           <div className={styles.securityGrid}>
             <div className={styles.securityTextContent}> {/* Wrapper pour le texte */}
                <h2 className={styles.sectionTitle} style={{textAlign: 'left'}}>Sécurité et Confidentialité</h2> {/* Alignement spécifique? */}
               <p className={styles.sectionSubtitle} style={{textAlign: 'left', margin: '0 0 2rem 0'}}>Votre sécurité et la protection de vos données sont notre priorité absolue. Nous nous engageons à vous fournir un service fiable et respectueux de votre vie privée.</p>
               <div className={styles.securityItemsList}>
                 {/* Item Sécurité 1 */}
                 <div className={styles.securityItem}>
                   <div className={styles.securityIconWrapper}><Shield /></div>
                   <div><h3>Connexions Sécurisées</h3><p>Nous utilisons des protocoles sécurisés pour protéger vos informations de connexion et votre activité.</p></div>
                 </div>
                 {/* Item Sécurité 2 */}
                 <div className={styles.securityItem}>
                   <div className={styles.securityIconWrapper}><Check className={styles.greenCheck} /></div> {/* Classe spécifique pour couleur */}
                   <div><h3>Confidentialité des Données</h3><p>Vos informations personnelles ne sont jamais vendues ou partagées avec des tiers.</p></div>
                 </div>
                  {/* Item Sécurité 3 */}
                 <div className={styles.securityItem}>
                   <div className={styles.securityIconWrapper}><Headphones /></div>
                   <div><h3>Support Discret</h3><p>Notre équipe vous assiste pour toute question technique ou de sécurité, en toute confidentialité.</p></div>
                 </div>
               </div>
             </div>

             <div className={styles.trustBox}>
                <h3 className={styles.trustBoxTitle}>Nos Engagements Sécurité</h3>
               <div className={styles.trustList}>
                 {[
                   'Serveurs protégés contre les attaques DDoS', 'Connexions cryptées possibles (selon l\'app)',
                   'Politique de non-conservation des logs d\'activité', 'Mises à jour régulières de sécurité',
                   'Processus de paiement sécurisé', 'Support client réactif et professionnel',
                 ].map((point, index) => (
                   <div key={index} className={styles.trustListItem}>
                     <Check /><span>{point}</span>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>
       </section>

      {/* Appel à l'action */}
      <section id="cta" className={styles.ctaSection}> {/* Ajout ID */}
         <div className={`${styles.container} ${styles.ctaContainer}`}> {/* Modificateur optionnel */}
            <h2 className={styles.ctaTitle}>Prêt à Révolutionner Votre Expérience TV ?</h2>
           <p className={styles.ctaSubtitle}>N'attendez plus ! Contactez-nous sur WhatsApp pour un essai gratuit ou pour choisir votre abonnement.</p>
           <button onClick={handleWhatsAppContact} className={styles.ctaButton}>
             <span>Discuter sur WhatsApp</span>
             <ArrowRight />
           </button>
         </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
         <div className={styles.container}>
           <div className={styles.footerGrid}>
             {/* Colonne Logo & Description */}
             <div>
               <div onClick={() => scrollToSection('accueil')} className={styles.footerLogo}>
                  IPTV<span>Vision</span>
               </div>
               <p>Votre source fiable pour un divertissement IPTV stable et de haute qualité.</p>
             </div>

             {/* Colonne Services */}
             <div>
               <h3 className={styles.footerHeading}>Services</h3>
               <ul>
                 {[{ name: 'TV en Direct', id: 'services' }, { name: 'VOD Premium', id: 'services' }, { name: 'Abonnements', id: 'abonnements' }, { name: 'Appareils Compatibles', id: 'appareils' }, { name: 'Support 24/7', id: 'faq' }].map((item, index) => (
                   <li key={index}><button onClick={() => scrollToSection(item.id)}>{item.name}</button></li>
                 ))}
               </ul>
             </div>

             {/* Colonne Support */}
             <div>
               <h3 className={styles.footerHeading}>Support</h3>
               <ul>
                 {[{ name: 'FAQ', id: 'faq' }, { name: 'Guides (bientôt)', id: '#' }, { name: 'Contactez-nous', id: '#' }, { name: 'Conditions Générales', id: '#' }, { name: 'Politique de Confidentialité', id: '#' }].map((item, index) => (
                    <li key={index}>
                     {item.id === '#' ? ( <span className={styles.disabledLink}>{item.name}</span> ) : ( <button onClick={() => item.id.startsWith('#') ? null : scrollToSection(item.id)}>{item.name}</button> )}
                    </li>
                 ))}
               </ul>
             </div>

             {/* Colonne Contact */}
             <div className={styles.footerContact}> {/* Classe spécifique pour la colonne contact */}
               <h3 className={styles.footerHeading}>Contact Rapide</h3>
               <button onClick={handleWhatsAppContact} className={`${styles.whatsappButton} ${styles.footerWhatsappButton}`}> {/* Modificateur pour footer */}
                 {/* L'icône SVG peut être mise directement ici ou via CSS background-image si préférée sans JS */}
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 22.114l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                 <span>WhatsApp</span>
               </button>
               <p>Support disponible 24/7</p>
             </div>
           </div>

           <div className={styles.footerBottom}>
              <p>&copy; {new Date().getFullYear()} IPTVision. Tous droits réservés.</p>
              <p>Avertissement : Assurez-vous d'avoir les droits nécessaires pour accéder au contenu diffusé via IPTV.</p>
           </div>
         </div>
      </footer>
    </div>
  );
};

export default IPTVWebsite;