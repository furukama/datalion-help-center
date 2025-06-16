---
title: "Datenquellen und Datentabellen"
description: "DataLion documentation"
author: "Carolin Schwab"
lastEditor: "Mario Bacher"

breadcrumbs: ["Helpcenter","Übersicht","Daten & Codebook"]
---

# Datenquellen und Datentabellen

Daten werden in DataLion über das Projekt-Backend in Datenquellen hochgeladen.  
Sobald eine Datenquelle mit Daten befüllt wird, wird in der Datenbank eine zugehörige Datentabelle erstellt.

Die Datentabelle erhält denselben Namen wie die Datenquelle.

Beim Umbenennen einer Datenquelle wird auch die dazugehörige Datentabelle umbenannt.

Das Umbenennen einer Datentabelle in der Datenbank führt allerdings nicht zu einer Umbenennung der entsprechenden Datenquelle (Änderungen direkt in der Datenbank sind nur durch DataLion möglich; d.h. dieser Fall ist für User i.d.R. nicht relevant).

Die Daten in einer existierenden Datentabelle (die jedoch nicht als Datenquelle vorhanden ist) können durch den User angezeigt werden, indem eine neue Datenquelle angelegt wird und der Name (bzw. Suffix) der Datentabelle eingegeben wird. Danach hat die Datenquelle Zugriff auf die zugehörige Datentabelle.  
Diese Funktionalität kann im Zusammenhang mit dem [Zero-Downtime-Update](10256398.html) relevant sein (Wiederherstellen alter Daten).
