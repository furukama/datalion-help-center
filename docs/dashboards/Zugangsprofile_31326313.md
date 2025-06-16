---
title: "Zugangsprofile"
description: "DataLion documentation"
author: "Mario Bacher"
lastEditor: "Carolin Schwab"

breadcrumbs: ["Helpcenter","Übersicht","Einstellungen in DataLion"]
---

# Zugangsprofile

### **Was sind Zugangsprofile?**

Zugangsprofile in DataLion ermöglichen es, dass der Nutzungsumfang der Dashboards für einzelne Nutzer oder Nutzergruppen individuell angepasst bzw. beschränkt werden kann. Beispielsweise kann die Sichtbarkeit von Datenbeständen zugangsprofildefiniert festgelegt werden. Zugangsprofile werden auf Projektebene definiert und können einem oder mehreren Nutzern zugewiesen werden. 

### **Wie erstellt man ein Zugangsprofil?**

Zugangsprofile werden im Projekt-Backend erstellt und bearbeitet. Das Projekt-Backend wird über die rechte Navigation erreicht (“Projekt”). 

![image-20240514-123458.png](/img/31522817.png)

Im Tab "Zugangsprofile" können individuelle Zugangsprofile erstellt werden, die bestimmten Nutzern zugewiesen werden. 

![image-20240514-123525.png](/img/31260789.png)

Über den Button „new“ kann ein neues Zugangsprofil erstellt werden. In dem sich nun öffnenden Fenster können die Eigenschaften des Zugangsprofils definiert werden. 

### **Was bedeuten die einzelnen Felder?**

**Beschreibung**

In dem Feld „Beschreibung“ wird dem Zugangsprofil ein aussagekräftiger Name gegeben, damit dieses später eindeutig zugeordnet werden kann. 

![image-20240514-122521.png](/img/31260758.png)

**Projekt exportieren**

Wenn der Haken bei "**Projekt exportieren**" gesetzt ist, haben Nutzer mit diesem Zugangsprofil die Möglichkeit das Projekt über ihr Usermenü auf der rechten Seite zu exportieren.

Im Feld "**Selective export**" kann die Erlaubnis des Exportierens auf einzelne Tabs beschränkt werden.

Wenn **Export with notification** angehakt ist, werden die Datentabellen nicht sofort heruntergeladen, sondern der User bekommt eine Email mit Downloadlink an seine in DataLion hinterlegte E-Mailadresse. Besonders bei großen Datentabellen empfiehlt sich ein Export mit Benachrichtigung.   

![image-20240514-122558.png](/img/31260765.png)

**Filter deaktivieren**

„Filter deaktivieren“ blendet alle Filter (z. B. Drop-Down-Filter) auf den Dashboards für den Nutzer aus.

![mceclip2.png](/img/31326356.png)

**Lesemodus**

Der Lese-Modus blendet zusätzlich die Fragen-Navigation auf der linken Seite des Dashboards aus. Diese Einstellung kann über das Drop-Down-Feld (Navigation konfigurieren) noch weiter spezifiziert werden.

**Eigene Zielgruppen konfigurieren**

Über „Eigene Zielgruppen konfigurieren“ kann Nutzern dieses Zugangsprofils die Möglichkeit gegeben werden, eigene Zielgruppen über den Zielgruppeneditor im Frontend zu konfigurieren bzw. diese Option zu deaktivieren.

![mceclip1.png](/img/31326362.png)

Dieser Button im Frontend ist gemeint:

![mceclip0.png](/img/31326350.png)

**Schaltflächen verbergen**

In dem Feld „Schaltflächen verbergen“ können Elemente aus dem Benutzermenü ausgeblendet werden, wie zum Beispiel das Feld „Meine Reports“, oder bestimmte Exportfunktionen.

![image-20240514-122633.png](/img/31260771.png)

**Kategorien ein-/ausschließen** 

Mit der Funktion „Kategorien ein-/ausschließen“ kann die Darstellung bestimmter Fragekategorien im linken Navigationsbereich und in den Dropdownmenüs aktiviert bzw. deaktiviert werden. Über die Lupe können einzelne Kategorien ausgewählt und schließlich ein- bzw. ausgeschlossen werden. 

![image-20240514-122707.png](/img/31359053.png)

**Filter**

"Filter" setzt einen globalen Filter für alle Benutzer mit diesem Zugangsprofil. Die Daten werden für das Zugangsprofil auf die ausgewählte Ausprägung heruntergefiltert. Über das Lupensymbol kann die gewünschte Filterkategorie ausgewählt werden. Um auf mit ODER verknüpfte Zielgruppen zu filtern, muss die Zielgruppe zunächst mit der ODER-Verknüpfung im Codebook angelegt werden und kann dann über die Lupe ausgewählt werden, z.B. `{{'Marke' A OR 'Marke B'}}`.

![](/img/31326379.png)

**Drop-down Filter**

Hier können Dropdownfilter für die Nutzer voreingestellt werden, die dann auf den Dashboards angezeigt werden. Hier ist die Eingabe des JSON nötig - diese können Sie durch die Nutzung des Filtereditors in einem Dashboards und das anschließende Öffnen des Felder “JSON” generieren, wenn Sie diesen nicht von Hand schreiben wollen.

![image-20240514-122731.png](/img/31326334.png)

Im Feld **Drop-down filter(s)** wird die [Dropdowndefinition](https://datalion.atlassian.net/servicedesk/customer/portal/1/article/9240579) eingefügt. Es werden für das Zugangsprofil auf allen Dashboards die gleichen Dropdownmenüs angezeigt. 

Im Feld **Drop-down filter pagination**, kann eingestellt werden, ob oder unter welcher Bedingung die Dropdownmenüs eine Paginierung enthalten sollen. Mit Paginierung werden eine bestimmte Anzahl an Items auf einer Seite im Dropdownmenü dargestellt und es gibt eine Suchfunktion. Paginierung eignet sich für Dropdownmenüs mit einer großen Anzahl an Ausprägungen. 

![image-20240514-123017.png](/img/31227998.png)

Ergebnis, Dropdownmenü mit Paginierung im Frontend:

![mceclip4.png](/img/31326385.png)

**Angezeigte Elemente je Seite**

Wenn Pagination (s.o.) aktiviert ist, kann mit der Einstellung „Angezeigte Elemente je Seite“ definiert werden, wie viele Elemente, die zu dem DropDown Filter passen, auf jeder Seite im Dropdownmenü angezeigt werden.

![image-20240514-123045.png](/img/31326341.png)

**Standardwerte für Drop-down Filter**

Über die Einstellung „Standardwerte für Drop-down Filter“ kann ein Filterstandard festlegt werden. Detaillierte Informationen zu den DropDown Filtern finden Sie [hier.](https://datalion.atlassian.net/servicedesk/customer/portal/1/article/9240579)

![image-20240514-123059.png](/img/31260783.png)

**Excel-Report-Konfiguration**

Über die Zugangsprofile lassen sich auch Excel Reports für die Nutzer konfigurieren. Dazu fügen Sie ihren Code in das Feld „Excel-Report-Konfiguration“ ein.

**Ein Beispiel:**

``
[`{"title": " Mein Report ", "ignore_empty_rows": true, "ignore_empty_columns": true, "hide_value_labels": true, "totals":[{"value":"n","label":"Total"}`], "filter": [], "columns": [`{"variable_id": 1}`,  `{"variable_id": 3, "label": "Länder ","filters": []}`],   "rows":  [  `{"variable_id": 3, "label": "Länder ","filters": []}`], "values": [`{"value": "columnPercent", "label": "%","format": "0%"}`]  }]
``
![image-20240514-123124.png](/img/31359064.png)

**Excel-Report-Caching**

Das Aktivieren des Excel-Report-Caching beschleunigt den Excel Report für die Nutzer, da dann ein Excel Report auf dem Server bereitgehalten wird, welcher automatisch aktualisiert wird.

![mceclip10.png](/img/31326391.png)

**Platzhalter**

Im Feld „Platzhalter“ können Platzhalter für den Report aktiviert werden. Mit dem Feld „Filter-Voreinstellung für Reports“ können Voreinstellungen gespeichert werden.

![image-20240514-123256.png](/img/31293569.png)

**Reports mit allen Benutzern in diesem Zugangsprofil teilen**

Des Weiteren können Sie bestimmen, ob die Reports mit allen Benutzern in dem betreffenden Zugangsprofil geteilt werden sollen.

![image-20240514-123310.png](/img/31293577.png)

**API-Einstellungen**  

In den API-Einstellungen legen Sie die Parameter fest, die für eine Datenanbindung über unsere API Schnittstelle notwendig sind.

![mceclip13.png](/img/31326397.png)

Wenn Sie die gewünschten Einstellungen getätigt haben, können Sie das Zugangsprofil speichern und bestimmten Nutzern zuweisen.
