export function Card({cloudBg = false, padding="p-8", height="h-full", children, ...props}) {
  return (
    <div className={`relative w-full ${height} ${padding} bg-violet-500 bg-opacity-75 backdrop-blur-md rounded-xl text-white break-words`} {...props}>
      {cloudBg && <div className="absolute top-0 left-0 w-full h-full rounded-xl background-image-no-blur"></div>}
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
};