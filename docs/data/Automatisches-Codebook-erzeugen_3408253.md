---
title: "Automatisches Codebook erzeugen"
description: "DataLion documentation"
author: "Mario Bacher"


breadcrumbs: ["Helpcenter","Übersicht","Daten & Codebook"]
---

# Automatisches Codebook erzeugen

Mithilfe eines strukturierten und gelabelten Datensatzes lässt sich das Codebook automatisch generieren

Vorteile:

-   Schnellere Ergebnisse
    
-   Kein manuelles generieren eines Codebooks notwendig
    
-   Codebook wird automatisch in korrekter Form generiert und kann anschließend leichter bearbeitet werden
    

Beispiel für einen gelabelten Datensatz\_

![mceclip2.png](/img/3408270.png)

Unter Backend `>`> Daten `>`> Datenupload können Sie Ihren Datensatz wie gewohnt hochladen. Sie müssen nur das Häckchen bei "Create Codebook after Import" setzen (beim ersten Upload ist das die Standardeinstellung). So wird das Codebook automatisch erzeugt und ist direkt im Backend hochgeladen:

![Backendimport.png](/img/4063246.png)

Bitte beachten Sie, wenn Sie diese Option bei einem späteren Upload Ihrer Daten erneut wählen, ersetzt dies Ihr bestehendes Codebook. Es bietet sich an zuvor das Codebook zu exportieren.

Sie können mit den Variablen wie gewohnt arbeiten, beispielsweise als Filter verwenden und Charttypen ändern:

![mceclip4.png](/img/3408282.png)

Falls Sie das Codebook im Nachgang noch bearbeiten möchten, können Sie dieses exportieren, bearbeiten und das bestehenden Codebook ersetzen.

Wir empfehlen auch hier zuerst eine Kopie des Codebooks zu generieren und Änderungen an dieser vorzunehmen, um Ihr Projekt ggf. auf den Ausgangszustand zurücksetzen zu können.

Bitte beachten Sie: Wenn DataLion ein Codebook auf der Grundlage des csv-Datensatzes erstellt, wird der Codebookeintrag für jede Variable/Spalte in Abhängigkeit vom Inhalt der Spalte erstellt. Es wird entweder ein Codebookeintrag für numerische Werte (numerische Variable) oder ein Codebookeintrag für Variablen mit Labels (Character-Variable) erstellt.

Character-Variable: Jeder eindeutige Wert der Variable wird im Codebook aufgeführt.

![Codebook_charvar.png](/img/4063252.png)

Numerische Variable: Für diese Variable wird nur eine Zeile im Codebook erstellt, die den Befehl `<num>` enthält. Der Befehl `<num>` ruft die einzelnen Zahlen aus der Datenbank ab.

![codebook1.png](/img/4063258.png)

Es kann vorkommen, dass DataLion den Variablentyp nicht wie gewünscht interpretiert. Zum Beispiel wird eine Spalte mit Jahreszahlen (2018, 2919, 2020...) als numerische Variable interpretiert, da sie nur Zahlen enthält. Sie möchten aber wahrscheinlich keinen numerischen Wert für diese Variable ausgeben, sondern jedes einzelne Jahr als individuelle Ausprägung abbilden. In diesem Fall können Sie das Codebook exportieren, die gewünschten Anpassungen (hier: die im Datensatz vorhandenen Jahre als einzelne Ausprägungen erfassen) vornehmen und das Codebook wieder importieren. 

Codebook-Variable mit  `<num>` Befehl:

![codebook1.png](/img/4063258.png)

Output im DataLion Frontend:

![chart1.png](/img/4063275.png)

Codebook-Variable mit Ausprägungen:

![codebook2.png](/img/4063281.png)

Output im DataLion Frontend:

![chart2.png](/img/4063287.png)
