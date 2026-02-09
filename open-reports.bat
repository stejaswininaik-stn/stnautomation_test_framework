@echo off
REM Open Playwright HTML Report
echo Opening Playwright HTML Report...
npx playwright show-report

REM Open Allure Report (serves the report locally)
echo Opening Allure Report...
npx allure open allure-results

REM Pause to keep the window open
pause