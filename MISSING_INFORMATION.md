# HOTEL SUNNY POINT — UNRESOLVED & MISSING INFORMATION REGISTER
*Maintained by Senior QA Engineer, Product Architect & Client Operations Team*

---

## 1. Classification Methodology

In strict compliance with Product Data Integrity Guidelines, every piece of restaurant data is catalogued under three explicit levels:
- **VERIFIED**: Confirmed by authoritative physical building signage, editorial gazette features, or direct official promotional posts.
- **UNVERIFIED**: Discovered through general marketing/social captions, but specific attributes (such as active price, seasonal availability, or exact portioning) have not been directly confirmed with the restaurant owner.
- **MISSING**: Essential restaurant operations information absent from the supplied digital assets, required before public production deployment.

---

## 2. Register of Missing & Unverified Items

| Item # | Attribute | Current Status | Available Evidence / Working Default | Required Action for Live Launch |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **Individual Dish Prices (Non-Soups)** | **MISSING / UNVERIFIED** | The 5 soups are verified *"under ₹120"* (`DX36hh2irzR`). Prices for Masala Dosa, Sizzlers, Starters, Pastas, Desserts are not published in the Instagram captions. For demonstration purposes, realistic Indian market price tiers (e.g., Masala Dosa ₹90, Peri Peri Sizzler ₹280) are configured as editable defaults. | Obtain authoritative physical print menu or POS rate card from Hotel Sunny Point management. |
| **02** | **Full Street Address & Pincode** | **PARTIALLY VERIFIED** | Town is verified as Bhadrawati, Chandrapur District, Maharashtra, PIN 442902. Exact plot number / landmark / road (e.g. Nagpur-Chandrapur Highway / Main Road) is missing from social metadata. | Confirm physical street address and Google Maps Place ID / Plus Code. |
| **03** | **Operating Hours & Days** | **MISSING** | No opening/closing times (e.g. 7:00 AM – 11:00 PM, 7 days a week) are stated in the social media export. Default set to 7:30 AM – 10:30 PM (All Days). | Confirm daily breakfast, lunch, high-tea, and dinner operational timings. |
| **04** | **FSSAI License Number** | **PARTIALLY VERIFIED** | The physical illuminated neon signboard displays a registration number (partially obscured as `0000907350`). | Obtain official 14-digit FSSAI license certificate number to display in digital menu footer. |
| **05** | **Table Number Range** | **MISSING** | Physical table layout and total seating capacity (e.g., Tables 1 through 24, AC Hall vs Family Section) are not specified. | Confirm table numbering schema for customized table-specific QR codes. |
| **06** | **Current Active Promotions** | **UNVERIFIED** | The "Monsoon Affairs" campaign was heavily featured in late 2026 posts, but current active season campaign (e.g. Winter Specials / Diwali / Regular Menu) requires restaurant confirmation. | Confirm which promotions are actively running today before setting them as live on the home screen. |
| **07** | **Official Restaurant Email Address** | **MISSING** | No email address was supplied in `metadata.json` or image graphics. Two telephone numbers were verified (`+91 9511724562`, `7517469858`). | Collect official administrative contact email for dashboard notifications and customer feedback routing. |
| **08** | **Full Physical Print Menu Coverage** | **PARTIALLY VERIFIED** | 32 signature dishes across 7 cuisines were extracted with high-resolution photos. The full physical restaurant menu likely comprises 100+ standard items (e.g. additional paneer gravies, dals, rotis, rice varieties, cold beverages). | Ingest complete print menu catalog during onboarding workshop. |

---

## 3. Safe Development Handling Protocol
1. **Clear Demo Labelling**: All placeholder prices for unverified dishes in the development and demonstration environment are clearly documented as provisional rates that can be updated in real time via the Administration Dashboard in seconds.
2. **Never Present Sample Prices as Genuine**: The client demonstration will specifically showcase updating these provisional prices to actual live prices via the `/admin` interface.
3. **No Phantom Contact Details**: Only the verified phone number (`+91 9511724562`) and location (`Bhadrawati, Maharashtra`) extracted from the source assets are displayed.
