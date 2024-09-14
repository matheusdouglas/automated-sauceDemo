pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                script {
                    bat 'npm install'
                    bat 'docker-compose up' // Subir os containers em background
                    bat 'docker-compose exec playwright npx playwright show-report'
                    publishHTML(target: [
                    reportName: 'Playwright Test Report',
                    reportDir: 'playwright-report',  // Diretório onde o relatório foi salvo
                    reportFiles: 'index.html',
                    alwaysLinkToLastBuild: true,
                    keepAll: false
                ])
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    bat 'docker-compose down' // Parar e remover os containers
                }
            }
        }
    }

    post {
        always {
            cleanWs() // Limpar o workspace após a execução
        }
    }
}
