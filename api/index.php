<?php
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/../vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$app = new Silex\Application();

define('BILLSPAY',  __DIR__ . '/bills-pay.json');
define('BILLSRECEIVE',  __DIR__ . '/bills-receive.json');

function deleteBill($id, $billType) {
    $bills = getBills($billType);
    $index = findIndexById($id, $billType);
    array_splice($bills,$index,1);
    writeBills($bills, $billType);
}

function findIndexById($id, $billType) {
    $bills = getBills($billType);
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function getBills($billType) {
    $json = file_get_contents($billType);
    $data = json_decode($json, true);
    return $data['bills'];
}

function postBill($request, $billType) {
    $bills = getBills($billType);
    $data = $request->all();
    $lastBill = array_slice($bills, -1, 1);
    $data['id'] = $lastBill[0]['id'] + 1;
    $bills[] = $data;
    writeBills($bills, $billType);
    return $data;
}

function putBills($request, $id, $billType) {
    $bills = getBills($billType);
    $data = $request->all();
    $index = findIndexById($id, $billType);
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills, $billType);
    return $bills[$index];
}

function sumBillsTotal($billType) {
    $sum=0;
    $bills = getBills($billType);
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $sum;
}

function writeBills($bills, $billType) {
    $data = ['bills' => $bills];
    $json = json_encode($data);
    file_put_contents($billType, $json);
}

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

/* -------------------------------------------------- */
/*     Route Bill Pay                                 */
/* -------------------------------------------------- */
/* -- [POST] Bills Pay -- */
$app->post('api/bills-pay', function (Request $request) use ($app) {
    $data = postBill($request->request, BILLSPAY);
    return $app->json($data);
});
/* -- [GET] All Bills Pay -- */
$app->get('api/bills-pay', function () use ($app) {
    $bills = getBills(BILLSPAY);
    return $app->json($bills);
});
/* -- [GET] Total Bills Pay -- */
$app->get('api/bills-pay/total', function () use ($app) {
    $sum = sumBillsTotal(BILLSPAY);
    return $app->json(['total' => $sum]);
});
/* -- [GET] Find by id Bills Pay -- */
$app->get('api/bills-pay/{id}', function ($id) use ($app) {
    $bills = getBills(BILLSPAY);
    $bill = $bills[findIndexById($id, BILLSPAY)];
    return $app->json($bill);
});
/* -- [PUT] Bills Pay -- */
$app->put('api/bills-pay/{id}', function (Request $request, $id) use ($app) {
    $bills = putBills($request->request, $id, BILLSPAY);
    return $app->json($bills);
});
/* -- [DELETE] Bills Pay -- */
$app->delete('api/bills-pay/{id}', function ($id) {
    deleteBill($id, BILLSPAY);
    return new Response("", 204);
});

/* -------------------------------------------------- */
/*     Route Bill Receive                             */
/* -------------------------------------------------- */
/* -- [POST] Bills Receive -- */
$app->post('api/bills-receive', function (Request $request) use ($app) {
    $data = postBill($request->request, BILLSRECEIVE);
    return $app->json($data);
});
/* -- [GET] All Bills Receive -- */
$app->get('api/bills-receive', function () use ($app) {
    $bills = getBills(BILLSRECEIVE);
    return $app->json($bills);
});
/* -- [GET] Total Bills Receive -- */
$app->get('api/bills-receive/total', function () use ($app) {
    $sum = sumBillsTotal(BILLSRECEIVE);
    return $app->json(['total' => $sum]);
});
/* -- [GET] Find by id Bills Receive -- */
$app->get('api/bills-receive/{id}', function ($id) use ($app) {
    $bills = getBills(BILLSRECEIVE);
    $bill = $bills[findIndexById($id, BILLSRECEIVE)];
    return $app->json($bill);
});
/* -- [PUT] Bills Receive -- */
$app->put('api/bills-receive/{id}', function (Request $request, $id) use ($app) {
    $bills = putBills($request->request, $id, BILLSRECEIVE);
    return $app->json($bills);
});
/* -- [DELETE] Bills Receive -- */
$app->delete('api/bills-receive/{id}', function ($id) {
    deleteBill($id, BILLSRECEIVE);
    return new Response("", 204);
});

/* -------------------------------------------------- */
/*     Route OPTIONS                                  */
/* -------------------------------------------------- */
$app->match("{uri}", function($uri){
    return "OK";
})
    ->assert('uri', '.*')
    ->method("OPTIONS");
$app->run();