#! /bin/bash
set -e
./scripts/run_test.sh head.js ./app_tests_data/headInput ./app_tests_data/Headoutput 
mocha --reporter min
