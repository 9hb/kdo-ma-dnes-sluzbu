# Služba Bot

Discord bot pro automatické oznámení týdenních služeb v kanálu. Tento bot zajišťuje spravedlivou rotaci úklidových služeb mezi členy a automaticky posílá oznámení na Discord.

## Popis projektu

Bot byl vytvořen pro zjednodušení organizace úklidových služeb. Automaticky každé pondělí ráno oznámí, kdo má daný týden službu, a zajistí rovnoměrné střídání všech členů.

## Funkce

- Automatické posílání zpráv o týdenní službě každé pondělí v 8:00
- Rotace jmen ze seznamu v souboru `jmena.txt`
- Ukládání aktuální pozice v rotaci do souboru `index.txt`
- Nastavení pomocí proměnných prostředí pro bezpečnější konfiguraci

## Předpoklady

- Node.js (verze 14.0.0 nebo vyšší)
- NPM (Node Package Manager)
- Discord účet a vytvořený bot s příslušnými oprávněními
- Přístupová práva pro zápis do souborů v adresáři aplikace

## Instalace

1. Naklonujte nebo stáhněte tento repozitář:

   ```
   git clone https://github.com/9hb/kdo-ma-dnes-sluzbu.git
   ```

2. Nainstalujte závislosti:

   ```
   npm install
   ```

3. Do souboru `jmena.txt` zadejte seznam jmen (dvě jména na řádek => dva lidi mají službu)

4. V souboru `index.js` nastavte:

   - `TOKEN` - Váš Discord bot token
   - `CHANNEL_ID` - ID kanálu pro posílání zpráv

5. Soubor `index.txt` obsahuje aktuální pozici v rotaci

## Spuštění

1. Spusťte bota pomocí příkazu:

   ```
   node index.js
   ```

2. Bot bude automaticky posílat zprávy každé pondělí v 8:00.
