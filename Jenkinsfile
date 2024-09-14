pipeline {
    agent any
    stages {
        stage('Build and Test') {
            steps {
                script {
                    bat 'npm install'
            
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
            cleanWs()
        }
    }
}
