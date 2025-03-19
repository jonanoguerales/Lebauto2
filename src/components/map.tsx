export default function Map() {
  return (
    <div className="w-full h-[400px]">
      <iframe
        title="Ubicación del concesionario"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d333.5164720776302!2d-6.03187583994248!3d37.31974455381533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126d2ca25916d7%3A0x88d6b95ede3fa002!2sTalleres%20Antonio%20Casado!5e0!3m2!1ses!2ses!4v1741708735939!5m2!1ses!2ses"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
