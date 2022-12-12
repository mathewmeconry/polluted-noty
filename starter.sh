#!/bin/bash
echo "postgres" > /tmp/password
initdb -U postgres -D /tmp/data -A password --pwfile /tmp/password 
pg_ctl -D /tmp/data -l /tmp/logfile start

export PGPASSWORD=postgres
psql -U postgres postgres -c "create database noty;"

node dist/index.js