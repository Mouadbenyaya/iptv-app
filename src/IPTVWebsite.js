import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Check, Monitor, Smartphone, Tablet, Tv, Wifi, Shield, Headphones, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './IPTVWebsite.module.css'; // Assuming you update this CSS file
import coverImage from './/images/mobile-device.png';


// --- Data (Consider moving to a separate file for larger apps) ---

const navItems = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'services', label: 'Services' },
  { id: 'abonnements', label: 'Abonnements' },
  { id: 'appareils', label: 'Appareils' },
  { id: 'faq', label: 'FAQ' },
  { id: 'securite', label: 'Securite' },
  // { id: 'testimonials', label: 'Avis' }, // Consider adding a Testimonials section
  { id: 'cta', label: 'Commencer' },
];

const servicesData = [
  {
    icon: Tv,
    title: 'TV en Direct Premium',
    description: 'Accédez à +10,000 chaînes mondiales en HD/4K – Ne manquez aucun match !',
    features: ['Sports en direct (Foot, Basket, F1...)', 'Films & Séries (US, FR, AR...)', 'Actualités Mondiales', 'Documentaires Captivants', 'Chaînes Internationales'],
  },
  {
    icon: Monitor,
    title: 'VOD Illimitée & Récente',
    description: 'Bibliothèque VOD massive mise à jour quotidiennement.',
    features: ['Derniers Films Blockbusters', 'Séries Complètes (Saisons à jour)', 'Contenu Enfants Sécurisé', 'Documentaires Exclusifs', 'Zéro Publicité Intrusive'],
  },
  {
    icon: Wifi,
    title: 'Streaming Ultra-Fluide',
    description: 'Serveurs dédiés haute performance pour un visionnage sans coupure.',
    features: ['Technologie Anti-freeze Avancée', 'Qualité Stable HD/4K/8K', 'Latence Minimale (Idéal Sport)', 'Serveurs Européens & Mondiaux', 'Support Technique Réactif 24/7'],
  },
];

const pricingData = [
  {
    title: 'Formule Essentiel',
    description: 'Idéal pour découvrir',
    price: '19,99€',
    period: '/mois',
    features: ['5,000+ chaînes', 'Qualité HD', '2 connexions simultanées', 'VOD basique', 'Support Email'],
    popular: false,
  },
  {
    title: 'Formule Premium',
    description: 'Le choix préféré pour le Sport & Divertissement',
    price: '29,99€',
    period: '/mois',
    features: ['10,000+ chaînes', 'Qualité HD & 4K', '4 connexions simultanées', 'VOD complète & à jour', 'Support Prioritaire 24/7'],
    popular: true,
    badge: 'Meilleure Offre',
  },
  {
    title: 'Formule Famille Max',
    description: 'Pour toute la maison, sur tous les écrans',
    price: '39,99€',
    period: '/mois',
    features: ['10,000+ chaînes', 'Qualité HD & 4K/8K', '6 connexions simultanées', 'VOD complète & à jour', 'Support Prioritaire 24/7', 'Contrôle parental facile'],
    popular: false,
  },
];

const devicesData = [
    { icon: Smartphone, name: 'Smartphones', desc: 'iOS & Android (Apps dédiées)' },
    { icon: Tablet, name: 'Tablettes', desc: 'iPad & Tablettes Android' },
    { icon: Tv, name: 'Smart TV', desc: 'Samsung, LG, Sony, Philips...' },
    { icon: Monitor, name: 'Box TV & Clés', desc: 'Android Box, Fire Stick, Apple TV...' },
    // { icon: Computer, name: 'Ordinateurs', desc: 'Windows, macOS, Linux (Web Player/Apps)' }, // Example: Add more if needed
];

const faqData = [
  { q: "Qu'est-ce que l'IPTV exactement ?", a: "C'est la télévision diffusée via votre connexion Internet au lieu du câble ou satellite traditionnel. Cela offre plus de flexibilité, un plus grand choix de chaînes et souvent une meilleure qualité d'image." },
  { q: "Est-ce compliqué à installer ?", a: "Pas du tout ! Après l'abonnement, vous recevez des identifiants (ou un lien/fichier). Il suffit de les entrer dans une application IPTV compatible sur votre appareil (nous vous guidons !)." },
  { q: "Sur combien d'appareils puis-je regarder en même temps ?", a: "Cela dépend de votre formule : Essentiel (2 appareils), Premium (4 appareils), Famille Max (6 appareils) simultanément." },
  { q: "La qualité d'image est-elle toujours bonne ?", a: "Nous utilisons des serveurs très performants pour garantir la meilleure qualité possible (HD/4K/8K selon la chaîne). Cependant, une connexion Internet stable et rapide (15 Mbps+ recommandé pour la 4K) est essentielle de votre côté." },
  { q: "Est-ce légal et sûr ?", a: "Nous opérons dans le respect des réglementations applicables à nos services. Vos connexions sont sécurisées et vos données personnelles protégées. Nous recommandons l'utilisation d'un VPN pour une confidentialité maximale, bien que ce ne soit pas obligatoire avec notre service." },
];

const securityFeatures = [
    { icon: Shield, text: 'Connexions Chiffrées' },
    { icon: Check, text: 'Protection des Données' },
    { icon: Headphones, text: 'Support Client Discret' },
    // { icon: Lock, text: 'Paiements Sécurisés' } // Add if applicable
];

// --- Helper Hook for Intersection Observer ---
const useIntersectionObserver = (setActiveTab) => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.4, // 40% of section visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);
    const currentObserver = observerRef.current; // Capture ref value

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => currentObserver.observe(section));

    return () => {
      sections.forEach((section) => currentObserver.unobserve(section));
    };
  }, [setActiveTab]);
};


// --- FAQ Item Component ---
const FaqItem = ({ q, a, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`${styles.card} ${styles.faqCard} ${isOpen ? styles.faqCardOpen : ''}`}>
            {/* CSS: Style .faqCardOpen differently, maybe border color */}
            <button
                className={styles.faqQuestionButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                /* CSS: Style this button: width 100%, text-align left, add icon positioning */
            >
                <h3 className={styles.faqQuestionText}>{q}</h3>
                <span className={styles.faqIcon}>
                    {/* CSS: Style this span to position the icon */}
                    {isOpen ? <ChevronUp /> : <ChevronDown />}
                </span>
            </button>
            <div
                id={`faq-answer-${index}`}
                className={`${styles.faqAnswer} ${isOpen ? styles.faqAnswerVisible : ''}`}
                /* CSS: Use max-height transition for smooth open/close. Style .faqAnswerVisible */
            >
                <p>{a}</p>
            </div>
        </div>
    );
};


// --- Main Component ---
const IPTVWebsite = () => {
  const [activeTab, setActiveTab] = useState(navItems[0].id);
  // Maybe add state for modal visibility if implementing forms/modals
  // const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Smooth Scrolling Setup
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Intersection Observer Hook
  useIntersectionObserver(setActiveTab);

  // Scroll Function
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
        // Calculate offset if header is sticky and opaque
        const headerOffset = document.querySelector(`.${styles.stickyHeader}`)?.offsetHeight || 80; // Adjust offset as needed
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        // Manually set active tab for faster feedback, observer will correct if needed
        setActiveTab(sectionId);
    }
  }, []); // Empty dependency array is fine if styles.stickyHeader height is consistent

  // WhatsApp Handler
  const handleWhatsAppContact = (message = '') => {
    // Replace with your actual WhatsApp number
    const whatsappNumber = '+0123456789';
    const encodedMessage = encodeURIComponent(message || "Bonjour ! Je suis intéressé par vos services IPTV.");
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    // Add rel="noopener noreferrer" for security
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // --- Render ---
  return (
    <div className={styles.iptvWebsiteWrapper}>
      {/* Header */}
      <header className={`${styles.header} ${styles.stickyHeader}`}>
        {/* CSS: Ensure this header has a consistent height for scroll offset calculation */}
        <div className={styles.container}>
          {/* Logo - Make it a link to home/top */}
          <a
             href="#accueil"
             className={styles.logoLink}
             onClick={(e) => { e.preventDefault(); scrollToSection('accueil'); }}
             aria-label="IPTV Vision Home"
             /* CSS: Add focus-visible styles */
            >
            <div className={styles.logoText}>
              IPTV<span className={styles.logoTextSpan}>Vision</span>
            </div>
          </a>

          {/* Navigation */}
          <nav className={styles.navigation} aria-label="Main Navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                   e.preventDefault();
                   scrollToSection(item.id);
                }}
                className={`${styles.navButton} ${activeTab === item.id ? styles.active : ''}`}
                aria-current={activeTab === item.id ? 'page' : undefined} // Accessibility!
                /* CSS: Add focus-visible styles */
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Header Contact Button */}
          <button
            onClick={() => handleWhatsAppContact()}
            className={`${styles.headerContactButton} ${styles.gradientButton}`}
            /* CSS: Add focus-visible styles. Maybe differentiate slightly from body buttons */
          >
            <span>Contact Rapide</span>
            <ArrowRight className={styles.buttonIcon} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="accueil" className={styles.heroSection} aria-labelledby="hero-title">
  <div className={`${styles.container} ${styles.heroContainer}`}> {/* This container will become a flex container */}

    {/* Left Column: Text Content (Existing Code) */}
    <div className={styles.heroContent}>
      <h1 id="hero-title" className={styles.heroTitle}>
        L'Expérience IPTV Ultime: Stable, Rapide, Complet
      </h1>
      <p className={styles.heroSubtitle}>
        +10,000 Chaînes Live, VOD à Jour, Qualité 4K/8K. Foot, Films, Séries - Ne Manquez Plus Rien !
      </p>
      <div className={styles.heroButtons}>
        <button
            onClick={() => scrollToSection('abonnements')}
            className={`${styles.ctaButtonHero} ${styles.gradientButton}`}
            >
          Voir les Formules
        </button>
        <button
          onClick={() => handleWhatsAppContact("Bonjour, je suis intéressé par un essai gratuit.")}
          className={`${styles.secondaryButtonHero}`}
        >
          Demander un Essai Gratuit <ArrowRight className={styles.buttonIcon} />
        </button>
      </div>
      {/* Optional: Trust Signals Placeholder */}
      {/* <div className={styles.heroTrustBadges}>...</div> */}
    </div>

    {/* Right Column: Image Container (NEW CODE) */}
    <div className={styles.heroImageContainer}>
      <img
        // --- IMPORTANT: Replace with the actual path to YOUR image ---
          src={coverImage}  
        // --- IMPORTANT: Add descriptive alt text for accessibility ---
        alt="Illustration showing IPTV service on multiple devices"
        className={styles.heroImage}
        loading="lazy" // Improves performance
      />
    </div>

  </div>
</section>


        {/* Services Section */}
        <section id="services" className={styles.servicesSection} aria-labelledby="services-title">
          <div className={styles.container}>
            <div className={`${styles.sectionHeading}`}>
              {/* CSS: Animate this heading on scroll */}
              <h2 id="services-title" className={styles.sectionTitle}>Pourquoi Choisir IPTV Vision ?</h2>
              <p className={styles.sectionSubtitle}>Plus qu'un simple abonnement, une véritable expérience.</p>
            </div>
            <div className={`${styles.cardGrid} ${styles.cardGrid3Cols}`}>
              {/* CSS: Apply staggered entrance animations to cards */}
              {servicesData.map((service, index) => {
                 const IconComponent = service.icon;
                 return (
                    <div key={index} className={`${styles.card} ${styles.serviceCard}`}>
                         {/* CSS: Add enhanced hover effects */}
                        <div className={styles.cardIcon}>
                           <IconComponent className={styles.iconAnimated} aria-hidden="true" />
                        </div>
                        <h3 className={styles.cardTitle}>{service.title}</h3>
                        <p className={styles.cardDescription}>{service.description}</p>
                        <ul className={styles.featureList}>
                           {service.features.map((feature, fIndex) => (
                              <li key={fIndex}>
                                 <Check aria-hidden="true" className={styles.featureIcon} />
                                 <span>{feature}</span>
                              </li>
                           ))}
                        </ul>
                    </div>
                 );
              })}
            </div>
          </div>
        </section>

        {/* Abonnements Section */}
        <section id="abonnements" className={styles.abonnementsSection} aria-labelledby="abonnements-title">
          <div className={styles.container}>
            <div className={`${styles.sectionHeading}`}>
              <h2 id="abonnements-title" className={styles.sectionTitle}>Nos Formules d'Abonnement</h2>
              <p className={styles.sectionSubtitle}>Transparent, Flexible, Adapté à vos besoins.</p>
              {/* Consider adding a Monthly/Annual toggle switch here */}
            </div>
            <div className={`${styles.cardGrid} ${styles.cardGrid3Cols} ${styles.itemsStretch}`}>
              {/* CSS: Apply staggered entrance animations to cards */}
              {pricingData.map((plan, index) => (
                <div key={index} className={`${styles.card} ${styles.pricingCard} ${plan.popular ? styles.popular : ''}`}>
                   {/* CSS: Enhance hover effect, esp. on popular plan */}
                   {plan.popular && <div className={styles.popularBadge}>{plan.badge || 'Populaire'}</div>}
                  <h3 className={styles.cardTitle}>{plan.title}</h3>
                  <p className={styles.cardDescription}>{plan.description}</p>
                  <div className={styles.price}>
                     {plan.price} <span>{plan.period}</span>
                     {/* Maybe add small print like "TTC" or "Sans engagement" */}
                  </div>
                   <ul className={styles.featureList}>
                     {plan.features.map((feature, fIndex) => (
                        <li key={fIndex}>
                           <Check aria-hidden="true" className={styles.featureIcon} />
                           <span>{feature}</span>
                           {/* Consider adding info tooltips for complex features */}
                        </li>
                     ))}
                  </ul>
                  {/* Consider a modal confirmation before WhatsApp */}
                  <button
                    onClick={() => handleWhatsAppContact(`Bonjour, je souhaite commander la ${plan.title}.`)}
                    className={`${styles.orderButton} ${styles.gradientButton}`}
                    /* CSS: Add focus-visible styles */
                    >
                    Commander Maintenant
                  </button>
                </div>
              ))}
            </div>
            {/* Add comparison table link/button? */}
            {/* <div className={styles.comparisonLinkWrapper}> */}
            {/* <button>Comparer les plans en détail</button> */}
            {/* </div> */}
          </div>
        </section>

        {/* Appareils Section */}
        <section id="appareils" className={styles.appareilsSection} aria-labelledby="appareils-title">
          <div className={styles.container}>
            <div className={`${styles.sectionHeading}`}>
              <h2 id="appareils-title" className={styles.sectionTitle}>Compatible Partout</h2>
              <p className={styles.sectionSubtitle}>Regardez sur vos appareils préférés, sans tracas.</p>
            </div>
            <div className={styles.deviceGrid}>
               {/* CSS: Apply staggered entrance animations to items */}
               {devicesData.map((device, index) => {
                  const IconComponent = device.icon;
                  // Apply stagger delay using inline style (can also be done via CSS nth-child if static)
                  // Requires corresponding animation-delay in CSS: animation-delay: calc(0.1s * var(--i));
                  const style = { '--i': index + 1 };
                  return (
                    <div key={index} className={styles.deviceItem} style={style}>
                        <div className={styles.deviceIconWrapper}>
                           <IconComponent className={styles.iconAnimated} aria-hidden="true" />
                        </div>
                        <h3 className={styles.deviceName}>{device.name}</h3>
                        <p className={styles.deviceDesc}>{device.desc}</p>
                    </div>
                  );
               })}
            </div>
            {/* <div className={styles.setupGuideLink}> */}
            {/* <button>Voir les guides d'installation</button> */}
            {/* </div> */}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className={styles.faqSection} aria-labelledby="faq-title">
            <div className={styles.container}>
                <div className={`${styles.sectionHeading}`}>
                    <h2 id="faq-title" className={styles.sectionTitle}>Questions Fréquentes (FAQ)</h2>
                    <p className={styles.sectionSubtitle}>Vos réponses, claires et directes.</p>
                </div>
                <div className={`${styles.faqGrid}`}>
                    {/* CSS: Maybe use 1 column on mobile, 2 on desktop */}
                    {faqData.map((item, index) => (
                        <FaqItem key={index} q={item.q} a={item.a} index={index} />
                    ))}
                </div>
            </div>
        </section>

        {/* Sécurité Section */}
        <section id="securite" className={styles.securitySection} aria-labelledby="securite-title">
          <div className={styles.container}>
            <div className={`${styles.sectionHeading}`}>
              <h2 id="securite-title" className={styles.sectionTitle}>Votre Sécurité & Confidentialité</h2>
              <p className={styles.sectionSubtitle}>Profitez en toute tranquillité.</p>
            </div>
            <div className={styles.securityGrid}>
              {/* CSS: Apply entrance animations */}
              {securityFeatures.map((item, index) => {
                 const IconComponent = item.icon;
                 return (
                    <div key={index} className={styles.securityItem}>
                         <IconComponent className={styles.iconAnimated} aria-hidden="true" />
                         <span>{item.text}</span>
                    </div>
                 );
              })}
            </div>
            {/* <p className={styles.vpnRecommendation}>Pour une confidentialité maximale, nous recommandons l'utilisation d'un VPN (non inclus).</p> */}
          </div>
        </section>

  


        {/* CTA Section */}
        <section id="cta" className={styles.ctaSection} aria-labelledby="cta-title">
          {/* CSS: Enhance background effect (pulseGlow) */}
          <div className={`${styles.container} ${styles.ctaContainer}`}>
             {/* CSS: Apply entrance animations */}
            <h2 id="cta-title" className={styles.ctaTitle}>Prêt à Révolutionner Votre TV ?</h2>
            <p className={styles.ctaSubtitle}>Rejoignez des milliers d'utilisateurs satisfaits. Commencez dès aujourd'hui !</p>
            {/* Consider a modal confirmation before WhatsApp */}
            <button
                onClick={() => handleWhatsAppContact("Bonjour, je suis prêt à commencer ! Parlez-moi des offres.")}
                className={`${styles.ctaButton} ${styles.gradientButton}`}
                /* CSS: Add focus-visible styles */
            >
              <span>Commencer l'Expérience</span>
              <ArrowRight />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Footer Column 1: Logo & About */}
            <div>
                <a
                    href="#accueil"
                    className={styles.footerLogoLink}
                    onClick={(e) => { e.preventDefault(); scrollToSection('accueil'); }}
                    aria-label="IPTV Vision Home"
                    /* CSS: Add focus-visible styles */
                    >
                   <div className={styles.footerLogo}>IPTV<span>Vision</span></div>
                </a>
              <p className={styles.footerDescription}>Votre source N°1 pour un divertissement IPTV stable, premium et abordable.</p>
              {/* Social Media Icons Placeholder */}
              {/* <div className={styles.socialIcons}>...</div> */}
            </div>

            {/* Footer Column 2: Quick Links */}
            <div>
              <h3 className={styles.footerHeading}>Liens Rapides</h3>
              <ul className={styles.footerLinksList}>
                {navItems
                    .filter(item => ['accueil', 'services', 'abonnements', 'faq'].includes(item.id)) // Filter relevant links
                    .map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                            /* CSS: Add focus-visible styles */
                        >
                            {item.label}
                        </a>
                    </li>
                ))}
                 {/* Add links to Terms, Privacy Policy if available */}
                 {/* <li><a href="/terms">Conditions</a></li> */}
                 {/* <li><a href="/privacy">Confidentialité</a></li> */}
              </ul>
            </div>

            {/* Footer Column 3: Contact */}
            <div>
              <h3 className={styles.footerHeading}>Contactez-Nous</h3>
               <p>Support rapide via WhatsApp :</p>
               <button
                 onClick={() => handleWhatsAppContact()}
                 className={`${styles.whatsappButtonFooter} ${styles.gradientButton}`}
                 /* CSS: Add focus-visible styles. Maybe style slightly smaller */
                 >
                 <span>Discuter sur WhatsApp</span>
                 <ArrowRight />
               </button>
               {/* Add Email contact if available */}
               {/* <p>Ou par email : <a href="mailto:support@iptvvision.com">support@iptvvision.com</a></p> */}
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} IPTVision. Tous droits réservés. Developed by Mouad</p>
            {/* Maybe add a disclaimer about channel availability or legal notice */}
            {/* <p className={styles.disclaimer}>Disclaimer: ...</p> */}
          </div>
        </div>
      </footer>

       {/* Back to Top Button Placeholder - Implement with useState and scroll listener */}
       {/* {showBackToTop && <button onClick={scrollToTop} className={styles.backToTopButton}>^</button>} */}

    </div>
  );
};

export default IPTVWebsite;