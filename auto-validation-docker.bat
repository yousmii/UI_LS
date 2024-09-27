@ECHO OFF
REM This script needs to be placed in the directory you want to check adn run from that directory!
REM The working directory (= script directory) will be used as 'baseDir'.
REM So configuring 'baseDir' by settings-file or cli-argument will be ignored !!

setlocal

REM Set script and working directories
set SCRIPT_DIR=%~dp0
set WORKING_DIR=%cd%
set MOUNT_DIR=

REM Initialize VERSION variable and read from 'version.txt' file
set VERSION=

for /f "tokens=*" %%a in (.\_autovalidation\version.txt) do (
    set VERSION=%%a
)

REM Read cli-arguments
set "IMAGE_ARGS=%*"
set baseDir=
set projectName=
REM Loop through arguments
:loop
if @%1==@ goto done
if "%~1"=="--baseDir" (
	if not "%~2:~0,2%"=="--" (
		set baseDir=%~2
	)
)
if "%~1"=="--projectName" (
	if not "%~2:~0,2%"=="--" (
		set projectName=%~2
	)
)
shift
goto loop
:done
REM Determine the MOUNT_DIR
if not "%baseDir%"=="" ( set MOUNT_DIR=%baseDir%) else ( set MOUNT_DIR=%WORKING_DIR%)
REM Append projectName to IMAGE_ARGS if not provided
if "%projectName%"=="" ( 
    for %%A in ("%WORKING_DIR%") do set "IMAGE_ARGS=--projectName %%~nxA %*"
)


::echo Running auto-validation v%VERSION%
::echo Wait...

REM Set paths and image names
set LOCALDOCKERARCHIVE_PATH=%SCRIPT_DIR%\_autovalidation\auto-validator_dockerimage.tar
set DOCKER_LOCALIMAGE_NAME=auto-validator:%VERSION%
set DOCKER_HUBIMAGE_NAME=kennethdekeulenaerkdg/kdg-ti-ui1_auto-validator:%VERSION%

set IMAGE_NAME=

REM Check if image is already locally loaded
echo Check if local-image exists locally...
::pause
docker image inspect %DOCKER_LOCALIMAGE_NAME% >NUL 2>NUL
if %errorlevel%==0 (
    set IMAGE_NAME=%DOCKER_LOCALIMAGE_NAME%
    goto runImage
)
echo Check if hub-image exists locally...
::pause
docker image inspect %DOCKER_HUBIMAGE_NAME% >NUL 2>NUL
if %errorlevel%==0 (
    set IMAGE_NAME=%DOCKER_HUBIMAGE_NAME%
    goto runImage
)

REM Load image from local archive or pull from Docker Hub
if exist "%LOCALDOCKERARCHIVE_PATH%" (
	echo Load image from local docker archive file...
    ::pause
	docker load -i "%LOCALDOCKERARCHIVE_PATH%"
    set IMAGE_NAME=%DOCKER_LOCALIMAGE_NAME%
) else (
	echo Pull image from docker hub...
    ::pause
	docker pull %DOCKER_HUBIMAGE_NAME%
    set IMAGE_NAME=%DOCKER_HUBIMAGE_NAME%
)

REM Run the image
:runImage
echo Run new container from image...
::pause
::docker run --rm --network host --mount type=bind,src="%MOUNT_DIR%",dst="/auto-val-temp/project" %IMAGE_NAME% %IMAGE_ARGS%
docker run --rm --mount type=bind,src="%MOUNT_DIR%",dst="/auto-val-temp/project" %IMAGE_NAME% %IMAGE_ARGS%


REM info: to run image interactive terminal/shell, 'ENTRYPOINT' in Dockerfile needs to be removed!!
::docker run --rm -it --mount type=bind,src="%MOUNT_DIR%",dst="/auto-val-temp/project" %IMAGE_NAME% sh
