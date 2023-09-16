import ChatContact from '@/components/Chat/ChatContact'

const sampleContact = [
    {userid: "AG0101", agency: "FIRE", lastmessage: "Hello this needs help", time: "12:00"},
    {userid: "AG0102", agency: "MEDIC", lastmessage: "Hello, please save me", time: "12:00"},
    {userid: "AG0103", agency: "FIRE", lastmessage: "Hello asldasjl ljk laj j jja kka j", time: "12:00"},
    {userid: "AG0104", agency: "FIRE", lastmessage: "Hello, lask laskal kask asjjs jajs.", time: "12:00"},
    {userid: "AG0105", agency: "MEDIC", lastmessage: "Hello, asa a.. a.s .a.s .s.s. .as.", time: "12:00"},
    {userid: "AG0106", agency: "FIRE", lastmessage: "Hello, kllk kk hhb hj. kkkl.", time: "12:00"},
    {userid: "AG0107", agency: "FIRE", lastmessage: "Hello, kkkl hggb uhuhu iij iiijnn bbhhuun hjju.", time: "12:00"},
    {userid: "AG0108", agency: "MEDIC", lastmessage: "Hello, hh kkll hjhj dddcc huuio mkk.", time: "12:00"},
    {userid: "AG0109", agency: "MEDIC", lastmessage: "Hello, hh kkll hjhj dddcc huuio mkk.", time: "12:09"},
]

const Chats = () => {
  return (
    <>
        <div className='flex my-4'>
            <h1 className='font-bold mx-auto text-xl text-center'>Recent Chats</h1>
        </div>
        <div className='flex flex-col'>
            {sampleContact.map((contact, index) => (
               <ChatContact key={index} delay={index} userid={contact.userid} agency={contact.agency} lastmessage={contact.lastmessage} time={contact.time} active={(Math.random()>=0.5)?true:false} />
            ))}
        </div>

    </>
  )
}

export default Chats