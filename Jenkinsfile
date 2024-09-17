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
    }
    post {
        always {
            // Limpar workspace e gerar relatórios do Allure
            cleanWs()
            allure includeProperties: false, results: [[path: 'app/allure-results']]
        }
    }
}
