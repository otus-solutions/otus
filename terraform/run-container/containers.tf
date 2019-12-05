variable "otus-frontend-name"{
  default = "otus-frontend"
}

variable "otus-frontend-port"{
  default = 51001
}

variable "otus-frontend-apiurl"{
  default = "http://localhost:51006"
}

variable "otus-frontend-version"{
  default = "otus-frontend:latest"
}

resource "docker_container" "otus-frontend" {
  name = "otus-frontend"
  image = "${var.otus-frontend-version}"
  env = ["API_URL=${var.otus-frontend-apiurl}"]
  ports {
	internal = 80
	external = "${var.otus-frontend-port}"
  }
}
