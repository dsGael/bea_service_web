interface Props {
  registros: Record<string, unknown>[];
}

const MAX_COLUMNAS = 6;

function formatearValor(valor: unknown): string {
  if (valor === null || valor === undefined) return '—';
  if (typeof valor === 'boolean') return valor ? 'Sí' : 'No';
  if (typeof valor === 'object') return JSON.stringify(valor);
  return String(valor);
}

export function CatalogoTable({ registros }: Props) {
  if (registros.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        Sin registros.
      </div>
    );
  }

  const columnas = Object.keys(registros[0]).slice(0, MAX_COLUMNAS);
  // heurística simple para encontrar una key única por fila (id, idX, etc.)
  const keyField =
    columnas.find((c) => c.toLowerCase().startsWith('id')) ?? columnas[0];

  return (
    <div className="overflow-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
          <tr>
            {columnas.map((col) => (
              <th key={col} className="whitespace-nowrap px-4 py-3 font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {registros.map((row, i) => (
            <tr key={String(row[keyField] ?? i)} className="hover:bg-muted/40">
              {columnas.map((col) => (
                <td key={col} className="whitespace-nowrap px-4 py-3">
                  {formatearValor(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}