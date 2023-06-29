<?php

namespace App\Http\Services;


use App\Models\User;
use App\Repositories\UserRepository;

class UserService
{


    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {

        $this->userRepository = $userRepository;
    }


    public function check($data)
    {
        $count = User::where('cpf',$data['cpf'])->count();

        if ($count > 0){
            $user = User::where('cpf',$data['cpf'])->first();
        }else{
            $user = $this->userRepository->store($data);
        }

        return $user;
    }
    public function filter($search)
    {

        if (empty($search)) {

            $users =  User::where('admin',0)->orderBy('name')
                            ->with(['orders'=>function($q){
                                $q->with(['items'=>function($q){
                                    $q->with(['product'=>function($q){
                                        $q->with('images');
                                    }]);
                                }]);
                            }])->take(10)->get();





        }else{
            $users =  User::ofSearch($search)
                            ->orderBy('name')
                            ->with(['orders'=>function($q){
                                $q->with(['items'=>function($q){
                                    $q->with(['product'=>function($q){
                                        $q->with('images');
                                    }]);
                                }]);
                            }])->get();

        }

        return $users;

    }


}
