# Build Image
sudo docker build -t otus-frontend .

# Build Container
sudo docker run --network=otus-platform-network -p 51004:80 --name otus-frontend otus-frontend 

# API URL
Default: "http://localhost:51002"

## Contato
Gostaria de saber mais sobre nosso projeto? <br />
Entre em contato conosco. <br />
Email: contato@otus-solutions.com.br <br />



