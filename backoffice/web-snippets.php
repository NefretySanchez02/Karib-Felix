<?php

function session_control (){
  session_name('Clu5TerM2021');
  session_start();

  if(!isset($_SESSION['app-id']) || !isset($_SESSION['user-id'])){
    header('Location: login.html');
  }

  if($_SESSION['app-id'] != 'CLUSTERM'){
    header('Location: login.html');
  }
}

function html_head($web_title = "Admin Module"){

  return <<<HTML
    <title>Admin Module</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <!--     Fonts and icons     -->
    <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
    
    <!-- Material Kit CSS -->
    <link href="assets/css/material-dashboard.css?v=2.1.2" rel="stylesheet" />
    <link rel="stylesheet" href="assets/css/styles.css">
HTML;
}

function top_bar( $section_name = "Inicio"){
  
  return <<<HTML
    <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <a class="navbar-brand" href="javascript:;">$section_name</a>
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span class="sr-only">Toggle navigation</span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
            <span class="navbar-toggler-icon icon-bar"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="javascript:;">
                  <i class="material-icons">account_circle</i> Admin
                </a>
              </li>
              <!-- your navbar here -->
            </ul>
          </div>
        </div>
      </nav>
HTML;
}

function sidebar( $section = "index"){
  $sections = array(
    "index" => "",
    "course" => "",
    "excursion" => "",
    "users" => ""
    
  );
  $sections[$section] = "active";

  return <<<HTML
    <div class="sidebar" data-color="azure" data-background-color="white" data-image="assets/img/sidebar-2.jpg">
      <!--
      Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

      Tip 2: you can also add an image using data-image tag
  -->
      <div class="logo">
        <a href="./" class="simple-text logo-mini">
         Karib
        </a>        
      </div>
      <div class="sidebar-wrapper">
        <ul class="nav">
          <li class="nav-item {$sections['index']}">
            <a class="nav-link" href="./">
              <i class="material-icons">home</i>
              <p>Inicio</p>
            </a>
          </li>
          <li class="nav-item {$sections['course']}">
            <a class="nav-link" href="course.php">
              <i class="material-icons">article</i>
              <p>Cursos</p>
            </a>
          </li>
          <li class="nav-item {$sections['excursion']}">
            <a class="nav-link" href="excursion.php">
              <i class="material-icons">public</i>
              <p>Excursiones</p>
            </a>
          </li>
          <li class="nav-item {$sections['users']}">
            <a class="nav-link" href="users.php">
              <i class="material-icons">group</i>
              <p>Usuarios</p>
            </a>
          </li>
          <li class="nav-item  ">
            <a class="nav-link" href="logout.php">
              <i class="material-icons">exit_to_app</i>
              <p>Salir</p>
            </a>
          </li>
          <!-- your sidebar here -->
        </ul>
      </div>
    </div>
HTML;
}

function footer(){

  return <<<HTML
    <footer class="footer">
        <div class="container-fluid">
          <nav class="float-left">
            <ul>
              <li>
                <a href="#">
                  Karib
                </a>
              </li>
            </ul>
          </nav>
          <div class="copyright float-right">
            &copy;
          </div>
          <!-- your footer here -->
        </div>
      </footer>
HTML;
}

function scripts(){

  return <<<HTML
    <script src="./assets/js/core/jquery.min.js"></script>
    <script src="./assets/js/application.js"></script>
HTML;
}