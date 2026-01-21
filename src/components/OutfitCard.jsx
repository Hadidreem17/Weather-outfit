export default function OutfitCard({ title, items }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <ul className="list">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}
