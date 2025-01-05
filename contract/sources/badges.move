module deployer::badges {

    use std::option::{none, some};
    use std::signer::address_of;
    use std::string;
    use std::string::utf8;
    use aptos_std::string_utils;
    use aptos_framework::event::emit;
    use aptos_framework::object;
    use aptos_framework::object::{generate_signer, ExtendRef, TransferRef, Transfer, generate_linear_transfer_ref,
        generate_extend_ref, generate_signer_for_extending
    };
    use aptos_framework::timestamp;
    use aptos_token_objects::aptos_token;

    use deployer::package_manager;
    use aptos_token_objects::collection;
    use aptos_token_objects::collection::generate_mutator_ref;
    use aptos_token_objects::royalty;
    use aptos_token_objects::royalty::Royalty;
    use aptos_token_objects::token;
    use aptos_token_objects::token::{create, BurnRef, generate_burn_ref, MutatorRef};

    const Name : vector<u8> = b"Diffusion Badges";
    const Describe : vector<u8> = b"Badges of diffusion for the future ";
    const GIF_url: vector<u8> =b"https://github.com/yue1823/diffusion/blob/vite_branch/frontend/gif.gif?raw=true";
    const Token_url: vector<u8> =b"https://github.com/yue1823/diffusion/blob/vite_branch/frontend/early%20bird.gif?raw=true";
    const Token_describe: vector<u8> = b"Early Prove of diffusion";
    const Token_name: vector<u8> = b"Early Bird Badges";

    #[event]
    struct Mint_token has copy,drop,store{
        owner:address,
        mint_time:u64
    }
    struct Token_cap has key,store{
        exten_Ref:ExtendRef,
        tran_ref:TransferRef,
        burn_ref:BurnRef,
        mut_ref:MutatorRef
    }
    struct Collection_s_cap has key,store{
        ext:ExtendRef
    }
    struct Collection_data has key,store{
        id:u64
    }
    public entry fun mint_badges(caller:&signer) acquires Collection_data, Collection_s_cap {
        let package_signer = &package_manager::get_signer();
        let borrow = borrow_global_mut<Collection_data>(object::create_object_address(&address_of(package_signer),b"badges"));
        let id = string_utils::to_string(&borrow.id);
        let royalty = royalty::create(20,100,@royalty);
        let detail = utf8(Token_name);
            string::append(&mut detail,id);
        let objsigner = &generate_signer_for_extending(&borrow_global<Collection_s_cap>(address_of(package_signer)).ext);
        let token = create(objsigner,utf8(Name),utf8(Token_describe),detail,some(royalty),utf8(Token_url));
        let extend=object::generate_extend_ref(&token);
        let trans = object::generate_transfer_ref(&token);
        let burn = generate_burn_ref(&token);
        let one_time_code = generate_linear_transfer_ref(&trans);
        let mutor = token::generate_mutator_ref(&token);

        move_to(&generate_signer(&token),Token_cap{
            exten_Ref:extend,
            tran_ref:trans,
            burn_ref:burn,
            mut_ref:mutor
        });
        emit(Mint_token{
            owner:address_of(caller),
            mint_time:timestamp::now_seconds()
        });
        object::transfer_with_ref(one_time_code,address_of(caller));
        borrow.id = borrow.id +1 ;
    }

    fun init_module(caller:&signer){
        let signer = &package_manager::get_signer();
        let obj = object::create_named_object(signer,b"badges");
        move_to(signer,Collection_s_cap{
            ext:generate_extend_ref(&obj)
        });
        let obj_signer = &generate_signer(&obj);
        collection::create_unlimited_collection(obj_signer,utf8(Describe),utf8(Name),none<Royalty>(),utf8( GIF_url));
        move_to(obj_signer,Collection_data{id:0});
    }
    #[test(caller=@swap)]
    fun test_badges(caller:&signer) acquires Collection_data, Collection_s_cap {
        package_manager::initialize_for_test(caller);
        init_module(caller);
        mint_badges(caller)
    }
}
