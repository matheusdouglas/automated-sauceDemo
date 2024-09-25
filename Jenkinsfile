pipeline {
    agent any // Adiciona a seção agent para executar em qualquer nó disponível
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
    } // <- Removi o caractere '\' que estava incorreto e fechei a chave 'stages' corretamente
    post {
        always {
            // Gerar relatórios do Allure
            allure includeProperties: false, results: [[path: 'allure-results']]
        }
    }
}
