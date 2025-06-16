---
title: "SQL-Berechnungen"
description: "DataLion documentation"
author: "Benedikt Koehler"
lastEditor: "Mario Bacher"

breadcrumbs: ["Helpcenter","Übersicht","Daten & Codebook"]
---

# SQL-Berechnungen

Über SQL-Befehle können Berechnungen sowohl über das Codebook als auch über die Textfelder (Quellcode) durchgeführt werden. Eine ausführliche Anleitung zu SQL finden Sie hier: [https://www.w3schools.com/sql/sql\_ref\_keywords.asp](https://www.w3schools.com/sql/sql_ref_keywords.asp)

KPIs, wie z.B. der Net Promoter Score (NPS-Score), können automatisiert berechnet werden.

## Beispiele:

Folgende Befehle werden in DataLion häufig verwendet:

**Summe:**   {{=SUM(Variable)}}

**Summe mit Bedingung:**   {{=SUM(CASE WHEN Variable = Wert THEN Summenvariable ELSE 0 END)}}

**Runden:**  {{=ROUND(Variable, Nachkommastellen)}}

**Zählen:**  {{=COUNT(Variable)}}

**Zählen distinkter Werte:**   {{=COUNT(DISTINCT Variable)}}

**Division:**    {{=ROUND(SUM(MarkeA)/COUNT(MarkeA),2)}}

**Prozentualer Anteil der Werte = "1 oder 2" an den Werten = "1 oder 2 oder 3 oder 4" der Variable var\_item:**    {{= (SUM(CASE WHEN var\_item IN (1,2) THEN 1 ELSE NULL END)/SUM(CASE WHEN var\_item IN (1,2,3,4) THEN 1 ELSE NULL END))\*100}}

**Mittelwert:** {{= AVG(var\_item)}}

**Mittelwert definierter Werte einer Variable:** {{= (SUM(CASE WHEN var\_item IN (1,2,3,4) THEN var\_item ELSE NULL END)/COUNT(CASE WHEN var\_item IN (1,2,3,4) THEN 1 ELSE NULL END))}}

## SQL-Berechnungen vs. SQL-Filter

In DataLion ist es nicht nur möglich, mit SQL-Berechnungen beliebige Formeln zu evaluieren, sondern auch Filter können mit SQL-Syntax definiert werden. Zur Unterscheidung zu **SQL-Formeln**, die mit {{= ... }} definiert werden, werden **SQL-Filter** mit {{ ... }} definiert. 

So kann zum Beispiel ein ODER-Filter wie folgt definiert werden:

`{{ (VARIABLE_1 = "Ja" OR VARIABLE_2 = "Ja") }}`
Oder ein Filter, der alle Ausprägungen 1, 2, 3 einer Variable zählt:

`{{ VARIABLE IN (1,2,3) }}`
Wenn man ein Chart visualisiert, das einen SQL-Filter enthält, dann kann man dieses ganz normal als absolute Werte, Prozentwerte etc. anzeigen.
