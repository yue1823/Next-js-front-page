module deployer::user_record {

    use std::error;
    use std::signer::address_of;
    use aptos_std::smart_table;
    use aptos_std::smart_table::SmartTable;
    use deployer::package_manager;
    #[test_only]
    use std::string::utf8;
    #[test_only]
    use aptos_std::debug;

    ///not exists user on table
    const E_not_exists_user:u64 =1 ;

    struct Person_record has key ,store{
        time:u64,
        tvl:u64,
        swap:bool,
        liquidity:bool,
    }

    struct User_record has key,store{
        data:SmartTable<address,Person_record>
    }

    #[view]
    public fun finish_mission(target:address):(bool,bool) acquires User_record {
        let borrow  =borrow_data();
        assert!(smart_table::contains(&borrow.data,target)==true,error::not_implemented(E_not_exists_user));
        ( smart_table::borrow(&borrow.data,target).swap,smart_table::borrow(&borrow.data,target).liquidity)
    }
    #[view]
    public fun check_user_exists(target:address):bool acquires User_record {
        let value =smart_table::contains(&borrow_data().data,target);
        value
    }

    fun init_module(caller:&signer){
        move_to(&package_manager::get_signer(),User_record{
            data:smart_table::new<address,Person_record>()
        });
    }
    inline fun borrow_data():&mut User_record{
        borrow_global_mut<User_record>(address_of(&package_manager::get_signer()))
    }
    public fun add_record_interace(caller:&signer,amount:u64) acquires User_record {
        let borrow  =borrow_data();
        let have= smart_table::contains(&mut borrow.data,address_of(caller));
        if(have){
            let a =smart_table::borrow_mut(&mut borrow.data,address_of(caller));
            a.time=a.time+1;
            a.tvl=a.tvl+amount;
            a.swap = true ;
        }else{
            smart_table::add(&mut borrow.data,address_of(caller),Person_record{
                time:1,tvl:amount,swap:false,liquidity:false
            })
        }
    }
    public fun add_record_liquity(caller:&signer,amount:u64) acquires User_record {
        let borrow  =borrow_data();
        let have= smart_table::contains(&mut borrow.data,address_of(caller));
        if(have){
            let a =smart_table::borrow_mut(&mut borrow.data,address_of(caller));
            a.time=a.time+1;
            a.tvl=a.tvl+amount;
            a.liquidity = true ;
        }else{
            smart_table::add(&mut borrow.data,address_of(caller),Person_record{
                time:1,tvl:amount,swap:false,liquidity:false
            })
        }
    }

    #[test(caller=@swap,user=@0x123)]
    fun test_user_record(caller:&signer,user:&signer) acquires User_record {
        package_manager::initialize_for_test(caller);
        init_module(caller);
        // debug::print(&utf8(b"User exists?"));
        // debug::print(&check_user_exists(address_of(user)));
        add_record_interace(user,123);
        //debug::print(&utf8(b"User exists?"));
        let(mission1,mission2)=finish_mission(address_of(user));
        // debug::print(&mission1);
        // debug::print(&mission2);
        // debug::print(&check_user_exists(address_of(user)));

    }


}
