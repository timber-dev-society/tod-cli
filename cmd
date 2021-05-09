#!/usr/bin/env bash

cli_help() {
  cli_name=${0##*/}
  echo "
$cli_name

Usage: $cli_name [command]
Commands:
  run       npm run command
  test      npm run test
  add       npm install new dependency
  add-dev   npm install dev dependency
  *         Help
"
  exit 1
}

[ ! -n "$1" ] && cli_help

case "$1" in
  install|d)
    docker-compose run --no-deps node yarn install
    ;;
  run|d)
    docker-compose run --no-deps node yarn run $2
    ;;
  test|d)
    docker-compose run --no-deps node yarn test
    ;;
  add|d)
    docker-compose run --no-deps node yarn add $2
    ;;
  add-dev|d)
    docker-compose run --no-deps node yarn add --save-dev $2
    ;;
  *)
    cli_help
    ;;
esac
