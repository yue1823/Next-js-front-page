module deployer::faucet {

    use std::option::none;
    use std::signer::address_of;
    use std::string::{utf8, String};
    use std::vector;

    use aptos_framework::fungible_asset;
    use aptos_framework::fungible_asset::{Metadata, MintRef, metadata};
    use aptos_framework::object;
    use aptos_framework::object::{Object, ObjectCore, object_from_constructor_ref};
    use aptos_framework::primary_fungible_store;
    use deployer::package_manager;
    #[test_only]
    use aptos_std::debug;


    const Fixed_amnount :u64 =100000000000;

    struct Coin_cap has key,store{
        meta:Object<Metadata>,
        mint_cap:MintRef
    }
    struct Faucet_data has key, store{
        usdt:Coin_cap,
        usdc:Coin_cap
    }
    struct Coin_data has store,drop,copy{
        name:String,
        meta:Object<Metadata>
    }
    #[view]
    public fun faucet_data():vector<Coin_data> acquires Faucet_data {
        let a =object::create_object_address(&address_of(&package_manager::get_signer()),b"faucet");
        let faucet_Data=borrow_global<Faucet_data>(a);
        let return_vector = vector::empty<Coin_data>();
        vector::push_back(&mut return_vector,Coin_data{
            name:fungible_asset::symbol(faucet_Data.usdt.meta),
            meta:faucet_Data.usdt.meta
        });
        vector::push_back(&mut return_vector,Coin_data{
            name:fungible_asset::symbol(faucet_Data.usdc.meta),
            meta:faucet_Data.usdc.meta
        });
        return_vector
    }

    fun init_module(caller:&signer){
        let signer = &package_manager::get_signer();
        let obj = object::create_named_object(signer,b"faucet");
        let usdt_Ref = object::create_named_object(signer,b"usdt");
        let usdc_Ref = object::create_named_object(signer,b"usdc");
        primary_fungible_store::create_primary_store_enabled_fungible_asset(&usdt_Ref,none<u128>(),utf8(b"USDT"),utf8(b"USDT"),8,utf8(b"https://raw.githubusercontent.com/yue1823/diffusion/5df6274a48a1d4441a85c576cd154390126c8968/frontend/src/tether-usdt-logo.svg"),utf8(b"https://raw.githubusercontent.com/yue1823/diffusion/5df6274a48a1d4441a85c576cd154390126c8968/frontend/src/tether-usdt-logo.svg"));
        primary_fungible_store::create_primary_store_enabled_fungible_asset(&usdc_Ref,none<u128>(),utf8(b"USDC"),utf8(b"USDC"),8,utf8(b"https://raw.githubusercontent.com/yue1823/diffusion/5df6274a48a1d4441a85c576cd154390126c8968/frontend/src/usd-coin-usdc-logo.svg"),utf8(b"https://raw.githubusercontent.com/yue1823/diffusion/5df6274a48a1d4441a85c576cd154390126c8968/frontend/src/usd-coin-usdc-logo.svg"));
        let usdt_mint_ref = fungible_asset::generate_mint_ref(&usdt_Ref);
        let usdc_mint_ref = fungible_asset::generate_mint_ref(&usdc_Ref);
        let usdt_meta = object_from_constructor_ref<Metadata>(&usdt_Ref);
        let usdc_meta = object_from_constructor_ref<Metadata>(&usdc_Ref);
        move_to(&object::generate_signer(&obj),Faucet_data{
            usdt: Coin_cap{
                meta:usdt_meta,
                mint_cap:usdt_mint_ref
            },
            usdc: Coin_cap{
                meta:usdc_meta,
                mint_cap:usdc_mint_ref
            }
        })
    }

    public entry fun faucet(caller:&signer, which:Object<Metadata>) acquires Faucet_data {
        let a =object::create_object_address(&address_of(&package_manager::get_signer()),b"faucet");
        let borrow = borrow_global<Faucet_data>(a);
        if(which == borrow.usdt.meta){
            primary_fungible_store::mint(&borrow.usdt.mint_cap,address_of(caller),Fixed_amnount)
        }else{
            primary_fungible_store::mint(&borrow.usdc.mint_cap,address_of(caller),Fixed_amnount)
        }
    }

    #[test(caller=@swap,user=@0x31)]
    fun test_faucet(caller:&signer,user:&signer) acquires Faucet_data {
        package_manager::initialize_for_test(caller);
        init_module(caller);
        let vec=faucet_data();
        //print_balance(user,vec);
        faucet(user,vector::borrow(&vec,0).meta);
        faucet(user,vector::borrow(&vec,1).meta);
       // print_balance(user,vec);
    }
    #[test_only]
    fun print_balance(caller:&signer,vec:vector<Coin_data>){
        debug::print(&utf8(b"Usdt balance"));
        debug::print(&primary_fungible_store::balance(address_of(caller),vector::borrow(&vec,0).meta));
        debug::print(&utf8(b"Usdc balance"));
        debug::print(&primary_fungible_store::balance(address_of(caller),vector::borrow(&vec,1).meta));
    }


    public fun return_coin_metadata(vec:&vector<Coin_data>):(Object<Metadata>,Object<Metadata>){
        (vector::borrow(vec,0).meta,vector::borrow(vec,1).meta)
    }

}
