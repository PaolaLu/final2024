<?php

namespace app\modules\apiv1\controllers;

use yii\rest\ActiveController;
use yii\filters\Cors;

class BaseController extends ActiveController
{
    public static function allowedDomains()
    {
        return [$_SERVER["REMOTE_ADDR"], 'http://127.0.0.1:8080'];
    }

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // Remove authentication filter if present, otherwise CORS will not work properly
        unset($behaviors['authenticator']);

        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => static::allowedDomains(),
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age' => 3600, // Cache (seconds)
                'Access-Control-Allow-Headers' => ['authorization', 'X-Requested-With', 'content-type'],
                'Access-Control-Expose-Headers' => ['X-Pagination-Current-Page', 'X-Pagination-Page-Count', 'X-Pagination-Total-Count'],
            ],
        ];

        // Re-add authentication filter after CORS
        if (isset($behaviors['authenticator'])) {
            $behaviors['authenticator']['except'] = ['options'];
            $behaviors['authenticator']['only'] = ['index', 'view', 'create', 'update', 'delete'];
        }

        return $behaviors;
    }
}
