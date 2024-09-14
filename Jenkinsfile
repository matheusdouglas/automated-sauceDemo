pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                script {
                    bat 'docker-compose up -d' // Subir os containers em background
                    bat 'docker-compose exec -T playwright npx playwright test' // Executar os testes
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
