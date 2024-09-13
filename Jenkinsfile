pipeline {
    agent { docker { image 'mcr.microsoft.com/playwright:v1.47.0-noble' } }
    
    stages {
        stage('Checkout') {
            steps {
                // Faz o checkout do código-fonte do repositório
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Instala as dependências do projeto
                sh 'npm ci'
            }
        }
        
        stage('Run Tests') {
            steps {
                // Executa os testes do Playwright
                sh 'npx playwright test'
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
