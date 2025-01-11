import { useEffect } from "react";
import { useAuth } from "../../contexts/auth";
import { About } from "../components/about";
import { App } from "./app";

export default function Home() {

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <About />
      <App />
    </div>
  );
}
