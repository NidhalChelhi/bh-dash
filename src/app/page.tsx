import CustomLoginInput from "@/components/CustomLoginInput";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-row  ">
      <div className="hidden sm:flex w-full bg-white items-center justify-center ">
        <img src="/main-logo.svg" alt="logo" className="h-72 w-full px-4 md:px-8 lg:px-24 gap-8 " />
      </div>
      <div className="flex w-full bg-primary flex-col items-center justify-center px-4 md:px-8 lg:px-24 gap-8 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Bienvenue sur votre espace admin
          </h1>
          <p className="text-white">
            Vous pouvez gérer vos produits et vos messages.
          </p>
        </div>
        <div className="w-full max-w-[480px] flex flex-col gap-4">
          <CustomLoginInput icon="mail" placeholder="Entrer votre addresse email" />
          <CustomLoginInput icon="password" placeholder="Entrer votre mot de passe" />
          <Link href="/products" className="flex items-center justify-center w-full px-8 py-4 bg-secondary rounded-xl cursor-pointer select-none hover:bg-opacity-95">
            <span className="text-white font-semibold text-xl">Connecter</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
