pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                script {
                    bat 'npm install'
                    // Subir os containers e rodar os testes do Playwright
                    bat 'docker-compose up' // Executa o docker-compose sem -d
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                script {
                    // Gera o relatório Allure dentro do container
                    bat 'docker-compose exec playwright bash -c "allure generate allure-results --clean -o allure-report"'
                }
            }
        }

        stage('Publish Allure Report') {
            steps {
                // Publica o relatório gerado pelo Allure no Jenkins
                allure includeProperties: false, reportBuildPolicy: 'ALWAYS', results: [[path: 'allure-results']]
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
