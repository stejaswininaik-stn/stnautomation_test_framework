This is a test automation framework built with playwright and typescript, implementing page object model design pattern with allure reporting and CI/CD integration using GitHub Actions.

 Prerequisites
- Node.js: v18.0.0 or higher
- npm: Latest version
- chrome: Latest version

# Installation

# clone the repository
- git clone <repository-url>
- cd automation_framework

Install dependencies
npm install

Build typescript files
npm run build

Test Execution

Local Execution (with UI)

Sanity tests
npm run sanity-test

Regression tests
npm run regression-test

Pipeline Execution (headless)

Sanity tests for CI/CD
npm run sanity-pipeline

Regression tests for CI/CD
npm run regression-pipeline

Allure Reporting

Generate comprehensive HTML report
npm run allure:generate

Open report in browser
npm run allure:open
