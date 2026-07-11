# Muelli Calculator - How It Works

## Overview
The Muelli Calculator is a comprehensive real estate purchase cost calculator for properties in Andalusia, Spain. It calculates all associated costs, taxes, fees, and mortgage information based on user inputs.

---

## Input Parameters

### 1. **Purchase Price** (€)
- The base price of the property
- Example: €500,000

### 2. **Region Selection**
- Currently supports: **Andalusia** (and other Spanish regions)
- Each region has different tax rates

### 3. **Property Type**
- **Gebrauchtimmobilie** (Resale): Used properties
- **Neubau / Off-Plan** (New): New construction or off-plan purchases

### 4. **Deposit/Equity** (%)
- Percentage of purchase price paid upfront
- Default: 20%
- Remaining amount = Loan amount

### 5. **Mortgage Parameters**
- **Laufzeit (Years)**: Loan term (10, 15, 20, 25, or 30 years)
- **Zinssatz (Interest Rate %)**: Annual interest rate (default: 3.5%)

---

## Calculation Breakdown

### A. TAXES (Region-Specific)

#### For Andalusia - Resale Properties:
```
ITP (Impuesto sobre Transmisiones Patrimoniales) = Purchase Price × 7%
VAT (Mehrwertsteuer) = €0
AJD (Actos Jurídicos Documentados) = €0
```

#### For Andalusia - New Construction:
```
ITP = €0
VAT = Purchase Price × 10%
AJD = Purchase Price × 1.2%
```

**Example (€500,000 resale in Andalusia):**
- ITP: €500,000 × 0.07 = **€35,000**
- VAT: €0
- AJD: €0
- **Total Taxes: €35,000**

---

### B. FEES (Fixed Percentages with Minimums)

#### Legal Fees (Anwaltskosten)
```
Amount = MAX(Purchase Price × 1%, €1,200)
```

#### Notary Fees (Notarkosten)
```
Amount = MAX(Purchase Price × 0.5%, €600)
```

#### Registry Fees (Grundbuchgebühren)
```
Amount = MAX(Purchase Price × 0.3%, €400)
```

**Example (€500,000):**
- Legal: €500,000 × 0.01 = **€5,000** (above minimum)
- Notary: €500,000 × 0.005 = **€2,500** (above minimum)
- Registry: €500,000 × 0.003 = **€1,500** (above minimum)
- **Total Fees: €9,000**

---

### C. ADDITIONAL COSTS

#### NIE & Non-Resident Setup
```
Amount = €600 (if buyer is non-resident)
Amount = €0 (if buyer is resident)
```

#### Mortgage Costs
```
Amount = Loan Amount × 1.5% (if financing with mortgage)
Amount = €0 (if paying with equity only)
```

**Example (€500,000 with 20% deposit, mortgage financing):**
- Deposit: €500,000 × 0.20 = **€100,000**
- Loan Amount: €500,000 - €100,000 = **€400,000**
- Mortgage Costs: €400,000 × 0.015 = **€6,000**

---

### D. MORTGAGE CALCULATION

Uses the standard amortization formula:

```
Monthly Payment = P × [r(1+r)^n] / [(1+r)^n - 1]

Where:
  P = Loan Amount
  r = Monthly Interest Rate (Annual Rate / 12 / 100)
  n = Total Number of Payments (Years × 12)
```

**Example (€400,000 loan, 3.5% annual rate, 25 years):**
- Monthly Rate: 3.5% / 12 = 0.2917%
- Number of Payments: 25 × 12 = 300
- Monthly Payment ≈ **€1,797.66**

---

## FINAL SUMMARY CALCULATION

### Total Purchase Costs
```
Total Costs = Taxes + Fees + NIE Setup + Mortgage Costs
```

### Cash Required
```
Cash Required = Deposit Amount + Total Costs
```

### Grand Total
```
Grand Total = Purchase Price + Total Costs
```

---

## Complete Example: €500,000 Property in Andalusia

### Inputs:
- Purchase Price: **€500,000**
- Region: **Andalusia**
- Property Type: **Resale (Gebrauchtimmobilie)**
- Deposit: **20%** (€100,000)
- Mortgage: **25 years at 3.5%**
- Buyer Status: **Resident**
- Financing: **Mortgage**

### Calculations:

**Taxes:**
- ITP (7%): €35,000
- VAT: €0
- AJD: €0
- **Subtotal: €35,000**

**Fees:**
- Legal (1%): €5,000
- Notary (0.5%): €2,500
- Registry (0.3%): €1,500
- **Subtotal: €9,000**

**Additional Costs:**
- NIE Setup: €0 (resident)
- Mortgage Costs (1.5% of loan): €6,000
- **Subtotal: €6,000**

**Mortgage:**
- Loan Amount: €400,000
- Monthly Payment: €1,797.66

### Results:
- **Total Purchase Costs: €50,000**
- **Cash Required: €150,000** (€100,000 deposit + €50,000 costs)
- **Grand Total: €550,000**
- **Monthly Mortgage: €1,797.66**

---

## Key Features

✅ **Region-Specific Tax Rates** - Different rates for each Spanish region
✅ **Property Type Differentiation** - Different taxes for resale vs. new construction
✅ **Buyer Status Consideration** - Non-resident fees included
✅ **Flexible Financing Options** - Equity only or mortgage with costs
✅ **Accurate Mortgage Calculation** - Standard amortization formula
✅ **Comprehensive Cost Breakdown** - All fees and taxes itemized

---

## Tax Rates by Region (Andalusia Example)

| Region | Resale ITP | New VAT | New AJD |
|--------|-----------|---------|---------|
| Andalusia | 7% | 10% | 1.2% |
| Catalonia | 10% | 10% | 1.5% |
| Madrid | 6% | 10% | 0.6% |
| Basque Country | 4% | 10% | 0% |

---

## Notes

- All calculations are estimates and may vary based on specific circumstances
- Actual costs may differ due to local variations and specific property conditions
- The calculator provides a good baseline for budgeting purposes
- Professional legal and financial advice is recommended before purchase
