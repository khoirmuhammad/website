export default function Customers() {
  const customers = ["John", "Jane", "Doe"];

  return (
    <ul className="list-disc pl-4">
      {customers.map((c, i) => (
        <li key={i}>{c}</li>
      ))}
    </ul>
  );
}
