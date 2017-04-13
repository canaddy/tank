@echo off

echo 请输入要创建的工程名字
set /p s1=
::s1等待用户输入工程名字

cocos new %s1% -l js --no-native

pause
@echo on
