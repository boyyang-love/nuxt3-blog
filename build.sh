docker stop blogContainer
docker rm blogContainer
docker build -t blog .
docker run --name blogContainer -e NITRO_PORT=3000 -d  -p 3000:3000 blog