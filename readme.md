# VERSION: v7.0-beta

# Info
Deze doet een validatie van alle htm(l), css en js bestanden in de huidige directory en alle subdirectories.

# Prerequisites
Deze tool maakt gebruik van een docker-image. Docker moet dus geïnstalleerd op het systeem.
Zie: https://docs.docker.com/get-docker/


# Validatie uitvoeren

## Linux / Mac
OPGELET: mogelijks moet je eerst éénmalig het bestand 'auto-validation.sh' nog uitvoerrechten geven:
> chmod +x auto-validation.sh

Validatie uitvoeren:
> sh ./auto-validation-docker.sh

## Windows
Validatie uitvoeren:
> .\auto-validation-docker.bat

## Resultaat
Het resultaat komt in tekstbestanden met de naam 'validatie-*.txt'.
