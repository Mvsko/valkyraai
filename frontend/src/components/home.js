import React, { useEffect } from 'react';
import '../styles/style.css';

function Home() {
  const handleDiscoverClick = () => {
    window.location.href = '/valkyraai';
  };

  useEffect(() => {
    const featuresSection = document.getElementById('features');
    const aboutSection = document.getElementById('about');
    const plansSection = document.getElementById('plans');
    const contactSection = document.getElementById('contact');

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, options);

    if (featuresSection) observer.observe(featuresSection);
    if (aboutSection) observer.observe(aboutSection);
    if (plansSection) observer.observe(plansSection);
    if (contactSection) observer.observe(contactSection);

    return () => {
      if (featuresSection) observer.unobserve(featuresSection);
      if (aboutSection) observer.unobserve(aboutSection);
      if (plansSection) observer.unobserve(plansSection);
      if (contactSection) observer.unobserve(contactSection);
    };
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">Valkyra</span>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"><a className="nav-link" href="#features">Fonctionnalités</a></li>
              <li className="nav-item"><a className="nav-link" href="#about">À propos</a></li>
              <li className="nav-item"><a className="nav-link" href="#plans">Nos Plans</a></li>
              <li className="nav-item"><a className="nav-link contact-link" href="#contact">Contact</a></li>
              <li className="nav-item"><a className="nav-link btn btn-warning text-dark" href="localhost">Commencer</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="hero-section text-center">
        <div className="container">
          <h1 className="text-warning">Bienvenue dans l'univers de Valkyra</h1>
          <p>Un assistant puissant et éclairé pour guider vos décisions.</p>
          <div className="btn-group mt-4">
            <button onClick={handleDiscoverClick} className="btn btn-warning text-dark">Découvrir</button>
            <button className="btn btn-outline-warning">En savoir plus</button>
          </div>
        </div>
      </header>

      <section id="features" className="features-section py-5 hidden">
        <div className="container text-center">
          <h2 className="text-warning mb-5"><u>Fonctionnalités</u></h2>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-card p-4">
                <h3 className="text-warning">Interaction Naturelle</h3>
                <p>Valkyra utilise des modèles avancés pour comprendre et répondre naturellement.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4">
                <h3 className="text-warning">Personnalisation</h3>
                <p>Adaptez les réponses et les suggestions selon vos préférences.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card p-4">
                <h3 className="text-warning">Accessibilité 24/7</h3>
                <p>Assistance disponible à tout moment, où que vous soyez.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="about-section py-5 text-center hidden">
        <div className="container">
          <h2 className="text-warning mb-3"><u>À propos de Valkyra</u></h2>
          <p className="mb-3 mx-auto" style={{ maxWidth: '600px', lineHeight: '1.5' }}>
            <strong>Valkyra</strong> se spécialise dans le développement de solutions d'intelligence artificielle conversationnelle, reposant sur des modèles de langage avancés. 
            Nous concevons des outils intuitifs et performants, permettant aux utilisateurs d'interagir de manière fluide avec la technologie pour la génération de texte, 
            la traduction multilingue et l'analyse contextuelle.
          </p>
          <p className="mx-auto" style={{ maxWidth: '600px', lineHeight: '1.5' }}>
            Notre engagement est d'accompagner les entreprises dans l'automatisation de processus et la création de chatbots intelligents. 
            Chez Valkyra, l'innovation en IA est au cœur de notre mission, avec des solutions fiables et adaptées aux besoins spécifiques de chaque client.
          </p>
        </div>
      </section>


      <section id="plans" className="pricing-plans-section py-5 hidden">
        <div className="container">
          <h2 className="text-warning text-center"><u>Nos Plans</u></h2>
          <div className="con-items">
            <div className="item item1">
              <div className="con-img">
                <img src="1-3.png" alt=""/>
              </div>
              <header>
                <h3>Starter</h3>
                <p><b>9.95€ / mois</b></p>
                <p><span className="plans-text1">Idéal pour les petites entreprises et les particuliers souhaitant tester les capacités de l'IA.</span></p>
              </header>                
              <ul>
                <li><i className='bx bx-check'></i>Génération de texte basique</li>
                <li><i className='bx bx-check'></i>Traduction dans 5 langues principales</li>
                <li><i className='bx bx-check'></i>Analyse contextuelle de base</li>
                <li><i className='bx bx-check'></i>Support par e-mail</li>
              </ul>
              <button>Choisir le plan</button>
            </div>

            <div className="item color item2">
              <div className="con-img">
                <img src="2-1.png" alt=""/>
              </div>
              <span className="badge">Populaire</span>
              <header>
                <h3>Premium</h3>
                <p><b>18.95€ / mois</b></p>
                <p><span className="plans-text1">Pour les entreprises recherchant une interaction IA plus avancée et multilingue.</span></p>
              </header>
              <ul>
                <li><i className='bx bx-check'></i>Toutes les fonctionnalités de Starter</li>
                <li><i className='bx bx-check'></i>Génération de texte avancée</li>
                <li><i className='bx bx-check'></i>Analyse contextuelle approfondie</li>
                <li><i className='bx bx-check'></i>Relecture et optimisation de texte</li>
                <li><i className='bx bx-check'></i>Support prioritaire</li>
                <li><i className='bx bx-check'></i>Accès à l'API</li>
              </ul>                
              <button className="border">Choisir le plan</button>
            </div>

            <div className="item item3">
              <div className="con-img">
                <img src="3-1.png" alt=""/>
              </div>
              <header>
                <h3>Ultra</h3>
                <p><b>34.95€ / mois</b></p>
                <p><span className="plans-text1">Conçu pour les moyennes et grandes entreprises ayant des besoins en IA complexes.</span></p>
              </header>
              <ul>
                <li><i className='bx bx-check'></i>Toutes les fonctionnalités de Premium</li>
                <li><i className='bx bx-check'></i>Génération de code</li>
                <li><i className='bx bx-check'></i>Analyse contextuelle spécialisée par secteur</li>
                <li><i className='bx bx-check'></i>Reconnaissance vocale (S2T) et génération audio (T2S)</li>
                <li><i className='bx bx-check'></i>Accès à l'API</li>
              </ul>
              <button>Choisir le plan</button>
            </div>
          </div>
        </div>
      </section>


      <section id="contact" className="contact-section py-5 hidden">
        <div className="container text-center">
          <h2 className="text-warning"><u>Contactez-nous</u></h2>
          <p>Une question ? Nous sommes là pour vous aider.</p>
          <button className="btn btn-warning mt-4 text-dark">Envoyer un message</button>
        </div>
      </section>

      <footer className="footer-section py-4">
        <div className="container text-center">
          <p>Solutions qui conduisent au succès et propulsent votre entreprise vers l'avant</p>
          <p>Copyright © 2024 Valkyra. Tous droits réservés.</p>
          <div className="footer-links">
            <button className="btn btn-link footer-link">Politique de confidentialité</button>
            <button className="btn btn-link footer-link">Conditions d'utilisation</button>
            <button className="btn btn-link footer-link">Contactez-nous</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
