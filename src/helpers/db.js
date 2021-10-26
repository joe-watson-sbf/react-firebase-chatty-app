import { db } from "../services/firebase";

export function readChats() {
    let datas = [];
    db.ref("chatty-85805-default-rtdb").on("value", snapshot => {
        snapshot.forEach(snap => {
            datas.push(snap.val())
        });
        return datas;
    });
}

export function writeChats(message) {
    return db.ref("chats").push({
        content: message.content,
        timestamp: message.timestamp,
        uid: message.uid
    });
}