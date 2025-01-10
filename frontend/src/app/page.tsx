import { About } from "./about";
import { App } from "./app";

export default function Home() {

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <About />
      <App />
    </div>
  );
}
