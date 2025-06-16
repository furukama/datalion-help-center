---
title: "In-5-Schritten-zum-ersten-Dashboard_3014937"
description: "DataLion documentation"
---

Helpcenter : In 5 Schritten zum ersten Dashboard  

1.  [Helpcenter](index.html)
2.  [Übersicht](2982609.html)
3.  [Erste Schritte in DataLion](Erste-Schritte-in-DataLion_3473511.html)

# Helpcenter : In 5 Schritten zum ersten Dashboard

Created by Carolin Schwab, last modified by Mario Bacher on März 20, 2024

# 1\. Datensatz prüfen (bevor es losgeht)

Daten können im csv-, Excel- oder sav (SPSS)-Format importiert werden.

Übrigens: In DataLion können Wertelabels separat vom Datensatz als Metainformation gespeichert werden.  Bei Verwendung von sav-Dateien (empfohlen) werden die Werte und Wertelabels direkt separat aus der Datei ausgelesen.

Bitte [prüfen](3441205.html) Sie im Datensatz vorab die folgenden Punkte:

-   Empfohlenes Dateiformat: UTF-8
    
-   Variablennamen enthalten keine Punkte, Leerzeichen, Sonderzeichen und keine führenden Ziffern;
    
-   Variablennamen sind max. 64 Zeichen lang
    
-   Es gibt keine leeren Spalten
    
-   Punkt als Dezimaltrennzeichen (kann bei Bedarf beim Datenupload umgewandelt werden)
    
-   Zur Überprüfung Ihres Datensatzes auf typische Fallstricke nutzen Sie unseren DataLion Datenvalidator: [https://datalion.com/datacheck/](https://datalion.com/datacheck/)
    

# 2\. Registrierung

#### **Registrieren Sie eine Instanz** (das ist die DataLion-Webseite, über die Sie später alle Ihre Projekte erreichen): [https://app.datalion.net/register](https://app.datalion.net/register)

####   
**Navigation zur Instanz-Verwaltung**

-   Klicken Sie rechts oben auf Ihren Namen
    
-   Wählen Sie „Verwaltung“ (bzw. „Admin“)  
    Damit gelangen Sie zur Verwaltung Ihrer Instanz. Hier können Sie Projekte und User anlegen, sowie Updates durchführen
    

![image-20240308-143239.png](/img/3440942.png?width=717)

# 3\. Projekterstellung (Backend) & Navigation

#### **Anlegen eines neuen Projekts**

-   Klicken Sie auf der linken Seite auf „Projekte“
    
-   Klicken Sie rechts oben auf „neu“
    
-   Vergeben Sie einen Projektnamen (dieser wird später in der URL angezeigt), einen internen Titel und wählen Sie ein Theme aus (grundsätzliches Layout für das Projekt – kann später jederzeit umgestellt werden).  
    Speichern --> Im Anschluss werden Sie ins Backend Ihres Projekts weitergeleitet (blaue Navigationsleiste).
    
-   Bei Bedarf können Sie die Projekt-Sprache am Ende der Seite umstellen
    
    ![image-20240308-143300.png](/img/3539172.png?width=725)

#### **Navigation**

![image-20240308-143500.png](/img/3408025.png?width=213)

**Navigation zwischen Projekten**  
Haben Sie zu einem späteren Zeitpunkt mehrere Projekte in Ihrer Instanz, klicken Sie direkt unter Ihrem Namen auf „Projekte“, um zur Startseite (Frontend) des gewünschten Projekts zu gelangen.

![image-20240308-143525.png](/img/3473574.png?width=183)

**Navigation zum Backend**  
Wollen Sie zu einem späteren Zeitpunkt aus dem Frontend zurück zum Backend navigieren, klicken Sie rechts oben auf Ihren Namen und dann auf „Projekt“ (mit dem Zahnrad). 

# 4\. Datenupload & Grundlegende Projekteinstellungen (Backend)

#### **Datenupload**

-   Klicken Sie im Projekt-Backend in der blauen Navigationsleiste auf den Reiter „Datenquellen“.  
    *\[Hinweis: Daten werden in Datenquellen importiert. Bei den meisten Projekten ist eine Datenquelle ausreichend; diese enthält dann alle Daten\]*
    
-   Klicken Sie auf die automatisch generierte Datenquelle, um zum Datenupload zu gelangen
    
    ![image-20240308-143604.png](/img/3473580.png?width=659)
    
-   Klicken Sie auf „Choose file“ und wählen Sie Ihren Datensatz aus. Klicken Sie am Ende der Seite auf „Speichern“.
    
-   Nun sehen Sie eine Vorschau Ihrer Daten. Die Einstellungen können alle bei den Standardwerten belassen werden (sollten Ihre Daten Kommata als Dezimaltrennzeichen verwenden, wählen Sie bitte die Option „Convert comma to dot“). Klicken Sie erneut auf „Speichern“
    
-   Nach erfolgreichem Upload sehen Sie am Ende der Seite eine Vorschau Ihrer Daten.
    

#### **Fehlende Werte definieren**

-   Klicken Sie im Projekt-Backend in der blauen Navigationsleiste auf den Reiter „Einstellungen“
    
-   Klicken Sie auf „Fehlende Werte“. Definieren Sie die von den Berechnungen auszuschließenden Werte als fehlende Werte. Die Eingabe mehrerer fehlender Werte erfolgt kommagetrennt (z.B.: 99, 997, 998)
    
-   Legen Sie ggf. auch NULL und leere Zeichenketten als fehlende Werte fest
    
-   Definieren Sie, wie fehlende Werte standardmäßig im Projekt gehandhabt werden sollen (bei Bedarf kann diese Einstellung auf Fragenebene überschrieben werden)
    
-   Klicken Sie am Ende der Seite auf „Speichern“
    

# 5\. Reports & Dashboards erstellen (Frontend)

Ein Projekt ist in Reports und Dashboards gegliedert. Ein Report enthält ein oder mehrere Dashboards (Tabs), auf denen Ihre Daten mithilfe unterschiedlicher Diagramme/Charts visualisiert werden können.

-   Wechseln Sie zum Frontend, indem Sie rechts in der blauen Navigationsleiste auf das Auge klicken.
    
    ![image-20240308-143640.png](/img/3440956.png?width=187)
    
-   **Legen Sie einen neuen Report an**, indem Sie rechts oben auf das Ordner-Symbol klicken und dann auf „Neuer Report“. Benennen Sie diesen und klicken Sie auf „OK“ . Über das Ordnersymbol können Sie später zwischen Ihren Reports navigieren. Sie sehen nun ihr erstes Dashboard „Neuer Tab“.
    
    ![](/img/3473596.png?width=292)
    
-   Durch Klicken auf den Pfeil auf dem Tab, können Sie Ihr **Dashboard umbenennen, kopieren, beschriften, speichern oder in einen anderen Report verschieben**.
    
    ![image-20240308-143937.png](/img/3539235.png?width=334)
    
-   Vergessen Sie nicht Ihr Dashboard zu **speichern**, sobald Sie Änderungen vorgenommen haben.
    
-   Durch Klicken auf das „+“ neben dem Tab können Sie dem Report ein weiteres Dashboard (Tab) hinzufügen.
    
-   Auf der linken Seite finden Sie die **Navigationsleiste** (sollte diese nicht sichtbar sein, klicken Sie links oben auf das Burger-Menü;  3 Balken). Hier finden Sie alle Variablen, die in Ihrem Datensatz enthalten sind, indem Sie auf „Variables“ klicken.  
    *\[Hinweis: Sie können die Navigation dauerhaft Ein- oder Ausblenden, indem Sie rechts oben auf Ihren Namen klicken und diese über „Navigation ein-/ausblenden“ de-/aktivieren\]*  
    
    ![image-20240308-144010.png](/img/3473614.png?width=171)
    
-   **Charts erstellen**: Sie können ein Chart erstellen, indem Sie auf einen Variablennamen klicken oder eine Frage per Drag & Drop auf das Dashboard ziehen.  
    
    ![image-20240308-144136.png](/img/3408072.png?width=222)
    
    Standardmäßig werden Balkendiagramme angelegt. Sie können im Anschluss alle Charts individuell anpassen.  
      
    Die wichtigsten Diagrammeinstellungen finden sich unter dem **Zahnrad** im Chartheader:
    
    -   [**Chart-Typen**](https://datalion.atlassian.net/servicedesk/customer/portal/1/article/3473553): Hier können Sie auswählen, wie Ihre Daten dargestellt werden sollen. Die gängigsten Charttypen sind:
        
        -   Für Häufigkeiten: Bar (Balken), Column (Säulen), Pie (Kreis), Donut, Line (Linien)
            
        -   Für Zustimmungsskalen: Stacked Bar (gestapelte Balken), Stacked Column (gestapelte Säulen)
            
        -   Für komplexe Daten: [Table](Tabellen-in-DataLion_3539243.html) (Tabellen)
            
    -   **Metriken**: Hier können Sie einstellen, in welcher Metrik die Daten dargestellt werden sollen. Standardmäßig werden Prozent angezeigt. Die gängigsten Alternativen sind „Absolute Werte“ und „Gültige Prozent“.
        
    -   **Sortierung:** Diese können Sie am Ende der Liste einstellen. Standardmäßig wird nach der Reihenfolge Ihrer Variablen sortiert. Sie können auch auf-/absteigend sortieren oder alphabetisch.
        
    -   **Neue Chart Einstellungen**: Hier können individuelle Einstellungen (z.B. Farben, Hintergrundfarbe, Ein-/Ausblenden verschiedener Aspekte) getroffen werden.
        
    -   Über den Pfeil am rechten unteren Rand des Charts können Sie dessen **Größe verändern.**
        
    -   Durch Doppelklicken auf den **Chart-Titel** können Sie diesen manuell verändern
        
    -   [**Fragen zusammenfügen**](https://datalion.atlassian.net/servicedesk/customer/portal/1/article/8126487): Oft sollen verschiedene Fragen mit denselben Ausprägungen in einem gemeinsamen Chart dargestellt werden (meist bei Zustimmungsskalen). Dies geht wie folgt
        
        -   Ziehen Sie das erste Chart per Drag&Drop auf das Dashboard und stellen Sie es auf „stacked bar“ um
            
            ![image-20240308-144244.png](/img/3440983.png?width=262)
        -   Ziehen Sie eine zweite Frage mit denselben Ausprägungen (!) auf das bereits erstellte Chart
            
        -   Klicken Sie im Pop-Up auf „OK“ (Einstellung „Merged“)
            
        -   Das Chart zeigt nun beide Kategorien
            
            ![image-20240308-144311.png](/img/3440989.png?width=213)
        -   Bei gestapelten Diagrammen können unter den Einstellungen (Zahnrad) auch TOPx Boxen gebildet werden.  
            Informationen zum Umgang mit Mehrfachantworten finden Sie [hier](https://datalion.zendesk.com/hc/de/articles/9103012757266-Wie-kann-ich-Mehrfachnennungen-visualiseren-).
            

#### **Daten nach bestimmten Merkmalen filtern oder splitten**:

![image-20240308-144352.png](/img/3408082.png?width=236)

Wechseln Sie links in der Navigationsleiste in den Tab „Filter/Zielgruppen“ (der Hintergrund wechselt von grau zu blau). Nun können Sie alle Variablen als **Split** oder **Filter** verwenden.

  

![image-20240308-144435.png](/img/3539254.png?width=246)

Ziehen Sie eine Variable auf ein bereits existierendes Chart, so werden die Daten gesplittet nach den Ausprägungen dargestellt (in den meisten Charttypen verfügbar)

Klicken Sie auf eine Variable, so werden Ihnen die einzelnen Ausprägungen angezeigt.  
Ziehen Sie eine einzelne Ausprägung auf ein Chart, so werden die Daten nach dieser Ausprägung gefiltert. Das Hinzufügen weiterer Ausprägung fügt diese als Split hinzu.

![image-20240308-144619.png](/img/3441009.png?width=236)

Filtereinstellungen können bei dem neu verfügbaren Filter-Symbol in den Chart-einstellungen verändert werden (Reihenfolge, löschen, etc.)

***Herzlichen Glückwunsch!***  
***Nun können Sie mit vielen Kombinationen und Darstellungsmöglichkeiten für Ihr Projekt loslegen!***

*Im* [*nächsten Artikel*](3014981.html) *finden Sie hilfreiche Ergänzungen, um DataLion effizienter und umfänglicher zu nutzen.*