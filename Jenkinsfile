pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                script {
                    // Instalar dependências
                    bat 'npm install'
                    
                    // Executar o docker-compose com --abort-on-container-exit para garantir que falhe se os testes falharem
                    bat 'docker-compose up --abort-on-container-exit --exit-code-from playwright-1'
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
