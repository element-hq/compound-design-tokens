@rem
@rem Copyright 2015 the original author or authors.
@rem
@rem Licensed under the Apache License, Version 2.0 (the "License");
@rem you may not use this file except in compliance with the License.
@rem You may obtain a copy of the License at
@rem
@rem      https://www.apache.org/licenses/LICENSE-2.0
@rem
@rem Unless required by applicable law or agreed to in writing, software
@rem distributed under the License is distributed on an "AS IS" BASIS,
@rem WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@rem See the License for the specific language governing permissions and
@rem limitations under the License.
@rem
@rem SPDX-License-Identifier: Apache-2.0
@rem

@if "%DEBUG%"=="" @echo off
@rem ##########################################################################
@rem
@rem  svg2xml startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%"=="" set DIRNAME=.
@rem This is normally unused
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Resolve any "." and ".." in APP_HOME to make it shorter.
for %%i in ("%APP_HOME%") do set APP_HOME=%%~fi

@rem Add default JVM options here. You can also use JAVA_OPTS and SVG2XML_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS=

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if %ERRORLEVEL% equ 0 goto execute

echo. 1>&2
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH. 1>&2
echo. 1>&2
echo Please set the JAVA_HOME variable in your environment to match the 1>&2
echo location of your Java installation. 1>&2

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto execute

echo. 1>&2
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME% 1>&2
echo. 1>&2
echo Please set the JAVA_HOME variable in your environment to match the 1>&2
echo location of your Java installation. 1>&2

goto fail

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\svg2xml-1.0.1.jar;%APP_HOME%\lib\sdk-common-31.13.0.jar;%APP_HOME%\lib\kotlin-reflect-2.2.0.jar;%APP_HOME%\lib\sdklib-31.13.0.jar;%APP_HOME%\lib\repository-31.13.0.jar;%APP_HOME%\lib\shared-31.13.0.jar;%APP_HOME%\lib\ddmlib-31.13.0.jar;%APP_HOME%\lib\layoutlib-api-31.13.0.jar;%APP_HOME%\lib\dvlib-31.13.0.jar;%APP_HOME%\lib\common-31.13.0.jar;%APP_HOME%\lib\kotlin-stdlib-jdk8-2.2.0.jar;%APP_HOME%\lib\kotlin-stdlib-jdk7-2.2.0.jar;%APP_HOME%\lib\kotlinx-coroutines-core-jvm-1.9.0.jar;%APP_HOME%\lib\kotlin-stdlib-2.2.20.jar;%APP_HOME%\lib\annotations-23.0.0.jar;%APP_HOME%\lib\aapt2-proto-8.13.0-13719691.jar;%APP_HOME%\lib\gson-2.11.0.jar;%APP_HOME%\lib\jimfs-1.1.jar;%APP_HOME%\lib\guava-33.3.1-jre.jar;%APP_HOME%\lib\protos-31.13.0.jar;%APP_HOME%\lib\protobuf-java-3.25.5.jar;%APP_HOME%\lib\javax.inject-1.jar;%APP_HOME%\lib\kxml2-2.3.0.jar;%APP_HOME%\lib\commons-compress-1.21.jar;%APP_HOME%\lib\bcpkix-jdk18on-1.79.jar;%APP_HOME%\lib\bcutil-jdk18on-1.79.jar;%APP_HOME%\lib\bcprov-jdk18on-1.79.jar;%APP_HOME%\lib\jaxb-runtime-2.3.2.jar;%APP_HOME%\lib\annotations-31.13.0.jar;%APP_HOME%\lib\jna-platform-5.6.0.jar;%APP_HOME%\lib\httpmime-4.5.6.jar;%APP_HOME%\lib\httpclient-4.5.6.jar;%APP_HOME%\lib\httpcore-4.4.16.jar;%APP_HOME%\lib\error_prone_annotations-2.28.0.jar;%APP_HOME%\lib\failureaccess-1.0.2.jar;%APP_HOME%\lib\listenablefuture-9999.0-empty-to-avoid-conflict-with-guava.jar;%APP_HOME%\lib\jsr305-3.0.2.jar;%APP_HOME%\lib\checker-qual-3.43.0.jar;%APP_HOME%\lib\j2objc-annotations-3.0.0.jar;%APP_HOME%\lib\stax-ex-1.8.1.jar;%APP_HOME%\lib\jakarta.xml.bind-api-2.3.2.jar;%APP_HOME%\lib\txw2-2.3.2.jar;%APP_HOME%\lib\istack-commons-runtime-3.0.8.jar;%APP_HOME%\lib\FastInfoset-1.2.16.jar;%APP_HOME%\lib\jakarta.activation-api-1.2.1.jar;%APP_HOME%\lib\jna-5.6.0.jar;%APP_HOME%\lib\javax.activation-1.2.0.jar;%APP_HOME%\lib\commons-logging-1.2.jar;%APP_HOME%\lib\commons-codec-1.10.jar


@rem Execute svg2xml
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %SVG2XML_OPTS%  -classpath "%CLASSPATH%" io.element.compound.svg2xml.MainKt %*

:end
@rem End local scope for the variables with windows NT shell
if %ERRORLEVEL% equ 0 goto mainEnd

:fail
rem Set variable SVG2XML_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
set EXIT_CODE=%ERRORLEVEL%
if %EXIT_CODE% equ 0 set EXIT_CODE=1
if not ""=="%SVG2XML_EXIT_CONSOLE%" exit %EXIT_CODE%
exit /b %EXIT_CODE%

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
