@echo off
chcp 65001

@SET param=%1
@IF [%param%]==[] GOTO:Exit


SET basedir=W:\www\coursera-angular\examples\
SET basepath=lecture
SET examplePath=%basepath%%param%\

cd %basedir%
cd %examplePath%

echo "Lanzando Browser-Sync en %examplePath%. Ctrl+C para abortar..." 
browser-sync start --server --directory --files "**/*"


:Exit
@echo "Parámetro integer no puede ser vacío"
pause
