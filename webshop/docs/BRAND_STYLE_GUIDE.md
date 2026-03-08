# Norelle Brand Style Guide & Implementation Checklist

## 🎯 **Brand Identity Overview**

Based on luxury jewelry industry standards and Norelle's positioning as a premium Belgian jewelry brand, this comprehensive style guide ensures brand consistency across all digital touchpoints.

---

## 🎨 **Color Palette**

### **Primary Colors**
```css
/* Brand Gold - Luxury & Elegance */
--norelle-gold: #D4AF37;          /* Warm, rich gold */
--norelle-gold-light: #E6C547;   /* Lighter gold for accents */
--norelle-gold-dark: #B8941F;    /* Darker gold for depth */

/* Burgundy - Sophistication & Luxury */
--norelle-burgundy: #722F37;     /* Deep burgundy red */
--norelle-burgundy-light: #8B3F47; /* Lighter burgundy */
--norelle-burgundy-dark: #5A1F27; /* Darker burgundy */

/* Cream - Elegance & Warmth */
--norelle-cream: #F5F2E8;         /* Warm cream */
--norelle-cream-light: #FAF8F2;   /* Lighter cream */
--norelle-cream-dark: #E8E5D8;    /* Darker cream */
```

### **Secondary Colors**
```css
/* Supporting Colors */
--norelle-charcoal: #2C2C2C;      /* Dark gray for text */
--norelle-gray: #666666;          /* Medium gray */
--norelle-silver: #C0C0C0;        /* Silver accents */
--norelle-pearl: #F8F6F0;         /* Soft pearl white */

/* Accent Colors */
--norelle-rose-gold: #E8B4A0;     /* Rose gold accents */
--norelle-platinum: #E5E4E2;      /* Platinum silver */
--norelle-diamond: #B9F2FF;       /* Diamond blue accent */
```

### **Color Usage Guidelines**
- **Primary**: Burgundy background with gold accents
- **Secondary**: Cream for readability and warmth
- **Accent**: Gold for CTAs and important elements
- **Text**: Charcoal for body text, cream for headers
- **Background**: Burgundy dark for luxury feel

---

## 🔤 **Typography System**

### **Primary Font Family**
```css
/* Brand Typography */
--norelle-font-primary: 'Playfair Display', serif;     /* Luxury serif */
--norelle-font-secondary: 'Montserrat', sans-serif;     /* Modern sans-serif */
--norelle-font-mono: 'Courier New', monospace;          /* For codes/data */
```

### **Font Hierarchy**
```css
/* Headings - Luxury Serif */
--norelle-h1: 3.5rem / 1.2;      /* 56px */
--norelle-h2: 2.5rem / 1.3;      /* 40px */
--norelle-h3: 2rem / 1.4;        /* 32px */
--norelle-h4: 1.5rem / 1.4;      /* 24px */
--norelle-h5: 1.25rem / 1.4;    /* 20px */
--norelle-h6: 1rem / 1.5;       /* 16px */

/* Body Text - Clean Sans-serif */
--norelle-body-lg: 1.125rem / 1.6; /* 18px */
--norelle-body: 1rem / 1.6;        /* 16px */
--norelle-body-sm: 0.875rem / 1.6; /* 14px */
--norelle-body-xs: 0.75rem / 1.6;  /* 12px */
```

### **Typography Usage**
- **Headlines**: Playfair Display (serif) for luxury feel
- **Body Text**: Montserrat (sans-serif) for readability
- **Navigation**: Montserrat with letter spacing
- **Prices**: Montserrat with proper formatting
- **CTA Buttons**: Montserrat semi-bold

---

## 🎯 **Visual Style Elements**

### **Design Principles**
- **Luxury Minimalism**: Clean, uncluttered layouts
- **Elegant Spacing**: Generous white space
- **Sophisticated Typography**: Classic serif with modern sans-serif
- **Rich Color Palette**: Deep burgundy with gold accents
- **Premium Imagery**: High-quality product photography

### **Layout Patterns**
- **Grid System**: 12-column grid with consistent spacing
- **Golden Ratio**: 1.618 proportions for visual harmony
- **Visual Hierarchy**: Clear information architecture
- **Balance**: Symmetrical and asymmetrical balance
- **Flow**: Natural eye movement through content

---

## 🖼️ **Imagery & Photography**

### **Photography Style**
- **Lighting**: Soft, diffused lighting with highlights
- **Background**: Clean, neutral backgrounds (cream, gray)
- **Composition**: Rule of thirds, negative space
- **Color Palette**: Warm tones with gold accents
- **Product Focus**: Sharp details, luxury presentation

### **Image Guidelines**
- **Product Shots**: Multiple angles, lifestyle context
- **Model Photography**: Elegant, sophisticated poses
- **Brand Imagery: Luxury lifestyle, Belgian heritage
- **Social Media**: Consistent filter and style
- **Website**: Optimized for fast loading

---

## 🎨 **UI Component Styles**

### **Buttons**
```css
/* Primary Button - Gold */
.btn-primary {
  background: var(--norelle-gold);
  color: var(--norelle-burgundy);
  border: none;
  padding: 12px 32px;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--norelle-gold-light);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(212, 175, 55, 0.3);
}

/* Secondary Button - Transparent */
.btn-secondary {
  background: transparent;
  color: var(--norelle-cream);
  border: 1px solid var(--norelle-cream);
  padding: 12px 32px;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--norelle-cream);
  color: var(--norelle-burgundy);
}
```

### **Cards**
```css
/* Product Card */
.card {
  background: var(--norelle-burgundy-light);
  border: 1px solid var(--norelle-border);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  border-color: var(--norelle-gold);
}
```

### **Forms**
```css
/* Input Fields */
.input {
  background: var(--norelle-burgundy);
  border: 1px solid var(--norelle-border);
  color: var(--norelle-cream);
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input:focus {
  border-color: var(--norelle-gold);
  outline: none;
  box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
}
```

---

## 📱 **Mobile Considerations**

### **Mobile Typography**
- **Minimum Font Size**: 16px for body text
- **Touch Targets**: 44px minimum touch areas
- **Line Height**: 1.6 for readability
- **Font Weight**: Medium (500) for better contrast

### **Mobile Colors**
- **Contrast Ratio**: 4.5:1 minimum for accessibility
- **Color Usage**: Gold for CTAs, cream for text
- **Background**: Dark burgundy for luxury feel
- **Accent**: Strategic gold highlights

---

## 🎯 **Brand Voice & Tone**

### **Voice Characteristics**
- **Sophisticated**: Elegant, refined language
- **Luxurious**: Premium, exclusive terminology
- **Welcoming**: Warm, inviting tone
- **Expert**: Knowledgeable, confident
- **Timeless**: Classic, enduring appeal

### **Messaging Guidelines**
- **Product Descriptions**: Evocative, sensory language
- **Brand Story**: Heritage, craftsmanship, Belgian roots
- **Customer Service**: Personalized, attentive
- **Marketing**: Aspirational, luxury lifestyle

---

## 📐 **Spacing & Layout**

### **Spacing Scale**
```css
/* Spacing System */
--norelle-space-xs: 0.25rem;   /* 4px */
--norelle-space-sm: 0.5rem;    /* 8px */
--norelle-space-md: 1rem;      /* 16px */
--norelle-space-lg: 1.5rem;    /* 24px */
--norelle-space-xl: 2rem;      /* 32px */
--norelle-space-2xl: 3rem;     /* 48px */
--norelle-space-3xl: 4rem;     /* 64px */
```

### **Layout Principles**
- **Golden Ratio**: 1.618 proportions
- **White Space**: 40-50% of layout
- **Alignment**: Left-aligned for readability
- **Consistency**: Uniform spacing throughout
- **Hierarchy**: Clear visual importance

---

## 🎨 **Iconography**

### **Icon Style**
- **Line Weight**: 2px stroke width
- **Style**: Clean, minimalist lines
- **Color**: Gold for active, cream for inactive
- **Size**: Consistent 24px base size
- **Rounded Corners**: 2px border radius

### **Icon Usage**
- **Navigation**: Simple, recognizable icons
- **CTAs**: Gold icons with hover effects
- **Social Media**: Consistent brand icons
- **Features**: Illustrative, luxury-themed

---

## 🌐 **Digital Implementation**

### **Website Colors**
```css
:root {
  /* Brand Colors */
  --norelle-burgundy: #722F37;
  --norelle-gold: #D4AF37;
  --norelle-cream: #F5F2E8;
  --norelle-charcoal: #2C2C2C;
  
  /* Semantic Colors */
  --norelle-primary: var(--norelle-gold);
  --norelle-secondary: var(--norelle-cream);
  --norelle-accent: var(--norelle-burgundy);
  --norelle-text: var(--norelle-charcoal);
  --norelle-background: var(--norelle-burgundy);
}
```

### **Typography Implementation**
```css
/* Font Imports */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;500;600;700&display=swap');

/* Typography Classes */
.font-serif { font-family: var(--norelle-font-primary); }
.font-sans { font-family: var(--norelle-font-secondary); }

.text-h1 { 
  font-family: var(--norelle-font-primary);
  font-size: var(--norelle-h1);
  font-weight: 700;
  line-height: 1.2;
}

.text-body {
  font-family: var(--norelle-font-secondary);
  font-size: var(--norelle-body);
  font-weight: 400;
  line-height: 1.6;
}
```

---

## ✅ **Implementation Checklist**

### **Colors & Theme**
- [ ] Primary burgundy color implemented
- [ ] Gold accent colors applied
- [ ] Cream background colors used
- [ ] Charcoal text colors set
- [ ] Consistent color palette across components
- [ ] Hover states with color transitions
- [ ] Accessibility contrast ratios met

### **Typography**
- [ ] Playfair Display font imported
- [ ] Montserrat font imported
- [ ] Font hierarchy implemented
- [ ] Responsive typography scales
- [ ] Line heights optimized
- [ ] Font weights consistent
- [ ] Mobile typography optimized

### **Layout & Spacing**
- [ ] 12-column grid system
- [ ] Consistent spacing scale
- [ ] Golden ratio proportions
- [ ] White space optimized
- [ ] Responsive breakpoints
- [ ] Component spacing consistent
- [ ] Layout balance achieved

### **Components**
- [ ] Button styles implemented
- [ ] Card designs consistent
- [ ] Form elements styled
- [ ] Navigation styled
- [ ] Footer styled
- [ ] Product cards styled
- [ ] Search elements styled

### **Imagery**
- [ ] Product photography guidelines
- [ ] Image optimization implemented
- [ ] Lazy loading for images
- [ ] Responsive image handling
- [ ] Consistent image styles
- [ ] Alt text optimization
- [ ] Image loading states

### **Mobile Optimization**
- [ ] Touch targets 44px minimum
- [ ] Mobile typography optimized
- [ ] Responsive layouts
- [ ] Touch-friendly interactions
- [ ] Mobile navigation
- [ ] Performance optimized
- [ ] Accessibility maintained

### **Brand Voice**
- [ ] Copy tone consistent
- [ ] Product descriptions evocative
- [ ] Brand story integrated
- [ ] Customer service tone
- [ ] Marketing messaging
- [ ] Error messages
- [ ] Success notifications

---

## 🎯 **Quality Assurance**

### **Visual Consistency**
- [ ] Color consistency across pages
- [ ] Typography consistency
- [ ] Spacing consistency
- [ ] Component consistency
- [ ] Brand element usage

### **Performance**
- [ ] Font loading optimized
- [ ] CSS minified
- [ ] Images optimized
- [ ] Animation performance
- [ ] Mobile performance
- [ ] Loading speed

### **Accessibility**
- [ ] Color contrast ratios
- [ ] Font sizes readable
- [ ] Alt text for images
- * [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Focus indicators

---

## 📚 **Brand Guidelines Summary**

### **Core Brand Elements**
- **Colors**: Burgundy, Gold, Cream, Charcoal
- **Fonts**: Playfair Display (serif), Montserrat (sans-serif)
- **Style**: Luxury minimalism with elegant sophistication
- **Voice**: Sophisticated, welcoming, expert
- **Values**: Quality, craftsmanship, heritage, exclusivity

### **Implementation Priority**
1. **Color System**: Foundation of visual identity
2. **Typography**: Brand voice and readability
3. **Components**: Consistent UI elements
4. **Layout**: Spacing and composition
5. **Mobile**: Responsive optimization
6. **Performance**: Fast, smooth experience

This comprehensive brand style guide ensures Norelle maintains a consistent, luxury brand identity across all digital touchpoints while providing an exceptional user experience.
