# Muelli Calculator - Updated Version

## Overview
The calculator has been updated to match the reference design with a simplified Andalusia-only focus and improved cost breakdown.

---

## Input Parameters

### 1. **Kaufpreis der Immobilie (€)** - Purchase Price
- Default: €500,000
- Range: €100,000 - €3,000,000+
- Quick presets available: 100K, 500K, 1M, 3M+

### 2. **Käufer-Status** - Buyer Status
- **Resident (in Spanien)** - No additional NIE setup fee
- **Nicht-Resident** - Adds €600 NIE & Non-Resident Setup fee

### 3. **Art der Immobilie** - Property Type
- **Gebrauchtimmobilie** (Resale) - ITP tax applies (7% in Andalusia)
- **Neubau / Off-Plan** (New) - VAT (10%) + AJD (1.2%) apply

### 4. **Finanzierung** - Financing
- **Eigenkapital** (Equity) - No mortgage costs
- **Spanische Hypothek** (Mortgage) - Adds 1.5% mortgage costs

---

## Calculation Breakdown

### A. TAXES (Andalusia Rates)

#### For Resale Properties:
```
ITP (Impuesto sobre Transmisiones Patrimoniales) = Purchase Price × 7%
VAT = €0
AJD = €0
```

#### For New Construction:
```
ITP = €0
VAT = Purchase Price × 10%
AJD = Purchase Price × 1.2%
```

### B. FEES

#### Notary & Registry (Combined)
```
Notary = MAX(Purchase Price × 0.5%, €600)
Registry = MAX(Purchase Price × 0.3%, €400)
Combined = Notary + Registry
```

#### Legal Fees (with IVA)
```
Legal Base = MAX(Purchase Price × 1%, €1,200)
Legal with IVA = Legal Base × 1.21 (21% VAT)
```

### C. ADDITIONAL COSTS

#### NIE & Non-Resident Setup
```
Amount = €600 (if non-resident)
Amount = €0 (if resident)
```

#### Mortgage Costs
```
Amount = Purchase Price × 1.5% (if mortgage financing)
Amount = €0 (if equity financing)
```

---

## Example Calculation: €500,000 Resale in Andalusia

### Inputs:
- Purchase Price: **€500,000**
- Buyer Status: **Resident**
- Property Type: **Gebrauchtimmobilie (Resale)**
- Financing: **Spanische Hypothek (Mortgage)**

### Calculations:

**Taxes:**
- ITP (7%): €500,000 × 0.07 = **€35,000**
- VAT: €0
- AJD: €0

**Fees:**
- Notary (0.5%): €500,000 × 0.005 = €2,500
- Registry (0.3%): €500,000 × 0.003 = €1,500
- Notar & Grundbuch Combined: **€6,000**

**Legal Fees:**
- Base (1%): €500,000 × 0.01 = €5,000
- With IVA (21%): €5,000 × 1.21 = **€6,050**

**Additional Costs:**
- NIE Setup: **€0** (resident)
- Mortgage Costs (1.5%): €500,000 × 0.015 = **€5,250**

### Results:

**Geschätzte Nebenkosten:**
- Steuern ITP (7%): €35,000
- Notar & Grundbuch (ca. 1,2%): €6,000
- Anwaltskosten (ca. 1% + IVA): €6,050
- NIE & Non-Resident Setup: €0
- Hypothekenkosten (ca. 1,5%): €5,250

**Gesamte Nebenkosten in Andalusien:**
- Total: **€52,300**
- Percentage: **10.46% des Kaufpreises**

**Gesamtkapitalbedarf:**
- Purchase Price + All Costs: **€552,300**

---

## Key Features

✅ **Andalusia-Only Focus** - Simplified for single region
✅ **Buyer Status Consideration** - Non-resident fees included
✅ **Property Type Differentiation** - Different taxes for resale vs. new
✅ **Financing Options** - Equity or mortgage with associated costs
✅ **IVA on Legal Fees** - 21% VAT automatically added
✅ **Combined Cost Display** - Notary & Registry shown together
✅ **Percentage Calculation** - Shows costs as % of purchase price
✅ **Quick Presets** - Fast price selection buttons
✅ **Local Storage** - Saves user inputs

---

## Tax Rates for Andalusia

| Property Type | ITP | VAT | AJD |
|---------------|-----|-----|-----|
| Resale | 7% | 0% | 0% |
| New Construction | 0% | 10% | 1.2% |

---

## Fee Structure

| Fee Type | Percentage | Minimum |
|----------|-----------|---------|
| Legal Fees | 1% | €1,200 |
| Notary | 0.5% | €600 |
| Registry | 0.3% | €400 |

---

## Additional Costs

| Cost Type | Amount | Condition |
|-----------|--------|-----------|
| NIE Setup | €600 | Non-residents only |
| Mortgage Costs | 1.5% of price | Mortgage financing only |

---

## Display Format

The calculator displays results in this order:

1. **Geschätzte Nebenkosten** (Estimated Additional Costs)
   - Steuern ITP (7%)
   - Notar & Grundbuch (ca. 1,2%)
   - Anwaltskosten (ca. 1% + IVA)
   - NIE & Non-Resident Setup
   - Hypothekenkosten (ca. 1,5%)

2. **Gesamte Nebenkosten in Andalusien** (Total Additional Costs)
   - Total amount
   - Percentage of purchase price

3. **Gesamtkapitalbedarf** (Total Capital Required)
   - Purchase price + all costs

4. **Laufende Gemeindekosten** (Ongoing Municipal Costs)
   - Note about IBI, Basura, Plusvalía

---

## Notes

- All calculations are estimates for budgeting purposes
- Actual costs may vary based on specific circumstances
- Professional legal and financial advice is recommended
- Calculations based on current Andalusia tax rates
- IVA (21%) is automatically added to legal fees
