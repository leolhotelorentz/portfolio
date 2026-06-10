<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    
    if ($data === null) {
        http_response_code(400);
        echo json_encode(['error' => 'JSON invalide']);
        exit;
    }
    
    if (!isset($data['evenements']) || !is_array($data['evenements'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Structure invalide']);
        exit;
    }
    
    if (empty($data['evenements'])) {
        $data['evenements'] = new stdClass();
    }
    
    $file = __DIR__ . '/evenements.json';
    $result = file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
    
    if ($result === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Erreur lors de la sauvegarde']);
        exit;
    }
    
    echo json_encode(['success' => true]);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Méthode non autorisée']);
}
?>