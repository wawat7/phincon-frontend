pipeline {
  agent any

  parameters {
    string(name: "BACKEND_BASE_URL", defaultValue: "", description: "Backend Base URL ?")
    string(name: "POKEMON_BASE_URL", defaultValue: "https://pokeapi.co/api/v2/pokemon", description: "Pokemon Base URL ")
    string(name: "PORT", defaultValue: "3001", description: "Running on port ?")
  }

  options {
    disableConcurrentBuilds()
    timeout(time: 1, unit: 'HOURS')
  }

  stages {
    stage('Prepare Environment') {
        steps {
            sh "echo REACT_APP_BACKEND_BASE_URL=${params.BACKEND_BASE_URL} >> .env" 
            sh "echo REACT_APP_POKEMON_BASE_URL=${params.POKEMON_BASE_URL} >> .env" 
            sh "echo PORT=${params.PORT} >> .env" 
        }
    }
    stage('Build Containers') {
      stages {
        stage('Build') {
          steps {
            sh "sudo docker-compose up -d --build --remove-orphans"
          }
        }
      }
    }
    stage('Test Instance') {
      steps {
        sleep 10
        sh "curl http://localhost:${params.PORT}"
      }
    }
  }
}