pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                script {
                    bat 'docker-compose up -d' // Subir os containers em background
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
