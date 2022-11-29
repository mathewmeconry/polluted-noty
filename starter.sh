#!/bin/bash
echo "password" > /tmp/password
initdb -U noty -D /tmp/data -A password --pwfile /tmp/password 
pg_ctl -D /tmp/data -l logfile start

export PGPASSWORD=password
psql -U noty noty -c "create database noty;"

node dist/index.js