variable "otus-frontend-name"{
  default = "otus-frontend"
}

variable "otus-frontend-port"{
  default = 51001
}

variable "otus-frontend-version"{
  default = "latest"
}

resource "docker_image" "otus-frontend" {
  name = "otus-frontend:${var.otus-frontend-version}"
}

resource "docker_container" "otus-frontend" {
  name = "otus-frontend"
  image = "${docker_image.otus-frontend.name}"
  ports {
	internal = 80
	external = "${var.otus-frontend-port}"
  }
}
