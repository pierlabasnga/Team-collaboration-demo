interface YouTubeEmbedProps {
  youtubeId: string;
  title?: string;
  className?: string;
}

export function YouTubeEmbed({
  youtubeId,
  title = "YouTube Video",
  className = "",
}: YouTubeEmbedProps) {
  return (
    <div className={`w-full bg-black rounded-lg overflow-hidden ${className}`}>
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
          title={title}
          className="w-full h-full border-0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
}
