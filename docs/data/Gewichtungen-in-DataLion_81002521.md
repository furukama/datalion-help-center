---
title: "Gewichtungen in DataLion"
description: "DataLion documentation"
author: "Mario Bacher"
lastEditor: "Carolin Schwab"

breadcrumbs: ["Helpcenter","Übersicht","Einstellungen in DataLion"]
---

# Gewichtungen in DataLion

In DataLion können ein oder mehrere Gewichtsvariablen definiert werden. Im Frontend kann für jedes Chart ausgewählt werden, ob und mit welchem Gewicht die Daten gewichtet werden sollen (Zahnrad → Gewichte).

# **Projekteinstellungen - Gewichte**

Die Einstellungen für Gewichte können im Projekt-Backend unter **Einstellungen → Gewichte** vorgenommen werden. Gewichte können direkt aus dem hochgeladenen Datensatz verwendet werden (A) oder aus einer separaten Gewichtstabelle angespielt werden (B). Fortgeschrittene Option: Gewichte können bei Bedarf in DataLion berechnet werden (C).

![image-20240916-074801.png](/img/83197958.png)

## **A - Gewichte in einem DataLion Projekt verwenden**

**(1) Gewichte/Weights**: Gewichtungsvariable eintragen (Bezeichnung der Variable im Datensatz). Bei mehreren Gewichtungsvariablen kommagetrennt eingeben (Achtung! Ohne Leerzeichen trennen).  
Es ist auch möglich, Formeln zur Berechnung der Gewichte zu verwenden (Beispiel: Gewicht1\*2\*Variable | multipliziert Gewichtungsvariable Gewicht1 mit 2 und einer weiteren Variable).

**(2) Legende für Gewichte/Weight legend**: Eingeben, wie die Variable(n) im Frontend für die User bezeichnet sein sollen (_Beispiel: `["Gewicht1","Gewicht2-id","Gewicht2-id&monat"]`_)

**(3) Gewichte zur Basis/Weights to base**: Optional Basis eingeben zu der die Gewichte berechnet werden sollen. 

**(9) Auswahl der Gewichte/Weight selection**: Angeben, ob die Gewichtungsvariablen für die User im Frontend sichtbar sein sollen 

## **B - Gewichtungsvariable aus einer separaten Tabelle verwenden**

In DataLion können Gewichte auch aus einer separaten Tabelle verwendet werden. Diese Gewichtungstabelle kann als eine eigene Datasource (Projektbackend `>` Data Sources)  in das Projekt hochgeladen werden. Die Software kann über Joins auf die Gewichtung zugreifen.  Dafür werden folgende Angaben benötigt:

**(4) Eigene Tabelle für Gewichte/Seperate weights table**: 'Yes' um Gewichte aus einer separaten Tabelle zu verwenden

**(5) Gewichtstabellen-Schlüssel/Weights table keys**: Name der Key-Variable zum Verknüpfen der Gewichtungstabelle mit dem Datensatz, typischerweise eine eindeutige ID.

-   Über eine Variable matchen: Geben Sie den Variablennamen ein (_Beispiel: id | es wird über die Variable id gematched_)
    
-   Über mehrere Variablen matchen: Geben Sie die Variablennamen kommagetrennt (ohne Leerzeichen!) ein (_Beispiel: id,monat | es wird über die Variablen id UND monat gematched_)
    
-   Wollen Sie mehrere Gewichte definieren und sollen diese über verschiedene Variablen gematched werden, so trennen Sie die verschiedenen Variablen(kombinationen) durch einen “:” (_Beispiel: id:id,monat | die erste Gewichtsvariable wird über die Variable id gematched; die zweite Gewichtsvariable wird über die Variablen id UND monat gematched_)
    

**(6) Gewichtstabellen-Suffix/Weights table suffix**: Suffix, das der Gewichtungstabelle beim Datenimport über den Reiter "Data Sources" vergeben wurde.

##    
**C - Gewichte aus einer separaten Tabelle** **erstellen lassen [fortgeschritten]**

Bei Verwendung einer Gewichtungstabelle können optional Gewichte auch auf Basis eines Scripts durch DataLion berechnet werden.

**Vorgehen:** 

1.  Schritt: Im Feld **(7) Gewichtungsskript-Konfiguration/Weights script configuration** den Code für die Berechnung eingeben (Beispiel siehe unten)
    
2.  Schritt: Auf **(8) Gewichte aktualisieren/update weights** klicken
    
3.  Schritt: Auf **save** klicken
    

Der Code im Eingabefeld **Gewichtungsskript-Konfiguration** erzeugt Gewichte, sodass Zellen die gleiche Verteilung haben wie in der Vorgabe.

**Beispiel**: Der untenstehende Code erstellt Gewichte, so dass die Verteilung der beiden Ausprägungen "0" und "1" der Variable "Q1" 60 % zu 40 % ist:

``
`{"label": "Update weights", "type": "cell", "targets": {"Q1": {"0": 0.6, "1": 0.4}}, "weight_column": "weight", "id_column": "id"}
``
1.  **GewichtungsskriptParameter:** 
    

**"label"**: "Update weights"  
**"type"**: "Cell": Berechnet die Gewichte auf Basis der Zellen  
**"targets"**: Zielvariable auf Basis derer die Gewichte berechnet werden sollen und Gewichtungsvorgabe in diesem Format: `{"Variable": {"Auprägung1": Anteil, "Ausprägung2": Anteil}}  
**"weight\_column"**: Name der Gewichtungsvariable der Gewichtungstabelle  
**"id\_column"**: Spalte im Datensatz in dem eine eindeutige ID steht. Normalerweise ist das die Key Variable, welche die Gewichtungstabelle mit der Datentabelle verknüpft.
