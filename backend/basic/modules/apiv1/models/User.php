<?php

namespace app\modules\apiv1\models;


class User extends \app\models\User
{
     public function fields(){
            return ['id','username'];
      }
}
