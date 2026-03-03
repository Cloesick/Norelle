# Norelle Webshop — Handleiding

Deze handleiding is bedoeld voor de beheerder(s) van de Norelle webshop. Alles wordt stap voor stap uitgelegd — geen technische kennis vereist.

---

## Inhoudsopgave

1. [Inloggen](#1-inloggen)
2. [Dashboard overzicht](#2-dashboard-overzicht)
3. [Producten beheren](#3-producten-beheren)
4. [Bestellingen bekijken](#4-bestellingen-bekijken)
5. [Verzending](#5-verzending)
6. [Betalingen](#6-betalingen)
7. [Pagina's bewerken](#7-paginas-bewerken)
8. [Menu aanpassen](#8-menu-aanpassen)
9. [Logo en kleuren](#9-logo-en-kleuren)
10. [E-mail instellingen](#10-e-mail-instellingen)
11. [SEO (vindbaarheid)](#11-seo-vindbaarheid)
12. [Beveiliging](#12-beveiliging)
13. [Cookie banner (GDPR)](#13-cookie-banner-gdpr)
14. [Mobiele ervaring](#14-mobiele-ervaring)
15. [Verkooppijplijn (Sales Pipeline)](#15-verkooppijplijn-sales-pipeline)
16. [Product sortering](#16-product-sortering)
17. [Veelgestelde vragen](#17-veelgestelde-vragen)
18. [Hulp nodig?](#18-hulp-nodig)

---

## 1. Inloggen

1. Ga naar: **http://localhost/norelle/wp-admin/**
   *(na launch wordt dit `https://norelle.com/wp-admin/`)*
2. Vul in:
   - **Gebruikersnaam:** `admin`
   - **Wachtwoord:** `norelle_admin_2024`
3. Klik op **Inloggen**

> ⚠️ **Belangrijk:** Wijzig het wachtwoord vóór de launch! Ga naar *Gebruikers → Jouw profiel → Nieuw wachtwoord*.

---

## 2. Dashboard overzicht

Na het inloggen zie je het WordPress Dashboard. De belangrijkste onderdelen:

| Menu-item | Wat doe je hier? |
|-----------|-----------------|
| **Dashboard** | Overzicht van je webshop (bestellingen, omzet, notificaties) |
| **Berichten** | Blogartikelen schrijven (optioneel) |
| **Media** | Afbeeldingen en bestanden beheren |
| **Pagina's** | Pagina's bewerken (Over ons, Contact, etc.) |
| **Producten** | Producten toevoegen, bewerken, verwijderen |
| **WooCommerce** | Bestellingen, klanten, rapporten, instellingen |
| **Weergave** | Thema, menu's, widgets aanpassen |
| **Plugins** | Plugins beheren |
| **Instellingen** | Algemene site-instellingen |

---

## 3. Producten beheren

### Een nieuw product toevoegen

1. Ga naar **Producten → Nieuw toevoegen**
2. Vul in:
   - **Productnaam** (bijv. "Aurelia Gold Necklace")
   - **Beschrijving** — uitgebreide tekst met materialen, afmetingen, etc.
   - **Korte beschrijving** — 1-2 zinnen die onder de prijs verschijnen
3. Scroll naar **Productgegevens**:
   - **Normale prijs** — de verkoopprijs (bijv. `189,00`)
   - **Kortingsprijs** — vul dit alleen in als het product in de uitverkoop is
   - **SKU** — uniek artikelnummer (bijv. `NOR-NK-004`)
   - **Voorraad** — vink "Voorraadbeheer" aan en vul het aantal in
4. Rechts op de pagina:
   - **Productcategorieën** — vink de juiste categorie aan (Necklaces, Earrings, etc.)
   - **Productafbeelding** — klik en upload de hoofdfoto
   - **Productgalerij** — extra foto's toevoegen
5. Klik op **Publiceren**

### Een bestaand product bewerken

1. Ga naar **Producten → Alle producten**
2. Klik op de productnaam
3. Pas aan wat nodig is
4. Klik op **Bijwerken**

### Een product verwijderen

1. Ga naar **Producten → Alle producten**
2. Beweeg je muis over het product
3. Klik op **Verplaatsen naar prullenbak**

### Productfoto's uploaden

De ideale foto-afmetingen:
- **Hoofdafbeelding:** minimaal 800×800 pixels (vierkant werkt het best)
- **Galerij:** extra foto's vanuit verschillende hoeken
- **Formaat:** JPG of PNG
- **Achtergrond:** wit of neutraal voor een professionele look

---

## 4. Bestellingen bekijken

### Nieuwe bestelling binnengekomen?

1. Ga naar **WooCommerce → Bestellingen**
2. Je ziet een lijst met alle bestellingen
3. Klik op een bestelling om de details te zien

### Bestelstatussen

| Status | Betekenis |
|--------|-----------|
| **In behandeling** | Betaling nog niet ontvangen (bijv. overschrijving) |
| **In de wacht** | Wacht op bevestiging van betaalpartner |
| **Verwerking** | Betaling ontvangen — klaar om te verzenden! |
| **Afgerond** | Bestelling verzonden en afgeleverd |
| **Geannuleerd** | Bestelling geannuleerd |
| **Terugbetaald** | Geld is teruggestort |

### Een bestelling verwerken

1. Open de bestelling
2. Controleer de betaling en adresgegevens
3. Verander de status naar **Afgerond** zodra het pakket verzonden is
4. De klant ontvangt automatisch een e-mail

---

## 5. Verzending

De verzendkosten zijn al ingesteld:

| Bestemming | Tarief | Gratis verzending |
|------------|--------|-------------------|
| **België** | €5,95 | Bestellingen vanaf €75 |
| **Europese Unie** | €9,95 | Bestellingen vanaf €150 |
| **Rest van de wereld** | €19,95 | — |

### Verzending aanpassen

1. Ga naar **WooCommerce → Instellingen → Verzending**
2. Klik op de zone die je wilt bewerken
3. Pas de tarieven aan
4. Klik op **Wijzigingen opslaan**

---

## 6. Betalingen

### Huidige betaalmethoden

| Methode | Status | Wat moet je doen? |
|---------|--------|-------------------|
| **Overschrijving** | ✅ Actief | IBAN invullen (zie onder) |
| **Stripe (kaart)** | ⚠️ Wacht op API-sleutels | Beheerder moet Stripe account aanmaken |
| **PayPal** | ⚠️ Wacht op gegevens | Beheerder moet PayPal Business koppelen |

### IBAN invullen voor overschrijving

1. Ga naar **WooCommerce → Instellingen → Betalingen**
2. Klik op **Beheren** naast "Overschrijving"
3. Vul bij **Instructies** het volgende in:
   ```
   Bank: [banknaam]
   Rekeninghouder: Norelle
   IBAN: [jouw IBAN]
   BIC: [jouw BIC]
   
   Gebruik je bestelnummer als mededeling.
   ```
4. Klik op **Wijzigingen opslaan**

### Stripe instellen (creditcard)

1. Maak een account aan op [stripe.com](https://dashboard.stripe.com/register)
2. Ga naar **Developers → API keys**
3. Kopieer de **Publishable key** en **Secret key**
4. In WordPress: **WooCommerce → Instellingen → Betalingen → Stripe → Beheren**
5. Plak de sleutels in de juiste velden
6. Zet **Testmodus** uit als je live wilt gaan
7. Klik op **Wijzigingen opslaan**

### PayPal instellen

1. Maak een PayPal Business account aan op [paypal.com/business](https://www.paypal.com/business)
2. In WordPress: **WooCommerce → Instellingen → Betalingen → PayPal → Beheren**
3. Volg de wizard om je account te koppelen

---

## 7. Pagina's bewerken

De webshop heeft de volgende pagina's:

| Pagina | Wat staat erop? |
|--------|----------------|
| **Home** | Startpagina met hero banner en uitgelichte producten |
| **Shop** | Alle producten |
| **Winkelwagen** | Producten in je mandje |
| **Afrekenen** | Betaal- en adresformulier |
| **Mijn account** | Klantaccount (bestellingen, adressen) |
| **Over Norelle** | Het verhaal van het merk |
| **Contact** | Contactgegevens |
| **Privacybeleid** | GDPR privacy policy |
| **Algemene voorwaarden** | Verkoopvoorwaarden |
| **Retourneren** | Retour- en terugbetalingsbeleid |
| **Verzending** | Verzendtarieven en levertijden |

### Een pagina bewerken

1. Ga naar **Pagina's → Alle pagina's**
2. Klik op de pagina die je wilt bewerken
3. Pas de tekst aan in de editor
4. Klik op **Bijwerken**

> 💡 **Tip:** De pagina's "Privacybeleid" en "Algemene voorwaarden" bevatten al teksten die voldoen aan de Belgische wet en GDPR. Controleer of de bedrijfsgegevens kloppen en pas ze aan waar nodig.

---

## 8. Menu aanpassen

### Hoofdmenu (bovenaan)

1. Ga naar **Weergave → Menu's**
2. Selecteer **Norelle Main Menu**
3. Je kunt:
   - Items verslepen om de volgorde te wijzigen
   - **Pagina's toevoegen** — vink aan in de linkerzijbalk en klik "Aan menu toevoegen"
   - **Items verwijderen** — klap een item open en klik "Verwijderen"
4. Klik op **Menu opslaan**

### Voettekst (footer)

De footer wordt automatisch gegenereerd met links naar:
- Alle producten, categorieën
- Verzending, Retourneren, Voorwaarden, Privacy
- Contact en social media

Om de footerlinks aan te passen, neem contact op met de developer.

---

## 9. Logo en kleuren

### Logo wijzigen

1. Ga naar **Weergave → Customizer**
2. Klik op **Site-identiteit**
3. Klik op **Logo wijzigen** en upload een nieuw logo
4. Klik op **Publiceren**

### Kleuren

De webshop gebruikt de Norelle huisstijlkleuren:
- **Donker bordeaux** (`#3b0505`) — header, footer, knoppen
- **Crème** (`#eeefc9`) — tekst op donkere achtergronden
- **Licht crème** (`#fffaea`) — pagina-achtergrond

Om kleuren aan te passen moet het thema-bestand `style.css` bewerkt worden. Neem contact op met de developer.

---

## 10. E-mail instellingen

WooCommerce stuurt automatisch e-mails bij:
- Nieuwe bestelling (naar jou als beheerder)
- Bestelling bevestigd (naar de klant)
- Bestelling verzonden (naar de klant)
- Bestelling terugbetaald (naar de klant)

### E-mails bekijken en aanpassen

1. Ga naar **WooCommerce → Instellingen → E-mails**
2. Je ziet een lijst van alle e-mailtypes
3. Klik op **Beheren** om de tekst aan te passen

### E-mail afzender

| Instelling | Waarde |
|------------|--------|
| Afzendernaam | Norelle |
| Afzenderadres | hello@norelle.com |

> ⚠️ **Belangrijk:** E-mails worden pas betrouwbaar verstuurd zodra SMTP is ingesteld. Zonder SMTP kunnen e-mails in de spam terechtkomen of helemaal niet aankomen.

---

## 11. SEO (vindbaarheid)

De webshop gebruikt **Yoast SEO** om beter gevonden te worden in Google.

### Per product/pagina SEO instellen

1. Open een product of pagina om te bewerken
2. Scroll naar het **Yoast SEO** blok onderaan
3. Vul in:
   - **SEO titel** — wat mensen zien in Google (bijv. "Aurelia Gold Necklace | Norelle")
   - **Meta beschrijving** — korte samenvatting (max 155 tekens)
   - **Focus trefwoord** — het woord waarop je gevonden wilt worden
4. Yoast geeft je een groen/oranje/rood bolletje als score
5. Probeer altijd **groen** te krijgen

### Sitemap

Yoast maakt automatisch een sitemap aan. Na de launch kun je deze indienen bij Google:
1. Ga naar [Google Search Console](https://search.google.com/search-console/)
2. Voeg je website toe
3. Dien de sitemap in: `https://norelle.com/sitemap_index.xml`

---

## 12. Beveiliging

De webshop gebruikt **Wordfence Security** voor beveiliging.

### Wat doet Wordfence?

- **Firewall** — blokkeert verdacht verkeer
- **Malware scanner** — scant je website op kwaadaardige code
- **Brute force bescherming** — blokkeert herhaalde inlogpogingen
- **Meldingen** — stuurt e-mails bij beveiligingsproblemen

### Belangrijk vóór de launch

- [ ] Wijzig het admin-wachtwoord
- [ ] Stel SSL/HTTPS in (via je hosting provider)
- [ ] Schakel Wordfence firewall in: **Wordfence → Firewall → Beheren**

---

## 13. Cookie banner (GDPR)

De webshop toont automatisch een cookiebanner aan bezoekers. Dit is verplicht volgens de GDPR (AVG).

### Wat zien bezoekers?

Een banner onderaan het scherm met:
- Uitleg over cookies
- **Accepteren** knop
- **Weigeren** knop
- Link naar het Privacybeleid

### Cookie-instellingen aanpassen

1. Ga naar **Instellingen → Cookie Notice**
2. Pas de tekst, kleuren of positie aan
3. Klik op **Wijzigingen opslaan**

---

## 14. Mobiele ervaring

De webshop is **mobile-first** ontworpen. Dit betekent dat het design eerst voor smartphones is gemaakt en daarna opgeschaald wordt voor tablets en desktops.

### Wat zien mobiele bezoekers?

| Element | Mobiel | Desktop |
|---------|--------|---------|
| **Navigatie** | Hamburgermenu (☰) — tik om te openen | Horizontale menubalk |
| **Productgrid** | 1 kolom (volledig breed) | 3 kolommen |
| **Logo** | Klein (34px) | Groter (54px) |
| **Tekst** | 15px basis | 17px basis |
| **“Add to Bag”** | Sticky balk onderaan het scherm | Normale knop |
| **Formulieren** | Gestapeld, grote invoervelden (48px) | Naast elkaar |
| **Footer** | 1 kolom gestapeld | 4 kolommen naast elkaar |

### Hamburgermenu

Op mobiel verschijnt er rechtsboven een **☰ knop**. Wanneer een bezoeker hierop tikt:

1. Het menu schuift open met alle navigatielinks
2. De knop verandert in een **✕** (sluiten)
3. Tikken op een link sluit het menu automatisch

Dit is volledig automatisch — er hoeft niets ingesteld te worden.

### Sticky “Add to Bag” balk

Op productpagina’s verschijnt er op mobiel een **vaste balk onderaan** het scherm met:
- De productnaam
- De prijs
- Een “Add to Bag” knop

Dit verdwijnt automatisch op desktop.

---

## 15. Verkooppijplijn (Sales Pipeline)

De webshop toont een **visuele voortgangsbalk** aan klanten die producten in hun winkelwagen hebben. Dit moedigt hen aan om het aankoopproces af te ronden.

### 5 stappen

| Stap | Icoon | Pagina |
|------|-------|--------|
| 1. Ontdek | 👁️ | Homepage / Shop |
| 2. Kies | 🛍️ | Productpagina |
| 3. Overzicht | 🛒 | Winkelwagen |
| 4. Betaling | 💳 | Afrekenen |
| 5. Bevestigd | ✅ | Bevestigingspagina |

### Wanneer is de pijplijn zichtbaar?

| Pagina | Zichtbaar? |
|--------|------------|
| Homepage | Nee |
| Shop / categorie | Nee |
| Winkelwagen | **Ja** — stap 3 actief |
| Afrekenen | **Ja** — stap 4 actief |
| Bevestiging | **Ja** — stap 5 actief |

De pijplijn is volledig automatisch en hoeft niet ingesteld te worden. De voltooide stappen worden geanimeerd weergegeven.

---

## 16. Product sortering

Bezoekers kunnen producten sorteren in de shop via een dropdown. Naast de standaard WooCommerce opties zijn er twee extra opties:

| Sorteeroptie | Wat toont het? |
|-------------|----------------|
| **Standaard sortering** | WooCommerce standaard volgorde |
| **Sorteer op populariteit** | Meest verkochte producten eerst |
| **Sorteer op beoordeling** | Best beoordeelde eerst |
| **Sorteer op nieuwste** | Nieuwste producten eerst |
| **Prijs: laag naar hoog** | Goedkoopste eerst |
| **Prijs: hoog naar laag** | Duurste eerst |
| **🆕 Nieuwe Collectie** | Alleen producten met de tag “New Collection” |
| **🏷️ Outlet** | Alleen producten met de tag “Outlet” |

### Producten taggen

Om een product in de Nieuwe Collectie of Outlet te plaatsen:

1. Ga naar **Producten → Alle producten**
2. Open het product
3. Zoek rechts het blok **Producttags**
4. Typ `New Collection` of `Outlet` en druk op Enter
5. Klik op **Bijwerken**

---

## 17. Veelgestelde vragen

### Hoe voeg ik een korting toe aan een product?

1. Ga naar **Producten → Alle producten**
2. Open het product
3. Bij **Productgegevens → Normaal** staat de originele prijs
4. Vul bij **Kortingsprijs** de nieuwe prijs in
5. Optioneel: klik op **Plannen** om een start- en einddatum in te stellen
6. Klik op **Bijwerken**

### Hoe maak ik een kortingscode?

1. Ga naar **WooCommerce → Kortingsbonnen → Nieuw toevoegen**
2. Vul een code in (bijv. `WELCOME10`)
3. Stel het type in:
   - **Percentage korting** — bijv. 10% op alles
   - **Vast bedrag** — bijv. €15 korting
4. Stel eventueel beperkingen in (minimumbedrag, specifieke producten)
5. Klik op **Publiceren**

### Hoe exporteer ik mijn bestellingen?

1. Ga naar **WooCommerce → Bestellingen**
2. Klik op **Exporteren** (bovenaan)
3. Kies het formaat (CSV) en klik op **Rapport genereren**

### Hoe maak ik een back-up?

**Via de hosting:** de meeste hosting providers bieden automatische backups aan.

**Handmatig:**
1. Installeer de plugin **UpdraftPlus** (Plugins → Nieuwe plugin → zoek "UpdraftPlus")
2. Ga naar **Instellingen → UpdraftPlus Backups**
3. Klik op **Nu een back-up maken**

### Hoe zie ik hoeveel bezoekers mijn shop heeft?

1. Ga naar **Insights** (MonsterInsights / Google Analytics)
2. Na het koppelen van je Google Analytics account zie je:
   - Aantal bezoekers
   - Populairste pagina's
   - Waar bezoekers vandaan komen
   - Welke producten het meest bekeken worden

---

## 18. Hulp nodig?

### Technische problemen

Neem contact op met de developer met:
- Een screenshot van het probleem
- Wat je deed toen het misging
- De URL van de pagina

### WooCommerce documentatie

- [WooCommerce handleiding (Engels)](https://woocommerce.com/documentation/)
- [WordPress handleiding (Engels)](https://wordpress.org/documentation/)

### Handige links

| Wat | URL |
|-----|-----|
| Webshop | http://localhost/norelle/ |
| Admin | http://localhost/norelle/wp-admin/ |
| Producten | http://localhost/norelle/wp-admin/edit.php?post_type=product |
| Bestellingen | http://localhost/norelle/wp-admin/edit.php?post_type=shop_order |
| Instellingen | http://localhost/norelle/wp-admin/admin.php?page=wc-settings |

> 💡 Na de launch worden alle URLs `https://norelle.com/...`

---

*Laatst bijgewerkt: 02/03/2026*
