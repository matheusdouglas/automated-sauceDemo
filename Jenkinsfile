pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Verifica o código do repositório
                git 'https://github.com/your-repo-url.git'
            }
        }

        stage('Build and Test') {
            steps {
                // Executa os testes usando Docker Compose
                script {
                    // Certifique-se de que o Docker e o Docker Compose estão instalados
                    sh 'docker-compose up --build --abort-on-container-exit'
                }
            }
        }
    }

    post {
        always {
            // Executado após todas as etapas, independentemente do resultado
            echo 'Pipeline finalizada.'
            // Opcional: Adicione limpeza ou ações pós-teste aqui
        }

        success {
            // Executado se o pipeline for bem-sucedido
            echo 'Pipeline concluída com sucesso.'
        }

        failure {
            // Executado se o pipeline falhar
            echo 'Pipeline falhou.'
        }
    }
}
