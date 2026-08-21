interface Props {
  titulo: string;
  urls: string[];
}

function esVideo(url: string) {
  return /\.(mp4|mov|webm|avi)(\?|$)/i.test(url);
}

export function EvidenciaGallery({ titulo, urls }: Props) {
  if (urls.length === 0) {
    return (
      <div>
        <h3 className="mb-2 text-sm font-medium text-muted-foreground">{titulo}</h3>
        <p className="text-sm text-muted-foreground">Sin evidencia registrada.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-2 text-sm font-medium text-muted-foreground">{titulo}</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {urls.map((url, index) => (
          <a
            key={`${url}-${index}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block aspect-square overflow-hidden rounded-lg border"
          >
            {esVideo(url) ? (
              <video
                src={url}
                className="h-full w-full object-cover"
                muted
                playsInline
                preload="metadata"
              />
            ) : (
              <img
                src={url}
                alt={`${titulo} ${index + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            )}
          </a>
        ))}
      </div>
    </div>
  );
}