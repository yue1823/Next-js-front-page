script {

    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::coin;
    use aptos_framework::fungible_asset;
    use aptos_framework::primary_fungible_store;
    use deployer::coin_wrapper;
    use deployer::liquidity_pool;
    use deployer::router;
    use deployer::faucet;

    const Fixed_ampunt:u64 =1000000000000;
    const Half_amount :u64 =500000000000;
    const APT_amount:u64 = 5000000000;

    fun create_pool(caller:&signer){

        liquidity_pool::initialize();
        coin_wrapper::initialize();


        let faucet_vector =faucet::faucet_data();
        let (usdt ,usdc)=faucet::return_coin_metadata(&faucet_vector);

        //create pool
        router::create_pool_coin<AptosCoin>(usdt,false);
        router::create_pool_coin<AptosCoin>(usdc,false);
        router::create_pool(usdt,usdc,true);


        //faucet usdt and usdc 10 time
        for(i in 0..15){
            faucet::faucet(caller,usdt);
            faucet::faucet(caller,usdc);
        };

        let fund1_usdt = primary_fungible_store::withdraw(caller,usdt,Fixed_ampunt);
        let fund1_usdc = primary_fungible_store::withdraw(caller,usdc,Fixed_ampunt);

        //liquidity the pool
        router::add_liquidity(caller,fund1_usdc,fund1_usdt,true); //usdt/usdc pool

        let fund2_apt =coin::withdraw<AptosCoin>(caller,APT_amount);
        let fund2_usdt = primary_fungible_store::withdraw(caller,usdt,Half_amount);

        //liquidity the pool
        router::add_liquidity_coin<AptosCoin>(caller,fund2_apt,fund2_usdt,false); //usdt/apt pool

        let fund3_apt =coin::withdraw<AptosCoin>(caller,APT_amount);
        let fund3_usdc = primary_fungible_store::withdraw(caller,usdc,Half_amount);

        //liquidity the pool
        router::add_liquidity_coin<AptosCoin>(caller,fund3_apt,fund3_usdc,false);


    }

}
