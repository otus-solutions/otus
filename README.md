# Build Image
sudo docker build -t otus-frontend .

# Build Container
sudo docker run -p 51001:80 --name otus-frontend otus-frontend 

# API URL
Default: "http://localhost:51002"

## Parameterized
sudo docker run -e API_URL="http://address" -p 51001:80 --name otus-frontend otus-frontend 

## Contato
Gostaria de saber mais sobre nosso projeto? <br />
Entre em contato conosco. <br />
Email: contato@otus-solutions.com.br <br />



