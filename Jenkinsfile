pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.47.0-noble'
            args '-u root' // Isso dá permissões de root no container
        }
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh '''
                   npm ci
                   npx playwright install
                   '''
            }
        }
        
        stage('Run Tests') {
            steps {
                sh '''
                   npx playwright test --list
                   npx playwright test
                   '''
            }
        }
    }
    
    post {
        always {
            cleanWs() // Limpa o workspace
        }
    }
}
