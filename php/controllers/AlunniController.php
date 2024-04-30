<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class AlunniController
{
  public function index(Request $request, Response $response, $args)
  {
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("SELECT * FROM alunni");
    $results = $result->fetch_all(MYSQLI_ASSOC);
    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-Type", "application/json")->withStatus(200);
  }

  public function show(Request $request, Response $response, $args)
  {
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $result = $mysqli_connection->query("SELECT * FROM alunni WHERE id = " . $args['id']);
    $results = $result->fetch_all(MYSQLI_ASSOC);
    $response->getBody()->write(json_encode($results));
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }

  public function post(Request $request, Response $response, $args)
  {
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $data = json_decode($request->getBody(), true);
    $n = $data["nome"];
    $c = $data["cognome"];
    $mysqli_connection->query("INSERT INTO alunni (nome, cognome) VALUES ('$n', '$c')");
    $response->getBody()->write(json_encode($data));
    return $response->withHeader("Content-type", "application/json")->withStatus(201);
  }

  public function put(Request $request, Response $response, $args)
  {
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $data = json_decode($request->getBody(), true);
    $n = $data["nome"];
    $c = $data["cognome"];
    $mysqli_connection->query("UPDATE alunni SET nome = '$n', cognome = '$c' WHERE id = " . $args["id"]);
    return $response->withHeader("Content-type", "application/json")->withStatus(201);
  }

  public function delete(Request $request, Response $response, $args)
  {
    $mysqli_connection = new MySQLi('my_mariadb', 'root', 'ciccio', 'scuola');
    $mysqli_connection->query("DELETE FROM alunni WHERE id = " . $args["id"]);
    return $response->withHeader("Content-type", "application/json")->withStatus(200);
  }
}
