#!/bin/bash
username="jguerra"
echo rsync -e ssh -avhu -r w209.py static/ templates/ $username@ischool.berkeley.edu:w209/
rsync -e ssh -avhu -r w209.py static/ templates/ $username@ischool.berkeley.edu:w209/