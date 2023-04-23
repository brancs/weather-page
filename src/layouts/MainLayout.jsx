function MainLayout({children}) {
  return (
    <main className="relative grid grid-cols-11 gap-8 min-h-screen p-2 lg:p-40">
      <div className='background-image w-full min-h-screen absolute top-0 left-0'></div>
      {children}
    </main>
  );
}

export default MainLayout;