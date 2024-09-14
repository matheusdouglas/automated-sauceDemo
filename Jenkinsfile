pipeline {
    agent any

    stages {
        stage('Build and Test') {
            steps {
                script {
                    bat 'npm install'
                    bat 'docker-compose up' // Subir os containers em background
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
