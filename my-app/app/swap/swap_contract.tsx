import {aptos} from "@/constants";
import {contract_data} from "@/constants";

export async function fetch_all_pair(){
     await aptos.view({
        payload:{
            function:contract_data.function.fect_all_data(),
            functionArguments:[]
        }
    }).then(result =>{
        console.log(result)
    })
}