function Morphology() {
  return (
    <main className="container px-4 py-4">
      <article>
        <section>
          <h3 className="h3 text-success">Зовнішній вигляд</h3>
          <p>Ягуа́р, пантера ягуар (Panthera onca) — третій за розмірами у світі та найбільший та найсильніший представник родини котячих у Новому світі. Зовнішньо схожий на леопарда, проте за екологічними характеристиками скоріше нагадує тигра.</p>
        </section>
        <section>
          <h3 className="h3 text-success">Особливості будови</h3>
          <ul>
          <li>Довжина тіла 150-180 см, довжина хвоста 70-91 см, вага до 136 кг.</li>
          <li>Тварина більш кремезна, масивна, хвіст і ноги коротші, ніж у леопарда, і скоріше він схожий на тигра.</li>
          <li>Ягуар має надзвичайно сильний укус..</li>
          </ul>
        </section>
        <figure className="text-center">
          <img src="/images/Panthera_onca.webp" alt="Ягуар" className="img-fluid rounded my-4"/>
          <figcaption className="text-muted">Молодий ягуар</figcaption>
        </figure>
      </article>
    </main>
  );
}

export default Morphology;