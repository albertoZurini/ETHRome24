use aztec::prelude::{AztecAddress, Map};
use value_note::{balance_utils, value_note::ValueNote};
use easy_private_state::EasyPrivateUint;
use aztec::macros::{storage::storage, functions::{initializer, private}};

contract Main {
    #[aztec(storage)]
    struct Storage {
    // public state variables
    // private state variables
    }

    #public
    #[aztec(initializer)]
    fn constructor(){

    }
}
