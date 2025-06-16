---
title: "Besonderheiten-in-Exasol_3408154"
description: "DataLion documentation"
---

Helpcenter : Besonderheiten in Exasol  

1.  [Helpcenter](index.html)
2.  [Übersicht](2982609.html)
3.  [Einstellungen in DataLion](Einstellungen-in-DataLion_3539137.html)

# Helpcenter : Besonderheiten in Exasol

Created by Mario Bacher, last modified on Apr. 09, 2024

Exasol ist (im Gegensatz zu MySQL) ein spaltenorientiertes, relationales Datenbankverwaltungssystem und bietet sich daher insbesondere für breite Datensätze (mehr als ~1.500 Spalten) an. Darüber hinaus ist dieses Datenbanksystem bei großen Datensätzen deutlich performanter.

Folgende Punkte sollten beim Import von CSV-Datensätzen in ein Exasol-Projekt berücksichtigt werden:

-   Variablennamen in Großbuchstaben (Empfehlung; relevant bei geschützten Begriffen in Anführungszeichen )
    
-   Dezimaltrennzeichen: Punkt statt Komma
    
-   Keine Leerzeichen in numerischen Spalten
    
-   Kein NULL 
    
-   Keine doppelten Spaltennamen
    
-   Keine Umlaute in Spaltennamen
    
-   Keine Sonderzeichen, wie '$' oder '-', in einem Spaltennamen
    
-   Kein Punkt in den Spaltennamen
    
-   Keine Sonderzeichen wie \_ am Anfang des Spaltennamens
    

Wie beim Import in eine MySQL-Datenbank, sollte auch der Datensatz UTF-8 enkodiert sein und Unix-Endings haben. [Hier](https://datalion.atlassian.net/servicedesk/customer/portal/1/article/3441205) erfahren Sie mehr. 

Die Exasol-Fehlermeldung "simple identifier expected" weist z.B. darauf hin, dass in einer oder mehreren Spaltennamen Punkte vorkommen (.).

Sollten Sie eine Gewichtungsvariable verwenden, achten Sie darauf, dass der Variablentyp der Gewichtungsvariable "decimal" ist. Den Variablentyp können Sie im Projektbackend unter DataSources in der entsprechenden Datennquelle einstellen. Um den Editor für die Einstellung zu öffnen, klicken Sie auf das blaue Bearbeitungs-Icon der Variable.

![mceclip0.png](/img/3441178.png?width=80)

Achten Sie dabei auch darauf, die korrekte Dezimalpräzision der Gewichtungsvariable im Feld "Scale" einzutragen. 

![mceclip1.png](/img/3441184.png?width=633)