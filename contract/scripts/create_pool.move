script {

    use aptos_framework::aptos_coin::AptosCoin;
    use deployer::router;
    use deployer::faucet;


    fun create_pool(){
        let faucet_vector =faucet::faucet_data();
        let (usdt ,usdc)=faucet::return_coin_metadata(&faucet_vector);
        router::create_pool_coin<AptosCoin>(usdt,false);
        router::create_pool_coin<AptosCoin>(usdc,false);
    }
}
