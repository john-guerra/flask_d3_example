## Deploying the demo (Berkeley servers)

Running this demo on Berkely servers requires special setup as you don't have permissions for changing the configuration files on the server. For this try to follow these steps.

On the ischool Berkeley server the demo will be running behind Apache, which has a particular configuration.

Steps

1. Make sure your account has been enabled for running Flask. If that is the case, you would have a w209 folder in your home one, e.g. /home/jguerra/w209. Try going to: http://people.ischool.berkeley.edu/~jguerra/w209 replacing jguerra with your ischool user name. If that doesn't work contact ask Kevin Heard with an email at the account **help** on the  **ischool.berkeley.edu**
2. Using a tool that supports SFTP copy the following files to the Berkeley server into the your w209 folder e.g. /home/jguerra/w209:
  ```
  w209.py
  templates/*
  static/*
  ```
If you are on a mac you can use the [update.sh](update.sh) script provided. Make sure that is executable `chmod +x update.sh`, and edit it fit your username and then just run it. It will ask for your password
```bash
./update.sh
```

3. Force a reload of the Apache server by running (on the Berkeley server)
```
cd ~/w209
touch start.wsgi
```
4. Try your app in http://people.ischool.berkeley.edu/~jguerra/w209 replacing jguerra with your username
5. If something fails, check de development console for JS errors, or for backend errors look into the /var/log/httpd/people_error_log file
```
tail -f /var/log/httpd/people_error_log
```
This file will contain the errors for everybody, so make sure that you are looking for you username
