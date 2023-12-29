#!/usr/bin/env bash
#
SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
rsync -m --progress "$SCRIPTPATH/../out/inject.js" "deck@steamdeck:/home/deck/Documents/Fightcade/fc2-electron/resources/app/inject/"
