import Image from "next/image";
import Link from "next/link";
import imageLoader from "@/components/imageLoader";
import { GetCharacterResults, Character } from "@/types";

function CharacterPage({ character }: { character: Character }) {
  return (
    <div className="flex justify-center items-center py-2">
      <div className="flex flex-col justify-center items-center">
        <Link
          href={"/"}
          className="absolute top-2 left-2 bg-purple-600 px-2 py-[18px] rounded-full text-center text-white font-bold hover:bg-purple-900 transition-all"
        >
          Home
        </Link>
        <Image
          loader={imageLoader}
          unoptimized
          src={character.image}
          alt={character.name}
          width="330"
          height="330"
        />
        <h1 className="font-bold text-xl border-2 border-blue-600 w-full text-center bg-blue-600 text-white">
          {character.name}
        </h1>
        <div className="w-full mt-4">
          <p className="font-bold">- ID: {character.id}</p>
          <p className="font-bold">- Status: {character.status}</p>
          <p className="font-bold">- Species: {character.species}</p>
          <p className="font-bold">- Gender: {character.gender}</p>
          <p className="font-bold">- Origin: {character.origin.name}</p>
          <p className="font-bold">- Location: {character.location.name}</p>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const { results }: GetCharacterResults = await res.json();

  return {
    paths: results.map((character) => {
      return { params: { id: String(character.id) } };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${params.id}`
  );
  const character = await res.json();
  return {
    props: {
      character,
    },
  };
}

export default CharacterPage;
