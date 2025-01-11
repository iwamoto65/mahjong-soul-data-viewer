"use client";
import Image from "next/image";
import Link from "next/link";
import paifu from "/public/mahjong-soul-paifu.png";

export default function GameLatestDemoPaifuPage(): JSX.Element {
  return (
    <section className="flex justify-center">
      <div>
        <h2 className="text-white text-xl my-10">
          雀魂の牌譜を表示するデモページです。
          <br />
          雀魂アカウントを所持している場合は実際の対局結果ページに遷移します。
          <br />
          <Link href="/game/latest/demo" className="text-blue-500">
            戻る
          </Link>
        </h2>
        <Image src={paifu} width={1000} height={1000} alt="mahjong-soul-paifu-image" />
      </div>
    </section>
  );
}
