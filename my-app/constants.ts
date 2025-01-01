import {Aptos, AptosConfig, Network} from "@aptos-labs/ts-sdk";

export const NETWORK =  "testnet";

export const contract_data = {
    resource_address:"",
    contract_address:"",
    function:{
       fect_all_data:() =>  `${contract_data.contract_address}::all_data` as `${string}::${string}::${string}`,
    }
}

const config = new AptosConfig({ network: Network.DEVNET });
export const aptos = new Aptos(config);