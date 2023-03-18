import Image from "next/image";
import imageLoader from "@/components/imageLoader";
import { GetCharacterResults, Character } from "@/types";
import { GetStaticPaths } from "next";

function CharacterPage({ character }: { character: Character }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>{character.name}</h1>
      <Image
        loader={imageLoader}
        src={character.image}
        alt={character.name}
        width="300"
        height="300"
      />
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
