# Test Cases & Verification Guide

## How to Test the Calculator

### Test 1: Basic Calculation (Andalusia Resale)

**Input:**
- Purchase Price: €500,000
- Region: Andalusien
- Property Type: Bestandsimmobilie (Resale)
- Deposit: 20%
- Mortgage Term: 25 years
- Interest Rate: 3.5%

**Expected Results:**
- ITP: €35,000 (7% of €500,000)
- VAT: €0
- AJD: €0
- Notary: €3,100 (0.5% of €500,000, minimum €600)
- Registry: €1,500 (0.3% of €500,000, minimum €400)
- Legal: €5,000 (1% of €500,000, minimum €1,200)
- Loan Amount: €400,000 (80% of €500,000)
- Monthly Mortgage: €1,796.86
- Total Purchase Costs: €44,600
- Cash Required: €144,600 (€100,000 deposit + €44,600 costs)
- Grand Total: €544,600

**Verification:**
- [ ] ITP shows €35,000.00
- [ ] Total Taxes: €35,000.00
- [ ] Total Fees: €9,600.00
- [ ] Monthly payment ~€1,797

---

### Test 2: New Build (Madrid)

**Input:**
- Purchase Price: €300,000
- Region: Madrid
- Property Type: Neubau (New Build)
- Deposit: 25%
- Mortgage Term: 20 years
- Interest Rate: 3.0%

**Expected Results:**
- ITP: €0 (0% for new builds)
- VAT: €30,000 (10% of €300,000)
- AJD: €1,800 (0.6% of €300,000)
- Notary: €1,500 (0.5% of €300,000, minimum €600)
- Registry: €900 (0.3% of €300,000, minimum €400)
- Legal: €3,000 (1% of €300,000, minimum €1,200)
- Loan Amount: €225,000 (75% of €300,000)
- Monthly Mortgage: €1,243.68
- Total Purchase Costs: €37,200
- Cash Required: €112,200 (€75,000 deposit + €37,200 costs)
- Grand Total: €337,200

**Verification:**
- [ ] VAT shows €30,000.00
- [ ] AJD shows €1,800.00
- [ ] Total Taxes: €31,800.00
- [ ] Total Fees: €5,400.00
- [ ] Monthly payment ~€1,244

---

### Test 3: High Deposit (Catalonia Resale)

**Input:**
- Purchase Price: €750,000
- Region: Katalonien
- Property Type: Bestandsimmobilie (Resale)
- Deposit: 50%
- Mortgage Term: 15 years
- Interest Rate: 2.5%

**Expected Results:**
- ITP: €75,000 (10% of €750,000 - highest in Spain)
- VAT: €0
- AJD: €0
- Notary: €3,750 (0.5% of €750,000, minimum €600)
- Registry: €2,250 (0.3% of €750,000, minimum €400)
- Legal: €7,500 (1% of €750,000, minimum €1,200)
- Loan Amount: €375,000 (50% of €750,000)
- Monthly Mortgage: €2,631.41
- Total Purchase Costs: €88,500
- Cash Required: €463,500 (€375,000 deposit + €88,500 costs)
- Grand Total: €838,500

**Verification:**
- [ ] ITP shows €75,000.00 (highest rate)
- [ ] Loan amount: €375,000.00
- [ ] Monthly payment ~€2,631
- [ ] Total Costs: €88,500.00

---

### Test 4: Low Deposit (Basque Country Resale)

**Input:**
- Purchase Price: €200,000
- Region: Baskenland
- Property Type: Bestandsimmobilie (Resale)
- Deposit: 10%
- Mortgage Term: 30 years
- Interest Rate: 4.0%

**Expected Results:**
- ITP: €8,000 (4% of €200,000 - lowest in Spain)
- VAT: €0
- AJD: €0
- Notary: €1,000 (0.5% of €200,000, minimum €600)
- Registry: €600 (0.3% of €200,000, minimum €400)
- Legal: €2,000 (1% of €200,000, minimum €1,200)
- Loan Amount: €180,000 (90% of €200,000)
- Monthly Mortgage: €859.15
- Total Purchase Costs: €11,600
- Cash Required: €31,600 (€20,000 deposit + €11,600 costs)
- Grand Total: €211,600

**Verification:**
- [ ] ITP shows €8,000.00 (lowest rate)
- [ ] Loan amount: €180,000.00
- [ ] Monthly payment ~€859
- [ ] Total Costs: €11,600.00

---

### Test 5: Minimum Fees (Small Purchase)

**Input:**
- Purchase Price: €50,000
- Region: Andalusien
- Property Type: Bestandsimmobilie (Resale)
- Deposit: 20%
- Mortgage Term: 25 years
- Interest Rate: 3.5%

**Expected Results:**
- ITP: €3,500 (7% of €50,000)
- VAT: €0
- AJD: €0
- Notary: €600 (minimum, 0.5% would be €250)
- Registry: €400 (minimum, 0.3% would be €150)
- Legal: €1,200 (minimum, 1% would be €500)
- Loan Amount: €40,000 (80% of €50,000)
- Monthly Mortgage: €179.69
- Total Purchase Costs: €5,700
- Cash Required: €15,700 (€10,000 deposit + €5,700 costs)
- Grand Total: €55,700

**Verification:**
- [ ] Notary shows €600.00 (minimum applied)
- [ ] Registry shows €400.00 (minimum applied)
- [ ] Legal shows €1,200.00 (minimum applied)
- [ ] Total Fees: €2,200.00

---

### Test 6: Zero Interest Rate

**Input:**
- Purchase Price: €400,000
- Region: Madrid
- Property Type: Bestandsimmobilie (Resale)
- Deposit: 30%
- Mortgage Term: 20 years
- Interest Rate: 0%

**Expected Results:**
- ITP: €24,000 (6% of €400,000)
- VAT: €0
- AJD: €0
- Notary: €2,000 (0.5% of €400,000, minimum €600)
- Registry: €1,200 (0.3% of €400,000, minimum €400)
- Legal: €4,000 (1% of €400,000, minimum €1,200)
- Loan Amount: €280,000 (70% of €400,000)
- Monthly Mortgage: €1,166.67 (simple division: €280,000 / 240 months)
- Total Purchase Costs: €31,200
- Cash Required: €151,200 (€120,000 deposit + €31,200 costs)
- Grand Total: €431,200

**Verification:**
- [ ] Monthly payment shows €1,166.67
- [ ] Calculation works with 0% interest
- [ ] No errors in console

---

### Test 7: Maximum Values

**Input:**
- Purchase Price: €5,000,000
- Region: Katalonien
- Property Type: Neubau (New Build)
- Deposit: 100%
- Mortgage Term: 10 years
- Interest Rate: 5.0%

**Expected Results:**
- ITP: €0 (0% for new builds)
- VAT: €500,000 (10% of €5,000,000)
- AJD: €75,000 (1.5% of €5,000,000)
- Notary: €25,000 (0.5% of €5,000,000)
- Registry: €15,000 (0.3% of €5,000,000)
- Legal: €50,000 (1% of €5,000,000)
- Loan Amount: €0 (100% deposit)
- Monthly Mortgage: €0
- Total Purchase Costs: €665,000
- Cash Required: €5,665,000 (€5,000,000 deposit + €665,000 costs)
- Grand Total: €5,665,000

**Verification:**
- [ ] Loan amount shows €0.00
- [ ] Monthly payment shows €0.00
- [ ] Total Costs: €665,000.00
- [ ] No calculation errors

---

### Test 8: Reset Button

**Steps:**
1. Enter all values from Test 1
2. Verify results display
3. Click "Zurücksetzen" button
4. Verify all fields reset to defaults

**Expected:**
- [ ] Purchase Price: empty
- [ ] Region: Andalusien (first option)
- [ ] Property Type: Bestandsimmobilie (checked)
- [ ] Deposit: 20%
- [ ] Mortgage Term: 25 years
- [ ] Interest Rate: 3.5%
- [ ] All results: €0.00

---

### Test 9: Real-time Updates

**Steps:**
1. Enter Purchase Price: €100,000
2. Verify results update immediately
3. Change to €200,000
4. Verify results update immediately
5. Change Region
6. Verify results update immediately
7. Toggle Property Type
8. Verify results update immediately

**Expected:**
- [ ] All changes reflect instantly
- [ ] No lag or delay
- [ ] Calculations always correct

---

### Test 10: Mobile Responsiveness

**Steps:**
1. Open calculator on mobile device
2. Verify layout is single column
3. Verify inputs are readable
4. Verify buttons are clickable
5. Verify results display properly
6. Test on tablet (landscape)
7. Test on tablet (portrait)

**Expected:**
- [ ] Single column on mobile
- [ ] Two columns on tablet/desktop
- [ ] All text readable
- [ ] All buttons clickable
- [ ] No horizontal scrolling

---

## Calculation Verification Formula

### For Manual Verification:

```
ITP = Purchase Price × ITP Rate
VAT = Purchase Price × VAT Rate
AJD = Purchase Price × AJD Rate

Notary = MAX(Purchase Price × 0.005, 600)
Registry = MAX(Purchase Price × 0.003, 400)
Legal = MAX(Purchase Price × 0.01, 1200)

Deposit Amount = Purchase Price × (Deposit % / 100)
Loan Amount = Purchase Price - Deposit Amount

Monthly Rate = Annual Rate / 100 / 12
Months = Years × 12
Factor = (1 + Monthly Rate) ^ Months
Monthly Payment = (Loan Amount × Monthly Rate × Factor) / (Factor - 1)

Total Taxes = ITP + VAT + AJD
Total Fees = Notary + Registry + Legal
Purchase Costs = Total Taxes + Total Fees
Cash Required = Deposit Amount + Purchase Costs
Grand Total = Purchase Price + Purchase Costs
```

---

## Browser Console Testing

Open browser console (F12) and check:

```javascript
// Should show no errors
// Should show calculator initialized

// Test calculation manually:
calculate({
    purchasePrice: 500000,
    region: 'andalusia',
    propertyType: 'resale',
    depositPercent: 20,
    mortgageYears: 25,
    interestRate: 3.5
})

// Should return object with all calculations
```

---

## Checklist for Full Testing

- [ ] Test 1: Basic Calculation
- [ ] Test 2: New Build
- [ ] Test 3: High Deposit
- [ ] Test 4: Low Deposit
- [ ] Test 5: Minimum Fees
- [ ] Test 6: Zero Interest
- [ ] Test 7: Maximum Values
- [ ] Test 8: Reset Button
- [ ] Test 9: Real-time Updates
- [ ] Test 10: Mobile Responsive
- [ ] All regions work
- [ ] No console errors
- [ ] PDF export works
- [ ] localStorage saves/loads
- [ ] Calculations match manual verification

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Results show €0.00 | Enter purchase price and select region |
| Calculations wrong | Verify tax rates in calculator.js |
| Mobile looks broken | Check CSS media queries |
| Dropdown empty | Verify JavaScript is running |
| Reset doesn't work | Check localStorage is enabled |
| PDF export blank | Ensure print styles are correct |

---

## Performance Testing

**Expected Performance:**
- Page load: < 100ms
- Calculation: < 1ms
- UI update: < 50ms
- Total interaction time: < 200ms

**Test with:**
- Chrome DevTools Performance tab
- Firefox Developer Tools
- Safari Web Inspector

---

## Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Labels associated with inputs
- [ ] Color contrast sufficient
- [ ] Text is readable
- [ ] No flashing content

---

**All tests should pass before deploying to production!**
