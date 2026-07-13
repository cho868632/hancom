import Header from "../components/Header";
import Menu from "../components/Menu";
import Content from "../components/Content";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="w-full flex-1 flex flex-col bg-slate-50 shadow-2xl">
      <div className="bg-white shadow-sm">
        <Header />
        <div className="flex justify-center border-t border-slate-100 py-2">
          <Menu />
        </div>
      </div>
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-10">
        <Content />
      </main>
      <Footer />
    </div>
  );
}

export default About;
