import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle2, TrendingUp, Shield, Cpu, Database, Zap, Mail, Linkedin, ExternalLink } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [rotatingWord, setRotatingWord] = useState(0);
  const { toast } = useToast();

  // Rotating words for the hero section
  const rotatingWords = [
    'bureaucracy',
    'overthinking',
    'spreadsheets',
    'wasted time',
    'complexity',
    'guesswork',
    'pressure',
    'manual work',
    'confusions',
    'inaccuracies',
    'endless threads'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'problem', 'solution', 'features', 'team', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotating word animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingWord((prev) => (prev + 1) % rotatingWords.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit directly to Formspree
      const response = await axios.post('https://formspree.io/f/mgvpwdge', formData, {
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.status === 200) {
        toast({
          title: "Message Sent!",
          description: "Thank you for your interest. We'll get back to you soon.",
        });
        setFormData({ name: '', email: '', company: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email us directly at info@viridata.eu",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="viridata-container">
      {/* Fixed Header */}
      <header className="dark-header">
        <div className="header-content">
          <div className="logo-container" onClick={() => scrollToSection('hero')}>
            <img
              src="https://customer-assets.emergentagent.com/job_3bbe4988-d7b8-4d45-bbcc-260df7b4fb90/artifacts/7ywytmq2_Logo.png"
              alt="Viridata Logo"
              className="dark-logo" />

            <span className="company-name">Viridata</span>
          </div>
          <nav className="dark-nav">
            <a onClick={() => scrollToSection('problem')} className={`dark-nav-link ${activeSection === 'problem' ? 'active' : ''}`}>Problem</a>
            <a onClick={() => scrollToSection('solution')} className={`dark-nav-link ${activeSection === 'solution' ? 'active' : ''}`}>Solution</a>
            <a onClick={() => scrollToSection('features')} className={`dark-nav-link ${activeSection === 'features' ? 'active' : ''}`}>Features</a>
            <a onClick={() => scrollToSection('team')} className={`dark-nav-link ${activeSection === 'team' ? 'active' : ''}`}>Team</a>
            <Button onClick={() => scrollToSection('contact')} className="btn-primary">Contact Us</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <div className="tagline">Making Sustainability Visible</div>
            <h1 className="hero-title">
              Get ESG compliance done without{' '}
              <span className="rotating-word-container">
                <span className="rotating-word" key={rotatingWord}>
                  {rotatingWords[rotatingWord]}
                </span>
              </span>
            </h1>
            <p className="hero-description">
              Viridata transforms complex ESG compliance into automated, transparent reporting. 
              Our AI-driven platform predicts CO₂ credit values, automates CBAM reporting, 
              and prepares for blockchain-powered transparency.
            </p>
            <div className="hero-cta">
              <Button onClick={() => scrollToSection('contact')} className="btn-primary large">
                Request Demo
                <ExternalLink className="icon" />
              </Button>
              <Button onClick={() => scrollToSection('solution')} className="btn-secondary large">
                Learn More
              </Button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">5-7</div>
                <div className="stat-label">Target Clients by Q3 2026</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">€240k</div>
                <div className="stat-label">ARR Target</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10,000</div>
                <div className="stat-label">TAM Market Size</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="problem-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">The ESG Compliance Crisis</h2>
            <p className="section-subtitle">
              Companies face mounting pressure from CBAM regulations, escalating penalties, 
              and complex data requirements that strain resources and risk non-compliance.
            </p>
          </div>
          <div className="problem-grid">
            <Card className="problem-card">
              <CardContent className="card-content">
                <div className="problem-icon">€250</div>
                <h3 className="problem-title">Escalating Penalties</h3>
                <p className="problem-description">
                  Up to €250 per tCO₂ in penalties for reporting failures. 
                  A 5,000 tCO₂ gap could cost €1.25M.
                </p>
              </CardContent>
            </Card>
            <Card className="problem-card">
              <CardContent className="card-content">
                <div className="problem-icon">80%</div>
                <h3 className="problem-title">Working Capital Strain</h3>
                <p className="problem-description">
                  Importers must pre-purchase 80% of estimated quarterly certificates, 
                  severely impacting cash flow.
                </p>
              </CardContent>
            </Card>
            <Card className="problem-card">
              <CardContent className="card-content">
                <div className="problem-icon">€45M</div>
                <h3 className="problem-title">Heavy Importer Burden</h3>
                <p className="problem-description">
                  Heavy importers could face up to €45M in CBAM liability by 2034 
                  as coverage requirements increase.
                </p>
              </CardContent>
            </Card>
            <Card className="problem-card">
              <CardContent className="card-content">
                <div className="problem-icon">100+</div>
                <h3 className="problem-title">Data Complexity</h3>
                <p className="problem-description">
                  Managing sector-specific boundaries, supplier data collection, 
                  and verification creates operational bottlenecks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="solution-section">
        <div className="section-container">
          <div className="solution-content">
            <div className="solution-left">
              <h2 className="section-title">Automated ESG Reporting, Powered by AI</h2>
              <p className="solution-intro">
                Viridata transforms the ESG compliance nightmare into a streamlined, 
                automated process. Our managed service eliminates bureaucracy while 
                ensuring audit-ready reports with zero human error.
              </p>
              <div className="solution-features">
                <div className="solution-feature">
                  <CheckCircle2 className="feature-icon" />
                  <div>
                    <h3 className="feature-title">Zero-Friction Data Integration</h3>
                    <p className="feature-text">
                      Read-only access to SAP, D365, Oracle, or simple CSV uploads. 
                      No complex integrations required.
                    </p>
                  </div>
                </div>
                <div className="solution-feature">
                  <CheckCircle2 className="feature-icon" />
                  <div>
                    <h3 className="feature-title">AI-Powered Validation</h3>
                    <p className="feature-text">
                      Our calculation engine transforms ERP data into regulator-ready 
                      outputs with confidence bands and gap-filling.
                    </p>
                  </div>
                </div>
                <div className="solution-feature">
                  <CheckCircle2 className="feature-icon" />
                  <div>
                    <h3 className="feature-title">One-Click Generation</h3>
                    <p className="feature-text">
                      Generate XML/PDF reports for CBAM, CSRD, and GHG Scope 1/2/3 
                      with a single click.
                    </p>
                  </div>
                </div>
                <div className="solution-feature">
                  <CheckCircle2 className="feature-icon" />
                  <div>
                    <h3 className="feature-title">SLA-Backed Guarantees</h3>
                    <p className="feature-text">
                      We compensate for any filing or miscalculation errors. 
                      Your compliance is our responsibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="solution-right">
              <div className="solution-stats">
                <div className="stat-card">
                  <div className="stat-icon">⚡</div>
                  <div className="stat-value">5 clicks</div>
                  <div className="stat-description">Initial outputs delivered</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-value">1 meeting</div>
                  <div className="stat-description">Onboarding completed</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">✓</div>
                  <div className="stat-value">0 errors</div>
                  <div className="stat-description">SLA-backed accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Technology That Sets Us Apart</h2>
            <p className="section-subtitle">
              Our platform combines cutting-edge AI for forecasting, automation for efficiency, 
              and future blockchain integration for unmatched transparency.
            </p>
          </div>
          <div className="features-grid">
            <Card className="feature-card">
              <CardContent className="feature-card-content">
                <div className="feature-card-icon">
                  <Cpu className="icon" />
                </div>
                <h3 className="feature-card-title">AI-Driven Forecasting</h3>
                <p className="feature-card-description">
                  Predict future CO₂ credit values with confidence bands. Our AI models 
                  analyze historical data, market trends, and regulatory changes to provide 
                  accurate forecasts for financial planning.
                </p>
                <ul className="feature-list">
                  <li>Dynamic default factors that auto-update</li>
                  <li>Confidence bands for risk assessment</li>
                  <li>Market trend analysis and predictions</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="feature-card">
              <CardContent className="feature-card-content">
                <div className="feature-card-icon">
                  <Zap className="icon" />
                </div>
                <h3 className="feature-card-title">Complete Automation</h3>
                <p className="feature-card-description">
                  Eliminate manual processes with end-to-end automation. From data collection 
                  to supplier outreach, we handle the entire operating cadence so you can 
                  focus on your core business.
                </p>
                <ul className="feature-list">
                  <li>Automated supplier data collection</li>
                  <li>AI-powered gap filling and validation</li>
                  <li>Quarterly estimates and annual true-ups</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="feature-card">
              <CardContent className="feature-card-content">
                <div className="feature-card-icon">
                  <Shield className="icon" />
                </div>
                <h3 className="feature-card-title">Blockchain Transparency (Roadmap)</h3>
                <p className="feature-card-description">
                  We're integrating blockchain technology to ensure all ESG data and reports 
                  are transparent yet anonymous, creating an immutable audit trail that 
                  prevents manipulation or corruption.
                </p>
                <ul className="feature-list">
                  <li>Immutable data records</li>
                  <li>Anonymous yet transparent reporting</li>
                  <li>Tokenization for future carbon markets</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="feature-card">
              <CardContent className="feature-card-content">
                <div className="feature-card-icon">
                  <Database className="icon" />
                </div>
                <h3 className="feature-card-title">Multi-Framework Support</h3>
                <p className="feature-card-description">
                  Beyond CBAM, our platform supports CSRD assurance packages and GHG 
                  Scope 1/2/3 reporting. One platform for all your sustainability 
                  compliance needs.
                </p>
                <ul className="feature-list">
                  <li>CBAM transitional to definitive</li>
                  <li>CSRD assurance-ready packages</li>
                  <li>GHG Protocol Scope 1/2/3 reporting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Meet Our Core Team</h2>
            <p className="section-subtitle">
              A combination of domain expertise, technical excellence, and operational 
              precision driving Viridata's success.
            </p>
          </div>
          <div className="team-grid">
            <Card className="team-card">
              <CardContent className="team-card-content">
                <div className="team-photo-container">
                  <img
                    src="https://customer-assets.emergentagent.com/job_esg-ai-platform/artifacts/l7bsn7qu_M.jpg"
                    alt="Maksim Kruk"
                    className="team-photo" />

                </div>
                <div className="team-info">
                  <h3 className="team-name">Maksim Kruk</h3>
                  <div className="team-role">CEO</div>
                  <p className="team-description">
                    Expertise in CBAM and sustainability. Deep understanding of EU importer 
                    pain points and regulatory landscape.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="team-card">
              <CardContent className="team-card-content">
                <div className="team-photo-container">
                  <img
                    src="https://customer-assets.emergentagent.com/job_esg-ai-platform/artifacts/xsf9whjw_L.jpg"
                    alt="Leonid Samoilov"
                    className="team-photo" />

                </div>
                <div className="team-info">
                  <h3 className="team-name">Leonid Samoilov</h3>
                  <div className="team-role">CTO</div>
                  <p className="team-description">Full-stack and cloud architecture specialist. Building stable, scalable and secure infrastructure for enterprise ESG solutions.


                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="team-card">
              <CardContent className="team-card-content">
                <div className="team-photo-container">
                  <img
                    src="https://customer-assets.emergentagent.com/job_esg-ai-platform/artifacts/g3szmmut_S.jpg"
                    alt="Stanislav Knyazev"
                    className="team-photo" />

                </div>
                <div className="team-info">
                  <h3 className="team-name">Stanislav Knyazev</h3>
                  <div className="team-role">COO</div>
                  <p className="team-description">
                    Operations and project management expert. Ensuring process excellence 
                    and quality assurance across all client engagements.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="advisors-note">
            <TrendingUp className="note-icon" />
            <p>
              We're building strategic advisory relationships with ex-customs commissioners, 
              mid-tier audit partners, and OEM sustainability leaders to strengthen our 
              domain expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <div className="contact-content">
            <div className="contact-left">
              <h2 className="section-title">Ready to Transform Your ESG Reporting?</h2>
              <p className="contact-intro">
                Join forward-thinking companies that are automating their sustainability 
                compliance with Viridata. Let's discuss how we can help you achieve 
                audit-ready reporting with zero bureaucracy.
              </p>
              <div className="contact-benefits">
                <div className="benefit-item">
                  <CheckCircle2 className="benefit-icon" />
                  <span>Pilot program starting at €6,900</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 className="benefit-icon" />
                  <span>180-day pilot with up to 10 suppliers</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 className="benefit-icon" />
                  <span>Onboarding in under 1 meeting</span>
                </div>
                <div className="benefit-item">
                  <CheckCircle2 className="benefit-icon" />
                  <span>SLA-backed error compensation</span>
                </div>
              </div>
              <div className="contact-info">
                <div className="info-item">
                  <Mail className="info-icon" />
                  <span>info@greentrace.tech</span>
                </div>
                <div className="info-item">
                  <Linkedin className="info-icon" />
                  <span>Connect on LinkedIn</span>
                </div>
              </div>
            </div>
            <div className="contact-right">
              <Card className="contact-card">
                <CardContent className="contact-card-content">
                  <h3 className="contact-form-title">Get in Touch</h3>
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">Name *</label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="form-input" />

                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">Email *</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="form-input" />

                    </div>
                    <div className="form-group">
                      <label htmlFor="company" className="form-label">Company *</label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company name"
                        required
                        className="form-input" />

                    </div>
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">Message *</label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your ESG reporting needs..."
                        required
                        className="form-textarea"
                        rows={4} />

                    </div>
                    <Button type="submit" className="btn-primary submit-btn" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <img
                src="https://customer-assets.emergentagent.com/job_3bbe4988-d7b8-4d45-bbcc-260df7b4fb90/artifacts/7ywytmq2_Logo.png"
                alt="Viridata Logo"
                className="footer-logo-img" />

              <span className="footer-company">Viridata</span>
            </div>
            <p className="footer-tagline">Making Sustainability Visible</p>
          </div>
          <div className="footer-right">
            <p className="footer-text">
              © 2026 Viridata. Formerly GreenTrace. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>);

};

export default Home;