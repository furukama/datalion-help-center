---
title: "Das-Codebook---Teil-1_3440656"
description: "DataLion documentation"
---

Helpcenter : Das Codebook - Teil 1  

1.  [Helpcenter](index.html)
2.  [Übersicht](2982609.html)
3.  [Daten & Codebook](3440667.html)

# Helpcenter : Das Codebook - Teil 1

Created by Benedikt Koehler, last modified by Mario Bacher on Nov. 15, 2024

## **Was ist ein Codebook und warum benötige ich eines?**

Das Codebook enthält alle wichtigen Instruktionen und Kriterien, anhand derer die Daten mit DataLion verknüpft werden sollen. Es legt die Standardeinstellungen eines Projektes fest und dient im weiteren Sinne einer Handlungsanleitung.

Beispiele für Standardeinstellungen:

-   Navigationsstruktur (Mehrere Variablen können beispielsweise gebündelt werden um die Übersichtlichkeit zu erhöhen)
    
-   Zusammenfassung von Variablen in einem Chart
    
-   Variablen und Werte der Ausprägungen
    
-   Beschriftungen (z.B. Fragetext und Ausprägungen)
    
-   Standard-Charttypen
    

Mithilfe des Codebooks können Daten schnell und einfach visualisiert werden. Die Standardeinstellungen lassen sich jederzeit flexibel über den Administrationsbereichs des Dashboards verändern.

## **Aufbau des Codebooks**

![mceclip0.png](/img/3539032.png?width=760)

**Die folgenden Spalten sollten angelegt werden:** 

**Row\_ID**

Die Zeilen-ID wird fortlaufend nummeriert. Eine Zeilen-ID darf nicht doppelt vergeben werden. DataLion bezieht sich auf die Row-ID bei der Erstellung der Charts. Wird die Row-ID im Codebook verändert, müssen z.B. auch die Drop-Down-Filter angepasst werden.

**Question\_ID**

Auch die Fragen-ID wird fortlaufend nummeriert. Zeilen, die dieselbe Fragen-ID besitzen werden im Dashboard zusammengefasst. Dadurch werden mehrere Variablen und Ausprägungen zu einem Chart gebündelt und beispielsweise als ein gestapeltes Säulendiagramm dargestellt.

**WICHTIG:** Row-ID und Fragen-ID dürfen nicht doppelt vergeben werden 

**Variable**

Variablen bezeichnen bestimmte Eigenschaften bzw. Untergruppen (ggf. innerhalb einer Frage). Unter Variable wird festgelegt, auf welche Variable (Spalte) im Datensatz sich die jeweilige Zeile bezieht. Eine Variable kann mehre Ausprägungen umfassen.

**Value**

Über den Value werden die Ausprägungen angegeben. Mithilfe der Spalten *Variable* und *Label* können die Daten in DataLion schließlich verknüpft werden.

Bei nicht-numerischen Variablen, d.h. die Ausprägungen sollen als Text angezeigt werden, gibt es im Codebook zwei Arten, wie damit umgegangen werden kann

1.  Jede Ausprägung wird mit ihrem zugehörigen Wert (Value; Wert, der in den Daten steht) und der gewünschten Beschriftung (Label) angelegt. DataLion liest die spezifierten Werte aus den Daten und verarbeitet diese entsprechend
    
2.  Ausprägungen sollen direkt aus den Daten ausgelesen werden. In diesem Fall wird im Codebook der Value <label> verwendet. Der Wert <label> eignet sich insbesondere bei vielen Textausprägungen, wenn beispielsweise Markennamen abgefragt werden und sich diese Nennungen zwischen einzelnen Erhebungszeitpunkten unterscheiden. Die Werte können in diesem Fall nicht abweichend durch das Label benannt werden
    

![mceclip1.png](/img/3539038.png?width=760)

Zudem können über den Value im Codebook neue Variablen erstellt, d.h. rekodiert bzw. berechnet, werden, indem man durch die Befehlssprache SQL die bestehenden Variablen im Datensatz für neue Ausprägungen oder Berechnungen nutzt. Beispielsweise lassen sich hierdurch Altersgruppen bilden oder Scores berechnen.

![mceclip2.png](/img/3539044.png?width=760)

Eine Sammlung zu den SQL-Befehlen finden Sie [hier](SQL-Berechnungen_3473604.html).

**Beschreibung**

Diese Spalte dient der Beschriftung der Ausprägungen und des Fragetextes im Diagramm in DataLion. Die maximale Länge der Frage ist auf 255 Zeichen begrenzt.

**Kurzbeschreibung**

Diese Spalte gibt dem Diagramm einen Titel und erscheint in der Navigation.

**Typ**

Der Typ gibt an, ob es sich um eine Frage, Merkmal oder eine Ausprägung handelt. Das heißt auch jede Ausprägung setzt eine Frage voraus. Einfache Fragen umfassen eine Frage und Ausprägungen. Gestapelte Fragen enthalten alle drei Typen, d.h. Frage, Merkmale und Ausprägungen.

**Chart-Typ**

Der Charttyp definiert das Diagramm, in welchem die Daten dargestellt werden sollen. Weiß man vorab schon, in welcher Form die Ergebnisse visualisiert werden soll (z.B. Säulen- oder Tortendiagramm), kann hier schon der entsprechende Diagrammtyp ausgewählt werden. Der Charttyp kann jedoch auch immer über den Administratorenbereich im Nachgang verändert werden. [Hier](3473553.html) finden Sie eine Übersicht über die verfügbaren Charttypen zur Verfügung und geben Tipps, welcher Diagrammtyp sich für bestimmte Daten eignet.

**Level**

Die Ebene legt die Navigationsstruktur fest. Dabei ist es auch möglich mehrere Ebenen zu erstellen.

**Sonderspalten, die optional  angelegt werden können:**

Zudem besteht die Möglichkeit Sonderspalten im Codebook zu erstellen, die optional angelegt werden können.

***Spalte „Numerisch“ (Reihenfolge)*** Beispielsweise kann im Codebook auch die **Reihenfolge** der Ausprägungen festgelegt werden. Wird die Reihenfolge nicht definiert, ordnet DataLion die Ausprägungen nacheinander entsprechend der Zeilen-ID an. Die Sortierung wird durch die Spalte „numerisch“ festgelegt.

![mceclip3.png](/img/3539050.png?width=760)

-   Die Spalte „Numerisch“ ordnet die Ausprägungen fortlaufend nach der angegebenen Nummerierung (1,2, 3, …) an
    

***Spalte „Sortierungsreihenfolge“***

Daneben kann auch die Sortierungsreihenfolge in den Charteinstellungen (z.B. aufsteigend oder absteigend) verändert werden. Soll eine Ausprägung in der Sortierung immer ans Ende gestellt werden (z.B. „Sonstiges“), wird dies durch eine zusätzliche Spalte ermöglicht

-   Über die Spalte „Sortierungsreihenfolge“ wird mithilfe des Wertes „1“ eine Ausprägung nicht bzw. immer an letzter Stelle positioniert; der Wert „0“ wird für alle anderen Ausprägungen verwendet, die sortierbar bleiben
    

![mceclip4.png](/img/3539056.png?width=760)

**WICHTIG:** Beim Hochladen des Codebooks muss Spalte mit der Spalte „Variable Display“ verknüpft werden.

***Spalte „Position\_id“***

Im Codebook kann zudem auch das Navigationsmenü durch die Spalte „position\_id“ festgelegt werden, d.h. welche Variablen ein- und ausgeblendet werden.

![mceclip5.png](/img/3539062.png?width=760)

**WICHTIG:** Beim Hochladen des Codebooks müssen die neuen Spalten mit der Spalte „Variable Display“ verknüpft werden.

***Spalte „Settings“ (Farbschema)*** 

Im Codebook kann auch pro Frage/Measure ein individuelles Farbschema konfiguriert werden.

z.B.: {"colorscheme":{"scheme":\["#ffffff,#dddddd"\]}}

![mceclip6.png](/img/3539068.png?width=760)

**WICHTIG:** Beim Hochladen des Codebooks müssen die neuen Spalten mit der Spalte „Einstellungen“ verknüpft werden.

**Tipp:** DataLion kann nur Spalten visualisieren, die auch verknüpft wurden. Das sollte insbesondere bedacht werden, wenn Variablen unbenannt werden.

**Wie können Mehrfachantworten in einem Chart dargestellt werden?**

Im Codebook kann man Mehrfachantworten zu einem Chart bündeln. Das funktioniert über die Spalte *Question\_ID*. Variablen, die die gleiche Fragen-ID enthalten, werden zu einem Chart gebündelt.

Beispiel:

![mceclip7.png](/img/3539074.png?width=760)

**Wie können gestapelte Säulendiagramme in einem Chart dargestellt werden?**

Im Codebook können auch mehrere gestapelte Säulendiagramme in einem Chart dargestellt werden. Dazu wird der Charttyp „multistack“ verwendet und nacheinander jedes Merkmal angelegt. Die Zuordnung zu einem Chart funktioniert über die Spalte *Question\_ID*. Merkmale, die die gleiche Fragen-ID enthalten, werden zu einem Chart gebündelt.

Beispiel:

![mceclip8.png](/img/3539080.png?width=760)

**Codebook Import**

Das Codebook kann im Projektbackend > Codebook über das Feld **Upload Codebook** importiert werden. 

![mceclip1.png](/img/3539086?width=426)

Nachdem Sie Ihre Codebook-Datei ausgewählt und auf **speichern** geklickt haben, erscheint unten abgebildete Vorschau. Wählen Sie **Replace existing categories by imported categories** und ordnen Sie die Spalten Ihres Codebooks (Title) ihrer jeweiligen Funktion zu (Assignment).

Mit Klick auf **Check Codebook** prüft DataLion das Codebook auf formale Fehler, wie

-   doppelte Row-IDs
    
-   mehrere oder keine Zeilen mit Type = Frage innerhalb einer Question-ID
    
-   Verwendung von Variablen, die im Datensatz nicht existieren
    
-   unterschiedliche Levels innerhalb einer Question-ID
    

![mceclip2.png](/img/3539092?width=760)

[Hier](/wiki/pages/createpage.action?spaceKey=DC&title=Das%20Codebuch%20-%20Teil%202&linkCreation=true&fromPageId=3440656) geht es weiter mit Teil 2. In diesem Abschnitt zeigen wir Ihnen wie Sie Berechnungen und Recodieriungen durchführen.