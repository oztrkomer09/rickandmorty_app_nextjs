import Head from "next/head";
import Image from "next/image";
import { GetStaticProps, NextPage } from "next";
import { GetCharacterResults, Character } from "@/types";

const Home: NextPage<{ characters: Character[] }> = ({ characters }) => {
  return (
    <div className="w-full h-full text-center flex flex-col justify-center items-center">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {characters.map((char) => {
        return (
          <div key={char.id}>
            {char.name}
            <Image src={char.image} alt={char.name} width="200" height="200" />
          </div>
        );
      })}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const { results }: GetCharacterResults = await res.json();

  return {
    props: {
      characters: results,
    },
  };
};

export default Home;
