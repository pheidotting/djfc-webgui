pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                cd web
                npm cache clear
                npm install
                zip -r gui *
            }
        }
    }
}