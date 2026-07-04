# Kaufnebenkosten-Rechner - Breakdance Integration Guide

## Overview
This is a standalone, self-contained property purchase cost calculator for Spanish real estate. It requires only 3 files and works independently without any dependencies.

---

## Files Included

1. **calculator.html** - Complete HTML markup
2. **calculator.css** - All styling (combined from 7 original files)
3. **calculator.js** - All JavaScript logic (vanilla, no modules)

---

## Quick Start (5 minutes)

### Option 1: Direct File Upload to Breakdance

1. **Upload Files to Your Server**
   - Upload `calculator.html`, `calculator.css`, and `calculator.js` to your WordPress media library or server
   - Note the URLs (e.g., `https://yoursite.com/calculator/calculator.html`)

2. **Add to Breakdance Page**
   - Open your Breakdance page editor
   - Add an **Embed** or **HTML** element
   - Paste this code:

```html
<iframe 
    src="https://yoursite.com/calculator/calculator.html" 
    width="100%" 
    height="1200" 
    frameborder="0" 
    style="border: none; border-radius: 8px;">
</iframe>
```

3. **Adjust Height as Needed**
   - Change `height="1200"` to fit your design
   - Typical range: 1000-1400px depending on screen size

---

### Option 2: Embed Directly in Breakdance (Recommended)

1. **Copy HTML Content**
   - Open `calculator.html`
   - Copy everything between `<div class="calculator-wrapper">` and `</div>`

2. **Add Custom HTML Block in Breakdance**
   - Add an **HTML** element to your page
   - Paste the copied HTML

3. **Add CSS**
   - Go to Breakdance **Page Settings** → **Custom CSS**
   - Copy entire content from `calculator.css` and paste it

4. **Add JavaScript**
   - Go to Breakdance **Page Settings** → **Custom JavaScript**
   - Copy entire content from `calculator.js` and paste it

---

### Option 3: Embed as Code Block (Simplest)

1. **Create a Custom Code Block**
   - In Breakdance, add a **Code** or **Custom HTML** element
   - Paste this complete code:

```html
<style>
/* Paste entire calculator.css content here */
</style>

<!-- Paste entire HTML content here (from calculator-wrapper div) -->

<script>
// Paste entire calculator.js content here
</script>
```

---

## File Structure

```
your-site/
├── calculator/
│   ├── calculator.html
│   ├── calculator.css
│   └── calculator.js
```

---

## Customization Guide

### Change Tax Rates

Open `calculator.js` and find the `TAX_RATES` object (around line 8):

```javascript
const TAX_RATES = {
    andalusia: { 
        resale: { itp: 0.07, vat: 0, ajd: 0 },      // Change these numbers
        new: { itp: 0, vat: 0.10, ajd: 0.012 } 
    },
    // ... more regions
};
```

**Example:** To change Andalusia resale ITP from 7% to 8%:
```javascript
resale: { itp: 0.08, vat: 0, ajd: 0 }  // Changed 0.07 to 0.08
```

### Change Fee Percentages

Find the `FEES` object (around line 30):

```javascript
const FEES = {
    legal: { percentage: 0.01, minimum: 1200 },      // 1% minimum €1200
    notary: { percentage: 0.005, minimum: 600 },     // 0.5% minimum €600
    registry: { percentage: 0.003, minimum: 400 }    // 0.3% minimum €400
};
```

**Example:** To change notary fees to 0.6% minimum €700:
```javascript
notary: { percentage: 0.006, minimum: 700 }
```

### Add a New Region

1. Add to `TAX_RATES` in `calculator.js`:
```javascript
"new-region": { 
    resale: { itp: 0.07, vat: 0, ajd: 0 },
    new: { itp: 0, vat: 0.10, ajd: 0.012 } 
}
```

2. Add to `REGIONS` array in `calculator.js`:
```javascript
{ id: "new-region", name: "Region Name in German" }
```

### Change Colors

Open `calculator.css` and find the color variables:

```css
/* Primary color (blue) */
#2563EB  → Change to your color

/* Dark blue (gradient) */
#1E40AF  → Change to your color

/* Text color */
#111827  → Change to your color

/* Border color */
#E5E7EB  → Change to your color
```

**Example:** To change primary color from blue to green:
- Replace all `#2563EB` with `#10b981`
- Replace all `#1E40AF` with `#059669`

### Change Labels/Text

Open `calculator.html` and find the text you want to change:

```html
<label for="purchase-price">Kaufpreis (€)</label>
<!-- Change "Kaufpreis (€)" to your text -->

<h3>Steuern</h3>
<!-- Change "Steuern" to your text -->
```

---

## Features

✅ **Real-time Calculations** - Updates as user types
✅ **Responsive Design** - Works on desktop, tablet, mobile
✅ **State Persistence** - Saves user input to browser localStorage
✅ **PDF Export** - Print/export functionality
✅ **17 Spanish Regions** - All with correct tax rates
✅ **Professional UI** - Modern, clean design
✅ **No Dependencies** - Pure HTML/CSS/JavaScript
✅ **Fast Loading** - Minimal file size

---

## Calculations Explained

### Taxes
- **ITP (Impuesto sobre Transmisiones Patrimoniales)** - Transfer tax for resale properties (varies by region: 4-10%)
- **VAT (Mehrwertsteuer)** - Value Added Tax for new builds (10% or 7% in Canary Islands)
- **AJD (Actos Jurídicos Documentados)** - Stamp duty for new builds (varies by region: 0-1.5%)

### Fees
- **Notary (Notar)** - Legal documentation: 0.5% of purchase price (minimum €600)
- **Land Registry (Grundbuch)** - Property registration: 0.3% of purchase price (minimum €400)
- **Legal (Anwaltskosten)** - Attorney fees: 1% of purchase price (minimum €1200)

### Mortgage
- **Loan Amount** = Purchase Price - Deposit
- **Monthly Payment** = Calculated using standard amortization formula
- **Formula:** M = P × [r(1+r)^n] / [(1+r)^n - 1]
  - P = Principal (loan amount)
  - r = Monthly interest rate
  - n = Number of payments

### Summary
- **Total Purchase Costs** = Taxes + Fees
- **Cash Required** = Deposit + Purchase Costs
- **Grand Total** = Purchase Price + Purchase Costs

---

## Troubleshooting

### Calculator not showing
- Check that all 3 files are in the same directory
- Verify file paths in HTML are correct
- Check browser console for errors (F12)

### Calculations not updating
- Clear browser cache (Ctrl+Shift+Delete)
- Check that JavaScript is enabled
- Verify no JavaScript errors in console

### Styling looks wrong
- Make sure CSS file is loaded
- Check for CSS conflicts with your theme
- Try adding `!important` to CSS rules if needed

### Region dropdown empty
- Verify `calculator.js` is loaded
- Check browser console for errors
- Ensure JavaScript runs after page load

---

## Browser Support

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## Performance

- **File Sizes:**
  - HTML: ~4 KB
  - CSS: ~12 KB
  - JavaScript: ~8 KB
  - **Total: ~24 KB**

- **Load Time:** < 100ms on typical connection
- **Calculation Speed:** Instant (< 1ms)

---

## Editing Formulas

All calculation logic is in `calculator.js`. Key functions:

```javascript
calculateTaxes(purchasePrice, region, propertyType)
// Returns: { itp, vat, ajd }

calculateFees(price)
// Returns: { legal, notary, registry }

calculateMortgage(loanAmount, annualInterestRate, years)
// Returns: monthly payment amount

calculate(data)
// Main function that combines all calculations
```

---

## Adding Translations

To add English or Spanish, modify the HTML labels:

**Current (German):**
```html
<label for="purchase-price">Kaufpreis (€)</label>
```

**Add English:**
```html
<label for="purchase-price">Purchase Price (€)</label>
```

**Add Spanish:**
```html
<label for="purchase-price">Precio de Compra (€)</label>
```

---

## Support & Maintenance

### Regular Updates Needed
- Tax rates change annually (usually January)
- Interest rate defaults may need updating
- Regional regulations may change

### Backup
- Keep a backup of your customized files
- Version control recommended (Git)

### Testing
- Test with various purchase prices
- Verify calculations against known values
- Test on mobile devices
- Test PDF export

---

## Legal Disclaimer

This calculator provides estimates only. Actual costs may vary based on:
- Specific property characteristics
- Local regulations and changes
- Professional fees and rates
- Currency exchange rates

Always consult with a local real estate attorney or tax professional for accurate figures.

---

## File Checklist

Before deploying:
- [ ] All 3 files uploaded/embedded
- [ ] Calculator displays correctly
- [ ] Inputs work (can type/select)
- [ ] Results update in real-time
- [ ] Reset button works
- [ ] PDF export works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Tested with sample data
- [ ] Colors match your brand

---

## Quick Reference

| Element | Location | How to Change |
|---------|----------|---------------|
| Tax Rates | calculator.js line 8 | Edit TAX_RATES object |
| Fees | calculator.js line 30 | Edit FEES object |
| Regions | calculator.js line 35 | Edit REGIONS array |
| Colors | calculator.css | Search for hex colors |
| Labels | calculator.html | Edit text in labels |
| Buttons | calculator.html | Edit button text |
| Styling | calculator.css | Edit CSS rules |

---

## Contact & Support

For issues or questions:
1. Check browser console (F12) for errors
2. Verify all files are in correct location
3. Clear cache and reload
4. Test in different browser
5. Review this guide for customization help

---

**Version:** 1.0
**Last Updated:** 2024
**Language:** German (Deutsch)
**Regions:** 19 Spanish regions
**Responsive:** Yes (Mobile, Tablet, Desktop)
