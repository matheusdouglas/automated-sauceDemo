pipeline {
   agent { docker { image 'mcr.microsoft.com/playwright:v1.47.0-noble' } }
   stages {
      stage('e2e-tests') {
         steps {
            bat 'npm ci'
            bat 'npx playwright test'
         }
      }
   }
}
