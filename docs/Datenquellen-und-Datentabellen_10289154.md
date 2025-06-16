---
title: "Datenquellen-und-Datentabellen_10289154"
description: "DataLion documentation"
---

Helpcenter : Datenquellen und Datentabellen  

1.  [Helpcenter](index.html)
2.  [Übersicht](2982609.html)
3.  [Daten & Codebook](3440667.html)

# Helpcenter : Datenquellen und Datentabellen

Created by Carolin Schwab, last modified by Mario Bacher on Aug. 27, 2024

Daten werden in DataLion über das Projekt-Backend in Datenquellen hochgeladen.  
Sobald eine Datenquelle mit Daten befüllt wird, wird in der Datenbank eine zugehörige Datentabelle erstellt.

Die Datentabelle erhält denselben Namen wie die Datenquelle.

Beim Umbenennen einer Datenquelle wird auch die dazugehörige Datentabelle umbenannt.

Das Umbenennen einer Datentabelle in der Datenbank führt allerdings nicht zu einer Umbenennung der entsprechenden Datenquelle (Änderungen direkt in der Datenbank sind nur durch DataLion möglich; d.h. dieser Fall ist für User i.d.R. nicht relevant).

Die Daten in einer existierenden Datentabelle (die jedoch nicht als Datenquelle vorhanden ist) können durch den User angezeigt werden, indem eine neue Datenquelle angelegt wird und der Name (bzw. Suffix) der Datentabelle eingegeben wird. Danach hat die Datenquelle Zugriff auf die zugehörige Datentabelle.  
Diese Funktionalität kann im Zusammenhang mit dem [Zero-Downtime-Update](10256398.html) relevant sein (Wiederherstellen alter Daten).