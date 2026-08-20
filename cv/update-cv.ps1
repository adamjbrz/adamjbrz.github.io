# Recompile the CV; the single output copy lives at ..\files\AdamBrzezinskiCV.pdf (served by the website).
# Usage:  .\update-cv.ps1   (from the cv/ folder)
# Then commit and push the repo — GitHub Pages redeploys and the site serves the new CV.

Set-Location $PSScriptRoot

# Compile under a temporary jobname so an open PDF viewer can't block the build.
pdflatex -interaction=nonstopmode -jobname=cv_build cv.tex | Out-Null
pdflatex -interaction=nonstopmode -jobname=cv_build cv.tex | Out-Null

if (-not (Test-Path "cv_build.pdf")) {
    Write-Host "Compilation failed - check cv_build.log" -ForegroundColor Red
    exit 1
}

Copy-Item "cv_build.pdf" "..\files\AdamBrzezinskiCV.pdf" -Force
Remove-Item cv_build.pdf, cv_build.aux, cv_build.log, cv_build.out -Force -ErrorAction SilentlyContinue
Write-Host "CV updated at files\AdamBrzezinskiCV.pdf. Now commit and push to publish."
