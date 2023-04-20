# C&R Webseite – First Steps

[OG PDF Version](https://munkelb1.pages.coco.study/cocoinfo/Portfolio-Webseite_FirstSteps.pdf)

1. **GitHub-Account erstellen** (wenn ihr noch keinen habt)
    - Erstellt euch unter github.com einen Account – vermutlich benötigt ihr früher oder später sowieso einen, falls ihr mal beruflich codet.

2. **Hinterlegt euren Public SSH Key**
    - Annahme: ihr habt bereits einen bestehenden Key fürs Studium – den nehmen wir auch für GitHub, wie folgt:
      [docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

3. **[GitHub-Page erstellen](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site )**
    - Hinweis: kein Theme zur Page hinzufügen

4. **Repository clonen per SSH**
    - Bewegt euch per Terminal in einen Ordner, in dem ihr euer Repository ablegen wollt
    - Schreibt ins Terminal
    - git clone <<kopierter Inhalt von GitHub (siehe Screenshot)>>

![Screenshot of github.com showing the clone dialog](github-screenshot.jpg)

5. **Repository lokal in Visual Studio Code öffnen**

6. **Einfache index.html erstellen**

      Zum Beispiel:
```html
<html>
  <head>
    <title>Welcome!</title>
  </head>
<body>
  <div>
    Hello, World!
  </div>
</body>
</html>
```
7. **index.html pushen** -> du bist online!
