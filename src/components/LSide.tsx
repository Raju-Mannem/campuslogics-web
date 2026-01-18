import Link from "next/link";
import { InstagramIcon, TelegramIcon, WhatsappIcon, YoutubeIcon } from "./Layout/SocialIcons";

export default function LSide() {
    return (
        <div className="col-span-1 w-full glass rounded-lg grid grid-cols-2 sm:grid-cols-1 place-items-center gap-6 mb-4 lg:mb-0 lg:sticky lg:top-30 py-12 sm:py-4">
            <h2 className="absolute top-1 sm:relative text-3xl font-bold text-gray-900">Follow us</h2>
            <Link href="https://www.youtube.com/@Campuslogics" className="w-32 sm:w-44 flex justify-center items-center gap-2 bg-red-500 rounded-lg py-4 text-white"><span>Youtube</span><YoutubeIcon className="text-white" /></Link>
            <Link href="https://t.me/campuslogics" className="w-32 sm:w-44 flex justify-center items-center gap-2 bg-sky-500 rounded-lg py-4 text-white"><span>Telegram</span><TelegramIcon className="text-white" /></Link>
            <Link href="https://www.whatsapp.com/channel/0029VaArlbZJ3juzEnjiMH2J" className="w-32 sm:w-44 flex justify-center items-center gap-2 bg-green-500 rounded-lg py-4 text-white"><span>Whatsapp</span><WhatsappIcon className="text-white" /></Link>
            <Link href="https://www.youtube.com/@Campuslogics" className="w-32 sm:w-44 flex justify-center items-center gap-2 bg-pink-500 rounded-lg py-4 text-white"><span>Instagram</span><InstagramIcon className="text-white" /></Link>
        </div>
    )
}