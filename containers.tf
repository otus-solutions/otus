variable "otus-frontend" {
  type = "map"
  default = {
	"name" = "otus-frontend"
	"port" = 51001
  }
}

resource "docker_image" "otus-frontend" {
  name = "otus-frontend:latest"
}

resource "docker_container" "otus-frontend" {
  name = "otus-frontend"
  image = "${docker_image.otus-frontend.latest}"
  ports {
	internal = 80
	external = "${var.otus-frontend["port"]}"
  }
}
