# Quick Reference Card

## 3 Files Only
```
calculator.html  (4 KB)
calculator.css   (12 KB)
calculator.js    (8 KB)
```

---

## Breakdance: Copy & Paste Method

### Step 1: Add HTML Block
In Breakdance, add **Custom HTML** element and paste:

```html
<div class="calculator-wrapper">
    <section class="calculator-section">
        <div class="calculator">
            <div class="calculator-inputs">
                <h2>Eingaben</h2>
                <div class="input-group">
                    <label for="purchase-price">Kaufpreis (€)</label>
                    <input type="number" id="purchase-price" placeholder="500000" min="0">
                </div>
                <div class="input-group">
                    <label for="region">Region</label>
                    <select id="region"></select>
                </div>
                <div class="input-group">
                    <label>Immobilientyp</label>
                    <div class="radio-group">
                        <label>
                            <input type="radio" id="property-resale" name="property-type" value="resale" checked>
                            Bestandsimmobilie
                        </label>
                        <label>
                            <input type="radio" id="property-new" name="property-type" value="new">
                            Neubau
                        </label>
                    </div>
                </div>
                <div class="input-group">
                    <label for="deposit">Eigenkapital (%)</label>
                    <input type="number" id="deposit" value="20" min="0" max="100">
                </div>
                <div class="input-group">
                    <label for="mortgage-years">Laufzeit (Jahre)</label>
                    <select id="mortgage-years">
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option selected>25</option>
                        <option>30</option>
                    </select>
                </div>
                <div class="input-group">
                    <label for="interest-rate">Zinssatz (%)</label>
                    <input type="number" id="interest-rate" value="3.5" step="0.01">
                </div>
                <div class="calculator-actions">
                    <button type="button" id="reset-calculator" class="btn btn-secondary">Zurücksetzen</button>
                    <button type="button" id="export-pdf" class="btn btn-primary">PDF Exportieren</button>
                </div>
            </div>
            <div class="calculator-results">
                <div class="result-card">
                    <h2>Ergebnisse</h2>
                    <h3>Steuern</h3>
                    <div class="result-row">
                        <span>ITP</span>
                        <span id="itp-result">€0.00</span>
                    </div>
                    <div class="result-row">
                        <span>Mehrwertsteuer (VAT)</span>
                        <span id="vat-result">€0.00</span>
                    </div>
                    <div class="result-row">
                        <span>AJD</span>
                        <span id="ajd-result">€0.00</span>
                    </div>
                </div>
                <div class="result-card">
                    <h3>Gebühren</h3>
                    <div class="result-row">
                        <span>Notar</span>
                        <span id="notary-result">€0.00</span>
                    </div>
                    <div class="result-row">
                        <span>Grundbuch</span>
                        <span id="registry-result">€0.00</span>
                    </div>
                    <div class="result-row">
                        <span>Anwaltskosten</span>
                        <span id="legal-result">€0.00</span>
                    </div>
                </div>
                <div class="result-card">
                    <h3>Hypothek</h3>
                    <div class="result-row">
                        <span>Darlehensbetrag</span>
                        <span id="loan-result">€0.00</span>
                    </div>
                    <div class="result-row">
                        <span>Monatliche Rate</span>
                        <span id="mortgage-result">€0.00</span>
                    </div>
                </div>
                <div class="result-card summary-card">
                    <h3>Zusammenfassung</h3>
                    <div class="result-row">
                        <span>Kaufpreis</span>
                        <span id="purchase-price-result">€0.00</span>
                    </div>
                    <div class="result-row">
                        <span>Gesamte Kaufkosten</span>
                        <span id="purchase-cost-result">€0.00</span>
                    </div>
                    <div class="result-row">
                        <span>Benötigtes Eigenkapital</span>
                        <span id="cash-required-result">€0.00</span>
                    </div>
                    <div class="result-row">
                        <span>Gesamtpreis</span>
                        <span id="grand-total-result">€0.00</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
```

### Step 2: Add CSS
Go to **Page Settings → Custom CSS** and paste entire `calculator.css`

### Step 3: Add JavaScript
Go to **Page Settings → Custom JavaScript** and paste entire `calculator.js`

---

## Common Edits

### Change Primary Color (Blue → Your Color)

**In calculator.css**, find and replace:
- `#2563EB` → your color (e.g., `#10b981` for green)
- `#1E40AF` → darker shade of your color (e.g., `#059669`)

### Change Notary Fee Rate

**In calculator.js**, find line ~30:
```javascript
notary: { percentage: 0.005, minimum: 600 }
```
Change `0.005` to your rate (e.g., `0.006` for 0.6%)

### Change Default Interest Rate

**In calculator.html**, find line ~60:
```html
<input type="number" id="interest-rate" value="3.5" step="0.01">
```
Change `3.5` to your rate (e.g., `4.0`)

### Change Default Deposit %

**In calculator.html**, find line ~50:
```html
<input type="number" id="deposit" value="20" min="0" max="100">
```
Change `20` to your percentage (e.g., `25`)

### Change Button Text

**In calculator.html**, find:
```html
<button type="button" id="reset-calculator" class="btn btn-secondary">Zurücksetzen</button>
<button type="button" id="export-pdf" class="btn btn-primary">PDF Exportieren</button>
```

Change text to your language/preference

### Change Label Text

**In calculator.html**, find any label and change:
```html
<label for="purchase-price">Kaufpreis (€)</label>
```
To your text (e.g., `Purchase Price (€)` for English)

---

## Tax Rate Reference

### Current Rates (Andalusia Example)

**Resale Property:**
- ITP: 7%
- VAT: 0%
- AJD: 0%

**New Build:**
- ITP: 0%
- VAT: 10%
- AJD: 1.2%

### Edit in calculator.js (line ~8):

```javascript
andalusia: { 
    resale: { itp: 0.07, vat: 0, ajd: 0 },
    new: { itp: 0, vat: 0.10, ajd: 0.012 } 
}
```

---

## All 19 Regions

```
1. Andalusien (andalusia)
2. Aragón (aragon)
3. Asturien (asturias)
4. Balearen (balearic-islands)
5. Baskenland (basque-country)
6. Kanarische Inseln (canary-islands)
7. Kantabrien (cantabria)
8. Kastilien-La Mancha (castile-la-mancha)
9. Kastilien und León (castile-and-leon)
10. Katalonien (catalonia)
11. Ceuta (ceuta)
12. Extremadura (extremadura)
13. Galicien (galicia)
14. La Rioja (la-rioja)
15. Madrid (madrid)
16. Melilla (melilla)
17. Murcia (murcia)
18. Navarra (navarre)
19. Valencia (valencian-community)
```

---

## Fee Structure

```javascript
Legal:    1.0% minimum €1200
Notary:   0.5% minimum €600
Registry: 0.3% minimum €400
```

**Edit in calculator.js (line ~30):**
```javascript
const FEES = {
    legal: { percentage: 0.01, minimum: 1200 },
    notary: { percentage: 0.005, minimum: 600 },
    registry: { percentage: 0.003, minimum: 400 }
};
```

---

## Responsive Breakpoints

```css
Desktop:  > 992px (2 columns)
Tablet:   768px - 992px (1 column)
Mobile:   < 768px (1 column, optimized)
```

---

## Testing Checklist

- [ ] Can enter purchase price
- [ ] Region dropdown populates
- [ ] Can select property type
- [ ] Can adjust deposit %
- [ ] Can change mortgage term
- [ ] Can change interest rate
- [ ] Results update in real-time
- [ ] Reset button clears all
- [ ] PDF export works
- [ ] Mobile looks good
- [ ] No console errors
- [ ] Calculations are correct

---

## Test Values

**Example 1: Andalusia Resale**
- Purchase: €500,000
- Deposit: 20% (€100,000)
- Mortgage: 25 years @ 3.5%
- Expected ITP: €35,000
- Expected Fees: ~€8,500
- Total Costs: ~€43,500

**Example 2: Madrid New Build**
- Purchase: €300,000
- Deposit: 25% (€75,000)
- Mortgage: 20 years @ 3.0%
- Expected VAT: €30,000
- Expected AJD: €1,800
- Expected Fees: ~€5,500
- Total Costs: ~€37,300

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Calculator not showing | Check all 3 files are loaded |
| Dropdown empty | Verify JavaScript is running |
| Calculations wrong | Check tax rates in calculator.js |
| Styling broken | Verify CSS is loaded, check for conflicts |
| Mobile looks bad | Check responsive CSS media queries |
| PDF export blank | Ensure print styles are correct |

---

## File Locations

```
Breakdance Page
├── Custom HTML Block (calculator.html content)
├── Page Settings → Custom CSS (calculator.css content)
└── Page Settings → Custom JavaScript (calculator.js content)
```

---

## Support Resources

1. **INTEGRATION_GUIDE.md** - Full documentation
2. **calculator.html** - HTML structure
3. **calculator.css** - All styling
4. **calculator.js** - All logic

---

## Version Info

- **Version:** 1.0
- **Language:** German (Deutsch)
- **Regions:** 19 Spanish regions
- **Responsive:** Yes
- **Dependencies:** None
- **File Size:** 24 KB total
- **Load Time:** < 100ms

---

## Next Steps

1. ✅ Copy HTML to Breakdance
2. ✅ Add CSS to Page Settings
3. ✅ Add JavaScript to Page Settings
4. ✅ Test with sample data
5. ✅ Customize colors/text as needed
6. ✅ Publish page
7. ✅ Test on mobile
8. ✅ Monitor for issues

Done! 🎉
