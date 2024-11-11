import jin from "../assets/fish1.webp";
import jin2 from "../assets/fish2.webp"

const Imagenes = () => {
  return (
    <div className="min-h-screen flex flex-row items-center justify-center">
      <img src={jin} alt="imagen de un pez" height={150} width={50} />
      <img src={jin2} alt="imagen de un pez" height={150} width={50} />
    </div>
  );
};

export default Imagenes;
