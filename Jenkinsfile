pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                script {
                    bat 'npm install'
                    bat 'docker-compose up -d' // Subir os containers em background
                }
            }
        }

        stage('Publish Report') {
            steps {
                script {
                    bat 'docker-compose exec playwright npx playwright show-report' // Executa o comando para mostrar o relatório
                }
                publishHTML(target: [
                    reportName: 'Playwright Test Report',
                    reportDir: 'playwright-report',  // Diretório onde o relatório foi salvo
                    reportFiles: 'index.html',
                    alwaysLinkToLastBuild: true,
                    keepAll: false
                ])
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
