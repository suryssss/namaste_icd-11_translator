import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Landingpage from "@/components/Landingpage";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Landingpage/>
      <Input/>
      <Faq/>
      <Footer/>
    </div>
  );
}
