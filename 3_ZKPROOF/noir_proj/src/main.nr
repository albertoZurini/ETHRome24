fn main(
    message: pub str<60>, 
    msgLen: u8, 
    emailHash: str<64>, 
    nfcIdHash: str<64>
) {
    let msg_bytes = message.as_bytes();
    let eml_bytes = emailHash.as_bytes();
    let nfc_bytes = nfcIdHash.as_bytes();
    assert(msg_bytes[msgLen]    ==  eml_bytes[0]);
    assert(msg_bytes[msgLen + 1]==  nfc_bytes[0]);
    let iStart = msgLen+2;
    for i in 0..60 {
        if i >= iStart {
            assert(msg_bytes[i] == 32); 
            // Check all chars are spaces (terminators of string)
        }
    }
}
