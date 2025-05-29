#!/bin/bash
cd /home/kavia/workspace/code-generation/easyeventregister-25139-16c2b569/easy_event_register
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

