# IM8Health Clone

A modern landing page clone built with Vite and HTML/CSS/JavaScript.

## Project Overview

This project is a faithful recreation of the IM8Health landing page using modern web development practices. It features a responsive design with modular components and sections.

## Project Structure

```
im8health-clone/
├── index.html                 # Main entry point with component loader
├── script.js                  # Client-side JavaScript logic
├── styles.css                 # Primary stylesheet
├── package.json               # Project configuration
├── vite.config.js             # Vite configuration
├── src/
│   ├── components/
│   │   └── modal.html         # Reusable modals and popups
│   │
│   ├── partials/
│   │   └── head.html          # Global head (meta, fonts, styles, base scripts)
│   │
│   ├── scripts/               # JavaScript modules and utilities
│   │   ├── background-animation.js      # Background animation effects
│   │   ├── carousel-initializers.js     # Carousel/slider initialization
│   │   ├── interactive-blocks.js        # Interactive UI components logic
│   │   ├── layout-widgets.js            # Layout and widget management
│   │   ├── media-optimization.js        # Media loading and optimization
│   │   ├── product-manager.js           # Product data and state management
│   │   └── swiper-factory.js            # Swiper.js integration factory
│   │
│   ├── styles/                # CSS stylesheets and utilities
│   │   ├── base.css           # Base styles and resets
│   │   ├── components.css     # Component-specific styles
│   │   ├── main.css           # Main layout and page styles
│   │   └── utilities.css      # Utility classes and helpers
│   │
│   └── sections/              # Page sections
│       ├── cart-drawer/
│       │   ├── cart-drawer.html
│       │   └── child/
│       │       ├── announcement-bar.html
│       │       ├── drawer.html
│       │       ├── header-assets.html
│       │       ├── header-desktop-left.html
│       │       ├── header-desktop-right.html
│       │       ├── header-mobile-menu.html
│       │       └── shop-now-bar.html
│       │
│       ├── clinical-benefits/
│       │   ├── clinical-benefits.html
│       │   └── child/
│       │       ├── clinical-proven-studies.html
│       │       ├── comparison-table.html
│       │       ├── cost-savings-breakdown.html
│       │       ├── organ-systems-essentials.html
│       │       ├── organ-systems-longevity.html
│       │       └── static-reviews.html
│       │
│       ├── footer/
│       │   ├── footer.html
│       │   └── child/
│       │       ├── faq-accordion.html
│       │       └── featured-collection.html
│       │
│       ├── ingredients-nutrition/
│       │   ├── ingredients-nutrition.html
│       │   └── child/
│       │       ├── experts-list.html
│       │       ├── how-to-enjoy.html
│       │       ├── pillars-of-health.html
│       │       ├── product-inside-lists.html
│       │       ├── real-results.html
│       │       └── welcome-kit.html
│       │
│       ├── product-hero/
│       │   ├── product-hero.html
│       │   └── child/
│       │       ├── beckham-stack.html
│       │       ├── gallery-thumbnails.html
│       │       ├── gallery-viewer.html
│       │       ├── product-info.html
│       │       ├── product-modal.html
│       │       └── supplement-popup.html
│       │
│       └── reviews-faq/
│           ├── reviews-faq.html
│           └── child/
│               ├── advisors-hero.html
│               ├── advisors-intro.html
│               ├── advisors-list-group-one.html
│               ├── advisors-list-group-two.html
│               └── beckham-comparison.html
```

---

## Folder Structure Explanation

### `src/scripts/`

The scripts folder contains all JavaScript modules organized by functionality:

- **background-animation.js** - Handles animated backgrounds and visual effects throughout the page
- **carousel-initializers.js** - Initializes and manages carousel/slider components for product galleries
- **interactive-blocks.js** - Controls interactive UI elements and their behaviors
- **layout-widgets.js** - Manages layout calculations and widget positioning
- **media-optimization.js** - Optimizes image and media loading for performance
- **product-manager.js** - Handles product data, state management, and cart operations
- **swiper-factory.js** - Creates and configures Swiper.js instances for carousels

### `src/styles/`

The styles folder contains modular CSS organized by purpose:

- **base.css** - Global resets, typography, and base element styling
- **components.css** - Styles for reusable UI components (buttons, cards, modals, etc.)
- **main.css** - Primary layout styles and page-level styling
- **utilities.css** - Utility classes for spacing, sizing, display, and common patterns

This modular approach makes the CSS maintainable and scalable as the project grows.

---

## Page Architecture

The website is organized as a single-page application with modular sections loaded via the Vite HTML inject plugin:

### Main Sections (in order of appearance)

1. **Head Partial** (`src/partials/head.html`)
   - Global metadata, fonts, stylesheets, and base scripts
   
2. **Cart Drawer** (`src/sections/cart-drawer/`)
   - Slide-in cart interface appearing on the right side
   - Includes announcement bar, header assets, desktop/mobile menus, and shop-now bar
   
3. **Product Hero** (`src/sections/product-hero/`)
   - Product showcase section with:
     - Product title and key benefits
     - Product images and gallery viewer
     - Clinical results summary
     - Pricing options
     - Subscription options
   - Contains gallery, product info, modals, and athlete endorsements (Beckham stack)
   
4. **Clinical Benefits** (`src/sections/clinical-benefits/`)
   - Credibility building section featuring:
     - 90-day study results
     - NSF certification
     - Athlete endorsements
     - Trust badges and comparison tables
     - Organ systems benefits (essentials vs longevity)
     - Cost savings breakdown
   
5. **Ingredients & Nutrition** (`src/sections/ingredients-nutrition/`)
   - Detailed product information:
     - 92 nutrients breakdown
     - Supplement facts label
     - Branded ingredients
     - Clean label certification
     - Third-party testing details
     - Expert advisors list
     - How to enjoy (usage instructions)
     - Real results from users
   
6. **Reviews & FAQ** (`src/sections/reviews-faq/`)
   - Social proof and support:
     - Customer testimonials and reviews
     - Ambassador testimonials
     - Advisors section (hero, intro, list groups)
     - Beckham comparison content
     - FAQ accordion
   
7. **Footer** (`src/sections/footer/`)
   - Footer with:
     - Policy links (privacy, terms, etc.)
     - Copyright information
     - Social media links
     - Cookie consent
     - Featured collection
     - FAQ accordion

8. **Modals** (`src/components/modal.html`)
   - Reusable modal components for popups and overlays

---

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Tao242dn/im8health-clone
cd im8health-clone
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

### Building

Create a production build:
```bash
npm run build
```

The optimized files will be output to the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```        

## Technologies Used

- **Vite** - Fast build tool and dev server
- **HTML5** - Semantic markup
- **CSS3** - Responsive styling
- **JavaScript (ES6+)** - Interactive functionality

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Notes

This is a clone project. All content and design elements are inspired by the original IM8Health website.



