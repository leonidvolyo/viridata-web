# Viridata - AI-Powered ESG Reporting Platform

**Formerly GreenTrace**

Making Sustainability Visible through automated, transparent ESG compliance powered by AI and blockchain technology.

---

## 🌟 Overview

Viridata is a comprehensive one-page investor/client pitch website showcasing an AI-powered ESG reporting platform. The platform transforms complex ESG compliance into automated, transparent reporting, with features including:

- **AI-Driven Forecasting**: Predict future CO₂ credit values with confidence bands
- **Complete Automation**: Zero-friction data integration from ERP systems
- **Blockchain Transparency**: Future roadmap feature for immutable audit trails
- **Multi-Framework Support**: CBAM, CSRD, and GHG Scope 1/2/3 reporting

---

## 🚀 Live Website

The website is currently running at:
- **Local**: http://localhost:3000
- **External**: Your deployment URL will be provided after publishing

---

## 📋 Website Sections

1. **Hero Section**
   - Bold value proposition: "AI-Powered ESG Reporting Without the Bureaucracy"
   - Key statistics (5-7 target clients, €240k ARR, 10,000 TAM)
   - Prominent CTAs: Request Demo & Learn More

2. **Problem Section**
   - €250/tCO₂ escalating penalties
   - 80% working capital strain
   - €45M heavy importer burden
   - 100+ data complexity challenges

3. **Solution Section**
   - Zero-friction data integration
   - AI-powered validation
   - One-click report generation
   - SLA-backed guarantees

4. **Features Section**
   - AI-Driven Forecasting
   - Complete Automation
   - Blockchain Transparency (Roadmap)
   - Multi-Framework Support

5. **Team Section**
   - Maksim Kruk (CEO) - CBAM & Sustainability Expert
   - Leonid Samoylov (CTO) - Backend & Cloud Architecture
   - Stanislav Knyazev (COO) - Operations & Project Management

6. **Contact Section**
   - Fully functional contact form
   - Pricing highlights (€6,900 pilot program)
   - Company contact information

---

## 🎨 Design System

The website follows a premium dark theme design system:

### Color Palette
- **Background**: Pure black (#000000)
- **Brand Primary**: Cyan-green (#00FFD1) - Used sparingly for CTAs and accents
- **Text Primary**: White (#FFFFFF)
- **Text Secondary**: Muted gray for supporting content

### Typography
- **Font Family**: Space Grotesk (modern, geometric sans-serif)
- **Hero Title**: 56px bold, -2px letter spacing
- **Section Titles**: 48px bold, -1.5px letter spacing
- **Body Text**: 16-18px, 1.6-1.7 line height

### Design Principles
- **Sharp Corners**: All buttons and cards use 0px border-radius
- **High Contrast**: Optimized for readability on dark backgrounds
- **Minimal Color Usage**: 90/10 rule - colors only for small interactive elements
- **Generous Spacing**: Large, dramatic spacing for premium feel

---

## 🛠️ Technical Stack

### Frontend
- **Framework**: React 19.0.0
- **Routing**: React Router DOM v7.5.1
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui components
- **Icons**: Lucide React
- **Toast Notifications**: Sonner

### Backend (Ready for Integration)
- **Framework**: FastAPI (Python)
- **Database**: MongoDB
- **Environment**: Pre-configured for production deployment

---

## 📦 Project Structure

```
/app
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.jsx           # Main landing page
│   │   ├── components/
│   │   │   └── ui/                # Shadcn UI components
│   │   ├── App.js                 # Main app component
│   │   ├── App.css                # Custom styling
│   │   └── index.css              # Tailwind configuration
│   ├── package.json
│   └── .env                       # Environment variables
├── backend/
│   ├── server.py                  # FastAPI server
│   ├── requirements.txt
│   └── .env                       # Backend configuration
└── README.md                      # This file
```

---

## 🎯 Key Features

### 1. Smooth Scroll Navigation
- Fixed header with smooth scrolling to sections
- Active section highlighting in navigation
- Mobile-responsive design

### 2. Interactive Elements
- Hover effects on all cards and buttons
- Smooth transitions and animations
- Form validation and success notifications

### 3. Form Functionality
- Name, Email, Company, Message fields
- Client-side validation
- Toast notification on submission
- Form clears after successful submission

### 4. Responsive Design
- Desktop: Full grid layouts (2-3 columns)
- Tablet: Adapted layouts (1-2 columns)
- Mobile: Single column, optimized navigation

---

## 🚀 Getting Started

The website is already running! To make changes:

### Frontend Development
```bash
cd /app/frontend
yarn start
```

### Backend Development
```bash
cd /app/backend
source venv/bin/activate  # If using virtual environment
uvicorn server:app --reload
```

### Restart Services
```bash
sudo supervisorctl restart frontend
sudo supervisorctl restart backend
sudo supervisorctl restart all
```

---

## 📝 Content Customization

### Update Team Information
Edit `/app/frontend/src/pages/Home.jsx` and locate the team section around line 300

### Update Contact Information
Find the contact section and update email/social links

### Modify Color Scheme
Edit `/app/frontend/src/App.css` and update CSS variables in the :root section

---

## 🌐 Deployment to GitHub Pages

To deploy this website to GitHub Pages:

1. **Build the Production Version**
   ```bash
   cd /app/frontend
   yarn build
   ```

2. **Configure GitHub Pages**
   - Go to your GitHub repository settings
   - Navigate to Pages section
   - Select source: "Deploy from a branch"
   - Choose branch: main/master
   - Folder: /docs (after moving build files)

3. **Move Build Files**
   ```bash
   cp -r /app/frontend/build/* /your-github-repo/docs/
   ```

4. **Update package.json**
   Add homepage URL:
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name"
   }
   ```

---

## 📊 Key Metrics & Information

### Business Metrics
- **Target Clients (Q3 2026)**: 5-7 clients
- **ARR Target**: €240k
- **TAM Market Size**: 10,000 companies
- **Pilot Program**: €6,900 setup fee
- **Standard Package**: €24,000 annually

### Problem Metrics
- **Penalties**: Up to €250 per tCO₂
- **Working Capital**: 80% pre-purchase requirement
- **Heavy Importer Liability**: €45M by 2034
- **Data Points**: 100+ complexity factors

---

## 🔧 Troubleshooting

### Website Not Loading?
```bash
# Check frontend logs
tail -f /var/log/supervisor/frontend.out.log

# Restart frontend
sudo supervisorctl restart frontend
```

### Form Not Submitting?
- Check browser console for errors (F12)
- Ensure toast library (sonner) is imported
- Verify form field names match the state

### Styling Issues?
- Clear browser cache (Ctrl+Shift+R)
- Check Tailwind classes are correct
- Ensure App.css is imported in App.js

---

## 📞 Support & Contact

For questions or assistance:
- **Email**: contact@viridata.com
- **Website**: [Your deployment URL]
- **LinkedIn**: Connect with the team

---

## 📄 License

© 2026 Viridata. Formerly GreenTrace. All rights reserved.

---

## 🎉 What's Next?

### Immediate Next Steps
1. ✅ Website is live and functional
2. 🔜 Add backend integration for contact form
3. 🔜 Set up email notifications
4. 🔜 Deploy to GitHub Pages or custom domain
5. 🔜 Add analytics tracking (Google Analytics, etc.)

### Future Enhancements
- Blog/Resources section
- Customer testimonials
- Case studies
- Pricing calculator
- Demo booking system
- Multi-language support

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies**
