pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.47.0-noble'
            args '-v /var/jenkins_home/workspace/playwright-jenkins:/workspace -w /workspace'
        }
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh '''
                   npm install
                   npm i -D @playwright/test
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
            // Passos a serem executados após o término do pipeline
            cleanWs() // Limpa o workspace
        }
    }
}
