---
title: "Das Codebook - Teil 2"
description: "DataLion documentation"
author: "Benedikt Koehler"
lastEditor: "Carolin Schwab"

breadcrumbs: ["Helpcenter","Übersicht","Daten & Codebook"]
---

# Das Codebook - Teil 2

Das Codebook ist eine Metadatei, die die Standardeinstellungen eines Projektes festlegt und den Datensatz mit DataLion verknüpft.

Dadurch können einfach und schnell Daten visualisiert werden. Die Standardeinstellungen können auch flexibel über den Adminbereich des Dashboards geändert werden.

**Standardeinstellungen:**

-   Navigationsstruktur (Mehrere Variablen können z.B. thematisch gebündelt werden, dient der Übersichtlichkeit)
    
-   Zusammenfassung von Variablen zu einem Chart
    
-   Beschriftungen (z.B. Fragetext und Ausprägungen)
    
-   Auswahl des Charttyps
    

**Aufbau des Codebuchs:** 

![Bildschirmfoto_2020-04-14_um_14.20.48.png](/img/3407900.png)

Wenn öfter Codebücher neu angelegt werden, ist es sinnvoll immer mit der gleichen Anordnung der Spalten zu arbeiten.

In [Teil 1](https://datalion.zendesk.com/hc/de/articles/360013604880-Das-Codebuch-Teil-1) finden Sie eine Übersicht zu allen Spalten.

**Wie können Mehrfachantworten in einem Chart dargestellt werden?**

Im Codebook kann man Mehrfachantworten (Variablen mit „0/1“ Kodierung) zu einem Chart bündeln. Das funktioniert über die Spalte „Fragen-ID“. Variablen, die die gleiche Fragen-ID enthalten, werden zu einem Chart gebündelt.

Beispiel (vorher):

![mceclip1.png](/img/3407906.png)

Beispiel (gebündelt):

![mceclip2.png](/img/3407912.png)

**Wie können gestapelte Säulendiagramme in einem Chart dargestellt werden?**

Im Codebook können auch mehrere gestapelte Säulendiagramme in einem Chart dargestellt werden. Dazu wird der Charttyp „multistack“ verwendet und nacheinander jedes Merkmal angelegt. Die Zuordnung zu einem Chart funktioniert über die Spalte „Fragen-ID“. Merkmale, die die gleiche Fragen-ID enthalten, werden zu einem Chart gebündelt.

Beispiel:

![mceclip3.png](/img/3407918.png)

**Wie kann ich Variablen rekodieren bzw. berechnen?**

Im Codebook kann man auch neue Variablen bilden, indem man bestehende Variablen im Datenset für neue Ausprägungen oder eine Berechnung nutzt (Befehlssprache: SQL).

Eine Befehlssammlung finden Sie hier: [https://www.sibilla-egen-schule.de/schule/sch-service/anleit/Befehlssammlung\_SQL.pdf](https://www.sibilla-egen-schule.de/schule/sch-service/anleit/Befehlssammlung_SQL.pdf)

**Recodierung:**

Recode bedeutet, dass man durch die Formulierung von Bedingungen, die auf einer bestehenden Variablen basieren, eine neue Variable bildet. Recodes können als Filter verwendet werden.

Berechnung bedeutet, dass aus einer bestehenden Variable eine neue Variable berechnet wird. Berechnete Variablen können nicht als Filter verwendet werden.

Grundlage für Recodes: Damit Recodes auch als Filter benutzt werden können, müssen sie immer mit folgenden Klammern {{( vor der Bedingung und )}} nach der Bedingung formuliert werden.

**Beispiele für Recodes:**

Beispiel 1: Bildung von Top2-Boxes

![mceclip4.png](/img/3407924.png)

Bedingung der Top2-Box ist, dass die Werte 1 und 2 der Variable f5, in diesem Fall die Top2 der Variable, zusammengezählt werden.

Formel: {{(f5='1' OR f5='2')}}

Beispiel 2: Bildung von Altersgruppen

![mceclip5.png](/img/3407930.png)

Vorliegend wurde das Alter in der Variable f6 numerisch erfasst. Um nun Altersgruppen zu bilden, werden Bedingungen wie bspw. ‚alle Befragten die 18 und älter und jünger als 36 sind‘ formuliert.

Formel: {{(f6>= 18 AND f6<= 35)}}

Beispiel 3: Definition Nutzer/ Nicht-Nutzer

Die Variablen f1, f2 und f3 haben 6 Ausprägungen.

Wenn ein Befragter bei mindestens einer der drei Variablen(OR) Ausprägung 1, 2 oder 3(AND) ausgewählt hat, gilt er als Nutzer.

Formel Nutzer (einzutragen in Werte-Feld):

`{{( (f1>=1 AND f1<=3) OR (f2>=1 AND f2<=3) OR (f3>=1 AND f3<=3) )}}`
Folglich zählen die Befragten, die bei allen Variablen f1, f2 und f3(AND) ausschließlich Ausprägungen 4, 5 oder 6(AND) ausgewählt haben oder die Fragen gar nicht (Wert: -99(OR)) beantwortet haben zu den Nicht-Nutzern.  
Formel Nicht-Nutzer (einzutragen in Werte-Feld):

`{{( (f1>=4 AND f1<=6 OR f1=-99) AND (f2>=6 AND f2<=6 OR f2=-99) AND (f3>=4 AND f3<=6 OR f3=-99) )}}`
Beispiel 4: Zählen wenn

Enthält eine Variable genre Labels wie bspw. Drama, kann die Häufigkeit des Genres Drama über folgende Formel (einzutragen im Werte-Feld) ausgezählt werden:

`{{(genre LIKE '%Drama%')}}`
**Berechnungen**

**Grundlagen für Berechnungen:**

-   Keine Leerzeichen vor/nach Berechnungsanweisungen wie beispielsweise SUM machen
    
-   Da berechnete Variablen nicht als Filter verwendet werden können, genügen die Klammern {{ vor und }} nach der Berechnungsanweisung
    
-   Wenn man den Charttyp b-bar angibt, muss hinter den geschweiften Klammern ein Gleichheitszeichen sein `{{= }}
-   Wenn man den Charttyp calculation angibt, wird das Gleichheitszeichen nicht benötigt `{{ }}
Beispiel 1: Berechnung  NPS-Score

![mceclip6.png](/img/3407936.png)

Beispiel 2: Berechnung einer Total-Variable

Mit folgender Formel (einzutragen im Werte-Feld) kann man eine Total Variable berechnen, also eine Variable, in welcher alle im Datensatz vorkommenden Fälle gezählt werden:

`{{= COUNT(*)}}`
Beispiel 3: Prozentuierung auf einer anderen Basis

Mit folgender Formel (einzutragen im Werte-Feld) kann man die Ausprägung 1 einer Variable f1 auf einer anderen Basis, hier auf Basis aller Werte, die in der Variable total  Ausprägung 1 sind, prozentuieren:

`{{=(100*(SUM(f1 IN (1)))/(SUM(total IN (1))))}}`
Beispiel 4: Mittelwert ohne Einberechnung fehlender Werte

Wenn eine Variable f1 fehlende Werte (definiert als bspw. -77) enthält, wird bei der Berechnung des Mittelwerts die -77 berücksichtigt, weshalb ein unsinniger Wert ausgegeben wird. Mit folgender Formel (einzutragen im Werte-Feld) wird der Mittelwert der Variable f1 ohne die fehlenden Werte berechnet:

`{{=SUM(CASE WHEN f1= "-77" THEN f1 ELSE 0 END) / SUM(f1= "-77")}}`
Beispiel 5: Berechnung der Veränderung des Absatzes absolut (12M, letzte 12 Monate)

Mit folgender Formel (einzutragen im Werte-Feld) kann man die Veränderung des Absatzes absolut berechnen:

```sql
SUM(CASE WHEN periode `>` (SELECT DATE_SUB(MAX(periode), INTERVAL 12 month) FROM dashboard_data_table_10) THEN absatz ELSE 0 end) - SUM(CASE WHEN periode `>` (SELECT DATE_SUB(MAX(periode), INTERVAL 24 month) FROM dashboard_data_table_10) AND periode `<` (SELECT DATE_SUB(MAX(periode), INTERVAL 12 month) FROM dashboard_data_table_10) THEN absatz ELSE 0 end)
```
Beispiel 6: Berechnung der Veränderung des Absatzes in % (12M, letzte 12 Monate)

Mit folgender Formel (einzutragen im Werte-Feld) kann man die Veränderung des Absatzes in Prozent berechnen:

```sql
100 * (SUM(CASE WHEN periode `>` (SELECT DATE_SUB(MAX(periode), INTERVAL 12 month) FROM dashboard_data_table_10) THEN absatz ELSE 0 end) - SUM(CASE WHEN periode `>` (SELECT DATE_SUB(MAX(periode), INTERVAL 24 month) FROM dashboard_data_table_10) AND periode `<` (SELECT DATE_SUB(MAX(periode), INTERVAL 12 month) FROM dashboard_data_table_10) THEN absatz ELSE 0 end)) / SUM(CASE WHEN periode `>` (SELECT DATE_SUB(MAX(periode), INTERVAL 12 month) FROM dashboard_data_table_10) THEN absatz ELSE 0 end)
```
**Wie kann ich nicht numerische Variablen einlesen?**

Im Codebook kann man auch „Labels“ anlegen, wenn die Variablen nicht numerisch hinterlegt sind.

Beispiel: Datensatz mit „Labels“

![mceclip7.png](/img/3407942.png)

**Sonderspalten – Sortierung von Ausprägungen**

Im Codebook kann auch die Reihenfolge der Ausprägungen festgelegt werden.

Definiert man die Reihenfolge nicht, ordnet DataLion die Ausprägungen nacheinander nach der Zeilen-ID an. Die Sortierung kann durch eine neue Spalte z.b. benannt als „display\_order“ oder “numerisch” festgelegt werden.

**Spalte „display\_order“**

1,2,3,4,…: Sortierung fortlaufend nach der angegebenen Nummerierung

In den Charteinstellungen kann man die Sortierungsreihenfolge ändern (z.B. aufsteigend oder absteigend sortieren). Wenn man eine Ausprägung in der Sortierung festlegen möchte, z.B. „Sonstiges“ immer ans Ende stellen, wird dies durch eine zusätzliche Spalte ermöglicht.

**Spalte „sort\_prio“:**

1: sortiert eine Ausprägung nicht bzw. setzt diese immer an letzter Stelle

0: alle anderen Ausprägungen, die sortierbar bleiben sollen

Beispiel 1: Spalte „Numerisch“

![mceclip8.png](/img/3407948.png)

Beispiel 2: Spalte „Sortierungsreihenfolge“

![mceclip9.png](/img/3407954.png)

Beim Hochladen des Codebooks müssen die neuen Spalten mit der Spalte „display\_order“ beziehungsweise „Sorting priority“ verknüpft werden.

**Sonderspalten – Konfiguration des Navigationsmenüs**

Im Codebook kann auch das Navigationsmenü festgelegt werden, d.h. welche Variablen ein- und ausgeblendet werden sollen (auf der Frage/Measure- und Filterebene).

Spalte „position\_id“

![mceclip10.png](/img/3407960.png)

**Sonderspalten – Farbschema**

Im Codebook kann auch pro Frage/Measure ein individuelles Farbschema konfiguriert werden.

Spalte „Einstellungen“

![mceclip11.png](/img/3407966.png)
