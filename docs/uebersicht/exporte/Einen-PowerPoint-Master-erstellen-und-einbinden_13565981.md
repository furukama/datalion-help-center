---
title: "Einen-PowerPoint-Master-erstellen-und-einbinden_13565981"
description: "DataLion documentation"
---

Helpcenter : Einen PowerPoint Master erstellen und einbinden  

1.  [Helpcenter](index.html)
2.  [Übersicht](2982609.html)
3.  [Exporte](Exporte_13467672.html)

# Helpcenter : Einen PowerPoint Master erstellen und einbinden

Created by Mario Bacher, last modified on Sept. 17, 2024

DataLion bietet einen Export zu volleditierbaren PPTX-Präsentationen. Hierfür wird ein PPTX-Master im eigenen Layout und Design hinterlegt, in den die Charts Ihrer Dashboards exportiert werden. 

Beispiel mögliches Ergebnis: 

![image-20240402-095056.png](/img/13566148.png?width=760)![image-20240402-095148.png](/img/13566154.png?width=760)

DataLion hat einen Folien Master als Standard für den Export hinterlegt. Soweit Sie keinen anderen Master hinterlegen, wird dieser für die Exporte gentuzt. Sie können diesen [hier](https://datalion.atlassian.net/wiki/external/NzVmMjJhMDg4MTFhNDZmNWJlZGM2OGIyNDZkNjY2OWY) herunterladen und als Vorlage für Ihren individualisierten PowerPoint Master nutzen.

# **Vorgehensweise**

## **Master vorbereiten**

Erstellen Sie eine neue PowerPoint Präsentation und entfernen Sie alle Folien in der Normalansicht. Bei Benutzung unserer Vorlage ist dieser Schritt nicht notwendig.

![image-20240402-100828.png](/img/13566161.png?width=760)

Wechseln Sie über den Reiter “Ansicht” auf die Folienmaster-Ansicht. Der DataLion Folienmaster enthält hier bereits ein Layout für die Titel-Seite Ihres Exports und das Layout für die einzelnen Folien, die je eines Ihrer Charts enthalten werden.

![image-20240402-101117.png](/img/13566168.png?width=760)

## **Master anpassen**

**Achtung!** Speichern Sie die Datei am Ende mit **geschlossener Masteransicht**!

In der Standard-Version wird ein Chart pro Slide exportiert; der Aufbau ist wie folgt:

![image-20240402-101220.png](/img/13467706.png?width=760)

In die Textplatzhalter können verschiedene Elemente wie der Report-Titel, der Dashboard-Titel, der Chart-Titel, die Chart-Beschreibung oder der Chart-Footer eingelesen werden. Die Charts werden in den Diagramm-Platzhalter eingefügt.

Sie können das Layout frei wählen und bspw. Ihr Logo ergänzen, den Hintergrund an Ihr corporate design anpassen und das Farbschema für den Export bestimmen.

![image-20240402-114509.png](/img/13566188.png?width=760)

*\[Hinweis: Alle Einstellungen, die Sie hier vornehmen, wirken sich auf den grundlegenden PowerPoint-Export und die Erstellung der Präsentation aus. Einstellungen wie das Farbschema, welches Ihre Charts im Export verwenden ergeben sich aus den Einstellungen Ihres PowerPoint-Masters, nicht aus den Einstellungen des Dashboards.*

*Sie können nach dem Export alle gewöhnlichen PowerPoint Funktionen nutzen, um die Präsentation zu bearbeiten und die exportierten Charts anzuordnen und zu gestalten.\]*

Um mehrere Charts bei Ihrem Export standardmäßig auf einem Slide zu platzieren, können Sie hier auch weitere Diagrammplatzhalter und Textplatzhalter hinzufügen. Unter “Start” und “Anordnen” können Sie den Auswahlbereich öffnen.

![image-20240402-115529.png](/img/13533266.png?width=253)

Hier finden Sie die IDs Ihrer Platzhalter, mit denen Sie den Feldern im nächsten Schritt Ihre Funktion zuordnen können.

![image-20240402-115645.png](/img/13467730.png?width=234)

**Wichtiger Hinweis!** Wenn Ihr Master fertig konfiguriert ist, **schließen Sie die Masteransicht und speichern Sie die Datei in diesem Zustand.** Ist die Masteransicht beim Speichern noch geöffnet, so kann dies beim Export zu Problemen führen!

## **Master in DataLion einbinden**  

Um Ihren vorbereiteten PPTX-Master einzubinden navigieren Sie zum Projekt-Backend.

Unter "Einstellungen" finden Sie die PowerPoint Export Option. Laden Sie hier Ihren Folien Master hoch und klicken Sie dann zunächst auf Speichern am Ende der Seite.

![image-20240402-121124.png](/img/13467741.png?width=380)

## **Master in DataLion konfigurieren**

Wählen Sie *Configure* um den Platzhaltern Ihres Masters die jeweiligen Funktionen zuzuordnen.

![image-20240402-121156.png](/img/13566206.png?width=380)

Wählen Sie zunächst unter *Slide* die zu verwendende Seite aus dem PPTX-Master aus. Es kann z.B. eine Seite mit nur einem Diagrammplatzhalter oder auch mit mehreren Diagrammplatzhaltern sein. 

![image-20240402-121351.png](/img/13566213.png?width=380)

Es können dann ein oder mehrere Platzhalter für den **Header Content** (wie z.B. "Tabname")  definiert werden. Wählen Sie den gewünschten Ausgabeinhalt und weißen Sie den gewünschten Platzhalter aus Ihrem PPTX-Master zu.

Pro Diagrammplatzhalter auf einem Slide können die Platzhalter für den Chartheader (**Title**) , die Fußzeile (**Legend**) und die Beschreibung in den Charts (**Description** \- typischerweise die Frage) definiert werden. Dafür werden die gewünschten Platzhalter aus der Master-Datei der jeweiligen Funktion zugewiesen.

![image-20240402-121619.png](/img/13533278.png?width=397)

**Header Content**

Im oberen Bereich können Sie definieren, welcher Inhalt als **Header** auf der Folie verwendet werden soll.

Wenn "Automatisch" ausgewählt ist, dann übernimmt der Header die Optionen in der folgende Reihenfolge (je nachdem, welche Optionen vorhanden sind):

-   Dashboard-Titel
    
-   Dashboard-Untertitel
    
-   Tab Name
    
-   Report Name
    
-   Projekt Name
    

![image-20240402-122122.png](/img/13467778.png?width=507)

Mit Hilfe des Buttons *Add Header* können weitere Header hinzugefügt werden, um Inhalte dem Export hinzuzufügen (z.B. "Untertitel" aus dem Dashboard).

 *\[Hinweise: Beachten Sie, dass es sich hierbei um Funktionen handelt, die sich für jeden PowerPoint Slide wiederholen. Sollten Sie nur für manche Charts eine Description wünschen, bietet es sich an hierfür separate Slides zu erstellen oder diese nach dem Export in der PowerPoint direkt einzufügen.\]*

## **Export**  

Sie können Ihre Charts nun in Ihren PPTX-Master exportieren, indem Sie im Frontend das Download-Symbol wählen ![image-20240516-110331.png](/img/32997381.png) und hier entweder unter Dashboard oder Report PPTX anklicken.

![image-20240402-125102.png](/img/13566240.png?width=336)

## Export-Einstellungen ändern für einzelne Dashboards

Sie haben auch die Möglichkeit für jedes Dashboard zu bestimmen, welche Slide Ihres PPTX-Masters verwendet werden soll und damit wie viele Charts eines Dashboards auf einer Folie Ihrer PowerPoint Präsentation exportiert werden soll. Ihr PPTX-Master muss hierfür Slides mit mehreren Platzhaltern beinhalten und diese im Backend konfiguriert sein.

Sie können dann in den Reporteinstellungen (Zahnrad-Symbol, oben links im Frontend) bei jedem Dashboard unter *PPTX Export slide layout* den jeweiligen Slide auswählen. Speichern Sie die Einstellungen am Ende der Seite.

![image-20240402-150236.png](/img/13926415.png?width=760)

## **Weitere Einstellungen**

Mit Hilfe des JSON-Codes in den PowerPoint Export Einstellungen im Backend können Sie zudem noch weitere spezifische Einstellungen vornehmen. Fügen Sie hierzu einfach den gewünschten Befehl in den Code ein. Hierzu ein paar Beispiele:

-   Gitternetzlinien ausblenden → `"grid":false`
    
-   Achsen ausblenden → `"valueAxis":false`
    
-   Zahlen Format ändern `"format":"xx"` ("p" = % ohne Nachkommastelle; "pd" = % mit Nachkommastelle; "d" = Zahl mit NK; "pn" = Zahl ohne NK)
    
-   Start-Slide einfügen → `"slide_title": 0`
    
-   End-Slide einfügen → `"slide_closing": 0` (Anstelle der "0" die Jeweilige Slide ID einfügen; 0 = Slide ID der Titelseite des DataLion Masters)
    
-   Schriftgröße:  
    Die **Schriftgröße** kann in der PPTX-Exportkonfiguration mit dem Parameter `font_size` und `font_size_fixed`definiert werden.
    
    Der Parameter `font_size` definiert dabei die Basisschriftgröße für den Export. Gleichzeitig wird diese Basisschriftgröße pro Diagramm automatisch skaliert (kleiner gemacht), wenn es viele Optionen in einer Fragen gibt. Sie können diese automatische Skalierung mit dem Parameter `"font_size_fixed": true` ausschalten. 
    
    Die Einstellungen für die feste Schriftgröße 20 (ohne automatische Skalierung in Abhängigkeit der Eigenschaften des Diagramms) wären also: `"font_size": 20, "font_size_fixed": true`.
    
    Für die Tabellen gibt es eine separate Einstellung `"font_size_table":`, die genauso wie `font_size` funktioniert. So können Sie für alle Diagramme und für die Tabellen separat eine Schriftgröße einstellen.
    

Nach dem Export können Sie alle PowerPoint-Funktionen nutzen, um Ihre Präsentation zu bearbeiten und die einzelnen Charts ggf. anzupassen.