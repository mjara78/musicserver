#!/bin/bash

# CONFIGURATION
################################################################################

export NODE_ENV=production
export PORT=8085

APP="./server/bin/www"
LOGFILE="forever-`basename $0`.log"
OUTFILE="forever-`basename $0`.out"
ERRFILE="forever-`basename $0`.err"


## DISCOVER FOREVER EXE
if command -v forever >/dev/null 2>&1 ; then
  FOREVER_EXE="forever"
else
  FOREVER_EXE="./node_modules/.bin/forever"
fi

# ROUTINES
################################################################################

usage() {
  echo "Usage: `basename $0` {start|stop|restart|status|checkenv}" >&2;
}

start() {
  # check for NODE_ENV before launching (but launch anyway)
  if [[ -z "${NODE_ENV}" ]]; then
    echo -e "\n!WARNING! You probably want to set the NODE_ENV environment variable.\n"
  fi
  ${FOREVER_EXE} start -a -l ${LOGFILE} -o ${OUTFILE} -e ${ERRFILE} ${APP};
}

stop() {
	uid=$(forever list | grep `basename $0` | cut -c24-27)
	${FOREVER_EXE} stop ${uid};
}

status() { ${FOREVER_EXE} list; }

checkenv() {
  STATUS=0
  echo -e "\nChecking prerequisites.\n"

  # check for NODE_ENV
  if [[ ! -z "${NODE_ENV}" ]]; then
    echo -e "NODE_ENV: SET - ${NODE_ENV}\n"
  else
    echo -e "NODE_ENV: NOT SET\n"
    echo -e "!WARNING! You probably want to set the NODE_ENV environment variable.\n"
  fi

  # check for forever
  if command -v ${FOREVER_EXE} >/dev/null 2>&1; then
    echo -e " FOREVER: FOUND - ${FOREVER_EXE}\n"
  else
    echo " FOREVER: NOT FOUND - ${FOREVER_EXE}"
    echo -e "!WARNING! The forever executable could not be found. Is it in your PATH?\n"
    STATUS=5
  fi

  # report status
  if [ $STATUS -ne 0 ]; then
    echo -e "!WARNING! Required files or programs not found.\n          The application may not work properly.\n"
  else
    echo -e "Everything seems to check out OK.\n"
  fi
  exit $STATUS
}


# MAIN LOOP
################################################################################

if [[ -z "${1}" ]]; then
  usage
  exit 1
else
  case "$1" in
    start)
      start;
      ;;
    restart)
      stop; sleep 1; start;
      ;;
    stop)
      stop
      ;;
    status)
      status
      ;;
    checkenv)
      checkenv $1
      ;;
    *)
      usage
      exit 6
      ;;
  esac

  exit 0
fi

################################################################################
# (eof)

