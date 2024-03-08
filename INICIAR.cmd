call nvm -v
call nvm install 20.11.0
call nvm use 20.11.0

set "NODE_PATH=C:\Users\%USERNAME%\AppData\Roaming\nvm\v20.11.0"
set "PATH=%NODE_PATH%\;%NVM_HOME%\v%NODE_VERSION%\node_modules\npm\bin;%PATH%"


call npm i
call npm start