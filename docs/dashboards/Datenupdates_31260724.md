---
title: "Datenupdates"
description: "DataLion documentation"
author: "Carolin Schwab"
lastEditor: "Mario Bacher"

breadcrumbs: ["Helpcenter","Übersicht","Daten & Codebook"]
---

# Datenupdates

Wie Sie Ihre Daten erstmalig in eine Datenquelle hochladen, erfahren Sie [hier](31293445.html). Wenn Sie Hilfe beim Einstieg in das Projekt brauchen, so finden Sie [hier](Erste-Schritte-in-DataLion_3473511.html) eine detaillierte Anleitung.

## Um Daten in einer Datenquelle zu aktualisieren, gibt es mehrere Optionen:

1.  [**Manuelles Zero-Downtime-Update**](19595265.html) (empfohlen; Updates werden in eine neue Datenquelle eingespielt und die Datenquellen anschließend umbenannt)  
    **Vorteile**:
    
    -   Backup der Daten
        
    -   Keine Downtime der Dashboards
        
    -   Daten können hochgeladen und erst später freigegeben werden  
        
2.  [**Automatisches Zero-Downtime-Update**](10256398.html) (empfohlen; Updates direkt in der Datenquelle mittels automatisierter Upload-Prozedur)  
    **Bedingung**: aktuell nur mit Upload-Einstellung “Tabelle ersetzen” möglich  
    **Vorteile**:
    
    -   Backup der Daten
        
    -   Keine Downtime der Dashboards  
        
3.  **Manuelles Update direkt in der Datenquelle** (nicht empfohlen, da kein Backup erstellt wird)  
    Daten können direkt in eine Datenquelle importiert werden und diese überschreiben oder an diese angehängt werden. Alle notwendigen Optionen finden sich nachstehend.
    

### Grundsätzliches Vorgehen:

-   Klicken Sie im **Projekt-Backend → Datenquellen** auf die Datenquelle, die Sie aktualisieren möchten.
    
-   Klicken Sie unter “Daten-Upload” auf “Choose file” und wählen Sie die Datei aus, die Sie hochladen möchten.
    
-   Sie können im **Kommentarfeld** Hinweise zur Version eingeben (z.B. aktualisiert am xx.xx.xxxx), um den Überblick über Ihre Daten zu behalten
    
-   Klicken Sie auf **Speichern**, um die Vorschau Ihrer Daten zu sehen
    
-   **Wählen Sie die gewünschten Upload-Einstellungen aus**
    
    -   Nur, wenn Sie komplett neue Daten in ein Projekt hochladen wollen, können Sie die Option “Codebook nach dem Import erzeugen” auswählen. **Achtung**: Dadurch wird das bestehende Codebook überschrieben und kann nicht mehr wiederhergestellt werden! Wir empfehlen Ihnen daher das Codebook vor dem Datenupdate herunter zu laden.
        
    -   **Update-Art:**
        
        -   Normales Update (manuelles Update)
            
        -   Update ohne Downtime ([automatisches Zero-Downtime-Update](10256398.html))
            
    -   **Update-Strategie**
        
        -   **Tabelle ersetzen**: Die bereits hochgeladenen Daten werden durch die neuen Daten überschrieben. Diese Option wird benötigt, wenn mit jedem Upload ein Gesamtdatensatz zur Verfügung gestellt wird.
            
        -   **An Tabelle anhängen**: Die ausgewählten Daten werden an die bereits hochgeladenen Daten angehängt. Diese Option wird benötigt, wenn die hochgeladenen Daten beispielsweise um neue Monats-/oder Quartalsdaten ergänzt werden sollen  
            
    -   Die **weiteren Einstellungen** bieten noch folgende Möglichkeiten
        
        -   Erste Zeile ignorieren
            
        -   **Berechnungen nach dem Upload automatisch durchführen**:  
            Sollten Sie Berechnungen für diese Datenquelle hinterlegt haben, so können Sie diese über diese Option automatisch nach dem Upload ausführen lassen.
            
        -   **Umgang mit Spaltentypen\***
            
            -   **Spaltentypen und -längen optimieren** (default; ist i.d.R. korrekt): Die optimalen Spaltentypen und -längen werden automatisch optimiert
                
            -   **Spaltenlängen optimieren:** nur die Spaltenlängen werden automatisch optimiert
                
        -   **Uploadoption “Wie wollen Sie die Daten hochladen?”**
            
            -   **Jetzt hochladen** (default): der Uplodad startet direkt. Geeignet für kleinere Datensätze
                
            -   **Mit Benachrichtigung hochladen**: der Upload wird im Hintergrund ausgeführt und Sie erhalten eine Benachrichtigung per E-Mail, sobald der Upload abgeschlossen ist. Geeignet für sehr große Datensätze (diese sollten im Idealfall als .zip-Datei hochgeladen werden)  
                
                ![image-20240514-120654.png](/img/31522826.png)
-   Klicken Sie auf Speichern, um den Upload zu starten
    

**\*Weitere Informationen zum Handling von Spaltentypen**

-   **Standard import**:
    
    -   Technische Implementierung: VARCHAR(255)
        
    -   D.h. es wird bei jeder Variable eine Feldlänge = 255 gesetzt
        
    -   Das Limit der Spaltenlängen insgesamt ist 65.535. Dieses wird bei ca. 85 Spalten erreicht. Z.B. 92 Spalten x 255 Zeichen x 3 bytes =`>` 70.380
        
-   **Spaltenlängen optimieren** / **Optimize column lenghts**:
    
    -   Technische Implementierung: VARCHAR(width)
        
    -   In der Datenbank werden die Feldlängen automatisch auf die tatsächliche Spaltenbreite begrenzt 
        
    -   Beispiel: Der längste Inhalt einer Spalte ist "9999" -→ Die Spalte hat die Feldlänge = 4 
        
    -   Das ermöglicht breitere Datensätze und erhöht die Performance
        
-   **Spaltentypen und -längen optimieren** / **Optimize column types and lengths**:
    
    -   Technische Implementierung: type(width)
        
    -   Es werden neben den Feldlängen auch die Feldtypen automatisch erkannt
        
    -   Im Datensatz werden leere Felder automatisch als NULL eingelesen.
        
        -   Hintergrund: Numerische Spalten werden durch "optimize column type" als numerische Feldtypen angelegt. Bei numerischen Feldtypen gibt es in mySQL als mögliche Werte Zahlen und NULL. Anders als bei anderen Feldtypen gibt es keine leere Zeichenkette. Bei numerischen Feldtypen wird eine leere Zeichenkette als 0 interpretiert. Beim Ausschließen leerer Zeichenketten würden in diesem Fall 0-Werte von den Berechnungen exkludiert.  
            
    -   **Beispiel 1**: Eine Variable enthält Text wie Brand1, Brand2, Brand3. Es wird der Variablentyp String (varchar) mit einer Feldlänge = 6 erkannt.
        
    -   **Beispiel 2, Integers**: Es gibt ausschließlich einstellige Ziffern in einer Spalte. Für diese Spalte wird der Variablentyp tinyint erkannt. Die Feldlänge wird auf 4 gesetzt (nicht auf 1). Das liegt daran, dass tinyint ein 1-Byte Integer ist. Es kann Werte zwischen 0 und 255 haben (d.h. eine maximale Feldlänge von 3) oder Werte zwischen -128 bis 128 (d.h. eine maximale Feldlänge von 4). Tinyint setzt die Feldlänge automatisch auf 4, da tinyint(4) die gleiche Speicherkapazitäten benötigt wie tinyint(1) (1 Byte).
