# Adventskalender

Ein Adventskalender für den Unterricht: 24 Türchen, Schnee, Musik und Animationen.

Die Inhalte der Türchen sind mit einem Passwort verschlüsselt (AES-256-GCM, Schlüssel per PBKDF2).
In diesem Repository liegt nur die verschlüsselte Fassung.

## Neu bauen

1. `build/names.example.json` nach `build/names.json` kopieren und anpassen (wird nicht eingecheckt).
2. `ADVENT_PW='dein Passwort' node build/build.js`
3. Die erzeugte `index.html` committen.

Die Musik wird im Browser erzeugt (gemeinfreie Melodien), es werden keine fremden Dateien oder Schriften geladen.
