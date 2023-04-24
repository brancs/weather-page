export function Card({cloudBg = false, padding="p-8", children}) {
  return (
    <div className={`relative w-full h-full ${padding} bg-violet-500 bg-opacity-75 backdrop-blur-md rounded-xl text-white break-words`}>
      {cloudBg && <div className="absolute top-0 left-0 w-full h-full rounded-xl background-image-no-blur"></div>}
      <div className="relative h-full">
        {children}
      </div>
    </div>
  );
};