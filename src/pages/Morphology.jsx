function Morphology() {
  // Дані конкретного ягуара
  const jaguar = {
    species: "Ягуа́р, пантера ягуар (Panthera onca)",
    description: "третій за розмірами у світі та найбільший та найсильніший представник родини котячих у Новому світі. Зовнішньо схожий на леопарда, проте за екологічними характеристиками скоріше нагадує тигра.",
    characteristics: [
      "Довжина тіла 150-180 см, довжина хвоста 70-91 см, вага до 136 кг.",
      "Тварина більш кремезна, масивна, хвіст і ноги коротші, ніж у леопарда, і скоріше він схожий на тигра.",
      "Ягуар має надзвичайно сильний укус."
    ],
    runSpeed: 80, // швидкість бігу км/год
    image: "/images/Panthera_onca.webp",
    imageAlt: "Ягуар",
    imageCaption: "Молодий ягуар"
  };

  return (
    <main className="container px-4 py-4">
      <article>
        <section>
          <h3 className="h3 text-success">Зовнішній вигляд</h3>
          <p><strong>{jaguar.species}</strong> — {jaguar.description}</p>
        </section>

        <section>
          <h3 className="h3 text-success">Особливості будови</h3>
          <ul>
            {jaguar.characteristics.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            <li>Швидкість бігу: {jaguar.runSpeed} км/год.</li>
          </ul>
        </section>

        <figure className="text-center">
          <img src={jaguar.image} alt={jaguar.imageAlt} className="img-fluid rounded my-4" />
          <figcaption className="text-muted">{jaguar.imageCaption}</figcaption>
        </figure>
      </article>
    </main>
  );
}

export default Morphology;