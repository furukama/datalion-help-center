---
title: "Einen maschinenlesbaren Excel-Export definieren"
description: "DataLion documentation"
author: "Carolin Schwab"


breadcrumbs: ["Helpcenter","Übersicht","Exporte"]
---

# Einen maschinenlesbaren Excel-Export definieren

Es gibt die Möglichkeit einen maschinenlesbaren Excel-Export für einen Report zu definieren.

Durch diese Option kann entweder nur das Exportformat definiert werden oder zusätzlich standardmäßig zu exportierende Filter (= Zielgruppen) festgelegt werden.

Aktuell ist diese Option für folgende Charttypen verfügbar: Säulen, Balken, gestapelte Säulen und Balken

# Vorgehen

-   Gehen Sie in die Reporteinstellungen (Zahnrad links neben den Dashboards)
    
-   Unter “Excel-Exporteinstellungen” können Sie das Exportformat als maschinenlesbar definieren
    
-   Schreiben Sie dazu folgenden JSON in das entsprechende Feld:  
    `[{"machine_readable": true, "metrics": ["p", "wn"], "filters": ["f3956", "f3957"]}]`
    

![image-20250107-131028.png](/img/137756673.png)

-   Komponenten der Definition
    
    -   `"machine:readable": true` → der Excel-Export dieses Reports wird in dem maschinenlesbaren Format ausgeführt
        
    -   `"metrics":["p","wn"]` → legen Sie fest, welche Metriken der Charts in dem Report exportiert werden sollen.  
        p = Prozent, wn = gewichtete Fälle
        
    -   `"filters":["f3956", "f3957"]` → legen Sie fest, welche von Ihnen erstellten Filter standardmäßig exportiert werden sollen  
        **Hinweis**: wenn auf dem Dashboard ein Benchmark Dashboard Filter definiert ist, so werden etwaige dort ausgewählte Filter zusätzlich zu den hier definierten Filtrn definiert. Sollen nur Filter exportiert werden, die im Dashboard ausgewählt wurden, so lassen Sie den “filters” Befehl an dieser Stelle weg
        

# Export-Format

Beispiel: Beim Benchmark-Filter wurden Value1 und Value2 als Filter/Zielgruppen ausgewählt. Das Dashboard enthält die Fragen Question with Items und Dummy Question. Es wird das komplette Dashboard exportiert.

![image-20250107-142138.png](/img/137789448.png)

Der Excel-Export beinhaltet die definierten Werte für alle Charts auf dem exportierten Dashboard (es können auch einzelne Charts oder der gesamte Report exportiert werden) und ist wie folgt aufgebaut:

![image-20250107-141453.png](/img/137887746.png)

-   Für jede Ausprägung (Item) einer Frage (Question) wird eine Zeile angelegt.
    
-   Für jede Zielgruppe (im Screenshot Value1 und Value2) werden so viele Spalten angelegt, wie Metriken definiert sind (im Screenshot Prozent und gewichtete Fälle = Basis der Frage).
    
-   Im Gegensatz zum “normalen” Export gibt es keine Leerzeilen, die Frage wird in jeder Zeile wiederholt und die Metriken werden zentral definiert anstatt aus den Charts übernommen zu werden.
