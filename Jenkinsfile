pipeline {
    agent any
    stages {
        stage('Build and Test') {
            steps {
                script {
                    bat 'npm install'
                    
                    // Executar docker-compose e aguardar até que os testes sejam concluídos
                    def testResult = bat(returnStatus: true, script: 'docker-compose up --abort-on-container-exit')
                    
                    // Verifica o código de saída e falha a pipeline se for diferente de 0
                    if (testResult != 0) {
                        error "Testes falharam! Código de saída: ${testResult}"
                    }
                }
            }
        }
        stage('Cleanup') {
            steps {
                script {
                    bat 'docker-compose down'
                }
            }
        }
        stage('Copy Results') {
            steps {
                script {
                    // Obter o ID do container do Playwright
                    def containerId = bat(returnStdout: true, script: 'docker ps -q -f name=teste-e2e-playwright').trim()
                    
                    // Verificar se o container foi encontrado
                    if (containerId) {
                        // Copiar os resultados do volume para o workspace do Jenkins
                        bat "docker cp ${containerId}:/app/allure-results ${WORKSPACE}/allure-results"
                    } else {
                        error "Container do Playwright não encontrado."
                    }
                }
            }
        }
    }
    post {
        always {
            // Gerar relatórios do Allure
            allure includeProperties: false, results: [[path: 'allure-results']]
        }
    }
}
