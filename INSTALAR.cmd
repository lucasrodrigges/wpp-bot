mkdir .\tools

@REM call curl -L https://github.com/microsoft/winget-cli/releases/download/v1.7.10582/Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle -o .\tools\winget.msixbundle
@REM .\tools\winget.msixbundle

@REM call winget install --id Git.Git -e --source winget

call curl -L https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe -o .\tools\nvm.exe
.\tools\nvm.exe

@echo off
set NVM_HOME=C:\Users\%USERNAME%\AppData\Roaming\nvm
set NVM_SYMLINK=C:\Program Files\nodejs
setx /M NVM_HOME "%NVM_HOME%"
setx /M NVM_SYMLINK "%NVM_SYMLINK%"

echo PATH=%PATH% > %NVM_HOME%\PATH.txt

for /f "skip=2 tokens=2,*" %%A in ('reg query "HKLM\System\CurrentControlSet\Control\Session Manager\Environment" /v Path 2^>nul') do (
  setx /M PATH "%%B;%%NVM_HOME%%;%%NVM_SYMLINK%%"
)

if exist "%SYSTEMDRIVE%\Program Files (x86)\" (
set SYS_ARCH=64
) else (
set SYS_ARCH=32
)
(echo root: %NVM_HOME% && echo path: %NVM_SYMLINK% && echo arch: %SYS_ARCH% && echo proxy: none) > %NVM_HOME%\settings.txt

@echo on
