import jin from "../assets/fish1.webp";

const Imagenes = () => {
  return (
    <div className="min-h-screen flex flex-row items-center justify-center">
      <img src={jin} alt="imagen de un pez" height={150} width={50} />
    </div>
  );
};

export default Imagenes;
