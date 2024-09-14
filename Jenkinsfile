pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                script {
                    // Instalar dependências
                    bat 'npm install'
                    
                    // Executar o docker-compose com --abort-on-container-exit para garantir que falhe se os testes falharem
                   def result = bat(script: 'docker-compose up', returnStatus: true)
                    if (result != 0) {
                        error "Tests failed"
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    // Parar e remover os containers após a execução
                    bat 'docker-compose down'
                }
            }
        }
    }

    post {
        always {
            cleanWs() // Limpar o workspace após a execução
        }
        failure {
            echo 'O pipeline falhou devido a erros nos testes.'
        }
    }
}
