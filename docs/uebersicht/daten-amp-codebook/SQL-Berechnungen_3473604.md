---
title: "SQL-Berechnungen_3473604"
description: "DataLion documentation"
---

Helpcenter : SQL-Berechnungen  

1.  [Helpcenter](index.html)
2.  [Übersicht](2982609.html)
3.  [Daten & Codebook](3440667.html)

# Helpcenter : SQL-Berechnungen

Created by Benedikt Koehler, last modified by Mario Bacher on Apr. 09, 2024

Über SQL-Befehle können Berechnungen sowohl über das Codebook als auch über die Textfelder (Quellcode) durchgeführt werden. Eine ausführliche Anleitung zu SQL finden Sie hier: [https://www.w3schools.com/sql/sql\_ref\_keywords.asp](https://www.w3schools.com/sql/sql_ref_keywords.asp)

KPIs, wie z.B. der Net Promoter Score (NPS-Score), können automatisiert berechnet werden.

## Beispiele:

Folgende Befehle werden in DataLion häufig verwendet:

Summe:   `{{=SUM(Variable)}}`

Summe mit Bedingung:   `{{=SUM(CASE WHEN Variable = Wert THEN Summenvariable ELSE 0 END)}}`

Runden:  `{{=ROUND(Variable, Nachkommastellen)}}`

Zählen:  `{{=COUNT(Variable)}}`

Zählen distinkter Werte:   `{{=COUNT(DISTINCT Variable)}}`

Division:    `{{=ROUND(SUM(MarkeA)/COUNT(MarkeA),2)}}`

Prozentualer Anteil der Werte = "1 oder 2" an den Werten = "1 oder 2 oder 3 oder 4" der Variable var_item:    `{{= (SUM(CASE WHEN var_item IN (1,2) THEN 1 ELSE NULL END)/SUM(CASE WHEN var_item IN (1,2,3,4) THEN 1 ELSE NULL END))*100}}`

Mittelwert: `{{= AVG(var_item)}}`

Mittelwert definierter Werte einer Variable: `{{= (SUM(CASE WHEN var_item IN (1,2,3,4) THEN var_item ELSE NULL END)/COUNT(CASE WHEN var_item IN (1,2,3,4) THEN 1 ELSE NULL END))}}`

## SQL-Berechnungen vs. SQL-Filter

In DataLion ist es nicht nur möglich, mit SQL-Berechnungen beliebige Formeln zu evaluieren, sondern auch Filter können mit SQL-Syntax definiert werden. Zur Unterscheidung zu SQL-Formeln, die mit `{{= ... }}` definiert werden, werden SQL-Filter mit `{{ ... }}` definiert. 

So kann zum Beispiel ein ODER-Filter wie folgt definiert werden:

```java
{{ (VARIABLE_1 = "Ja" OR VARIABLE_2 = "Ja") }}
```

Oder ein Filter, der alle Ausprägungen 1, 2, 3 einer Variable zählt:

```java
{{ VARIABLE IN (1,2,3) }}
```

Wenn man ein Chart visualisiert, das einen SQL-Filter enthält, dann kann man dieses ganz normal als absolute Werte, Prozentwerte etc. anzeigen.