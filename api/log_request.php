<?php
	function http_code($code, $msg) {
		#header($_SERVER["SERVER_PROTOCOL"] . ' ' . $code . ' ' . $msg);
		header('asdasd', TRUE, $code);
		header('Status: ' . $code);
	}
	
	require_once '../../blog/wp-config.php';
	/*define('DB_NAME', 'wooble');
	define('DB_USER', 'root');
	define('DB_PASSWORD', 'lamproot');
	define('DB_HOST', 'localhost');*/
	
	$pdo = new PDO("mysql:dbname=" . DB_NAME . ";host=" . DB_HOST, DB_USER, DB_PASSWORD);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$table_name = 'petlister_characters';
	
	$region = $_POST['region'];
	$realm = $_POST['realm'];
	$character = $_POST['character'];
	
	if (empty($region) || empty($realm) || empty($character)) {
		http_code(400, 'INVALID REQUEST');
		die(json_encode(array('error' => 'Required parameter not given.')));
	} 
	
	$sql = "INSERT INTO {$table_name} (region, realm, `character_name`) VALUES (?, ?, ?)";
	$stmt = $pdo->prepare($sql);
	$stmt->execute(array(
		$region,
		$realm,
		$character
	));
	
	http_code(204, 'NO CONTENT'); #die here
	exit;