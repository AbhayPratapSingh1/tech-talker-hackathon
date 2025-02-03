import { useEffect, useRef, useState } from "react"
import adjustBrightness from "../../commonFunction/colorManager/colorFunctions"
// import { FaSearch } from "react-icons/fa"

import { IoMdSend } from "react-icons/io";
// import { getAIReply } from "../../commonComponent/aiFetch";
import { useSelector } from "react-redux";
import { capitalize } from "../../commonFunction/string";
const ChatPage = ({ page, user, socketRef, selectedId }) => {
    // const [chats, setChats] = useState([])

    const [textInput, setTextInput] = useState("")
    const [mode, setMode] = useState("Manual")

    const newUser = user?.filter(each => each.id === selectedId)[0]
    const color1 = useSelector((state) => state.app.color1)
    const color2 = useSelector((state) => state.app.color2)
    const color3 = useSelector((state) => state.app.color3)

    const userData = useSelector((state) => state.app.data)

    
    function replaceText() {
        let text = "";
        let textArray = textInput.split(" ");
        for (let i = 0; i < textArray.length; i++) {
            let word = textArray[i].toLowerCase();
            let key = Object.keys(emojiObj).find(each => each.toLowerCase() === word);

            if (key) {
                text += emojiObj[key];
            }

        }
        console.log(text);
        
        return text
    }

    const sendMessage = () => {
        
        if (textInput !== "") {
            let text = replaceText()
            
            let data = {
                type: "messageSend",
                id: userData.id,
                data: {
                    message:  text!==""?text:"❓❓❓",
                    senderId: userData.id,
                    receiverId: newUser.id
                }
            }

            socketRef.current.emit('message', data);
            setTextInput('');
            console.log("send message")
        }
    };

    const endOfDivRef = useRef(null);

    useEffect(() => {
        if (endOfDivRef.current) {
            endOfDivRef.current.scrollIntoView();
        }
    }, []);

    // function sendText() {
    //     if (textInput) {
    //         let data = {
    //             message: textInput,
    //             type: mode === "AI" ? 'send' : "rec",
    //             time: "19:00"
    //         }
    //         setChats([...chats, data])
    //         setTextInput("")
    //         if (mode === "AI") {
    //             getAIReply(textInput)
    //         }
    //     }
    // }
    // console.log("page");

    if (page != "Chats") {
        return (
            <div className="bgChats flex justify-center items-center  w-full">
                <img className="" src="logo.png" alt="Logo" />
            </div>
        )
    }

    return (
        <div className={`bgChats relative shrink-0  ${page === "Chats" ? "-translate-x-[100%] lg:translate-x-0 lg:flex" : "lg:flex translate-x-0"} duration-500   w-[calc(100vw-56px)] lg:w-[calc(100vw-456px)] h-[calc(100%-1px)] flex flex-col justify-between  `}>
            <div className=" overflow-scroll overflow-x-hidden w-full flex-grow  p-2 gap-1 pt-16">
                <div style={{ borderColor: adjustBrightness(color2, 20) }} className="absolute  w-full top-0 left-0 z-40 bg-white border-b">
                    <div style={{ backgroundColor: adjustBrightness(color1, 7) }} className=" w-full h-14 overflow-hidden flex justify-left p-2 items-center gap-2">
                        <div style={{ backgroundColor: adjustBrightness(color1, 80), borderColor: color2 }} className="border h-10 w-10 rounded-full flex justify-center items-center ">
                            <div style={{ color: color3 }} className=" font-extrabold text-xl">{newUser?.name?.charAt(0).toUpperCase()}</div>
                        </div>
                        <div className="">
                            <div style={{ color: adjustBrightness(color2, 70) }} className="font-semibold">{capitalize(newUser?.name)}</div>
                            <div style={{ color: adjustBrightness(color2, 50) }} className="text-[12px] font-semibold ">{capitalize(newUser?.id)}</div>
                        </div>
                    </div>
                </div>

                {newUser?.message && newUser?.message?.map((each, index) => {
                    let time = each.message.length === 0 ? "" : each.time
                    time = new Date(time);
                    const hours = time.getHours().toString().padStart(2, '0');
                    const minutes = time.getMinutes().toString().padStart(2, '0');
                    time = `${hours}:${minutes}`;
                    return (
                        <div className="flex w-full my-1">
                            <div className={`flex-grow ${each.type === "send" ? "order-1" : "order-3"}`}></div>
                            <div key={index} style={{ color: each.type === "send" ? color3 : color2, backgroundColor: each.type === "send" ? adjustBrightness(color1, 70) : color3 }} className={`${each.type === "send" ? "text-right " : "text-left"} w-fit max-w-[80%] order-2 p-2 rounded-md`}>
                                <div className="flex items-baseline gap-4">
                                    <div className="">
                                        {each.message}
                                    </div>
                                    <div className="translate-y-2 text-[11px] text-right">{time}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div ref={endOfDivRef} />
            </div>
            <InputPart mode={mode} setMode={setMode} textInput={textInput} setTextInput={setTextInput} sendText={sendMessage} />
        </div>

    )
}

const InputPart = ({ mode, setMode, textInput, setTextInput, sendText }) => {

    const color1 = useSelector((state) => state.app.color1)
    const color2 = useSelector((state) => state.app.color2)
    const color3 = useSelector((state) => state.app.color3)


    return (
        <div style={{ borderColor: adjustBrightness(color1, 20) }} className="flex shrink-0 lg:h-20 flex-wrap w-full gap-x-2 overflow-hidden border-t items-center  p-1 ">
            {/* <div style={{ borderColor: adjustBrightness(color2, 50) }} className="">
                <div className="h-10 w-36">
                    <div style={{ color: color2 }} className="relative border border-gray-500 flex justify-center items-center rounded-full h-full w-full ">
                        <button style={{ color: mode == "Manual" ? color3 : color2 }} onClick={() => setMode("Manual")} className="transition-all duration-800 w-20 h-full flex-grow rounded-r-full z-20">Manual</button>
                        <button style={{ color: mode == "AI" ? color3 : color2 }} onClick={() => setMode("AI")} className=" transition-all duration-800 w-20 h-full flex-grow rounded-l-full z-20">AI</button>
                        <div style={{ backgroundColor: adjustBrightness(color1, 90) }} className={`  absolute top-[2px] transition-all duration-700 ${mode === "Manual" ? "left-[2px]" : "left-[calc(100%-2px)] -translate-x-[100%]"} w-[calc(50%-4px)] h-[calc(100%-4px)]  z-10 rounded-full`}></div>
                    </div>
                </div>
            </div> */}
            {/* <button onClick={() => replaceText()} style={{ borderColor: adjustBrightness(color1, 70), color: color1 }} className="  w-10 h-10 rounded-full border flex text-xl justify-center items-center">C</button> */}

            <div style={{ borderColor: textInput ? adjustBrightness(color1, 70) : adjustBrightness(color2, 40), backgroundColor: textInput ? adjustBrightness(color1, 12) : adjustBrightness(color3, 0) }} className="border rounded-full my-2 h-10 flex-grow flex min-w-[250px] max-w-96 justify-center items-center overflow-hidden px-4">
                <input style={{ backgroundColor: adjustBrightness(color1, 0) }} className=" focus:outline-none flex-grow" value={textInput} onChange={(e) => setTextInput(e.target.value)} type="text" placeholder="Search User" />
                <button onClick={() => sendText()} style={{ color: color1 }} className={`w-4 text-3xl `}><IoMdSend /></button>
            </div>
        </div>
    )
}

export default ChatPage



const emojiObj = {
    "time": "🕰️",
    "amazing": "😲",
  "incredible": "🤯",
  "unbelievable": "😱",
  "astonishing": "😮",
  "mind-blowing": "🤯",
  "staggering": "😳",
  "impressive": "👏",
  "phenomenal": "🌟",
  "fantastic": "🤩",
  "marvelous": "😍",
  "extraordinary": "🔥",
  "awesome": "😎",
  "breathtaking": "🌄",
  "stunning": "🤩",
  "out of this world": "🚀",
  "jaw-dropping": "😯",
  "remarkable": "💯","yes": "👍",
  "yeah": "👍",
  "yep": "👍",
  "sure": "👍",
  "affirmative": "👍",
  "of course": "👍",
  "no": "👎",
  "nope": "👎",
  "nah": "👎",
  "negative": "👎",
  "not at all": "👎", "page": "📄","laptop": "💻",
  "computer": "💻",
  "desktop": "🖥️",
  "tablet": "📱",
  "phone": "📱",
  "smartphone": "📱",
  "mobile": "📱",
  "bye": "👋",
  "goodbye": "👋",
  "see you": "👋",
  "take care": "👋", "byee": "👋",
  "byyye": "👋",
  "bai": "👋",
  "bbye": "👋",
  "byyy": "👋",
  "buhbye": "👋",
  "see you later": "👋",
  "catch you later": "👋",
  "goodnight": "🌙",
  "later gator": "👋",
  "take it easy": "✌️",
  "peace out": "✌️",
  "see ya": "👋",
  "adios": "👋",
  "au revoir": "👋",
  "see ya": "👋",
  "later": "👋",
  "peace": "✌️",
  "farewell": "👋",
  "adieu": "👋",
  "so long": "👋",
  "smartwatch": "⌚",
  "camera": "📷",
  "headphones": "🎧",
  "charger": "🔌","laptop": "💻",
  "computer": "💻",
  "desktop": "🖥️",
  "tablet": "📱",
  "phone": "📱",
  "smartphone": "📱",
  "mobile": "📱",
  "smartwatch": "⌚",
  "camera": "📷",
  "headphones": "🎧",
  "charger": "🔌",
  "keyboard": "⌨️",
  "mouse": "🖱️",
  "monitor": "🖥️",
  "speaker": "🔊",
  "microphone": "🎤",
  "battery": "🔋",
  "wifi": "📶",
  "keyboard": "⌨️",
  "mouse": "🖱️",
  "monitor": "🖥️",
  "speaker": "🔊",
  "microphone": "🎤",
  "battery": "🔋",
  "wifi": "📶",
  "document": "📄",
  "book": "📖",
  "notebook": "📒",
  "note": "📝",
  "paper": "📄",
  "article": "📰",
  "letter": "✉️",
  "newspaper": "📰",
  "file": "📁",
  "folder": "📂",
  "journal": "📓",
  "bookmark": "🔖",
  "writing": "✍️",
  "text": "🔤",
  "draft": "📝",
  "manuscript": "📜",
  "memo": "📃",
  "booklet": "📑",
  "report": "📈"
,
  "maybe": "🤷‍♂️",
  "perhaps": "🤷‍♂️",
  "idk": "🤷‍♂️", // I don't know
  "i don't know": "🤷‍♂️",
  "possibly": "🤔",
  "likely": "🤔",
  "uncertain": "🤔",
  "certainly": "👌",
  "definitely": "👌",
  "absolutely": "👌",
  "probably": "🤞",
  "undecided": "🤷‍♀️",
  "surely": "💯",
  "agree": "🤝",
  "disagree": "❌","please": "🙏",
  "thank you": "🙏",
  "thanks": "🙏",
  "sorry": "😔",
  "excuse me": "🙇‍♂️",
  "pardon": "🙇‍♀️",
  "excuse": "🙇",
  "you're welcome": "😊",
  "welcome": "😊",
  "appreciate it": "🙌",
  "thanks a lot": "🙏",
  "no problem": "👌",
  "forgive me": "😅",
  "can you": "🤔",
  "could you": "🤔",
  "may I": "🙏",
  "would you": "🤷‍♂️",
  "kindly": "🤲",
  "be polite": "🤝",
  "help": "🆘",
  "assist": "💁‍♂️",
  "assist me": "💁‍♀️",
  "help me": "🙏",
  "please help": "🙏",
  "true": "✔️",
  "false": "❌",
  "spectacular": "🎆",
  "magnificent": "✨",
  "stunning": "🌟",
  "good": "👍",
  "great": "🌟",
  "excellent": "💯",
  "awesome": "😎",
  "fantastic": "🤩",
  "amazing": "😲",
  "perfect": "👌",
  "wonderful": "😊",
  "outstanding": "👏",
  "positive": "🙂",
  "superb": "🤩",
  "terrible": "😞",
  "bad": "👎",
  "horrible": "😩",
  "awful": "😖",
  "dreadful": "😔",
  "poor": "😕",
  "disappointing": "😞",
  "lousy": "🤢",
  "negative": "🙁",
  "unfortunate": "😢",
  "subpar": "😔",
  "red": "🔴",
  "orange": "🟧",
  "yellow": "🟨",
  "green": "🟩",
  "blue": "🟦",
  "purple": "🟪",
  "pink": "🩷",
  "brown": "🟫",
  "black": "⬛",
  "white": "⬜",
  "gray": "🩶",
  "cyan": "🟦",
  "indigo": "🟪",
  "violet": "🟪",
  "gold": "🟨",
  "silver": "🤍",
  "bronze": "🟫",
  "beige": "🟫",
  "lime": "🟩",
  "turquoise": "🟦",
  "teal": "🟦",
  "mint": "🟩",
  "peach": "🟧",
  "magenta": "🟪",
  "lavender": "🟪",
  "rose": "🩷",
  "skyblue": "🟦",
  "navy": "🟦",
  "charcoal": "⬛",
  "ivory": "⬜", "sky": "🌌",
  "cloud": "☁️",
  "ground": "🌍",
  "earth": "🌍",
  "mountain": "⛰️",
  "forest": "🌳",
  "tree": "🌳",
  "desert": "🏜️",
  "beach": "🏖️",
  "ocean": "🌊",
  "river": "🌊",
  "lake": "🏞️",
  "hill": "⛰️",
  "valley": "🏞️",
  "sun": "☀️",
  "moon": "🌙",
  "stars": "🌟",
  "rainbow": "🌈",
  "storm": "🌩️",
  "fog": "🌫️",
  "snow": "❄️",
  "snowflake": "❄️",
  "wind": "💨",
  "earthquake": "🌍",
  "volcano": "🌋",
  "fire": "🔥",
  "rain": "🌧️",
  "lightning": "⚡",
  "night": "🌙",
  "day": "🌞",
  "sunset": "🌅",
  "sunrise": "🌅",
  "nature": "🌱",
  "plant": "🌿",
  "flower": "🌸",
  "grass": "🌾",
  "water": "💧",
  "ice": "🧊","spoon": "🥄",
  "fork": "🍴",
  "knife": "🔪",
  "plate": "🍽️",
  "cup": "杯",
  "mug": "🍺",
  "bowl": "🥣",
  "glass": "🥂",
  "chopsticks": "🥢",
  "straw": "🥤",
  "pot": "🍲",
  "pan": "🍳",
  "teapot": "🍵",
  "bottle": "🍾",
  "bag": "👜",
  "backpack": "🎒",
  "wallet": "💼",
  "purse": "👛",
  "key": "🗝️",
  "book": "📚",
  "notebook": "📓",
  "pen": "🖊️",
  "pencil": "✏️",
  "scissors": "✂️",
  "tape": "📎",
  "marker": "🖍️",
  "paperclip": "📎",
  "calculator": "🧮",
  "computer": "💻",
  "phone": "📱",
  "television": "📺",
  "watch": "⌚",
  "camera": "📷",
  "headphones": "🎧",
  "earphones": "🎧",
  "glasses": "👓",
  "umbrella": "☂️",
  "clock": "🕰️",
  "keychain": "🗝️",
  "bagel": "🥯",
  "cupcake": "🧁",
  "cake": "🍰",
  "pencil case": "🖊️",
  "notebook": "📓",
  "eraser": "🧽",
  "stapler": "📎",
  "lamp": "💡",
  "flashlight": "🔦",
  "battery": "🔋",
  "lightbulb": "💡","hammer": "🔨",
  "wrench": "🔧",
  "screwdriver": "🔩",
  "nail": "🪙",
  "paintbrush": "🖌️",
  "palette": "🎨",
  "bucket": "🪣",
  "spade": "🪚",
  "saw": "🪚",
  "glue": "🧃",
  "scissors": "✂️",
  "ruler": "📏",
  "tape measure": "📏",
  "gloves": "🧤",
  "hat": "🧢",
  "scarf": "🧣",
  "jacket": "🧥",
  "sweater": "🧥",
  "boots": "👢",
  "shoes": "👟",
  "socks": "🧦",
  "sandals": "👡",
  "tie": "👔",
  "sunglasses": "🕶️",
  "watch": "⌚",
  "wallet": "💼",
  "briefcase": "💼",
  "backpack": "🎒",
  "laptop": "💻",
  "tablet": "📱",
  "smartphone": "📱",
  "charger": "🔌",
  "headphones": "🎧",
  "earbuds": "🎧",
  "camera": "📷",
  "microphone": "🎤",
  "tripod": "📷",
  "camera roll": "📸",
  "speaker": "🔊",
  "lightbulb": "💡",
  "lantern": "🏮",
  "flashlight": "🔦",
  "lamp": "💡",
  "candles": "🕯️",
  "matches": "🧯",
  "fire extinguisher": "🧯",
  "fan": "🌀",
  "air conditioner": "❄️",
  "broom": "🧹",
  "mop": "🧽",
  "vacuum": "🧹",
  "toilet brush": "🧴",
  "laundry basket": "🧺",
  "washing machine": "🧺",
  "dryer": "🧺",
  "dishwasher": "🍽️",
  "sink": "🧼",
  "toilet": "🚽",
  "bathtub": "🛁",
  "shower": "🚿",
  "towel": "🧴",
  "toothbrush": "🪥",
  "toothpaste": "🪥",
  "hair dryer": "💨",
  "comb": "💇‍♂️",
  "shampoo": "🧴",
  "soap": "🧼",
  "lotion": "🧴",
  "perfume": "💐",
  "makeup": "💄",
  "lipstick": "💄",
  "nail polish": "💅",
  "mirror": "🪞",
  "sunscreen": "🧴",
  "first aid kit": "🩹",
  "bandage": "🩹",
  "antiseptic": "🧴",
  "pill": "💊",
  "medicine": "💊",
  "stethoscope": "🩺",
  "syringe": "💉",
  "band-aid": "🩹",
  "scalpel": "🔪",
  "thermometer": "🌡️",
  "hospital": "🏥",
  "ambulance": "🚑",
  "doctor": "👨‍⚕️",
  "nurse": "👩‍⚕️",
    "clock": "⏰",
    "watch": "⌚",
    "hour": "⏳",
    "minute": "🕒",
    "second": "⏱️",
    "now": "⏳",
    "past": "⏳",
    "present": "🕰️",
    "future": "🔮",
    "alarm": "⏰",
    "timer": "⏲️",
    "morning": "🌅",
    "afternoon": "🌞",
    "evening": "🌆",
    "night": "🌙",
    "dawn": "🌅",
    "sunrise": "🌅",
    "sunset": "🌇",
    "today": "📅",
    "tomorrow": "📅",
    "yesterday": "📅",
    "late": "🕓",
    "early": "🕓",
    "soon": "⏳",
    "delay": "⏳",
    "wait": "⏳",
    "timer": "⏲️",
    "schedule": "📅",
    "deadline": "⏰",
    "calendar": "📅",
    "clockwise": "↻",
    "counterclockwise": "↺",
    "pastime": "⏳",
    "history": "📚",
    "clockwork": "⚙️",
    "rewind": "⏪",
    "fast-forward": "⏩",
    "pause": "⏸️",
    "play": "▶️",
    "stopwatch": "⏱️",
    "timer": "⏲️",
    "overdue": "📅",
    "hourglass": "⏳",
    "time's up": "⏰",
    "hello": "👋",
    "helo": "👋",
    "hii": "👋",
    "hiii": "👋",
    "hi": "👋",
    "greetings": "👋",
    "world": "🌍",
    "happy": "😊",
    "joyful": "😊",
    "content": "😊",
    "cheerful": "😊",
    "pleased": "😊",
    "sad": "😢",
    "down": "😢",
    "unhappy": "😢",
    "blue": "😢",
    "angry": "😡",
    "mad": "😡",
    "furious": "😡",
    "irritated": "😡",
    "upset": "😡",
    "surprised": "😲",
    "shocked": "😲",
    "astonished": "😲",
    "amazed": "😲",
    "love": "😍",
    "inlove": "😍",
    "adoring": "😍",
    "affectionate": "😍",
    "laughing": "😂",
    "laugh": "😂",
    "giggling": "😂",
    "chuckling": "😂",
    "cry": "😭",
    "crying": "😭",
    "tearful": "😭",
    "blushing": "😊",
    "shy": "😊",
    "embarrassed": "😊",
    "confused": "😕",
    "puzzled": "😕",
    "perplexed": "😕",
    "uncertain": "😕",
    "shocked": "😳",
    "stunned": "😳",
    "surprised": "😳",
    "worried": "😟",
    "anxious": "😟",
    "concerned": "😟",
    "nervous": "😟",
    "relieved": "😌",
    "calm": "😌",
    "atpeace": "😌",
    "grinning": "😁",
    "smiling": "😁",
    "happy": "😁",
    "embarrassed": "😳",
    "shy": "😳",
    "sleepy": "😴",
    "tired": "😴",
    "exhausted": "😴",
    "bored": "😑",
    "uninterested": "😑",
    "disinterested": "😑",
    "cool": "😎",
    "chill": "😎",
    "stylish": "😎",
    "disappointed": "😞",
    "letdown": "😞",
    "dismayed": "😞",
    "fearful": "😨",
    "scared": "😨",
    "terrified": "😨",
    "frightened": "😨",
    "excited": "🤩",
    "enthusiastic": "🤩",
    "thrilled": "🤩",
    "eager": "🤩",
    Tree: '🌳', Sun: '☀️', Flower: '🌸', Leaf: '🍃', Mountain: '🏔',
    Beach: '🏖', Forest: '🌲', Volcano: '🌋', Desert: '🏜', Lake: '🏞',
    Ocean: '🌊', River: '🏞', Island: '🏝', Snowflake: '❄️', Raindrop: '💧',
    Drop: '🧴', Fish: '🐟', Shark: '🦈', Octopus: '🐙', Tiger: '🐯',
    Fox: '🦊', Cat: '🐱', Dog: '🐶', Rabbit: '🐇', Horse: '🐎',
    Elephant: '🐘', Bear: '🐻', Monkey: '🐒', Koala: '🐨', Panda: '🐼',
    Bird: '🐦', Chicken: '🐔', Penguin: '🐧', Snake: '🐍', Caterpillar: '🐛',
    Spider: '🕷', Bee: '🐝', Ladybug: '🐞', Butterfly: '🦋', Dragonfly: '🦗',
    Ant: '🐜', Whale: '🐋', Snail: '🐌', Crab: '🦀', Lion: '🦁',
    Giraffe: '🦒', Zebra: '🦓', Hippo: '🦛', Pig: '🐷', Frog: '🐸',
    Rooster: '🐓', Turtle: '🐢', Parrot: '🦜', Peacock: '🦚', Sheep: '🐑',
    Goat: '🐐', Bat: '🦇', Dragon: '🐉', Unicorn: '🦄', Star: '⭐',
    Globe: '🌍', Moon: '🌙', Cloud: '☁️', Rain: '🌧', Snow: '❄️',
    Thunder: '⛈', Lightning: '⚡', Sunflower: '🌻', Clownfish: '🐠', Sunset: '🌇',
    Rocket: '🚀', Pizza: '🍕', Cupcake: '🧁', Banana: '🍌', Watermelon: '🍉',
    Popcorn: '🍿', Chocolate: '🍫', Snowman: '☃️', Firework: '🎆', Rainbow: '🌈',
    Robot: '🤖', Alien: '👽', Ghost: '👻', Skull: '💀', Trophy: '🏆',
    Starfish: '🐚', Mermaid: '🧜‍♀️', Hamburger: '🍔', Fries: '🍟', Heart: '❤️',
    Cross: '❌', Checkmark: '✔️', Lock: '🔒', Key: '🔑', Bell: '🔔',
    Crown: '👑', Glasses: '🕶', Umbrella: '☂️', Bicycle: '🚲', Train: '🚆',
    Sparkles: '✨', Comet: '☄️', CloudWithRain: '🌧', Thunderstorm: '⛈', Tornado: '🌪',
    Fog: '🌫', WaningCrescentMoon: '🌘', WaxingCrescentMoon: '🌒', FullMoon: '🌕', NewMoon: '🌑',
    HalfMoon: '🌗', FirstQuarterMoon: '🌓', LastQuarterMoon: '🌖', SunWithFace: '🌞', EarthEuropeAfrica: '🌍',
    EarthAmericas: '🌎', EarthAsiaAustralia: '🌏', GlowingStar: '🌟', BrokenHeart: '💔', HeartEyes: '😍',
    Fire: '🔥', Explosion: '💥', Sparkler: '🎇', Balloon: '🎈', PartyPopper: '🎉',
    ConfettiBall: '🎊', JackOLantern: '🎃', ChristmasTree: '🎄', GiftBox: '🎁', PartyHat: '🎩',
    Vampire: '🧛', Witch: '🧙‍♀️', Zombie: '🧟‍♂️', Clown: '🤡', VampireBat: '🦇',
    SpaghettiMonster: '🦑', Phoenix: '🦅', Owl: '🦉', Eagle: '🦅', Dolphin: '🐬',
    "Pencil": "✏️", "Pen": "🖊️", "Paintbrush": "🖌️", "Artist Palette": "🎨", "Laptop": "💻",
    "Desktop Computer": "🖥️", "Phone": "📱", "Tablet": "📲", "Camera": "📷", "Microphone": "🎤",
    "Headphones": "🎧", "Speaker": "🔊", "CD": "💿", "DVD": "📀", "Floppy Disk": "💾",
    "Clock": "🕰️", "Watch": "⌚", "Calendar": "📅", "Newspaper": "📰", "Book": "📚",
    "Bookmark": "🔖", "Scroll": "📜", "Musical Note": "🎵", "Guitar": "🎸", "Musical Keyboard": "🎹",
    "Drum": "🥁", "Trophy": "🏆", "Medal": "🥇", "Ribbon": "🎀", "Soccer Ball": "⚽",
    "Basketball": "🏀", "Football": "🏈", "Baseball": "⚾", "Tennis": "🎾", "Rugby": "🏉",
    "Volleyball": "🏐", "Badminton": "🏸", "Bowling": "🎳", "Boxing": "🥊", "Golf": "⛳",
    "Hockey": "🏒", "Ping Pong": "🏓", "Cricket": "🏏", "Skis": "🎿", "Ice Skate": "⛸️",
    "Snowboard": "🏂", "Ladder": "🪜", "Hammer": "🔨", "Wrench": "🔧", "Screwdriver": "🪛",
    "Nut and Bolt": "🔩", "Gear": "⚙️", "Light Bulb": "💡", "Candle": "🕯️", "Fireworks": "🎆",
    "Sparkler": "🎇", "Boom": "💥", "Dynamite": "💣", "Police Badge": "🛡️", "Shield": "🛡️",
    "Crossed Swords": "⚔️", "Bow and Arrow": "🏹", "Crown": "👑", "Princess": "👸", "Prince": "🤴",
    "Baby": "👶", "Child": "🧒", "Boy": "👦", "Girl": "👧", "Man": "👨",
    "Woman": "👩", "Family": "👪", "Couple": "💑", "Kiss": "💋", "Hand Heart": "🤲",
    "Handshake": "🤝", "Raised Hand": "✋", "Clapping Hands": "👏", "Thumbs Up": "👍", "Thumbs Down": "👎",
    "Victory Hand": "✌️", "OK Hand": "👌", "Oncoming Fist": "🤜", "Left-Facing Fist": "🤛", "Raised Fist": "✊",
    "Facepalm": "🤦", "Face With No Good Gesture": "🤷", "Pointing Up": "☝️", "Pointing Down": "👇", "Pointing Left": "👈",
    "Pointing Right": "👉", "Open Hands": "👐", "Palm": "✋", "Backhanded": "🤚", "Bear Face": "🐻‍❄️",
    "Panda Face": "🐼", "Cat Face": "🐱", "Dog Face": "🐶", "Horse Face": "🐴", "Car": "🚗",
    "Bus": "🚌", "Taxi": "🚖", "Plane": "✈️", "Boat": "⛵", "Helmet": "⛑️",
    "Medal": "🏅", "Shovel": "🛠", "Flashlight": "🔦", "Computer": "💻", "Keyboard": "⌨️",
    "Envelope": "✉️", "Gift": "🎁", "Clock": "🕰", "Moon": "🌙", "Cloud": "☁️",
    "Balloon": "🎈", "Book": "📚", "Flame": "🔥", "Pin": "📍", "Paint": "🎨",
    "Mic": "🎤", "Notebook": "📓", "Wind": "🌬", "Wave": "🌊", "Fire": "🔥",
    "Explosion": "💥", "Sparkle": "✨", "Confetti": "🎊", "Party": "🎉", "Music": "🎶",
    "Drum": "🥁", "Accordion": "🎼", "Trumpet": "🎺", "Violin": "🎻", "Cello": "🎻",
    "Piano": "🎹", "Battery": "🔋", "Radio": "📻", "TV": "📺", "Sunflower": "🌻",
    "Tree": "🌳", "Rain": "🌧", "Storm": "⛈", "Rainbow": "🌈", "Star": "⭐",
    "Rocket": "🚀", "Pizza": "🍕", "Apple": "🍎", "Banana": "🍌", "Orange": "🍊",
    "Watermelon": "🍉", "Grapes": "🍇", "Strawberry": "🍓", "Cherry": "🍒", "Carrot": "🥕",
    "Broccoli": "🥦", "Hotdog": "🌭", "Burger": "🍔", "Fries": "🍟", "Sandwich": "🥪",
    "Sushi": "🍣", "Steak": "🥩", "Fish": "🐟", "Milk": "🥛", "Juice": "🧃",
    "Coffee": "☕", "Tea": "🍵", "Wine": "🍷", "Beer": "🍺", "Cocktail": "🍸",
    "Champagne": "🍾", "Pot": "🍲", "Dish": "🍽", "Chopsticks": "🥢", "Fork": "🍴",
    "Knife": "🔪", "Salt": "🧂", "Pepper": "🌶", "Crab": "🦀", "Lobster": "🦞",
    "Shrimp": "🍤",
    "Clam": "🦪", "Cheese": "🧀", "Egg": "🥚", "Avocado": "🥑", "Apple": "🍎",
    "Fish": "🐟", "Cat": "🐱", "Dog": "🐶", "Rabbit": "🐇", "Elephant": "🐘",
    "Koala": "🐨", "Bear": "🐻", "Tiger": "🐯", "Monkey": "🐒", "Sheep": "🐑",
    "Goat": "🐐", "Panda": "🐼", "Horse": "🐎", "Zebra": "🦓", "Giraffe": "🦒",
    "Cow": "🐄", "Chicken": "🐔", "Penguin": "🐧", "Whale": "🐋", "Shark": "🦈",
    "Dolphin": "🐬", "Octopus": "🐙", "Crab": "🦀", "Snail": "🐌", "Spider": "🕷",
    "Bee": "🐝", "Ladybug": "🐞", "Butterfly": "🦋", "Dragonfly": "🦗", "Ant": "🐜",
    "Caterpillar": "🐛", "Dragon": "🐉", "Unicorn": "🦄", "Phoenix": "🦅", "Peacock": "🦚",
    "Owl": "🦉", "Eagle": "🦅", "Falcon": "🦅", "Raven": "🦅", "Vulture": "🦅",
    "Starfish": "🐚", "Shell": "🐚", "Coral": "🌊", "Turtle": "🐢", "Spider Web": "🕸",
    "Tree": "🌳", "Sun": "☀️", "Star": "⭐", "Moon": "🌙", "Cloud": "☁️",
    "Snowflake": "❄️", "Lightning": "⚡", "Rainbow": "🌈", "Flower": "🌸", "Heart": "❤️",
    "Firework": "🎆", "Confetti": "🎊", "Balloon": "🎈", "Gift": "🎁", "Cake": "🍰",
    "Cupcake": "🧁", "Pizza": "🍕", "Hotdog": "🌭", "Burger": "🍔", "Fries": "🍟",
    "Sushi": "🍣", "Taco": "🌮", "Steak": "🥩", "Milk": "🥛", "Juice": "🧃",
    "Coffee": "☕", "Tea": "🍵", "Wine": "🍷", "Beer": "🍺", "Cocktail": "🍸",
    "Champagne": "🍾", "Glass": "🍶", "Pot": "🍲", "Dish": "🍽", "Chopsticks": "🥢",
    "Fork": "🍴", "Knife": "🔪", "Salt": "🧂", "Pepper": "🌶", "Spice": "🌶",
    "Lobster": "🦞", "Shrimp": "🍤"
};
