# Garance — PWA pro Auto Hájek

PWA (Progressive Web App) s připomínkou fotodokumentace garančních oprav pro mechaniky Auto Hájek s.r.o.

Aplikace funguje **plně offline** po prvním otevření — Service Worker cachuje všechny soubory do telefonu.

---

## Co je v balíčku

| Soubor | Popis |
|---|---|
| `index.html` | Hlavní aplikace (11 snímků, auto-play) |
| `manifest.json` | Popis aplikace pro PWA (jméno, barvy, ikony) |
| `service-worker.js` | Zajišťuje offline fungování |
| `icon-192.png` | Ikona 192×192 px (pro plochu) |
| `icon-512.png` | Ikona 512×512 px (pro launcher) |

---

## Nahrání na GitHub Pages — krok za krokem

### 1. Vytvoř nový repozitář na GitHubu

- Jdi na https://github.com/new
- Název: `garance` (nebo cokoliv, co se ti líbí)
- **Public** (GitHub Pages zdarma funguje jen na public repo)
- Zaškrtni "Add a README file"
- Klikni **Create repository**

### 2. Nahraj soubory

Na stránce repozitáře:
- Klikni **Add file** → **Upload files**
- Přetáhni **všech 5 souborů z tohoto balíčku** (`index.html`, `manifest.json`, `service-worker.js`, `icon-192.png`, `icon-512.png`)
- Commit message: `initial PWA upload`
- Klikni **Commit changes**

### 3. Zapni GitHub Pages

- V repozitáři klikni na **Settings** (nahoře vpravo)
- V levém menu klikni **Pages**
- V sekci **Source** vyber:
  - Branch: `main`
  - Folder: `/ (root)`
- Klikni **Save**
- Počkej 1–2 minuty

### 4. Získej URL

GitHub ti zobrazí adresu ve formátu:

```
https://TVUJ-USERNAME.github.io/garance/
```

Například `https://petrbena.github.io/garance/`

---

## Jak to rozeslat mechanikům

### Varianta A — SMS / WhatsApp
Pošli jim odkaz. Otevřou v mobilu, klepnou na **Přidat na plochu**:

- **iPhone (Safari):** Share → Přidat na plochu
- **Android (Chrome):** tři tečky → Přidat na plochu

### Varianta B — QR kód do dílny
Vytiskni QR kód s URL a pověs na zeď v recepci/dílně. Mechanik naskenuje fotoaparátem, klepne "Přidat na plochu" a má ikonu Garance na ploše.

Vytvořit QR zdarma: https://www.qr-code-generator.com

---

## Aktualizace obsahu

Když potřebuješ změnit obsah:

1. Otevři `index.html` a uprav co potřebuješ
2. Nahraj znovu přes GitHub (Add file → Upload → přepsat existující)
3. V `service-worker.js` změň `CACHE_NAME` z `'garance-v1'` na `'garance-v2'` (to přinutí telefony stáhnout novou verzi)
4. Commit

Mechanikové dostanou novou verzi automaticky, jakmile otevřou aplikaci s připojením k internetu.

---

## Testování

### Lokálně (ve vývoji)
PWA vyžaduje HTTPS nebo localhost. Nemůžeš ji otevřít přímo přes `file://`. Testuj buď:
- Po nahrání na GitHub Pages
- Nebo lokálně: `python3 -m http.server 8000` v složce s soubory, otevři `http://localhost:8000`

### Ověření, že PWA funguje
- Chrome DevTools → Application → Manifest (ověří manifest.json)
- Chrome DevTools → Application → Service Workers (ověří registraci)
- Chrome DevTools → Network → zaškrtni "Offline" a obnov stránku — musí fungovat

---

## Autor a kontakt

Auto Hájek s.r.o. · Tuklaty · Ford Trucks authorized service
Petr Beňa — vedoucí servisu
