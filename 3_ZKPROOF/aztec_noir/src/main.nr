use aztec::prelude::{AztecAddress, Map};
use value_note::{balance_utils, value_note::ValueNote};
use easy_private_state::EasyPrivateUint;
use aztec::macros::{storage::storage, functions::{initializer, private}};

contract Main {
    fn double(x: Field) -> pub Field { x * 2 }
    fn triple(x: Field) -> pub Field { x * 3 }
    fn quadruple(x: Field) -> pub Field { double(double(x)) }
}
