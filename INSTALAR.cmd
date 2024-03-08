mkdir .\tools

call curl -L https://github.com/microsoft/winget-cli/releases/download/v1.7.10582/Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle -o .\tools\winget.msixbundle
.\tools\winget.msixbundle

call winget install --id Git.Git -e --source winget

call git -v

@REM call curl -L https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe -o .\tools\nvm.exe
@REM .\tools\nvm.exe

@REM @echo off
@REM set NVM_HOME=C:\Users\%USERNAME%\AppData\Roaming\nvm
@REM set NVM_SYMLINK=C:\Program Files\nodejs
@REM setx /M NVM_HOME "%NVM_HOME%"
@REM setx /M NVM_SYMLINK "%NVM_SYMLINK%"

@REM echo PATH=%PATH% > %NVM_HOME%\PATH.txt

@REM for /f "skip=2 tokens=2,*" %%A in ('reg query "HKLM\System\CurrentControlSet\Control\Session Manager\Environment" /v Path 2^>nul') do (
@REM   setx /M PATH "%%B;%%NVM_HOME%%;%%NVM_SYMLINK%%"
@REM )

@REM if exist "%SYSTEMDRIVE%\Program Files (x86)\" (
@REM set SYS_ARCH=64
@REM ) else (
@REM set SYS_ARCH=32
@REM )
@REM (echo root: %NVM_HOME% && echo path: %NVM_SYMLINK% && echo arch: %SYS_ARCH% && echo proxy: none) > %NVM_HOME%\settings.txt

@REM @echo on
